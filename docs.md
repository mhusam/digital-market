
# Digital Marketplace Fullstack Plan & One-Shot AI Prompt

## 1. Purpose

This document is the final planning and one-shot prompt file for building a worldwide digital products marketplace.

The marketplace sells downloadable digital items such as:

- Microservices implementations
- Simple SaaS solutions
- Website templates
- Dashboard templates
- UI/UX templates
- Figma files
- Photoshop/design assets
- Design systems
- Source code packages
- API packages
- Documentation and downloadable files

The system must cover three main parts:

1. **ui-customer** — the public customer marketplace website.
2. **ui-admin** — the private admin dashboard website.
3. **backend** — a backend platform shared by both UIs, exposed through an **API Gateway**.

The customer UI and admin UI must be treated as **two different frontend deployments**. The backend must be a separate deployable backend platform with a gateway that both UIs call.

---

## 2. High-Level Architecture

```txt
                         ┌─────────────────────────┐
                         │      ui-customer        │
                         │  Public marketplace UI  │
                         │ marketplace.com         │
                         └───────────┬─────────────┘
                                     │
                                     │ HTTPS API calls
                                     │
┌─────────────────────────┐          ▼
│        ui-admin         │   ┌─────────────────────┐
│ Private admin dashboard │──▶│     API Gateway     │
│ admin.marketplace.com   │   │ api.marketplace.com │
└─────────────────────────┘   └──────────┬──────────┘
                                          │
                                          │ Routes, auth, RBAC, rate limit,
                                          │ logging, versioning, validation
                                          ▼
        ┌─────────────────────────────────────────────────────────────┐
        │                     Backend Services                       │
        ├─────────────────────────────────────────────────────────────┤
        │ Auth / Users / Roles                                       │
        │ Product Catalog                                            │
        │ Cart / Checkout                                            │
        │ Orders / Payments                                          │
        │ Digital File Delivery                                      │
        │ File Storage                                               │
        │ Coupons / Promotions                                       │
        │ Customers / Accounts                                       │
        │ Admin Management                                           │
        │ Support Tickets                                            │
        │ Reviews                                                    │
        │ CMS / Pages / Blog                                         │
        │ Reports / Analytics                                        │
        │ Notifications / Emails                                     │
        │ Tax / Invoices                                             │
        │ Audit Logs                                                 │
        └─────────────────────────────────────────────────────────────┘
                                          │
                                          ▼
        ┌─────────────────────────────────────────────────────────────┐
        │ Database + Private Storage + Email + Payment Providers      │
        └─────────────────────────────────────────────────────────────┘
```

---

## 3. Deployment Model

The project must support separate deployments.

| Deployment | Purpose | Example Domain | Notes |
|---|---|---|---|
| `ui-customer` | Public website for customers | `marketplace.com` or `www.marketplace.com` | Public-facing storefront, product pages, checkout, account area |
| `ui-admin` | Private admin dashboard | `admin.marketplace.com` | Admin-only interface, separate build and deployment |
| `api-gateway` / backend | Shared backend entry point | `api.marketplace.com` | All frontend apps communicate with this gateway |
| Backend services | Internal services behind gateway | private/internal URLs | Not directly exposed to browsers |
| Storage/CDN | Public previews + private downloads | CDN/storage domain | Product previews can be public, actual downloadable files must be private |

Important deployment rules:

- `ui-customer` and `ui-admin` are separate apps.
- `ui-customer` must not include admin routes or admin-only logic.
- `ui-admin` must be protected and should not expose customer storefront pages.
- Both UIs call the same backend through the API Gateway.
- Backend services should not be directly exposed to the public internet unless explicitly required.
- The gateway is the single public API entry point.

---

## 4. Recommended Tech Stack

### 4.1 Frontend

| Layer | Recommendation |
|---|---|
| Framework | Next.js or React |
| Styling | Tailwind CSS |
| Animation | Motion from `motion.dev` |
| Simple micro-animations | Tailwind CSS animation utilities |
| State | Zustand, Redux Toolkit, React Context, or framework state |
| Forms | React Hook Form |
| Validation | Zod |
| Tables | TanStack Table or custom reusable table |
| Charts | Recharts, Tremor, or lightweight chart library |
| Icons | Lucide, Heroicons, or similar |

Animation clarification:

- Use **Motion from `motion.dev`** as the main animation library.
- Use **Tailwind CSS animation utilities** for small hover, loading, fade, and micro-interactions.
- Do **not** use the Framer website builder unless specifically requested.
- Do not confuse Framer as a website builder with Motion as an animation library.
- Respect reduced motion preferences.

### 4.2 Backend

| Layer | Recommendation |
|---|---|
| API Gateway | Node.js/NestJS, Express/Fastify, Spring Cloud Gateway, or similar |
| Backend services | NestJS, Laravel, Django, Spring Boot, or modular Node.js services |
| Database | PostgreSQL preferred, MySQL acceptable |
| Cache/session | Redis optional |
| File storage | Amazon S3, Cloudflare R2, DigitalOcean Spaces, or private object storage |
| Payments | Stripe, PayPal, or other payment provider |
| Email | SendGrid, Mailgun, Amazon SES, Resend, or SMTP |
| Auth | JWT/session-based auth with refresh tokens and RBAC |
| API docs | OpenAPI/Swagger |
| Logging | Structured logs |
| Monitoring | Error tracking and uptime monitoring |

---

## 5. Repository Structure

Use a monorepo or multi-repo setup. A monorepo is preferred for early development.

```txt
digital-marketplace/
  apps/
    ui-customer/
      src/
      public/
      package.json
      .env.example

    ui-admin/
      src/
      public/
      package.json
      .env.example

    api-gateway/
      src/
      package.json
      .env.example

  services/
    auth-service/
    catalog-service/
    order-service/
    payment-service/
    file-delivery-service/
    customer-service/
    admin-service/
    support-service/
    coupon-service/
    content-service/
    analytics-service/
    notification-service/
    audit-service/

  packages/
    shared-types/
    api-client/
    ui-shared/
    config/
    validation/

  infra/
    docker/
    nginx/
    deploy/
    database/

  docs/
    architecture.md
    api-contracts.md
    deployment.md
    security.md
```

