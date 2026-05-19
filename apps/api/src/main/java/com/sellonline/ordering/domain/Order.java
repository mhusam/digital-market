package com.sellonline.ordering.domain;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "ordering_orders",
        indexes = {
            @Index(name = "idx_orders_customer_email", columnList = "customerEmail"),
            @Index(name = "idx_orders_payment_ref", columnList = "paymentReference"),
            @Index(name = "idx_orders_customer_id", columnList = "customerId")
        })
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    /** null for guest checkout */
    private UUID customerId;

    @Column(nullable = false, length = 255)
    private String customerEmail;

    @Column(nullable = false, length = 255)
    private String customerName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    @Builder.Default
    private OrderStatus status = OrderStatus.PENDING_PAYMENT;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PaymentMethod paymentMethod;

    /** Unique bank transfer reference, e.g. SO-XXXXXXXX */
    @Column(length = 30)
    private String paymentReference;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal totalAmount;

    @Column(nullable = false, length = 10)
    @Builder.Default
    private String currency = "USD";

    @Column(columnDefinition = "TEXT")
    private String internalNotes;

    /** Token for guest order confirmation page */
    @Column(length = 100)
    private String confirmationToken;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<OrderLine> lines = new ArrayList<>();

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @Column(nullable = false)
    private Instant updatedAt;

    @PrePersist void onCreate() { createdAt = updatedAt = Instant.now(); }
    @PreUpdate void onUpdate() { updatedAt = Instant.now(); }
}
