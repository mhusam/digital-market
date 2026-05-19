CREATE TABLE platform_settings (
    key         VARCHAR(100) PRIMARY KEY,
    value       TEXT,
    description VARCHAR(255)
);

INSERT INTO platform_settings (key, value, description) VALUES
    ('store.name',          'IT Solutions Store',   'Public store display name'),
    ('store.tagline',       'Quality IT products, delivered digitally', 'Storefront tagline'),
    ('store.currency',      'USD',                  'Default display currency'),
    ('store.contact-email', '',                     'Support contact email'),
    ('legal.terms',         '',                     'Terms of service body (markdown)'),
    ('legal.privacy',       '',                     'Privacy policy body (markdown)'),
    ('legal.refunds',       '',                     'Refund policy body (markdown)'),
    ('bank.enabled',        'false',                'Enable bank transfer payment method'),
    ('bank.details',        '',                     'Bank account details shown to customer'),
    ('bank.reference-hint', 'Include reference: {ref}', 'Bank transfer reference instruction');
