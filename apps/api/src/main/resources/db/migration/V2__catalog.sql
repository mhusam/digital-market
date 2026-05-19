CREATE TABLE catalog_products (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title       VARCHAR(255) NOT NULL,
    slug        VARCHAR(100) NOT NULL,
    description TEXT,
    price       NUMERIC(12, 2) NOT NULL,
    currency    VARCHAR(10) NOT NULL DEFAULT 'USD',
    status      VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    created_at  TIMESTAMPTZ NOT NULL,
    updated_at  TIMESTAMPTZ NOT NULL,
    CONSTRAINT uq_products_slug UNIQUE (slug),
    CONSTRAINT chk_products_status CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED'))
);

CREATE INDEX idx_products_slug ON catalog_products (slug);

CREATE TABLE catalog_product_assets (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id   UUID NOT NULL REFERENCES catalog_products (id) ON DELETE CASCADE,
    storage_key  TEXT NOT NULL,
    filename     VARCHAR(255) NOT NULL,
    content_type VARCHAR(20),
    size_bytes   BIGINT,
    checksum     VARCHAR(255),
    uploaded_at  TIMESTAMPTZ NOT NULL
);
