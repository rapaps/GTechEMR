// server/server.js
require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true // 🧠 Enables multi-SELECT queries
});


db.connect((err) => {
  if (err) {
    console.error('❌ Database connection error:', err.message);
    return;
  }
  console.log('✅ Connected to GTECH EMR DB');
});

// Routes

// 1️⃣ Registration
app.post('/api/register', (req, res) => {
console.log('📨 Incoming register data:', req.body);
  const {
    patientId, firstName, lastName, email, dob, gender,
    phone, address, medicalHistory, allergies,
    emergencyContact, emergencyPhone, maritalStatus, occupation
  } = req.body;

  const query = `
    INSERT INTO registration
    (patient_id, first_name, last_name, email, dob, gender, phone, address,
     medical_history, allergies, emergency_contact, emergency_phone, marital_status, occupation)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [
    patientId, firstName, lastName, email, dob, gender,
    phone, address, medicalHistory, allergies,
    emergencyContact, emergencyPhone, maritalStatus, occupation
  ], (err) => {
    if (err) {
      console.error('❌ Error saving registration:', err.message);
      return res.status(500).send('Registration failed');
    }
    res.send('Registration successful');
  });
});

// 2️⃣ Appointment Booking
app.post('/api/appointment', (req, res) => {
  const {
    appointmentId, patientId, doctorId, appointmentDate, appointmentTime
  } = req.body;

  const query = `
    INSERT INTO appointment_booking
    (appointment_id, patient_id, doctor_id, appointment_date, appointment_time)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [
    appointmentId, patientId, doctorId, appointmentDate, appointmentTime
  ], (err) => {
    if (err) {
      console.error('❌ Error saving appointment:', err.message);
      return res.status(500).send('Appointment failed');
    }
    res.send('Appointment booked');
  });
});

// 3️⃣ Medical History
app.post('/api/medical-history', (req, res) => {
  const {
    patientId,
    chronicIllnesses,
    previousSurgeries,
    currentMedications,
    allergies,
    hospitalizations,
    familyHistory,
    immunizations,
    socialHistory,
    otherConditions
  } = req.body;

  const query = `
    INSERT INTO medical_history
    (patient_id, chronic_illnesses, previous_surgeries, current_medications,
     allergies, hospitalizations, family_history, immunizations, social_history, other_conditions)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [
    patientId,
    chronicIllnesses,
    previousSurgeries,
    currentMedications,
    allergies,
    hospitalizations,
    familyHistory,
    immunizations,
    socialHistory,
    otherConditions
  ], (err) => {
    if (err) {
      console.error('❌ Error saving medical history:', err.message);
      return res.status(500).send('Medical history failed');
    }
    res.send('Medical history saved');
  });
});

// 4️⃣ Lab Reports
app.post('/api/lab-report', (req, res) => {
  const {
    labReportId, patientId, testDate, doctorId,
    hemoglobin, rbc, wbc, bloodGlucose, cholesterol,
    microbiology, xray, ctScan, mri, ultrasound
  } = req.body;

  const query = `
    INSERT INTO lab_reports
    (lab_report_id, patient_id, doctor_id, test_date,
     hemoglobin, rbc, wbc, blood_glucose, cholesterol,
     microbiology, xray, ct_scan, mri, ultrasound)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [
    labReportId, patientId, doctorId, testDate,
    hemoglobin, rbc, wbc, bloodGlucose, cholesterol,
    microbiology, xray, ctScan, mri, ultrasound
  ], (err) => {
    if (err) {
      console.error('❌ Error saving lab report:', err.message);
      return res.status(500).send('Lab submission failed');
    }
    res.send('Lab report saved');
  });
});

