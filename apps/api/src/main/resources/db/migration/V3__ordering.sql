CREATE TABLE ordering_orders (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id         UUID,
    customer_email      VARCHAR(255) NOT NULL,
    customer_name       VARCHAR(255) NOT NULL,
    status              VARCHAR(30) NOT NULL DEFAULT 'PENDING_PAYMENT',
    payment_method      VARCHAR(20) NOT NULL,
    payment_reference   VARCHAR(30),
    total_amount        NUMERIC(12, 2) NOT NULL,
    currency            VARCHAR(10) NOT NULL DEFAULT 'USD',
    internal_notes      TEXT,
    confirmation_token  VARCHAR(100),
    created_at          TIMESTAMPTZ NOT NULL,
    updated_at          TIMESTAMPTZ NOT NULL,
    CONSTRAINT chk_orders_status CHECK (status IN ('PENDING_PAYMENT', 'PAID', 'FULFILLED', 'CANCELLED', 'REFUNDED'))
);

CREATE INDEX idx_orders_customer_email ON ordering_orders (customer_email);
CREATE INDEX idx_orders_payment_ref    ON ordering_orders (payment_reference);
CREATE INDEX idx_orders_customer_id    ON ordering_orders (customer_id);

CREATE TABLE ordering_order_lines (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id       UUID NOT NULL REFERENCES ordering_orders (id) ON DELETE CASCADE,
    product_id     UUID NOT NULL,
    product_title  VARCHAR(255) NOT NULL,
    unit_price     NUMERIC(12, 2) NOT NULL,
    quantity       INT NOT NULL DEFAULT 1
);
