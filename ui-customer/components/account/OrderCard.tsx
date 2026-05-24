import Link from "next/link";
import type { Order } from "@digital-market/shared-types";
import { formatPrice } from "../../lib/cover";
import { Badge } from "../ui/badge";

const statusTone = {
  paid: "success",
  pending: "warn",
  processing: "warn",
  cancelled: "danger",
  refunded: "danger",
} as const;

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const tone =
    statusTone[order.orderStatus as keyof typeof statusTone] ?? "default";

  return (
    <div className="grid gap-4 rounded-lg border border-border bg-card p-4 shadow-sm md:grid-cols-[1fr_auto_auto] md:items-center">
      <div>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge tone={tone}>{order.orderStatus}</Badge>
          <span className="text-sm font-semibold text-muted-foreground">
            #{order.id.slice(-8)}
          </span>
        </div>
        <h3 className="font-extrabold text-foreground">
          {order.items.length} item{order.items.length === 1 ? "" : "s"}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {new Date(order.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="text-xl font-extrabold text-foreground">
        {formatPrice(order.total ?? 0)}
      </div>
      <Link
        href={`/account/orders/${order.id}`}
        className="inline-flex h-10 items-center justify-center rounded-md border border-border px-4 text-sm font-bold text-foreground/80 hover:bg-muted/40"
      >
        View
      </Link>
    </div>
  );
}
