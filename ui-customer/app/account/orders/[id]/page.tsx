"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getOrder } from "@digital-market/api-client";
import type { Order } from "@digital-market/shared-types";
import { Card } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { EmptyState } from "../../../../components/ui/app-empty-state";
import { Skeleton } from "../../../../components/ui/skeleton";
import {
  formatDate,
  formatStatusLabel,
  orderTone,
  paymentTone,
} from "../../../../lib/account";
import { formatPrice } from "../../../../lib/cover";

export default function AccountOrderDetailPage() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      const response = await getOrder(params.id);
      if (cancelled) return;
      setOrder(response.data ?? null);
      setLoading(false);
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [params.id]);

  if (loading) {
    return <Skeleton className="h-[620px] rounded-[32px]" />;
  }

  if (!order) {
    return (
      <Card className="p-6 md:p-7">
        <EmptyState
          illustration="orders"
          title="Order not found"
          description="This order either does not belong to the current customer session or has not been created yet."
          ctaHref="/account/orders"
          ctaLabel="Back to orders"
        />
      </Card>
    );
  }

  const orderStatus = (order.orderStatus ?? order.status ?? "pending").toString();
  const paymentStatus = (order.paymentStatus ?? "pending").toString();
  const items = Array.isArray(order.items) ? order.items : [];

  return (
    <div className="space-y-6">
      <Card className="p-6 md:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
              Order detail
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.03em]">
              #{order.id}
            </h2>
            <p className="mt-3 text-sm font-semibold text-muted-foreground">
              Created {formatDate(order.createdAt)}. Review payment outcome,
              purchased items, and next actions from one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge tone={orderTone[orderStatus as keyof typeof orderTone] ?? "warn"}>
              {formatStatusLabel(orderStatus)}
            </Badge>
            <Badge tone={paymentTone[paymentStatus as keyof typeof paymentTone] ?? "warn"}>
              Payment {formatStatusLabel(paymentStatus)}
            </Badge>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <SummaryStat label="Subtotal" value={formatPrice(order.subtotal ?? 0)} />
          <SummaryStat
            label="Discount"
            value={formatPrice(order.discountAmount ?? 0)}
          />
          <SummaryStat label="Total" value={formatPrice(order.total ?? 0)} />
        </div>
      </Card>

      <Card className="p-6 md:p-7">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-2xl font-black tracking-[-0.03em]">Items</h3>
          <span className="text-sm font-semibold text-muted-foreground">
            {items.length} item{items.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="mt-5 space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-[28px] border border-border bg-muted/40 px-5 py-4"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-lg font-black tracking-[-0.02em]">
                    {item.product?.title ?? "Product"}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-muted-foreground">
                    {formatStatusLabel(item.licenseType)} license
                  </p>
                </div>
                <span className="text-xl font-black">
                  {formatPrice(item.unitPrice)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 md:p-7">
        <div className="flex flex-wrap gap-3">
          {order.paymentStatus === "paid" && (
            <>
              <Link
                href={`/account/invoices/${order.id}`}
                className="btn-pill h-11 bg-primary px-6 text-sm text-primary-foreground hover:bg-primary/90"
              >
                View invoice
              </Link>
              <Link
                href="/account/downloads"
                className="btn-pill h-11 border-2 border-border bg-card px-6 text-sm text-foreground hover:bg-muted/40"
              >
                Go to downloads
              </Link>
            </>
          )}
          <Link
            href="/account/support"
            className="btn-pill h-11 border-2 border-border bg-card px-6 text-sm text-foreground hover:bg-muted/40"
          >
            Open support
          </Link>
        </div>

        {order.notes && (
          <div className="mt-5 rounded-[28px] border border-accent bg-muted/40 px-5 py-4">
            <p className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
              Internal note surfaced to customer
            </p>
            <p className="mt-2 text-sm font-semibold text-muted-foreground">
              {order.notes}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[28px] bg-muted/40 px-5 py-5">
      <p className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-2xl font-black tracking-[-0.03em]">{value}</p>
    </div>
  );
}
