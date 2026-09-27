package com.Medicare.carehub_api.service;
import com.Medicare.carehub_api.dto.DoctorDTO;
import com.Medicare.carehub_api.dto.DoctorRequestDTO;
import com.Medicare.carehub_api.entity.Doctor;
import com.Medicare.carehub_api.exception.ResourceNotFoundException;
import com.Medicare.carehub_api.repository.DoctorRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository)
    {
        this.doctorRepository=doctorRepository;
    }
    public DoctorDTO saveDoctor(DoctorRequestDTO dto) {

        Doctor doctor = new Doctor();

        doctor.setName(dto.getName());
        doctor.setSpecialization(dto.getSpecialization());
        doctor.setEmail(dto.getEmail());
        doctor.setPhone(dto.getPhone());

        Doctor savedDoctor = doctorRepository.save(doctor);

        return convertToDTO(savedDoctor);
    }

    public List<DoctorDTO> getAllDoctors() {

        List<Doctor> doctors = doctorRepository.findAll();

        return doctors.stream()
                .map(this::convertToDTO)
                .toList();
    }

    public DoctorDTO getDoctorById(Long id) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with id: " + id));

        return convertToDTO(doctor);
    }
    public DoctorDTO convertToDTO(Doctor doctor) {

        DoctorDTO dto = new DoctorDTO();

        dto.setId(doctor.getId());
        dto.setName(doctor.getName());
        dto.setSpecialization(doctor.getSpecialization());
        dto.setEmail(doctor.getEmail());
        dto.setPhone(doctor.getPhone());

        return dto;
    }

    public DoctorDTO updateDoctor(Long id, DoctorRequestDTO dto) {

        Doctor existingDoctor =
                doctorRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Doctor not found with id: " + id));

        existingDoctor.setName(dto.getName());
        existingDoctor.setSpecialization(dto.getSpecialization());
        existingDoctor.setEmail(dto.getEmail());
        existingDoctor.setPhone(dto.getPhone());

        Doctor updatedDoctor = doctorRepository.save(existingDoctor);

        return convertToDTO(updatedDoctor);
    }

    public void deleteDoctor(Long id)
    {
        if(!doctorRepository.existsById(id))
        {
            throw new ResourceNotFoundException("Doctor not found with id: " + id);
        }
        doctorRepository.deleteById(id);
    }

    public List<DoctorDTO> searchDoctorsByName(String name) {
        List<Doctor> doctors =
                doctorRepository.findByNameContainingIgnoreCase(name);

        return doctors.stream()
                .map(this::convertToDTO)
                .toList();
    }

    public List<DoctorDTO> searchDoctorsBySpecialization(String specialization) {
        List<Doctor> doctors =
                doctorRepository.findBySpecializationContainingIgnoreCase(specialization);

        return doctors.stream()
                .map(this::convertToDTO)
                .toList();
    }
}
