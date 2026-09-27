package com.Medicare.carehub_api.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public class LoginRequestDTO {

    @Schema(
            description = "Admin username",
            example = "admin"
    )
    private String username;

    @Schema(
            description = "Admin password",
            example = "admin123"
    )
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}