package com.sellonline.platform.web;

import com.sellonline.catalog.api.CatalogFacade;
import com.sellonline.identity.api.IdentityFacade;
import com.sellonline.ordering.api.DashboardOrderData;
import com.sellonline.ordering.api.OrderingFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminDashboardController {

    private final OrderingFacade orderingFacade;
    private final IdentityFacade identityFacade;
    private final CatalogFacade catalogFacade;

    @GetMapping("/api/v1/admin/dashboard")
    public DashboardStatsDto getDashboard() {
        DashboardOrderData od = orderingFacade.getOrderDashboardData(12, 5, 5);
        return new DashboardStatsDto(
                od.totalOrders(), od.totalRevenue(),
                od.revenueGrowthPercent(), od.ordersGrowthPercent(),
                identityFacade.countCustomers(), 0.0,
                catalogFacade.countProducts(),
                od.salesChart(), od.topProducts(), od.recentOrders()
        );
    }
}
