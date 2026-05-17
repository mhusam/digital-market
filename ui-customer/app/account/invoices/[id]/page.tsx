"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getInvoice, getOrder } from "@digital-market/api-client";
import type { Order } from "@digital-market/shared-types";
import { Download, Printer } from "lucide-react";
import { Card } from "../../../../components/ui/Card";
import { EmptyState } from "../../../../components/ui/EmptyState";
import { Skeleton } from "../../../../components/ui/LoadingSkeleton";
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
          <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/55">
            Invoice
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.03em]">
            {invoice.invoiceNumber}
          </h2>
          <p className="mt-3 text-sm font-semibold text-[#1B1B1B]/68">
            Issued for order {order.id} on {formatDate(order.createdAt)}.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 no-print">
          <button
            type="button"
            onClick={() => window.print()}
            className="btn-pill h-11 border-2 border-[#1B1B1B]/10 bg-white px-5 text-sm text-[#1B1B1B]"
          >
            <Printer size={15} strokeWidth={2.6} />
            Print
          </button>
          <button
            type="button"
            onClick={() =>
              toast.success("Mock invoice prepared", invoice.downloadUrl)
            }
            className="btn-pill h-11 bg-[#1B1B1B] px-5 text-sm text-[#1E5FAF]"
          >
            <Download size={15} strokeWidth={2.6} />
            Download PDF
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-[28px] bg-[#F8FBFF] px-5 py-5">
          <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/55">
            Bill to
          </p>
          <p className="mt-2 text-lg font-black tracking-[-0.02em]">
            {order.user?.displayName ?? "Customer"}
          </p>
          <div className="mt-3 space-y-1 text-sm font-semibold text-[#1B1B1B]/68">
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

        <div className="rounded-[28px] bg-[#F8FBFF] border border-[#1B1B1B]/7 px-5 py-5">
          <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/55">
            Summary
          </p>
          <div className="mt-4 space-y-3 text-sm font-semibold text-[#1B1B1B]/72">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-black text-[#1B1B1B]">
                {formatPrice(order.subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Discount</span>
              <span className="font-black text-[#1B1B1B]">
                {formatPrice(order.discountAmount)}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-[#1B1B1B]/8 pt-3 text-base">
              <span>Total</span>
              <span className="font-black text-[#1B1B1B]">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-[28px] border border-[#1B1B1B]/7 bg-white px-5 py-5">
        <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/55">
          Purchased items
        </p>
        <div className="mt-4 space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4">
              <div>
                <p className="font-black">{item.product?.title ?? "Product"}</p>
                <p className="text-sm font-semibold text-[#1B1B1B]/62">
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
