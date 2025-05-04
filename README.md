# 🏥 GTechnologies AI-Driven EMR System

A full-stack Electronic Medical Record (EMR) system built with React, Node.js, MySQL, and integrated Machine Learning for predictive health analytics. Designed to streamline patient care, administrative efficiency, and intelligent diagnosis support.

---

## 📌 Features

### 🔐 Patient Registration & Management
- Secure form with detailed demographic & medical history intake
- Automated ID tracking & emergency contact fields
- Smart patient search and profile lookup

### 📅 Appointment Scheduling
- Unified CRUD interface with filterable view
- Smart conflict resolution to prevent double-booking
- Doctor lookup & patient ID autocomplete integration

### 🧠 AI Risk Prediction Module
- Predicts patient risk levels (Low / Moderate / High)
- Input features: age, gender, chronic conditions, family/smoking history
- Python ML backend (RandomForestClassifier) triggered via `/api/ml/predict-by-patient`

### 🧾 Diagnosis & Treatment Logging
- Structured forms for symptoms, observations, tests, and prescriptions
- Linked diagnosis-to-treatment pipeline
- AI-augmented medical insights and follow-up guidance

### 🧬 Lab Reports Module
- Submit lab test values (WBC, RBC, glucose, cholesterol, etc.)
- Imaging & microbiology findings support
- Linked to physician and patient records

### 📊 Admin Dashboard
- Real-time metrics: appointments, lab submissions, total users
- Filter by doctor, date, or patient
- Export reports to PDF with one click

---

## ⚙️ Tech Stack

| Layer        | Technology                       |
|--------------|-----------------------------------|
| Frontend     | React.js, Chart.js, Axios, jsPDF |
| Backend      | Node.js, Express.js, MySQL       |
| Database     | MySQL 8, MySQL Workbench         |
| ML Model     | Python (scikit-learn, `predict_v2.py`) |
| Deployment   | Localhost / Nginx + PM2 ready    |

---

## 🗃️ Project Structure

```
📁 client/
  ├─ components/          # React components (forms, dashboard)
  ├─ pages/               # Route-based views
  └─ App.js               # Main routing

📁 server/
  ├─ server.js            # Main Express backend
  ├─ db.js                # MySQL connection pool
  ├─ routes/
      └─ mlPredictByPatient.js  # ML integration logic
  └─ .env                 # Environment variables
```

---

## 🚀 Deployment Instructions

### 1. Clone Repo

```bash
git clone https://github.com/your-username/emr-system
cd emr-system
```

### 2. Setup Backend

```bash
cd server
npm install
cp .env.example .env   # Add DB credentials
node server.js
```

### 3. Setup Frontend

```bash
cd client
npm install
npm start
```

### 4. Run ML Engine

Make sure `ML/predict_v2.py` exists and is trained. It's triggered by Node’s `spawnSync`.

---

## 🔒 Environment Variables

```env
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASS=root1234
DB_NAME=gtech_emr
```

---

## 📦 Sample API Endpoints

| Type       | Endpoint                           |
|------------|------------------------------------|
| POST       | `/api/register`                    |
| POST       | `/api/appointment`                 |
| POST       | `/api/diagnosis`                   |
| GET        | `/api/patient/:id`                 |
| POST       | `/api/ml/predict-by-patient`       |
| GET        | `/api/admin/dashboard`             |

---

## 🧠 ML Model Input Format

```json
{
  "age": 42,
  "gender": "Male",
  "has_diabetes": 1,
  "has_hypertension": 0,
  "family_history": 1,
  "is_smoker": 0
}
```

Returns:

```json
{
  "status": "ok",
  "risk_level": "Moderate"
}
```
## 📄 Documentation
- [API Reference](.documetation/api_reference.md)   
- [Database Schema](./db_schema.md)
- [Deployment Guide](./deployment_guide.md)
- [Frontend Routes](./frontend_routes.md)
- [ML/AI Features](./ml_ai_features.md)
- [Admin Features](./admin_features.md)

---

## 🙌 Credits

- 👨‍💻 Developed by: **Rahul Papaganti**
- 🏫 Institution: Indiana University Indianapolis/Gtechnologies PTY LTD
- 📆 Project Term: Spring 2025

---
