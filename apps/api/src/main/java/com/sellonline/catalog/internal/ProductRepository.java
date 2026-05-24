package com.sellonline.catalog.internal;

import com.sellonline.catalog.domain.Product;
import com.sellonline.catalog.domain.ProductStatus;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

interface ProductRepository extends JpaRepository<Product, UUID>, JpaSpecificationExecutor<Product> {
    Optional<Product> findBySlug(String slug);

    Optional<Product> findBySlugAndStatus(String slug, ProductStatus status);

    boolean existsBySlug(String slug);

    @Query("SELECT p FROM Product p WHERE (:status IS NULL OR p.status = :status) AND (:search IS NULL OR LOWER(p.title) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Product> findAll(@Param("status") ProductStatus status, @Param("search") String search, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.status = 'PUBLISHED' AND (:search IS NULL OR LOWER(p.title) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Product> findPublished(@Param("search") String search, Pageable pageable);

    List<Product> findByStatus(ProductStatus status);
}
