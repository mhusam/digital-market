"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { storeGetProductFacets, storeListProducts, type StoreProductFilters } from "@digital-market/api-client";
import type { OfferingType, Product } from "@digital-market/shared-types";
import { PageChrome } from "../_components/page-chrome";
import { useCustomer } from "../_components/customer-provider";
import { useToast } from "../_components/toast-provider";
import { toCurrency, offeringTypeLabel } from "../_lib/format";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Skeleton } from "../../components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

type SortKey = "newest" | "oldest" | "price_asc" | "price_desc" | "name_asc" | "name_desc";

const SORT_OPTIONS: Array<{ value: SortKey; label: string }> = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name_asc", label: "Name: A-Z" },
  { value: "name_desc", label: "Name: Z-A" },
  { value: "oldest", label: "Oldest" },
];

const CATALOG_FALLBACK_MS = Number(process.env.NEXT_PUBLIC_CATALOG_FALLBACK_MS ?? 1800);

const PREVIEW_PRODUCTS: Product[] = [
  {
    id: "preview-spring-commerce",
    title: "Spring Commerce Starter",
    slug: "spring-commerce-starter",
    description: "A modular Spring Boot commerce API with auth, catalog, orders, and payment-ready boundaries.",
    price: 149,
    currency: "USD",
    status: "PUBLISHED",
    offeringType: "PRODUCT",
    techTags: ["backend", "spring-boot", "java", "api"],
    assets: [],
    createdAt: "2026-05-01T00:00:00.000Z",
    updatedAt: "2026-05-01T00:00:00.000Z",
  },
  {
    id: "preview-next-storefront",
    title: "Next.js Storefront Kit",
    slug: "nextjs-storefront-kit",
    description: "Animated storefront pages, cart, checkout shell, and responsive production UI patterns.",
    price: 129,
    currency: "USD",
    status: "PUBLISHED",
    offeringType: "PRODUCT",
    techTags: ["frontend", "next.js", "react", "ui"],
    assets: [],
    createdAt: "2026-04-22T00:00:00.000Z",
    updatedAt: "2026-04-22T00:00:00.000Z",
  },
  {
    id: "preview-saas-admin",
    title: "SaaS Admin Project",
    slug: "saas-admin-project",
    description: "A complete admin dashboard project with product management, orders, settings, and analytics.",
    price: 249,
    currency: "USD",
    status: "PUBLISHED",
    offeringType: "PROJECT",
    techTags: ["dashboard", "frontend", "backend", "typescript"],
    assets: [],
    createdAt: "2026-04-12T00:00:00.000Z",
    updatedAt: "2026-04-12T00:00:00.000Z",
  },
  {
    id: "preview-python-automation",
    title: "Python Automation Pack",
    slug: "python-automation-pack",
    description: "Reusable scripts for data cleanup, scheduled jobs, API syncing, and reporting workflows.",
    price: 89,
    currency: "USD",
    status: "PUBLISHED",
    offeringType: "PRODUCT",
    techTags: ["python", "automation", "data"],
    assets: [],
    createdAt: "2026-03-28T00:00:00.000Z",
    updatedAt: "2026-03-28T00:00:00.000Z",
  },
  {
    id: "preview-cloud-deployment",
    title: "Cloud Deployment Solution",
    slug: "cloud-deployment-solution",
    description: "Docker, CI/CD, environment setup, and deployment documentation for a production-ready launch.",
    price: 199,
    currency: "USD",
    status: "PUBLISHED",
    offeringType: "SOLUTION",
    techTags: ["cloud", "docker", "devops", "ci-cd"],
    assets: [],
    createdAt: "2026-03-10T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z",
  },
  {
    id: "preview-api-integration",
    title: "API Integration Blueprint",
    slug: "api-integration-blueprint",
    description: "Architecture, code samples, and handoff documents for connecting business systems over REST APIs.",
    price: 119,
    currency: "USD",
    status: "PUBLISHED",
    offeringType: "SOLUTION",
    techTags: ["api", "backend", "integration"],
    assets: [],
    createdAt: "2026-02-24T00:00:00.000Z",
    updatedAt: "2026-02-24T00:00:00.000Z",
  },
];

