package com.sellonline.fulfillment.api;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface FulfillmentFacade {
    /** Returns signed download URLs for all assets in the order (order must be PAID/FULFILLED). */
    List<DownloadLinkDto> getDownloadLinks(UUID orderId, String ipAddress, String userAgent);

    /** Admin view: list download events for an order. */
    Page<DownloadEventDto> listDownloadEvents(UUID orderId, Pageable pageable);

    /** Export all download events for a dispute. */
    List<DownloadEventDto> exportDownloadEvents(UUID orderId);
}
