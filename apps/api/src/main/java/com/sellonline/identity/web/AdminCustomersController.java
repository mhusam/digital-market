package com.sellonline.identity.web;

import com.sellonline.identity.api.IdentityFacade;
import com.sellonline.identity.api.UserDto;
import com.sellonline.identity.domain.User;
import com.sellonline.identity.domain.UserRole;
import com.sellonline.identity.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/customers")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminCustomersController {

    private final UserRepository userRepository;

    @GetMapping
    public Page<UserDto> list(@RequestParam(required = false) String search, Pageable pageable) {
        // Simple full-table scan for MVP admin directory
        Page<User> users = userRepository.findAll(pageable);
        var customers = users.stream()
                .filter(u -> u.getRole() == UserRole.CUSTOMER)
                .filter(u -> search == null || matchesCustomerSearch(u, search))
                .map(u -> new UserDto(u.getId(), u.getEmail(), u.getUsername(), u.getName(), u.getRole().name(), u.getCreatedAt()))
                .toList();
        return new PageImpl<>(customers, pageable, customers.size());
    }

    @GetMapping("/{id}")
    public UserDto get(@PathVariable UUID id) {
        return userRepository.findById(id)
                .map(u -> new UserDto(u.getId(), u.getEmail(), u.getUsername(), u.getName(), u.getRole().name(), u.getCreatedAt()))
                .orElseThrow(() -> new com.sellonline.identity.api.IdentityException("User not found"));
    }

    private static boolean matchesCustomerSearch(User u, String search) {
        String s = search.toLowerCase();
        return u.getEmail().toLowerCase().contains(s)
                || u.getName().toLowerCase().contains(s)
                || (u.getUsername() != null && u.getUsername().toLowerCase().contains(s));
    }
}
