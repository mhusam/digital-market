package com.sellonline.ordering.api;

import java.math.BigDecimal;
import java.util.UUID;

public record TopProductDto(UUID productId, String title, BigDecimal revenue, long salesCount) {}
