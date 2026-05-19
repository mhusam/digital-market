package com.sellonline.payments.internal;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.util.Base64;
import java.util.Map;

@Component
@Slf4j
public class PayPalClient {

    private final RestClient restClient;
    private final ObjectMapper mapper;
    private final String clientId;
    private final String clientSecret;
    private final String baseUrl;
    private final String webhookId;

    public PayPalClient(@Value("${app.paypal.client-id}") String clientId,
                 @Value("${app.paypal.client-secret}") String clientSecret,
                 @Value("${app.paypal.base-url}") String baseUrl,
                 @Value("${app.paypal.webhook-id}") String webhookId,
                 ObjectMapper mapper) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.baseUrl = baseUrl;
        this.webhookId = webhookId;
        this.mapper = mapper;
        this.restClient = RestClient.builder().baseUrl(baseUrl).build();
    }

    public String getAccessToken() {
        String credentials = Base64.getEncoder().encodeToString((clientId + ":" + clientSecret).getBytes());
        String response = restClient.post()
                .uri("/v1/oauth2/token")
                .header("Authorization", "Basic " + credentials)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body("grant_type=client_credentials")
                .retrieve()
                .body(String.class);
        try {
            return mapper.readTree(response).get("access_token").asText();
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse PayPal token", e);
        }
    }

    public JsonNode createOrder(String accessToken, String currency, String amount, String returnUrl, String cancelUrl) {
        var body = Map.of(
                "intent", "CAPTURE",
                "purchase_units", new Object[]{Map.of(
                        "amount", Map.of("currency_code", currency, "value", amount)
                )},
                "application_context", Map.of(
                        "return_url", returnUrl,
                        "cancel_url", cancelUrl
                )
        );
        try {
            String resp = restClient.post()
                    .uri("/v2/checkout/orders")
                    .header("Authorization", "Bearer " + accessToken)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(mapper.writeValueAsString(body))
                    .retrieve()
                    .body(String.class);
            return mapper.readTree(resp);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create PayPal order: " + e.getMessage(), e);
        }
    }

    public JsonNode captureOrder(String accessToken, String paypalOrderId) {
        try {
            String resp = restClient.post()
                    .uri("/v2/checkout/orders/" + paypalOrderId + "/capture")
                    .header("Authorization", "Bearer " + accessToken)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("{}")
                    .retrieve()
                    .body(String.class);
            return mapper.readTree(resp);
        } catch (Exception e) {
            throw new RuntimeException("Failed to capture PayPal order: " + e.getMessage(), e);
        }
    }

    public boolean verifyWebhookSignature(String transmissionId, String certUrl,
                                   String authAlgo, String transmissionSig,
                                   String transmissionTime, String webhookBody) {
        try {
            String token = getAccessToken();
            var body = Map.of(
                    "transmission_id", transmissionId,
                    "transmission_time", transmissionTime,
                    "cert_url", certUrl,
                    "auth_algo", authAlgo,
                    "transmission_sig", transmissionSig,
                    "webhook_id", webhookId,
                    "webhook_event", mapper.readTree(webhookBody)
            );
            String resp = restClient.post()
                    .uri("/v1/notifications/verify-webhook-signature")
                    .header("Authorization", "Bearer " + token)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(mapper.writeValueAsString(body))
                    .retrieve()
                    .body(String.class);
            return "SUCCESS".equals(mapper.readTree(resp).get("verification_status").asText());
        } catch (Exception e) {
            log.warn("Webhook verification failed: {}", e.getMessage());
            return false;
        }
    }
}
