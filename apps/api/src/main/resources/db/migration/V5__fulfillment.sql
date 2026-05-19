CREATE TABLE fulfillment_download_events (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id       UUID NOT NULL,
    asset_id       UUID NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    ip_address     VARCHAR(50),
    user_agent     VARCHAR(500),
    downloaded_at  TIMESTAMPTZ NOT NULL
);

CREATE INDEX idx_dl_events_order_id ON fulfillment_download_events (order_id);
CREATE INDEX idx_dl_events_asset_id ON fulfillment_download_events (asset_id);
