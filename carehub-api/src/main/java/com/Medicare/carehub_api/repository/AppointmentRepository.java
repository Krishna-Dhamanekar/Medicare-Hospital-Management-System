package com.Medicare.carehub_api.repository;


import com.Medicare.carehub_api.entity.Appointment;
import org.springdoc.core.converters.models.Sort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,Long> {

    Page<Appointment> findByDoctorId(Long doctorId, Pageable pageable);

    Page<Appointment> findByPatientId(Long patientId, Pageable pageable);
}