package com.sellonline.payments.api;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

/** Public API of the Payments module. */
public interface PaymentsFacade {
    CreatePayPalOrderResult createPayPalOrder(UUID orderId);
    CaptureResult capturePayPalOrder(String paypalOrderId, UUID internalOrderId);
    void handlePayPalWebhook(String rawBody, String transmissionId, String certUrl,
                             String authAlgo, String transmissionSig, String transmissionTime);
    Page<PaymentDto> listPayments(String provider, String status, Pageable pageable);
    PaymentDto getPayment(UUID paymentId);
}
