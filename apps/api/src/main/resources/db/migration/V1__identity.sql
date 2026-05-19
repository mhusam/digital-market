CREATE TABLE identity_users (
    id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email                 VARCHAR(255) NOT NULL,
    password_hash         TEXT NOT NULL,
    name                  VARCHAR(100) NOT NULL,
    role                  VARCHAR(20) NOT NULL CHECK (role IN ('ADMIN', 'CUSTOMER')),
    enabled               BOOLEAN NOT NULL DEFAULT TRUE,
    password_reset_token  VARCHAR(255),
    password_reset_expiry TIMESTAMPTZ,
    created_at            TIMESTAMPTZ NOT NULL,
    updated_at            TIMESTAMPTZ NOT NULL,
    CONSTRAINT uq_users_email UNIQUE (email)
);
