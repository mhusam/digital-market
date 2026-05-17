import type {
  ApiResponse,
  User,
  Product,
  Category,
  Order,
  Coupon,
  SupportTicket,
  SupportReply,
  Review,
  StaticPage,
  DashboardStats,
  AuditLog,
  Settings,
  AuthResult,
  LoginPayload,
  PaginationMeta,
} from '../../shared-types/src/index';
import {
  mockAdminUsers,
  mockProducts,
  mockCategories,
  mockOrders,
  mockCustomers,
  mockCoupons,
  mockTickets,
  mockReviews,
  mockStaticPages,
  mockDashboardStats,
} from './mock-data';

// ─────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const randomDelay = (): Promise<void> =>
  delay(60 + Math.floor(Math.random() * 90));

let adminSession: User | null = null;

const ADMIN_SESSION_STORAGE_KEY = 'forge-admin-api-session';
const ADMIN_SESSION_GLOBAL_KEY = '__forge_admin_session__';

const canUseStorage = (): boolean =>
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const readGlobalAdminSession = (): User | null => {
  const maybe = (globalThis as Record<string, unknown>)[ADMIN_SESSION_GLOBAL_KEY];
  if (!maybe || typeof maybe !== 'object') return null;
  return maybe as User;
};

const writeGlobalAdminSession = (user: User | null): void => {
  (globalThis as Record<string, unknown>)[ADMIN_SESSION_GLOBAL_KEY] = user;
};

