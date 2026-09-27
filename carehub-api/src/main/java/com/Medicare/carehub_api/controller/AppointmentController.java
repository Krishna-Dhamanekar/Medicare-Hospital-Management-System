package com.Medicare.carehub_api.controller;
import io.swagger.v3.oas.annotations.Operation;
import com.Medicare.carehub_api.dto.AppointmentDTO;
import com.Medicare.carehub_api.dto.AppointmentRequestDTO;
import com.Medicare.carehub_api.service.AppointmentService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springdoc.core.converters.models.Sort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(
            AppointmentService appointmentService) {

        this.appointmentService = appointmentService;
    }

    @Operation(summary = "Create a new appointment")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Appointment created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid appointment data"),
            @ApiResponse(responseCode = "404", description = "Patient or doctor not found")
    })
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AppointmentDTO createAppointment(
            @Valid @RequestBody AppointmentRequestDTO dto) {

        return appointmentService.saveAppointment(dto);
    }

    @Operation(summary = "Get all appointment")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Appointments retrieved successfully")
    })
    @GetMapping
    public List<AppointmentDTO> getAllAppointments() {

        return appointmentService.getAllAppointments();
    }

    @Operation(summary = "Get appointment by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Appointment found"),
            @ApiResponse(responseCode = "404", description = "Appointment not found")
    })
    @GetMapping("/{id}")
    public AppointmentDTO getAppointmentById(@PathVariable Long id) {

        return appointmentService.getAppointmentById(id);
    }

    @Operation(summary = "Update appointment")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Appointment updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid appointment data"),
            @ApiResponse(responseCode = "404", description = "Appointment, patient, or doctor not found")
    })
    @PutMapping("/{id}")
    public AppointmentDTO updateAppointment(
            @PathVariable Long id,
            @Valid @RequestBody AppointmentRequestDTO dto) {

        return appointmentService.updateAppointment(id, dto);
    }

    @Operation(summary = "Delete appointment")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Appointment deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Appointment not found")
    })
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteAppointment(@PathVariable Long id) {

        appointmentService.deleteAppointment(id);
    }


    @Operation(summary = "Get appointment by patient ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Appointment found"),
            @ApiResponse(responseCode = "404", description = "Appointment not found")
    })
    @GetMapping("/patient/{patientId}")
    public Page<AppointmentDTO> getAppointmentsByPatientId(
            @PathVariable Long patientId,
            Pageable pageable) {

        return appointmentService.getAppointmentsByPatientId(patientId, pageable);
    }


    @Operation(summary = "Get appointment by Doctor ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Appointment found"),
            @ApiResponse(responseCode = "404", description = "Appointment not found")
    })
    @GetMapping("/doctor/{doctorId}")
    public Page<AppointmentDTO> getAppointmentsByDoctorId(
            @PathVariable Long doctorId,
            Pageable pageable) {

        return appointmentService.getAppointmentsByDoctorId(doctorId, pageable);
    }
}