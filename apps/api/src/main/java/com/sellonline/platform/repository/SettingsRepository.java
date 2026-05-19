package com.sellonline.platform.repository;

import com.sellonline.platform.domain.StoreSetting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SettingsRepository extends JpaRepository<StoreSetting, String> {}
