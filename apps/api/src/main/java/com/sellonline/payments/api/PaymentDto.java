package com.sellonline.payments.api;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public record PaymentDto(
        UUID id,
        UUID orderId,
        String provider,
        String providerIntentId,
        String providerCaptureId,
        String status,
        BigDecimal amount,
        String currency,
        Instant createdAt
) {}
