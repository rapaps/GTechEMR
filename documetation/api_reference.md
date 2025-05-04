# 📡 GTECH EMR – API Reference

This document outlines all available API routes within the backend (`/server.js` + route modules).  
The backend is powered by **Express.js**, with all endpoints following RESTful design principles.

---

## 🏥 Patient APIs

### `GET /api/patient/:id`
- 🔍 Fetch full patient data by ID
- Returns: demographics, appointments, history, diagnosis, treatments, labs

---

## 📥 Registration APIs

### `POST /api/register`
- 📝 Add new patient
- Payload: JSON body with patient details

---

## 📅 Appointment APIs

### `POST /api/appointment`
- 📌 Book an appointment
- Requires: `patient_id`, `doctor_id`, `appointment_date`, `appointment_time`

### `GET /api/appointments`
- 📄 Get all appointments

### `GET /api/appointments/:appointment_id`
- 🔍 View appointment by ID

### `PUT /api/appointments/:appointment_id`
- ✏️ Edit an appointment

### `DELETE /api/appointments/:appointment_id`
- 🗑️ Delete an appointment

---

## 🧠 Diagnosis APIs

### `POST /api/diagnosis`
- Add a new diagnosis for a patient

---

## 💊 Treatment APIs

### `POST /api/treatment`
- Save treatment linked to a diagnosis

---

## 🧪 Lab Report APIs

### `POST /api/lab-report`
- Upload lab test record

---

## 📖 Medical History APIs

### `POST /api/medical-history`
- Add or update patient history

---

## 👨‍⚕️ Doctor APIs

### `POST /api/doctor`
- Add new doctor

### `GET /api/doctor/lookup?id=9001`
- 🔍 Lookup by doctor ID

### `GET /api/doctor/lookup?name=smith`
- 🔍 Lookup by name (partial matches supported)

---

## ⏰ Doctor Availability APIs

### `POST /api/availability`
- Add new availability slot

### `GET /api/availability`
- View all availability

### `PUT /api/availability/:id`
- Edit slot

### `DELETE /api/availability/:id`
- Delete slot

---

## 🔍 Smart Lookup (Unified Search)

### `GET /api/patient/:id`
- Returns full patient data

### `GET /api/appointments/:id`
- Returns appointment details

### `GET /api/doctor/lookup?id=...`
- Doctor info + linked appointments

---

## 📊 Admin Dashboard API

### `GET /api/admin/dashboard`
- Returns:
  - Total counts: patients, doctors, appointments, lab reports today
  - Trends: appointments per day (filterable)

🔧 Query params supported:
?patientId=1001&doctorId=9002&startDate=2024-05-01&endDate=2024-05-30

---

## 🧠 AI Risk Prediction API

### `POST /api/ml/predict-by-patient`
- Predicts patient readmission or risk level
- Requires: `patientId` in the request body
- Returns: JSON with `risk_level` or a fallback message

---

## 🧾 PDF/Export Features

Handled on the frontend using `jsPDF`, not a backend route.

---

## ⚙️ Security / Notes

- CORS enabled
- `.env` file used for DB credentials
- No auth layer currently implemented

---
