package com.sellonline.platform.web;

import com.sellonline.platform.domain.StoreSetting;
import com.sellonline.platform.repository.SettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/settings")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminSettingsController {

    private final SettingsRepository settings;

    @GetMapping
    public List<StoreSetting> getAll() {
        return settings.findAll();
    }

    @PutMapping
    public List<StoreSetting> updateAll(@RequestBody Map<String, String> updates) {
        updates.forEach((k, v) -> settings.save(new StoreSetting(k, v, null)));
        return settings.findAll();
    }

    @GetMapping("/public")
    public Map<String, String> publicSettings() {
        // Legal content, bank details, store name — publicly readable
        return Map.of();
    }
}