const PREVIEW_FACETS = {
  offeringTypes: ["PRODUCT", "PROJECT", "SOLUTION"],
  techTags: Array.from(new Set(PREVIEW_PRODUCTS.flatMap((product) => product.techTags ?? []))).sort(),
  minPrice: Math.min(...PREVIEW_PRODUCTS.map((product) => product.price)),
  maxPrice: Math.max(...PREVIEW_PRODUCTS.map((product) => product.price)),
};

function withCatalogTimeout<T>(promise: Promise<T>): Promise<T | null> {
  return new Promise((resolve) => {
    let settled = false;
    const timer = window.setTimeout(() => {
      if (!settled) {
        settled = true;
        resolve(null);
      }
    }, CATALOG_FALLBACK_MS);

    promise
      .then((value) => {
        if (!settled) {
          settled = true;
          window.clearTimeout(timer);
          resolve(value);
        }
      })
      .catch(() => {
        if (!settled) {
          settled = true;
          window.clearTimeout(timer);
          resolve(null);
        }
      });
  });
}

function filterPreviewProducts(filters: StoreProductFilters): Product[] {
  const query = filters.search?.trim().toLowerCase();
  const tags = new Set((filters.tags ?? []).map((tag) => tag.toLowerCase()));

  const filtered = PREVIEW_PRODUCTS.filter((product) => {
    if (filters.type && product.offeringType !== filters.type) return false;
    if (filters.priceMin !== undefined && product.price < filters.priceMin) return false;
    if (filters.priceMax !== undefined && product.price > filters.priceMax) return false;
    if (tags.size > 0 && !(product.techTags ?? []).some((tag) => tags.has(tag.toLowerCase()))) return false;
    if (!query) return true;

    const haystack = [
      product.title,
      product.description ?? "",
      product.offeringType,
      (product.techTags ?? []).join(" "),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });

  return filtered.sort((a, b) => {
    switch (filters.sort) {
      case "oldest":
        return a.createdAt.localeCompare(b.createdAt);
      case "price_asc":
        return a.price - b.price;
      case "price_desc":
        return b.price - a.price;
      case "name_asc":
        return a.title.localeCompare(b.title);
      case "name_desc":
        return b.title.localeCompare(a.title);
      case "newest":
      default:
        return b.createdAt.localeCompare(a.createdAt);
    }
  });
}

function parseFilters(params: URLSearchParams): StoreProductFilters {
  const tags = params.getAll("tag").filter(Boolean);
  const min = params.get("min");
  const max = params.get("max");
  const sort = params.get("sort") as SortKey | null;
  const type = (params.get("type") as OfferingType | null) ?? undefined;
  const page = Number(params.get("page") ?? "1");

  return {
    search: params.get("q") ?? "",
    type: type && ["PRODUCT", "PROJECT", "SOLUTION"].includes(type) ? type : "",
    tags,
    priceMin: min ? Number(min) : undefined,
    priceMax: max ? Number(max) : undefined,
    sort: sort && SORT_OPTIONS.some((option) => option.value === sort) ? sort : "newest",
    page: Number.isFinite(page) && page > 0 ? page : 1,
    pageSize: 16,
  };
}

function filtersToParams(filters: StoreProductFilters): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.search) params.set("q", filters.search);
  if (filters.type) params.set("type", filters.type);
  for (const tag of filters.tags ?? []) params.append("tag", tag);
  if (filters.priceMin !== undefined) params.set("min", String(filters.priceMin));
  if (filters.priceMax !== undefined) params.set("max", String(filters.priceMax));
  if (filters.sort) params.set("sort", filters.sort);
  if ((filters.page ?? 1) > 1) params.set("page", String(filters.page));
  return params;
}