Alternative for a simpler MVP:

```txt
digital-marketplace/
  apps/
    ui-customer/
    ui-admin/
    backend/
      src/
        gateway/
        modules/
          auth/
          products/
          orders/
          payments/
          downloads/
          admin/
          customers/
          support/
          coupons/
          content/
          reports/
          audit/
```

For MVP, a modular monolith backend is acceptable as long as it exposes a clear gateway/API layer and can later be split into services.

---

## 6. API Gateway Requirements

The API Gateway is the only public API endpoint used by `ui-customer` and `ui-admin`.

### 6.1 Gateway Responsibilities

The gateway should handle:

- API routing
- API versioning, for example `/api/v1`
- Authentication verification
- Customer/admin role separation
- RBAC checks for admin routes
- Request validation
- Rate limiting
- CORS configuration for customer/admin frontend domains
- Request/response logging
- Error normalization
- Security headers
- Upload request handling or forwarding
- Payment webhook routing
- Signed download URL generation or delegation
- Health checks
- API documentation exposure

### 6.2 Gateway Route Groups

```txt
/api/v1/public/*       Public routes used by visitors
/api/v1/customer/*     Authenticated customer routes
/api/v1/admin/*        Authenticated admin routes
/api/v1/webhooks/*     Payment/storage/email webhook routes
/api/v1/internal/*     Internal service-to-service routes, not public if possible
```

### 6.3 API Versioning

Use versioned routes:

```txt
/api/v1/products
/api/v1/customer/orders
/api/v1/admin/products
```

This makes future API changes safer.

### 6.4 CORS Rules

Allow only approved frontend origins:

```txt
https://marketplace.com
https://www.marketplace.com
https://admin.marketplace.com
```

Do not use unrestricted `*` CORS in production.

---

## 7. Backend Services / Modules

### 7.1 Auth Service

Responsibilities:

- Customer registration
- Customer login
- Admin login
- Password reset
- Email verification
- Refresh tokens
- Sessions
- Roles and permissions
- Admin RBAC
- Account suspension

### 7.2 Product Catalog Service

Responsibilities:

- Product listing
- Product details
- Product search
- Product filters
- Categories
- Tags
- Product status: draft, published, archived
- Product versions
- Changelog
- Product reviews summary

### 7.3 Cart & Checkout Service

Responsibilities:

- Cart creation
- Add/remove cart items
- Coupon validation
- Checkout draft order
- Tax calculation placeholder/integration
- Payment intent/session creation

### 7.4 Order & Payment Service

Responsibilities:

- Order creation
- Order status management
- Payment provider references
- Payment webhook handling
- Refund workflow
- Payment success/failure state
- Invoice creation

### 7.5 Digital File Delivery Service

Responsibilities:

- Private file storage records
- Secure download access
- Signed temporary URLs
- Download limits
- Download expiry
- Download logs
- Product version access
- File access revocation after refund if required

Important rule:

Actual downloadable product files must not be exposed as public URLs. Use private storage and generate temporary signed download links after verified payment.

### 7.6 Admin Service

Responsibilities:

- Admin dashboard stats
- Product management
- Order management
- Customer management
- Coupon management
- Support management
- Settings management
- User/role management
- Audit logs

### 7.7 Customer Service

Responsibilities:

- Customer profile
- Customer orders
- Customer downloads
- Customer support tickets
- Billing information
- Notification preferences

### 7.8 Support Service

Responsibilities:

- Customer ticket creation
- Ticket replies
- Admin replies
- Ticket status: open, pending, closed
- Priority
- Ticket attachments if needed

### 7.9 Coupon / Promotion Service

Responsibilities:

- Coupon creation
- Coupon validation
- Coupon usage limits
- Expiry rules
- Fixed/percentage discounts
- Product/category restrictions

### 7.10 Content / CMS Service

Responsibilities:

- Blog posts
- FAQ
- Static legal pages
- Homepage sections
- Announcement banners

### 7.11 Reports / Analytics Service

Responsibilities:

- Revenue summary
- Orders summary
- Sales by category
- Top products
- Customer growth
- Downloads analytics
- Refunds/failed payments

### 7.12 Notification Service

Responsibilities:

- Welcome email
- Password reset email
- Order confirmation email
- Download-ready email
- Invoice/receipt email
- Support ticket email
- Product update email
- Refund processed email

### 7.13 Audit Service

Responsibilities:

- Admin action logs
- Security events
- Login events
- Product changes
- Order status changes
- File access changes
- Role/permission changes

---

## 8. Customer UI Pages

The `ui-customer` deployment must contain these pages.

```txt
/
/products
/products/:slug
/categories/:slug
/search
/cart
/checkout
/checkout/success
/checkout/failed
/login
/register
/forgot-password
/account
/account/downloads
/account/orders
/account/orders/:id
/account/invoices/:id
/account/profile
/account/support
/account/support/:id
/about
/contact
/faq
/terms
/privacy
/refund-policy
/license-policy
```

### Customer pages to build

- Home page
- Products listing page
- Product category page
- Product details page
- Search results page
- Cart page
- Checkout page
- Payment success page
- Payment failed page
- Login page
- Register page
- Forgot password page
- Customer dashboard
- My downloads page
- Order history page
- Order details page
- Invoice/receipt page
- Support tickets page
- Support ticket detail page
- Profile settings page
- FAQ page
- About page
- Contact page
- Terms page
- Privacy page
- Refund policy page
- License policy page

### Customer actions

The customer UI must support:

- Browse products
- Search products
- Filter products by category, price, tag, file type, and technology
- Sort products by newest, popular, price, and rating
- Open product details
- View product previews
- Add product to cart
- Remove product from cart
- Apply valid coupon
- Apply invalid coupon
- Continue to checkout
- Pay through backend payment flow or simulate payment in prototype mode
- View payment success
- View payment failure
- View purchased products
- Download purchased files through backend signed URL flow or fake signed links in prototype mode
- View order history
- View order details
- View invoice
- Open support ticket
- Reply to support ticket
- Update profile
- Logout

---

## 9. Admin UI Pages

The `ui-admin` deployment must contain these pages.

