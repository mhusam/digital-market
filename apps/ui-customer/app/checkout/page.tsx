"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  storeCreateCheckoutOrder,
  storeCreatePayPalOrder,
  storeGetPublicSettings,
} from "@digital-market/api-client";
import { PageChrome } from "../_components/page-chrome";
import { useCustomer } from "../_components/customer-provider";
import { useToast } from "../_components/toast-provider";
import { toCurrency } from "../_lib/format";

type PaymentChoice = "PAYPAL" | "BANK_TRANSFER";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CheckoutPage() {
  const router = useRouter();
  const { user, cart, cartSubtotal } = useCustomer();
  const toast = useToast();

  const [email, setEmail] = useState(user?.email ?? "");
  const [name, setName] = useState(user?.name ?? "");
  const [paymentMethod, setPaymentMethod] = useState<PaymentChoice>("PAYPAL");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bankEnabled, setBankEnabled] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEmail(user?.email ?? "");
    setName(user?.name ?? "");
  }, [user]);

  useEffect(() => {
    let cancelled = false;
    const loadSettings = async () => {
      const response = await storeGetPublicSettings();
      if (!cancelled && response.success && response.data) {
        setBankEnabled(response.data["bank.enabled"] === "true");
      }
    };
    void loadSettings();
    return () => {
      cancelled = true;
    };
  }, []);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (cart.length === 0) {
      const msg = "Your cart is empty.";
      setError(msg);
      toast.error(msg);
      return;
    }

    if (!name.trim() || name.trim().length < 2) {
      const msg = "Please enter your full name.";
      setError(msg);
      toast.error(msg);
      return;
    }

    if (!EMAIL_PATTERN.test(email.trim())) {
      const msg = "Please enter a valid email address.";
      setError(msg);
      toast.error(msg);
      return;
    }

    if (!acceptTerms) {
      const msg = "Please accept the terms and refund policy.";
      setError(msg);
      toast.error(msg);
      return;
    }

    setSubmitting(true);

    const orderResponse = await storeCreateCheckoutOrder({
      customerEmail: email.trim(),
      customerName: name.trim(),
      lines: cart.map((item) => ({ productId: item.productId, quantity: item.quantity })),
      paymentMethod,
    });

    if (!orderResponse.success || !orderResponse.data) {
      const msg = orderResponse.message ?? "Checkout failed. Please try again.";
      setError(msg);
      toast.error(msg);
      setSubmitting(false);
      return;
    }

    const order = orderResponse.data;
    window.sessionStorage.setItem(
      "progman-last-order",
      JSON.stringify({ orderId: order.id, confirmationToken: order.confirmationToken })
    );

    if (paymentMethod === "BANK_TRANSFER") {
      router.push(`/checkout/bank-instructions?orderId=${order.id}&token=${order.confirmationToken}`);
      setSubmitting(false);
      return;
    }

    const paypalResponse = await storeCreatePayPalOrder(order.id);
    if (!paypalResponse.success || !paypalResponse.data) {
      const msg = paypalResponse.message ?? "Could not start PayPal checkout.";
      setError(msg);
      toast.error(msg);
      setSubmitting(false);
      return;
    }

    window.location.href = paypalResponse.data.approvalUrl;
  };

  return (
    <PageChrome
      activeHref="/cart"
      ariaLabelledBy="checkout-title"
      className="route-screen checkout-screen"
      footer="Checkout supports guest and signed-in customers with PayPal plus optional bank transfer."
    >
      <section className="checkout-layout" aria-label="Checkout and payment">
        <div className="route-copy checkout-copy">
          <p className="page-eyebrow"><span>Checkout</span> Payment process</p>
          <h1 id="checkout-title" className="page-title compact-title">Complete your purchase in one clean flow.</h1>
          <p className="page-copy">Buyer details, payment selection, and legal confirmation before final handoff.</p>
        </div>

        <form className="payment-card" onSubmit={onSubmit}>
          <label>
            Full name
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </label>
          <label>
            Email for receipt
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </label>

          <label>
            Payment method
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentChoice)}
              aria-label="Payment method"
            >
              <option value="PAYPAL">PayPal</option>
              {bankEnabled ? <option value="BANK_TRANSFER">Bank transfer</option> : null}
            </select>
          </label>

          <label className="!grid !grid-cols-[auto_1fr] items-center gap-3 rounded-xl border border-[var(--border)] bg-white/5 px-3 py-2 text-sm">
            <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />
            <span>
              I accept the <Link href="/legal/terms" className="underline">terms</Link> and <Link href="/legal/refunds" className="underline">refund policy</Link>.
            </span>
          </label>

          <div className="payment-total">
            <span>Total due</span>
            <strong>{toCurrency(cartSubtotal)}</strong>
          </div>

          {error ? <p className="form-error">{error}</p> : null}

          <button type="submit" className="button button-primary auth-submit" disabled={submitting}>
            {submitting ? "Processing..." : "Continue"}
            <span aria-hidden="true">→</span>
          </button>
          <Link href="/cart" className="quiet-link">Return to cart</Link>
        </form>
      </section>
    </PageChrome>
  );
}
