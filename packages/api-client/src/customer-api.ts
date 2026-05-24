import type {
  ApiResponse,
  User,
  Cart,
  CartItem,
  Order,
  Download,
  SupportTicket,
  CouponValidationResult,
  AuthResult,
  RegisterPayload,
  LoginPayload,
  CheckoutPayload,
  CreateTicketPayload,
} from '../../shared-types/src/index';
import {
  mockCustomers,
  mockOrders,
  mockDownloads,
  mockTickets,
  mockCoupons,
  mockProducts,
  mockCart,
} from './mock-data';

// ─────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const randomDelay = (): Promise<void> =>
  delay(60 + Math.floor(Math.random() * 90));

let sessionUser: User | null = null;
let sessionCart: Cart = { ...mockCart, items: [] };

const requireAuth = (): User => {
  if (!sessionUser) throw new Error('Unauthenticated. Please log in.');
  return sessionUser;
};

const generateId = (prefix: string): string =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const withProduct = <T extends { productId?: string }>(item: T): T => {
  if (!item.productId) return item;
  const product = mockProducts.find((candidate) => candidate.id === item.productId);
  return product ? { ...item, product } : item;
};

export const hydrateCustomerSession = (user: User | null): void => {
  sessionUser = user;
  sessionCart = {
    ...sessionCart,
    userId: user?.id,
    sessionId: user ? undefined : sessionCart.sessionId ?? mockCart.sessionId,
  };
};

// ─────────────────────────────────────────────
// Auth
// ─────────────────────────────────────────────

/**
 * Register a new customer account.
 */
export const register = async (
  data: RegisterPayload,
): Promise<ApiResponse<AuthResult>> => {
  await randomDelay();

  const existing = mockCustomers.find((u) => u.email === data.email);
  if (existing) {
    return {
      success: false,
      data: null,
      message: 'An account with this email already exists.',
    };
  }

  const newUser: User = {
    id: generateId('user'),
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    displayName: `${data.firstName} ${data.lastName}`,
    role: 'CUSTOMER',
    status: 'active',
    emailVerified: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  };

  mockCustomers.push(newUser);
  hydrateCustomerSession(newUser);

  return {
    success: true,
    data: {
      user: newUser,
      accessToken: `mock_access_${generateId('tok')}`,
      refreshToken: `mock_refresh_${generateId('tok')}`,
    },
  };
};

/**
 * Log in with email and password. Accepts any customer email from mock data (password ignored).
 */
