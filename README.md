# IT Solutions Store

A full-stack digital IT products store — monorepo with a Spring Boot API, Next.js admin, and Next.js customer storefront.

## Repository layout

```
sell-online/
  docker-compose.yml         # Postgres + API + UIs (unique host ports)
  .env.docker.example        # Template for docker compose env
  theme.html                 # Design reference — source of truth for tokens
  package.json               # Turborepo root (pnpm workspaces: ui-admin, ui-customer)
  pnpm-workspace.yaml
  turbo.json
  apps/
    api/                     # Spring Boot 3.4 modular monolith (Gradle)
      src/main/resources/application-local.example.yml  # optional local overrides template
    ui-admin/                # Next.js 16 — ADMIN portal (port 3000)
    ui-customer/             # Next.js 16 — Customer storefront (port 3001)
  packages/
    design-tokens/           # Shared CSS variables + Tailwind preset from theme.html
```

## Prerequisites

- **Node.js** 20+ and **pnpm** 10+ (`corepack enable` if needed)
- **Java** 21+ (OpenJDK recommended)
- **Gradle** 9+ (wrapper included, no global install needed)
- **PostgreSQL** 15+ running locally or a hosted database (e.g. Neon)

## Quick start

### Docker Compose (PostgreSQL + API + UIs)

The stack uses **PostgreSQL only** as the database (no H2 in production paths). Each service is published on a **distinct host port** so it does not collide with other projects:

| Service | Host URL | Container port |
| --- | --- | --- |
| PostgreSQL | `localhost:25432` | 5432 |
| API | `http://localhost:28080` | 8080 |
| ui-admin | `http://localhost:23000` | 3000 |
| ui-customer | `http://localhost:23001` | 3000 |

```bash
cp .env.docker.example .env.docker
# Edit JWT_SECRET; optionally PayPal / S3 / Google OAuth keys

docker compose --env-file .env.docker up --build -d
```

**Verify:** API health → `curl http://localhost:28080/actuator/health`  
**Admin login:** http://localhost:23000/login — `admin` / `Test@123` (demo user from Flyway)  
**Storefront:** http://localhost:23001  

**ui-admin:** Calls go to `/api/v1/*` on the Next.js app (BFF). The BFF proxies to Spring Boot using `API_URL=http://api:8080` and stores the JWT in an HttpOnly cookie (`COOKIE_SECURE=false` for local HTTP).  

**ui-customer:** Uses `NEXT_PUBLIC_API_URL=http://localhost:28080` for future API calls. Google sign-in needs real `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` in `.env.docker` (placeholders in the example file are not valid OAuth credentials).

Connect with `psql` from your machine:

```bash
psql "postgresql://sell_online:sell_online@localhost:25432/sell_online"
```

The API container uses `SPRING_PROFILES_ACTIVE=docker` (disables JavaMail auto-config so the app starts without SMTP). JDBC URL inside Docker is `jdbc:postgresql://postgres:5432/sell_online`.

To run **only PostgreSQL** (e.g. while developing the API on the host with `./gradlew bootRun`):

```bash
docker compose up postgres -d
# Then set DATABASE_URL=jdbc:postgresql://localhost:25432/sell_online (and matching user/password).
```

### Local development (without Docker)

#### 1. Configure environment

**API — choose one:**

- **Environment variables** (recommended): export the variables from the repo root [`.env.example`](.env.example) (Spring Boot binds `DATABASE_URL`, `JWT_SECRET`, `PAYPAL_*`, etc. to `application.yml` placeholders). You can copy that file to `.env` and run `set -a && source .env && set +a` in your shell before `bootRun`.
- **Profile file**: copy the local template and activate the `local` profile so Spring merges overrides on top of `application.yml`:

```bash
cp apps/api/src/main/resources/application-local.example.yml \
   apps/api/src/main/resources/application-local.yml
# Edit credentials, then:
export SPRING_PROFILES_ACTIVE=local
```

**Next.js apps:**

```bash
cp apps/ui-admin/.env.local.example apps/ui-admin/.env.local
cp apps/ui-customer/.env.local.example apps/ui-customer/.env.local
```

#### 2. Run the API

```bash
# Requires PostgreSQL running and DATABASE_URL (or application-local.yml + profile local)
npm run api:dev
# Or directly:
cd apps/api && ./gradlew bootRun
```

