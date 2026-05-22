"use client";

import { useEffect, useState } from "react";
import { storeGetPublicSettings } from "@digital-market/api-client";
import { PageChrome } from "../../_components/page-chrome";

type LegalContentProps = {
  title: string;
  policyKey: "legal.terms" | "legal.privacy" | "legal.refunds";
  eyebrow: string;
};

export function LegalContent({ title, policyKey, eyebrow }: LegalContentProps) {
  const [content, setContent] = useState("");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const response = await storeGetPublicSettings();
      if (!cancelled && response.success && response.data) {
        setContent(response.data[policyKey] || "This policy will be published soon.");
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [policyKey]);

  return (
    <PageChrome
      activeHref=""
      ariaLabelledBy="legal-title"
      className="route-screen legal-screen"
      footer="Legal documents are sourced from store settings maintained by administrators."
    >
      <section className="success-panel" aria-label={title}>
        <p className="page-eyebrow"><span>Legal</span> {eyebrow}</p>
        <h1 id="legal-title" className="page-title compact-title">{title}</h1>
        <div className="market-card mt-6 w-full max-w-[860px] p-6 text-left">
          <p className="whitespace-pre-wrap text-sm leading-7 text-[var(--muted-strong)]">{content}</p>
        </div>
      </section>
    </PageChrome>
  );
}
