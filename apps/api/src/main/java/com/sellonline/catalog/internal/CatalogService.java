package com.sellonline.catalog.internal;

import com.sellonline.catalog.api.*;
import com.sellonline.catalog.domain.OfferingType;
import com.sellonline.catalog.domain.Product;
import com.sellonline.catalog.domain.ProductAsset;
import com.sellonline.catalog.domain.ProductStatus;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
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
import java.math.BigDecimal;
import java.text.Normalizer;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.TreeSet;
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
                .offeringType(parseOfferingType(cmd.offeringType()))
                .techTagsCsv(toTechTagsCsv(cmd.techTags()))
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
        if (cmd.offeringType() != null) p.setOfferingType(parseOfferingType(cmd.offeringType()));
        if (cmd.techTags() != null) p.setTechTagsCsv(toTechTagsCsv(cmd.techTags()));
        return toDto(p, false);
    }

    @Override
    @Transactional
    public ProductDto publishProduct(UUID id) {
        return changeStatus(id, ProductStatus.PUBLISHED);
    }

    @Override
    @Transactional
    public ProductDto unpublishProduct(UUID id) {
        return changeStatus(id, ProductStatus.DRAFT);
    }

    @Override
    @Transactional
    public ProductDto archiveProduct(UUID id) {
        return changeStatus(id, ProductStatus.ARCHIVED);
    }

    @Override
    @Transactional
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
                .offeringType(src.getOfferingType())
                .techTagsCsv(src.getTechTagsCsv())
                .build();
        return toDto(productRepo.save(copy), false);
    }

    @Override
    @Transactional
    public void deleteProduct(UUID id) {
        Product p = getOrThrow(id);
        p.getAssets().forEach(a -> deleteFromS3(a.getStorageKey()));
        productRepo.delete(p);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductDto getProduct(UUID id) {
        return toDto(getOrThrow(id), true);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductDto getProductBySlug(String slug) {
        return productRepo.findBySlugAndStatus(slug, ProductStatus.PUBLISHED)
                .map(p -> toDto(p, true))
                .orElseThrow(() -> new CatalogException("Product not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProductDto> listProducts(String statusFilter, String search, Pageable pageable) {
        ProductStatus status = statusFilter != null ? ProductStatus.valueOf(statusFilter) : null;
        return productRepo.findAll(status, search, pageable).map(p -> toDto(p, false));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProductDto> listPublishedProducts(
            String search,
            String offeringType,
            List<String> techTags,
            BigDecimal priceMin,
            BigDecimal priceMax,
            String sort,
            Pageable pageable) {
        Specification<Product> spec = Specification.where(statusSpec(ProductStatus.PUBLISHED))
                .and(searchSpec(search))
                .and(offeringTypeSpec(offeringType))
                .and(priceMinSpec(priceMin))
                .and(priceMaxSpec(priceMax))
                .and(techTagsSpec(techTags));

        Pageable sortedPage = PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                resolveSort(sort));

        return productRepo.findAll(spec, sortedPage).map(p -> toDto(p, true));
    }

    @Override
    @Transactional(readOnly = true)
    public ProductFacetsDto getPublishedProductFacets(
            String search,
            String offeringType,
            BigDecimal priceMin,
            BigDecimal priceMax) {
        Specification<Product> spec = Specification.where(statusSpec(ProductStatus.PUBLISHED))
                .and(searchSpec(search))
                .and(offeringTypeSpec(offeringType))
                .and(priceMinSpec(priceMin))
                .and(priceMaxSpec(priceMax));

        List<Product> products = productRepo.findAll(spec);

        Set<String> types = new TreeSet<>();
        Set<String> tags = new TreeSet<>();
        BigDecimal minPrice = null;
        BigDecimal maxPrice = null;

        for (Product product : products) {
            types.add(product.getOfferingType().name());
            tags.addAll(parseTechTagsCsv(product.getTechTagsCsv()));

            BigDecimal price = product.getPrice();
            if (price != null) {
                if (minPrice == null || price.compareTo(minPrice) < 0) minPrice = price;
                if (maxPrice == null || price.compareTo(maxPrice) > 0) maxPrice = price;
            }
        }

        return new ProductFacetsDto(
                List.copyOf(types),
                List.copyOf(tags),
                minPrice,
                maxPrice);
    }

    @Override
    @Transactional
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

    @Override
    @Transactional(readOnly = true)
    public String getDownloadUrl(UUID assetId) {
        ProductAsset a = assetRepo.findById(assetId)
                .orElseThrow(() -> new CatalogException("Asset not found"));
        return presigner.presignGetObject(GetObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(ttlMinutes))
                .getObjectRequest(r -> r.bucket(bucket).key(a.getStorageKey()))
                .build()).url().toString();
    }

    @Override
    @Transactional(readOnly = true)
    public long countProducts() {
        return productRepo.count();
    }

    @Override
    @Transactional
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
        } catch (Exception ignored) {
        }
    }

    private ProductDto toDto(Product p, boolean includeImagePreviewUrls) {
        List<AssetDto> assets = p.getAssets().stream()
                .sorted(Comparator.comparing(ProductAsset::getUploadedAt))
                .map(a -> toAssetDto(a, includeImagePreviewUrls))
                .toList();
        return new ProductDto(
                p.getId(),
                p.getTitle(),
                p.getSlug(),
                p.getDescription(),
                p.getPrice(),
                p.getCurrency(),
                p.getStatus().name(),
                p.getOfferingType().name(),
                parseTechTagsCsv(p.getTechTagsCsv()),
                assets,
                p.getCreatedAt(),
                p.getUpdatedAt());
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
        return contentType != null && contentType.toLowerCase(Locale.ROOT).startsWith("image/");
    }

    private static Sort resolveSort(String sort) {
        if (sort == null || sort.isBlank()) {
            return Sort.by(Sort.Direction.DESC, "createdAt");
        }
        return switch (sort.trim().toLowerCase(Locale.ROOT)) {
            case "price_asc", "price-asc" -> Sort.by(Sort.Direction.ASC, "price");
            case "price_desc", "price-desc" -> Sort.by(Sort.Direction.DESC, "price");
            case "name_asc", "name-asc" -> Sort.by(Sort.Direction.ASC, "title");
            case "name_desc", "name-desc" -> Sort.by(Sort.Direction.DESC, "title");
            case "oldest" -> Sort.by(Sort.Direction.ASC, "createdAt");
            default -> Sort.by(Sort.Direction.DESC, "createdAt");
        };
    }

    private static Specification<Product> statusSpec(ProductStatus status) {
        return (root, query, cb) -> cb.equal(root.get("status"), status);
    }

    private static Specification<Product> searchSpec(String search) {
        if (search == null || search.isBlank()) return null;
        String value = "%" + search.trim().toLowerCase(Locale.ROOT) + "%";
        return (root, query, cb) -> cb.or(
                cb.like(cb.lower(root.get("title").as(String.class)), value),
                cb.like(cb.lower(root.get("description").as(String.class)), value)
        );
    }

    private static Specification<Product> offeringTypeSpec(String offeringType) {
        if (offeringType == null || offeringType.isBlank()) return null;
        OfferingType type = parseOfferingType(offeringType);
        return (root, query, cb) -> cb.equal(root.get("offeringType"), type);
    }

    private static Specification<Product> priceMinSpec(BigDecimal priceMin) {
        if (priceMin == null) return null;
        return (root, query, cb) -> cb.greaterThanOrEqualTo(root.get("price"), priceMin);
    }

    private static Specification<Product> priceMaxSpec(BigDecimal priceMax) {
        if (priceMax == null) return null;
        return (root, query, cb) -> cb.lessThanOrEqualTo(root.get("price"), priceMax);
    }

    private static Specification<Product> techTagsSpec(List<String> techTags) {
        List<String> normalized = normalizeTechTags(techTags);
        if (normalized.isEmpty()) return null;

        return (root, query, cb) -> {
            Expression<String> csv = cb.concat(
                    cb.concat(",", cb.lower(root.get("techTagsCsv").as(String.class))),
                    ",");
            List<Predicate> matches = new ArrayList<>();
            for (String tag : normalized) {
                matches.add(cb.like(csv, "%," + tag + ",%"));
            }
            return cb.or(matches.toArray(Predicate[]::new));
        };
    }

    private static OfferingType parseOfferingType(String raw) {
        if (raw == null || raw.isBlank()) return OfferingType.PRODUCT;
        try {
            return OfferingType.valueOf(raw.trim().toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException ex) {
            throw new CatalogException("Unsupported offering type: " + raw);
        }
    }

    private static String toTechTagsCsv(List<String> techTags) {
        return String.join(",", normalizeTechTags(techTags));
    }

    private static List<String> parseTechTagsCsv(String csv) {
        if (csv == null || csv.isBlank()) return List.of();
        return Arrays.stream(csv.split(","))
                .map(String::trim)
                .filter(v -> !v.isBlank())
                .distinct()
                .toList();
    }

    private static List<String> normalizeTechTags(List<String> techTags) {
        if (techTags == null || techTags.isEmpty()) return List.of();

        Set<String> values = new LinkedHashSet<>();
        for (String raw : techTags) {
            if (raw == null || raw.isBlank()) continue;
            for (String part : raw.split(",")) {
                String normalized = part.trim().toLowerCase(Locale.ROOT)
                        .replace('_', '-')
                        .replaceAll("[^a-z0-9+.-]+", "-")
                        .replaceAll("^-+|-+$", "");
                if (!normalized.isBlank()) values.add(normalized);
            }
        }
        return List.copyOf(values);
    }

    private static String toSlug(String title) {
        String normalized = Normalizer.normalize(title.toLowerCase(Locale.ROOT), Normalizer.Form.NFD);
        return Pattern.compile("[^a-z0-9]+").matcher(normalized).replaceAll("-").replaceAll("^-|-$", "");
    }
}
