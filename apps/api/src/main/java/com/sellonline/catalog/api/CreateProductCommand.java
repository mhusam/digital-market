package com.sellonline.catalog.api;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record CreateProductCommand(
        @NotBlank String title,
        String slug,
        String description,
        @NotNull @DecimalMin("0.01") BigDecimal price,
        String currency
) {}
