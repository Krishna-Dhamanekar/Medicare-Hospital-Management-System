package com.Medicare.carehub_api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;
import java.time.LocalTime;

public class AppointmentRequestDTO {

    @Schema(description = "Date of the appointment")
    @NotNull(message = "Appointment date is required")
    private LocalDate appointmentDate;

    @Schema(description = "Time of the appointment")
    @NotNull(message = "Appointment time is required")
    private LocalTime appointmentTime;

    @Schema(description = "Reason for the appointment")
    @NotBlank(message = "Reason is required")
    private String reason;

    @Schema(description = "ID of the patient")
    @NotNull(message = "Patient ID is required")
    private Long patientId;

    @Schema(description = "ID of the doctor")
    @NotNull(message = "Doctor ID is required")
    private Long doctorId;


    public LocalDate getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDate appointmentDate) {
        this.appointmentDate = appointmentDate;
    }


    public LocalTime getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(LocalTime appointmentTime) {
        this.appointmentTime = appointmentTime;
    }


    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }


    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }


    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }
}