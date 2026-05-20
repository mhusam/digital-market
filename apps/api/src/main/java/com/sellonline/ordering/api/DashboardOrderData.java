package com.sellonline.ordering.api;

import java.math.BigDecimal;
import java.util.List;

public record DashboardOrderData(
        long totalOrders,
        BigDecimal totalRevenue,
        double revenueGrowthPercent,
        double ordersGrowthPercent,
        List<MonthlySalesDto> salesChart,
        List<TopProductDto> topProducts,
        List<OrderDto> recentOrders
) {}
