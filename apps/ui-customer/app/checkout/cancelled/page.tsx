import Link from "next/link";
import { PageChrome } from "../../_components/page-chrome";

export default function CheckoutCancelledPage() {
  return (
    <PageChrome
      activeHref="/cart"
      ariaLabelledBy="cancelled-title"
      className="route-screen success-screen"
      footer="Cancelled PayPal handoff keeps customer context and allows immediate retry."
    >
      <section className="success-panel" aria-label="Payment cancelled">
        <p className="page-eyebrow"><span>Cancelled</span> Payment not completed</p>
        <h1 id="cancelled-title" className="page-title compact-title">Payment was cancelled.</h1>
        <p className="page-copy">No charge was captured. You can return to checkout or keep browsing the catalog.</p>
        <div className="page-actions centered-actions">
          <Link href="/checkout" className="button button-primary">
            Retry checkout
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/catalog" className="button button-secondary">Browse catalog</Link>
        </div>
      </section>
    </PageChrome>
  );
}
