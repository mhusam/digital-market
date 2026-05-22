"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@digital-market/shared-types";
import { useCustomer } from "../../_components/customer-provider";
import { useToast } from "../../_components/toast-provider";
import { toCurrency, offeringTypeLabel } from "../../_lib/format";

interface ProductDetailClientProps {
  product: Product;
  related: Product[];
}

export function ProductDetailClient({
  product,
  related,
}: ProductDetailClientProps) {
  const { addToCart } = useCustomer();
  const router = useRouter();
  const toast = useToast();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addToCart(product, quantity);
    toast.success(`Added "${product.title}" to cart`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/checkout");
  };

  return (
    <>
      <section className="auth-panel" aria-label="Product details">
        <div className="route-copy">
          <p className="page-eyebrow">
            <span>{offeringTypeLabel(product.offeringType ?? "PRODUCT")}</span>
            {(product.techTags ?? []).join(" · ") || "general"}
          </p>
          <h1 id="product-title" className="page-title compact-title">
            {product.title}
          </h1>
          <p className="page-copy">
            {product.description ??
              "Ready-to-use digital package with direct checkout and immediate fulfillment."}
          </p>

          <div className="page-actions">
            <label className="flex items-center gap-2 text-sm text-[var(--muted-strong)]">
              Quantity
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(event) =>
                  setQuantity(Math.max(1, Number(event.target.value) || 1))
                }
                aria-label="Quantity"
                className="h-10 w-20 rounded-xl border border-[var(--border)] bg-white/5 px-3"
              />
            </label>
            <button
              type="button"
              className="button button-primary"
              onClick={handleAdd}
            >
              Add to cart
              <span aria-hidden="true">→</span>
            </button>
            <button
              type="button"
              className="button button-secondary"
              onClick={handleBuyNow}
            >
              Buy now
            </button>
          </div>
        </div>

        <div className="market-card p-5 md:p-6 sticky-summary">
          <p className="uppercase tracking-[0.12em] text-xs text-[var(--muted)]">
            Pricing
          </p>
          <h2 className="text-3xl font-black tracking-tight mt-2">
            {toCurrency(product.price, product.currency)}
          </h2>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Payment options are shown at checkout based on store settings.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {(product.techTags ?? []).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--border)] bg-white/5 px-3 py-1 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-5 grid gap-2 text-xs text-[var(--muted)]">
            <div className="flex items-center gap-2">
              <span aria-hidden="true">✓</span>
              <span>Instant signed download after payment</span>
            </div>
            <div className="flex items-center gap-2">
              <span aria-hidden="true">✓</span>
              <span>License shown on product page</span>
            </div>
            <div className="flex items-center gap-2">
              <span aria-hidden="true">✓</span>
              <span>PayPal or bank transfer at checkout</span>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="catalog-layout" aria-label="Related products">
          <div className="route-copy catalog-copy">
            <h2 className="page-title compact-title">Related offers</h2>
          </div>
          <div className="catalog-grid">
            {related.map((item) => (
              <article key={item.id} className="market-card">
                <div className="market-card-top">
                  <p>{offeringTypeLabel(item.offeringType ?? "PRODUCT")}</p>
                  <span>
                    {(item.techTags ?? []).slice(0, 2).join(" · ") || "general"}
                  </span>
                </div>
                <h2>{item.title}</h2>
                <p className="market-card-copy">
                  {item.description ?? "Instant digital delivery."}
                </p>
                <div className="market-card-bottom">
                  <span>{toCurrency(item.price, item.currency)}</span>
                  <Link href={`/products/${item.slug}`} className="mini-link">
                    Open
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
