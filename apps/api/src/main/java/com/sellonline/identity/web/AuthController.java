package com.sellonline.identity.web;

import com.sellonline.identity.api.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final IdentityFacade identity;

    @PostMapping("/register")
    public ResponseEntity<AuthResult> register(@Valid @RequestBody RegisterCommand cmd) {
        return ResponseEntity.ok(identity.register(cmd));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResult> login(@Valid @RequestBody LoginCommand cmd) {
        return ResponseEntity.ok(identity.login(cmd));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, String>> forgotPassword(@RequestBody Map<String, String> body) {
        String loginOrEmail = body.getOrDefault("login", body.get("email"));
        identity.requestPasswordReset(loginOrEmail != null ? loginOrEmail : "");
        return ResponseEntity.ok(Map.of("message", "If that account exists, a reset link has been sent."));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody Map<String, String> body) {
        identity.resetPassword(body.get("token"), body.get("password"));
        return ResponseEntity.ok(Map.of("message", "Password reset successfully."));
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> me(@AuthenticationPrincipal String userId) {
        return ResponseEntity.ok(identity.getUser(UUID.fromString(userId)));
    }

    @PutMapping("/me")
    public ResponseEntity<UserDto> updateMe(@AuthenticationPrincipal String userId,
                                            @RequestBody UpdateProfileCommand cmd) {
        return ResponseEntity.ok(identity.updateProfile(UUID.fromString(userId), cmd));
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteAccount(@AuthenticationPrincipal String userId) {
        identity.deleteAccount(UUID.fromString(userId));
        return ResponseEntity.noContent().build();
    }
}
