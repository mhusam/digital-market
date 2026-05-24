import Link from "next/link";
import { PageChrome, type HighlightCard } from "./_components/page-chrome";

const stackItems = ["Spring Boot", "Next.js", "Java", "Python", "Cloud"];

const previewCards: HighlightCard[] = [
  {
    label: "Catalog",
    value: "Live",
    detail: "Products, projects, and IT solutions",
    position: "card-products",
  },
  {
    label: "Payments",
    value: "PayPal",
    detail: "Secure checkout with bank-transfer fallback",
    position: "card-creators",
  },
  {
    label: "Delivery",
    value: "Instant",
    detail: "Downloads and references available after payment",
    position: "card-licenses",
  },
  {
    label: "Support",
    value: "Fast",
    detail: "Order confirmation and customer account tracking",
    position: "card-support",
  },
];

export default function Home() {
  return (
    <PageChrome
      ariaLabelledBy="hero-title"
      footer="PROGMAN customer storefront with full catalog, checkout, account, and digital fulfillment flows."
      highlights={previewCards}
      intro="home"
    >
      <section className="hero" aria-label="PROGMAN introduction">
        <p className="eyebrow">
          <span>PROGMAN</span>
          Digital IT store
        </p>

        <h1 id="hero-title">Buy practical digital solutions, fast.</h1>

        <p className="hero-copy">
          PROGMAN delivers production-ready code products, solution packs, and project assets with clear pricing,
          calm UX, and reliable post-purchase delivery.
        </p>

        <div className="hero-actions" aria-label="Primary actions">
          <Link href="/catalog" className="button button-primary">
            Browse Catalog
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/register" className="button button-secondary">
            Create Account
          </Link>
        </div>

        <div className="stack-row" aria-label="Featured technology tags">
          {stackItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>
    </PageChrome>
  );
}