```txt
/admin/login
/admin/dashboard
/admin/products
/admin/products/create
/admin/products/:id/edit
/admin/products/:id/files
/admin/products/:id/versions
/admin/categories
/admin/orders
/admin/orders/:id
/admin/customers
/admin/customers/:id
/admin/files
/admin/download-logs
/admin/coupons
/admin/reviews
/admin/support
/admin/support/:id
/admin/blog
/admin/pages
/admin/reports
/admin/settings
/admin/users
/admin/roles
/admin/audit-logs
```

### Admin pages to build

- Admin login page
- Admin dashboard
- Products list
- Add product
- Edit product
- Product file management
- Product versions and changelog
- Categories management
- Orders list
- Order details
- Customers list
- Customer details
- File library
- Download logs
- Coupons management
- Reviews management
- Support tickets management
- Support ticket detail/reply page
- Blog/content management
- Static pages management
- Reports and analytics
- Settings
- Admin users
- Roles and permissions
- Audit logs

### Admin actions

The admin UI must support:

- Login to admin panel
- View dashboard statistics
- View sales charts
- View recent orders
- Create product
- Edit product
- Archive/delete product
- Publish/unpublish product
- Upload product files through backend or mock upload in prototype mode
- Upload preview images
- Manage product versions
- Add changelog
- Manage categories
- View orders
- Change order status
- Simulate or perform refund
- View customer details
- View customer purchases
- View download logs
- Create coupon
- Edit coupon
- Disable coupon
- Manage reviews
- Approve/hide reviews
- Manage support tickets
- Reply to support tickets
- Close/reopen tickets
- Manage blog/content pages
- View reports
- Manage settings
- Manage admin users
- Manage roles and permissions
- View audit logs

---

## 10. Shared Backend API Contract

Both frontend deployments should use one shared API client package.

```txt
packages/api-client/
  src/
    public-api.ts
    customer-api.ts
    admin-api.ts
    auth-api.ts
    types.ts
```

### 10.1 Public API Endpoints

```txt
GET    /api/v1/public/products
GET    /api/v1/public/products/:slug
GET    /api/v1/public/categories
GET    /api/v1/public/categories/:slug/products
GET    /api/v1/public/search
GET    /api/v1/public/pages/:slug
GET    /api/v1/public/faqs
```

### 10.2 Customer API Endpoints

```txt
POST   /api/v1/customer/auth/register
POST   /api/v1/customer/auth/login
POST   /api/v1/customer/auth/logout
POST   /api/v1/customer/auth/forgot-password
POST   /api/v1/customer/auth/reset-password
GET    /api/v1/customer/me
PATCH  /api/v1/customer/me
GET    /api/v1/customer/cart
POST   /api/v1/customer/cart/items
DELETE /api/v1/customer/cart/items/:id
POST   /api/v1/customer/coupons/validate
POST   /api/v1/customer/checkout
GET    /api/v1/customer/orders
GET    /api/v1/customer/orders/:id
GET    /api/v1/customer/invoices/:id
GET    /api/v1/customer/downloads
POST   /api/v1/customer/downloads/:fileId/request-link
GET    /api/v1/customer/support/tickets
POST   /api/v1/customer/support/tickets
GET    /api/v1/customer/support/tickets/:id
POST   /api/v1/customer/support/tickets/:id/replies
```

### 10.3 Admin API Endpoints

```txt
POST   /api/v1/admin/auth/login
POST   /api/v1/admin/auth/logout
GET    /api/v1/admin/dashboard
GET    /api/v1/admin/products
POST   /api/v1/admin/products
GET    /api/v1/admin/products/:id
PATCH  /api/v1/admin/products/:id
DELETE /api/v1/admin/products/:id
POST   /api/v1/admin/products/:id/publish
POST   /api/v1/admin/products/:id/unpublish
POST   /api/v1/admin/products/:id/archive
GET    /api/v1/admin/products/:id/files
POST   /api/v1/admin/products/:id/files
DELETE /api/v1/admin/products/:id/files/:fileId
GET    /api/v1/admin/products/:id/versions
POST   /api/v1/admin/products/:id/versions
GET    /api/v1/admin/categories
POST   /api/v1/admin/categories
PATCH  /api/v1/admin/categories/:id
DELETE /api/v1/admin/categories/:id
GET    /api/v1/admin/orders
GET    /api/v1/admin/orders/:id
PATCH  /api/v1/admin/orders/:id/status
POST   /api/v1/admin/orders/:id/refund
GET    /api/v1/admin/customers
GET    /api/v1/admin/customers/:id
PATCH  /api/v1/admin/customers/:id/status
GET    /api/v1/admin/files
GET    /api/v1/admin/download-logs
GET    /api/v1/admin/coupons
POST   /api/v1/admin/coupons
PATCH  /api/v1/admin/coupons/:id
POST   /api/v1/admin/coupons/:id/disable
GET    /api/v1/admin/reviews
PATCH  /api/v1/admin/reviews/:id/status
GET    /api/v1/admin/support/tickets
GET    /api/v1/admin/support/tickets/:id
POST   /api/v1/admin/support/tickets/:id/replies
PATCH  /api/v1/admin/support/tickets/:id/status
GET    /api/v1/admin/pages
POST   /api/v1/admin/pages
PATCH  /api/v1/admin/pages/:id
GET    /api/v1/admin/reports/sales
GET    /api/v1/admin/reports/products
GET    /api/v1/admin/reports/customers
GET    /api/v1/admin/settings
PATCH  /api/v1/admin/settings
GET    /api/v1/admin/users
POST   /api/v1/admin/users
PATCH  /api/v1/admin/users/:id
GET    /api/v1/admin/roles
POST   /api/v1/admin/roles
PATCH  /api/v1/admin/roles/:id
GET    /api/v1/admin/audit-logs
```

### 10.4 Webhook Endpoints

```txt
POST /api/v1/webhooks/stripe
POST /api/v1/webhooks/paypal
POST /api/v1/webhooks/storage
POST /api/v1/webhooks/email
```

Webhook endpoints must validate provider signatures.

---

## 11. Database Models

Suggested core database tables:

