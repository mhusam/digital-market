"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import {
  storeGetCustomerOrder,
  storeGetOrderDownloads,
  storeResendOrderEmail,
  type DownloadLink,
} from "@digital-market/api-client";
import type { Order } from "@digital-market/shared-types";
import { PageChrome } from "../../../_components/page-chrome";
import { useRequireCustomer } from "../../../_lib/use-auth-guard";
import { toCurrency, formatDateTime } from "../../../_lib/format";
import { StatusPill } from "../../../_components/status-pill";

export default function AccountOrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { ready, allowed } = useRequireCustomer();
  const [order, setOrder] = useState<Order | null>(null);
  const [downloads, setDownloads] = useState<DownloadLink[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [loadingOrder, setLoadingOrder] = useState(true);

  useEffect(() => {
    let cancelled = false;
    if (!allowed) return;

    const load = async () => {
      setLoadingOrder(true);
      const response = await storeGetCustomerOrder(id);
      if (cancelled) return;
      if (response.success && response.data) {
        setOrder(response.data);
      } else {
        setMessage(response.message ?? "Order not found.");
      }
      setLoadingOrder(false);
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [allowed, id]);

  if (!ready || !allowed) {
    return <PageChrome ariaLabelledBy="order-loading">Loading order...</PageChrome>;
  }

  const loadDownloads = async () => {
    if (!order) return;
    const response = await storeGetOrderDownloads(order.id);
    if (response.success && response.data) {
      setDownloads(response.data);
      setMessage(`Generated ${response.data.length} link(s).`);
      return;
    }
    setMessage(response.message ?? "Downloads not available.");
  };

  const resendEmail = async () => {
    if (!order) return;
    const response = await storeResendOrderEmail(order.id);
    setMessage(response.success ? "Confirmation email requested." : response.message ?? "Could not resend email.");
  };

  return (
    <PageChrome
      activeHref="/account/orders"
      ariaLabelledBy="order-title"
      className="route-screen orders-screen"
      footer="Order detail combines line items, status, and direct fulfillment actions."
    >
      <section className="orders-layout" aria-label="Order details">
        <div className="route-copy orders-copy">
          <p className="page-eyebrow"><span>Order</span> Detail</p>
          <h1 id="order-title" className="page-title compact-title">{order?.paymentReference || id}</h1>
          {order ? (
            <p className="page-copy">
              <StatusPill status={order.status ?? "PENDING_PAYMENT"} />{" "}
              <span style={{ marginLeft: 8 }}>
                {toCurrency(order.totalAmount ?? 0, order.currency ?? "USD")} ·{" "}
                {formatDateTime(order.createdAt)}
              </span>
            </p>
          ) : (
            <p className="page-copy">{loadingOrder ? "Loading details" : "Order not found."}</p>
          )}
          <div className="page-actions">
            {(order?.status === "PAID" || order?.status === "FULFILLED") ? (
              <button type="button" className="button button-primary" onClick={loadDownloads}>
                Generate downloads
                <span aria-hidden="true">→</span>
              </button>
            ) : null}
            <button type="button" className="button button-secondary" onClick={resendEmail}>Resend email</button>
            <Link href="/account/orders" className="button button-secondary">Back</Link>
          </div>
          {message ? <p className="mt-3 text-sm text-[var(--muted)]">{message}</p> : null}
        </div>

        <div className="order-list">
          {order?.lines?.map((line) => (
            <article key={line.id} className="order-row">
              <div>
                <p>Item</p>
                <h2>{line.productTitle}</h2>
                <span>Qty {line.quantity}</span>
              </div>
              <div>
                <strong>{toCurrency(line.unitPrice, order.currency)}</strong>
                <span>Product</span>
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
                <a href={download.url} className="mini-link" target="_blank" rel="noreferrer">Open</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageChrome>
  );
}
