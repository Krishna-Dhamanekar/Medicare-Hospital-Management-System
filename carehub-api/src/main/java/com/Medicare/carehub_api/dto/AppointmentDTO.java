package com.Medicare.carehub_api.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class AppointmentDTO {

    private Long id;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private String reason;
    private Long patientId;
    private Long doctorId;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


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