package com.sellonline.catalog.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "catalog_product_assets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductAsset {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private String storageKey;

    @Column(nullable = false, length = 255)
    private String filename;

    @Column(length = 20)
    private String contentType;

    private Long sizeBytes;

    private String checksum;

    @Column(nullable = false, updatable = false)
    private Instant uploadedAt;

    @PrePersist
    void onUpload() {
        uploadedAt = Instant.now();
    }
}
