package com.Medicare.carehub_api.controller;

import com.Medicare.carehub_api.dto.AppointmentDTO;
import com.Medicare.carehub_api.dto.AppointmentRequestDTO;
import com.Medicare.carehub_api.dto.PatientDTO;
import com.Medicare.carehub_api.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(
            AppointmentService appointmentService) {

        this.appointmentService = appointmentService;
    }

    @PostMapping
    public AppointmentDTO createAppointment(
            @Valid @RequestBody AppointmentRequestDTO dto) {

        return appointmentService.saveAppointment(dto);
    }

    @GetMapping
    public List<AppointmentDTO> getAllAppointments() {

        return appointmentService.getAllAppointments();
    }

    @GetMapping("/{id}")
    public AppointmentDTO getAppointmentById(@PathVariable Long id) {

        return appointmentService.getAppointmentById(id);
    }

    @PutMapping("/{id}")
    public AppointmentDTO updateAppointment(
            @PathVariable Long id,
            @Valid @RequestBody AppointmentRequestDTO dto) {

        return appointmentService.updateAppointment(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable Long id) {

        appointmentService.deleteAppointment(id);
    }
}