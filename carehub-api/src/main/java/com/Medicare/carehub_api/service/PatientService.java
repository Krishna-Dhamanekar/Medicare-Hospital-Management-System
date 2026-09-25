package com.Medicare.carehub_api.service;

import com.Medicare.carehub_api.entity.Patient;
import com.Medicare.carehub_api.repository.PatientRepository;
import org.springframework.stereotype.Service;
import com.Medicare.carehub_api.entity.Patient;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService
{

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository)
    {
        this.patientRepository=patientRepository;
    }

    public Patient savePatient(Patient patient)
    {
        return  patientRepository.save(patient);
    }

    public List<Patient> getAllPatients()
    {
        return patientRepository.findAll();
    }

    public Optional<Patient> getPatientById(Long id)
    {
        return patientRepository.findById(id);
    }

    public  Patient updatePatient(Long id,Patient patient)
    {
        Patient existingPatient= patientRepository.findById(id).orElseThrow();

        existingPatient.setName(patient.getName());
        existingPatient.setEmail(patient.getEmail());
        existingPatient.setPhone(patient.getPhone());
        existingPatient.setAge(patient.getAge());

        return patientRepository.save(existingPatient);
    }

    public void deletePatient(Long id)
    {
        patientRepository.deleteById(id);
    }
}