// 5️⃣ Diagnosis
app.post('/api/diagnosis', (req, res) => {
  const {
    diagnosisId,
    patientId,
    diagnosisDate,
    symptoms,
    observations,
    bp,
    heartRate,
    provisionalDiagnosis,
    testsPerformed,
    finalDiagnosis,
    treatmentPlan,
    followUpInstructions
  } = req.body;

  const query = `INSERT INTO diagnosis (
    diagnosis_id,
    patient_id,
    diagnosis_date,
    symptoms,
    observations,
    bp,
    heart_rate,
    provisional_diagnosis,
    tests_performed,
    final_diagnosis,
    treatment_plan,
    follow_up_instructions
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    diagnosisId,
    patientId,
    diagnosisDate,
    symptoms,
    observations,
    bp,
    heartRate,
    provisionalDiagnosis,
    testsPerformed,
    finalDiagnosis,
    treatmentPlan,
    followUpInstructions
  ];

  db.query(query, values, (err) => {
    if (err) {
      console.error('❌ Error saving diagnosis:', err.message);
      return res.status(500).send('Diagnosis failed');
    }
    res.send('✅ Diagnosis saved');
  });
});

// 6️⃣ Treatment
app.post('/api/treatment', (req, res) => {
  const {
    treatmentId,
    diagnosisId,
    patientId,
    treatmentDate,
    prescribedMedications,
    performedProcedures,
    therapyPlan,
    dietRecommendations,
    lifestyleRecommendations,
    followUpSchedule
  } = req.body;

  const query = `
    INSERT INTO treatment (
      treatment_id, diagnosis_id, patient_id, treatment_date,
      prescribed_medications, performed_procedures, therapy_plan,
      diet_recommendations, lifestyle_recommendations, follow_up_schedule
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    treatmentId,
    diagnosisId,
    patientId,
    treatmentDate,
    prescribedMedications,
    performedProcedures,
    therapyPlan,
    dietRecommendations,
    lifestyleRecommendations,
    followUpSchedule
  ];

  db.query(query, values, (err) => {
    if (err) {
      console.error('❌ Error saving treatment:', err.message);
      return res.status(500).send('Treatment failed');
    }
    res.send('✅ Treatment saved');
  });
});

// 7️⃣ Doctor Info
app.post('/api/doctor', (req, res) => {
  const {
    doctorId, doctorName, doctorSpeciality,
    department, gender, dob
  } = req.body;

  const query = `
    INSERT INTO doctor
    (doctor_id, doctor_name, doctor_speciality, dept_posted, gender, dob)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [
    doctorId, doctorName, doctorSpeciality,
    department, gender, dob
  ], (err) => {
    if (err) {
      console.error('❌ Error saving doctor:', err.message);
      return res.status(500).send('Doctor form failed');
    }
    res.send('Doctor added');
  });
});


// 8️⃣ Route to fetch complete patient data by ID
app.get('/api/patient/:id', (req, res) => {
  const patientId = req.params.id;

  const queries = {
    registration: `SELECT * FROM registration WHERE patient_id = ?`,
    appointments: `SELECT * FROM appointment_booking WHERE patient_id = ?`,
    medical_history: `SELECT * FROM medical_history WHERE patient_id = ?`,
    lab_reports: `SELECT * FROM lab_reports WHERE patient_id = ?`,
    diagnosis: `SELECT * FROM diagnosis WHERE patient_id = ?`,
    treatment: `SELECT * FROM treatment WHERE patient_id = ?`
  };

  const result = {};
  const keys = Object.keys(queries);
  let index = 0;

  function next() {
    if (index >= keys.length) {
      return res.json(result);
    }

    const key = keys[index];
    db.query(queries[key], [patientId], (err, rows) => {
      if (err) {
        console.error(`❌ Error fetching ${key}:`, err.message);
        result[key] = { error: true, message: err.message };
      } else {
        result[key] = rows;
      }

      index++;
      next();
    });
  }

  next();
});


// -------------------------------------------
/// ✅ TRUE autocomplete endpoint — must be at the bottom and unique
app.get('/api/patient/autocomplete', (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).send('Missing query');

  const search = `%${q}%`;
  const query = `
    SELECT patient_id, first_name, last_name
    FROM registration
    WHERE first_name COLLATE utf8_general_ci LIKE ?
       OR last_name COLLATE utf8_general_ci LIKE ?
    LIMIT 10
  `;

  db.query(query, [search, search], (err, rows) => {
    if (err) {
      console.error('❌ Autocomplete DB error:', err.message);
      return res.status(500).send('Database error');
    }

    console.log('🔎 Autocomplete results:', rows);
    res.json(rows); // 🧠 This should return an array!
  });
});

// Doctor Lookup by ID or Name
app.get('/api/doctor/lookup', (req, res) => {
  const { id, name } = req.query;

  if (!id && !name) return res.status(400).send('Missing doctor ID or name');

  const filters = [];
  if (id) filters.push(`doctor_id = ${db.escape(id)}`);
  if (name) filters.push(`doctor_name COLLATE utf8_general_ci LIKE ${db.escape('%' + name + '%')}`);

  const query = `
    SELECT * FROM doctor WHERE ${filters.join(' OR ')};
    SELECT * FROM appointment_booking WHERE doctor_id IN (
      SELECT doctor_id FROM doctor WHERE ${filters.join(' OR ')}
    );
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Doctor lookup error:', err.message);
      return res.status(500).send('Doctor lookup failed');
    }

    const [doctorInfo, appointments] = results;
    res.json({ doctor: doctorInfo[0], appointments });
  });
});


