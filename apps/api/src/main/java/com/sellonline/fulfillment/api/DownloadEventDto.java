package com.sellonline.fulfillment.api;

import java.time.Instant;
import java.util.UUID;

public record DownloadEventDto(UUID id, UUID orderId, UUID assetId, String customerEmail,
                                String ipAddress, Instant downloadedAt) {}
