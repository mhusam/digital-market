package com.sellonline.ordering.api;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;
import java.util.UUID;

public record CreateOrderCommand(
        UUID customerId,
        @NotBlank @Email String customerEmail,
        @NotBlank String customerName,
        @NotEmpty List<OrderLineRequest> lines,
        @NotBlank String paymentMethod
) {}