export default function CatalogPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { addToCart } = useCustomer();
  const toast = useToast();
  const searchParamString = searchParams.toString();
  const loadIdRef = useRef(0);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    toast.success(`Added "${product.title}" to cart`);
  };

  const currentFilters = useMemo(
    () => parseFilters(new URLSearchParams(searchParamString)),
    [searchParamString],
  );

  const [searchDraft, setSearchDraft] = useState(currentFilters.search ?? "");
  const [minDraft, setMinDraft] = useState(currentFilters.priceMin?.toString() ?? "");
  const [maxDraft, setMaxDraft] = useState(currentFilters.priceMax?.toString() ?? "");
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [facets, setFacets] = useState<{ offeringTypes: string[]; techTags: string[]; minPrice: number | null; maxPrice: number | null; }>({
    offeringTypes: ["PRODUCT", "PROJECT", "SOLUTION"],
    techTags: [],
    minPrice: null,
    maxPrice: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchDraft(currentFilters.search ?? "");
    setMinDraft(currentFilters.priceMin?.toString() ?? "");
    setMaxDraft(currentFilters.priceMax?.toString() ?? "");
  }, [currentFilters.search, currentFilters.priceMin, currentFilters.priceMax]);

  useEffect(() => {
    const loadId = loadIdRef.current + 1;
    loadIdRef.current = loadId;

    const load = async () => {
      setLoading(true);
      setError(null);

      const [productsResponse, facetsResponse] = await Promise.all([
        withCatalogTimeout(storeListProducts(currentFilters)),
        withCatalogTimeout(storeGetProductFacets({
          search: currentFilters.search,
          type: currentFilters.type,
          priceMin: currentFilters.priceMin,
          priceMax: currentFilters.priceMax,
        })),
      ]);

      if (loadId !== loadIdRef.current) return;

      const shouldUsePreview =
        !productsResponse ||
        (!facetsResponse?.success && (productsResponse.data?.length ?? 0) === 0);

      if (shouldUsePreview) {
        const previewMatches = filterPreviewProducts(currentFilters);
        const pageStart = ((currentFilters.page ?? 1) - 1) * (currentFilters.pageSize ?? 16);
        const pageEnd = pageStart + (currentFilters.pageSize ?? 16);

        setProducts(previewMatches.slice(pageStart, pageEnd));
        setTotal(previewMatches.length);
        setFacets(PREVIEW_FACETS);
        setError("Live catalog API is unavailable. Showing PROGMAN preview offers.");
        setLoading(false);
        return;
      }

      setProducts(productsResponse.data ?? []);
      setTotal(productsResponse.total ?? 0);

      if (facetsResponse?.success && facetsResponse.data) {
        setFacets(facetsResponse.data);
      } else {
        setFacets(PREVIEW_FACETS);
      }

      if (!productsResponse.data) {
        setError("Could not load catalog right now.");
      }

      setLoading(false);
    };

    void load();
  }, [currentFilters]);

  const page = currentFilters.page ?? 1;
  const pageSize = currentFilters.pageSize ?? 16;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const patchFilters = (patch: Partial<StoreProductFilters>) => {
    const next = { ...currentFilters, ...patch };
    if (patch.search !== undefined || patch.type !== undefined || patch.tags !== undefined || patch.priceMin !== undefined || patch.priceMax !== undefined || patch.sort !== undefined) {
      next.page = 1;
    }
    const nextParams = filtersToParams(next);
    router.replace(nextParams.toString() ? `${pathname}?${nextParams.toString()}` : pathname, { scroll: false });
  };

  const selectedTags = new Set(currentFilters.tags ?? []);

  return (
    <PageChrome
      activeHref="/catalog"
      ariaLabelledBy="catalog-title"
      className="route-screen catalog-screen"
      footer="Filter by type, tags, pricing, and sort while preserving a lightweight animated browsing experience."
    >
      <section className="catalog-layout" aria-label="Product catalog">
        <div className="route-copy catalog-copy">
          <p className="page-eyebrow">
            <span>Catalog</span>
            Products, projects, and solutions
          </p>
          <h1 id="catalog-title" className="page-title compact-title">
            Browse ready-to-buy digital IT offers.
          </h1>
          <p className="page-copy">
            Filter with tags like backend, frontend, spring-boot, java, and python. Keep checkout direct and simple.
          </p>
        </div>

        <div className="market-card p-4 md:p-5">
          <div className="grid gap-3 md:grid-cols-7">
            <Input
              type="search"
              value={searchDraft}
              onChange={(e) => setSearchDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") patchFilters({ search: searchDraft.trim() });
              }}
              placeholder="Search products and solutions"
              className="md:col-span-2"
            />
            <Select
              value={currentFilters.type ?? ""}
              onValueChange={(value) => patchFilters({ type: (value || "") as OfferingType | "" })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All types</SelectItem>
                {facets.offeringTypes.map((value) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={currentFilters.sort ?? "newest"}
              onValueChange={(value) => patchFilters({ sort: value as SortKey })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              min={0}
              value={minDraft}
              onChange={(e) => setMinDraft(e.target.value)}
              placeholder={`Min ${facets.minPrice ?? 0}`}
            />
            <Input
              type="number"
              min={0}
              value={maxDraft}
              onChange={(e) => setMaxDraft(e.target.value)}
              placeholder={`Max ${facets.maxPrice ?? 0}`}
            />
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                patchFilters({
                  search: searchDraft.trim(),
                  priceMin: minDraft.trim() ? Number(minDraft) : undefined,
                  priceMax: maxDraft.trim() ? Number(maxDraft) : undefined,
                })
              }
            >
              Apply
            </Button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {facets.techTags.map((tag) => {
              const active = selectedTags.has(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    const next = new Set(selectedTags);
                    if (next.has(tag)) next.delete(tag);
                    else next.add(tag);
                    patchFilters({ tags: Array.from(next) });
                  }}
                >
                  <Badge
                    variant={active ? "default" : "secondary"}
                    className="cursor-pointer transition-all hover:scale-105"
                  >
                    {tag}
                  </Badge>
                </button>
              );
            })}
          </div>

          {(currentFilters.search || currentFilters.tags?.length || currentFilters.type || currentFilters.priceMin !== undefined || currentFilters.priceMax !== undefined) && (
            <div className="mt-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => patchFilters({ search: "", type: "", tags: [], priceMin: undefined, priceMax: undefined, page: 1 })}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>

        {error ? <p className="catalog-notice">{error}</p> : null}

        <div className="catalog-grid" aria-label="All products">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={`loading-${index}`} className="h-[154px]" />
              ))
            : products.map((product, index) => (
                <article key={product.id} className="market-card" style={{ "--item-index": index } as CSSProperties}>
                  <div className="market-card-top">
                    <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                      {offeringTypeLabel(product.offeringType ?? "PRODUCT")}
                    </Badge>
                    <span>{(product.techTags ?? []).slice(0, 2).join(" · ") || "general"}</span>
                  </div>
                  <h2>{product.title}</h2>
                  <p className="market-card-copy">{product.description ?? "Practical digital package with immediate delivery after payment."}</p>
                  <div className="market-card-bottom">
                    <span>{toCurrency(product.price, product.currency)}</span>
                    <div className="flex items-center gap-2">
                      <Link href={`/products/${product.slug}`} className="mini-link">
                        Details
                      </Link>
                      <button type="button" className="mini-link" onClick={() => handleAddToCart(product)}>
                        Add
                      </button>
                    </div>
                  </div>
                </article>
              ))}
        </div>

        {!loading && products.length === 0 ? (
          <div className="market-card p-8 text-center">
            <h2 className="m-0 text-xl font-bold">No matches found</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">Try removing one of the selected filters.</p>
          </div>
        ) : null}

        <div className="mt-4 flex items-center justify-between text-sm text-[var(--muted-strong)]">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => patchFilters({ page: page - 1 })}
            >
              Previous
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => patchFilters({ page: page + 1 })}
            >
              Next
            </Button>
          </div>
        </div>
      </section>
    </PageChrome>
  );
}