// 9️⃣ Appointment Management API
app.get('/api/appointments', (req, res) => {
  const query = `SELECT * FROM appointment_booking ORDER BY appointment_date DESC`;
  db.query(query, (err, rows) => {
    if (err) {
      console.error('❌ Error fetching appointments:', err.message);
      return res.status(500).send('Failed to fetch appointments');
    }
    res.json(rows);
  });
});

app.get('/api/appointments/:appointmentId', (req, res) => {
  const { appointmentId } = req.params;
  const query = `SELECT * FROM appointment_booking WHERE appointment_id = ?`;
  db.query(query, [appointmentId], (err, rows) => {
    if (err) {
      console.error('❌ Error fetching appointment:', err.message);
      return res.status(500).send('Failed to fetch appointment');
    }
    res.json(rows[0]);
  });
});

app.post('/api/appointments', (req, res) => {
  const { appointmentId, patientId, doctorId, appointmentDate, appointmentTime } = req.body;
  const query = `
    INSERT INTO appointment_booking
    (appointment_id, patient_id, doctor_id, appointment_date, appointment_time)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(query, [appointmentId, patientId, doctorId, appointmentDate, appointmentTime], (err) => {
    if (err) {
      console.error('❌ Error creating appointment:', err.message);
      return res.status(500).send('Failed to create appointment');
    }
    res.send('✅ Appointment created');
  });
});

app.put('/api/appointments/:appointmentId', (req, res) => {
  const { appointmentId } = req.params;
  const { patientId, doctorId, appointmentDate, appointmentTime } = req.body;

  const query = `
    UPDATE appointment_booking
    SET patient_id = ?, doctor_id = ?, appointment_date = ?, appointment_time = ?
    WHERE appointment_id = ?
  `;

  db.query(query, [patientId, doctorId, appointmentDate, appointmentTime, appointmentId], (err) => {
    if (err) {
      console.error('❌ Error updating appointment:', err.message);
      return res.status(500).send('Failed to update appointment');
    }
    res.send('🛠️ Appointment updated');
  });
});

app.delete('/api/appointments/:appointmentId', (req, res) => {
  const { appointmentId } = req.params;
  const query = `DELETE FROM appointment_booking WHERE appointment_id = ?`;

  db.query(query, [appointmentId], (err) => {
    if (err) {
      console.error('❌ Error deleting appointment:', err.message);
      return res.status(500).send('Failed to delete appointment');
    }
    res.send('🗑️ Appointment deleted');
  });
});

// 📊 ADMIN DASHBOARD SUMMARY
app.get('/api/admin/dashboard', (req, res) => {
  const { patientId, doctorId, startDate, endDate } = req.query;

  const filters = [];
  if (patientId) filters.push(`appointment_booking.patient_id = ${db.escape(patientId)}`);
  if (doctorId) filters.push(`appointment_booking.doctor_id = ${db.escape(doctorId)}`);
  if (startDate && endDate) filters.push(`appointment_booking.appointment_date BETWEEN ${db.escape(startDate)} AND ${db.escape(endDate)}`);
  const whereClause = filters.length ? `WHERE ${filters.join(' AND ')}` : '';

  const query = `
    SELECT
      (SELECT COUNT(*) FROM registration) AS totalPatients,
      (SELECT COUNT(*) FROM doctor) AS totalDoctors,
      (SELECT COUNT(*) FROM appointment_booking) AS totalAppointments,
      (SELECT COUNT(*) FROM lab_reports WHERE DATE(test_date) = CURDATE()) AS labReportsToday;

    SELECT DATE(appointment_date) as date, COUNT(*) as count
    FROM appointment_booking
    ${whereClause}
    GROUP BY DATE(appointment_date)
    ORDER BY DATE(appointment_date);
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('❌ Dashboard query failed:', err.sqlMessage);
      return res.status(500).send('Dashboard query error');
    }

    const [counts] = results;
    const trends = results[1];
    res.json({ ...counts[0], trends });
  });
});

//RiskpredictorAI
const mlByPatient = require('./routes/mlPredictByPatient');
app.use('/api', mlByPatient);


// 🚀 Start server
app.listen(PORT, () => {
  console.log(`🟢 Server running at http://localhost:${PORT}`);
});
