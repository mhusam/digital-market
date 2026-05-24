"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getInvoice, getOrder } from "@digital-market/api-client";
import type { Order } from "@digital-market/shared-types";
import { Download, Printer } from "lucide-react";
import { Card } from "../../../../components/ui/card";
import { EmptyState } from "../../../../components/ui/app-empty-state";
import { Skeleton } from "../../../../components/ui/skeleton";
import { formatDate } from "../../../../lib/account";
import { formatPrice } from "../../../../lib/cover";
import { toast } from "../../../../store/toastStore";

interface InvoiceData {
  invoiceNumber: string;
  downloadUrl: string;
}

export default function AccountInvoicePage() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      const [orderResponse, invoiceResponse] = await Promise.all([
        getOrder(params.id),
        getInvoice(params.id),
      ]);
      if (cancelled) return;
      setOrder(orderResponse.data ?? null);
      setInvoice(invoiceResponse.data ?? null);
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

  if (!order || !invoice) {
    return (
      <Card className="p-6 md:p-7">
        <EmptyState
          title="Invoice not available"
          description="Invoices are only generated for paid orders tied to the current customer account."
          ctaHref="/account/orders"
          ctaLabel="Back to orders"
        />
      </Card>
    );
  }

  const billing = order.user?.billingAddress;

  return (
    <Card className="p-6 md:p-8 print-clean">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
            Invoice
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.03em]">
            {invoice.invoiceNumber}
          </h2>
          <p className="mt-3 text-sm font-semibold text-muted-foreground">
            Issued for order {order.id} on {formatDate(order.createdAt)}.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 no-print">
          <button
            type="button"
            onClick={() => window.print()}
            className="btn-pill h-11 border-2 border-border bg-card px-5 text-sm text-foreground"
          >
            <Printer size={15} strokeWidth={2.6} />
            Print
          </button>
          <button
            type="button"
            onClick={() =>
              toast.success("Mock invoice prepared", invoice.downloadUrl)
            }
            className="btn-pill h-11 bg-primary px-5 text-sm text-primary-foreground hover:bg-primary/90"
          >
            <Download size={15} strokeWidth={2.6} />
            Download PDF
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-[28px] bg-muted/40 px-5 py-5">
          <p className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
            Bill to
          </p>
          <p className="mt-2 text-lg font-black tracking-[-0.02em]">
            {order.user?.displayName ?? "Customer"}
          </p>
          <div className="mt-3 space-y-1 text-sm font-semibold text-muted-foreground">
            <p>{order.user?.email ?? "No email on file"}</p>
            {billing && (
              <>
                <p>{billing.line1}</p>
                {billing.line2 && <p>{billing.line2}</p>}
                <p>
                  {[billing.city, billing.state].filter(Boolean).join(", ")}{" "}
                  {billing.postalCode}
                </p>
                <p>{billing.country}</p>
              </>
            )}
          </div>
        </div>

        <div className="rounded-[28px] bg-muted/40 border border-border px-5 py-5">
          <p className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
            Summary
          </p>
          <div className="mt-4 space-y-3 text-sm font-semibold text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-black text-foreground">
                {formatPrice(order.subtotal ?? 0)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Discount</span>
              <span className="font-black text-foreground">
                {formatPrice(order.discountAmount ?? 0)}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-3 text-base">
              <span>Total</span>
              <span className="font-black text-foreground">
                {formatPrice(order.total ?? 0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-[28px] border border-border bg-card px-5 py-5">
        <p className="text-[12px] font-black uppercase tracking-[0.14em] text-muted-foreground">
          Purchased items
        </p>
        <div className="mt-4 space-y-3">
          {(order.items ?? []).map((item: NonNullable<Order["items"]>[number]) => (
            <div key={item.id} className="flex items-center justify-between gap-4">
              <div>
                <p className="font-black">{item.product?.title ?? "Product"}</p>
                <p className="text-sm font-semibold text-muted-foreground">
                  {item.licenseType} license
                </p>
              </div>
              <span className="font-black">{formatPrice(item.unitPrice)}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
