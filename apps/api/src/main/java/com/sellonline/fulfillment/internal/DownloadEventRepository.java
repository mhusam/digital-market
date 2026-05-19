package com.sellonline.fulfillment.internal;

import com.sellonline.fulfillment.domain.DownloadEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface DownloadEventRepository extends JpaRepository<DownloadEvent, UUID> {
    Page<DownloadEvent> findByOrderId(UUID orderId, Pageable pageable);
    List<DownloadEvent> findByOrderIdOrderByDownloadedAtAsc(UUID orderId);
}