export const login = async (
  data: LoginPayload,
): Promise<ApiResponse<AuthResult>> => {
  await randomDelay();

  const user = mockCustomers.find((u) => u.email === data.email);

  if (!user) {
    return {
      success: false,
      data: null,
      message: 'Invalid email or password.',
    };
  }

  const loggedInUser: User = {
    ...user,
    lastLoginAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const idx = mockCustomers.findIndex((candidate) => candidate.id === user.id);
  if (idx !== -1) mockCustomers[idx] = loggedInUser;

  hydrateCustomerSession(loggedInUser);

  return {
    success: true,
    data: {
      user: loggedInUser,
      accessToken: `mock_access_${generateId('tok')}`,
      refreshToken: `mock_refresh_${generateId('tok')}`,
    },
  };
};

/**
 * Log out the current session.
 */
export const logout = async (): Promise<ApiResponse<null>> => {
  await randomDelay();
  hydrateCustomerSession(null);
  return { success: true, data: null, message: 'Logged out successfully.' };
};

/**
 * Request a password reset email.
 */
export const forgotPassword = async (
  email: string,
): Promise<ApiResponse<null>> => {
  await randomDelay();
  // Always succeed to avoid email enumeration
  void email;
  return {
    success: true,
    data: null,
    message: 'If an account with that email exists, a reset link has been sent.',
  };
};

/**
 * Reset password with a token (mock always succeeds).
 */
export const resetPassword = async (
  token: string,
  _password: string,
): Promise<ApiResponse<null>> => {
  await randomDelay();
  if (!token) {
    return { success: false, data: null, message: 'Invalid or expired reset token.' };
  }
  return { success: true, data: null, message: 'Password updated successfully.' };
};

// ─────────────────────────────────────────────
// Profile
// ─────────────────────────────────────────────

/**
 * Get the authenticated user's profile.
 */
export const getMe = async (): Promise<ApiResponse<User>> => {
  await randomDelay();
  const user = requireAuth();
  return { success: true, data: user };
};

/**
 * Update profile fields for the authenticated user.
 */
export const updateMe = async (
  data: Partial<Pick<User, 'firstName' | 'lastName' | 'displayName' | 'phoneNumber' | 'billingAddress'>>,
): Promise<ApiResponse<User>> => {
  await randomDelay();
  const user = requireAuth();

  const updated: User = {
    ...user,
    ...data,
    updatedAt: new Date().toISOString(),
  };

  hydrateCustomerSession(updated);

  const idx = mockCustomers.findIndex((u) => u.id === user.id);
  if (idx !== -1) mockCustomers[idx] = updated;

  return { success: true, data: updated };
};

// ─────────────────────────────────────────────
// Cart
// ─────────────────────────────────────────────

/**
 * Get the current cart.
 */
export const getCart = async (): Promise<ApiResponse<Cart>> => {
  await randomDelay();
  return { success: true, data: sessionCart };
};

/**
 * Add a product to the cart.
 */
export const addCartItem = async (
  productId: string,
): Promise<ApiResponse<Cart>> => {
  await randomDelay();

  const product = mockProducts.find((p) => p.id === productId);
  if (!product) {
    return { success: false, data: null, message: 'Product not found.' };
  }

  const alreadyInCart = sessionCart.items.some(
    (i) => i.productId === productId,
  );
  if (alreadyInCart) {
    return {
      success: false,
      data: sessionCart,
      message: 'This product is already in your cart.',
    };
  }

  const newItem: CartItem = {
    id: generateId('ci'),
    cartId: sessionCart.id,
    productId,
    product,
    licenseType: 'commercial',
    price: product.salePrice ?? product.price,
    addedAt: new Date().toISOString(),
  };

  const updatedCart: Cart = {
    ...sessionCart,
    items: [...sessionCart.items, newItem],
    subtotal: (sessionCart.subtotal ?? 0) + (newItem.price ?? 0),
    updatedAt: new Date().toISOString(),
  };

  sessionCart = updatedCart;
  return { success: true, data: updatedCart };
};

/**
 * Remove an item from the cart by item ID.
 */
export const removeCartItem = async (
  itemId: string,
): Promise<ApiResponse<Cart>> => {
  await randomDelay();

  const item = sessionCart.items.find((i) => i.id === itemId);
  if (!item) {
    return { success: false, data: null, message: 'Cart item not found.' };
  }

  const updatedCart: Cart = {
    ...sessionCart,
    items: sessionCart.items.filter((i) => i.id !== itemId),
    subtotal: Math.max(0, (sessionCart.subtotal ?? 0) - (item.price ?? 0)),
    updatedAt: new Date().toISOString(),
  };

  sessionCart = updatedCart;
  return { success: true, data: updatedCart };
};

// ─────────────────────────────────────────────
// Coupons
// ─────────────────────────────────────────────

/**
 * Validate a coupon code against a cart total.
 */
export const validateCoupon = async (
  code: string,
  cartTotal: number,
): Promise<ApiResponse<CouponValidationResult>> => {
  await randomDelay();

  const coupon = mockCoupons.find(
    (c) => c.code.toUpperCase() === code.toUpperCase(),
  );

  if (!coupon) {
    return {
      success: false,
      data: { valid: false, discountAmount: 0, message: 'Coupon code not found.' },
    };
  }

  if (!coupon.isActive) {
    return {
      success: false,
      data: { valid: false, discountAmount: 0, message: 'This coupon is no longer active.' },
    };
  }

  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
    return {
      success: false,
      data: { valid: false, discountAmount: 0, message: 'This coupon has expired.' },
    };
  }

  if (coupon.usageLimit && (coupon.usageCount ?? 0) >= coupon.usageLimit) {
    return {
      success: false,
      data: { valid: false, discountAmount: 0, message: 'This coupon has reached its usage limit.' },
    };
  }

  if (coupon.minOrderAmount && cartTotal < coupon.minOrderAmount) {
    return {
      success: false,
      data: {
        valid: false,
        discountAmount: 0,
        message: `Minimum order amount of $${coupon.minOrderAmount} required for this coupon.`,
      },
    };
  }

  let discountAmount =
    coupon.type === 'percentage'
      ? (cartTotal * (coupon.value ?? 0)) / 100
      : (coupon.value ?? 0);

  if (coupon.maxDiscountAmount) {
    discountAmount = Math.min(discountAmount, coupon.maxDiscountAmount);
  }

  discountAmount = Math.round(discountAmount * 100) / 100;

  return {
    success: true,
    data: {
      valid: true,
      coupon,
      discountAmount,
      message: `Coupon applied: $${discountAmount.toFixed(2)} off.`,
    },
  };
};

