package com.Medicare.carehub_api.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public class LoginResponseDTO {

    @Schema(
            description = "JWT authentication token",
            example = "eyJhbGciOiJIUzI1NiJ9..."
    )
    private String token;

    @Schema(
            description = "Authenticated admin username",
            example = "admin"
    )
    private String username;

    public LoginResponseDTO(String token, String username) {
        this.token = token;
        this.username = username;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}