package com.sellonline.platform.web;

import com.sellonline.ordering.api.MonthlySalesDto;
import com.sellonline.ordering.api.OrderDto;
import com.sellonline.ordering.api.TopProductDto;

import java.math.BigDecimal;
import java.util.List;

public record DashboardStatsDto(
        long totalOrders,
        BigDecimal totalRevenue,
        double revenueGrowthPercent,
        double ordersGrowthPercent,
        long totalCustomers,
        double customersGrowthPercent,
        long totalProducts,
        List<MonthlySalesDto> salesChart,
        List<TopProductDto> topProducts,
        List<OrderDto> recentOrders
) {}
