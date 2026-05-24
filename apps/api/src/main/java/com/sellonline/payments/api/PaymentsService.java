package com.sellonline.payments.api;

import com.fasterxml.jackson.databind.JsonNode;
import com.sellonline.ordering.api.OrderDto;
import com.sellonline.ordering.api.OrderingFacade;
import com.sellonline.payments.api.CreatePayPalOrderResult;
import com.sellonline.payments.api.CaptureResult;
import com.sellonline.payments.api.PaymentDto;
import com.sellonline.payments.api.PaymentsException;
import com.sellonline.payments.api.PaymentsFacade;
import com.sellonline.payments.domain.Payment;
import com.sellonline.payments.internal.PayPalClient;
import com.sellonline.payments.internal.PaymentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentsService implements PaymentsFacade {

    private final PaymentRepository paymentRepo;
    private final PayPalClient paypal;
    private final OrderingFacade ordering;

    @Value("${app.paypal.return-url}")
    private String returnUrl;

    @Value("${app.paypal.cancel-url}")
    private String cancelUrl;

    @Override
    @Transactional
    public CreatePayPalOrderResult createPayPalOrder(UUID orderId) {
        String idempotencyKey = "paypal-create-" + orderId;
        paymentRepo.findByIdempotencyKey(idempotencyKey).ifPresent(p -> {
            throw new PaymentsException("PayPal order already created for this order");
        });

        OrderDto order = ordering.getOrder(orderId);
        String token = paypal.getAccessToken();
        String paypalReturnUrl = returnUrl + "?orderId=" + orderId + "&confirmationToken=" + order.confirmationToken();
        JsonNode result = paypal.createOrder(token, order.currency(),
                order.totalAmount().toPlainString(), paypalReturnUrl, cancelUrl);

        String paypalOrderId = result.get("id").asText();
        String approvalUrl = result.get("links").elements().next().get("href").asText();
        for (JsonNode link : result.get("links")) {
            if ("approve".equals(link.get("rel").asText())) {
                approvalUrl = link.get("href").asText();
                break;
            }
        }

        Payment payment = Payment.builder()
                .orderId(orderId)
                .provider("PAYPAL")
                .providerIntentId(paypalOrderId)
                .status("CREATED")
                .idempotencyKey(idempotencyKey)
                .amount(order.totalAmount())
                .currency(order.currency())
                .build();
        paymentRepo.save(payment);

        return new CreatePayPalOrderResult(paypalOrderId, approvalUrl);
    }

    @Override
    @Transactional
    public CaptureResult capturePayPalOrder(String paypalOrderId, UUID internalOrderId) {
        String idempotencyKey = "paypal-capture-" + internalOrderId;
        var existing = paymentRepo.findByIdempotencyKey(idempotencyKey);
        if (existing.isPresent() && "CAPTURED".equals(existing.get().getStatus())) {
            return new CaptureResult(existing.get().getProviderCaptureId(), "CAPTURED");
        }

        String token = paypal.getAccessToken();
        JsonNode result = paypal.captureOrder(token, paypalOrderId);
        String status = result.get("status").asText();

        Payment payment = paymentRepo.findByProviderIntentId(paypalOrderId)
                .orElseGet(() -> Payment.builder()
                        .orderId(internalOrderId)
                        .provider("PAYPAL")
                        .providerIntentId(paypalOrderId)
                        .idempotencyKey(idempotencyKey)
                        .build());

        String captureId = null;
        if ("COMPLETED".equals(status)) {
            var captures = result.path("purchase_units").get(0).path("payments").path("captures");
            if (captures.size() > 0) captureId = captures.get(0).get("id").asText();
            payment.setProviderCaptureId(captureId);
            payment.setStatus("CAPTURED");
            paymentRepo.save(payment);
            ordering.transitionToPaid(internalOrderId);
        } else {
            payment.setStatus("FAILED");
            paymentRepo.save(payment);
        }

        return new CaptureResult(captureId, status);
    }

    @Override
    @Transactional
    public void handlePayPalWebhook(String rawBody, String transmissionId, String certUrl,
                                    String authAlgo, String transmissionSig, String transmissionTime) {
        boolean valid = paypal.verifyWebhookSignature(transmissionId, certUrl, authAlgo,
                transmissionSig, transmissionTime, rawBody);
        if (!valid) {
            log.warn("PayPal webhook signature verification failed");
            return;
        }

        try {
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            JsonNode event = mapper.readTree(rawBody);
            String eventType = event.get("event_type").asText();
            if ("PAYMENT.CAPTURE.COMPLETED".equals(eventType)) {
                String paypalOrderId = event.path("resource").path("supplementary_data")
                        .path("related_ids").path("order_id").asText(null);
                if (paypalOrderId == null) {
                    log.warn("Webhook: cannot determine PayPal order id from event");
                    return;
                }
                String key = "webhook-capture-" + event.get("id").asText();
                if (paymentRepo.findByIdempotencyKey(key).isPresent()) return; // idempotent

                paymentRepo.findByProviderIntentId(paypalOrderId).ifPresent(p -> {
                    if (!"CAPTURED".equals(p.getStatus())) {
                        p.setStatus("CAPTURED");
                        p.setRawWebhookPayload(rawBody);
                        p.setIdempotencyKey(key);
                        paymentRepo.save(p);
                        ordering.transitionToPaid(p.getOrderId());
                    }
                });
            }
        } catch (Exception e) {
            log.error("Error processing webhook: {}", e.getMessage(), e);
        }
    }

    @Override @Transactional(readOnly = true)
    public Page<PaymentDto> listPayments(String provider, String status, Pageable pageable) {
        Page<Payment> page;
        if (provider != null && status != null) {
            page = paymentRepo.findByProviderAndStatus(provider, status, pageable);
        } else if (provider != null) {
            page = paymentRepo.findByProvider(provider, pageable);
        } else if (status != null) {
            page = paymentRepo.findByStatus(status, pageable);
        } else {
            page = paymentRepo.findAll(pageable);
        }
        return page.map(this::toDto);
    }

    @Override @Transactional(readOnly = true)
    public PaymentDto getPayment(UUID id) {
        return paymentRepo.findById(id).map(this::toDto)
                .orElseThrow(() -> new PaymentsException("Payment not found"));
    }

    private PaymentDto toDto(Payment p) {
        return new PaymentDto(p.getId(), p.getOrderId(), p.getProvider(), p.getProviderIntentId(),
                p.getProviderCaptureId(), p.getStatus(), p.getAmount(), p.getCurrency(), p.getCreatedAt());
    }
}
