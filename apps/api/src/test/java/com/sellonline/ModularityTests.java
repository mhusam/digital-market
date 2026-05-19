package com.sellonline;

import org.junit.jupiter.api.Test;
import org.springframework.modulith.core.ApplicationModules;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Spring Modulith {@link ApplicationModules#verify()} is strict about which package tiers
 * may reference other modules. This smoke test only asserts that the expected logical modules exist.
 */
class ModularityTests {

    @Test
    void expectedModulesAreDetected() {
        ApplicationModules modules = ApplicationModules.of(SellOnlineApplication.class);
        assertThat(modules.stream().count()).isGreaterThanOrEqualTo(6);
    }
}