```txt
users
- id
- name
- email
- password_hash
- type: customer/admin
- status: active/suspended
- email_verified_at
- created_at
- updated_at

roles
- id
- name
- description
- created_at

permissions
- id
- key
- description

role_permissions
- role_id
- permission_id

user_roles
- user_id
- role_id

categories
- id
- name
- slug
- description
- icon
- status
- created_at
- updated_at

products
- id
- title
- slug
- category_id
- short_description
- description
- price
- sale_price
- currency
- status: draft/published/archived
- license_type
- demo_url
- version
- requirements_json
- tags_json
- technologies_json
- created_at
- updated_at

product_files
- id
- product_id
- file_name
- file_path
- file_size
- file_type
- version
- is_main_file
- storage_provider
- checksum
- private_status
- created_at

product_previews
- id
- product_id
- image_url
- sort_order
- created_at

product_versions
- id
- product_id
- version
- changelog
- file_id
- created_at

orders
- id
- user_id
- order_number
- status: pending/paid/failed/refunded/cancelled
- payment_status: pending/paid/failed/refunded
- payment_provider
- payment_reference
- subtotal
- discount
- tax
- total
- currency
- billing_country
- created_at
- updated_at

order_items
- id
- order_id
- product_id
- product_title
- price
- license_type
- product_version
- created_at

downloads
- id
- user_id
- order_id
- product_id
- product_file_id
- downloaded_at
- ip_address
- user_agent
- status: success/failed/expired

coupons
- id
- code
- type: percentage/fixed
- value
- max_uses
- used_count
- starts_at
- expires_at
- status
- created_at

support_tickets
- id
- user_id
- order_id
- subject
- status: open/pending/closed
- priority
- created_at
- updated_at

support_replies
- id
- ticket_id
- user_id
- message
- created_at

reviews
- id
- user_id
- product_id
- rating
- comment
- status: pending/approved/hidden
- created_at

invoices
- id
- order_id
- invoice_number
- customer_snapshot_json
- line_items_json
- tax
- total
- currency
- created_at

audit_logs
- id
- admin_user_id
- action
- entity_type
- entity_id
- ip_address
- user_agent
- details_json
- created_at

settings
- id
- key
- value_json
- updated_at
```

---

## 12. Product Data Requirements

Each product should include:

- ID
- Title
- Slug
- Category
- Short description
- Full description
- Price
- Sale price if available
- Currency
- Preview images
- Demo URL if available
- Tags
- File type
- Technologies
- Version
- Changelog
- License type
- Download limit
- Requirements
- Rating
- Review count
- Sales count
- Status
- Created date
- Updated date

Product categories should include:

- Microservices Implementation
- SaaS Solutions
- Website Templates
- Dashboard Templates
- UI/UX Templates
- Figma Kits
- Photoshop Assets
- Design Systems
- API Packages
- Source Code Packages
- Documentation & Guides

Example products:

- Auth Microservice API Kit
- Payment Gateway Microservice
- Notification Service Package
- SaaS CRM Starter Kit
- Invoice SaaS Dashboard
- Analytics SaaS Template
- Next.js Landing Page Template
- React Admin Dashboard Template
- Figma Mobile App UI Kit
- Figma Design System Kit
- Photoshop Brand Mockup Pack
- Social Media PSD Template Pack
- REST API Starter Package
- Laravel Module Package
- Developer Documentation Template

---

## 13. Frontend Component Requirements

### 13.1 Customer Components

- Customer navbar
- Footer
- Hero section
- Product card
- Product grid
- Category card
- Search bar
- Filter sidebar
- Product gallery
- Product details tabs
- Cart item
- Checkout summary
- Coupon form
- Download card
- Order card
- Invoice layout
- Support ticket card
- Profile form

### 13.2 Admin Components

- Admin sidebar
- Admin topbar
- Dashboard statistic card
- Chart card
- Data table
- Table filters
- Status badge
- Product form
- File upload component
- Changelog editor
- Customer profile card
- Order details card
- Permission matrix
- Audit log row

### 13.3 Shared Components

- Button
- Input
- Select
- Textarea
- Checkbox
- Radio
- Badge
- Status label
- Modal
- Drawer
- Toast notification
- Confirmation dialog
- Tabs
- Dropdown menu
- Breadcrumb
- Pagination
- Empty state
- Loading skeleton
- Error state
- Success state
- Tooltip
- Avatar
- Card

---

## 14. UI States to Cover

Cover these states in both UIs:

- Loading state
- Empty state
- Error state
- Success state
- Disabled state
- Hover state
- Active state
- Focus state
- Permission denied state
- Mobile responsive state

Examples:

- Empty cart
- No downloads yet
- No orders yet
- No products found
- No search results
- Payment failed
- Payment success
- Invalid coupon
- Valid coupon
- Product unpublished
- File upload pending
- File upload success
- File upload failed
- Support ticket closed
- Customer suspended
- Admin permission denied
- Loading dashboard charts
- API error state
- Gateway unavailable state

---

## 15. Animation Requirements

Use Motion from `motion.dev` for:

- Page transitions
- Product card entrance animations
- Product gallery transitions
- Modal animations
- Drawer/sidebar animations
- Cart item add/remove animations
- Checkout step transitions
- Admin table row entrance animations
- Dashboard statistic entrance animations
- Toast notifications
- Dropdowns and menus
- Product image hover preview
- Empty state entrance
- Mobile menu transitions

Use Tailwind CSS animation/utilities for:

- Button hover transitions
- Link hover effects
- Loading skeletons
- Simple fades
- Focus rings
- Icon movement
- Subtle pulse effects
- Basic transform/scale transitions

Animation rules:

- Keep transitions fast and clean.
- Respect reduced motion preferences.
- Do not animate large text in a distracting way.
- Do not delay important actions.
- Do not overuse animation on admin tables.
- Use motion to improve clarity, not to decorate everything.

---

## 16. Security Requirements

Security must be planned from the beginning.

- HTTPS only
- Secure password hashing
- Customer and admin auth separation
- Admin RBAC
- Optional admin 2FA
- Protected admin deployment
- Signed API tokens or secure cookies
- CSRF protection if cookie-based auth is used
- CORS restricted to known UI domains
- Rate limiting on auth, checkout, and download endpoints
- Payment webhook signature verification
- Secure private file storage
- Temporary signed download URLs
- Download access validation by order and user
- Audit logs for admin actions
- Input validation on backend
- Output escaping on frontend
- Secure file upload rules
- File type and size validation
- Backup plan for database and files

