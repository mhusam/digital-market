"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { storeGetCustomerOrders } from "@digital-market/api-client";
import type { Order } from "@digital-market/shared-types";
import { PageChrome } from "../../_components/page-chrome";
import { useRequireCustomer } from "../../_lib/use-auth-guard";
import { toCurrency, formatDate } from "../../_lib/format";
import { StatusPill } from "../../_components/status-pill";

export default function AccountOrdersPage() {
  const { allowed, ready } = useRequireCustomer();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!allowed) return;
    void storeGetCustomerOrders(1, 50).then((response) => {
      setOrders(response.data ?? []);
    });
  }, [allowed]);

  if (!ready || !allowed) {
    return <PageChrome ariaLabelledBy="orders-loading">Loading orders...</PageChrome>;
  }

  return (
    <PageChrome
      activeHref="/account/orders"
      ariaLabelledBy="orders-title"
      className="route-screen orders-screen"
      footer="Signed-in customers can track all order statuses and open detailed records."
    >
      <section className="orders-layout" aria-label="Customer order history">
        <div className="route-copy orders-copy">
          <p className="page-eyebrow"><span>Account</span> Orders</p>
          <h1 id="orders-title" className="page-title compact-title">Your order history.</h1>
          <p className="page-copy">Open any order to view delivery state, references, and download access.</p>
        </div>

        <div className="order-list">
          {orders.length === 0 ? (
            <article className="order-row">
              <div>
                <p>No orders</p>
                <h2>Start browsing</h2>
                <span>Your purchases will appear here.</span>
              </div>
              <div>
                <Link href="/catalog" className="mini-link">Catalog</Link>
              </div>
            </article>
          ) : (
            orders.map((order) => (
              <article key={order.id} className="order-row">
                <div>
                  <p>{order.paymentReference || order.id}</p>
                  <h2>{order.lines?.[0]?.productTitle ?? "Order"}</h2>
                  <span>{order.lines?.length ?? 0} item(s)</span>
                </div>
                <div>
                  <StatusPill status={order.status ?? "PENDING_PAYMENT"} />
                  <span>{formatDate(order.createdAt)}</span>
                  <em>{toCurrency(order.totalAmount ?? 0, order.currency ?? "USD")}</em>
                  <Link href={`/account/orders/${order.id}`} className="mini-link">Open</Link>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </PageChrome>
  );
}
