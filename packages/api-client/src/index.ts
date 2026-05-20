import axios, { type AxiosInstance } from "axios";
import type {
  AuditLog,
  Category,
  Coupon,
  DashboardStats,
  DownloadEvent,
  Order,
  Payment,
  Product,
  ProductAsset,
  Review,
  Settings,
  StaticPage,
  StoreSetting,
  SupportTicket,
  Tag,
  User,
} from "@digital-market/shared-types";

// ─── Response wrappers ────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data?: T[];
  total?: number;
  page?: number;
  pageSize?: number;
}

interface SpringPage<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

function toPage<T>(p: SpringPage<T>): PaginatedResponse<T> {
  return { data: p.content, total: p.totalElements, page: p.number + 1, pageSize: p.size };
}

// ─── HTTP client ──────────────────────────────────────────────────────────────

let _token: string | null = null;
let _http: AxiosInstance | null = null;

function getHttp(): AxiosInstance {
  if (_http) return _http;
  _http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080",
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT ?? "30000"),
  });
  _http.interceptors.request.use((config) => {
    if (_token) config.headers.Authorization = `Bearer ${_token}`;
    return config;
  });
  _http.interceptors.response.use(
    (r) => r,
    (err) => {
      if (err.response?.status === 401) {
        _token = null;
        if (typeof window !== "undefined") window.location.href = "/admin/login";
      }
      return Promise.reject(err);
    }
  );
  return _http;
}

export function setAuthToken(token: string | null): void {
  _token = token;
}

function wrap<T>(data: T): ApiResponse<T> {
  return { success: true, data };
}