---

## 17. Business Rules

### Orders

- Pending orders do not unlock downloads.
- Paid orders unlock downloads.
- Failed payments do not unlock downloads.
- Refunded orders may disable downloads depending on policy.
- Each digital product usually has quantity 1.

### Downloads

- Downloads appear only after successful payment.
- Download links must be temporary and protected.
- Show download count.
- Show file version.
- Show license type.
- Log download activity.
- Admin can reset or revoke access.

### Coupons

- Valid coupon updates cart total.
- Invalid coupon shows error.
- Expired coupon shows error.
- Disabled coupon cannot be used.
- Coupon may have max usage and product/category restrictions.

### Product Status

- Published products appear in customer UI.
- Draft products appear only in admin UI.
- Archived products should not be purchasable.

### Licenses

Suggested license types:

| License | Description |
|---|---|
| Personal | Use in personal projects |
| Commercial | Use in client or business projects |
| Extended | Use in larger products with broader rights |
| Developer | Use by one developer or team |

Product pages should clearly explain what buyers can and cannot do with files.

---

## 18. Environment Variables

### ui-customer

```env
NEXT_PUBLIC_APP_NAME=Digital Marketplace
NEXT_PUBLIC_APP_URL=https://marketplace.com
NEXT_PUBLIC_API_BASE_URL=https://api.marketplace.com/api/v1
```

### ui-admin

```env
NEXT_PUBLIC_ADMIN_APP_NAME=Digital Marketplace Admin
NEXT_PUBLIC_ADMIN_APP_URL=https://admin.marketplace.com
NEXT_PUBLIC_API_BASE_URL=https://api.marketplace.com/api/v1
```

### api-gateway / backend

```env
API_PORT=4000
API_BASE_URL=https://api.marketplace.com
DATABASE_URL=postgresql://user:password@host:5432/digital_marketplace
JWT_SECRET=change-me
JWT_REFRESH_SECRET=change-me
CORS_CUSTOMER_ORIGIN=https://marketplace.com
CORS_ADMIN_ORIGIN=https://admin.marketplace.com
STORAGE_PROVIDER=s3
STORAGE_BUCKET_PRIVATE=digital-marketplace-private
STORAGE_BUCKET_PUBLIC=digital-marketplace-public
STRIPE_SECRET_KEY=change-me
STRIPE_WEBHOOK_SECRET=change-me
PAYPAL_CLIENT_ID=change-me
PAYPAL_CLIENT_SECRET=change-me
EMAIL_PROVIDER=resend
EMAIL_API_KEY=change-me
```

---

## 19. Implementation Phases

### Phase 1 — UI Prototype With Mock API

- Build `ui-customer` and `ui-admin` as separate apps.
- Use local mock data.
- Use mock service functions that look like real API calls.
- Keep all types and API calls compatible with the planned backend contract.
- Use Motion and Tailwind animations.

### Phase 2 — Backend Gateway Skeleton

- Build API Gateway.
- Add route groups for public, customer, admin, and webhooks.
- Add auth, RBAC, validation, logging, and error format.
- Return mock backend data or connect to database gradually.

### Phase 3 — Real Backend Modules

- Add database models and migrations.
- Implement products, categories, users, orders, coupons, downloads, and support.
- Implement private file storage.
- Implement signed download links.
- Implement payment webhooks.
- Implement admin audit logs.

### Phase 4 — Production Readiness

- Configure deployments.
- Configure environment variables.
- Configure CORS and security headers.
- Add monitoring and logging.
- Add backups.
- Test full customer and admin flows.

---

## 20. Suggested Implementation Order

1. Create monorepo structure.
2. Create `ui-customer` app.
3. Create `ui-admin` app.
4. Create shared packages for types and API client.
5. Create design system basics.
6. Create mock data.
7. Build customer layout and routes.
8. Build admin layout and routes.
9. Build customer product/catalog/cart/checkout flows.
10. Build customer account/download/order/support flows.
11. Build admin dashboard/product/order/customer flows.
12. Build admin file/coupon/review/support/settings flows.
13. Add Motion and Tailwind animation polish.
14. Add responsive polish.
15. Add API Gateway backend skeleton.
16. Add backend route contracts.
17. Add auth/RBAC skeleton.
18. Add database models/migrations.
19. Connect UI API clients to gateway.
20. Implement real backend modules gradually.
21. Add deployment configs for customer, admin, and backend.
22. Final testing and cleanup.

---

# 21. One-Shot AI Prompt

Copy and paste the prompt below into an AI coding/design tool.

```md
I want to create a complete fullstack-ready digital products marketplace.

The marketplace sells digital files worldwide, including:
- Microservices implementations
- Simple SaaS solutions
- Website templates
- Dashboard templates
- UI/UX templates
- Figma files
- Photoshop/design assets
- Design systems
- Source code packages
- API packages
- Documentation and downloadable files

Use this prompt as the complete source of truth. Make reasonable assumptions where needed and do not stop to ask many clarifying questions.

## Critical Architecture Requirement

The project must have three main parts:

1. `ui-customer`
   - Public customer marketplace website.
   - Separate frontend app.
   - Separate deployment.
   - Example domain: `marketplace.com` or `www.marketplace.com`.

2. `ui-admin`
   - Private admin dashboard website.
   - Separate frontend app.
   - Separate deployment.
   - Example domain: `admin.marketplace.com`.

3. `backend`
   - Shared backend platform for both customer UI and admin UI.
   - Must expose an API Gateway.
   - Example domain: `api.marketplace.com`.
   - The gateway is the single public API entry point for both frontends.

The customer UI and admin UI must not be the same deployment.
They must be two different deployments/apps.
The backend must be separate and must have an API Gateway.

High-level flow:

```txt
ui-customer  ─────┐
                  ├──▶ API Gateway ──▶ backend services/modules ──▶ database/storage/payments/email
