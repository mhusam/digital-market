import Link from "next/link";
import { PageChrome } from "../_components/page-chrome";
import { orders } from "../_lib/marketplace-data";

export default function ProfilePage() {
  const latestOrder = orders[0];

  return (
    <PageChrome activeHref="/profile" ariaLabelledBy="profile-title" className="route-screen account-screen" footer="Profile preview with settings, order history, and payment references.">
      <section className="account-layout" aria-label="Customer profile">
        <div className="account-hero">
          <p className="page-eyebrow"><span>Profile</span> Customer console</p>
          <h1 id="profile-title" className="page-title compact-title">Your purchases, references, and settings.</h1>
          <p className="page-copy">A focused account surface for tracking orders, accessing licenses, and keeping checkout details tidy.</p>
          <div className="page-actions">
            <Link href="/orders" className="button button-primary">Track Orders<span aria-hidden="true">→</span></Link>
            <Link href="/settings" className="button button-secondary">Settings</Link>
          </div>
        </div>

        <div className="account-grid">
          <article className="account-card profile-card">
            <span className="avatar" aria-hidden="true">H</span>
            <h2>Husam</h2>
            <p>husam@example.com</p>
            <strong>Google connected</strong>
          </article>
          <article className="account-card">
            <p>Latest reference</p>
            <h2>{latestOrder.reference}</h2>
            <span>{latestOrder.note}</span>
          </article>
          <article className="account-card">
            <p>Order status</p>
            <h2>{latestOrder.status}</h2>
            <span>{latestOrder.product} - {latestOrder.total}</span>
          </article>
        </div>
      </section>
    </PageChrome>
  );
}
