package com.sellonline.identity.api;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;

/** {@code login} accepts email or username (case-insensitive). JSON key {@code email} is accepted as an alias. */
public record LoginCommand(
        @NotBlank
        @JsonProperty("login")
        @JsonAlias("email")
        String login,
        @NotBlank String password
) {}
