package com.sellonline.payments.domain;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "payments_payments",
        indexes = @Index(name = "idx_payments_order_id", columnList = "orderId"))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID orderId;

    @Column(nullable = false, length = 30)
    private String provider;   // PAYPAL | BANK_TRANSFER

    @Column(length = 100)
    private String providerIntentId;   // PayPal order id

    @Column(length = 100)
    private String providerCaptureId;  // PayPal capture id

    @Column(nullable = false, length = 30)
    private String status;  // CREATED | CAPTURED | FAILED | CANCELLED

    @Column(nullable = false, length = 100)
    private String idempotencyKey;

    @Column(precision = 12, scale = 2)
    private BigDecimal amount;

    @Column(length = 10)
    private String currency;

    @Column(columnDefinition = "TEXT")
    private String rawWebhookPayload;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @Column(nullable = false)
    private Instant updatedAt;

    @PrePersist void onCreate() { createdAt = updatedAt = Instant.now(); }
    @PreUpdate void onUpdate() { updatedAt = Instant.now(); }
}
