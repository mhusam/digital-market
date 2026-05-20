# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository overview

**IT Solutions Store** — a Turborepo monorepo with three services:

| Service | Tech | Dev port |
|---|---|---|
| `apps/api` | Spring Boot 3.4, Java 21, PostgreSQL (Gradle) | 28080 (Docker) / 8080 (local) |
| `apps/ui-admin` | Next.js 16, React 19, TypeScript | 3000 |
| `apps/ui-customer` | Next.js 16, React 19, TypeScript | 3001 |
| `packages/design-tokens` | CSS variables + Tailwind preset | — |

> **Next.js 16 breaking changes:** Before writing any Next.js code, read the relevant guide in `node_modules/next/dist/docs/`. APIs, conventions, and file structure differ from earlier versions.

## Commands

### Monorepo (from repo root)

```bash
pnpm install          # Install all workspace dependencies
pnpm run dev          # Start all services in parallel (Turbo)
pnpm run build        # Build all apps/packages
pnpm run lint         # ESLint across all workspaces
pnpm run type-check   # TypeScript check across all workspaces
pnpm run format       # Prettier across all workspaces
```

### API (Spring Boot)

```bash
cd apps/api && ./gradlew bootRun   # Start API (requires PostgreSQL)
cd apps/api && ./gradlew test      # Run tests
cd apps/api && ./gradlew bootJar   # Build production JAR

# Or via npm scripts from root:
npm run api:dev
npm run api:build
```

### Docker (full stack)

```bash
cp .env.docker.example .env.docker   # Then edit JWT_SECRET, PayPal, S3, OAuth keys
docker compose --env-file .env.docker up --build -d
curl http://localhost:28080/actuator/health   # Verify API

# Only PostgreSQL (for host-based API dev):
docker compose up postgres -d
```

## Environment setup (local, no Docker)

```bash
# API — pick one approach:
cp apps/api/src/main/resources/application-local.example.yml \
   apps/api/src/main/resources/application-local.yml
export SPRING_PROFILES_ACTIVE=local
# OR: export DATABASE_URL / JWT_SECRET etc. from .env.example

# Next.js apps:
cp apps/ui-admin/.env.local.example apps/ui-admin/.env.local
cp apps/ui-customer/.env.local.example apps/ui-customer/.env.local
```

Demo credentials (seeded by Flyway): **password `Test@123`** for both:
- Admin: `admin` / `admin@local.sellonline`
- Customer: `customer` / `customer@local.sellonline`

## Architecture

### Backend — Spring Modulith modular monolith

Six modules, each with `api/` (facades), `web/` (controllers), `domain/` (entities/services), `internal/` (impl):

| Module | Owns | Exposes |
|---|---|---|
| `identity` | `identity_users` | `IdentityFacade` — auth, JWT, RBAC |
| `catalog` | `catalog_products`, `catalog_product_assets` | `CatalogFacade` — CRUD, S3 signed URLs |
| `ordering` | `ordering_orders`, `ordering_order_lines` | `OrderingFacade` — checkout, status transitions |
| `payments` | `payments_payments` | `PaymentsFacade` — PayPal create/capture, webhook |
| `fulfillment` | `fulfillment_download_events` | `FulfillmentFacade` — signed downloads, audit |
| `platform` | `platform_settings` | Settings CRUD (legal, bank, general) |

**Modularity rule:** no cross-module imports from `internal` packages — only consume `api` facades.

**API route prefix convention:**

| Prefix | Access |
|---|---|
| `/api/v1/admin/**` | `ROLE_ADMIN` only |
| `/api/v1/customer/**` | `ROLE_CUSTOMER` only |
| `/api/v1/store/**` | Public catalog + anonymous checkout; customer paths require `CUSTOMER` JWT |
| `/api/v1/auth/**` | Public (login, register, password reset) |
| `/api/v1/webhooks/**` | Public (PayPal webhook — internally verified) |

**Roles:** exactly two — `ADMIN` and `CUSTOMER`. No other roles without an explicit ADR.

**Database:** PostgreSQL with Flyway migrations (V1–V8). Schema + seed data live in `apps/api/src/main/resources/db/migration/`.

### Frontend — ui-admin (Next.js 16 App Router)

- BFF pattern: all API calls go to `/api/v1/*` on the Next.js app, which proxies to Spring Boot via server-only `API_URL`. JWT stored in an HttpOnly cookie.
- Auth: next-auth v5 beta
- Key libs: SWR, react-hook-form + Zod, date-fns, lucide-react, sonner, react-markdown

### Frontend — ui-customer (Next.js 16 App Router)

- Auth: Auth.js v5 with Google OAuth
- Key libs: cobe (3D globe), lucide-react, react-iconly
- `NEXT_PUBLIC_API_URL` used for client-side API calls

> **Note:** `apps/ui-customer/CLAUDE.md` is outdated — it describes a Vite/React Router SPA but the app is actually Next.js 16 App Router. Disregard that file.

### Shared design tokens (`packages/design-tokens`)

CSS custom properties + a Tailwind preset. Imported by both Next.js apps. Source of truth: `theme.html` in the repo root.

## Payment flows

**PayPal:** checkout → create PayPal order → customer approves → capture. Webhook at `/api/v1/webhooks/paypal` handles backup idempotent capture.

**Bank transfer:** order created with unique `SO-XXXXXXXX` reference → customer pays manually → admin confirms via `POST /api/v1/admin/orders/{id}/mark-paid`.

## CI/CD

- **`ci.yml`**: lint + type-check (Turbo) + Spring Boot tests on every PR
- **`deploy.yml`**: push to `main` triggers Hostinger webhooks + SSH deploy to VPS

Required GitHub secrets: `HOSTINGER_ADMIN_WEBHOOK_URL`, `HOSTINGER_CUSTOMER_WEBHOOK_URL`, `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`.
