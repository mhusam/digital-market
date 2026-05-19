package com.sellonline.identity.api;

public record UpdateProfileCommand(
        String name,
        String currentPassword,
        String newPassword
) {}