const readPersistedAdminSession = (): User | null => {
  if (!canUseStorage()) return null;
  try {
    const raw = window.localStorage.getItem(ADMIN_SESSION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
};

const persistAdminSession = (user: User | null): void => {
  writeGlobalAdminSession(user);
  if (!canUseStorage()) return;
  try {
    if (user) {
      window.localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(user));
      return;
    }
    window.localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
  } catch {
    // noop: storage failures should not crash API mocks
  }
};

const ensureAdminSession = (): User | null => {
  if (adminSession) return adminSession;
  const globalSession = readGlobalAdminSession();
  if (globalSession) {
    adminSession = globalSession;
    return adminSession;
  }
  const persisted = readPersistedAdminSession();
  if (persisted) adminSession = persisted;
  return adminSession;
};

const requireAdmin = (): User => {
  const session = ensureAdminSession();
  if (!session) throw new Error('Admin authentication required.');
  return session;
};

const generateId = (prefix: string): string =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const paginate = <T>(
  items: T[],
  page = 1,
  limit = 20,
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

// In-memory audit log store
const auditLogs: AuditLog[] = [];

const logAudit = (
  userId: string,
  action: AuditLog['action'],
  resource: string,
  resourceId: string,
  previousValue?: Record<string, unknown>,
  newValue?: Record<string, unknown>,
): void => {
  auditLogs.unshift({
    id: generateId('audit'),
    userId,
    action,
    resource,
    resourceId,
    previousValue,
    newValue,
    createdAt: new Date().toISOString(),
  });
};

// In-memory settings store
const settingsStore: Settings[] = [
  { id: 'setting-01', key: 'site_name', value: 'Digital Market', group: 'general', label: 'Site Name', isPublic: true, updatedAt: '2024-01-01T00:00:00.000Z' },
  { id: 'setting-02', key: 'site_email', value: 'hello@digital-market.dev', group: 'general', label: 'Contact Email', isPublic: true, updatedAt: '2024-01-01T00:00:00.000Z' },
  { id: 'setting-03', key: 'currency', value: 'USD', group: 'payments', label: 'Default Currency', isPublic: true, updatedAt: '2024-01-01T00:00:00.000Z' },
  { id: 'setting-04', key: 'tax_rate', value: '0', group: 'payments', label: 'Tax Rate (%)', isPublic: false, updatedAt: '2024-01-01T00:00:00.000Z' },
  { id: 'setting-05', key: 'support_email', value: 'support@digital-market.dev', group: 'general', label: 'Support Email', isPublic: true, updatedAt: '2024-01-01T00:00:00.000Z' },
  { id: 'setting-06', key: 'maintenance_mode', value: 'false', group: 'general', label: 'Maintenance Mode', isPublic: false, updatedAt: '2024-01-01T00:00:00.000Z' },
];

// ─────────────────────────────────────────────
// Auth
// ─────────────────────────────────────────────

/**
 * Log in as an admin user.
 */
export const adminLogin = async (
  data: LoginPayload,
): Promise<ApiResponse<AuthResult>> => {
  await randomDelay();

  // Mock: accept any of the seeded admin emails with any password
  const admin = mockAdminUsers.find((u) => u.email === data.email) ?? mockAdminUsers[0];

  if (!admin) {
    return { success: false, data: null, message: 'Invalid credentials or insufficient permissions.' };
  }

  adminSession = admin;
  persistAdminSession(admin);
  logAudit(admin.id, 'login', 'user', admin.id);

  return {
    success: true,
    data: {
      user: admin,
      accessToken: `mock_admin_access_${generateId('tok')}`,
      refreshToken: `mock_admin_refresh_${generateId('tok')}`,
    },
  };
};

/**
 * Log out the current admin session.
 */
export const adminLogout = async (): Promise<ApiResponse<null>> => {
  await randomDelay();
  if (adminSession) {
    logAudit(adminSession.id, 'logout', 'user', adminSession.id);
    adminSession = null;
  }
  persistAdminSession(null);
  return { success: true, data: null, message: 'Admin logged out.' };
};

// ─────────────────────────────────────────────
// Dashboard
// ─────────────────────────────────────────────

/**
 * Get aggregated dashboard statistics.
 */
export const getDashboard = async (): Promise<ApiResponse<DashboardStats>> => {
  await randomDelay();
  requireAdmin();
  return { success: true, data: mockDashboardStats };
};

// ─────────────────────────────────────────────
// Products
// ─────────────────────────────────────────────

/**
 * List all products with pagination.
 */
export const adminGetProducts = async (
  page = 1,
  limit = 20,
): Promise<ApiResponse<Product[]>> => {
  await randomDelay();
  requireAdmin();

  const sorted = [...mockProducts].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
  const { items, meta } = paginate(sorted, page, limit);
  return { success: true, data: items, meta };
};

/**
 * Get a single product by ID.
 */
export const adminGetProduct = async (
  id: string,
): Promise<ApiResponse<Product | null>> => {
  await randomDelay();
  requireAdmin();

  const product = mockProducts.find((p) => p.id === id);
  if (!product) return { success: false, data: null, message: 'Product not found.' };
  return { success: true, data: product };
};

/**
 * Create a new product.
 */
export const adminCreateProduct = async (
  data: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'reviewCount' | 'salesCount'>,
): Promise<ApiResponse<Product>> => {
  await randomDelay();
  const admin = requireAdmin();

  const newProduct: Product = {
    ...data,
    id: generateId('prod'),
    rating: 0,
    reviewCount: 0,
    salesCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockProducts.push(newProduct);
  logAudit(admin.id, 'create', 'product', newProduct.id, undefined, newProduct as unknown as Record<string, unknown>);

  return { success: true, data: newProduct };
};

/**
 * Update an existing product.
 */
export const adminUpdateProduct = async (
  id: string,
  data: Partial<Product>,
): Promise<ApiResponse<Product | null>> => {
  await randomDelay();
  const admin = requireAdmin();

  const idx = mockProducts.findIndex((p) => p.id === id);
  if (idx === -1) return { success: false, data: null, message: 'Product not found.' };

  const previous = { ...mockProducts[idx] };
  const updated: Product = {
    ...mockProducts[idx],
    ...data,
    id,
    updatedAt: new Date().toISOString(),
  };

  mockProducts[idx] = updated;
  logAudit(admin.id, 'update', 'product', id, previous as unknown as Record<string, unknown>, updated as unknown as Record<string, unknown>);

  return { success: true, data: updated };
};

/**
 * Delete a product by ID.
 */
export const adminDeleteProduct = async (
  id: string,
): Promise<ApiResponse<null>> => {
  await randomDelay();
  const admin = requireAdmin();

  const idx = mockProducts.findIndex((p) => p.id === id);
  if (idx === -1) return { success: false, data: null, message: 'Product not found.' };

  const removed = mockProducts.splice(idx, 1)[0];
  logAudit(admin.id, 'delete', 'product', id, removed as unknown as Record<string, unknown>);

  return { success: true, data: null, message: 'Product deleted.' };
};

/**
 * Publish a draft or archived product.
 */
export const adminPublishProduct = async (
  id: string,
): Promise<ApiResponse<Product | null>> => {
  return adminUpdateProduct(id, { status: 'published' });
};

/**
 * Unpublish (set to draft) a product.
 */
export const adminUnpublishProduct = async (
  id: string,
): Promise<ApiResponse<Product | null>> => {
  return adminUpdateProduct(id, { status: 'draft' });
};

/**
 * Archive a product.
 */
export const adminArchiveProduct = async (
  id: string,
): Promise<ApiResponse<Product | null>> => {
  return adminUpdateProduct(id, { status: 'archived' });
};

// ─────────────────────────────────────────────
// Categories
// ─────────────────────────────────────────────

/**
 * Get all categories (admin view).
 */
export const adminGetCategories = async (): Promise<ApiResponse<Category[]>> => {
  await randomDelay();
  requireAdmin();
  return { success: true, data: [...mockCategories] };
};

/**
 * Create a new category.
 */
export const adminCreateCategory = async (
  data: Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'productCount'>,
): Promise<ApiResponse<Category>> => {
  await randomDelay();
  const admin = requireAdmin();

  const newCat: Category = {
    ...data,
    id: generateId('cat'),
    productCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockCategories.push(newCat);
  logAudit(admin.id, 'create', 'category', newCat.id);

  return { success: true, data: newCat };
};

/**
 * Update a category.
 */
export const adminUpdateCategory = async (
  id: string,
  data: Partial<Category>,
): Promise<ApiResponse<Category | null>> => {
  await randomDelay();
  const admin = requireAdmin();

  const idx = mockCategories.findIndex((c) => c.id === id);
  if (idx === -1) return { success: false, data: null, message: 'Category not found.' };

  const updated: Category = {
    ...mockCategories[idx],
    ...data,
    id,
    updatedAt: new Date().toISOString(),
  };

  mockCategories[idx] = updated;
  logAudit(admin.id, 'update', 'category', id);

  return { success: true, data: updated };
};

/**
 * Delete a category.
 */
export const adminDeleteCategory = async (
  id: string,
): Promise<ApiResponse<null>> => {
  await randomDelay();
  const admin = requireAdmin();

  const hasProducts = mockProducts.some((p) => p.categoryId === id);
  if (hasProducts) {
    return {
      success: false,
      data: null,
      message: 'Cannot delete a category that has products. Move or delete the products first.',
    };
  }

  const idx = mockCategories.findIndex((c) => c.id === id);
  if (idx === -1) return { success: false, data: null, message: 'Category not found.' };

  mockCategories.splice(idx, 1);
  logAudit(admin.id, 'delete', 'category', id);

  return { success: true, data: null, message: 'Category deleted.' };
};

// ─────────────────────────────────────────────
// Orders
// ─────────────────────────────────────────────

/**
 * List all orders with pagination.
 */
export const adminGetOrders = async (
  page = 1,
  limit = 20,
): Promise<ApiResponse<Order[]>> => {
  await randomDelay();
  requireAdmin();

  const sorted = [...mockOrders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  const { items, meta } = paginate(sorted, page, limit);
  return { success: true, data: items, meta };
};

/**
 * Get a single order by ID.
 */
export const adminGetOrder = async (
  id: string,
): Promise<ApiResponse<Order | null>> => {
  await randomDelay();
  requireAdmin();

  const order = mockOrders.find((o) => o.id === id);
  if (!order) return { success: false, data: null, message: 'Order not found.' };
  return { success: true, data: order };
};

/**
 * Update an order's status.
 */
export const adminUpdateOrderStatus = async (
  id: string,
  orderStatus: Order['orderStatus'],
  paymentStatus?: Order['paymentStatus'],
): Promise<ApiResponse<Order | null>> => {
  await randomDelay();
  const admin = requireAdmin();

  const idx = mockOrders.findIndex((o) => o.id === id);
  if (idx === -1) return { success: false, data: null, message: 'Order not found.' };

  const previous = { ...mockOrders[idx] };
  const updated: Order = {
    ...mockOrders[idx],
    orderStatus,
    paymentStatus: paymentStatus ?? mockOrders[idx].paymentStatus,
    updatedAt: new Date().toISOString(),
  };

  mockOrders[idx] = updated;
  logAudit(admin.id, 'update', 'order', id, previous as unknown as Record<string, unknown>, updated as unknown as Record<string, unknown>);

  return { success: true, data: updated };
};

/**
 * Refund an order.
 */
export const adminRefundOrder = async (
  id: string,
  reason?: string,
): Promise<ApiResponse<Order | null>> => {
  await randomDelay();

  return adminUpdateOrderStatus(id, 'refunded', 'refunded');
};

// ─────────────────────────────────────────────
// Customers
// ─────────────────────────────────────────────

/**
 * List all customers with pagination.
 */
export const adminGetCustomers = async (
  page = 1,
  limit = 20,
): Promise<ApiResponse<User[]>> => {
  await randomDelay();
  requireAdmin();

  const sorted = [...mockCustomers].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  const { items, meta } = paginate(sorted, page, limit);
  return { success: true, data: items, meta };
};

/**
 * Get a single customer by ID.
 */
export const adminGetCustomer = async (
  id: string,
): Promise<ApiResponse<User | null>> => {
  await randomDelay();
  requireAdmin();

  const user = mockCustomers.find((u) => u.id === id);
  if (!user) return { success: false, data: null, message: 'Customer not found.' };
  return { success: true, data: user };
};

/**
 * Update a customer's status (active / suspended / banned).
 */
export const adminUpdateCustomerStatus = async (
  id: string,
  status: User['status'],
): Promise<ApiResponse<User | null>> => {
  await randomDelay();
  const admin = requireAdmin();

  const idx = mockCustomers.findIndex((u) => u.id === id);
  if (idx === -1) return { success: false, data: null, message: 'Customer not found.' };

  const updated: User = {
    ...mockCustomers[idx],
    status,
    updatedAt: new Date().toISOString(),
  };

  mockCustomers[idx] = updated;
  logAudit(admin.id, 'update', 'user', id);

  return { success: true, data: updated };
};

/**
 * Get all orders for a specific customer.
 */
export const adminGetCustomerOrders = async (
  customerId: string,
): Promise<ApiResponse<Order[]>> => {
  await randomDelay();
  requireAdmin();

  const orders = mockOrders.filter((o) => o.userId === customerId);
  return { success: true, data: orders };
};

// ─────────────────────────────────────────────
// Coupons
// ─────────────────────────────────────────────

/**
 * List all coupons.
 */
export const adminGetCoupons = async (): Promise<ApiResponse<Coupon[]>> => {
  await randomDelay();
  requireAdmin();
  return { success: true, data: [...mockCoupons] };
};

/**
 * Create a new coupon.
 */
export const adminCreateCoupon = async (
  data: Omit<Coupon, 'id' | 'usageCount' | 'createdAt' | 'updatedAt'>,
): Promise<ApiResponse<Coupon>> => {
  await randomDelay();
  const admin = requireAdmin();

  const existing = mockCoupons.find(
    (c) => c.code.toUpperCase() === data.code.toUpperCase(),
  );
  if (existing) {
    return { success: false, data: null, message: 'Coupon code already exists.' };
  }

  const newCoupon: Coupon = {
    ...data,
    id: generateId('coupon'),
    usageCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockCoupons.push(newCoupon);
  logAudit(admin.id, 'create', 'coupon', newCoupon.id);

  return { success: true, data: newCoupon };
};

/**
 * Update a coupon.
 */
export const adminUpdateCoupon = async (
  id: string,
  data: Partial<Coupon>,
): Promise<ApiResponse<Coupon | null>> => {
  await randomDelay();
  const admin = requireAdmin();

  const idx = mockCoupons.findIndex((c) => c.id === id);
  if (idx === -1) return { success: false, data: null, message: 'Coupon not found.' };

  const updated: Coupon = {
    ...mockCoupons[idx],
    ...data,
    id,
    updatedAt: new Date().toISOString(),
  };

  mockCoupons[idx] = updated;
  logAudit(admin.id, 'update', 'coupon', id);

  return { success: true, data: updated };
};

/**
 * Disable a coupon without deleting it.
 */
export const adminDisableCoupon = async (
  id: string,
): Promise<ApiResponse<Coupon | null>> => {
  return adminUpdateCoupon(id, { isActive: false });
};

/**
 * Delete a coupon.
 */
export const adminDeleteCoupon = async (
  id: string,
): Promise<ApiResponse<null>> => {
  await randomDelay();
  const admin = requireAdmin();

  const idx = mockCoupons.findIndex((c) => c.id === id);
  if (idx === -1) return { success: false, data: null, message: 'Coupon not found.' };

  mockCoupons.splice(idx, 1);
  logAudit(admin.id, 'delete', 'coupon', id);

  return { success: true, data: null, message: 'Coupon deleted.' };
};

// ─────────────────────────────────────────────
// Reviews
// ─────────────────────────────────────────────

/**
 * List all reviews with pagination.
 */
export const adminGetReviews = async (
  page = 1,
  limit = 20,
): Promise<ApiResponse<Review[]>> => {
  await randomDelay();
  requireAdmin();

  const sorted = [...mockReviews].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  const { items, meta } = paginate(sorted, page, limit);
  return { success: true, data: items, meta };
};

/**
 * Update a review's moderation status.
 */
export const adminUpdateReviewStatus = async (
  id: string,
  status: Review['status'],
): Promise<ApiResponse<Review | null>> => {
  await randomDelay();
  const admin = requireAdmin();

  const idx = mockReviews.findIndex((r) => r.id === id);
  if (idx === -1) return { success: false, data: null, message: 'Review not found.' };

  const updated: Review = {
    ...mockReviews[idx],
    status,
    updatedAt: new Date().toISOString(),
  };

  mockReviews[idx] = updated;
  logAudit(admin.id, 'update', 'review', id);

  return { success: true, data: updated };
};

/**
 * Delete a review.
 */
export const adminDeleteReview = async (
  id: string,
): Promise<ApiResponse<null>> => {
  await randomDelay();
  const admin = requireAdmin();

  const idx = mockReviews.findIndex((r) => r.id === id);
  if (idx === -1) return { success: false, data: null, message: 'Review not found.' };

  mockReviews.splice(idx, 1);
  logAudit(admin.id, 'delete', 'review', id);

  return { success: true, data: null, message: 'Review deleted.' };
};

// ─────────────────────────────────────────────
// Support Tickets
// ─────────────────────────────────────────────

/**
 * List all support tickets with pagination.
 */
export const adminGetTickets = async (
  page = 1,
  limit = 20,
): Promise<ApiResponse<SupportTicket[]>> => {
  await randomDelay();
  requireAdmin();

  const sorted = [...mockTickets].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
  const { items, meta } = paginate(sorted, page, limit);
  return { success: true, data: items, meta };
};

/**
 * Get a single support ticket by ID (admin view).
 */
export const adminGetTicket = async (
  id: string,
): Promise<ApiResponse<SupportTicket | null>> => {
  await randomDelay();
  requireAdmin();

  const ticket = mockTickets.find((t) => t.id === id);
  if (!ticket) return { success: false, data: null, message: 'Ticket not found.' };
  return { success: true, data: ticket };
};

/**
 * Update a ticket's status.
 */
export const adminUpdateTicketStatus = async (
  id: string,
  status: SupportTicket['status'],
): Promise<ApiResponse<SupportTicket | null>> => {
  await randomDelay();
  const admin = requireAdmin();

  const idx = mockTickets.findIndex((t) => t.id === id);
  if (idx === -1) return { success: false, data: null, message: 'Ticket not found.' };

  const updated: SupportTicket = {
    ...mockTickets[idx],
    status,
    resolvedAt:
      status === 'resolved' || status === 'closed'
        ? new Date().toISOString()
        : mockTickets[idx].resolvedAt,
    updatedAt: new Date().toISOString(),
  };

  mockTickets[idx] = updated;
  logAudit(admin.id, 'update', 'support_ticket', id);

  return { success: true, data: updated };
};

/**
 * Assign a ticket to an admin/support user.
 */
export const adminAssignTicket = async (
  id: string,
  assignedToId: string,
): Promise<ApiResponse<SupportTicket | null>> => {
  await randomDelay();
  const admin = requireAdmin();

  const idx = mockTickets.findIndex((t) => t.id === id);
  if (idx === -1) return { success: false, data: null, message: 'Ticket not found.' };

  const assignee = mockAdminUsers.find((u) => u.id === assignedToId);

  const updated: SupportTicket = {
    ...mockTickets[idx],
    assignedToId,
    assignedTo: assignee,
    status: 'in_progress',
    updatedAt: new Date().toISOString(),
  };

  mockTickets[idx] = updated;
  logAudit(admin.id, 'update', 'support_ticket', id);

  return { success: true, data: updated };
};

/**
 * Reply to a ticket as a staff member.
 */
export const adminReplyToTicket = async (
  id: string,
  message: string,
): Promise<ApiResponse<SupportTicket | null>> => {
  await randomDelay();
  const admin = requireAdmin();

  const idx = mockTickets.findIndex((t) => t.id === id);
  if (idx === -1) return { success: false, data: null, message: 'Ticket not found.' };

  const now = new Date().toISOString();
  const reply: SupportReply = {
    id: generateId('reply'),
    ticketId: id,
    authorId: admin.id,
    author: admin,
    message,
    isStaff: true,
    createdAt: now,
    updatedAt: now,
  };

  const updated: SupportTicket = {
    ...mockTickets[idx],
    replies: [...mockTickets[idx].replies, reply],
    status: 'waiting_on_customer',
    updatedAt: now,
  };

  mockTickets[idx] = updated;
  logAudit(admin.id, 'update', 'support_ticket', id);

  return { success: true, data: updated };
};

// ─────────────────────────────────────────────
// Pages
// ─────────────────────────────────────────────

/**
 * List all static pages.
 */
export const adminGetPages = async (): Promise<ApiResponse<StaticPage[]>> => {
  await randomDelay();
  requireAdmin();
  return { success: true, data: [...mockStaticPages] };
};

/**
 * Get a single page by ID.
 */
export const adminGetPage = async (
  id: string,
): Promise<ApiResponse<StaticPage | null>> => {
  await randomDelay();
  requireAdmin();

  const page = mockStaticPages.find((p) => p.id === id);
  if (!page) return { success: false, data: null, message: 'Page not found.' };
  return { success: true, data: page };
};

/**
 * Update a static page.
 */
export const adminUpdatePage = async (
  id: string,
  data: Partial<StaticPage>,
): Promise<ApiResponse<StaticPage | null>> => {
  await randomDelay();
  const admin = requireAdmin();

  const idx = mockStaticPages.findIndex((p) => p.id === id);
  if (idx === -1) return { success: false, data: null, message: 'Page not found.' };

  const updated: StaticPage = {
    ...mockStaticPages[idx],
    ...data,
    id,
    updatedAt: new Date().toISOString(),
  };

  mockStaticPages[idx] = updated;
  logAudit(admin.id, 'update', 'page', id);

  return { success: true, data: updated };
};

/**
 * Create a new static page.
 */
export const adminCreatePage = async (
  data: Omit<StaticPage, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<ApiResponse<StaticPage>> => {
  await randomDelay();
  const admin = requireAdmin();

  const newPage: StaticPage = {
    ...data,
    id: generateId('page'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockStaticPages.push(newPage);
  logAudit(admin.id, 'create', 'page', newPage.id);

  return { success: true, data: newPage };
};

/**
 * Delete a static page.
 */
export const adminDeletePage = async (
  id: string,
): Promise<ApiResponse<null>> => {
  await randomDelay();
  const admin = requireAdmin();

  const idx = mockStaticPages.findIndex((p) => p.id === id);
  if (idx === -1) return { success: false, data: null, message: 'Page not found.' };

  mockStaticPages.splice(idx, 1);
  logAudit(admin.id, 'delete', 'page', id);

  return { success: true, data: null, message: 'Page deleted.' };
};

// ─────────────────────────────────────────────
// Reports
// ─────────────────────────────────────────────

/**
 * Get a sales report grouped by month.
 */
export const adminSalesReport = async (
  fromDate?: string,
  toDate?: string,
): Promise<ApiResponse<{ month: string; revenue: number; orders: number }[]>> => {
  await randomDelay();
  requireAdmin();

  // Return the chart data from dashboard stats as the sales report
  const data = mockDashboardStats.salesChart.filter((point) => {
    const d = new Date(point.month);
    if (fromDate && d < new Date(fromDate)) return false;
    if (toDate && d > new Date(toDate)) return false;
    return true;
  });

  return { success: true, data };
};

/**
 * Get a product performance report.
 */
export const adminProductsReport = async (): Promise<
  ApiResponse<{ productId: string; title: string; salesCount: number; revenue: number }[]>
> => {
  await randomDelay();
  requireAdmin();

  const data = mockProducts.map((p) => ({
    productId: p.id,
    title: p.title,
    salesCount: p.salesCount,
    revenue: p.salesCount * (p.salePrice ?? p.price),
  })).sort((a, b) => b.revenue - a.revenue);

  return { success: true, data };
};

/**
 * Get a customers growth report.
 */
export const adminCustomersReport = async (): Promise<
  ApiResponse<{ month: string; newCustomers: number; totalCustomers: number }[]>
> => {
  await randomDelay();
  requireAdmin();

  // Synthetic growth data based on mock dataset
  const data = [
    { month: 'Jun 2024', newCustomers: 98, totalCustomers: 720 },
    { month: 'Jul 2024', newCustomers: 134, totalCustomers: 854 },
    { month: 'Aug 2024', newCustomers: 162, totalCustomers: 1016 },
    { month: 'Sep 2024', newCustomers: 121, totalCustomers: 1137 },
    { month: 'Oct 2024', newCustomers: 178, totalCustomers: 1315 },
    { month: 'Nov 2024', newCustomers: 210, totalCustomers: 1525 },
    { month: 'Dec 2024', newCustomers: 118, totalCustomers: 1643 },
    { month: 'Jan 2025', newCustomers: 87, totalCustomers: 1730 },
    { month: 'Feb 2025', newCustomers: 53, totalCustomers: 1783 },
    { month: 'Mar 2025', newCustomers: 38, totalCustomers: 1821 },
    { month: 'Apr 2025', newCustomers: 14, totalCustomers: 1835 },
    { month: 'May 2025', newCustomers: 5, totalCustomers: 1840 },
  ];

  return { success: true, data };
};

// ─────────────────────────────────────────────
// Settings
// ─────────────────────────────────────────────

/**
 * Get all application settings.
 */
export const adminGetSettings = async (): Promise<ApiResponse<Settings[]>> => {
  await randomDelay();
  requireAdmin();
  return { success: true, data: [...settingsStore] };
};

/**
 * Update a setting value by key.
 */
export const adminUpdateSetting = async (
  key: string,
  value: string,
): Promise<ApiResponse<Settings | null>> => {
  await randomDelay();
  const admin = requireAdmin();

  const idx = settingsStore.findIndex((s) => s.key === key);
  if (idx === -1) return { success: false, data: null, message: 'Setting not found.' };

  settingsStore[idx] = {
    ...settingsStore[idx],
    value,
    updatedAt: new Date().toISOString(),
  };

  logAudit(admin.id, 'update', 'setting', key);
  return { success: true, data: settingsStore[idx] };
};

// ─────────────────────────────────────────────
// Admin Users Management
// ─────────────────────────────────────────────

/**
 * List all admin users.
 */
export const adminGetUsers = async (): Promise<ApiResponse<User[]>> => {
  await randomDelay();
  requireAdmin();
  return { success: true, data: [...mockAdminUsers] };
};

/**
 * Get a single admin user by ID.
 */
export const adminGetUser = async (
  id: string,
): Promise<ApiResponse<User | null>> => {
  await randomDelay();
  requireAdmin();

  const user = mockAdminUsers.find((u) => u.id === id);
  if (!user) return { success: false, data: null, message: 'User not found.' };
  return { success: true, data: user };
};

/**
 * Invite/create a new admin user.
 */
export const adminCreateUser = async (
  data: Pick<User, 'email' | 'firstName' | 'lastName' | 'role'>,
): Promise<ApiResponse<User>> => {
  await randomDelay();
  const admin = requireAdmin();

  const existing = mockAdminUsers.find((u) => u.email === data.email);
  if (existing) {
    return { success: false, data: null, message: 'A user with this email already exists.' };
  }

  const newUser: User = {
    id: generateId('admin'),
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    displayName: `${data.firstName} ${data.lastName}`,
    role: data.role,
    status: 'active',
    emailVerified: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockAdminUsers.push(newUser);
  logAudit(admin.id, 'create', 'user', newUser.id);

  return { success: true, data: newUser };
};

/**
 * Update an admin user's role.
 */
export const adminUpdateUserRole = async (
  id: string,
  role: User['role'],
): Promise<ApiResponse<User | null>> => {
  await randomDelay();
  const admin = requireAdmin();

  const idx = mockAdminUsers.findIndex((u) => u.id === id);
  if (idx === -1) return { success: false, data: null, message: 'User not found.' };

  const updated: User = {
    ...mockAdminUsers[idx],
    role,
    updatedAt: new Date().toISOString(),
  };

  mockAdminUsers[idx] = updated;
  logAudit(admin.id, 'update', 'user', id);

  return { success: true, data: updated };
};

// ─────────────────────────────────────────────
// Roles (simplified — roles are the UserRole literal type)
// ─────────────────────────────────────────────

/**
 * Get available role definitions.
 */
export const adminGetRoles = async (): Promise<
  ApiResponse<{ role: string; label: string; description: string }[]>
> => {
  await randomDelay();
  requireAdmin();

  const roles = [
    { role: 'super_admin', label: 'Super Admin', description: 'Full access to all features and settings.' },
    { role: 'admin', label: 'Admin', description: 'Manage products, orders, customers, and content.' },
    { role: 'support', label: 'Support', description: 'View orders and manage support tickets.' },
    { role: 'customer', label: 'Customer', description: 'Standard customer account.' },
  ];

  return { success: true, data: roles };
};

// ─────────────────────────────────────────────
// Audit Logs
// ─────────────────────────────────────────────

/**
 * Get paginated audit log entries.
 */
export const adminGetAuditLogs = async (
  page = 1,
  limit = 20,
): Promise<ApiResponse<AuditLog[]>> => {
  await randomDelay();
  requireAdmin();

  const { items, meta } = paginate([...auditLogs], page, limit);
  return { success: true, data: items, meta };
};
