"use client";

import { useEffect, useMemo, useState } from "react";
import { CreditCard } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { adminGetPayments } from "@digital-market/api-client";
import type { Payment, PaymentStatus } from "@digital-market/shared-types";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Skeleton } from "@/components/ui/LoadingSkeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatCurrencyPrecise, formatDateTime } from "@/lib/format";

type Filter = "all" | PaymentStatus;

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[] | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    void adminGetPayments(1, 200).then((res) => res.data && setPayments(res.data));
  }, []);

  const filtered = useMemo(
    () => (payments ? (filter === "all" ? payments : payments.filter((p) => p.status === filter)) : []),
    [payments, filter],
  );

  const statusOptions: { value: Filter; label: string; count: number }[] = useMemo(() => {
    const all = payments ?? [];
    return [
      { value: "all", label: "All", count: all.length },
      { value: "CREATED", label: "Created", count: all.filter((p) => p.status === "CREATED").length },
      { value: "CAPTURED", label: "Captured", count: all.filter((p) => p.status === "CAPTURED").length },
      { value: "FAILED", label: "Failed", count: all.filter((p) => p.status === "FAILED").length },
      { value: "CANCELLED", label: "Cancelled", count: all.filter((p) => p.status === "CANCELLED").length },
    ];
  }, [payments]);

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "id",
      header: "Payment ID",
      cell: ({ row }) => (
        <span className="font-mono text-[12.5px]">#{row.original.id.slice(-8).toUpperCase()}</span>
      ),
    },
    {
      accessorKey: "orderId",
      header: "Order",
      cell: ({ row }) => (
        <span className="font-mono text-[12.5px]">#{row.original.orderId.slice(-8).toUpperCase()}</span>
      ),
    },
    {
      accessorKey: "provider",
      header: "Provider",
      cell: ({ row }) => <span className="capitalize">{row.original.provider.toLowerCase()}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <span className="tabular font-semibold">
          {row.original.amount != null ? formatCurrencyPrecise(row.original.amount, row.original.currency ?? "USD") : "—"}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => <span className="text-ink/80">{formatDateTime(row.original.createdAt)}</span>,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Payments"
        description="All payment records across the marketplace."
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

      {payments === null ? (
        <Skeleton className="h-[480px]" />
      ) : filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-xl shadow-sm">
          <EmptyState icon={<CreditCard className="size-6" />} title="No payments match this view" />
        </div>
      ) : (
        <DataTable
          data={filtered}
          columns={columns}
          searchPlaceholder="Search by payment or order ID…"
          pageSize={12}
        />
      )}
    </div>
  );
}
