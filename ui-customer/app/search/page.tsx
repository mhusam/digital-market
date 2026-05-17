"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  getCategories,
  searchProducts,
} from "@digital-market/api-client";
import type { Category, Product } from "@digital-market/shared-types";
import { Breadcrumb } from "../../components/ui/Breadcrumb";
import { ProductGrid } from "../../components/products/ProductGrid";
import { SearchBar } from "../../components/products/SearchBar";

function SearchInner() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const cat = params.get("category") ?? "";
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let active = true;
    void getCategories().then((r) => {
      if (active) setCategories(r.data ?? []);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    queueMicrotask(() => {
      if (mounted) setLoading(true);
    });
    void searchProducts(q, { categorySlug: cat || undefined, limit: 18 }).then(
      (r) => {
        if (!mounted) return;
        setProducts(r.data ?? []);
        setTotal(r.meta?.total ?? 0);
        setLoading(false);
      },
    );
    return () => {
      mounted = false;
    };
  }, [cat, q]);

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-8 pb-20">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Search" }]}
      />
      <div className="mt-6">
        <span className="eyebrow">Search results</span>
        <h1 className="mt-3 text-4xl md:text-5xl font-black tracking-[-0.04em]">
          {q ? (
            <>
              Results for{" "}
              <span className="font-hand text-[#0EA5E9]">&ldquo;{q}&rdquo;</span>
            </>
          ) : (
            "Search Forge"
          )}
        </h1>
        <p className="mt-2 text-[#1B1B1B]/70 font-bold">
          {loading ? "Searching…" : `${total} matches`}
        </p>
      </div>

      <div className="mt-6 mb-10">
        <SearchBar
          categories={categories}
          initialQuery={q}
          initialCategory={cat}
        />
      </div>

      <ProductGrid
        products={products}
        loading={loading}
        emptyTitle={q ? `No results for "${q}"` : "Try a search above"}
        emptyDescription="Try different keywords, or browse popular products."
      />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center font-bold">Loading…</div>}>
      <SearchInner />
    </Suspense>
  );
}
