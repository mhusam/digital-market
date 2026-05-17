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
    () => (orders ? (filter === "all" ? orders : orders.filter((o) => o.orderStatus === filter)) : []),
    [orders, filter],
  );

  const statusOptions: { value: Filter; label: string; count: number }[] = useMemo(() => {
    const all = orders ?? [];
    return [
      { value: "all", label: "All", count: all.length },
      { value: "paid", label: "Paid", count: all.filter((o) => o.orderStatus === "paid").length },
      { value: "processing", label: "Processing", count: all.filter((o) => o.orderStatus === "processing").length },
      { value: "pending", label: "Pending", count: all.filter((o) => o.orderStatus === "pending").length },
      { value: "refunded", label: "Refunded", count: all.filter((o) => o.orderStatus === "refunded").length },
      { value: "cancelled", label: "Cancelled", count: all.filter((o) => o.orderStatus === "cancelled").length },
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
      accessorFn: (row) => row.user?.displayName ?? "",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.user?.displayName ?? "—"}</div>
          <div className="text-[11.5px] text-[#6b6760]">{row.original.user?.email ?? ""}</div>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => <span className="text-[#3a3833]">{formatDate(row.original.createdAt)}</span>,
    },
    {
      id: "items",
      header: "Items",
      accessorFn: (row) => row.items.length,
      cell: ({ row }) => <span className="tabular">{row.original.items.length}</span>,
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => <span className="tabular font-semibold">{formatCurrency(row.original.total)}</span>,
    },
    {
      accessorKey: "orderStatus",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.orderStatus} />,
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment",
      cell: ({ row }) => <StatusBadge status={row.original.paymentStatus} />,
    },
    {
      id: "open",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-end">
          <button
            onClick={() => router.push(`/admin/orders/${row.original.id}`)}
            className="size-8 inline-flex items-center justify-center rounded-md hover:bg-black/5 text-[#6b6760]"
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
                ? "bg-[#1B1B1B] text-white border-[#1B1B1B]"
                : "bg-white text-[#3a3833] border-[#e8e5df] hover:border-[#d8d4cc]")
            }
          >
            {opt.label}
            <span className={"tabular text-[11px] px-1.5 py-0.5 rounded " + (filter === opt.value ? "bg-white/15" : "bg-[#f1ede4]")}>
              {opt.count}
            </span>
          </button>
        ))}
      </div>

      {orders === null ? (
        <Skeleton className="h-[480px]" />
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-[#e8e5df] rounded-xl">
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
