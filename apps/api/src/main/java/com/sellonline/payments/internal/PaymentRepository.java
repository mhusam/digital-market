package com.sellonline.payments.internal;

import com.sellonline.payments.domain.Payment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PaymentRepository extends JpaRepository<Payment, UUID> {
    Optional<Payment> findByIdempotencyKey(String key);
    Optional<Payment> findByProviderIntentId(String paypalOrderId);
    Page<Payment> findByProviderAndStatus(String provider, String status, Pageable pageable);
    Page<Payment> findByProvider(String provider, Pageable pageable);
    Page<Payment> findByStatus(String status, Pageable pageable);
}
