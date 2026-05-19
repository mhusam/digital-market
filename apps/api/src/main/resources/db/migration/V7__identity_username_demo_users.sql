-- Login identifier: optional username (unique when set). Demo accounts for local/dev.
ALTER TABLE identity_users ADD COLUMN IF NOT EXISTS username VARCHAR(64);

CREATE UNIQUE INDEX IF NOT EXISTS uq_identity_users_username_lower
    ON identity_users (LOWER(username))
    WHERE username IS NOT NULL;

-- Password for both: Test@123 (BCrypt, strength 10; verified in DemoPasswordHashTest)
INSERT INTO identity_users (id, email, username, password_hash, name, role, enabled, created_at, updated_at)
SELECT gen_random_uuid(),
       'admin@local.sellonline',
       'admin',
       '$2y$10$qNkPKiSdYA2MkVLQim4oBOgYmEivBh/M5Zg2Vg2rnSjwAJnCQ0e2W',
       'Demo Admin',
       'ADMIN',
       true,
       now(),
       now()
WHERE NOT EXISTS (
    SELECT 1 FROM identity_users WHERE LOWER(COALESCE(username, '')) = 'admin'
       OR LOWER(email) = LOWER('admin@local.sellonline')
);

INSERT INTO identity_users (id, email, username, password_hash, name, role, enabled, created_at, updated_at)
SELECT gen_random_uuid(),
       'customer@local.sellonline',
       'customer',
       '$2y$10$qNkPKiSdYA2MkVLQim4oBOgYmEivBh/M5Zg2Vg2rnSjwAJnCQ0e2W',
       'Demo Customer',
       'CUSTOMER',
       true,
       now(),
       now()
WHERE NOT EXISTS (
    SELECT 1 FROM identity_users WHERE LOWER(COALESCE(username, '')) = 'customer'
       OR LOWER(email) = LOWER('customer@local.sellonline')
);
