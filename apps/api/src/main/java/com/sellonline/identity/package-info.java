/**
 * Identity module — authentication (JWT) and authorisation for exactly two roles:
 * ROLE_ADMIN and ROLE_CUSTOMER. No additional roles without an explicit ADR.
 *
 * Public API: {@link com.sellonline.identity.api.IdentityFacade}
 */
@org.springframework.modulith.ApplicationModule(allowedDependencies = {"platform"})
package com.sellonline.identity;
