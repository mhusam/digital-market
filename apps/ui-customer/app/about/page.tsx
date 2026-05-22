import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "../_components/breadcrumbs";
import { SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "../_lib/site";
import { Separator } from "../../components/ui/separator";

export const metadata: Metadata = {
  title: `About ${SITE_NAME}`,
  description: `Learn about ${SITE_NAME} — the digital IT marketplace for products, projects, and ready-made solutions.`,
  alternates: { canonical: absoluteUrl("/about") },
  openGraph: {
    title: `About ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/about"),
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <section className="shell-container" aria-labelledby="about-title">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "About" }]} />
      <p className="page-eyebrow">
        <span>About</span> {SITE_NAME}
      </p>
      <h1 id="about-title" className="page-title compact-title">
        Digital IT, ready to ship.
      </h1>

      <Separator className="my-6" />

      <div className="content-prose mt-8 space-y-6">
        <h2>What we sell</h2>
        <p>
          {SITE_NAME} is a focused marketplace for digital IT goods. Every
          listing falls into one of three formats: <strong>products</strong>{" "}
          (downloadable software, templates, and assets),{" "}
          <strong>projects</strong> (complete codebases with licensing), and{" "}
          <strong>solutions</strong> (turnkey systems with deployment guides).
        </p>

        <h2>How delivery works</h2>
        <p>
          After payment is confirmed, signed download URLs appear in your
          account. Bank transfers issue a unique reference; an operator marks
          the order paid once funds clear. PayPal captures are confirmed
          automatically, with a webhook backup so a single browser hiccup does
          not lose the order.
        </p>

        <h2>Why it matters</h2>
        <p>
          We built {SITE_NAME} for teams that ship. No long onboarding, no
          per-seat pricing on every download, and a real human at{" "}
          <Link href="/contact">support</Link> when something is off. Every
          product carries an explicit license — read it before checkout, the
          terms are short and plain.
        </p>

        <h2>Security and trust</h2>
        <ul>
          <li>HTTPS everywhere, HSTS preload on the production domain.</li>
          <li>
            Authenticated downloads only — every link is signed and expires.
          </li>
          <li>PayPal-verified payments and bank-reference reconciliation.</li>
          <li>
            See our <Link href="/legal/privacy">privacy policy</Link> and{" "}
            <Link href="/legal/terms">terms</Link> for the long version.
          </li>
        </ul>
      </div>

      <div className="page-actions mt-8">
        <Link href="/catalog" className="button button-primary">
          Browse catalog
        </Link>
        <Link href="/faq" className="button button-secondary">
          Read the FAQ
        </Link>
      </div>
    </section>
  );
}
