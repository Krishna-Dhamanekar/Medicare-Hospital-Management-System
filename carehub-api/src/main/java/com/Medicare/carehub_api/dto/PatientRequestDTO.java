package com.Medicare.carehub_api.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import io.swagger.v3.oas.annotations.media.Schema;


public class PatientRequestDTO
{
    @Schema(description = "Patient's full name")
    @NotBlank(message = "Name is Required !")
    private String name;

    @Schema(description = "Patient's phone number")
    @NotBlank(message = "Email is Required !")
    @Email(message = "Enter a valid Email !")
    private  String email;

    @Schema(description = "Patient's phone number")
    @NotBlank(message = "Phone is Required !")
    private  String phone;

    @Schema(description = "Patient's age")
    @Min(value = 1,message = "Age must be at least 1")
    private int age;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
