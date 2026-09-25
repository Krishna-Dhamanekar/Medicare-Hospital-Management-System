package com.Medicare.carehub_api.controller;


import com.Medicare.carehub_api.entity.Doctor;
import com.Medicare.carehub_api.service.DoctorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/doctors")
public class DoctorController
{

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService)
    {
        this.doctorService=doctorService;
    }

    @PostMapping
    public Doctor createDoctor(@RequestBody Doctor doctor)
    {
        return doctorService.saveDoctor(doctor);
    }

    @GetMapping
    public List<Doctor> getAllDOctors()
    {
        return doctorService.getAllDoctors();
    }

    @GetMapping("/{id}")
    public Optional<Doctor> getDoctorById(@PathVariable Long id)
    {
        return doctorService.getDoctorById(id);
    }

    @PutMapping("/{id}")
    public Doctor updateDoctor(@PathVariable Long id,@RequestBody Doctor doctor)
    {
        return doctorService.updateDoctor(id,doctor);
    }

    @DeleteMapping("/{id}")
    public void deleteDoctor(@PathVariable Long id)
    {
        doctorService.deleteDoctor(id);
    }

}