// ─────────────────────────────────────────────
// Checkout
// ─────────────────────────────────────────────

/**
 * Process checkout for the current cart. Returns a new order with simulated payment.
 */
export const checkout = async (
  data: CheckoutPayload,
): Promise<ApiResponse<Order>> => {
  await delay(150); // simulate payment processing

  const user = requireAuth();

  if (sessionCart.items.length === 0) {
    return { success: false, data: null, message: 'Your cart is empty.' };
  }

  let discount = 0;
  if (data.couponCode) {
    const validation = await validateCoupon(
      data.couponCode,
      sessionCart.subtotal ?? 0,
    );
    if (validation.data?.valid) {
      discount = validation.data.discountAmount ?? 0;
    }
  }

  const orderId = generateId('order');
  const newOrder: any = {
    id: orderId,
    userId: user.id,
    user,
    items: sessionCart.items.map((ci, idx) => ({
      id: generateId(`oi-${idx}`),
      orderId,
      productId: ci.productId,
      product: ci.product,
      quantity: 1,
      unitPrice: ci.price,
      licenseType: ci.licenseType,
    })),
    subtotal: sessionCart.subtotal,
    discountAmount: discount,
    total: Math.max(0, (sessionCart.subtotal ?? 0) - discount),
    currency: 'USD',
    couponCode: data.couponCode,
    orderStatus: 'paid',
    paymentStatus: 'paid',
    paymentMethod: data.paymentMethod,
    paymentIntentId: `pi_mock_${generateId('pay')}`,
    invoiceId: generateId('inv'),
    billingAddress: data.billingAddress,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as unknown as Order & { billingAddress?: CheckoutPayload['billingAddress'] };

  mockOrders.push(newOrder);

  if (newOrder.paymentStatus === 'paid') {
    const createdAt = newOrder.createdAt;
    for (const item of newOrder.items) {
      const product = item.product ?? mockProducts.find((candidate) => candidate.id === item.productId);
      mockDownloads.push({
        id: generateId('dl'),
        userId: user.id,
        orderId,
        productId: item.productId,
        fileId: `file-${item.productId}`,
        downloadCount: 0,
        downloadLimit: product?.downloadLimit ?? 3,
        createdAt,
      });
    }
  }

  // Clear the cart after successful checkout
  sessionCart = {
    ...sessionCart,
    items: [],
    subtotal: 0,
    updatedAt: new Date().toISOString(),
  };

  return { success: true, data: newOrder };
};

// ─────────────────────────────────────────────
// Orders
// ─────────────────────────────────────────────

/**
 * Get all orders for the authenticated user.
 */
export const getOrders = async (): Promise<ApiResponse<Order[]>> => {
  await randomDelay();
  const user = requireAuth();

  const userOrders = mockOrders
    .filter((o) => o.userId === user.id)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  return {
    success: true,
    data: userOrders,
    meta: {
      total: userOrders.length,
      page: 1,
      limit: userOrders.length,
      totalPages: 1,
    },
  };
};

/**
 * Get a single order by ID for the authenticated user.
 */
export const getOrder = async (
  id: string,
): Promise<ApiResponse<Order | null>> => {
  await randomDelay();
  const user = requireAuth();

  const order = mockOrders.find(
    (o) => o.id === id && o.userId === user.id,
  );

  if (!order) {
    return { success: false, data: null, message: 'Order not found.' };
  }

  return { success: true, data: order };
};

/**
 * Get invoice data for a specific order.
 */
export const getInvoice = async (
  orderId: string,
): Promise<ApiResponse<{ invoiceNumber: string; downloadUrl: string } | null>> => {
  await randomDelay();
  const user = requireAuth();

  const order = mockOrders.find(
    (o) => o.id === orderId && o.userId === user.id,
  );

  if (!order || order.paymentStatus !== 'paid') {
    return { success: false, data: null, message: 'Invoice not found.' };
  }

  return {
    success: true,
    data: {
      invoiceNumber: (order as any).invoiceId ?? `INV-${order.id}`,
      downloadUrl: `/mock/invoices/${(order as any).invoiceId}.pdf`,
    },
  };
};

// ─────────────────────────────────────────────
// Downloads
// ─────────────────────────────────────────────

/**
 * Get all available downloads for the authenticated user.
 */
export const getDownloads = async (): Promise<ApiResponse<Download[]>> => {
  await randomDelay();
  const user = requireAuth();

  const userDownloads = mockDownloads.filter((d) => d.userId === user.id);

  return {
    success: true,
    data: userDownloads.map(withProduct),
    meta: {
      total: userDownloads.length,
      page: 1,
      limit: userDownloads.length,
      totalPages: 1,
    },
  };
};

/**
 * Request a signed download URL for a specific file.
 * In production this would generate a short-lived signed URL.
 */
export const requestDownloadLink = async (
  fileId: string,
): Promise<ApiResponse<{ url: string; expiresAt: string } | null>> => {
  await randomDelay();
  const user = requireAuth();

  const download = mockDownloads.find(
    (d) => d.fileId === fileId && d.userId === user.id,
  );

  if (!download) {
    return { success: false, data: null, message: 'Download not found or not authorised.' };
  }

  if ((download.downloadCount ?? 0) >= (download.downloadLimit ?? 0)) {
    return {
      success: false,
      data: null,
      message: `Download limit of ${download.downloadLimit} reached. Contact support for assistance.`,
    };
  }

  // Increment mock counter
  download.downloadCount = (download.downloadCount ?? 0) + 1;

  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 minutes
  const signedToken = `mock_signed_${generateId('dl')}`;

  return {
    success: true,
    data: {
      url: `/mock/files/${fileId}?token=${signedToken}`,
      expiresAt,
    },
  };
};

// ─────────────────────────────────────────────
// Support Tickets
// ─────────────────────────────────────────────

/**
 * Get all support tickets for the authenticated user.
 */
export const getTickets = async (): Promise<ApiResponse<SupportTicket[]>> => {
  await randomDelay();
  const user = requireAuth();

  const userTickets = mockTickets
    .filter((t) => t.userId === user.id)
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );

  return {
    success: true,
    data: userTickets.map(withProduct),
    meta: {
      total: userTickets.length,
      page: 1,
      limit: userTickets.length,
      totalPages: 1,
    },
  };
};

