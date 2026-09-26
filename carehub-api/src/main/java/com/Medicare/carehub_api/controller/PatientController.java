package com.Medicare.carehub_api.controller;

import com.Medicare.carehub_api.dto.PatientDTO;
import com.Medicare.carehub_api.entity.Patient;
import com.Medicare.carehub_api.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import com.Medicare.carehub_api.dto.PatientRequestDTO;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/patients")
public class PatientController {
    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @PostMapping
    public PatientDTO createPatient(@Valid @RequestBody PatientRequestDTO dto) {
        return patientService.savePatient(dto);
    }

    @GetMapping
    public List<PatientDTO> getAllPatients()
    {
        return patientService.getAllPatients();
    }

    @GetMapping("/{id}")public PatientDTO getPatientById(@PathVariable Long id) {
        return patientService.getPatientById(id);
    }

    @PutMapping("/{id}")
    public PatientDTO updatePatient(
            @PathVariable Long id,
            @Valid @RequestBody PatientRequestDTO dto)
    {
        return patientService.updatePatient(id, dto);
    }

    @DeleteMapping("/{id}")
    public  void deletePatient(@PathVariable Long id)
    {
        patientService.deletePatient(id);
    }

}
