package com.sellonline.fulfillment.web;

import com.sellonline.fulfillment.api.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class FulfillmentController {

    private final FulfillmentFacade fulfillment;

    @GetMapping("/api/v1/store/orders/{orderId}/downloads")
    public List<DownloadLinkDto> getDownloadLinks(@PathVariable UUID orderId,
                                                   HttpServletRequest request) {
        return fulfillment.getDownloadLinks(orderId,
                request.getRemoteAddr(),
                request.getHeader("User-Agent"));
    }

    @GetMapping("/api/v1/admin/orders/{orderId}/downloads")
    @PreAuthorize("hasRole('ADMIN')")
    public Page<DownloadEventDto> adminDownloadEvents(@PathVariable UUID orderId, Pageable pageable) {
        return fulfillment.listDownloadEvents(orderId, pageable);
    }

    @GetMapping("/api/v1/admin/orders/{orderId}/downloads/export")
    @PreAuthorize("hasRole('ADMIN')")
    public List<DownloadEventDto> exportDownloadEvents(@PathVariable UUID orderId) {
        return fulfillment.exportDownloadEvents(orderId);
    }
}
