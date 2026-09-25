package com.Medicare.carehub_api.controller;

import com.Medicare.carehub_api.entity.Patient;
import com.Medicare.carehub_api.service.PatientService;
import org.springframework.web.bind.annotation.*;

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
    public Patient createPatient(@RequestBody Patient patient) {
        return patientService.savePatient(patient);
    }

    @GetMapping
    public List<Patient> getAllPatients()
    {
        return patientService.getAllPatients();
    }

    @GetMapping("/{id}")
    public Optional<Patient> getPatientById(@PathVariable Long id)
    {
        return patientService.getPatientById(id);
    }

    @PutMapping("/{id}")
    public Patient updatePatient(
            @PathVariable Long id,
            @RequestBody Patient patient)
    {
        return  patientService.updatePatient(id,patient);
    }

    @DeleteMapping("/{id}")
    public  void deletePatient(@PathVariable Long id)
    {
        patientService.deletePatient(id);
    }

}
