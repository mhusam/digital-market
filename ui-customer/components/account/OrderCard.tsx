import Link from "next/link";
import type { Order } from "@digital-market/shared-types";
import { Badge } from "../ui/Badge";
import { formatPrice } from "../../lib/cover";

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
    <div className="bg-white rounded-3xl p-5 border border-[#1B1B1B]/5 shadow-[0_8px_24px_-14px_rgba(17,24,39,0.18)] flex flex-col md:flex-row md:items-center gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Badge tone={tone}>{order.orderStatus}</Badge>
          <span className="text-[11px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/55">
            #{order.id.slice(-8)}
          </span>
        </div>
        <h4 className="font-black text-[17px] tracking-[-0.02em]">
          {order.items.length} item{order.items.length === 1 ? "" : "s"}
        </h4>
        <p className="text-[13px] text-[#1B1B1B]/65 font-semibold">
          {new Date(order.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="text-right">
        <div className="font-black text-2xl tracking-[-0.02em]">
          {formatPrice(order.total)}
        </div>
      </div>
      <Link
        href={`/account/orders/${order.id}`}
        className="btn-pill bg-[#1B1B1B] text-[#1E5FAF] h-10 px-5 text-[13px]"
      >
        View
      </Link>
    </div>
  );
}
