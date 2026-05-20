import Link from "next/link";
import type { CSSProperties } from "react";
import { PageChrome } from "../_components/page-chrome";
import { products } from "../_lib/marketplace-data";

export default function CatalogPage() {
  return (
    <PageChrome
      activeHref="/catalog"
      ariaLabelledBy="catalog-title"
      className="route-screen catalog-screen"
      footer="All product cards are visible in one compact customer marketplace view."
    >
      <section className="catalog-layout" aria-label="Product catalog">
        <div className="route-copy catalog-copy">
          <p className="page-eyebrow">
            <span>Catalog</span>
            Product cards
          </p>
          <h1 id="catalog-title" className="page-title compact-title">
            Browse ready-to-ship developer products.
          </h1>
          <p className="page-copy">
            Every card keeps the same motion system: page transition first, staggered products second, no DevMarket splash on catalog routes.
          </p>
        </div>

        <div className="catalog-grid" aria-label="All products">
          {products.map((product, index) => (
            <article
              key={product.slug}
              className="market-card"
              style={{ "--item-index": index } as CSSProperties}
            >
              <div className="market-card-top">
                <p>{product.category}</p>
                <span>{product.rating}</span>
              </div>
              <h2>{product.name}</h2>
              <p className="market-card-copy">{product.description}</p>
              <div className="market-card-bottom">
                <span>{product.price}</span>
                <Link href="/cart" className="mini-link">
                  Add
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageChrome>
  );
}
