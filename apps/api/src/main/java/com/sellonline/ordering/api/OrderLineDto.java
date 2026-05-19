package com.sellonline.ordering.api;

import java.math.BigDecimal;
import java.util.UUID;

public record OrderLineDto(UUID id, UUID productId, String productTitle, BigDecimal unitPrice, int quantity) {}
