import Link from "next/link";
import { PageChrome } from "../_components/page-chrome";
import { orderSummary } from "../_lib/marketplace-data";

export default function CheckoutPage() {
  return (
    <PageChrome activeHref="/cart" ariaLabelledBy="checkout-title" className="route-screen checkout-screen" footer="Checkout is a front-end payment walkthrough ending in a success reference.">
      <section className="checkout-layout" aria-label="Checkout and payment">
        <div className="route-copy checkout-copy">
          <p className="page-eyebrow"><span>Checkout</span> Payment process</p>
          <h1 id="checkout-title" className="page-title compact-title">One quiet handoff from cart to payment success.</h1>
          <p className="page-copy">Review buyer details, pick a payment method, and continue to a success page with a reference number.</p>
        </div>

        <div className="payment-card">
          <label>
            Email for receipt
            <input type="email" autoComplete="email" placeholder="husam@example.com" />
          </label>
          <label>
            Payment method
            <select defaultValue="card" aria-label="Payment method">
              <option value="card">Card payment</option>
              <option value="paypal">PayPal</option>
              <option value="bank">Bank transfer</option>
            </select>
          </label>
          <div className="payment-total">
            <span>Total due</span>
            <strong>{orderSummary.total}</strong>
          </div>
          <Link href="/payment/success" className="button button-primary auth-submit">Pay Now<span aria-hidden="true">→</span></Link>
          <Link href="/cart" className="quiet-link">Return to cart</Link>
        </div>
      </section>
    </PageChrome>
  );
}
