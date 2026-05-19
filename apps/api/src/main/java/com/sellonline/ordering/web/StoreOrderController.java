package com.sellonline.ordering.web;

import com.sellonline.ordering.api.CreateOrderCommand;
import com.sellonline.ordering.api.OrderDto;
import com.sellonline.ordering.api.OrderingFacade;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/store")
@RequiredArgsConstructor
public class StoreOrderController {

    private final OrderingFacade ordering;

    @PostMapping("/checkout")
    public OrderDto checkout(@Valid @RequestBody CreateOrderCommand cmd,
                             @AuthenticationPrincipal String userId) {
        CreateOrderCommand withUser = userId != null
                ? new CreateOrderCommand(UUID.fromString(userId), cmd.customerEmail(),
                        cmd.customerName(), cmd.lines(), cmd.paymentMethod())
                : cmd;
        return ordering.createOrder(withUser);
    }

    @GetMapping("/orders/confirmation/{token}")
    public OrderDto getByToken(@PathVariable String token) {
        return ordering.getOrderByConfirmationToken(token);
    }

    @GetMapping("/customer/orders")
    public org.springframework.data.domain.Page<OrderDto> myOrders(
            @AuthenticationPrincipal String userId,
            org.springframework.data.domain.Pageable pageable) {
        return ordering.listCustomerOrders(UUID.fromString(userId), pageable);
    }

    @GetMapping("/customer/orders/{id}")
    public OrderDto myOrder(@PathVariable UUID id, @AuthenticationPrincipal String userId) {
        return ordering.getCustomerOrder(id, UUID.fromString(userId));
    }

    @PostMapping("/orders/{id}/resend-email")
    public void resend(@PathVariable UUID id) {
        ordering.resendConfirmationEmail(id);
    }
}
