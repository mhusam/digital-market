package com.sellonline.catalog.web;

import com.sellonline.catalog.api.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/products")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminProductController {

    private final CatalogFacade catalog;

    @GetMapping
    public Page<ProductDto> list(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search,
            Pageable pageable) {
        return catalog.listProducts(status, search, pageable);
    }

    @GetMapping("/{id}")
    public ProductDto get(@PathVariable UUID id) {
        return catalog.getProduct(id);
    }

    @PostMapping
    public ResponseEntity<ProductDto> create(@Valid @RequestBody CreateProductCommand cmd) {
        return ResponseEntity.ok(catalog.createProduct(cmd));
    }

    @PutMapping("/{id}")
    public ProductDto update(@PathVariable UUID id, @RequestBody UpdateProductCommand cmd) {
        return catalog.updateProduct(id, cmd);
    }

    @PostMapping("/{id}/publish")
    public ProductDto publish(@PathVariable UUID id) { return catalog.publishProduct(id); }

    @PostMapping("/{id}/unpublish")
    public ProductDto unpublish(@PathVariable UUID id) { return catalog.unpublishProduct(id); }

    @PostMapping("/{id}/archive")
    public ProductDto archive(@PathVariable UUID id) { return catalog.archiveProduct(id); }

    @PostMapping("/{id}/duplicate")
    public ProductDto duplicate(@PathVariable UUID id) { return catalog.duplicateProduct(id); }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        catalog.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping(value = "/{id}/assets", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public AssetDto uploadAsset(@PathVariable UUID id, @RequestParam MultipartFile file) {
        return catalog.attachAsset(id, file);
    }

    @GetMapping("/assets/{assetId}/download-url")
    public ResponseEntity<String> downloadUrl(@PathVariable UUID assetId) {
        return ResponseEntity.ok(catalog.getDownloadUrl(assetId));
    }

    @DeleteMapping("/assets/{assetId}")
    public ResponseEntity<Void> removeAsset(@PathVariable UUID assetId) {
        catalog.removeAsset(assetId);
        return ResponseEntity.noContent().build();
    }
}
