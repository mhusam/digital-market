"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getCategories,
  getProducts,
} from "@digital-market/api-client";
import type {
  Category,
  Product,
  ProductFilters,
} from "@digital-market/shared-types";
import { FilterSidebar, type FilterValues, type TagOption } from "../../components/products/FilterSidebar";
import { ProductGrid } from "../../components/products/ProductGrid";
import { Pagination } from "../../components/ui/Pagination";
import { Breadcrumb } from "../../components/ui/Breadcrumb";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Most popular" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
] as const;

type SortBy = typeof SORT_OPTIONS[number]["value"];

export default function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState<SortBy>("popular");
  const [filters, setFilters] = useState<FilterValues>({ tags: [] });

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
    const f: ProductFilters = {
      sortBy,
      page,
      limit: 9,
      categorySlug: filters.categorySlug,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      tags: filters.tags.length > 0 ? filters.tags : undefined,
      licenseType: filters.licenseType as ProductFilters["licenseType"],
    };
    void getProducts(f).then((r) => {
      if (!mounted) return;
      setProducts(r.data ?? []);
      setTotalPages(r.meta?.totalPages ?? 1);
      setTotal(r.meta?.total ?? 0);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [filters, page, sortBy]);

  const tagOptions = useMemo<TagOption[]>(
    () => [
      { value: "nodejs", label: "Node.js" },
      { value: "typescript", label: "TypeScript" },
      { value: "docker", label: "Docker" },
      { value: "react", label: "React" },
      { value: "nextjs", label: "Next.js" },
      { value: "tailwindcss", label: "Tailwind" },
      { value: "stripe", label: "Stripe" },
      { value: "microservices", label: "Microservices" },
      { value: "saas", label: "SaaS" },
      { value: "dashboard", label: "Dashboard" },
    ],
    [],
  );

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-8 md:pt-12 pb-20">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Products" }]} />
      <div className="mt-6 mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="eyebrow">Shop</span>
          <h1 className="mt-3 text-4xl md:text-5xl font-black tracking-[-0.04em]">
            All products{" "}
            <span className="font-hand text-[#0EA5E9] text-3xl ml-2">
              {total} found
            </span>
          </h1>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-full p-1.5 border border-[#1B1B1B]/8 shadow-sm">
          <span className="text-[12px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/60 pl-3">
            Sort
          </span>
          <select
            value={sortBy}
            onChange={(e) => {
              setLoading(true);
              setSortBy(e.target.value as SortBy);
              setPage(1);
            }}
            className="bg-transparent h-9 pl-2 pr-3 font-bold text-sm cursor-pointer rounded-full"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-3">
          <FilterSidebar
            categories={categories}
            values={filters}
            onChange={(v) => {
              setLoading(true);
              setFilters(v);
              setPage(1);
            }}
            tagOptions={tagOptions}
          />
        </div>
        <div className="lg:col-span-9">
          <ProductGrid products={products} loading={loading} />
          {!loading && totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={(nextPage) => {
                setLoading(true);
                setPage(nextPage);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
