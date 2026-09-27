package com.Medicare.carehub_api.controller;


import com.Medicare.carehub_api.dto.DoctorDTO;
import com.Medicare.carehub_api.dto.DoctorRequestDTO;

import com.Medicare.carehub_api.service.DoctorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.List;

@Tag(name = "Doctors", description = "Doctor management APIs")
@RestController
@RequestMapping("/doctors")
public class DoctorController
{

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService)
    {
        this.doctorService=doctorService;
    }

    @Operation(summary = "Create a new doctor")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Doctor created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid doctor data")
    })
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DoctorDTO createDoctor(@Valid @RequestBody DoctorRequestDTO dto) {
        return doctorService.saveDoctor(dto);
    }

    @Operation(summary = "Get all doctors")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Doctors retrieved successfully")
    })
    @GetMapping
    public List<DoctorDTO> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    @Operation(summary = "Get doctor by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Doctor found"),
            @ApiResponse(responseCode = "404", description = "Doctor not found")
    })
    @GetMapping("/{id}")
    public DoctorDTO getDoctorById(@PathVariable Long id)
    {
        return doctorService.getDoctorById(id);
    }

    @Operation(summary = "Update doctor")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Doctor updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid doctor data"),
            @ApiResponse(responseCode = "404", description = "Doctor not found")
    })
    @PutMapping("/{id}")
    public DoctorDTO updateDoctor(
            @PathVariable Long id,
            @Valid @RequestBody DoctorRequestDTO dto)
    {
        return doctorService.updateDoctor(id, dto);
    }

    @Operation(summary = "Delete doctor")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Doctor deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Doctor not found")
    })
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDoctor(@PathVariable Long id)
    {
        doctorService.deleteDoctor(id);
    }


    @Operation(summary = "Search doctor by name")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Doctor found"),
            @ApiResponse(responseCode = "404", description = "Doctor not found")
    })
    @GetMapping("/search")
    public List<DoctorDTO> searchDoctors(@RequestParam String name) {
        return doctorService.searchDoctorsByName(name);
    }


    @Operation(summary = "Search doctor by specification")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Doctor found"),
            @ApiResponse(responseCode = "404", description = "Doctor not found")
    })
    @GetMapping("/search/specialization")
    public List<DoctorDTO> searchDoctorsBySpecialization(
            @RequestParam String specialization) {

        return doctorService.searchDoctorsBySpecialization(specialization);
    }
}