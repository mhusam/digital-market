package com.sellonline.platform.web;

import com.sellonline.platform.domain.StoreSetting;
import com.sellonline.platform.repository.SettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/store/settings")
@RequiredArgsConstructor
public class StoreSettingsController {

    private static final Set<String> PUBLIC_KEYS = Set.of(
            "store.name", "store.tagline", "legal.terms", "legal.privacy", "legal.refunds",
            "bank.enabled", "bank.details", "bank.reference-hint"
    );

    private final SettingsRepository settings;

    @GetMapping
    public List<StoreSetting> getPublicSettings() {
        return settings.findAll().stream()
                .filter(s -> PUBLIC_KEYS.contains(s.getKey()))
                .toList();
    }
}
