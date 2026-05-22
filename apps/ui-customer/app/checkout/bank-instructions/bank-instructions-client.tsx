"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { storeGetOrderByConfirmationToken, storeGetPublicSettings } from "@digital-market/api-client";
import type { Order } from "@digital-market/shared-types";
import { PageChrome } from "../../_components/page-chrome";
import { useCustomer } from "../../_components/customer-provider";
import { toCurrency } from "../../_lib/format";

export default function BankInstructionsPage() {
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const orderId = params.get("orderId") ?? "";
  const { clearCart } = useCustomer();

  const [order, setOrder] = useState<Order | null>(null);
  const [bankDetails, setBankDetails] = useState("");
  const [bankHint, setBankHint] = useState("Include reference: {ref}");

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const settingsResponse = await storeGetPublicSettings();
      if (!cancelled && settingsResponse.success && settingsResponse.data) {
        setBankDetails(settingsResponse.data["bank.details"] || "Bank details will be shared by support.");
        setBankHint(settingsResponse.data["bank.reference-hint"] || "Include reference: {ref}");
      }

      if (token) {
        const orderResponse = await storeGetOrderByConfirmationToken(token);
        if (!cancelled && orderResponse.success && orderResponse.data) {
          setOrder(orderResponse.data);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const reference = order?.paymentReference || orderId || "Pending";

  return (
    <PageChrome
      activeHref="/orders"
      ariaLabelledBy="bank-title"
      className="route-screen checkout-screen"
      footer="Bank-transfer orders remain pending until payment is confirmed by admin."
    >
      <section className="success-panel" aria-label="Bank transfer instructions">
        <p className="page-eyebrow"><span>Bank transfer</span> Payment pending</p>
        <h1 id="bank-title" className="page-title compact-title">Transfer payment using this reference.</h1>
        <p className="page-copy">After transfer confirmation, your order will be marked paid and download access will be available.</p>

        <div className="success-reference">
          <span>Reference</span>
          <strong>{reference}</strong>
          {order ? <p>Total due {toCurrency(order.totalAmount ?? 0, order.currency ?? "USD")}</p> : <p>Loading amount...</p>}
        </div>

        <div className="market-card mt-4 w-full max-w-[560px] p-5 text-left">
          <p className="uppercase tracking-[0.12em] text-xs text-[var(--muted)]">Bank details</p>
          <p className="mt-2 whitespace-pre-wrap text-sm text-[var(--muted-strong)]">{bankDetails}</p>
          <p className="mt-3 text-xs text-[var(--muted)]">{bankHint.replace("{ref}", reference)}</p>
        </div>

        <div className="page-actions centered-actions">
          {token ? (
            <Link href={`/orders/confirmation/${token}`} className="button button-primary">
              Open confirmation
              <span aria-hidden="true">→</span>
            </Link>
          ) : null}
          <Link href="/contact" className="button button-secondary">Contact support</Link>
        </div>
      </section>
    </PageChrome>
  );
}
