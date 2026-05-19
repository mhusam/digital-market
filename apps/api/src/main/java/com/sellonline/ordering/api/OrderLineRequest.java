package com.sellonline.ordering.api;

import java.util.UUID;

public record OrderLineRequest(UUID productId, int quantity) {}