function wrapErr(err: unknown): ApiResponse<never> {
  if (axios.isAxiosError(err)) {
    const msg = (err.response?.data as { message?: string })?.message ?? err.message;
    return { success: false, message: msg };
  }
  return { success: false, message: String(err) };
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function adminLogin(params: {
  email: string;
  password: string;
}): Promise<ApiResponse<{ user: User; token?: string }>> {
  try {
    const { data } = await getHttp().post<{ token: string; user: User }>(
      "/api/v1/auth/login",
      { login: params.email, password: params.password }
    );
    return wrap({ user: data.user, token: data.token });
  } catch (err) {
    return wrapErr(err);
  }
}

export async function adminLogout(): Promise<ApiResponse<void>> {
  setAuthToken(null);
  return { success: true };
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export async function getDashboard(): Promise<ApiResponse<DashboardStats>> {
  try {
    const { data } = await getHttp().get<{
      totalOrders: number;
      totalRevenue: number;
      revenueGrowthPercent: number;
      ordersGrowthPercent: number;
      totalCustomers: number;
      customersGrowthPercent: number;
      totalProducts: number;
      salesChart: Array<{ month: string; revenue: number; orders: number }>;
      topProducts: Array<{ productId: string; title: string; revenue: number; salesCount: number }>;
      recentOrders: Order[];
    }>("/api/v1/admin/dashboard");
    return wrap({
      totalRevenue: Number(data.totalRevenue),
      revenueGrowthPercent: data.revenueGrowthPercent,
      totalOrders: data.totalOrders,
      ordersGrowthPercent: data.ordersGrowthPercent,
      totalCustomers: data.totalCustomers,
      customersGrowthPercent: data.customersGrowthPercent,
      totalProducts: data.totalProducts,
      salesChart: data.salesChart.map((p) => ({
        month: p.month,
        revenue: Number(p.revenue),
        orders: p.orders,
      })),
      topProducts: data.topProducts.map((p) => ({
        productId: p.productId,
        title: p.title,
        revenue: Number(p.revenue),
        salesCount: p.salesCount,
      })),
      recentOrders: data.recentOrders,
    });
  } catch (err) {
    return wrapErr(err);
  }
}

// ─── Products ─────────────────────────────────────────────────────────────────

export async function adminGetProducts(
  page = 1,
  pageSize = 20,
  status?: string,
  search?: string
): Promise<PaginatedResponse<Product>> {
  try {
    const params: Record<string, string | number> = { page: page - 1, size: pageSize };
    if (status) params.status = status;
    if (search) params.search = search;
    const { data } = await getHttp().get<SpringPage<Product>>("/api/v1/admin/products", { params });
    return toPage(data);
  } catch {
    return { data: [], total: 0, page, pageSize };
  }
}

export async function adminGetProduct(id: string): Promise<ApiResponse<Product>> {
  try {
    const { data } = await getHttp().get<Product>(`/api/v1/admin/products/${id}`);
    return wrap(data);
  } catch (err) {
    return wrapErr(err);
  }
}

export async function adminCreateProduct(d: {
  title: string;
  slug?: string;
  description?: string;
  price: number;
  currency?: string;
}): Promise<ApiResponse<Product>> {
  try {
    const { data } = await getHttp().post<Product>("/api/v1/admin/products", d);
    return wrap(data);
  } catch (err) {
    return wrapErr(err);
  }
}

export async function adminUpdateProduct(
  id: string,
  d: { title?: string; description?: string; price?: number; currency?: string }
): Promise<ApiResponse<Product>> {
  try {
    const { data } = await getHttp().put<Product>(`/api/v1/admin/products/${id}`, d);
    return wrap(data);
  } catch (err) {
    return wrapErr(err);
  }
}

export async function adminPublishProduct(id: string): Promise<ApiResponse<void>> {
  try {
    await getHttp().post(`/api/v1/admin/products/${id}/publish`);
    return { success: true };
  } catch (err) {
    return wrapErr(err);
  }
}

export async function adminUnpublishProduct(id: string): Promise<ApiResponse<void>> {
  try {
    await getHttp().post(`/api/v1/admin/products/${id}/unpublish`);
    return { success: true };
  } catch (err) {
    return wrapErr(err);
  }
}

export async function adminArchiveProduct(id: string): Promise<ApiResponse<void>> {
  try {
    await getHttp().post(`/api/v1/admin/products/${id}/archive`);
    return { success: true };
  } catch (err) {
    return wrapErr(err);
  }
}

export async function adminDeleteProduct(id: string): Promise<ApiResponse<void>> {
  try {
    await getHttp().delete(`/api/v1/admin/products/${id}`);
    return { success: true };
  } catch (err) {
    return wrapErr(err);
  }
}

export async function adminUploadAsset(
  productId: string,
  file: File
): Promise<ApiResponse<ProductAsset>> {
  try {
    const form = new FormData();
    form.append("file", file);
    const { data } = await getHttp().post<ProductAsset>(
      `/api/v1/admin/products/${productId}/assets`,
      form,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return wrap(data);
  } catch (err) {
    return wrapErr(err);
  }
}

export async function adminGetAssetDownloadUrl(assetId: string): Promise<string> {
  const { data } = await getHttp().get<string>(
    `/api/v1/admin/products/assets/${assetId}/download-url`
  );
  return data;
}

export async function adminDeleteAsset(assetId: string): Promise<ApiResponse<void>> {
  try {
    await getHttp().delete(`/api/v1/admin/products/assets/${assetId}`);
    return { success: true };
  } catch (err) {
    return wrapErr(err);
  }
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export async function adminGetOrders(
  page = 1,
  pageSize = 20,
  status?: string,
  search?: string
): Promise<PaginatedResponse<Order>> {
  try {
    const params: Record<string, string | number> = {
      page: page - 1,
      size: pageSize,
      sort: "createdAt,desc",
    };
    if (status) params.status = status;
    if (search) params.search = search;
    const { data } = await getHttp().get<SpringPage<Order>>("/api/v1/admin/orders", { params });
    return toPage(data);
  } catch {
    return { data: [], total: 0, page, pageSize };
  }
}

export async function adminGetOrder(id: string): Promise<ApiResponse<Order>> {
  try {
    const { data } = await getHttp().get<Order>(`/api/v1/admin/orders/${id}`);
    return wrap(data);
  } catch (err) {
    return wrapErr(err);
  }
}

export async function adminMarkOrderPaid(
  id: string,
  notes?: string
): Promise<ApiResponse<Order>> {
  try {
    const { data } = await getHttp().post<Order>(
      `/api/v1/admin/orders/${id}/mark-paid`,
      notes ? { notes } : {}
    );
    return wrap(data);
  } catch (err) {
    return wrapErr(err);
  }
}

export async function adminCancelOrder(
  id: string,
  reason?: string
): Promise<ApiResponse<Order>> {
  try {
    const { data } = await getHttp().post<Order>(
      `/api/v1/admin/orders/${id}/cancel`,
      reason ? { reason } : {}
    );
    return wrap(data);
  } catch (err) {
    return wrapErr(err);
  }
}

export async function adminAddOrderNote(
  id: string,
  note: string
): Promise<ApiResponse<Order>> {
  try {
    const { data } = await getHttp().post<Order>(`/api/v1/admin/orders/${id}/notes`, { note });
    return wrap(data);
  } catch (err) {
    return wrapErr(err);
  }
}

export async function adminResendOrderEmail(id: string): Promise<ApiResponse<void>> {
  try {
    await getHttp().post(`/api/v1/admin/orders/${id}/resend-email`);
    return { success: true };
  } catch (err) {
    return wrapErr(err);
  }
}

/** Legacy: routes to appropriate action based on target status */
export async function adminUpdateOrderStatus(
  id: string,
  status: Order["status"]
): Promise<ApiResponse<void>> {
  if (status === "PAID") return adminMarkOrderPaid(id).then((r) => ({ success: r.success, message: r.message }));
  if (status === "CANCELLED") return adminCancelOrder(id).then((r) => ({ success: r.success, message: r.message }));
  return { success: false, message: "Use specific action endpoints instead" };
}

/** Legacy alias: maps to cancel */
export async function adminRefundOrder(id: string): Promise<ApiResponse<void>> {
  return adminCancelOrder(id).then((r) => ({ success: r.success, message: r.message }));
}

export async function adminGetOrderDownloads(orderId: string): Promise<ApiResponse<DownloadEvent[]>> {
  try {
    const { data } = await getHttp().get<DownloadEvent[]>(
      `/api/v1/admin/orders/${orderId}/downloads`
    );
    return wrap(data);
  } catch (err) {
    return wrapErr(err);
  }
}

// ─── Customers ────────────────────────────────────────────────────────────────

export async function adminGetCustomers(
  page = 1,
  pageSize = 50
): Promise<PaginatedResponse<User>> {
  try {
    const { data } = await getHttp().get<SpringPage<User>>("/api/v1/admin/customers", {
      params: { page: page - 1, size: pageSize },
    });
    return toPage(data);
  } catch {
    return { data: [], total: 0, page, pageSize };
  }
}

export async function adminGetCustomer(id: string): Promise<ApiResponse<User>> {
  try {
    const { data } = await getHttp().get<User>(`/api/v1/admin/customers/${id}`);
    return wrap(data);
  } catch (err) {
    return wrapErr(err);
  }
}

// ─── Payments ─────────────────────────────────────────────────────────────────

export async function adminGetPayments(
  page = 1,
  pageSize = 20
): Promise<PaginatedResponse<Payment>> {
  try {
    const { data } = await getHttp().get<SpringPage<Payment>>("/api/v1/admin/payments", {
      params: { page: page - 1, size: pageSize },
    });
    return toPage(data);
  } catch {
    return { data: [], total: 0, page, pageSize };
  }
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export async function adminGetSettings(): Promise<ApiResponse<Settings[]>> {
  try {
    const { data } = await getHttp().get<StoreSetting[]>("/api/v1/admin/settings");
    return wrap(normalizeSettings(data));
  } catch (err) {
    return wrapErr(err);
  }
}

export async function adminUpdateSettings(
  updates: Record<string, string>
): Promise<ApiResponse<Settings[]>> {
  try {
    const { data } = await getHttp().put<StoreSetting[]>("/api/v1/admin/settings", updates);
    return wrap(normalizeSettings(data));
  } catch (err) {
    return wrapErr(err);
  }
}

function normalizeSettings(raw: StoreSetting[]): Settings[] {
  return raw.map((s) => {
    const parts = s.key.split(".");
    const group = parts[0] ?? "general";
    const label = parts.slice(1).join(" ").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      id: s.key,
      key: s.key,
      value: s.value ?? "",
      group,
      label: label || s.key,
      description: s.description ?? "",
      isPublic: group === "store" || group === "legal",
      updatedAt: new Date().toISOString(),
    };
  });
}

// ─── Stub functions for sections without backend support ──────────────────────

export async function adminGetUsers(): Promise<ApiResponse<User[]>> {
  return { success: true, data: [] };
}

export async function adminGetRoles(): Promise<
  ApiResponse<{ role: string; label: string; description: string }[]>
> {
  return {
    success: true,
    data: [
      { role: "ADMIN", label: "Administrator", description: "Full system access" },
      { role: "CUSTOMER", label: "Customer", description: "Browse and purchase products" },
    ],
  };
}

export async function adminGetAuditLogs(
  _page = 1,
  _pageSize = 50
): Promise<PaginatedResponse<AuditLog>> {
  return { data: [], total: 0, page: _page, pageSize: _pageSize };
}

export async function adminGetCoupons(): Promise<ApiResponse<Coupon[]>> {
  return { success: true, data: [] };
}

export async function adminGetPages(): Promise<ApiResponse<StaticPage[]>> {
  return { success: true, data: [] };
}

export async function adminGetReviews(
  _page = 1,
  _pageSize = 50
): Promise<PaginatedResponse<Review>> {
  return { data: [], total: 0, page: _page, pageSize: _pageSize };
}

export async function adminGetTickets(
  _page = 1,
  _pageSize = 50
): Promise<PaginatedResponse<SupportTicket>> {
  return { data: [], total: 0, page: _page, pageSize: _pageSize };
}

// ─── Reports (derived from dashboard / products) ──────────────────────────────

interface SalesReportRow { month: string; revenue: number; orders: number }
interface ProductReportRow { productId: string; title: string; salesCount: number; revenue: number }
interface CustomerReportRow { month: string; newCustomers: number; totalCustomers: number }

export async function adminSalesReport(): Promise<ApiResponse<SalesReportRow[]>> {
  const res = await getDashboard();
  if (!res.success || !res.data) return { success: false, message: res.message };
  return wrap(res.data.salesChart.map((p) => ({ month: p.month, revenue: p.revenue, orders: p.orders })));
}

export async function adminProductsReport(): Promise<ApiResponse<ProductReportRow[]>> {
  const res = await getDashboard();
  if (!res.success || !res.data) return { success: false, message: res.message };
  return wrap(
    res.data.topProducts.map((p) => ({
      productId: p.productId,
      title: p.title,
      salesCount: p.salesCount,
      revenue: p.revenue,
    }))
  );
}

export async function adminCustomersReport(): Promise<ApiResponse<CustomerReportRow[]>> {
  return { success: true, data: [] };
}

// ─── Mock data kept for section page compatibility ─────────────────────────────

export const mockProducts: Product[] = [];
export const mockCustomers: User[] = [];
export const mockOrders: Order[] = [];

export const mockDownloads: Array<{
  productId: string;
  userId: string;
  orderId: string;
  downloadCount: number;
  downloadLimit: number;
  createdAt: string;
  fileId: string;
}> = [];

export const mockBlogPosts: Array<{
  id: string;
  title: string;
  slug: string;
  status: string;
  readingTimeMinutes: number;
  publishedAt?: string;
  createdAt: string;
  tags: { name: string }[];
}> = [];

// Legacy category stubs (no backend support)
export async function adminGetCategories(): Promise<ApiResponse<Category[]>> {
  return { success: true, data: [] };
}

export async function adminCreateCategory(
  _data: { name: string; slug: string; description: string; sortOrder: number }
): Promise<ApiResponse<Category>> {
  return { success: false, message: "Categories not yet implemented" };
}

export async function adminUpdateCategory(
  _id: string,
  _data: Partial<{ name: string; slug: string; description: string; sortOrder: number }>
): Promise<ApiResponse<Category>> {
  return { success: false, message: "Categories not yet implemented" };
}

export async function adminDeleteCategory(_id: string): Promise<ApiResponse<void>> {
  return { success: false, message: "Categories not yet implemented" };
}
