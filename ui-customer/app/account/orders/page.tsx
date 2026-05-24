"use client";

import { useEffect, useState } from "react";
import { getOrders } from "@digital-market/api-client";
import type { Order } from "@digital-market/shared-types";
import { OrderCard } from "../../../components/account/OrderCard";
import { Card } from "../../../components/ui/card";
import { EmptyState } from "../../../components/ui/app-empty-state";
import { Skeleton } from "../../../components/ui/skeleton";

export default function AccountOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      const response = await getOrders();
      if (cancelled) return;
      setOrders(response.data ?? []);
      setLoading(false);
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Card className="p-6 md:p-7">
      <div className="max-w-2xl">
        <p className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
          Orders
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-[-0.03em]">
          Review every purchase and payment outcome.
        </h2>
        <p className="mt-3 text-sm font-semibold text-muted-foreground">
          Paid, pending, refunded, and cancelled states stay visible so the
          account experience covers realistic marketplace scenarios.
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-28 rounded-[28px]" />
          ))
        ) : orders.length > 0 ? (
          orders.map((order) => <OrderCard key={order.id} order={order} />)
        ) : (
          <EmptyState
            illustration="orders"
            title="No orders yet"
            description="New customer accounts begin with an empty purchase history."
            ctaHref="/products"
            ctaLabel="Browse products"
          />
        )}
      </div>
    </Card>
  );
}
