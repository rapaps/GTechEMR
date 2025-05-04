# 🖥️ GTECH EMR – Frontend Routes & Component Map

This document outlines the routing structure of the React-based frontend interface.  
It includes all page-level components, their corresponding routes, and the core UI purpose.

---

## 🚦 Routing Engine

- Built with **React Router DOM v6**
- Routes declared in `/src/App.js`
- Functional components located in `/src/pages/`

---

## 🌐 Main Routes

| Route Path               | Component File             | Purpose                                 |
|--------------------------|----------------------------|------------------------------------------|
| `/`                      | `Home.jsx`                 | Landing page, intro, system overview     |
| `/register`              | `Register.jsx`             | Patient intake form                      |
| `/manage-appointments`   | `UnifiedAppointment.jsx`   | Book, update, delete appointments        |
| `/medical-history`       | `MedicalHistory.jsx`       | Add/view chronic issues, allergies       |
| `/lab-reports`           | `LabReports.jsx`           | Upload test results                      |
| `/diagnosis`             | `Diagnosis.jsx`            | Symptom entry, diagnosis confirmation    |
| `/treatment`             | `Treatment.jsx`            | Prescriptions, lifestyle, follow-up      |
| `/doctor`                | `DoctorForm.jsx`           | Add doctor to system                     |
| `/smartlookup`           | `SmartLookup.jsx`          | 🔍 Universal search (Patient/Doctor/Appt)|
| `/admin`                 | `AdminDashboard.jsx`       | 📊 Dashboard with filters and charts     |
| `/smartrisk`             | `SmartRiskPanel.jsx`       | 🧠 Predictive AI risk level interface     |

---

## 🧩 Shared UI Components

| Component             | Path                    | Used In                                 |
|-----------------------|-------------------------|------------------------------------------|
| `Navbar.jsx`          | `/components/Navbar.jsx`| All pages (navigation bar)               |

---

## 💄 Styling & Theming

- Global CSS (optional): `styles.css`
- Majority of UI is inline-styled
- Responsive-friendly with `max-width`, flex/grid where needed

---

## 📄 PDF / Export Features

- Built into `SmartLookup.jsx` via **jsPDF**
- Export buttons appear conditionally per lookup type

---

## ⚙️ Enhancements Suggested

- [x] Add Smart Risk Analysis route with AI integration
- [ ] Add Route Guards / Roles (Admin, Receptionist)
- [ ] Component library (e.g., ChakraUI, MaterialUI)
- [ ] Mobile UI enhancements (responsive Navbar, collapsible layout)
