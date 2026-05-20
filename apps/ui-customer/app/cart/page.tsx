import Link from "next/link";
import type { CSSProperties } from "react";
import { PageChrome } from "../_components/page-chrome";
import { cartItems, orderSummary } from "../_lib/marketplace-data";

export default function CartPage() {
  return (
    <PageChrome activeHref="/cart" ariaLabelledBy="cart-title" className="route-screen cart-screen" footer="Cart preview keeps checkout clear before connecting live payment providers.">
      <section className="cart-layout" aria-label="Shopping cart">
        <div className="route-copy cart-copy">
          <p className="page-eyebrow"><span>Cart</span> Review products</p>
          <h1 id="cart-title" className="page-title compact-title">Confirm the stack before payment.</h1>
          <p className="page-copy">A simple cart for digital products, license delivery, and a clean payment handoff.</p>
          <div className="page-actions">
            <Link href="/checkout" className="button button-primary">Checkout<span aria-hidden="true">→</span></Link>
            <Link href="/catalog" className="button button-secondary">Keep Browsing</Link>
          </div>
        </div>

        <div className="cart-board">
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <article key={item.slug} className="cart-item" style={{ "--item-index": index } as CSSProperties}>
                <div>
                  <p>{item.category}</p>
                  <h2>{item.name}</h2>
                  <span>{item.accent}</span>
                </div>
                <strong>{item.price}</strong>
              </article>
            ))}
          </div>
          <aside className="summary-card" aria-label="Cart summary">
            <p>Summary</p>
            <div><span>Subtotal</span><strong>{orderSummary.subtotal}</strong></div>
            <div><span>Platform fee</span><strong>{orderSummary.platformFee}</strong></div>
            <div><span>Total</span><strong>{orderSummary.total}</strong></div>
          </aside>
        </div>
      </section>
    </PageChrome>
  );
}
