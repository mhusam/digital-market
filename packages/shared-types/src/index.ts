// ─── Backend-aligned types (match Spring Boot DTOs exactly) ──────────────────

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T | null;
  meta?: PaginationMeta;
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  sortBy?: "newest" | "popular" | "price_asc" | "price_desc" | "rating";
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  licenseType?: string;
  status?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  sortOrder?: number;
  isPublished?: boolean;
}
export type ProductStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED" | "draft" | "published" | "archived";
export type OfferingType = "PRODUCT" | "PROJECT" | "SOLUTION";

export type OrderStatus =
  | "PENDING_PAYMENT"
  | "PAID"
  | "FULFILLED"
  | "CANCELLED"
  | "REFUNDED";

export type PaymentMethod = "PAYPAL" | "BANK_TRANSFER" | string;

export type PaymentStatus = "CREATED" | "CAPTURED" | "FAILED" | "CANCELLED";

export interface ProductAsset {
  id: string;
  filename: string;
  contentType: string | null;
  sizeBytes: number | null;
  uploadedAt: string;
  previewUrl?: string;
}

export type OfferingType = "PRODUCT" | "PROJECT" | "SOLUTION";

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  currency: string;
  status: ProductStatus;
  offeringType?: OfferingType;
  techTags?: string[];
<<<<<<< Updated upstream
  assets: ProductAsset[];
=======
  assets?: ProductAsset[];
>>>>>>> Stashed changes
  createdAt: string;
  updatedAt: string;
  // UI fields that the mock data relies on
  categoryId?: string;
  category?: Category;
  salePrice?: number | null;
  licenseType?: string;
  tags?: any[];
  salesCount?: number;
  rating?: number;
  shortDescription?: string;
  previewImages?: any[];
  technologies?: string[];
  version?: string;
  reviewCount?: number;
  features?: any[];
  authorId?: string;
  author?: any;
  demoUrl?: string;
  downloadLimit?: number;
  requirements?: string[];
  featured?: boolean;
}

export interface User {
  id: string;
  email: string;
  username?: string | null;
  name?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  phoneNumber?: string;
  billingAddress?: any;
  status?: string;
  emailVerified?: boolean;
  role: string;
  createdAt: string;
  updatedAt?: string;
  lastLoginAt?: string;
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
  customerId?: string | null;
  customerEmail?: string;
  customerName?: string;
  status?: OrderStatus;
  paymentMethod?: PaymentMethod;
  paymentReference?: string | null;
  totalAmount?: number;
  currency?: string;
  internalNotes?: string | null;
  confirmationToken?: string | null;
  lines?: OrderLine[];
  createdAt: string;
  updatedAt: string;
  // Legacy UI fields
  userId?: string;
  user?: User;
  items?: any;
  subtotal?: any;
  discountAmount?: number;
  total?: number;
  couponCode?: any;
  orderStatus?: string;
  paymentStatus?: string;
  paymentIntentId?: string;
  invoiceId?: string;
  notes?: string;
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
  slug?: string;
  thumbnailUrl?: string;
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

export type LicenseType =
  | "personal"
  | "commercial"
  | "extended"
  | "developer"
  | "regular"
  | "exclusive";

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
  type?: "percentage" | "fixed" | string;
  value?: number;
  discountPercent?: number;
  maxUses?: number;
  currentUses?: number;
  usageCount?: number;
  usageLimit?: number | null;
  minOrderAmount?: number | null;
  maxDiscountAmount?: number | null;
  expiresAt?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
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
  orderId?: string;
  verifiedPurchase?: boolean;
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
  metaDescription?: string;
  published?: boolean;
  isPublished?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  message: string;
  status: "open" | "closed" | "pending" | "resolved" | "in_progress" | string;
  priority: "low" | "medium" | "high" | "urgent";
  customerName?: string;
  user?: any;
  userId?: string;
  createdAt: string;
  updatedAt: string;
  productId?: string;
  orderId?: string;
  replies?: any[];
  assignedToId?: string;
  resolvedAt?: string;
}

export interface CartItem {
  id: string;
  cartId?: string;
  productId: string;
  product?: Product;
  quantity?: number;
  licenseType?: string;
  subtotal?: number;
  price?: number;
  addedAt?: string;
}

export interface Cart {
  id?: string;
  items: CartItem[];
  total?: number;
  subtotal?: number;
  userId?: string;
  sessionId?: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface Download {
  id: string;
  userId?: string;
  orderId: string;
  productId: string;
  fileId?: string;
  downloadCount?: number;
  downloadLimit?: number;
  createdAt?: string;
  url?: string;
  expiresAt?: string;
}

export interface CouponValidationResult {
  valid: boolean;
  coupon?: any;
  discountAmount?: number;
  message?: string;
}

export interface AuthResult {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  user: User;
}

export interface RegisterPayload {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  displayName?: string;
}

export interface LoginPayload {
  email: string;
  password?: string;
}

export interface CheckoutPayload {
  cart: Cart;
  paymentMethod: string;
  couponCode?: string;
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface CreateTicketPayload {
  subject: string;
  message: string;
  priority: "low" | "medium" | "high" | "urgent";
  productId?: string;
  orderId?: string;
}

export interface OrderItem { [key: string]: any }
export interface Coupon { [key: string]: any }
export interface SupportReply { [key: string]: any }
export interface Review { [key: string]: any }
export interface DashboardStats { [key: string]: any }
export interface BlogPost { [key: string]: any }
export interface StaticPage { [key: string]: any }
export interface FAQ { [key: string]: any }
