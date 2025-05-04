# 🧠 GTECH EMR – Database Schema Documentation

This file defines all table structures, columns, datatypes, and primary/foreign keys within the GTECH EMR system.  
Data verified from live `db_skeleton1.csv` schema export.

---

## 🗂 Tables Overview

| Table Name            | Description                                      |
|-----------------------|--------------------------------------------------|
| `registration`        | Patient demographic & contact info              |
| `doctor`              | Doctor profiles and specialties                 |
| `appointment_booking` | Links patients to doctors on a date & time      |
| `diagnosis`           | Clinical observations and conclusions           |
| `treatment`           | Medical interventions based on diagnoses        |
| `lab_reports`         | Lab test types, results, and dates              |
| `medical_history`     | Chronic/immune/social conditions                |
| `doctor_availability` | Pre-set available date/time slots               |

---

## 👤 registration

| Column             | Type         | Key      | Notes                                 |
|--------------------|--------------|----------|---------------------------------------|
| patient_id         | INT          | PK       | Auto-increment                        |
| first_name         | VARCHAR(50)  |          | Required                              |
| last_name          | VARCHAR(50)  |          | Required                              |
| dob                | DATE         |          | Date of birth                         |
| gender             | VARCHAR(10)  |          | Male/Female/Other                     |
| phone              | VARCHAR(20)  |          | Primary contact                       |
| email              | VARCHAR(100) |          | Optional                              |
| address            | TEXT         |          | Full address                          |
| emergency_contact  | VARCHAR(100) |          | Contact name                          |
| emergency_phone    | VARCHAR(20)  |          | Number of emergency contact           |

---

## 👨‍⚕️ doctor

| Column        | Type         | Key      | Notes                                 |
|---------------|--------------|----------|---------------------------------------|
| doctor_id     | INT          | PK       | Auto-increment                        |
| doctor_name   | VARCHAR(100) |          | Full name                             |
| email         | VARCHAR(100) |          | Doctor's email                        |
| phone         | VARCHAR(20)  |          | Doctor's contact                      |
| department    | VARCHAR(100) |          | E.g. Cardiology, Pediatrics           |
| speciality    | VARCHAR(100) |          | Sub-specialization                    |

---

## 📅 appointment_booking

| Column             | Type         | Key     | Notes                                 |
|--------------------|--------------|---------|---------------------------------------|
| appointment_id     | VARCHAR(50)  | PK      | UUID format                           |
| patient_id         | INT          | FK      | ➝ registration.patient_id             |
| doctor_id          | INT          | FK      | ➝ doctor.doctor_id                    |
| appointment_date   | DATE         |         | Date scheduled                        |
| appointment_time   | TIME         |         | Time scheduled                        |

---

## 🧠 diagnosis

| Column                  | Type         | Key     | Notes                                |
|-------------------------|--------------|---------|--------------------------------------|
| diagnosis_id            | INT          | PK      | Auto-increment                       |
| patient_id              | INT          | FK      | ➝ registration.patient_id            |
| diagnosis_date          | DATE         |         |                                       |
| symptoms                | TEXT         |         | Patient-reported                     |
| observations            | TEXT         |         | Doctor notes                         |
| bp                      | VARCHAR(10)  |         | Blood pressure                       |
| heart_rate              | VARCHAR(10)  |         | Beats per minute                     |
| provisional_diagnosis   | TEXT         |         | Initial assumption                   |
| tests_performed         | TEXT         |         | Labs, X-rays, etc                    |
| final_diagnosis         | TEXT         |         | Confirmed diagnosis                  |
| treatment_plan          | TEXT         |         | Proposed actions                     |
| follow_up_instructions  | TEXT         |         | Notes for next visit                 |

---

## 💊 treatment

| Column                     | Type         | Key     | Notes                                |
|----------------------------|--------------|---------|--------------------------------------|
| treatment_id               | INT          | PK      | Auto-increment                       |
| diagnosis_id               | INT          | FK      | ➝ diagnosis.diagnosis_id             |
| patient_id                 | INT          | FK      | ➝ registration.patient_id            |
| treatment_date             | DATE         |         |                                       |
| prescribed_medications     | TEXT         |         | Drug names and dosages               |
| performed_procedures       | TEXT         |         | Surgeries or procedures              |
| therapy_plan               | TEXT         |         | E.g. CBT, physiotherapy              |
| diet_recommendations       | TEXT         |         | Nutritional guidance                 |
| lifestyle_recommendations  | TEXT         |         | Smoking/alcohol/exercise etc.        |
| follow_up_schedule         | TEXT         |         | Next visit details                   |
| additional_notes           | TEXT         |         | Free text                            |

---

## 🧪 lab_reports

| Column        | Type         | Key     | Notes                              |
|---------------|--------------|---------|------------------------------------|
| report_id     | INT          | PK      | Auto-increment                     |
| patient_id    | INT          | FK      | ➝ registration.patient_id          |
| test_type     | VARCHAR(100) |         | e.g., CBC, ECG                     |
| test_result   | TEXT         |         | Interpretation                     |
| test_date     | DATE         |         | Date tested                        |

---

## 🧬 medical_history

| Column              | Type         | Key     | Notes                              |
|---------------------|--------------|---------|------------------------------------|
| history_id          | INT          | PK      | Auto-increment                     |
| patient_id          | INT          | FK      | ➝ registration.patient_id          |
| chronic_illnesses   | TEXT         |         | Diabetes, hypertension, etc.       |
| allergies           | TEXT         |         | Food/drug allergies                |
| immunizations       | TEXT         |         | Vaccine history                    |
| family_history      | TEXT         |         | Inherited conditions               |
| social_history      | TEXT         |         | Alcohol, tobacco, lifestyle        |

---

## ⏰ doctor_availability

| Column             | Type       | Key     | Notes                              |
|--------------------|------------|---------|------------------------------------|
| availability_id    | INT        | PK      | Auto-increment                     |
| doctor_id          | INT        | FK      | ➝ doctor.doctor_id                 |
| available_date     | DATE       |         | Date slot                          |
| available_time     | TIME       |         | Time slot                          |

---

## 🔗 Relationship Map

```plaintext
registration ─┬─> appointment_booking.patient_id
              ├─> medical_history.patient_id
              ├─> lab_reports.patient_id
              ├─> diagnosis.patient_id
              └─> treatment.patient_id

doctor ───────┬─> appointment_booking.doctor_id
              └─> doctor_availability.doctor_id

diagnosis ────└─> treatment.diagnosis_id
