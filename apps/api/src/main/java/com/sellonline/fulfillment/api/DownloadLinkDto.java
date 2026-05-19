package com.sellonline.fulfillment.api;

import java.util.UUID;

public record DownloadLinkDto(UUID assetId, String filename, String url, long expiresInMinutes) {}
