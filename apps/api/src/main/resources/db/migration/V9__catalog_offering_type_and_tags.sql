ALTER TABLE catalog_products
    ADD COLUMN IF NOT EXISTS offering_type VARCHAR(20) NOT NULL DEFAULT 'PRODUCT',
    ADD COLUMN IF NOT EXISTS tech_tags_csv TEXT NOT NULL DEFAULT '';

UPDATE catalog_products
SET offering_type = 'PRODUCT'
WHERE offering_type IS NULL OR offering_type = '';

UPDATE catalog_products
SET tech_tags_csv = CASE
    WHEN lower(title) LIKE '%server%' THEN 'backend,devops'
    WHEN lower(title) LIKE '%sql%' THEN 'backend,data'
    WHEN lower(title) LIKE '%postgresql%' THEN 'backend,data'
    WHEN lower(title) LIKE '%kafka%' THEN 'backend,data'
    WHEN lower(title) LIKE '%visual studio%' THEN 'dotnet,tools'
    WHEN lower(title) LIKE '%pycharm%' THEN 'python,tools'
    WHEN lower(title) LIKE '%webstorm%' THEN 'frontend,javascript,tools'
    WHEN lower(title) LIKE '%figma%' THEN 'frontend,design'
    WHEN lower(title) LIKE '%sketch%' THEN 'frontend,design'
    WHEN lower(title) LIKE '%adobe%' THEN 'design,creative'
    WHEN lower(title) LIKE '%terraform%' THEN 'devops,infrastructure'
    WHEN lower(title) LIKE '%ansible%' THEN 'devops,automation'
    WHEN lower(title) LIKE '%docker%' THEN 'devops,containers'
    WHEN lower(title) LIKE '%kubernetes%' THEN 'devops,containers'
    ELSE COALESCE(tech_tags_csv, '')
END
WHERE tech_tags_csv IS NULL OR tech_tags_csv = '';
