"use client";

import { useEffect, useState } from "react";
import { storeGetCustomerOrders, storeGetOrderDownloads, type DownloadLink } from "@digital-market/api-client";
import type { Order } from "@digital-market/shared-types";
import { PageChrome } from "../../_components/page-chrome";
import { useRequireCustomer } from "../../_lib/use-auth-guard";

type LinkMap = Record<string, DownloadLink[]>;

export default function AccountDownloadsPage() {
  const { ready, allowed } = useRequireCustomer();
  const [orders, setOrders] = useState<Order[]>([]);
  const [linksByOrder, setLinksByOrder] = useState<LinkMap>({});
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!allowed) return;
    void storeGetCustomerOrders(1, 50).then((response) => {
      const paidOrders = (response.data ?? []).filter((order) => order.status === "PAID" || order.status === "FULFILLED");
      setOrders(paidOrders);
    });
  }, [allowed]);

  const generateLinks = async (order: Order) => {
    const response = await storeGetOrderDownloads(order.id);
    if (!response.success || !response.data) {
      setMessage(response.message ?? "Could not generate links.");
      return;
    }
    setLinksByOrder((current) => ({ ...current, [order.id]: response.data ?? [] }));
    setMessage(`Generated ${response.data.length} link(s) for ${order.paymentReference || order.id}.`);
  };

  if (!ready || !allowed) {
    return <PageChrome ariaLabelledBy="downloads-loading">Loading downloads...</PageChrome>;
  }

  return (
    <PageChrome
      activeHref="/account/downloads"
      ariaLabelledBy="downloads-title"
      className="route-screen orders-screen"
      footer="Paid orders expose short-lived signed download links through fulfillment APIs."
    >
      <section className="orders-layout" aria-label="Account downloads">
        <div className="route-copy orders-copy">
          <p className="page-eyebrow"><span>Account</span> Downloads</p>
          <h1 id="downloads-title" className="page-title compact-title">Your download library.</h1>
          <p className="page-copy">Generate active links only when you are ready to download.</p>
          {message ? <p className="mt-3 text-sm text-[var(--muted)]">{message}</p> : null}
        </div>

        <div className="order-list">
          {orders.length === 0 ? (
            <article className="order-row">
              <div>
                <p>No downloads yet</p>
                <h2>Complete a paid order</h2>
                <span>Downloads appear for paid or fulfilled orders.</span>
              </div>
            </article>
          ) : (
            orders.map((order) => (
              <article key={order.id} className="order-row">
                <div>
                  <p>{order.paymentReference || order.id}</p>
                  <h2>{order.lines?.[0]?.productTitle ?? "Order"}</h2>
                  <span>Status {order.status}</span>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button type="button" className="mini-link" onClick={() => generateLinks(order)}>
                    Generate links
                  </button>
                  {linksByOrder[order.id]?.map((link) => (
                    <a key={link.assetId} href={link.url} target="_blank" rel="noreferrer" className="mini-link">
                      {link.filename}
                    </a>
                  ))}
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </PageChrome>
  );
}
