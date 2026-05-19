package com.sellonline.ordering.api;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

/** Public API of the Ordering module. */
public interface OrderingFacade {
    OrderDto createOrder(CreateOrderCommand cmd);
    OrderDto getOrder(UUID orderId);
    /** Customer account: order must belong to {@code customerId}. */
    OrderDto getCustomerOrder(UUID orderId, UUID customerId);
    OrderDto getOrderByConfirmationToken(String token);
    Page<OrderDto> listOrders(String statusFilter, String search, String dateFrom, String dateTo, Pageable pageable);
    Page<OrderDto> listCustomerOrders(UUID customerId, Pageable pageable);
    OrderDto markPaid(UUID orderId, String notes);
    OrderDto markFulfilled(UUID orderId);
    OrderDto cancel(UUID orderId, String reason);
    OrderDto addNote(UUID orderId, String note);
    OrderDto transitionToPaid(UUID orderId);  // called by Payments module
    void resendConfirmationEmail(UUID orderId);
}
