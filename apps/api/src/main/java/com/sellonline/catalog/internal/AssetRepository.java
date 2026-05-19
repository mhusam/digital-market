package com.sellonline.catalog.internal;

import com.sellonline.catalog.domain.ProductAsset;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

interface AssetRepository extends JpaRepository<ProductAsset, UUID> {}
