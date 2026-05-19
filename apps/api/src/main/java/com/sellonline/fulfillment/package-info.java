/**
 * Fulfillment module — generates signed download URLs and records download audit events.
 * Depends on Ordering (eligibility) and Catalog (asset keys) via their public facades.
 */
@org.springframework.modulith.ApplicationModule(allowedDependencies = {"platform", "ordering", "catalog"})
package com.sellonline.fulfillment;
