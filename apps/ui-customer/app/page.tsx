import Link from "next/link";
import { PageChrome, type HighlightCard } from "./_components/page-chrome";

const stackItems = ["React", "Next", "TS", "API"];

const previewCards: HighlightCard[] = [
  {
    label: "Products",
    value: "2,500+",
    detail: "Curated kits, APIs, and templates",
    position: "card-products",
  },
  {
    label: "Checkout",
    value: "Ready",
    detail: "Cart, payment, success flow",
    position: "card-creators",
  },
  {
    label: "Licenses",
    value: "Instant",
    detail: "Access delivered at checkout",
    position: "card-licenses",
  },
  {
    label: "Orders",
    value: "Tracked",
    detail: "Reference IDs and history",
    position: "card-support",
  },
];

export default function Home() {
  return (
    <PageChrome
      ariaLabelledBy="hero-title"
      footer="A focused customer marketplace shell: catalog, auth, cart, checkout, profile, and order tracking."
      highlights={previewCards}
      intro="home"
    >
      <section className="hero" aria-label="DevMarket introduction">
        <p className="eyebrow">
          <span>New</span>
          Minimal marketplace launchpad
        </p>

        <h1 id="hero-title">
          One page for developer products that feel ready.
        </h1>

        <p className="hero-copy">
          A focused storefront for vetted code, UI systems, licenses, and creator support. Built to feel quiet, fast, and easy to trust.
        </p>

        <div className="hero-actions" aria-label="Primary actions">
          <Link href="/catalog" className="button button-primary">
            Browse Products
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/register" className="button button-secondary">
            Create Account
          </Link>
        </div>

        <div className="stack-row" aria-label="Featured product stack">
          {stackItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>
    </PageChrome>
  );
}
