/**
 * Payments module — PayPal create/capture, webhook verification, idempotency.
 * Calls OrderingFacade only; never writes to ordering tables directly.
 * Public API: {@link com.sellonline.payments.api.PaymentsFacade}
 */
@org.springframework.modulith.ApplicationModule(allowedDependencies = {"platform", "ordering"})
package com.sellonline.payments;
