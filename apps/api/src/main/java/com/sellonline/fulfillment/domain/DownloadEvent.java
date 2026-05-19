package com.sellonline.fulfillment.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "fulfillment_download_events",
        indexes = {
            @Index(name = "idx_dl_events_order_id", columnList = "orderId"),
            @Index(name = "idx_dl_events_asset_id", columnList = "assetId")
        })
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class DownloadEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID orderId;

    @Column(nullable = false)
    private UUID assetId;

    @Column(nullable = false, length = 255)
    private String customerEmail;

    @Column(length = 50)
    private String ipAddress;

    @Column(length = 500)
    private String userAgent;

    @Column(nullable = false, updatable = false)
    private Instant downloadedAt;

    @PrePersist void onCreate() { downloadedAt = Instant.now(); }
}
