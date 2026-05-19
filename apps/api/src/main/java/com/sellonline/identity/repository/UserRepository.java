package com.sellonline.identity.repository;

import com.sellonline.identity.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByUsernameIgnoreCase(String username);

    @Query("""
            SELECT u FROM User u
            WHERE lower(u.email) = lower(:login)
               OR (u.username IS NOT NULL AND lower(u.username) = lower(:login))
            """)
    Optional<User> findByLoginIgnoreCase(@Param("login") String login);

    Optional<User> findByPasswordResetToken(String token);
}
