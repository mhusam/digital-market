package com.sellonline.identity.internal;

import com.sellonline.identity.api.*;
import com.sellonline.identity.domain.User;
import com.sellonline.identity.domain.UserRole;
import com.sellonline.identity.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
@RequiredArgsConstructor
class IdentityService implements IdentityFacade {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    @Transactional
    public AuthResult register(RegisterCommand cmd) {
        if (userRepository.existsByEmail(cmd.email())) {
            throw new IdentityException("Email already registered");
        }
        User user = User.builder()
                .email(cmd.email())
                .username(deriveUsername(cmd.email()))
                .passwordHash(passwordEncoder.encode(cmd.password()))
                .name(cmd.name())
                .role(UserRole.CUSTOMER)
                .build();
        userRepository.save(user);
        String token = jwtService.generate(user.getId(), user.getEmail(), user.getRole().name());
        return new AuthResult(token, toDto(user));
    }

    @Override
    @Transactional(readOnly = true)
    public AuthResult login(LoginCommand cmd) {
        String login = cmd.login().trim();
        User user = userRepository.findByLoginIgnoreCase(login)
                .orElseThrow(() -> new IdentityException("Invalid credentials"));
        if (!user.isEnabled()) throw new IdentityException("Account disabled");
        if (!passwordEncoder.matches(cmd.password(), user.getPasswordHash())) {
            throw new IdentityException("Invalid credentials");
        }
        String token = jwtService.generate(user.getId(), user.getEmail(), user.getRole().name());
        return new AuthResult(token, toDto(user));
    }

    @Override
    @Transactional
    public void requestPasswordReset(String emailOrUsername) {
        String key = emailOrUsername == null ? "" : emailOrUsername.trim();
        if (key.isEmpty()) return;
        userRepository.findByLoginIgnoreCase(key).ifPresent(user -> {
            user.setPasswordResetToken(UUID.randomUUID().toString());
            user.setPasswordResetExpiry(Instant.now().plus(2, ChronoUnit.HOURS));
        });
    }

    @Override
    @Transactional
    public void resetPassword(String token, String newPassword) {
        User user = userRepository.findByPasswordResetToken(token)
                .orElseThrow(() -> new IdentityException("Invalid or expired reset token"));
        if (user.getPasswordResetExpiry() == null || Instant.now().isAfter(user.getPasswordResetExpiry())) {
            throw new IdentityException("Reset token expired");
        }
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        user.setPasswordResetToken(null);
        user.setPasswordResetExpiry(null);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDto getUser(UUID userId) {
        return userRepository.findById(userId)
                .map(this::toDto)
                .orElseThrow(() -> new IdentityException("User not found"));
    }

    @Override
    @Transactional
    public UserDto updateProfile(UUID userId, UpdateProfileCommand cmd) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IdentityException("User not found"));
        if (cmd.name() != null) user.setName(cmd.name());
        if (cmd.currentPassword() != null && cmd.newPassword() != null) {
            if (!passwordEncoder.matches(cmd.currentPassword(), user.getPasswordHash())) {
                throw new IdentityException("Current password is incorrect");
            }
            user.setPasswordHash(passwordEncoder.encode(cmd.newPassword()));
        }
        return toDto(user);
    }

    @Override
    @Transactional
    public void deleteAccount(UUID userId) {
        userRepository.deleteById(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean validateToken(String token) {
        return jwtService.isValid(token);
    }

    @Override
    public UserDto getUserFromToken(String token) {
        var claims = jwtService.parse(token);
        UUID id = UUID.fromString(claims.getSubject());
        return userRepository.findById(id).map(this::toDto)
                .orElseThrow(() -> new IdentityException("User not found"));
    }

    private UserDto toDto(User u) {
        return new UserDto(u.getId(), u.getEmail(), u.getUsername(), u.getName(), u.getRole().name(), u.getCreatedAt());
    }

    /** Local-part of email, sanitized; ensure uniqueness. */
    private String deriveUsername(String email) {
        int at = email.indexOf('@');
        String local = at > 0 ? email.substring(0, at) : email;
        local = local.replaceAll("[^a-zA-Z0-9_]", "");
        if (local.isEmpty()) local = "user";
        String candidate = local;
        int n = 0;
        while (userRepository.existsByUsernameIgnoreCase(candidate)) {
            candidate = local + (++n);
        }
        return candidate;
    }
}
