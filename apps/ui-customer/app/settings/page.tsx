import Link from "next/link";
import type { CSSProperties } from "react";
import { PageChrome } from "../_components/page-chrome";

const settings = ["Email receipts", "License notifications", "Creator support updates", "Payment reminders"];

export default function SettingsPage() {
  return (
    <PageChrome activeHref="/profile" ariaLabelledBy="settings-title" className="route-screen account-screen" footer="Settings are static in this pass and ready for account persistence later.">
      <section className="account-layout settings-layout" aria-label="Profile settings">
        <div className="account-hero">
          <p className="page-eyebrow"><span>Settings</span> Preferences</p>
          <h1 id="settings-title" className="page-title compact-title">Small controls for a calmer account.</h1>
          <p className="page-copy">Keep the account page simple: receipts, notifications, and payment references without a crowded dashboard.</p>
          <div className="page-actions">
            <Link href="/profile" className="button button-primary">Back Profile<span aria-hidden="true">→</span></Link>
            <Link href="/orders" className="button button-secondary">Orders</Link>
          </div>
        </div>
        <div className="settings-list">
          {settings.map((setting, index) => (
            <article key={setting} className="setting-row" style={{ "--item-index": index } as CSSProperties}>
              <span>{setting}</span>
              <strong>On</strong>
            </article>
          ))}
        </div>
      </section>
    </PageChrome>
  );
}
