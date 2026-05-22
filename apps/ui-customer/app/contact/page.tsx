"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { storeGetPublicSettings } from "@digital-market/api-client";
import { PageChrome } from "../_components/page-chrome";
import { Card, CardContent, CardHeader } from "../../components/ui/card";

export default function ContactPage() {
  const [email, setEmail] = useState("support@progman.store");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const response = await storeGetPublicSettings();
      if (!cancelled && response.success && response.data?.["store.contact-email"]) {
        setEmail(response.data["store.contact-email"]);
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PageChrome
      activeHref="/contact"
      ariaLabelledBy="contact-title"
      className="route-screen success-screen"
      footer="Support page provides direct contact path for order, payment, and fulfillment assistance."
    >
      <section className="success-panel" aria-label="Contact support">
        <p className="page-eyebrow"><span>Support</span> Contact</p>
        <h1 id="contact-title" className="page-title compact-title">Need help with an order?</h1>
        <p className="page-copy">Reach PROGMAN support for checkout, payment reference, and digital-delivery help.</p>

        <Card className="mt-6 w-full max-w-[620px] text-left">
          <CardHeader>
            <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Support Email</p>
            <h2 className="m-0 text-2xl font-bold text-white">{email}</h2>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/60">Include your order reference and account email for faster resolution.</p>
          </CardContent>
        </Card>

        <div className="page-actions centered-actions">
          <Link href="/account/orders" className="button button-primary">My orders<span aria-hidden="true">→</span></Link>
          <Link href="/catalog" className="button button-secondary">Back to catalog</Link>
        </div>
      </section>
    </PageChrome>
  );
}
