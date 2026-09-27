package com.Medicare.carehub_api.dto;

public class HealthDTO {

    private String status;

    public HealthDTO(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}