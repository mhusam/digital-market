package com.sellonline.catalog.api;

import java.time.Instant;
import java.util.UUID;

public record AssetDto(
        UUID id,
        String filename,
        String contentType,
        Long sizeBytes,
        Instant uploadedAt,
        /** Presigned GET URL for image assets when exposed on the storefront (or admin detail). */
        String previewUrl
) {}
