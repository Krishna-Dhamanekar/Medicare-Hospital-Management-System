package com.Medicare.carehub_api.controller;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import com.Medicare.carehub_api.dto.PatientDTO;
import com.Medicare.carehub_api.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import com.Medicare.carehub_api.dto.PatientRequestDTO;
import org.springframework.data.web.PageableDefault;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.util.List;

@RestController
@RequestMapping("/patients")
public class PatientController {
    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @Operation(summary = "Create a new patient")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Patient created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid patient data")
    })
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PatientDTO createPatient(@Valid @RequestBody PatientRequestDTO dto) {
        return patientService.savePatient(dto);
    }

    @Operation(summary = "Get all patients")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Patients retrieved successfully")
    })
    @GetMapping
    public Page<PatientDTO> getAllPatients(
            @PageableDefault(size = 10) Pageable pageable) {
        return patientService.getAllPatients(pageable);
    }

    @Operation(summary = "Get patient by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Patient found"),
            @ApiResponse(responseCode = "404", description = "Patient not found")
    })
    @GetMapping("/{id}")public PatientDTO getPatientById(@PathVariable Long id) {
        return patientService.getPatientById(id);
    }


    @Operation(summary = "Get patient by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Patient updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid patient data"),
            @ApiResponse(responseCode = "404", description = "Patient not found")
    })
    @PutMapping("/{id}")
    public PatientDTO updatePatient(
            @PathVariable Long id,
            @Valid @RequestBody PatientRequestDTO dto)
    {
        return patientService.updatePatient(id, dto);
    }

    @Operation(summary = "Delete patient")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Patient deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Patient not found")
    })
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public  void deletePatient(@PathVariable Long id)
    {
        patientService.deletePatient(id);
    }

    @Operation(summary = "Search patient")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Patient found"),
            @ApiResponse(responseCode = "404", description = "Patient not found")
    })
    @GetMapping("/search")
    public Page<PatientDTO> searchPatients(
            @RequestParam String name,
            Pageable pageable) {

        return patientService.searchPatientsByName(name, pageable);
    }

    @Operation(summary = "Search patient by email")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Patient found"),
            @ApiResponse(responseCode = "404", description = "Patient not found")
    })
    @GetMapping("/search/email")
    public List<PatientDTO> searchPatientsByEmail(@RequestParam String email) {
        return patientService.searchPatientsByEmail(email);
    }

}
