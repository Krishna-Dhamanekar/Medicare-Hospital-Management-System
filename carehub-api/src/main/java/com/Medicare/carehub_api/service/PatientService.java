package com.Medicare.carehub_api.service;

import com.Medicare.carehub_api.dto.PatientDTO;
import com.Medicare.carehub_api.dto.PatientRequestDTO;
import com.Medicare.carehub_api.entity.Patient;
import com.Medicare.carehub_api.exception.ResourceNotFoundException;
import com.Medicare.carehub_api.repository.PatientRepository;
import org.springframework.stereotype.Service;

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

    public PatientDTO savePatient(PatientRequestDTO dto) {

        Patient patient = new Patient();

        patient.setName(dto.getName());
        patient.setEmail(dto.getEmail());
        patient.setPhone(dto.getPhone());
        patient.setAge(dto.getAge());

        Patient savedPatient = patientRepository.save(patient);

        return convertToDTO(savedPatient);
    }

    public List<PatientDTO> getAllPatients() {

        List<Patient> patients = patientRepository.findAll();

        return patients.stream()
                .map(this::convertToDTO)
                .toList();
    }

    public PatientDTO getPatientById(Long id) {

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Patient not found with id: " + id));

        return convertToDTO(patient);
    }

    public PatientDTO updatePatient(Long id, PatientRequestDTO dto) {

        Patient existingPatient =
                patientRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Patient not found with id: " + id));
        existingPatient.setName(dto.getName());
        existingPatient.setEmail(dto.getEmail());
        existingPatient.setPhone(dto.getPhone());
        existingPatient.setAge(dto.getAge());

        Patient updatedPatient = patientRepository.save(existingPatient);

        return convertToDTO(updatedPatient);
    }
    public void deletePatient(Long id)
    {
        if (!patientRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Patient not found with id: " + id);
        }
        patientRepository.deleteById(id);
    }

     public PatientDTO convertToDTO(Patient patient)
     {
         PatientDTO dto=new PatientDTO();

         dto.setId(patient.getId());
         dto.setName(patient.getName());
         dto.setEmail(patient.getEmail());
         dto.setPhone(patient.getPhone());
         dto.setAge(patient.getAge());

         return dto;
     }
}
