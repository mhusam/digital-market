package com.sellonline.catalog.api;

import java.math.BigDecimal;

public record UpdateProductCommand(String title, String description, BigDecimal price, String currency) {}
