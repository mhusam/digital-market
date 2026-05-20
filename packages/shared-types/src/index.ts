// ─── Backend-aligned types (match Spring Boot DTOs exactly) ──────────────────

export type ProductStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type OrderStatus =
  | "PENDING_PAYMENT"
  | "PAID"
  | "FULFILLED"
  | "CANCELLED"
  | "REFUNDED";

export type PaymentMethod = "PAYPAL" | "BANK_TRANSFER";

export type PaymentStatus = "CREATED" | "CAPTURED" | "FAILED" | "CANCELLED";

export interface ProductAsset {
  id: string;
  filename: string;
  contentType: string | null;
  sizeBytes: number | null;
  uploadedAt: string;
  previewUrl?: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  currency: string;
  status: ProductStatus;
  assets: ProductAsset[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  username: string | null;
  name: string;
  role: "ADMIN" | "CUSTOMER";
  createdAt: string;
}

export interface OrderLine {
  id: string;
  productId: string;
  productTitle: string;
  unitPrice: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string | null;
  customerEmail: string;
  customerName: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentReference: string | null;
  totalAmount: number;
  currency: string;
  internalNotes: string | null;
  confirmationToken: string | null;
  lines: OrderLine[];
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  orderId: string;
  provider: string;
  providerIntentId: string | null;
  providerCaptureId: string | null;
  status: PaymentStatus;
  amount: number | null;
  currency: string | null;
  createdAt: string;
}

export interface StoreSetting {
  key: string;
  value: string | null;
  description: string | null;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface DownloadEvent {
  id: string;
  orderId: string;
  assetId: string;
  customerEmail: string;
  ipAddress: string | null;
  downloadedAt: string;
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export interface SalesDataPoint {
  month: string;
  revenue: number;
  orders: number;
}

export interface TopProduct {
  productId: string;
  title: string;
  revenue: number;
  salesCount: number;
}

export interface DashboardStats {
  totalRevenue: number;
  revenueGrowthPercent: number;
  totalOrders: number;
  ordersGrowthPercent: number;
  totalCustomers: number;
  customersGrowthPercent: number;
  totalProducts: number;
  salesChart: SalesDataPoint[];
  topProducts: TopProduct[];
  recentOrders: Order[];
}

// ─── Legacy types kept for mock-only UI sections ──────────────────────────────

export type LicenseType = "regular" | "extended" | "exclusive";

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sortOrder: number;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  action: string;
  actor: string;
  target: string;
  resource?: string;
  resourceId?: string;
  userId?: string;
  details: string;
  ip: string;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  discountPercent: number;
  maxUses: number;
  currentUses: number;
  usageCount: number;
  usageLimit: number | null;
  minOrderAmount: number | null;
  maxDiscountAmount: number | null;
  expiresAt: string;
  isActive: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  title: string;
  body: string;
  status: "approved" | "pending" | "rejected";
  helpfulCount: number;
  createdAt: string;
}

/** Used only for mock sections — real settings use StoreSetting */
export interface Settings {
  id: string;
  key: string;
  value: string;
  group: string;
  label: string;
  description: string;
  isPublic: boolean;
  updatedAt: string;
}

export interface StaticPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaTitle?: string;
  published: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  message: string;
  status: "open" | "closed" | "pending";
  priority: "low" | "medium" | "high" | "urgent";
  customerName: string;
  user?: { displayName: string };
  userId?: string;
  createdAt: string;
  updatedAt: string;
}
