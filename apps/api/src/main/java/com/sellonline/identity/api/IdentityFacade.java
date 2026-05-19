package com.sellonline.identity.api;

import java.util.UUID;

/** Public API of the Identity module. Depends on platform only. */
public interface IdentityFacade {
    AuthResult register(RegisterCommand cmd);
    AuthResult login(LoginCommand cmd);
    /** {@code emailOrUsername} may be an email address or a username (case-insensitive). */
    void requestPasswordReset(String emailOrUsername);
    void resetPassword(String token, String newPassword);
    UserDto getUser(UUID userId);
    UserDto updateProfile(UUID userId, UpdateProfileCommand cmd);
    void deleteAccount(UUID userId);
    boolean validateToken(String token);
    UserDto getUserFromToken(String token);
}
