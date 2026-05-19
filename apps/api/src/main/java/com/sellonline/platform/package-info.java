/**
 * Platform — cross-cutting configuration, settings, mail, global HTTP handling.
 * Allowed to depend on other modules' public API types used by {@link com.sellonline.platform.GlobalExceptionHandler}.
 */
@org.springframework.modulith.ApplicationModule(
        allowedDependencies = {"identity", "catalog", "ordering", "payments", "fulfillment"}
)
package com.sellonline.platform;
