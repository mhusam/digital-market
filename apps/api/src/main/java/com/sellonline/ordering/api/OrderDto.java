package com.sellonline.ordering.api;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record OrderDto(
        UUID id,
        UUID customerId,
        String customerEmail,
        String customerName,
        String status,
        String paymentMethod,
        String paymentReference,
        BigDecimal totalAmount,
        String currency,
        String internalNotes,
        String confirmationToken,
        List<OrderLineDto> lines,
        Instant createdAt,
        Instant updatedAt
) {}
