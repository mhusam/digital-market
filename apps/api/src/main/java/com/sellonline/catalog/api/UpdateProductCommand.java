package com.sellonline.catalog.api;

import java.math.BigDecimal;
import java.util.List;

public record UpdateProductCommand(
        String title,
        String description,
        BigDecimal price,
        String currency,
        String offeringType,
        List<String> techTags
) {}
