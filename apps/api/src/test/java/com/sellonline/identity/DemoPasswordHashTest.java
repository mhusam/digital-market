package com.sellonline.identity;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertTrue;

/** Ensures Flyway-seeded demo password hash matches {@code Test@123}. */
class DemoPasswordHashTest {

    private static final String FLYWAY_HASH =
            "$2y$10$qNkPKiSdYA2MkVLQim4oBOgYmEivBh/M5Zg2Vg2rnSjwAJnCQ0e2W";

    @Test
    void seededDemoPasswordMatches() {
        assertTrue(new BCryptPasswordEncoder().matches("Test@123", FLYWAY_HASH));
    }
}
