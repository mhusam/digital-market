"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DollarSign, ShoppingBag, Users, Package, ArrowRight, TrendingUp } from "lucide-react";
import { getDashboard } from "@digital-market/api-client";
import type { DashboardStats } from "@digital-market/shared-types";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/ui/StatCard";
import { AreaChartCard, ChartCard } from "@/components/ui/Chart";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Skeleton } from "@/components/ui/LoadingSkeleton";
import { Table } from "@/components/ui/Table";
import { formatCurrency, formatDate, formatNumber } from "@/lib/format";
import { useAdminStore } from "@/store/adminStore";

export default function DashboardPage() {
  const isAuthenticated = useAdminStore((s) => s.isAuthenticated);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    let active = true;
    void getDashboard()
      .then((res) => {
        if (active && res.data) setStats(res.data);
      })
      .catch(() => {
        if (active) setStats(null);
      });
    return () => {
      active = false;
    };
  }, [isAuthenticated]);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Real-time view of revenue, orders, customers, and catalog health."
        actions={
          <Link
            href="/admin/orders"
            className="text-[13px] font-medium inline-flex items-center gap-1.5 text-ink hover:underline"
          >
            Review live orders <ArrowRight className="size-3.5" />
          </Link>
        }
        meta={
          <div className="inline-flex items-center gap-2 text-[12px] text-muted">
            <span className="size-1.5 bg-[#22c55e] rounded-full animate-pulse" />
            Live · last updated {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats ? (
          <>
            <StatCard
              label="Total Revenue"
              value={formatCurrency(stats.totalRevenue)}
              trend={stats.revenueGrowthPercent}
              icon={<DollarSign className="size-4" />}
              accent="yellow"
              sparkline={stats.salesChart.map((p) => p.revenue)}
              delay={0}
            />
            <StatCard
              label="Total Orders"
              value={formatNumber(stats.totalOrders)}
              trend={stats.ordersGrowthPercent}
              icon={<ShoppingBag className="size-4" />}
              accent="teal"
              sparkline={stats.salesChart.map((p) => p.orders)}
              delay={0.05}
            />
            <StatCard
              label="Customers"
              value={formatNumber(stats.totalCustomers)}
              trend={stats.customersGrowthPercent}
              icon={<Users className="size-4" />}
              accent="violet"
              delay={0.1}
            />
            <StatCard
              label="Products"
              value={formatNumber(stats.totalProducts)}
              icon={<Package className="size-4" />}
              accent="coral"
              delay={0.15}
            />
          </>
        ) : (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32" />)
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <div className="lg:col-span-2">
          <ChartCard
            title="Revenue · last 12 months"
            action={
              <span className="inline-flex items-center gap-1.5 text-[12px] text-[#15803d] bg-[#dcfce7] px-2 py-0.5 rounded-md font-medium">
                <TrendingUp className="size-3" />
                +{stats?.revenueGrowthPercent.toFixed(1) ?? "—"}%
              </span>
            }
          >
            {stats ? (
              <AreaChartCard data={stats.salesChart} xKey="month" yKey="revenue" valuePrefix="$" />
            ) : (
              <Skeleton className="h-[280px]" />
            )}
          </ChartCard>
        </div>

        <div>
          <ChartCard title="Top Products">
            {stats ? (
              <ul className="space-y-3">
                {stats.topProducts.slice(0, 5).map((p, i) => {
                  const max = stats.topProducts[0]?.revenue || 1;
                  const pct = (p.revenue / max) * 100;
                  return (
                    <li key={p.productId}>
                      <div className="flex items-baseline justify-between gap-3 mb-1.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="size-5 inline-flex items-center justify-center bg-indigo-50 text-primary-dark border border-indigo-200 rounded text-[10.5px] font-semibold tabular shrink-0">
                            {i + 1}
                          </span>
                          <span className="text-[13px] font-medium truncate">{p.title}</span>
                        </div>
                        <span className="text-[12.5px] tabular font-semibold shrink-0">
                          {formatCurrency(p.revenue)}
                        </span>
                      </div>
                      <div className="h-1.5 bg-border-subtle rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="text-[11px] text-muted mt-1 tabular">
                        {formatNumber(p.salesCount)} sales
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <Skeleton className="h-[280px]" />
            )}
          </ChartCard>
        </div>
      </div>

      <div className="panel mt-4">
        <div className="panel-header">
          <h3 className="text-[15px] font-semibold tracking-tight text-ink">Recent Orders</h3>
          <Link href="/admin/orders" className="text-[12.5px] font-medium text-ink hover:underline inline-flex items-center gap-1">
            View all <ArrowRight className="size-3" />
          </Link>
        </div>
        <Table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Status</th>
              <th className="cell-numeric">Total</th>
            </tr>
          </thead>
          <tbody>
            {stats?.recentOrders.slice(0, 5).map((o) => (
              <tr key={o.id}>
                <td className="font-mono text-[12.5px]">#{o.id.slice(-8).toUpperCase()}</td>
                <td>
                  <div className="font-medium">{o.customerName}</div>
                  <div className="text-[11.5px] text-muted">{o.customerEmail}</div>
                </td>
                <td className="cell-muted">{formatDate(o.createdAt)}</td>
                <td><StatusBadge status={o.status} /></td>
                <td className="cell-numeric font-semibold">{formatCurrency(o.totalAmount)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
