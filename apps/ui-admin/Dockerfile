FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.12.1 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc turbo.json ./
COPY apps/ui-admin ./apps/ui-admin
COPY packages/api-client ./packages/api-client
COPY packages/shared-types ./packages/shared-types
COPY packages/design-tokens ./packages/design-tokens

RUN pnpm install --frozen-lockfile

ARG NEXT_PUBLIC_CUSTOMER_URL=http://localhost:23001
ARG NEXT_PUBLIC_PAYPAL_MODE=sandbox
ENV NEXT_PUBLIC_CUSTOMER_URL=${NEXT_PUBLIC_CUSTOMER_URL}
ENV NEXT_PUBLIC_PAYPAL_MODE=${NEXT_PUBLIC_PAYPAL_MODE}
ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm --filter ui-admin run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/apps/ui-admin/.next/standalone ./
COPY --from=builder /app/apps/ui-admin/.next/static ./apps/ui-admin/.next/static
COPY --from=builder /app/apps/ui-admin/public ./apps/ui-admin/public

EXPOSE 3000
CMD ["node", "apps/ui-admin/server.js"]
