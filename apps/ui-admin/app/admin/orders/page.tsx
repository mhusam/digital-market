"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ColumnDef } from "@tanstack/react-table";
import { ShoppingBag, ExternalLink, Download } from "lucide-react";
import { adminGetOrders } from "@digital-market/api-client";
import type { Order, OrderStatus } from "@digital-market/shared-types";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/LoadingSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatCurrency, formatDate } from "@/lib/format";

type Filter = "all" | OrderStatus;

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    void adminGetOrders(1, 200).then((res) => res.data && setOrders(res.data));
  }, []);

  const filtered = useMemo(
    () => (orders ? (filter === "all" ? orders : orders.filter((o) => o.status === filter)) : []),
    [orders, filter],
  );

  const statusOptions: { value: Filter; label: string; count: number }[] = useMemo(() => {
    const all = orders ?? [];
    return [
      { value: "all", label: "All", count: all.length },
      { value: "PAID", label: "Paid", count: all.filter((o) => o.status === "PAID").length },
      { value: "FULFILLED", label: "Fulfilled", count: all.filter((o) => o.status === "FULFILLED").length },
      { value: "PENDING_PAYMENT", label: "Pending", count: all.filter((o) => o.status === "PENDING_PAYMENT").length },
      { value: "REFUNDED", label: "Refunded", count: all.filter((o) => o.status === "REFUNDED").length },
      { value: "CANCELLED", label: "Cancelled", count: all.filter((o) => o.status === "CANCELLED").length },
    ];
  }, [orders]);

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: "Order",
      cell: ({ row }) => (
        <Link href={`/admin/orders/${row.original.id}`} className="font-mono text-[12.5px] hover:underline">
          #{row.original.id.slice(-8).toUpperCase()}
        </Link>
      ),
    },
    {
      id: "customer",
      header: "Customer",
      accessorFn: (row) => row.customerName,
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.customerName}</div>
          <div className="text-[11.5px] text-muted">{row.original.customerEmail}</div>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => <span className="text-ink/80">{formatDate(row.original.createdAt)}</span>,
    },
    {
      id: "items",
      header: "Items",
      accessorFn: (row) => row.lines.length,
      cell: ({ row }) => <span className="tabular">{row.original.lines.length}</span>,
    },
    {
      accessorKey: "totalAmount",
      header: "Total",
      cell: ({ row }) => <span className="tabular font-semibold">{formatCurrency(row.original.totalAmount)}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "paymentMethod",
      header: "Method",
      cell: ({ row }) => <StatusBadge status={row.original.paymentMethod} />,
    },
    {
      id: "open",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-end">
          <button
            onClick={() => router.push(`/admin/orders/${row.original.id}`)}
            className="size-8 inline-flex items-center justify-center rounded-md hover:bg-black/5 text-muted"
            aria-label="Open order"
          >
            <ExternalLink className="size-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Orders"
        description="All marketplace transactions and their lifecycle."
        actions={<Button variant="secondary" leftIcon={<Download className="size-4" />}>Export</Button>}
      />

      <div className="flex flex-wrap gap-1.5 mb-4">
        {statusOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={
              "inline-flex items-center gap-2 h-8 px-3 rounded-md text-[12.5px] font-medium border transition-colors " +
              (filter === opt.value
                ? "bg-ink text-white border-ink"
                : "bg-card text-ink/80 border-border hover:border-border-strong")
            }
          >
            {opt.label}
            <span className={"tabular text-[11px] px-1.5 py-0.5 rounded " + (filter === opt.value ? "bg-white/15" : "bg-surface-muted")}>
              {opt.count}
            </span>
          </button>
        ))}
      </div>

      {orders === null ? (
        <Skeleton className="h-[480px]" />
      ) : filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-xl shadow-sm">
          <EmptyState icon={<ShoppingBag className="size-6" />} title="No orders match this view" />
        </div>
      ) : (
        <DataTable
          data={filtered}
          columns={columns}
          searchPlaceholder="Search by order # or customer…"
          pageSize={12}
          onRowClick={(o) => router.push(`/admin/orders/${o.id}`)}
        />
      )}
    </div>
  );
}
