package com.sellonline.identity.internal;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.cors.CorsConfigurationSource;

import java.io.IOException;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
class IdentitySecurityConfig {

    private final JwtService jwtService;
    private final CorsConfigurationSource corsConfigurationSource;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource))
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // PayPal (and other PSP) webhooks — no JWT; signature verified in handler
                .requestMatchers("/api/v1/webhooks/**").permitAll()
                // Public auth
                .requestMatchers("/api/v1/auth/**").permitAll()
                // Storefront read + legal/settings payload
                .requestMatchers(HttpMethod.GET, "/api/v1/store/products/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/store/settings/**").permitAll()
                // Guest order lookup by email token
                .requestMatchers(HttpMethod.GET, "/api/v1/store/orders/confirmation/**").permitAll()
                // Checkout + PayPal return/capture (server calls after redirect)
                .requestMatchers(HttpMethod.POST, "/api/v1/store/checkout").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/v1/store/checkout/**").permitAll()
                // Signed-in customer order history (must not be under anonymous GET /** )
                .requestMatchers("/api/v1/store/customer/**").hasRole("CUSTOMER")
                // Paid / fulfilled digital delivery — guest uses link with order id; eligibility enforced in service
                .requestMatchers(HttpMethod.GET, "/api/v1/store/orders/*/downloads").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/v1/store/orders/*/resend-email").permitAll()
                // Admin
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                // Customer-prefixed APIs (if used)
                .requestMatchers("/api/v1/customer/**").hasRole("CUSTOMER")
                // OpenAPI + actuator
                .requestMatchers("/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                .requestMatchers("/actuator/health", "/actuator/info").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    OncePerRequestFilter jwtAuthFilter() {
        return new OncePerRequestFilter() {
            @Override
            protected void doFilterInternal(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain) throws ServletException, IOException {
                String header = request.getHeader("Authorization");
                if (header != null && header.startsWith("Bearer ")) {
                    String token = header.substring(7);
                    if (jwtService.isValid(token)) {
                        Claims claims = jwtService.parse(token);
                        String role = claims.get("role", String.class);
                        var auth = new UsernamePasswordAuthenticationToken(
                                claims.getSubject(),
                                null,
                                List.of(new SimpleGrantedAuthority("ROLE_" + role))
                        );
                        SecurityContextHolder.getContext().setAuthentication(auth);
                    }
                }
                chain.doFilter(request, response);
            }
        };
    }
}
