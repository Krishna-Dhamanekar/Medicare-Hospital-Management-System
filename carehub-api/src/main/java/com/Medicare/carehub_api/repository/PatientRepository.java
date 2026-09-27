package com.Medicare.carehub_api.repository;

import com.Medicare.carehub_api.entity.Patient;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long>
{
    Page<Patient> findByNameContainingIgnoreCase(String name, Pageable pageable);
    List<Patient> findByEmail(String email);
}