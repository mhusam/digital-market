package com.sellonline.payments.web;

import com.sellonline.payments.api.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class PaymentsController {

    private final PaymentsFacade payments;

    @PostMapping("/api/v1/store/checkout/paypal/create")
    public CreatePayPalOrderResult createPayPalOrder(@RequestBody Map<String, String> body) {
        return payments.createPayPalOrder(UUID.fromString(body.get("orderId")));
    }

    @PostMapping("/api/v1/store/checkout/paypal/capture")
    public CaptureResult capturePayPalOrder(@RequestBody Map<String, String> body) {
        return payments.capturePayPalOrder(body.get("paypalOrderId"), UUID.fromString(body.get("orderId")));
    }

    @PostMapping("/api/v1/webhooks/paypal")
    public ResponseEntity<Void> paypalWebhook(
            @RequestBody String rawBody,
            @RequestHeader("PAYPAL-TRANSMISSION-ID") String transmissionId,
            @RequestHeader("PAYPAL-CERT-URL") String certUrl,
            @RequestHeader("PAYPAL-AUTH-ALGO") String authAlgo,
            @RequestHeader("PAYPAL-TRANSMISSION-SIG") String transmissionSig,
            @RequestHeader("PAYPAL-TRANSMISSION-TIME") String transmissionTime) {
        payments.handlePayPalWebhook(rawBody, transmissionId, certUrl, authAlgo, transmissionSig, transmissionTime);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/api/v1/admin/payments")
    @PreAuthorize("hasRole('ADMIN')")
    public Page<PaymentDto> list(
            @RequestParam(required = false) String provider,
            @RequestParam(required = false) String status,
            Pageable pageable) {
        return payments.listPayments(provider, status, pageable);
    }

    @GetMapping("/api/v1/admin/payments/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public PaymentDto get(@PathVariable UUID id) {
        return payments.getPayment(id);
    }
}