ui-admin     ─────┘
```

## Main Goal

Build or prepare a complete fullstack-ready marketplace with:

- Separate customer UI app
- Separate admin UI app
- Backend API Gateway
- Backend modules/services for both UIs
- Shared API client/types
- Mock data support for early frontend work
- Real backend-ready structure
- Responsive design
- Smooth professional animation
- Complete customer flows
- Complete admin flows
- Secure digital file delivery architecture

If building in stages, first create the two frontend apps with mock API functions, but structure everything so they can be connected to the real backend gateway later without rewriting the UI.

## Recommended Stack

Frontend:
- React or Next.js
- Tailwind CSS
- Motion from `motion.dev`
- Tailwind CSS animation utilities for simple effects
- React Hook Form
- Zod
- Reusable components
- Responsive layouts

Backend:
- Node.js/NestJS, Express/Fastify, Laravel, Django, or Spring Boot
- API Gateway
- PostgreSQL or MySQL
- Private object storage for digital files
- Payment provider support such as Stripe/PayPal
- Email provider support
- JWT or secure cookie authentication
- Admin RBAC
- OpenAPI/Swagger docs

Important animation instruction:
Use Motion from `motion.dev` as the main animation library.
Use Tailwind CSS animations only for simple hover effects, loading skeletons, fades, and micro-interactions.
Do not use the Framer website builder unless specifically requested.
Do not overuse animation.
Animations should feel premium, smooth, fast, and professional.
Respect reduced motion preferences.

## Monorepo Structure

Create a structure like:

```txt
digital-marketplace/
  apps/
    ui-customer/
    ui-admin/
    api-gateway/
  services/
    auth-service/
    catalog-service/
    order-service/
    payment-service/
    file-delivery-service/
    customer-service/
    admin-service/
    support-service/
    coupon-service/
    content-service/
    analytics-service/
    notification-service/
    audit-service/
  packages/
    shared-types/
    api-client/
    ui-shared/
    validation/
    config/
  infra/
    docker/
    deploy/
    database/
  docs/
    architecture.md
    api-contracts.md
    deployment.md
    security.md
