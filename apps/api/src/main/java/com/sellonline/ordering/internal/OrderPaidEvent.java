package com.sellonline.ordering.internal;

import java.util.UUID;

public record OrderPaidEvent(UUID orderId, String customerEmail) {}