/**
 * Create a new support ticket.
 */
export const createTicket = async (
  data: CreateTicketPayload,
): Promise<ApiResponse<SupportTicket>> => {
  await randomDelay();
  const user = requireAuth();

  const newTicket: any = {
    id: generateId('ticket'),
    userId: user.id,
    user: user as any,
    subject: data.subject,
    message: data.message,
    status: 'open',
    priority: data.priority,
    productId: data.productId,
    orderId: data.orderId,
    replies: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockTickets.push(newTicket);
  return { success: true, data: withProduct(newTicket) };
};

/**
 * Get a single support ticket by ID.
 */
export const getTicket = async (
  id: string,
): Promise<ApiResponse<SupportTicket | null>> => {
  await randomDelay();
  const user = requireAuth();

  const ticket = mockTickets.find(
    (t) => t.id === id && t.userId === user.id,
  );

  if (!ticket) {
    return { success: false, data: null, message: 'Ticket not found.' };
  }

  return { success: true, data: withProduct(ticket) };
};

/**
 * Reply to an existing support ticket.
 */
export const replyToTicket = async (
  id: string,
  message: string,
): Promise<ApiResponse<SupportTicket | null>> => {
  await randomDelay();
  const user = requireAuth();

  const ticket = mockTickets.find(
    (t) => t.id === id && t.userId === user.id,
  );

  if (!ticket) {
    return { success: false, data: null, message: 'Ticket not found.' };
  }

  if (ticket.status === 'closed') {
    return {
      success: false,
      data: null,
      message: 'This ticket is closed. Please open a new ticket.',
    };
  }

  const now = new Date().toISOString();
  const updatedTicket: any = {
    ...ticket,
    replies: [
      ...((ticket as any).replies || []),
      {
        id: generateId('reply'),
        ticketId: id,
        authorId: user.id,
        author: user,
        message,
        isStaff: false,
        createdAt: now,
        updatedAt: now,
      },
    ],
    status: 'open',
    updatedAt: now,
  };

  const idx = mockTickets.findIndex((t) => t.id === id);
  if (idx !== -1) mockTickets[idx] = updatedTicket;

  return { success: true, data: withProduct(updatedTicket) };
};
