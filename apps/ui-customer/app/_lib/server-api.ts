import type { Product } from "@digital-market/shared-types";

function apiBase(): string {
  return (
    process.env.API_INTERNAL_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:8080"
  );
}

export async function fetchProductBySlug(
  slug: string,
): Promise<Product | null> {
  try {
    const response = await fetch(
      `${apiBase()}/api/v1/store/products/${encodeURIComponent(slug)}`,
      { next: { revalidate: 60 } },
    );
    if (!response.ok) return null;
    const data = (await response.json()) as Product;
    return data;
  } catch {
    return null;
  }
}

interface SpringPage<T> {
  content: T[];
  totalElements: number;
}

export async function fetchRelatedProducts(
  offeringType: string,
  excludeId: string,
  limit = 3,
): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    params.set("type", offeringType);
    params.set("page", "0");
    params.set("size", String(limit + 1));
    params.set("sort", "createdAt,desc");

    const response = await fetch(
      `${apiBase()}/api/v1/store/products?${params.toString()}`,
      { next: { revalidate: 60 } },
    );
    if (!response.ok) return [];
    const page = (await response.json()) as SpringPage<Product>;
    return (page.content ?? [])
      .filter((product) => product.id !== excludeId)
      .slice(0, limit);
  } catch {
    return [];
  }
}
