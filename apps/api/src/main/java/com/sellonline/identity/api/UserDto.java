package com.sellonline.identity.api;

import java.time.Instant;
import java.util.UUID;

public record UserDto(UUID id, String email, String username, String name, String role, Instant createdAt) {}