On first run, Flyway applies migrations creating all tables, seed settings, and **demo users** (see below).

#### 3. Install dependencies & run the UIs

```bash
# From repo root
pnpm install
pnpm run dev

# Or individually:
cd apps/ui-admin && pnpm run dev    # → http://localhost:3000
cd apps/ui-customer && pnpm run dev # → http://localhost:3001
```

#### 4. Demo sign-in (Flyway)

After migrations, sign in with **email or username** (case-insensitive). Password for both: **`Test@123`**.

| Role | Username | Email | Password | Use in |
| --- | --- | --- | --- | --- |
| `ADMIN` | `admin` | `admin@local.sellonline` | `Test@123` | ui-admin |
| `CUSTOMER` | `customer` | `customer@local.sellonline` | `Test@123` | ui-customer |

Replace or delete these rows in production and use strong secrets.

#### 5. Extra admin (optional SQL)

To add another admin, insert a row with a unique `username` and bcrypt `password_hash`:

```sql
INSERT INTO identity_users (id, email, username, password_hash, name, role, enabled, created_at, updated_at)
VALUES (gen_random_uuid(), 'you@example.com', 'you',
        '$2a$12$yourBcryptHashHere', 'Your Name', 'ADMIN', true, now(), now());
```

Generate a bcrypt hash: `htpasswd -bnBC 12 "" yourpassword | tr -d ':\n'`

## Architecture

### Backend modules (Spring Modulith)

| Module | Owns | Exposes |
| --- | --- | --- |
| `identity` | `identity_users` | `IdentityFacade` — auth, JWT, RBAC |
| `catalog` | `catalog_products`, `catalog_product_assets` | `CatalogFacade` — CRUD, S3 upload, signed URLs |
| `ordering` | `ordering_orders`, `ordering_order_lines` | `OrderingFacade` — checkout, status transitions |
| `payments` | `payments_payments` | `PaymentsFacade` — PayPal create/capture, webhook |
| `fulfillment` | `fulfillment_download_events` | `FulfillmentFacade` — signed downloads, audit |
| `platform` | `platform_settings` | Settings CRUD (legal, bank, general) |

**Modularity rule:** no cross-module imports of `internal` packages — only `api` facades.

### API route prefix convention

| Prefix | Access |
| --- | --- |
| `/api/v1/admin/**` | ROLE_ADMIN only |
| `/api/v1/customer/**` | ROLE_CUSTOMER only |
| `/api/v1/store/**` | Mixed: public catalog/settings + anonymous checkout/confirmation; customer account paths require `CUSTOMER` JWT; PayPal webhooks on `/api/v1/webhooks/**` |
| `/api/v1/auth/**` | Public (login, register, password reset) |
| `/api/v1/webhooks/**` | Public (PayPal webhook — internally verified) |

### Roles

Exactly **two roles** in the system: `ADMIN` and `CUSTOMER`. No other roles without an explicit ADR.

## Payment flows

### PayPal

1. Customer selects PayPal at checkout → POST `/api/v1/store/checkout` → order created as `PENDING_PAYMENT`
2. POST `/api/v1/store/checkout/paypal/create` → API calls PayPal, returns approval URL
3. Customer approves on PayPal → redirected to `/checkout/success?orderId=...&token=...`
4. POST `/api/v1/store/checkout/paypal/capture` → API captures → order → `PAID`
5. (Backup) PayPal fires `PAYMENT.CAPTURE.COMPLETED` webhook → `POST /api/v1/webhooks/paypal` → idempotent capture → order → `PAID`

**Webhook URL** (configure in PayPal dashboard): `https://your-api-domain.com/api/v1/webhooks/paypal`

### Bank transfer

1. Customer selects Bank transfer → order created as `PENDING_PAYMENT` with unique `SO-XXXXXXXX` reference
2. Customer sees bank details + reference code on `/checkout/bank-instructions`
3. Admin confirms receipt in ui-admin → `POST /api/v1/admin/orders/{id}/mark-paid` → order → `PAID`

## Deployment

### Hostinger (production)

| Service | Hostinger product | Auto-deploy |
| --- | --- | --- |
| ui-admin | Node.js Web Apps (Business/Cloud plan) | GitHub push to `main` via webhook |
| ui-customer | Node.js Web Apps (Business/Cloud plan) | GitHub push to `main` via webhook |
| Spring Boot API + PostgreSQL | VPS KVM 1 + Docker Manager | SSH + `docker compose up` via GitHub Actions |

