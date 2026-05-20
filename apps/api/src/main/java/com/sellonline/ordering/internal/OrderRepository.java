package com.sellonline.ordering.internal;

import com.sellonline.ordering.domain.Order;
import com.sellonline.ordering.domain.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {
    Optional<Order> findByConfirmationToken(String token);

    Page<Order> findByCustomerId(UUID customerId, Pageable pageable);

    @Query("""
        SELECT o FROM Order o WHERE
        (:status IS NULL OR o.status = :status) AND
        (:search IS NULL OR LOWER(o.customerEmail) LIKE LOWER(CONCAT('%',:search,'%'))
            OR CAST(o.id AS string) LIKE CONCAT('%',:search,'%')) AND
        (:from IS NULL OR o.createdAt >= :from) AND
        (:to IS NULL OR o.createdAt <= :to)
        """)
    Page<Order> search(
            @Param("status") OrderStatus status,
            @Param("search") String search,
            @Param("from") Instant from,
            @Param("to") Instant to,
            Pageable pageable);

    @Query("SELECT o FROM Order o JOIN FETCH o.lines")
    List<Order> findAllWithLines();

    List<Order> findTop5ByOrderByCreatedAtDesc();
}
