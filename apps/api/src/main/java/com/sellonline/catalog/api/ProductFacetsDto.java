package com.sellonline.catalog.api;

import java.math.BigDecimal;
import java.util.List;

public record ProductFacetsDto(
        List<String> offeringTypes,
        List<String> techTags,
        BigDecimal minPrice,
        BigDecimal maxPrice
) {}
