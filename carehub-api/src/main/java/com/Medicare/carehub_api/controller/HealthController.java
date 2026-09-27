package com.Medicare.carehub_api.controller;

import com.Medicare.carehub_api.dto.HealthDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@Tag(
        name = "Health",
        description = "API health check endpoints"
)
public class HealthController {

    @Operation(
            summary = "Check API health",
            description = "Returns the current health status of the CareHub API"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "API is running successfully"
            )
    })
    @GetMapping("/health")
    public HealthDTO checkHealth() {
        return new HealthDTO("UP");
    }
}