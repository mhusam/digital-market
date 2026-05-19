package com.sellonline.payments.api;

public record CreatePayPalOrderResult(String paypalOrderId, String approvalUrl) {}
