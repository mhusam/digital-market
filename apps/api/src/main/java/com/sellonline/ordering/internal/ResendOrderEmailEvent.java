package com.sellonline.ordering.internal;

import java.util.UUID;

public record ResendOrderEmailEvent(UUID orderId, String customerEmail) {}
