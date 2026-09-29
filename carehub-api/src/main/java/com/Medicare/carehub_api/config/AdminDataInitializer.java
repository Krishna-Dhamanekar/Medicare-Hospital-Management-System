package com.Medicare.carehub_api.config;

import com.Medicare.carehub_api.entity.Admin;
import com.Medicare.carehub_api.repository.AdminRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminDataInitializer {

    @Bean
    public CommandLineRunner createAdmin(
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            if (adminRepository.findByUsername("CareHub").isEmpty()) {

                Admin admin = new Admin();

                admin.setUsername("CareHub");
                admin.setPassword(
                        passwordEncoder.encode("CareHub@2026")
                );

                adminRepository.save(admin);

                System.out.println(
                        "Default admin created successfully."
                );
            }
        };
    }
}