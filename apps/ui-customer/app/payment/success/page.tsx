import Link from "next/link";
import { PageChrome } from "../../_components/page-chrome";
import { orderSummary } from "../../_lib/marketplace-data";

export default function PaymentSuccessPage() {
  return (
    <PageChrome activeHref="/orders" ariaLabelledBy="success-title" className="route-screen success-screen" footer="Payment success closes the customer journey and points back to orders/profile.">
      <section className="success-panel" aria-label="Payment success">
        <p className="page-eyebrow"><span>Success</span> Payment complete</p>
        <h1 id="success-title" className="page-title compact-title">Your order is confirmed.</h1>
        <p className="page-copy">Reference <strong>{orderSummary.reference}</strong> is ready. Licenses and downloads are now available from order history.</p>
        <div className="success-reference">
          <span>Order reference</span>
          <strong>{orderSummary.reference}</strong>
          <p>Total paid {orderSummary.total}</p>
        </div>
        <div className="page-actions centered-actions">
          <Link href="/orders" className="button button-primary">Track Order<span aria-hidden="true">→</span></Link>
          <Link href="/profile" className="button button-secondary">Profile</Link>
        </div>
      </section>
    </PageChrome>
  );
}