#### 1. Hostinger VPS — Spring Boot API + PostgreSQL

1. Create a **Hostinger KVM 1 VPS** and select the Docker template (Docker + Docker Compose pre-installed).
2. SSH into the VPS and clone the repo:
   ```bash
   git clone https://github.com/your-user/sell-online.git ~/sell-online
   cd ~/sell-online
   cp .env.docker.example .env.docker
   # Fill in JWT_SECRET, POSTGRES_PASSWORD, CORS_ALLOWED_ORIGINS, optional PayPal/S3
   ```
3. Start the stack:
   ```bash
   docker compose --env-file .env.docker up -d
   ```
4. Add the VPS SSH key as `VPS_SSH_KEY` secret in your GitHub repo (Settings → Secrets).
   Also add `VPS_HOST` and `VPS_USER` secrets.

CORS_ALLOWED_ORIGINS must include your Hostinger domain, e.g.:
`https://admin.yourdomain.com,https://yourdomain.com`

#### 2. Hostinger Node.js Web Apps — ui-admin

1. hPanel → Web Apps → Node.js Apps → Add New → import GitHub repo
2. Set app root: `apps/ui-admin`
3. Install command: `npm ci`
4. Build command: `npm run build --workspace=apps/ui-admin`
5. Start command: `node apps/ui-admin/.next/standalone/apps/ui-admin/server.js`
6. Environment variables:
   - `API_URL=https://your-vps-ip:28080` (server-only — never `NEXT_PUBLIC_`)
   - `NEXT_PUBLIC_CUSTOMER_URL=https://yourdomain.com`
   - `NEXT_PUBLIC_PAYPAL_MODE=live`
7. Copy the webhook URL from hPanel and save as `HOSTINGER_ADMIN_WEBHOOK_URL` in GitHub Secrets.

#### 3. Hostinger Node.js Web Apps — ui-customer

1. Same process as ui-admin — separate Node.js App
2. Set app root: `apps/ui-customer`
3. Start command: `node apps/ui-customer/.next/standalone/apps/ui-customer/server.js`
4. Environment variables:
   - `NEXT_PUBLIC_API_URL=https://your-vps-ip:28080`
   - `AUTH_SECRET=<generated with: openssl rand -base64 32>`
   - `AUTH_GOOGLE_ID=<from Google Cloud Console>`
   - `AUTH_GOOGLE_SECRET=<from Google Cloud Console>`
5. Copy the webhook URL and save as `HOSTINGER_CUSTOMER_WEBHOOK_URL` in GitHub Secrets.

#### 4. CI/CD — GitHub Actions

Two workflows are pre-configured in `.github/workflows/`:

- **`ci.yml`** — Runs on every PR: lint + type-check (Turbo) + Spring Boot test + JAR build
- **`deploy.yml`** — Runs on push to `main`: triggers Hostinger webhook rebuilds + SSH deploy to VPS

Required GitHub repository secrets:

| Secret | Value |
| --- | --- |
| `HOSTINGER_ADMIN_WEBHOOK_URL` | From hPanel → ui-admin webhook |
| `HOSTINGER_CUSTOMER_WEBHOOK_URL` | From hPanel → ui-customer webhook |
| `VPS_HOST` | VPS IP address |
| `VPS_USER` | SSH username (e.g. `root`) |
| `VPS_SSH_KEY` | Private SSH key for VPS access |

## CSV export

From ui-admin → Orders → **Export CSV** button exports all filtered orders.
For download audit exports: Orders → Order detail → Downloads section → Export.

## Operational runbook

| Task | How |
| --- | --- |
| Confirm bank payment | ui-admin → Orders → Mark as paid |
| Resend download email | ui-admin → Orders → Resend email |
| View download audit | ui-admin → Orders → Download section |
| Edit legal content | ui-admin → Settings → Legal |
| Enable bank transfer | ui-admin → Settings → Bank transfer |
| Rotate JWT secret | Update `JWT_SECRET` env var + restart API (invalidates all sessions) |
| PayPal sandbox → live | Set `PAYPAL_MODE=live`, `PAYPAL_BASE_URL=https://api-m.paypal.com`, swap credentials |
