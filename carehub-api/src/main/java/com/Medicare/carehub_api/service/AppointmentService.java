package com.Medicare.carehub_api.service;

import com.Medicare.carehub_api.dto.AppointmentDTO;
import com.Medicare.carehub_api.dto.AppointmentRequestDTO;
import com.Medicare.carehub_api.entity.Appointment;
import com.Medicare.carehub_api.entity.Doctor;
import com.Medicare.carehub_api.entity.Patient;
import com.Medicare.carehub_api.exception.ConflictException;
import com.Medicare.carehub_api.exception.ResourceNotFoundException;
import com.Medicare.carehub_api.repository.AppointmentRepository;
import com.Medicare.carehub_api.repository.DoctorRepository;
import com.Medicare.carehub_api.repository.PatientRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@Service
public class AppointmentService {

    private static final Logger logger =
            LoggerFactory.getLogger(AppointmentService.class);
    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;




    public AppointmentService(
            AppointmentRepository appointmentRepository,
            PatientRepository patientRepository,
            DoctorRepository doctorRepository) {

        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    // CREATE
    @Transactional
    public AppointmentDTO saveAppointment(AppointmentRequestDTO dto) {

        logger.info("Creating appointment for patientId={} and doctorId={}",
                dto.getPatientId(), dto.getDoctorId());
        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Patient not found with id: " + dto.getPatientId()));

        Doctor doctor = doctorRepository.findById(dto.getDoctorId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with id: " + dto.getDoctorId()));

        boolean conflict =
                appointmentRepository.existsByDoctorIdAndAppointmentDateAndAppointmentTime(
                        dto.getDoctorId(),
                        dto.getAppointmentDate(),
                        dto.getAppointmentTime()
                );

        if (conflict) {
            throw new ConflictException(
                    "Doctor already has an appointment at this date and time"
            );
        }
        Appointment appointment = new Appointment();

        appointment.setAppointmentDate(dto.getAppointmentDate());
        appointment.setAppointmentTime(dto.getAppointmentTime());
        appointment.setReason(dto.getReason());
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);

        Appointment savedAppointment =
                appointmentRepository.save(appointment);
        logger.info("Appointment created successfully with id={}",
                savedAppointment.getId());
        return convertToDTO(savedAppointment);
    }

    // CONVERT ENTITY → DTO
    public AppointmentDTO convertToDTO(Appointment appointment) {

        AppointmentDTO dto = new AppointmentDTO();

        dto.setId(appointment.getId());
        dto.setAppointmentDate(appointment.getAppointmentDate());
        dto.setAppointmentTime(appointment.getAppointmentTime());
        dto.setReason(appointment.getReason());

        dto.setPatientId(appointment.getPatient().getId());
        dto.setDoctorId(appointment.getDoctor().getId());

        return dto;
    }

    // GET ALL
    public List<AppointmentDTO> getAllAppointments() {

        List<Appointment> appointments =
                appointmentRepository.findAll();

        return appointments.stream()
                .map(this::convertToDTO)
                .toList();
    }

    // GET BY ID
    public AppointmentDTO getAppointmentById(Long id) {

        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Appointment not found with id: " + id));

        return convertToDTO(appointment);
    }

    // UPDATE
    @Transactional
    public AppointmentDTO updateAppointment(
            Long id,
            AppointmentRequestDTO dto) {
        logger.info("Updating appointment with id={}", id);

        Appointment existingAppointment =
                appointmentRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Appointment not found with id: " + id));

        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Patient not found with id: " + dto.getPatientId()));

        Doctor doctor = doctorRepository.findById(dto.getDoctorId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with id: " + dto.getDoctorId()));

        existingAppointment.setAppointmentDate(
                dto.getAppointmentDate());

        existingAppointment.setAppointmentTime(
                dto.getAppointmentTime());

        existingAppointment.setReason(
                dto.getReason());

        existingAppointment.setPatient(patient);
        existingAppointment.setDoctor(doctor);

        Appointment updatedAppointment =
                appointmentRepository.save(existingAppointment);

        return convertToDTO(updatedAppointment);
    }

    // DELETE
    public void deleteAppointment(Long id) {
        logger.info("Deleting appointment with id={}", id);

        if (!appointmentRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Appointment not found with id: " + id);
        }
        appointmentRepository.deleteById(id);
    }

    public Page<AppointmentDTO> getAppointmentsByPatientId(
            Long patientId, Pageable pageable) {

        Page<Appointment> appointments =
                appointmentRepository.findByPatientId(patientId, pageable);

        return appointments.map(this::convertToDTO);
    }

    public Page<AppointmentDTO> getAppointmentsByDoctorId(
            Long doctorId, Pageable pageable) {

        Page<Appointment> appointments =
                appointmentRepository.findByDoctorId(doctorId, pageable);

        return appointments.map(this::convertToDTO);
    }


}