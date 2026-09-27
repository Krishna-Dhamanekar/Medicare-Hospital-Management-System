package com.Medicare.carehub_api.repository;


import com.Medicare.carehub_api.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor,Long>
{


    List<Doctor> findByNameContainingIgnoreCase(String name);
    List<Doctor> findBySpecializationContainingIgnoreCase(String specialization);
}
