package com.sellonline.catalog.internal;

import com.sellonline.catalog.api.*;
import com.sellonline.catalog.domain.Product;
import com.sellonline.catalog.domain.ProductAsset;
import com.sellonline.catalog.domain.ProductStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

import java.io.IOException;
import java.text.Normalizer;
import java.time.Duration;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
class CatalogService implements CatalogFacade {

    private final ProductRepository productRepo;
    private final AssetRepository assetRepo;
    private final S3Client s3;
    private final S3Presigner presigner;

    @Value("${app.s3.bucket}")
    private String bucket;

    @Value("${app.s3.signed-url-ttl-minutes}")
    private int ttlMinutes;

    @Override
    @Transactional
    public ProductDto createProduct(CreateProductCommand cmd) {
        String slug = cmd.slug() != null ? cmd.slug() : toSlug(cmd.title());
        if (productRepo.existsBySlug(slug)) {
            slug = slug + "-" + UUID.randomUUID().toString().substring(0, 6);
        }
        Product p = Product.builder()
                .title(cmd.title())
                .slug(slug)
                .description(cmd.description())
                .price(cmd.price())
                .currency(cmd.currency() != null ? cmd.currency() : "USD")
                .status(ProductStatus.DRAFT)
                .build();
        return toDto(productRepo.save(p), false);
    }

    @Override
    @Transactional
    public ProductDto updateProduct(UUID id, UpdateProductCommand cmd) {
        Product p = getOrThrow(id);
        if (cmd.title() != null) p.setTitle(cmd.title());
        if (cmd.description() != null) p.setDescription(cmd.description());
        if (cmd.price() != null) p.setPrice(cmd.price());
        if (cmd.currency() != null) p.setCurrency(cmd.currency());
        return toDto(p, false);
    }

    @Override @Transactional
    public ProductDto publishProduct(UUID id) { return changeStatus(id, ProductStatus.PUBLISHED); }

    @Override @Transactional
    public ProductDto unpublishProduct(UUID id) { return changeStatus(id, ProductStatus.DRAFT); }

    @Override @Transactional
    public ProductDto archiveProduct(UUID id) { return changeStatus(id, ProductStatus.ARCHIVED); }

    @Override @Transactional
    public ProductDto duplicateProduct(UUID id) {
        Product src = getOrThrow(id);
        String newSlug = src.getSlug() + "-copy-" + UUID.randomUUID().toString().substring(0, 6);
        Product copy = Product.builder()
                .title(src.getTitle() + " (Copy)")
                .slug(newSlug)
                .description(src.getDescription())
                .price(src.getPrice())
                .currency(src.getCurrency())
                .status(ProductStatus.DRAFT)
                .build();
        return toDto(productRepo.save(copy), false);
    }

    @Override @Transactional
    public void deleteProduct(UUID id) {
        Product p = getOrThrow(id);
        p.getAssets().forEach(a -> deleteFromS3(a.getStorageKey()));
        productRepo.delete(p);
    }

    @Override @Transactional(readOnly = true)
    public ProductDto getProduct(UUID id) { return toDto(getOrThrow(id), true); }

    @Override @Transactional(readOnly = true)
    public ProductDto getProductBySlug(String slug) {
        return productRepo.findBySlugAndStatus(slug, ProductStatus.PUBLISHED)
                .map(p -> toDto(p, true))
                .orElseThrow(() -> new CatalogException("Product not found"));
    }

    @Override @Transactional(readOnly = true)
    public Page<ProductDto> listProducts(String statusFilter, String search, Pageable pageable) {
        ProductStatus status = statusFilter != null ? ProductStatus.valueOf(statusFilter) : null;
        return productRepo.findAll(status, search, pageable).map(p -> toDto(p, false));
    }

    @Override @Transactional(readOnly = true)
    public Page<ProductDto> listPublishedProducts(String search, Pageable pageable) {
        return productRepo.findPublished(search, pageable).map(p -> toDto(p, true));
    }

    @Override @Transactional
    public AssetDto attachAsset(UUID productId, MultipartFile file) {
        Product p = getOrThrow(productId);
        String key = "assets/" + productId + "/" + UUID.randomUUID() + "-" + file.getOriginalFilename();
        try {
            s3.putObject(PutObjectRequest.builder()
                    .bucket(bucket).key(key)
                    .contentType(file.getContentType())
                    .build(),
                    RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
        } catch (IOException e) {
            throw new CatalogException("Asset upload failed: " + e.getMessage());
        }
        ProductAsset asset = ProductAsset.builder()
                .product(p).storageKey(key)
                .filename(file.getOriginalFilename())
                .contentType(file.getContentType())
                .sizeBytes(file.getSize())
                .build();
        p.getAssets().add(asset);
        assetRepo.save(asset);
        return toAssetDto(asset, true);
    }

    @Override @Transactional(readOnly = true)
    public String getDownloadUrl(UUID assetId) {
        ProductAsset a = assetRepo.findById(assetId)
                .orElseThrow(() -> new CatalogException("Asset not found"));
        return presigner.presignGetObject(GetObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(ttlMinutes))
                .getObjectRequest(r -> r.bucket(bucket).key(a.getStorageKey()))
                .build()).url().toString();
    }

    @Override @Transactional
    public void removeAsset(UUID assetId) {
        ProductAsset a = assetRepo.findById(assetId)
                .orElseThrow(() -> new CatalogException("Asset not found"));
        deleteFromS3(a.getStorageKey());
        assetRepo.delete(a);
    }

    private ProductDto changeStatus(UUID id, ProductStatus newStatus) {
        Product p = getOrThrow(id);
        p.setStatus(newStatus);
        return toDto(p, false);
    }

    private Product getOrThrow(UUID id) {
        return productRepo.findById(id).orElseThrow(() -> new CatalogException("Product not found"));
    }

    private void deleteFromS3(String key) {
        try {
            s3.deleteObject(DeleteObjectRequest.builder().bucket(bucket).key(key).build());
        } catch (Exception ignored) {}
    }

    private ProductDto toDto(Product p, boolean includeImagePreviewUrls) {
        List<AssetDto> assets = p.getAssets().stream()
                .sorted(Comparator.comparing(ProductAsset::getUploadedAt))
                .map(a -> toAssetDto(a, includeImagePreviewUrls))
                .toList();
        return new ProductDto(p.getId(), p.getTitle(), p.getSlug(), p.getDescription(),
                p.getPrice(), p.getCurrency(), p.getStatus().name(), assets,
                p.getCreatedAt(), p.getUpdatedAt());
    }

    private AssetDto toAssetDto(ProductAsset a, boolean includeImagePreviewUrl) {
        String preview = null;
        if (includeImagePreviewUrl && isImageContentType(a.getContentType())) {
            preview = presigner.presignGetObject(GetObjectPresignRequest.builder()
                    .signatureDuration(Duration.ofMinutes(ttlMinutes))
                    .getObjectRequest(r -> r.bucket(bucket).key(a.getStorageKey()))
                    .build()).url().toString();
        }
        return new AssetDto(a.getId(), a.getFilename(), a.getContentType(), a.getSizeBytes(), a.getUploadedAt(), preview);
    }

    private static boolean isImageContentType(String contentType) {
        return contentType != null && contentType.toLowerCase().startsWith("image/");
    }

    private static String toSlug(String title) {
        String normalized = Normalizer.normalize(title.toLowerCase(), Normalizer.Form.NFD);
        return Pattern.compile("[^a-z0-9]+").matcher(normalized).replaceAll("-").replaceAll("^-|-$", "");
    }
}
