"use client";

import Link from "next/link";
import { PageChrome } from "../_components/page-chrome";
import { useCustomer } from "../_components/customer-provider";
import { toCurrency } from "../_lib/format";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

export default function CartPage() {
  const { cart, cartSubtotal, updateCartQuantity, removeFromCart } = useCustomer();

  return (
    <PageChrome
      activeHref="/cart"
      ariaLabelledBy="cart-title"
      className="route-screen cart-screen"
      footer="Cart keeps quantity and totals persistent before checkout handoff."
    >
      <section className="cart-layout" aria-label="Shopping cart">
        <div className="route-copy cart-copy">
          <p className="page-eyebrow"><span>Cart</span> Review products</p>
          <h1 id="cart-title" className="page-title compact-title">Confirm items before payment.</h1>
          <p className="page-copy">Adjust quantities and proceed to secure checkout when ready.</p>
          <div className="page-actions">
            <Button asChild>
              <Link href="/checkout">
                Checkout <span aria-hidden="true">→</span>
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/catalog">Keep Browsing</Link>
            </Button>
          </div>
        </div>

        <div className="cart-board">
          <div className="cart-items">
            {cart.length === 0 ? (
              <article className="cart-item">
                <div>
                  <p>Empty cart</p>
                  <h2>No items yet</h2>
                  <span>Add products from the catalog to continue.</span>
                </div>
              </article>
            ) : (
              cart.map((item) => (
                <article key={item.productId} className="cart-item">
                  <div>
                    <Badge variant="secondary">{item.offeringType}</Badge>
                    <h2>{item.title}</h2>
                    <span>{item.techTags.slice(0, 3).join(" · ") || "general"}</span>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <strong>{toCurrency(item.price * item.quantity, item.currency)}</strong>
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-[var(--muted)]">Qty</label>
                      <Input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateCartQuantity(item.productId, Number(e.target.value) || 1)}
                        className="h-9 w-16"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.productId)}
                    >
                      Remove
                    </Button>
                  </div>
                </article>
              ))
            )}
          </div>

          <aside className="summary-card" aria-label="Cart summary">
            <p>Summary</p>
            <div><span>Subtotal</span><strong>{toCurrency(cartSubtotal)}</strong></div>
            <div><span>Platform fee</span><strong>$0.00</strong></div>
            <div><span>Total</span><strong>{toCurrency(cartSubtotal)}</strong></div>
          </aside>
        </div>
      </section>
    </PageChrome>
  );
}
