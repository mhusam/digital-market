CREATE TABLE payments_payments (
    id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id              UUID NOT NULL,
    provider              VARCHAR(30) NOT NULL,
    provider_intent_id    VARCHAR(100),
    provider_capture_id   VARCHAR(100),
    status                VARCHAR(30) NOT NULL,
    idempotency_key       VARCHAR(100) NOT NULL,
    amount                NUMERIC(12, 2),
    currency              VARCHAR(10),
    raw_webhook_payload   TEXT,
    created_at            TIMESTAMPTZ NOT NULL,
    updated_at            TIMESTAMPTZ NOT NULL,
    CONSTRAINT uq_payments_idempotency UNIQUE (idempotency_key)
);

CREATE INDEX idx_payments_order_id ON payments_payments (order_id);
