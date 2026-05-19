package com.sellonline.fulfillment.api;

import com.sellonline.catalog.api.CatalogFacade;
import com.sellonline.fulfillment.api.DownloadEventDto;
import com.sellonline.fulfillment.api.DownloadLinkDto;
import com.sellonline.fulfillment.api.FulfillmentFacade;
import com.sellonline.fulfillment.domain.DownloadEvent;
import com.sellonline.fulfillment.internal.DownloadEventRepository;
import com.sellonline.ordering.api.OrderDto;
import com.sellonline.ordering.api.OrderingFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FulfillmentService implements FulfillmentFacade {

    private final DownloadEventRepository eventRepo;
    private final OrderingFacade ordering;
    private final CatalogFacade catalog;

    @Override
    @Transactional
    public List<DownloadLinkDto> getDownloadLinks(UUID orderId, String ipAddress, String userAgent) {
        OrderDto order = ordering.getOrder(orderId);
        if (!"PAID".equals(order.status()) && !"FULFILLED".equals(order.status())) {
            throw new RuntimeException("Order is not eligible for downloads: " + order.status());
        }

        return order.lines().stream().flatMap(line -> {
            // Get the product's assets and generate signed URLs
            var product = catalog.getProduct(line.productId());
            return product.assets().stream().map(asset -> {
                // Record download event
                eventRepo.save(DownloadEvent.builder()
                        .orderId(orderId)
                        .assetId(asset.id())
                        .customerEmail(order.customerEmail())
                        .ipAddress(ipAddress)
                        .userAgent(userAgent)
                        .build());
                String url = catalog.getDownloadUrl(asset.id());
                return new DownloadLinkDto(asset.id(), asset.filename(), url, 60);
            });
        }).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DownloadEventDto> listDownloadEvents(UUID orderId, Pageable pageable) {
        return eventRepo.findByOrderId(orderId, pageable).map(this::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DownloadEventDto> exportDownloadEvents(UUID orderId) {
        return eventRepo.findByOrderIdOrderByDownloadedAtAsc(orderId).stream().map(this::toDto).toList();
    }

    private DownloadEventDto toDto(DownloadEvent e) {
        return new DownloadEventDto(e.getId(), e.getOrderId(), e.getAssetId(),
                e.getCustomerEmail(), e.getIpAddress(), e.getDownloadedAt());
    }
}
