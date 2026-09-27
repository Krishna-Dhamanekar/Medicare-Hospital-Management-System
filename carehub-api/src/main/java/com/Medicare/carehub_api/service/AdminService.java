package com.Medicare.carehub_api.service;

import com.Medicare.carehub_api.entity.Admin;
import com.Medicare.carehub_api.repository.AdminRepository;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public Admin findByUsername(String username) {
        return adminRepository.findByUsername(username)
                .orElse(null);
    }
}