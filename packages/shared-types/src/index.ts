// ─────────────────────────────────────────────
// Enums & Literal Types
// ─────────────────────────────────────────────

export type LicenseType = 'personal' | 'commercial' | 'extended' | 'developer';

export type ProductStatus = 'draft' | 'published' | 'archived';

export type OrderStatus = 'pending' | 'processing' | 'paid' | 'cancelled' | 'refunded';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export type TicketStatus = 'open' | 'in_progress' | 'waiting_on_customer' | 'resolved' | 'closed';

export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export type UserRole = 'customer' | 'admin' | 'super_admin' | 'support';

export type UserStatus = 'active' | 'suspended' | 'banned' | 'unverified';

export type CouponType = 'percentage' | 'fixed';

export type BlogPostStatus = 'draft' | 'published' | 'archived';

export type AuditAction =
  | 'create'
  | 'update'
  | 'delete'
  | 'login'
  | 'logout'
  | 'publish'
  | 'archive'
  | 'refund'
  | 'download';

// ─────────────────────────────────────────────
// Generic API Response Wrapper
// ─────────────────────────────────────────────

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message?: string;
  meta?: PaginationMeta;
}

// ─────────────────────────────────────────────
// User
// ─────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  avatarUrl?: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  phoneNumber?: string;
  billingAddress?: Address;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}

// ─────────────────────────────────────────────
// Category & Tag
// ─────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  iconUrl?: string;
  parentId?: string;
  sortOrder: number;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

// ─────────────────────────────────────────────
// Product
// ─────────────────────────────────────────────

export interface ProductFile {
  id: string;
  productId: string;
  versionId: string;
  fileName: string;
  fileSize: number; // bytes
  mimeType: string;
  storageKey: string;
  createdAt: string;
}

export interface ProductVersion {
  id: string;
  productId: string;
  version: string;
  changelog: string;
  files: ProductFile[];
  createdAt: string;
}

export interface ProductPreview {
  id: string;
  productId: string;
  url: string;
  altText: string;
  sortOrder: number;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  category?: Category;
  shortDescription: string;
  description: string;
  price: number;
  salePrice?: number;
  currency: 'USD';
  previewImages: ProductPreview[];
  demoUrl?: string;
  tags: Tag[];
  technologies: string[];
  version: string;
  versions?: ProductVersion[];
  status: ProductStatus;
  licenseType: LicenseType;
  rating: number;
  reviewCount: number;
  salesCount: number;
  downloadLimit: number; // max downloads per purchase
  requirements: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────
// Order & Cart
// ─────────────────────────────────────────────

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product?: Product;
  quantity: number;
  unitPrice: number;
  licenseType: LicenseType;
}

export interface Order {
  id: string;
  userId: string;
  user?: User;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  total: number;
  currency: 'USD';
  couponCode?: string;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  paymentIntentId?: string;
  invoiceId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  product?: Product;
  licenseType: LicenseType;
  price: number;
  addedAt: string;
}

export interface Cart {
  id: string;
  userId?: string;
  sessionId?: string;
  items: CartItem[];
  subtotal: number;
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────
// Downloads
// ─────────────────────────────────────────────

export interface Download {
  id: string;
  userId: string;
  orderId: string;
  productId: string;
  product?: Product;
  fileId: string;
  file?: ProductFile;
  downloadCount: number;
  downloadLimit: number;
  expiresAt?: string;
  createdAt: string;
}

export interface DownloadLog {
  id: string;
  downloadId: string;
  userId: string;
  fileId: string;
  ipAddress: string;
  userAgent: string;
  downloadedAt: string;
}

// ─────────────────────────────────────────────
// Coupon
// ─────────────────────────────────────────────

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number; // percentage (0-100) or fixed USD amount
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  usageCount: number;
  perUserLimit?: number;
  productIds?: string[]; // empty = applies to all
  categoryIds?: string[];
  startsAt?: string;
  expiresAt?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CouponValidationResult {
  valid: boolean;
  coupon?: Coupon;
  discountAmount: number;
  message: string;
}

// ─────────────────────────────────────────────
// Support
// ─────────────────────────────────────────────

export interface SupportReply {
  id: string;
  ticketId: string;
  authorId: string;
  author?: User;
  message: string;
  isStaff: boolean;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  user?: User;
  subject: string;
  message: string;
  status: TicketStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  productId?: string;
  product?: Product;
  orderId?: string;
  replies: SupportReply[];
  assignedToId?: string;
  assignedTo?: User;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────
// Review
// ─────────────────────────────────────────────

export interface Review {
  id: string;
  productId: string;
  product?: Product;
  userId: string;
  user?: User;
  orderId: string;
  rating: number; // 1-5
  title: string;
  body: string;
  status: ReviewStatus;
  helpfulCount: number;
  verifiedPurchase: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────
// Invoice
// ─────────────────────────────────────────────

export interface Invoice {
  id: string;
  orderId: string;
  order?: Order;
  userId: string;
  invoiceNumber: string;
  issuedAt: string;
  dueAt?: string;
  paidAt?: string;
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  total: number;
  currency: 'USD';
  billingAddress?: Address;
  notes?: string;
  pdfUrl?: string;
}

// ─────────────────────────────────────────────
// Audit Log
// ─────────────────────────────────────────────

export interface AuditLog {
  id: string;
  userId?: string;
  user?: User;
  action: AuditAction;
  resource: string; // e.g. 'product', 'order', 'user'
  resourceId: string;
  previousValue?: Record<string, unknown>;
  newValue?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

// ─────────────────────────────────────────────
// Settings
// ─────────────────────────────────────────────

export interface Settings {
  id: string;
  key: string;
  value: string;
  group: string;
  label: string;
  description?: string;
  isPublic: boolean;
  updatedAt: string;
}

// ─────────────────────────────────────────────
// Blog & Static Pages
// ─────────────────────────────────────────────

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl?: string;
  authorId: string;
  author?: User;
  tags: Tag[];
  status: BlogPostStatus;
  publishedAt?: string;
  readingTimeMinutes: number;
  createdAt: string;
  updatedAt: string;
}

export interface StaticPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  categoryId?: string;
  sortOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────
// Dashboard
// ─────────────────────────────────────────────

export interface SalesChartPoint {
  month: string; // e.g. 'Jan 2025'
  revenue: number;
  orders: number;
}

export interface TopProduct {
  productId: string;
  title: string;
  slug: string;
  salesCount: number;
  revenue: number;
  thumbnailUrl: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  revenueGrowthPercent: number;
  ordersGrowthPercent: number;
  customersGrowthPercent: number;
  recentOrders: Order[];
  topProducts: TopProduct[];
  salesChart: SalesChartPoint[];
}

// ─────────────────────────────────────────────
// Filters & Search
// ─────────────────────────────────────────────

export interface ProductFilters {
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  licenseType?: LicenseType;
  status?: ProductStatus;
  tags?: string[];
  sortBy?: 'newest' | 'popular' | 'price_asc' | 'price_desc' | 'rating';
  page?: number;
  limit?: number;
}

export interface SearchFilters extends ProductFilters {
  query: string;
}

// ─────────────────────────────────────────────
// Auth Payloads
// ─────────────────────────────────────────────

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResult {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface CheckoutPayload {
  couponCode?: string;
  paymentMethod: string;
  billingAddress: Address;
}

export interface CreateTicketPayload {
  subject: string;
  message: string;
  priority: SupportTicket['priority'];
  productId?: string;
  orderId?: string;
}
