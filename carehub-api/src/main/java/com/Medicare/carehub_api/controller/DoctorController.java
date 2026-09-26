package com.Medicare.carehub_api.controller;


import com.Medicare.carehub_api.dto.DoctorDTO;
import com.Medicare.carehub_api.dto.DoctorRequestDTO;

import com.Medicare.carehub_api.service.DoctorService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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
    public DoctorDTO createDoctor(@Valid @RequestBody DoctorRequestDTO dto) {
        return doctorService.saveDoctor(dto);
    }

    @GetMapping
    public List<DoctorDTO> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    @GetMapping("/{id}")
    public DoctorDTO getDoctorById(@PathVariable Long id)
    {
        return doctorService.getDoctorById(id);
    }

    @PutMapping("/{id}")
    public DoctorDTO updateDoctor(
            @PathVariable Long id,
            @Valid @RequestBody DoctorRequestDTO dto)
    {
        return doctorService.updateDoctor(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteDoctor(@PathVariable Long id)
    {
        doctorService.deleteDoctor(id);
    }

}