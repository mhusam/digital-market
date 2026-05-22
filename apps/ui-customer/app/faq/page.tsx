import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "../_components/breadcrumbs";
import { SITE_NAME, absoluteUrl } from "../_lib/site";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description: `Answers to common questions about buying, downloading, and licensing on ${SITE_NAME}.`,
  alternates: { canonical: absoluteUrl("/faq") },
  openGraph: {
    title: `FAQ — ${SITE_NAME}`,
    description: `Common questions about buying, downloading, and licensing on ${SITE_NAME}.`,
    url: absoluteUrl("/faq"),
    type: "website",
  },
};

const FAQ_ENTRIES = [
  {
    q: "How are digital products delivered?",
    a: "Once payment is confirmed your downloads appear in your account, with signed URLs that work for a limited window. You can refresh the links from the order details page at any time.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "PayPal and direct bank transfer. PayPal captures complete instantly. Bank transfers create an order with a unique reference (SO-XXXXXXXX) — once funds arrive we mark the order paid and your downloads unlock.",
  },
  {
    q: "Can I refund a digital product?",
    a: "We follow our refund policy: products that have not been downloaded are eligible. For details see the refunds page linked in the footer.",
  },
  {
    q: "Do I need an account to buy?",
    a: "Bank-transfer orders can be placed with email only and you receive a confirmation token. We recommend creating an account so future orders, downloads, and re-downloads stay in one place.",
  },
  {
    q: "What licensing applies to products?",
    a: "Every listing shows its license summary. Projects and solutions tend to be single-team commercial. Read the license on the product page before checkout — the terms are short on purpose.",
  },
  {
    q: "Do you offer custom work?",
    a: "Yes — reach out via the contact page with project scope. Custom engagements are quoted separately and not listed in the catalog.",
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ENTRIES.map((entry) => ({
      "@type": "Question",
      name: entry.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.a,
      },
    })),
  };

  return (
    <section className="shell-container" aria-labelledby="faq-title">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "FAQ" }]} />
      <p className="page-eyebrow">
        <span>Support</span> FAQ
      </p>
      <h1 id="faq-title" className="page-title compact-title">
        Common questions, answered.
      </h1>
      <p className="page-copy">
        If something is still unclear, reach out via{" "}
        <Link href="/contact" className="underline underline-offset-2">
          support
        </Link>{" "}
        — we read every message.
      </p>

      <div className="mt-8 divide-y divide-white/12">
        {FAQ_ENTRIES.map((entry) => (
          <details key={entry.q} className="group py-5">
            <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-white list-none hover:text-white/80 transition-colors">
              {entry.q}
              <svg
                className="h-4 w-4 shrink-0 text-white/50 transition-transform duration-200 group-open:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="mt-3 text-sm text-white/70 leading-relaxed">{entry.a}</p>
          </details>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
