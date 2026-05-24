package com.sellonline.catalog.api;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record ProductDto(
        UUID id,
        String title,
        String slug,
        String description,
        BigDecimal price,
        String currency,
        String status,
        String offeringType,
        List<String> techTags,
        List<AssetDto> assets,
        Instant createdAt,
        Instant updatedAt
) {}
