FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.12.1 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc turbo.json ./
COPY apps/ui-customer/package.json ./apps/ui-customer/package.json

RUN pnpm install --frozen-lockfile

COPY apps/ui-customer ./apps/ui-customer

RUN pnpm --filter ui-customer run build

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/apps/ui-customer/.next/standalone ./
COPY --from=builder /app/apps/ui-customer/.next/static ./apps/ui-customer/.next/static

EXPOSE 3000

CMD ["node", "apps/ui-customer/server.js"]
