package com.sellonline.identity.api;

public record AuthResult(String token, UserDto user) {}
