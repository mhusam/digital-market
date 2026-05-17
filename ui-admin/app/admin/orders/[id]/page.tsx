"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Receipt, AlertTriangle } from "lucide-react";
import { adminGetOrder, adminUpdateOrderStatus, adminRefundOrder } from "@digital-market/api-client";
import type { Order, OrderStatus } from "@digital-market/shared-types";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Skeleton } from "@/components/ui/LoadingSkeleton";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { toast } from "@/components/ui/Toast";
import { formatCurrencyPrecise, formatDateTime, initials } from "@/lib/format";

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [confirmRefund, setConfirmRefund] = useState(false);

  const load = async () => {
    const res = await adminGetOrder(id);
    if (res.data) setOrder(res.data);
  };

  useEffect(() => {
    let active = true;
    void adminGetOrder(id).then((res) => {
      if (active && res.data) setOrder(res.data);
    });
    return () => {
      active = false;
    };
  }, [id]);

  const updateStatus = async (newStatus: OrderStatus) => {
    const res = await adminUpdateOrderStatus(id, newStatus);
    if (res.success) {
      toast.success(`Status set to ${newStatus}`);
      void load();
    } else toast.error(res.message ?? "Update failed");
  };

  const refund = async () => {
    const res = await adminRefundOrder(id);
    setConfirmRefund(false);
    if (res.success) {
      toast.success("Order refunded");
      void load();
    } else toast.error(res.message ?? "Refund failed");
  };

  if (!order) {
    return (
      <div>
        <PageHeader title="Order" />
        <Skeleton className="h-[500px]" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={`Order #${order.id.slice(-8).toUpperCase()}`}
        description={`Placed ${formatDateTime(order.createdAt)}`}
        actions={
          <Link href="/admin/orders">
            <Button variant="secondary" leftIcon={<ArrowLeft className="size-4" />}>Back to orders</Button>
          </Link>
        }
        meta={
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={order.orderStatus} />
            <span className="text-[12px] text-[#6b6760]">Payment:</span>
            <StatusBadge status={order.paymentStatus} />
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <Card title="Items">
            <table className="w-full text-sm">
              <thead className="text-[11px] uppercase tracking-wide text-[#6b6760] bg-[#faf9f5]">
                <tr>
                  <th className="text-left px-4 py-2.5 font-semibold">Product</th>
                  <th className="text-left px-4 py-2.5 font-semibold">License</th>
                  <th className="text-right px-4 py-2.5 font-semibold">Qty</th>
                  <th className="text-right px-4 py-2.5 font-semibold">Unit price</th>
                  <th className="text-right px-4 py-2.5 font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id} className="border-t border-[#f3efe6]">
                    <td className="px-4 py-3 font-medium">{item.product?.title ?? item.productId}</td>
                    <td className="px-4 py-3 capitalize text-[12.5px]">{item.licenseType}</td>
                    <td className="px-4 py-3 text-right tabular">{item.quantity}</td>
                    <td className="px-4 py-3 text-right tabular">{formatCurrencyPrecise(item.unitPrice)}</td>
                    <td className="px-4 py-3 text-right tabular font-semibold">{formatCurrencyPrecise(item.quantity * item.unitPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card title="Payment summary">
            <dl className="divide-y divide-[#eee9de]">
              <Row label="Subtotal" value={formatCurrencyPrecise(order.subtotal)} />
              {order.discountAmount > 0 && (
                <Row label={`Discount${order.couponCode ? ` (${order.couponCode})` : ""}`} value={`− ${formatCurrencyPrecise(order.discountAmount)}`} accent />
              )}
              <Row label="Total" value={formatCurrencyPrecise(order.total)} bold />
              {order.paymentMethod && <Row label="Method" value={order.paymentMethod} muted />}
              {order.paymentIntentId && <Row label="Payment Intent" value={order.paymentIntentId} muted mono />}
            </dl>
          </Card>
        </div>

        <aside className="space-y-5">
          <Card title="Customer">
            <div className="flex items-center gap-3 mb-3">
              <span className="size-10 inline-flex items-center justify-center bg-[#1B1B1B] text-[#4F46E5] rounded-lg font-semibold">
                {initials(order.user?.firstName ?? "?", order.user?.lastName ?? "?")}
              </span>
              <div className="min-w-0">
                <div className="font-semibold truncate">{order.user?.displayName ?? "Unknown"}</div>
                <div className="text-[12px] text-[#6b6760] truncate">{order.user?.email}</div>
              </div>
            </div>
            <p className="text-[12px] text-[#6b6760]">
              Customer management is part of the next admin phase. This core flow keeps the order and contact context visible here.
            </p>
          </Card>

          <Card title="Actions">
            <Select
              label="Update status"
              value={order.orderStatus}
              onChange={(e) => updateStatus(e.target.value as OrderStatus)}
              options={[
                { value: "pending", label: "Pending" },
                { value: "processing", label: "Processing" },
                { value: "paid", label: "Paid" },
                { value: "cancelled", label: "Cancelled" },
                { value: "refunded", label: "Refunded" },
              ]}
            />
            <Button variant="secondary" className="w-full mt-3" leftIcon={<Receipt className="size-4" />}>
              View invoice
            </Button>
            {order.orderStatus !== "refunded" && (
              <Button
                variant="danger"
                className="w-full mt-2"
                leftIcon={<AlertTriangle className="size-4" />}
                onClick={() => setConfirmRefund(true)}
              >
                Refund order
              </Button>
            )}
          </Card>

          <Card title="Timeline">
            <ul className="text-[12.5px] space-y-2 text-[#3a3833]">
              <li><span className="text-[#6b6760]">Created</span> · {formatDateTime(order.createdAt)}</li>
              <li><span className="text-[#6b6760]">Updated</span> · {formatDateTime(order.updatedAt)}</li>
            </ul>
          </Card>
        </aside>
      </div>

      <ConfirmDialog
        open={confirmRefund}
        title="Refund this order?"
        message={`This will refund ${formatCurrencyPrecise(order.total)} and mark the order as refunded. The customer's downloads will be revoked.`}
        destructive
        confirmLabel="Refund"
        onConfirm={refund}
        onCancel={() => setConfirmRefund(false)}
      />
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white border border-[#e8e5df] rounded-xl overflow-hidden">
      <div className="px-5 py-3 border-b border-[#eee9de]">
        <h2 className="text-[13px] uppercase tracking-wider font-semibold text-[#6b6760]">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function Row({ label, value, bold, accent, muted, mono }: { label: string; value: string; bold?: boolean; accent?: boolean; muted?: boolean; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2">
      <dt className={"text-[13px] " + (muted ? "text-[#6b6760]" : "text-[#3a3833]")}>{label}</dt>
      <dd className={
        "tabular text-[13px] " +
        (bold ? "font-bold text-[15px]" : "") +
        (accent ? " text-[#22c55e]" : "") +
        (mono ? " font-mono text-[12px]" : "")
      }>{value}</dd>
    </div>
  );
}
