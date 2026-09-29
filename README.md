# 🏥 CareHub — Hospital Management System

A full-stack Hospital Management System built with **Spring Boot, React, PostgreSQL, Spring Security, JWT and Docker**.

CareHub provides a secure REST API and a modern web interface for managing patients, doctors, appointments and hospital administration.

![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1.1-6DB33F)
![React](https://img.shields.io/badge/React-Vite-61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791)
![JWT](https://img.shields.io/badge/Auth-JWT-black)
![Docker](https://img.shields.io/badge/Docker-Supported-2496ED)

---

## 📑 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [System Architecture](#️-system-architecture)
- [Application Flow](#-application-flow)
- [Technology Stack](#️-technology-stack)
- [Project Structure](#-project-structure)
- [Database Design](#️-database-design)
- [Authentication and Authorization](#-authentication-and-authorization)
- [REST API Endpoints](#-rest-api-endpoints)
- [Swagger / OpenAPI](#-swagger--openapi)
- [Getting Started](#-getting-started)
- [Docker Support](#-docker-support)
- [Testing](#-testing)
- [HTTP Status Codes](#-http-status-codes)
- [Exception Handling and Validation](#️-exception-handling-and-validation)
- [Security Considerations](#-security-considerations)
- [CORS, Logging and Transactions](#-cors-logging-and-transactions)
- [Project Objectives](#-project-objectives)
- [Future Improvements](#-future-improvements)
- [Screenshots](#-screenshots)
- [Repository](#-repository)
- [Author](#-author)
- [License](#-license)

---

## 📌 Project Overview

**CareHub** is a full-stack hospital management application designed to demonstrate real-world backend and frontend development concepts.

The system allows an administrator to:

- Manage patients
- Manage doctors
- Schedule appointments
- Search and filter records
- View appointment information
- Monitor hospital statistics
- Secure the application using JWT authentication
- Access protected admin APIs
- Run the backend using Docker

The backend follows a layered architecture:

```text
React Frontend
      ↓
REST API
      ↓
Controller
      ↓
Service
      ↓
Repository
      ↓
JPA / Hibernate
      ↓
PostgreSQL
```

---

## ✨ Key Features

### 👤 Patient Management

- Add new patients
- View all patients
- View a patient by ID
- Update patient information
- Delete patients
- Search patients by name
- Search patients by email
- Pagination support
- Request validation
- Safe deletion when appointments exist

### 👨‍⚕️ Doctor Management

- Add new doctors
- View all doctors
- View a doctor by ID
- Update doctor information
- Delete doctors
- Search doctors by name
- Search doctors by specialization
- Request validation

### 📅 Appointment Management

- Create appointments
- View all appointments
- View an appointment by ID
- Update appointments
- Delete appointments
- Search appointments by patient
- Search appointments by doctor
- Pagination support
- Date and time support
- Appointment conflict detection
- Prevention of duplicate doctor appointments

### 🔐 Authentication and Authorization

CareHub uses **Spring Security + JWT** for authentication.

- Admin login
- JWT token generation
- Password hashing using BCrypt
- Stateless authentication
- Protected REST APIs
- Role-based authorization
- JWT request filtering
- Swagger JWT authentication

Only authenticated administrators can access the protected hospital management APIs.

### 📊 Admin Dashboard

The admin dashboard provides hospital statistics:

- Total patients
- Total doctors
- Total appointments
- Today's appointments

### ❤️ Health Check

The application exposes a health endpoint:

```http
GET /admin/health
```

Example response:

```json
{
  "status": "UP"
}
```

---

## 🏗️ System Architecture

```text
                     ┌──────────────────────┐
                     │      CareHub UI      │
                     │                      │
                     │   React + Vite       │
                     │   React Router       │
                     │   Axios              │
                     └──────────┬───────────┘
                                │
                                │ REST API
                                │ JWT Authentication
                                ▼
                     ┌──────────────────────┐
                     │    CareHub API       │
                     │                      │
                     │   Spring Boot        │
                     │   Spring Security    │
                     │   JWT                │
                     │   REST Controllers   │
                     │         ↓            │
                     │   Service Layer      │
                     │         ↓            │
                     │   Repository Layer   │
                     │         ↓            │
                     │   JPA / Hibernate    │
                     └──────────┬───────────┘
                                │
                                │ JDBC
                                ▼
                     ┌──────────────────────┐
                     │     PostgreSQL       │
                     │                      │
                     │      CareHub DB      │
                     └──────────────────────┘
```

---

## 🔄 Application Flow

### Login Flow

```text
Admin
  ↓
React Login Page
  ↓
POST /auth/login
  ↓
Spring Security
  ↓
Username + Password Verification
  ↓
JWT Token Generated
  ↓
Token Stored in Browser
  ↓
Protected API Requests
```

### Hospital Management Flow

```text
React UI
   ↓
Axios Request
   ↓
JWT Token
   ↓
Spring Security
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
PostgreSQL
   ↓
Response
   ↓
React UI
```

---

## 🛠️ Technology Stack

### Backend

| Technology | Purpose |
|---|---|
| Java 21 | Programming language |
| Spring Boot 4.1.1 | Backend framework |
| Spring Web | REST APIs |
| Spring Data JPA | Database access |
| Hibernate | ORM |
| Spring Security | Authentication and authorization |
| JWT | Token-based authentication |
| BCrypt | Password hashing |
| PostgreSQL | Database |
| Maven | Build tool |
| Swagger / OpenAPI | API documentation |
| SLF4J | Logging |

### Frontend

| Technology | Purpose |
|---|---|
| React | Frontend library |
| Vite | Frontend build tool |
| React Router | Page navigation |
| Axios | API communication |
| JavaScript | Programming language |
| HTML | Structure |
| CSS | Styling |

### DevOps and Tools

| Tool | Purpose |
|---|---|
| Docker | Containerization |
| Docker Desktop | Local Docker environment |
| Git | Version control |
| GitHub | Source code hosting |
| IntelliJ IDEA | Backend development |
| VS Code | Frontend development |
| Postman | API testing |
| pgAdmin | PostgreSQL management |

---

## 📁 Project Structure

```text
Medicare
│
├── carehub-api
│   ├── src
│   │   ├── main
│   │   │   ├── java/com/Medicare/carehub_api
│   │   │   │   ├── controller
│   │   │   │   ├── service
│   │   │   │   ├── repository
│   │   │   │   ├── entity
│   │   │   │   ├── dto
│   │   │   │   ├── exception
│   │   │   │   └── config
│   │   │   └── resources
│   │   │       └── application.properties
│   │   └── test
│   ├── Dockerfile
│   ├── pom.xml
│   └── mvnw.cmd
│
├── carehub-ui
│   ├── src
│   │   ├── pages
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## 🗄️ Database Design

CareHub uses **PostgreSQL** as its relational database.

### Entities

```text
┌───────────────┐
│    Patient    │
├───────────────┤
│ id            │
│ name          │
│ email         │
│ phone         │
│ age           │
└──────┬────────┘
       │ 1
       │
       │ N
┌──────▼────────────┐
│   Appointment     │
├───────────────────┤
│ id                │
│ appointmentDate   │
│ appointmentTime   │
│ reason            │
│ patient_id        │
│ doctor_id         │
└──────┬────────────┘
       │ N
       │
       │ 1
┌──────▼────────┐
│    Doctor     │
├───────────────┤
│ id            │
│ name          │
│ specialization│
│ email         │
│ phone         │
└───────────────┘
```

An additional **Admin** entity stores administrator credentials (passwords are hashed with BCrypt).

### Relationships

| Relationship | Description |
|---|---|
| Patient 1 ── N Appointment | One patient can have multiple appointments |
| Doctor 1 ── N Appointment | One doctor can have multiple appointments |
| Appointment | Belongs to exactly one patient and one doctor |

---

## 🔐 Authentication and Authorization

CareHub uses JWT-based stateless authentication.

### Login

```http
POST /auth/login
```

Example request:

```json
{
  "username": "CareHub",
  "password": "CareHun@2026"
}
```

Successful response:

```json
{
  "token": "JWT_TOKEN",
  "username": "CareHub"
}
```

Send the token with every protected request:

```http
Authorization: Bearer <JWT_TOKEN>
```

### Access Rules

**Protected (admin only):**

```text
/admin/**
/patients/**
/doctors/**
/appointments/**
```

**Public:**

```text
/auth/login
/swagger-ui.html
/swagger-ui/**
/v3/api-docs/**
```

---

## 🌐 REST API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/login` | Login and receive a JWT |

### 👤 Patients

| Method | Endpoint | Description |
|---|---|---|
| GET | `/patients` | Get all patients |
| GET | `/patients?page=0&size=10` | Get paginated patients |
| GET | `/patients/{id}` | Get patient by ID |
| POST | `/patients` | Create patient |
| PUT | `/patients/{id}` | Update patient |
| DELETE | `/patients/{id}` | Delete patient |
| GET | `/patients/search?name={name}` | Search patients by name |
| GET | `/patients/email?email={email}` | Find patient by email |

### 👨‍⚕️ Doctors

| Method | Endpoint | Description |
|---|---|---|
| GET | `/doctors` | Get all doctors |
| GET | `/doctors/{id}` | Get doctor by ID |
| POST | `/doctors` | Create doctor |
| PUT | `/doctors/{id}` | Update doctor |
| DELETE | `/doctors/{id}` | Delete doctor |
| GET | `/doctors/search?name={name}` | Search doctors by name |
| GET | `/doctors/specialization?specialization={specialization}` | Search doctors by specialization |

### 📅 Appointments

| Method | Endpoint | Description |
|---|---|---|
| GET | `/appointments` | Get all appointments |
| GET | `/appointments/{id}` | Get appointment by ID |
| POST | `/appointments` | Create appointment |
| PUT | `/appointments/{id}` | Update appointment |
| DELETE | `/appointments/{id}` | Delete appointment |
| GET | `/appointments/patient/{patientId}` | Appointments for a patient |
| GET | `/appointments/doctor/{doctorId}` | Appointments for a doctor |

### 📊 Admin

| Method | Endpoint | Description |
|---|---|---|
| GET | `/admin/dashboard` | Hospital statistics |
| GET | `/admin/health` | Health check |

---

## 📚 Swagger / OpenAPI

Interactive API documentation is available through Swagger UI.

| Resource | URL |
|---|---|
| Swagger UI | http://localhost:8081/swagger-ui.html |
| OpenAPI docs | http://localhost:8081/v3/api-docs |

With Swagger you can explore APIs, view request and response structures, authorize using a JWT, and send authenticated requests.

---

## 🚀 Getting Started

### Prerequisites

- Java 21
- Maven
- PostgreSQL
- Node.js and npm
- Git
- Docker Desktop (optional)

### 1. Clone the repository

```bash
git clone https://github.com/Krishna-Dhamanekar/Medicare-Hospital-Management-System.git
cd Medicare-Hospital-Management-System
```

### 2. Set up the database

Create a PostgreSQL database named:

```text
CareHub
```

Local JDBC URL:

```text
jdbc:postgresql://localhost:5432/CareHub
```

> Database username, password and other secrets must be configured locally in `application.properties` (or environment variables) and **must not be committed to GitHub**.

### 3. Run the backend

```bash
cd carehub-api
./mvnw clean package -DskipTests
./mvnw spring-boot:run
```

On Windows:

```powershell
cd carehub-api
.\mvnw.cmd clean package -DskipTests
.\mvnw.cmd spring-boot:run
```

The backend runs at **http://localhost:8081**.

### 4. Run the frontend

```bash
cd carehub-ui
npm install
npm run dev
```

The frontend runs at **http://localhost:5173**.

---

## 🐳 Docker Support

The CareHub API can be packaged and run as a Docker container.

### Dockerfile

```dockerfile
FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Build the JAR

From `carehub-api`:

```bash
./mvnw clean package -DskipTests
```

### Build the image

```bash
docker build -t carehub-api .
```

### Run the container

```bash
docker run -d --name carehub-container -p 8082:8081 carehub-api
```

The containerized API is then available at:

- API: http://localhost:8082
- Swagger: http://localhost:8082/swagger-ui.html

Inside Docker, the backend connects to the host database using:

```text
jdbc:postgresql://host.docker.internal:5432/CareHub
```

### Useful Docker commands

| Action | Command |
|---|---|
| List running containers | `docker ps` |
| Stop container | `docker stop carehub-container` |
| Start container | `docker start carehub-container` |
| View logs | `docker logs carehub-container` |
| Remove container | `docker rm -f carehub-container` |

---

## 🧪 Testing

The backend was manually tested using **Postman, Swagger UI, the React frontend, PostgreSQL / pgAdmin and Docker**.

| Area | Scenarios tested |
|---|---|
| Authentication | Successful login, invalid credentials, JWT-protected endpoints, unauthorized access |
| Patients | Create, read, update, delete, search, pagination, validation, not found, safe-delete conflict |
| Doctors | Create, read, update, delete, search, not found |
| Appointments | Create, read, update, delete, patient filtering, doctor filtering, pagination, duplicate appointment conflict, not found |
| Dashboard | Statistics, health check |

---

## 📡 HTTP Status Codes

| Status | Meaning |
|---|---|
| 200 | Request successful |
| 201 | Resource created |
| 204 | Resource deleted successfully |
| 400 | Invalid request / validation error |
| 401 | Authentication required |
| 403 | Access denied |
| 404 | Resource not found |
| 409 | Resource conflict |
| 500 | Internal server error |

---

## ⚠️ Exception Handling and Validation

### Centralized exception handling

CareHub handles errors in one place using `GlobalExceptionHandler`, with custom exceptions:

- `ResourceNotFoundException` → **404 Not Found** (e.g. patient not found)
- `ConflictException` → **409 Conflict** (e.g. duplicate appointment)
- Validation failures → **400 Bad Request**

### Validation

Request DTOs use **Jakarta Bean Validation**:

```text
@NotBlank
@NotNull
@Email
@Min
```

Example rule: patient age must be at least 1.

---

## 🔒 Security Considerations

- Spring Security
- JWT authentication
- BCrypt password hashing
- Stateless sessions
- Role-based authorization
- Protected REST APIs
- CORS configuration
- Authentication filter
- Secure password storage

> **Important:** Sensitive configuration must not be hardcoded in a real deployment. Move the following to environment variables or a secret-management system:
>
> - Database username
> - Database password
> - JWT secret
> - Admin credentials

---

## 🌍 CORS, Logging and Transactions

**CORS** — the backend accepts requests from the React dev server at `http://localhost:5173` with the methods `GET`, `POST`, `PUT`, `DELETE` and `OPTIONS`.

**Logging** — the backend uses SLF4J. Important operations such as appointment creation are logged, for example:

```text
Creating appointment for patientId=... and doctorId=...
Appointment created successfully with id=...
```

**Transactions** — appointment creation and update use `@Transactional` to keep the database consistent when several operations are involved.

---

## 🎯 Project Objectives

CareHub was built to gain practical experience with:

- REST API development
- Spring Boot
- Spring Security and JWT authentication
- Spring Data JPA and Hibernate
- PostgreSQL and database relationships
- React, React Router and Axios
- DTO architecture
- Validation and exception handling
- Pagination
- Logging and transactions
- Docker
- Git and GitHub
- Full-stack application architecture

---

## 🔮 Future Improvements

- [ ] Cloud deployment
- [ ] Automated unit and integration tests
- [ ] CI/CD pipeline
- [ ] Docker Compose
- [ ] Environment-based configuration
- [ ] Refresh token authentication
- [ ] Multiple admin roles
- [ ] Doctor authentication
- [ ] Patient authentication
- [ ] Email notifications
- [ ] Appointment reminders
- [ ] Advanced appointment scheduling
- [ ] Medical records
- [ ] Prescription management
- [ ] Billing management
- [ ] Hospital reports
- [ ] Analytics dashboard
- [ ] Production database configuration

---

## 📂 Repository

**Medicare Hospital Management System**
https://github.com/Krishna-Dhamanekar/Medicare-Hospital-Management-System

---

## 👨‍💻 Author

**Krishna Dhamanekar**
B.E. Computer Science & Engineering

CareHub was designed and developed by Krishna Dhamanekar as a full-stack hospital management system project.

- GitHub: https://github.com/Krishna-Dhamanekar
- LinkedIn: https://linkedin.com/in/krishna-dhamanekar

---

## 📄 License

This project is developed for educational, learning and portfolio purposes.