```

For MVP, the backend can be a modular monolith as long as it still exposes an API Gateway layer and clear modules.

## API Gateway Requirements

The API Gateway must handle:

- API routing
- API versioning with `/api/v1`
- Public, customer, admin, and webhook route groups
- Authentication verification
- Customer/admin role separation
- Admin RBAC
- Request validation
- Rate limiting
- CORS for customer/admin domains only
- Request logging
- Error normalization
- Security headers
- File upload routing
- Payment webhook routing
- Signed download URL generation or delegation
- Health checks
- OpenAPI/Swagger documentation

Route groups:

```txt
/api/v1/public/*
/api/v1/customer/*
/api/v1/admin/*
/api/v1/webhooks/*
```

## Customer UI Routes

Build `ui-customer` with these routes:

```txt
/
/products
/products/:slug
/categories/:slug
/search
/cart
/checkout
/checkout/success
/checkout/failed
/login
/register
/forgot-password
/account
/account/downloads
/account/orders
/account/orders/:id
/account/invoices/:id
/account/profile
/account/support
/account/support/:id
/about
/contact
/faq
/terms
/privacy
/refund-policy
/license-policy
```

## Admin UI Routes

Build `ui-admin` with these routes:

```txt
/admin/login
/admin/dashboard
/admin/products
/admin/products/create
/admin/products/:id/edit
/admin/products/:id/files
/admin/products/:id/versions
/admin/categories
/admin/orders
/admin/orders/:id
/admin/customers
/admin/customers/:id
/admin/files
/admin/download-logs
/admin/coupons
/admin/reviews
/admin/support
/admin/support/:id
/admin/blog
/admin/pages
/admin/reports
/admin/settings
/admin/users
/admin/roles
/admin/audit-logs
```

## Customer Pages to Build

Build and design:

- Home page
- Products listing page
- Product category page
- Product details page
- Search results page
- Cart page
- Checkout page
- Payment success page
- Payment failed page
- Login page
- Register page
- Forgot password page
- Customer dashboard
- My downloads page
- Order history page
- Order details page
- Invoice/receipt page
- Support tickets page
- Support ticket detail page
- Profile settings page
- FAQ page
- About page
- Contact page
- Terms page
- Privacy page
- Refund policy page
- License policy page

## Admin Pages to Build

Build and design:

- Admin login page
- Admin dashboard
- Products list
- Add product
- Edit product
- Product file management
- Product versions and changelog
- Categories management
- Orders list
- Order details
- Customers list
- Customer details
- File library
- Download logs
- Coupons management
- Reviews management
- Support tickets management
- Support ticket detail/reply page
- Blog/content management
- Static pages management
- Reports and analytics
- Settings
- Admin users
- Roles and permissions
- Audit logs

## Backend Modules to Build or Prepare

Prepare backend modules for:

- Auth / users / roles / permissions
- Product catalog
- Categories and tags
- Cart and checkout
- Orders and payments
- Payment webhooks
- Digital file delivery
- Private file storage
- Signed download links
- Download logs
- Customer accounts
- Admin management
- Coupons and promotions
- Reviews
- Support tickets
- CMS/blog/static pages
- Reports and analytics
- Notifications and emails
- Tax/invoices
- Audit logs
- Settings

## Required API Endpoints

Public:

```txt
GET /api/v1/public/products
GET /api/v1/public/products/:slug
GET /api/v1/public/categories
GET /api/v1/public/categories/:slug/products
GET /api/v1/public/search
GET /api/v1/public/pages/:slug
GET /api/v1/public/faqs
```

Customer:

```txt
POST   /api/v1/customer/auth/register
POST   /api/v1/customer/auth/login
POST   /api/v1/customer/auth/logout
POST   /api/v1/customer/auth/forgot-password
POST   /api/v1/customer/auth/reset-password
GET    /api/v1/customer/me
PATCH  /api/v1/customer/me
GET    /api/v1/customer/cart
POST   /api/v1/customer/cart/items
DELETE /api/v1/customer/cart/items/:id
POST   /api/v1/customer/coupons/validate
POST   /api/v1/customer/checkout
GET    /api/v1/customer/orders
GET    /api/v1/customer/orders/:id
GET    /api/v1/customer/invoices/:id
GET    /api/v1/customer/downloads
POST   /api/v1/customer/downloads/:fileId/request-link
GET    /api/v1/customer/support/tickets
POST   /api/v1/customer/support/tickets
GET    /api/v1/customer/support/tickets/:id
POST   /api/v1/customer/support/tickets/:id/replies
```

Admin:

```txt
POST   /api/v1/admin/auth/login
POST   /api/v1/admin/auth/logout
GET    /api/v1/admin/dashboard
GET    /api/v1/admin/products
POST   /api/v1/admin/products
GET    /api/v1/admin/products/:id
PATCH  /api/v1/admin/products/:id
DELETE /api/v1/admin/products/:id
POST   /api/v1/admin/products/:id/publish
POST   /api/v1/admin/products/:id/unpublish
POST   /api/v1/admin/products/:id/archive
GET    /api/v1/admin/products/:id/files
POST   /api/v1/admin/products/:id/files
DELETE /api/v1/admin/products/:id/files/:fileId
GET    /api/v1/admin/products/:id/versions
POST   /api/v1/admin/products/:id/versions
GET    /api/v1/admin/categories
POST   /api/v1/admin/categories
PATCH  /api/v1/admin/categories/:id
DELETE /api/v1/admin/categories/:id
GET    /api/v1/admin/orders
GET    /api/v1/admin/orders/:id
PATCH  /api/v1/admin/orders/:id/status
POST   /api/v1/admin/orders/:id/refund
GET    /api/v1/admin/customers
GET    /api/v1/admin/customers/:id
PATCH  /api/v1/admin/customers/:id/status
GET    /api/v1/admin/files
GET    /api/v1/admin/download-logs
GET    /api/v1/admin/coupons
POST   /api/v1/admin/coupons
PATCH  /api/v1/admin/coupons/:id
POST   /api/v1/admin/coupons/:id/disable
GET    /api/v1/admin/reviews
PATCH  /api/v1/admin/reviews/:id/status
GET    /api/v1/admin/support/tickets
GET    /api/v1/admin/support/tickets/:id
POST   /api/v1/admin/support/tickets/:id/replies
PATCH  /api/v1/admin/support/tickets/:id/status
GET    /api/v1/admin/pages
POST   /api/v1/admin/pages
PATCH  /api/v1/admin/pages/:id
GET    /api/v1/admin/reports/sales
GET    /api/v1/admin/reports/products
GET    /api/v1/admin/reports/customers
GET    /api/v1/admin/settings
PATCH  /api/v1/admin/settings
GET    /api/v1/admin/users
POST   /api/v1/admin/users
PATCH  /api/v1/admin/users/:id
GET    /api/v1/admin/roles
POST   /api/v1/admin/roles
PATCH  /api/v1/admin/roles/:id
GET    /api/v1/admin/audit-logs
```

Webhooks:

```txt
POST /api/v1/webhooks/stripe
POST /api/v1/webhooks/paypal
POST /api/v1/webhooks/storage
POST /api/v1/webhooks/email
```

## Customer Actions to Support

- Browse products
- Search products
- Filter products by category, price, tag, file type, and technology
- Sort products by newest, popular, price, and rating
- Open product details
- View product previews
- Add product to cart
- Remove product from cart
- Apply valid coupon
- Apply invalid coupon
- Continue to checkout
- Simulate or process payment success
- Simulate or process payment failure
- View purchased products
- Download purchased files using signed links
- View order history
- View order details
- View invoice
- Open support ticket
- Reply to support ticket
- Update profile
- Logout

## Admin Actions to Support

- Login to admin panel
- View dashboard statistics
- View sales charts
- View recent orders
- Create product
- Edit product
- Archive/delete product
- Publish/unpublish product
- Upload product files
- Upload preview images
- Manage product versions
- Add changelog
- Manage categories
- View orders
- Change order status
- Simulate or process refund
- View customer details
- View customer purchases
- View download logs
- Create coupon
- Edit coupon
- Disable coupon
- Manage reviews
- Approve/hide reviews
- Manage support tickets
- Reply to support tickets
- Close/reopen tickets
- Manage blog/content pages
- View reports
- Manage settings
- Manage admin users
- Manage roles and permissions
- View audit logs

## Mock Data Requirements

Create realistic mock data for early frontend/prototype mode:

- Products
- Categories
- Customers
- Orders
- Order items
- Product files
- Download logs
- Coupons
- Support tickets
- Reviews
- Admin users
- Roles and permissions
- Dashboard analytics
- Blog posts
- Static pages
- Notifications
- Audit logs

Mock product categories should include:

- Microservices Implementation
- SaaS Solutions
- Website Templates
- Dashboard Templates
- UI/UX Templates
- Figma Kits
- Photoshop Assets
- Design Systems
- API Packages
- Source Code Packages
- Documentation & Guides

Product examples:

- Auth Microservice API Kit
- Payment Gateway Microservice
- Notification Service Package
- SaaS CRM Starter Kit
- Invoice SaaS Dashboard
- Analytics SaaS Template
- Next.js Landing Page Template
- React Admin Dashboard Template
- Figma Mobile App UI Kit
- Figma Design System Kit
- Photoshop Brand Mockup Pack
- Social Media PSD Template Pack
- REST API Starter Package
- Laravel Module Package
- Developer Documentation Template

## Design Style

Create a modern premium digital marketplace design.

The design should feel:

- Clean
- Professional
- Modern
- SaaS-like
- Developer-friendly
- Trustworthy
- Global
- Smooth
- Responsive
- Suitable for selling code products, templates, and digital files

Use:

- Clean typography
- Card-based product grids
- Strong hero section
- Modern dashboard layouts
- Soft shadows
- Rounded corners
- Clear call-to-action buttons
- Product preview sections
- Status badges
- Empty states
- Smooth page transitions
- Mobile-friendly layouts

## Reusable Components

Customer UI:
- Navbar
- Footer
- Hero section
- Product card
- Product grid
- Category card
- Search bar
- Filter sidebar
- Product gallery
- Product details tabs
- Cart item
- Checkout summary
- Coupon form
- Download card
- Order card
- Invoice layout
- Support ticket card
- Profile form

Admin UI:
- Admin sidebar
- Admin topbar
- Dashboard statistic card
- Chart card
- Data table
- Table filters
- Status badge
- Product form
- File upload component
- Changelog editor
- Customer profile card
- Order details card
- Permission matrix
- Audit log row

Shared UI:
- Button
- Input
- Select
- Textarea
- Checkbox
- Radio
- Badge
- Status label
- Modal
- Drawer
- Toast notification
- Confirmation dialog
- Tabs
- Dropdown menu
- Breadcrumb
- Pagination
- Empty state
- Loading skeleton
- Error state
- Success state
- Tooltip
- Avatar
- Card

## UI States

Cover:

- Loading state
- Empty state
- Error state
- Success state
- Disabled state
- Hover state
- Active state
- Focus state
- Permission denied state
- Mobile responsive state
- Gateway unavailable state
- API error state

## Security

Implement or plan:

- HTTPS only
- Secure password hashing
- Separate customer/admin authentication
- Admin RBAC
- Optional admin 2FA
- Protected admin deployment
- Secure cookies or JWT with refresh tokens
- CORS restricted to customer/admin domains
- Rate limiting
- Payment webhook signature validation
- Private digital file storage
- Temporary signed download URLs
- Download access validation
- Audit logs
- Input validation
- Secure file upload rules

## Business Rules

Orders:
- Pending orders do not unlock downloads.
- Paid orders unlock downloads.
- Failed payments do not unlock downloads.
- Refunded orders may disable downloads.
- Each digital product usually has quantity 1.

Downloads:
- Downloads appear only after successful payment.
- Download links must be temporary and protected.
- Show download count.
- Show file version.
- Show license type.
- Log download activity.

Coupons:
- Valid coupon updates cart total.
- Invalid coupon shows error.
- Expired coupon shows error.
- Disabled coupon cannot be used.

Product status:
- Published products appear in customer UI.
- Draft products appear only in admin UI.
- Archived products should not be purchasable.

Licenses:
- Personal license
- Commercial license
- Extended license
- Developer license

## Deployment Requirements

Prepare deployment configuration for:

1. `ui-customer`
   - Public customer frontend
   - Domain: `marketplace.com`
   - Calls API gateway through `NEXT_PUBLIC_API_BASE_URL`

2. `ui-admin`
   - Private admin frontend
   - Domain: `admin.marketplace.com`
   - Calls same API gateway
   - Must not expose customer-only app routes as part of same deployment

3. `api-gateway` / backend
   - Domain: `api.marketplace.com`
   - Routes traffic to backend modules/services
   - Handles auth, RBAC, logging, validation, rate limits, and CORS

## Final Output Expected

Create a complete fullstack-ready project structure and implementation plan.

The final result should include:

- Separate `ui-customer` app
- Separate `ui-admin` app
- Separate backend/API gateway app
- Backend services/modules for both customer and admin features
- Shared API client and types
- Full customer UI pages and flows
- Full admin UI pages and flows
- Mock data and mock API mode for frontend development
- API gateway route contracts
- Backend database model plan
- Secure digital file delivery plan
- Responsive design
- Motion.dev animation plan
- Tailwind styling
- Reusable components
- UI states
- Deployment plan for customer, admin, and backend

Start by creating the monorepo, shared types, API client, frontend apps, backend gateway skeleton, route contracts, mock data, and layouts. Then build the customer UI and admin UI completely, followed by backend modules and integration readiness.
```

---

## 22. Short One-Shot Prompt

Use this shorter version only when the AI tool has limited input length.

```md
Create a fullstack-ready worldwide digital products marketplace for selling downloadable digital files such as microservices, SaaS solutions, templates, UI/UX kits, Photoshop assets, source code packages, API packages, and documentation.

Critical architecture: create three parts:
1. `ui-customer` — public customer marketplace website, separate frontend deployment, example domain `marketplace.com`.
2. `ui-admin` — private admin dashboard website, separate frontend deployment, example domain `admin.marketplace.com`.
3. `backend` with API Gateway — separate backend deployment, example domain `api.marketplace.com`.

Both UIs must call the same API Gateway. The gateway is the single public API entry point and must route to backend services/modules. Customer UI and admin UI must not be the same deployment.

Use React/Next.js, Tailwind CSS, Motion from `motion.dev`, and Tailwind animations for small effects. Do not use the Framer website builder. Keep animations smooth, fast, professional, and accessible.

Backend should include or prepare modules for auth, users, roles, products, categories, cart, checkout, orders, payments, payment webhooks, digital file delivery, private storage, signed download links, customers, admin management, coupons, reviews, support tickets, CMS/pages/blog, reports, notifications, invoices/tax, settings, and audit logs.

API Gateway route groups:
- `/api/v1/public/*`
- `/api/v1/customer/*`
- `/api/v1/admin/*`
- `/api/v1/webhooks/*`

Customer pages: home, products, product details, categories, search, cart, checkout, payment success, payment failed, login, register, forgot password, account dashboard, downloads, orders, order details, invoice, support tickets, profile, FAQ, about, contact, terms, privacy, refund policy, license policy.

Admin pages: login, dashboard, products list, add/edit product, product files, versions/changelog, categories, orders, order details, customers, customer details, file library, download logs, coupons, reviews, support tickets, blog/content, reports, settings, admin users, roles, audit logs.

Customer actions: browse, search, filter, sort, product details, cart, coupon, checkout, payment success/failure, purchased products, signed downloads, orders, invoices, support tickets, profile, logout.

Admin actions: login, dashboard, create/edit/archive/publish products, upload files/previews, versions/changelog, categories, orders, refunds, customers, download logs, coupons, reviews, support, content, reports, settings, users, roles, audit logs.

Use mock data first if needed, but structure API clients/types to connect to the real API Gateway later. Create realistic mock data for products, categories, customers, orders, files, downloads, coupons, tickets, reviews, admins, roles, analytics, pages, notifications, and audit logs.

Make the design modern, premium, SaaS-like, developer-friendly, trustworthy, responsive, and suitable for selling digital files and code products. Include reusable components, loading/empty/error/success states, gateway unavailable/API error states, and deployment configs for all three apps.
```
