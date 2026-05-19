package com.sellonline.catalog.api;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

/** Public API of the Catalog module. */
public interface CatalogFacade {
    ProductDto createProduct(CreateProductCommand cmd);
    ProductDto updateProduct(UUID id, UpdateProductCommand cmd);
    ProductDto publishProduct(UUID id);
    ProductDto unpublishProduct(UUID id);
    ProductDto archiveProduct(UUID id);
    ProductDto duplicateProduct(UUID id);
    void deleteProduct(UUID id);
    ProductDto getProduct(UUID id);
    ProductDto getProductBySlug(String slug);
    Page<ProductDto> listProducts(String statusFilter, String search, Pageable pageable);
    Page<ProductDto> listPublishedProducts(String search, Pageable pageable);
    AssetDto attachAsset(UUID productId, MultipartFile file);
    String getDownloadUrl(UUID assetId);
    void removeAsset(UUID assetId);
}
