package com.Medicare.carehub_api.entity;

import jakarta.persistence.*;

@Entity
public class Patient
{

      @GeneratedValue(strategy = GenerationType.IDENTITY)
      @Id
      private Long id;

      @Column(nullable = false)
      private String name;

      @Column(nullable = false, unique = true)
      private String email;

      @Column(nullable = false)
      private String phone;
      private int age;
      public Long getId() {
            return id;
      }

      public void setId(Long id) {
            this.id = id;
      }

      public String getName() {
            return name;
      }

      public void setName(String name) {
            this.name = name;
      }

      public String getEmail() {
            return email;
      }

      public void setEmail(String email) {
            this.email = email;
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
