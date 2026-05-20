package com.sellonline.ordering.api;

import java.math.BigDecimal;

public record MonthlySalesDto(String month, BigDecimal revenue, long orders) {}
