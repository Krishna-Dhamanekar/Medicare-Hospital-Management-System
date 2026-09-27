package com.Medicare.carehub_api.service;

import com.Medicare.carehub_api.dto.DashboardDTO;
import com.Medicare.carehub_api.repository.AppointmentRepository;
import com.Medicare.carehub_api.repository.DoctorRepository;
import com.Medicare.carehub_api.repository.PatientRepository;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;

    public DashboardService(
            PatientRepository patientRepository,
            DoctorRepository doctorRepository,
            AppointmentRepository appointmentRepository) {

        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.appointmentRepository = appointmentRepository;
    }

    public DashboardDTO getDashboardData() {

        DashboardDTO dashboard = new DashboardDTO();

        dashboard.setTotalPatients(patientRepository.count());
        dashboard.setTotalDoctors(doctorRepository.count());
        dashboard.setTotalAppointments(appointmentRepository.count());
        dashboard.setTodayAppointments(
                appointmentRepository.findByAppointmentDate(
                        java.time.LocalDate.now()
                ).size()
        );
        return dashboard;
    }
}