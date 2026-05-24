"use client";

import { useEffect, useMemo, useState } from "react";
import { getCategories, getProducts, searchProducts } from "@digital-market/api-client";
import type { Category, Product, ProductFilters } from "@digital-market/shared-types";
import {
  FilterSidebar,
  type FilterValues,
  type TagOption,
} from "../../components/products/FilterSidebar";
import { ProductGrid } from "../../components/products/ProductGrid";
import { Breadcrumb } from "../../components/ui/route-breadcrumb";
import { NativeSelect } from "../../components/ui/native-select";
import { Pagination } from "../../components/ui/app-pagination";

const PAGE_SIZE = 12;

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Most popular" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
] as const;

type SortBy = (typeof SORT_OPTIONS)[number]["value"];

function sortProducts(products: Product[], sortBy: SortBy): Product[] {
  const sorted = [...products];
  switch (sortBy) {
    case "newest":
      sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      break;
    case "popular":
      sorted.sort((a, b) => (b.salesCount ?? 0) - (a.salesCount ?? 0));
      break;
    case "price_asc":
      sorted.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
      break;
    case "price_desc":
      sorted.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
      break;
    case "rating":
      sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      break;
  }
  return sorted;
}

export default function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState<SortBy>("popular");
  const [filters, setFilters] = useState<FilterValues>({ query: "", tags: [] });

  useEffect(() => {
    let active = true;
    void getCategories().then((response) => {
      if (active) setCategories(response.data ?? []);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    const requestFilters: ProductFilters = {
      sortBy,
      page,
      limit: PAGE_SIZE,
      categorySlug: filters.categorySlug,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      tags: filters.tags.length > 0 ? filters.tags : undefined,
      licenseType: filters.licenseType as ProductFilters["licenseType"],
    };
    const trimmedQuery = filters.query?.trim();

    const loadProducts = async () => {
      setLoading(true);
      const response = trimmedQuery
        ? await searchProducts(trimmedQuery, {
            page,
            limit: PAGE_SIZE,
            categorySlug: filters.categorySlug,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
            tags: filters.tags.length > 0 ? filters.tags : undefined,
            licenseType: filters.licenseType as ProductFilters["licenseType"],
          })
        : await getProducts(requestFilters);
      if (!mounted) return;
      setProducts(sortProducts(response.data ?? [], sortBy));
      setTotalPages(response.meta?.totalPages ?? 1);
      setTotal(response.meta?.total ?? 0);
      setLoading(false);
    };

    void loadProducts();

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
    <div className="page-container py-4">
      <div className="grid gap-3 border-b border-border pb-3 md:grid-cols-[1fr_auto] md:items-end">
        <div className="min-w-0">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Products" }]} />
          <div className="mt-2 flex flex-wrap items-end gap-x-3 gap-y-1">
            <h1 className="text-2xl font-extrabold text-foreground md:text-3xl">
              Products
            </h1>
            <p className="pb-1 text-sm font-semibold text-muted-foreground">
              {loading ? "Loading..." : `${total} products`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">
            Sort
          </span>
          <NativeSelect
            value={sortBy}
            onChange={(event) => {
              setSortBy(event.target.value as SortBy);
              setPage(1);
            }}
            variant="pill"
            aria-label="Sort products"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </NativeSelect>
        </div>
      </div>

      <div className="mt-3 space-y-3">
        <FilterSidebar
          categories={categories}
          values={filters}
          onChange={(nextFilters) => {
            setFilters(nextFilters);
            setPage(1);
          }}
          tagOptions={tagOptions}
        />

        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">
            {loading
              ? "Updating results"
              : `Showing ${products.length} of ${total}`}
          </p>
          <p className="text-xs font-bold text-muted-foreground">
            Page {page} of {Math.max(totalPages, 1)}
          </p>
        </div>

        <div className="min-w-0 space-y-4">
          <ProductGrid products={products} loading={loading} />
          {!loading && totalPages > 1 && (
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          )}
        </div>
      </div>
    </div>
  );
}
