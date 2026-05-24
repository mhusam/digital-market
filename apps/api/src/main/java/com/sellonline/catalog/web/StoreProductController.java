package com.sellonline.catalog.web;

import com.sellonline.catalog.api.CatalogFacade;
import com.sellonline.catalog.api.ProductDto;
import com.sellonline.catalog.api.ProductFacetsDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/store/products")
@RequiredArgsConstructor
public class StoreProductController {

    private final CatalogFacade catalog;

    @GetMapping
    public Page<ProductDto> list(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) List<String> tags,
            @RequestParam(required = false) BigDecimal priceMin,
            @RequestParam(required = false) BigDecimal priceMax,
            @RequestParam(required = false) String sort,
            Pageable pageable) {
        return catalog.listPublishedProducts(
                search,
                type,
                normalizeTags(tags),
                priceMin,
                priceMax,
                sort,
                pageable);
    }

    @GetMapping("/facets")
    public ProductFacetsDto facets(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) BigDecimal priceMin,
            @RequestParam(required = false) BigDecimal priceMax) {
        return catalog.getPublishedProductFacets(search, type, priceMin, priceMax);
    }

    @GetMapping("/{slug}")
    public ProductDto get(@PathVariable String slug) {
        return catalog.getProductBySlug(slug);
    }

    private static List<String> normalizeTags(List<String> tags) {
        if (tags == null || tags.isEmpty()) return List.of();
        List<String> values = new ArrayList<>();
        for (String item : tags) {
            if (item == null || item.isBlank()) continue;
            for (String part : item.split(",")) {
                String value = part.trim();
                if (!value.isBlank()) values.add(value);
            }
        }
        return values;
    }
}
