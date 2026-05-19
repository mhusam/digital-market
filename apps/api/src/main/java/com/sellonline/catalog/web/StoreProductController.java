package com.sellonline.catalog.web;

import com.sellonline.catalog.api.CatalogFacade;
import com.sellonline.catalog.api.ProductDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/store/products")
@RequiredArgsConstructor
public class StoreProductController {

    private final CatalogFacade catalog;

    @GetMapping
    public Page<ProductDto> list(
            @RequestParam(required = false) String search,
            Pageable pageable) {
        return catalog.listPublishedProducts(search, pageable);
    }

    @GetMapping("/{slug}")
    public ProductDto get(@PathVariable String slug) {
        return catalog.getProductBySlug(slug);
    }
}
