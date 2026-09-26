package com.Medicare.carehub_api.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
public class PatientRequestDTO
{
    @NotBlank(message = "Name is Required !")
    private String name;

    @NotBlank(message = "Email is Required !")
    @Email(message = "Enter a valid Email !")
    private  String email;

    @NotBlank(message = "Phone is Required !")
    private  String phone;

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
