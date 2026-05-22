"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  storeCapturePayPalOrder,
  storeGetOrderByConfirmationToken,
} from "@digital-market/api-client";
import type { Order } from "@digital-market/shared-types";
import { PageChrome } from "../../_components/page-chrome";
import { useCustomer } from "../../_components/customer-provider";
import { toCurrency } from "../../_lib/format";

export default function CheckoutSuccessPage() {
  const params = useSearchParams();
  const orderId = params.get("orderId") ?? "";
  const paypalOrderId = params.get("token") ?? "";
  const confirmationFromUrl = params.get("confirmationToken");
  const { clearCart } = useCustomer();

  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);

  const confirmationToken = useMemo(() => {
    if (confirmationFromUrl) return confirmationFromUrl;
    const raw = typeof window !== "undefined" ? window.sessionStorage.getItem("progman-last-order") : null;
    if (!raw) return "";
    try {
      const parsed = JSON.parse(raw) as { confirmationToken?: string };
      return parsed.confirmationToken ?? "";
    } catch {
      return "";
    }
  }, [confirmationFromUrl]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!orderId || !paypalOrderId) {
        setError("Missing PayPal return data.");
        return;
      }

      const captureResponse = await storeCapturePayPalOrder(orderId, paypalOrderId);
      if (!captureResponse.success) {
        if (!cancelled) setError(captureResponse.message ?? "Could not confirm payment.");
        return;
      }

      clearCart();

      if (confirmationToken) {
        const orderResponse = await storeGetOrderByConfirmationToken(confirmationToken);
        if (!cancelled && orderResponse.success && orderResponse.data) {
          setOrder(orderResponse.data);
        }
      }

      if (!cancelled) setDone(true);
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [clearCart, confirmationToken, orderId, paypalOrderId]);

  const reference = order?.paymentReference || order?.id || orderId;

  return (
    <PageChrome
      activeHref="/orders"
      ariaLabelledBy="success-title"
      className="route-screen success-screen"
      footer="Payment success closes checkout and routes customers to confirmation, account, or order tracking."
    >
      <section className="success-panel" aria-label="Payment success">
        <p className="page-eyebrow"><span>Success</span> Payment complete</p>
        <h1 id="success-title" className="page-title compact-title">Your order is confirmed.</h1>
        <p className="page-copy">
          {error
            ? error
            : done
              ? "Payment captured. Your digital access is now available."
              : "Finalizing payment..."}
        </p>

        <div className="success-reference">
          <span>Order reference</span>
          <strong>{reference}</strong>
          <p>{order ? `Total paid ${toCurrency(order.totalAmount ?? 0, order.currency ?? "USD")}` : "Please keep this reference for your records."}</p>
        </div>

        <div className="page-actions centered-actions">
          {confirmationToken ? (
            <Link href={`/orders/confirmation/${confirmationToken}`} className="button button-primary">
              View Confirmation
              <span aria-hidden="true">→</span>
            </Link>
          ) : (
            <Link href="/catalog" className="button button-primary">
              Back to catalog
              <span aria-hidden="true">→</span>
            </Link>
          )}
          <Link href="/account/orders" className="button button-secondary">My Orders</Link>
        </div>
      </section>
    </PageChrome>
  );
}
