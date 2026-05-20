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
import { NativeSelect } from "../../components/ui/NativeSelect";

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
    <div className="mx-auto max-w-[1280px] px-5 pt-8 pb-20 md:px-8 md:pt-12 lg:max-w-none lg:pl-[312px] xl:pl-[352px]">
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
        <div className="flex items-center gap-2 rounded-full border border-[#1B1B1B]/8 bg-white p-1.5 shadow-[0_14px_34px_-26px_rgba(15,23,42,0.55)] transition-shadow hover:shadow-[0_18px_40px_-28px_rgba(15,23,42,0.65)]">
          <span className="text-[12px] font-black uppercase tracking-[0.14em] text-[#1B1B1B]/60 pl-3">
            Sort
          </span>
          <NativeSelect
            value={sortBy}
            onChange={(e) => {
              setLoading(true);
              setSortBy(e.target.value as SortBy);
              setPage(1);
            }}
            variant="pill"
            aria-label="Sort products"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </NativeSelect>
        </div>
      </div>

      <div className="lg:fixed lg:bottom-0 lg:left-[78px] lg:top-0 lg:z-40 lg:w-[280px] xl:w-[320px]">
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

      <div className="min-w-0">
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
  );
}
