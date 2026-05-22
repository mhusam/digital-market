"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import {
  storeGetOrderByConfirmationToken,
  storeGetOrderDownloads,
  storeResendOrderEmail,
  type DownloadLink,
} from "@digital-market/api-client";
import type { Order } from "@digital-market/shared-types";
import { PageChrome } from "../../../_components/page-chrome";
import { toCurrency, formatDateTime } from "../../../_lib/format";
import { StatusPill } from "../../../_components/status-pill";

export default function OrderConfirmationPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);

  const [order, setOrder] = useState<Order | null>(null);
  const [downloads, setDownloads] = useState<DownloadLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      const response = await storeGetOrderByConfirmationToken(token);
      if (!response.success || !response.data) {
        if (!cancelled) {
          setError(response.message ?? "Order not found.");
          setLoading(false);
        }
        return;
      }

      if (!cancelled) {
        setOrder(response.data);
        setLoading(false);
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const loadDownloads = async () => {
    if (!order) return;
    const response = await storeGetOrderDownloads(order.id);
    if (response.success && response.data) {
      setDownloads(response.data);
      setMessage(`Generated ${response.data.length} download link(s).`);
      return;
    }
    setMessage(response.message ?? "Could not generate downloads yet.");
  };

  const resendEmail = async () => {
    if (!order) return;
    const response = await storeResendOrderEmail(order.id);
    setMessage(response.success ? "Confirmation email requested." : response.message ?? "Could not resend email.");
  };

  return (
    <PageChrome
      activeHref="/orders"
      ariaLabelledBy="confirmation-title"
      className="route-screen orders-screen"
      footer="Guest confirmation tokens provide order tracking and post-payment download access without forced login."
    >
      <section className="orders-layout" aria-label="Order confirmation">
        {loading ? (
          <div className="market-card p-6"><p>Loading order...</p></div>
        ) : null}

        {!loading && error ? (
          <div className="market-card p-6">
            <h1 id="confirmation-title" className="page-title compact-title">Order not available</h1>
            <p className="page-copy">{error}</p>
            <div className="page-actions">
              <Link href="/contact" className="button button-primary">Contact support</Link>
              <Link href="/catalog" className="button button-secondary">Back to catalog</Link>
            </div>
          </div>
        ) : null}

        {!loading && order ? (
          <>
            <div className="route-copy orders-copy">
              <p className="page-eyebrow"><span>Order</span> Confirmation</p>
              <h1 id="confirmation-title" className="page-title compact-title">Order {order.paymentReference || order.id}</h1>
              <p className="page-copy">
                <StatusPill status={order.status ?? "PENDING_PAYMENT"} />{" "}
                <span style={{ marginLeft: 8 }}>
                  Payment: <strong>{order.paymentMethod ?? "N/A"}</strong> · {formatDateTime(order.createdAt)}
                </span>
              </p>

              <div className="page-actions">
                {(order.status === "PAID" || order.status === "FULFILLED") ? (
                  <button type="button" className="button button-primary" onClick={loadDownloads}>
                    Load Downloads
                    <span aria-hidden="true">→</span>
                  </button>
                ) : null}
                <button type="button" className="button button-secondary" onClick={resendEmail}>
                  Resend Email
                </button>
              </div>

              {message ? <p className="mt-3 text-sm text-[var(--muted)]">{message}</p> : null}
            </div>

            <div className="order-list">
              <article className="order-row">
                <div>
                  <p>Customer</p>
                  <h2>{order.customerName}</h2>
                  <span>{order.customerEmail}</span>
                </div>
                <div>
                  <StatusPill status={order.status ?? "PENDING_PAYMENT"} />
                  <span>{formatDateTime(order.createdAt)}</span>
                  <em>{toCurrency(order.totalAmount ?? 0, order.currency ?? "USD")}</em>
                </div>
              </article>

              {(order.lines ?? []).map((line) => (
                <article key={line.id} className="order-row">
                  <div>
                    <p>Line item</p>
                    <h2>{line.productTitle}</h2>
                    <span>Qty {line.quantity}</span>
                  </div>
                  <div>
                    <strong>{toCurrency(line.unitPrice, order.currency)}</strong>
                    <span>Product ID</span>
                    <em>{line.productId.slice(0, 8)}</em>
                  </div>
                </article>
              ))}

              {downloads.map((download) => (
                <article key={download.assetId} className="order-row">
                  <div>
                    <p>Download</p>
                    <h2>{download.filename}</h2>
                    <span>Expires in {download.expiresInMinutes} minutes</span>
                  </div>
                  <div>
                    <a href={download.url} target="_blank" rel="noreferrer" className="mini-link">Open</a>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : null}
      </section>
    </PageChrome>
  );
}
