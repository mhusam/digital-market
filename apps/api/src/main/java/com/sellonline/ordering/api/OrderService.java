package com.sellonline.ordering.api;

import com.sellonline.catalog.api.CatalogFacade;
import com.sellonline.ordering.api.CreateOrderCommand;
import com.sellonline.ordering.api.OrderDto;
import com.sellonline.ordering.api.OrderLineDto;
import com.sellonline.ordering.api.OrderLineRequest;
import com.sellonline.ordering.api.OrderingException;
import com.sellonline.ordering.api.OrderingFacade;
import com.sellonline.ordering.domain.Order;
import com.sellonline.ordering.domain.OrderLine;
import com.sellonline.ordering.domain.OrderStatus;
import com.sellonline.ordering.domain.PaymentMethod;
import com.sellonline.ordering.internal.OrderPaidEvent;
import com.sellonline.ordering.internal.OrderRepository;
import com.sellonline.ordering.internal.ResendOrderEmailEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService implements OrderingFacade {

    private final OrderRepository orderRepo;
    private final CatalogFacade catalog;
    private final ApplicationEventPublisher events;

    @Value("${app.store-name:IT Solutions Store}")
    private String storeName;

    @Override
    @Transactional
    public OrderDto createOrder(CreateOrderCommand cmd) {
        PaymentMethod method = PaymentMethod.valueOf(cmd.paymentMethod().toUpperCase());
        String ref = method == PaymentMethod.BANK_TRANSFER
                ? "SO-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase()
                : null;

        List<OrderLine> lines = cmd.lines().stream().map(req -> {
            var product = catalog.getProduct(req.productId());
            return OrderLine.builder()
                    .productId(req.productId())
                    .productTitle(product.title())
                    .unitPrice(product.price())
                    .quantity(req.quantity())
                    .build();
        }).toList();

        BigDecimal total = lines.stream()
                .map(l -> l.getUnitPrice().multiply(BigDecimal.valueOf(l.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Order order = Order.builder()
                .customerId(cmd.customerId())
                .customerEmail(cmd.customerEmail())
                .customerName(cmd.customerName())
                .paymentMethod(method)
                .paymentReference(ref)
                .totalAmount(total)
                .currency("USD")
                .confirmationToken(UUID.randomUUID().toString())
                .build();
        lines.forEach(l -> { l.setOrder(order); order.getLines().add(l); });

        return toDto(orderRepo.save(order));
    }

    @Override @Transactional(readOnly = true)
    public OrderDto getOrder(UUID id) {
        return toDto(getOrThrow(id));
    }

    @Override
    @Transactional(readOnly = true)
    public OrderDto getCustomerOrder(UUID orderId, UUID customerId) {
        Order o = getOrThrow(orderId);
        if (o.getCustomerId() == null || !o.getCustomerId().equals(customerId)) {
            throw new OrderingException("Order not found");
        }
        return toDto(o);
    }

    @Override @Transactional(readOnly = true)
    public OrderDto getOrderByConfirmationToken(String token) {
        return orderRepo.findByConfirmationToken(token)
                .map(this::toDto)
                .orElseThrow(() -> new OrderingException("Order not found"));
    }

    @Override @Transactional(readOnly = true)
    public Page<OrderDto> listOrders(String statusFilter, String search, String dateFrom, String dateTo, Pageable pageable) {
        OrderStatus status = statusFilter != null ? OrderStatus.valueOf(statusFilter) : null;
        Instant from = dateFrom != null ? Instant.parse(dateFrom) : null;
        Instant to = dateTo != null ? Instant.parse(dateTo) : null;
        return orderRepo.search(status, search, from, to, pageable).map(this::toDto);
    }

    @Override @Transactional(readOnly = true)
    public Page<OrderDto> listCustomerOrders(UUID customerId, Pageable pageable) {
        return orderRepo.findByCustomerId(customerId, pageable).map(this::toDto);
    }

    @Override @Transactional
    public OrderDto markPaid(UUID id, String notes) {
        Order o = getOrThrow(id);
        assertStatus(o, OrderStatus.PENDING_PAYMENT);
        o.setStatus(OrderStatus.PAID);
        if (notes != null) o.setInternalNotes(notes);
        events.publishEvent(new OrderPaidEvent(o.getId(), o.getCustomerEmail()));
        return toDto(o);
    }

    @Override @Transactional
    public OrderDto markFulfilled(UUID id) {
        Order o = getOrThrow(id);
        assertStatus(o, OrderStatus.PAID);
        o.setStatus(OrderStatus.FULFILLED);
        return toDto(o);
    }

    @Override @Transactional
    public OrderDto cancel(UUID id, String reason) {
        Order o = getOrThrow(id);
        if (o.getStatus() == OrderStatus.FULFILLED) throw new OrderingException("Cannot cancel fulfilled order");
        o.setStatus(OrderStatus.CANCELLED);
        if (reason != null) o.setInternalNotes(reason);
        return toDto(o);
    }

    @Override @Transactional
    public OrderDto addNote(UUID id, String note) {
        Order o = getOrThrow(id);
        String existing = o.getInternalNotes() != null ? o.getInternalNotes() + "\n---\n" : "";
        o.setInternalNotes(existing + note);
        return toDto(o);
    }

    @Override @Transactional
    public OrderDto transitionToPaid(UUID id) {
        return markPaid(id, null);
    }

    @Override
    public void resendConfirmationEmail(UUID id) {
        Order o = getOrThrow(id);
        events.publishEvent(new ResendOrderEmailEvent(o.getId(), o.getCustomerEmail()));
    }

    private Order getOrThrow(UUID id) {
        return orderRepo.findById(id).orElseThrow(() -> new OrderingException("Order not found"));
    }

    private void assertStatus(Order o, OrderStatus required) {
        if (o.getStatus() != required)
            throw new OrderingException("Order is " + o.getStatus() + ", expected " + required);
    }

    private OrderDto toDto(Order o) {
        var lines = o.getLines().stream()
                .map(l -> new OrderLineDto(l.getId(), l.getProductId(), l.getProductTitle(), l.getUnitPrice(), l.getQuantity()))
                .toList();
        return new OrderDto(o.getId(), o.getCustomerId(), o.getCustomerEmail(), o.getCustomerName(),
                o.getStatus().name(), o.getPaymentMethod().name(), o.getPaymentReference(),
                o.getTotalAmount(), o.getCurrency(), o.getInternalNotes(), o.getConfirmationToken(),
                lines, o.getCreatedAt(), o.getUpdatedAt());
    }
}
