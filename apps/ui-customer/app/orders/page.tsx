import Link from "next/link";
import type { CSSProperties } from "react";
import { PageChrome } from "../_components/page-chrome";
import { orders } from "../_lib/marketplace-data";

export default function OrdersPage() {
  return (
    <PageChrome activeHref="/orders" ariaLabelledBy="orders-title" className="route-screen orders-screen" footer="Track order references, payment status, and license delivery in one place.">
      <section className="orders-layout" aria-label="Order history">
        <div className="route-copy orders-copy">
          <p className="page-eyebrow"><span>Orders</span> Track by reference</p>
          <h1 id="orders-title" className="page-title compact-title">History that answers support questions fast.</h1>
          <p className="page-copy">Each purchase keeps a reference, status, date, total, and delivery note so the customer can self-serve before opening support.</p>
          <div className="page-actions">
            <Link href="/cart" className="button button-primary">Open Cart<span aria-hidden="true">→</span></Link>
            <Link href="/profile" className="button button-secondary">Profile</Link>
          </div>
        </div>

        <div className="order-list">
          {orders.map((order, index) => (
            <article key={order.reference} className="order-row" style={{ "--item-index": index } as CSSProperties}>
              <div>
                <p>{order.reference}</p>
                <h2>{order.product}</h2>
                <span>{order.note}</span>
              </div>
              <div>
                <strong>{order.status}</strong>
                <span>{order.date}</span>
                <em>{order.total}</em>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageChrome>
  );
}
