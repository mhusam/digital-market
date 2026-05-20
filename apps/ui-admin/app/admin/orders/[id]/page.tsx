"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, CheckCircle, XCircle, StickyNote } from "lucide-react";
import {
  adminGetOrder,
  adminMarkOrderPaid,
  adminCancelOrder,
  adminResendOrderEmail,
  adminAddOrderNote,
} from "@digital-market/api-client";
import type { Order } from "@digital-market/shared-types";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Skeleton } from "@/components/ui/LoadingSkeleton";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { toast } from "@/components/ui/Toast";
import { formatCurrencyPrecise, formatDateTime } from "@/lib/format";
import { Table } from "@/components/ui/Table";

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [working, setWorking] = useState(false);
  const [note, setNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  const load = async () => {
    const res = await adminGetOrder(id);
    if (res.data) {
      setOrder(res.data);
      setNote(res.data.internalNotes ?? "");
    }
  };

  useEffect(() => {
    let active = true;
    void adminGetOrder(id).then((res) => {
      if (active && res.data) {
        setOrder(res.data);
        setNote(res.data.internalNotes ?? "");
      }
    });
    return () => { active = false; };
  }, [id]);

  const markPaid = async () => {
    setWorking(true);
    const res = await adminMarkOrderPaid(id);
    setWorking(false);
    if (res.success) {
      toast.success("Order marked as paid");
      void load();
    } else toast.error(res.message ?? "Action failed");
  };

  const cancelOrder = async () => {
    setWorking(true);
    const res = await adminCancelOrder(id);
    setWorking(false);
    setConfirmCancel(false);
    if (res.success) {
      toast.success("Order cancelled");
      void load();
    } else toast.error(res.message ?? "Cancel failed");
  };

  const resendEmail = async () => {
    setWorking(true);
    const res = await adminResendOrderEmail(id);
    setWorking(false);
    if (res.success) toast.success("Confirmation email resent");
    else toast.error(res.message ?? "Resend failed");
  };

  const saveNote = async () => {
    setSavingNote(true);
    const res = await adminAddOrderNote(id, note);
    setSavingNote(false);
    if (res.success) toast.success("Note saved");
    else toast.error(res.message ?? "Save failed");
  };

  if (!order) {
    return (
      <div>
        <PageHeader title="Order" />
        <Skeleton className="h-[500px]" />
      </div>
    );
  }

  const nameParts = order.customerName.trim().split(/\s+/);
  const avatarInitials = nameParts.length >= 2
    ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
    : order.customerName.slice(0, 2).toUpperCase();

  const isPending = order.status === "PENDING_PAYMENT";

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
            <StatusBadge status={order.status} />
            <span className="text-[12px] text-muted">Payment:</span>
            <StatusBadge status={order.paymentMethod} />
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <Card title="Items" flush>
            <Table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th className="cell-numeric">Qty</th>
                  <th className="cell-numeric">Unit price</th>
                  <th className="cell-numeric">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.lines.map((line) => (
                  <tr key={line.id}>
                    <td className="font-medium">{line.productTitle}</td>
                    <td className="cell-numeric">{line.quantity}</td>
                    <td className="cell-numeric">{formatCurrencyPrecise(line.unitPrice)}</td>
                    <td className="cell-numeric font-semibold">
                      {formatCurrencyPrecise(line.quantity * line.unitPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>

          <Card title="Payment summary">
            <dl className="divide-y divide-border-subtle">
              <Row label="Total" value={formatCurrencyPrecise(order.totalAmount)} bold />
              <Row label="Currency" value={order.currency} muted />
              <Row label="Method" value={order.paymentMethod} muted />
              {order.paymentReference && (
                <Row label="Reference" value={order.paymentReference} muted mono />
              )}
            </dl>
          </Card>
        </div>

        <aside className="space-y-5">
          <Card title="Customer">
            <div className="flex items-center gap-3 mb-3">
              <span className="size-10 inline-flex items-center justify-center bg-ink text-primary rounded-lg font-semibold text-[13px]">
                {avatarInitials}
              </span>
              <div className="min-w-0">
                <div className="font-semibold truncate">{order.customerName}</div>
                <div className="text-[12px] text-muted truncate">{order.customerEmail}</div>
              </div>
            </div>
          </Card>

          <Card title="Actions">
            <div className="space-y-2">
              {isPending && (
                <Button
                  variant="primary"
                  className="w-full"
                  leftIcon={<CheckCircle className="size-4" />}
                  onClick={markPaid}
                  disabled={working}
                >
                  Mark as Paid
                </Button>
              )}
              {isPending && (
                <Button
                  variant="danger"
                  className="w-full"
                  leftIcon={<XCircle className="size-4" />}
                  onClick={() => setConfirmCancel(true)}
                  disabled={working}
                >
                  Cancel Order
                </Button>
              )}
              <Button
                variant="secondary"
                className="w-full"
                leftIcon={<Send className="size-4" />}
                onClick={resendEmail}
                disabled={working}
              >
                Resend Confirmation
              </Button>
            </div>

            <div className="mt-4 border-t border-border-subtle pt-4">
              <label className="text-[12px] font-medium text-ink/80 flex items-center gap-1.5 mb-2">
                <StickyNote className="size-3.5" />
                Internal notes
              </label>
              <textarea
                className="w-full rounded-lg border border-border bg-surface-muted px-3 py-2 text-[13px] resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                rows={4}
                placeholder="Add notes visible only to admins…"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <Button
                variant="secondary"
                className="w-full mt-2"
                onClick={saveNote}
                disabled={savingNote}
              >
                {savingNote ? "Saving…" : "Save note"}
              </Button>
            </div>
          </Card>

          <Card title="Timeline">
            <ul className="text-[12.5px] space-y-2 text-ink/80">
              <li><span className="text-muted">Created</span> · {formatDateTime(order.createdAt)}</li>
              <li><span className="text-muted">Updated</span> · {formatDateTime(order.updatedAt)}</li>
            </ul>
          </Card>
        </aside>
      </div>

      <ConfirmDialog
        open={confirmCancel}
        title="Cancel this order?"
        message="This will cancel the order. The customer will not be charged."
        destructive
        confirmLabel="Cancel order"
        onConfirm={cancelOrder}
        onCancel={() => setConfirmCancel(false)}
      />
    </div>
  );
}

function Card({ title, children, flush }: { title: string; children: React.ReactNode; flush?: boolean }) {
  return (
    <section className="panel">
      <div className="panel-header !py-3">
        <h2 className="text-[13px] uppercase tracking-wider font-semibold text-muted">{title}</h2>
      </div>
      {flush ? children : <div className="p-5">{children}</div>}
    </section>
  );
}

function Row({ label, value, bold, muted, mono }: { label: string; value: string; bold?: boolean; muted?: boolean; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2">
      <dt className={"text-[13px] " + (muted ? "text-muted" : "text-ink/80")}>{label}</dt>
      <dd className={
        "tabular text-[13px] " +
        (bold ? "font-bold text-[15px]" : "") +
        (mono ? " font-mono text-[12px]" : "")
      }>{value}</dd>
    </div>
  );
}
