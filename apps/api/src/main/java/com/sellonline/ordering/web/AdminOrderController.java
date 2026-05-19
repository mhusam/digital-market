package com.sellonline.ordering.web;

import com.sellonline.ordering.api.OrderDto;
import com.sellonline.ordering.api.OrderingFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/orders")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminOrderController {

    private final OrderingFacade ordering;

    @GetMapping
    public Page<OrderDto> list(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to,
            Pageable pageable) {
        return ordering.listOrders(status, search, from, to, pageable);
    }

    @GetMapping("/{id}")
    public OrderDto get(@PathVariable UUID id) {
        return ordering.getOrder(id);
    }

    @PostMapping("/{id}/mark-paid")
    public OrderDto markPaid(@PathVariable UUID id, @RequestBody(required = false) Map<String, String> body) {
        return ordering.markPaid(id, body != null ? body.get("notes") : null);
    }

    @PostMapping("/{id}/cancel")
    public OrderDto cancel(@PathVariable UUID id, @RequestBody(required = false) Map<String, String> body) {
        return ordering.cancel(id, body != null ? body.get("reason") : null);
    }

    @PostMapping("/{id}/notes")
    public OrderDto addNote(@PathVariable UUID id, @RequestBody Map<String, String> body) {
        return ordering.addNote(id, body.get("note"));
    }

    @PostMapping("/{id}/resend-email")
    public ResponseEntity<Void> resendEmail(@PathVariable UUID id) {
        ordering.resendConfirmationEmail(id);
        return ResponseEntity.ok().build();
    }
}
