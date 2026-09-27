package com.Medicare.carehub_api.controller;

import com.Medicare.carehub_api.dto.DashboardDTO;
import com.Medicare.carehub_api.service.DashboardService;
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
        name = "Admin Dashboard",
        description = "Admin dashboard and hospital statistics APIs"
)
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @Operation(
            summary = "Get admin dashboard",
            description = "Returns total counts of patients, doctors, and appointments"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Dashboard data retrieved successfully"
            )
    })
    @GetMapping("/dashboard")
    public DashboardDTO getDashboard() {
        return dashboardService.getDashboardData();
    }
}