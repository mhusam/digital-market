import type {
  ApiResponse,
  Product,
  Category,
  StaticPage,
  FAQ,
  ProductFilters,
  PaginationMeta,
} from '../../shared-types/src/index';
import {
  mockProducts,
  mockCategories,
  mockStaticPages,
  mockFAQs,
} from './mock-data';

// ─────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const randomDelay = (): Promise<void> =>
  delay(50 + Math.floor(Math.random() * 100));

const paginate = <T>(
  items: T[],
  page = 1,
  limit = 12,
): { items: T[]; meta: PaginationMeta } => {
  const total = items.length;
  const totalPages = Math.ceil(total / limit);
  const safePage = Math.max(1, Math.min(page, totalPages || 1));
  const start = (safePage - 1) * limit;
  return {
    items: items.slice(start, start + limit),
    meta: { total, page: safePage, limit, totalPages },
  };
};

const decorateProduct = (product: Product): Product => {
  const category = mockCategories.find((c) => c.id === product.categoryId);
  return {
    ...product,
    category,
  };
};

const applyProductFilters = (
  products: Product[],
  filters?: ProductFilters,
): Product[] => {
  let result = [...products];

  if (!filters) return result;

  if (filters.categorySlug) {
    const cat = mockCategories.find((c) => c.slug === filters.categorySlug);
    if (cat) result = result.filter((p) => p.categoryId === cat.id);
  }

  if (filters.minPrice !== undefined) {
    result = result.filter(
      (p) => (p.salePrice ?? p.price) >= (filters.minPrice as number),
    );
  }

  if (filters.maxPrice !== undefined) {
    result = result.filter(
      (p) => (p.salePrice ?? p.price) <= (filters.maxPrice as number),
    );
  }

  if (filters.licenseType) {
    result = result.filter((p) => p.licenseType === filters.licenseType);
  }

  if (filters.status) {
    result = result.filter((p) => p.status === filters.status);
  }

  if (filters.tags && filters.tags.length > 0) {
    result = result.filter((p) =>
      (p.tags || []).some((t) => filters.tags!.includes(t.slug)),
    );
  }

  const sortBy = filters.sortBy ?? 'newest';
  switch (sortBy) {
    case 'newest':
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      break;
    case 'popular':
      result.sort((a, b) => (b.salesCount ?? 0) - (a.salesCount ?? 0));
      break;
    case 'price_asc':
      result.sort(
        (a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price),
      );
      break;
    case 'price_desc':
      result.sort(
        (a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price),
      );
      break;
    case 'rating':
      result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      break;
  }

  return result;
};

// ─────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────

/**
 * Get a paginated list of published products, with optional filtering.
 */
export const getProducts = async (
  filters?: ProductFilters,
): Promise<ApiResponse<Product[]>> => {
  await randomDelay();

  const published = mockProducts
    .filter((p) => p.status === 'published')
    .map(decorateProduct);
  const filtered = applyProductFilters(published, filters);
  const { items, meta } = paginate(
    filtered,
    filters?.page ?? 1,
    filters?.limit ?? 12,
  );

  return { success: true, data: items, meta };
};

/**
 * Get a single published product by its slug.
 */
export const getProduct = async (
  slug: string,
): Promise<ApiResponse<Product | null>> => {
  await randomDelay();

  const product = mockProducts.find(
    (p) => p.slug === slug && p.status === 'published',
  );

  if (!product) {
    return { success: false, data: null, message: 'Product not found.' };
  }

  return { success: true, data: decorateProduct(product) };
};

/**
 * Get all categories.
 */
export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
  await randomDelay();

  const sorted = [...mockCategories].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );

  return { success: true, data: sorted };
};

/**
 * Get products belonging to a specific category slug, with optional filters.
 */
export const getCategoryProducts = async (
  slug: string,
  filters?: Omit<ProductFilters, 'categorySlug'>,
): Promise<ApiResponse<Product[]>> => {
  await randomDelay();

  const category = mockCategories.find((c) => c.slug === slug);

  if (!category) {
    return {
      success: false,
      data: null,
      message: 'Category not found.',
    };
  }

  const inCategory = mockProducts
    .filter((p) => p.categoryId === category.id && p.status === 'published')
    .map(decorateProduct);

  const filtered = applyProductFilters(inCategory, {
    ...filters,
    categorySlug: slug,
  });

  const { items, meta } = paginate(
    filtered,
    filters?.page ?? 1,
    filters?.limit ?? 12,
  );

  return { success: true, data: items, meta };
};

/**
 * Full-text product search across title, shortDescription, tags, and technologies.
 */
export const searchProducts = async (
  query: string,
  filters?: Omit<ProductFilters, 'sortBy'>,
): Promise<ApiResponse<Product[]>> => {
  await randomDelay();

  const q = query.toLowerCase().trim();

  if (!q) {
    return { success: true, data: [], meta: { total: 0, page: 1, limit: 12, totalPages: 0 } };
  }

  const published = mockProducts
    .filter((p) => p.status === 'published')
    .map(decorateProduct);

  const matched = published.filter((p) => {
    return (
      (p.title ?? "").toLowerCase().includes(q) ||
      (p.shortDescription ?? "").toLowerCase().includes(q) ||
      (p.description ?? "").toLowerCase().includes(q) ||
      (p.tags ?? []).some((t) => t.name.toLowerCase().includes(q)) ||
      (p.technologies ?? []).some((tech) => tech.toLowerCase().includes(q))
    );
  });

  const filtered = applyProductFilters(matched, {
    ...filters,
    sortBy: 'popular',
  });

  const { items, meta } = paginate(
    filtered,
    filters?.page ?? 1,
    filters?.limit ?? 12,
  );

  return { success: true, data: items, meta };
};

/**
 * Get a published static page by its slug (e.g. 'about', 'terms', 'privacy').
 */
export const getPage = async (
  slug: string,
): Promise<ApiResponse<StaticPage | null>> => {
  await randomDelay();

  const page = mockStaticPages.find(
    (p) => p.slug === slug && p.isPublished,
  );

  if (!page) {
    return { success: false, data: null, message: 'Page not found.' };
  }

  return { success: true, data: page };
};

/**
 * Get all published FAQs ordered by sortOrder.
 */
export const getFAQs = async (): Promise<ApiResponse<FAQ[]>> => {
  await randomDelay();

  const published = [...mockFAQs]
    .filter((f) => f.isPublished)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  return { success: true, data: published };
};
