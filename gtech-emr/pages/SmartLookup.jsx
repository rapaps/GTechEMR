import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

const SmartLookup = () => {
  const [lookupType, setLookupType] = useState('patient');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('');

  // 🔍 Handles the actual search
  const handleSearch = async () => {
    setStatus('Searching...');
    setResult(null);
    try {
      let res;

      if (lookupType === 'patient') {
        res = await axios.get(`http://localhost:3001/api/patient/${query}`);
      } else if (lookupType === 'doctor') {
        const isNumeric = /^\d+$/.test(query);
        res = await axios.get(`http://localhost:3001/api/doctor/lookup?${isNumeric ? `id=${query}` : `name=${query}`}`);
      } else if (lookupType === 'appointment') {
        res = await axios.get(`http://localhost:3001/api/appointments/${query}`);
      }

      setResult(res.data);
      setStatus('');
    } catch (err) {
      console.error(err);
      setStatus('❌ Not found or error occurred.');
    }
  };

  // 🧾 PDF Export based on result type
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('🔍 Smart Lookup Export', 10, 10);
    doc.setFontSize(11);
    let y = 20;

    if (lookupType === 'patient' && result?.registration?.length) {
      const p = result.registration[0];
      doc.text(`👤 Patient: ${p.first_name} ${p.last_name}`, 10, y); y += 8;
      doc.text(`DOB: ${new Date(p.dob).toLocaleDateString()} | Gender: ${p.gender}`, 10, y); y += 8;
      doc.text(`Phone: ${p.phone} | Email: ${p.email}`, 10, y); y += 8;
      doc.text(`Address: ${p.address}`, 10, y); y += 8;
      doc.text(`Emergency Contact: ${p.emergency_contact} (${p.emergency_phone})`, 10, y); y += 12;

      if (result.appointments?.length) {
        doc.text('📅 Appointments:', 10, y); y += 8;
        result.appointments.forEach(a => {
          doc.text(`→ ${a.appointment_id} | Dr. ${a.doctor_id} | ${new Date(a.appointment_date).toLocaleDateString()} @ ${a.appointment_time}`, 10, y);
          y += 6;
        });
      }
    }

    if (lookupType === 'doctor' && result?.doctor) {
      const d = result.doctor;
      doc.text(`👨‍⚕️ Doctor: ${d.doctor_name}`, 10, y); y += 8;
      doc.text(`Email: ${d.email} | Phone: ${d.phone}`, 10, y); y += 8;
      doc.text(`Dept: ${d.department} | Speciality: ${d.speciality}`, 10, y); y += 12;

      if (result.appointments?.length) {
        doc.text('📅 Appointments:', 10, y); y += 8;
        result.appointments.forEach(a => {
          doc.text(`→ Patient ${a.patient_id} | ${new Date(a.appointment_date).toLocaleDateString()} @ ${a.appointment_time}`, 10, y);
          y += 6;
        });
      }
    }

    if (lookupType === 'appointment' && result?.appointment_id) {
      doc.text(`📄 Appointment ID: ${result.appointment_id}`, 10, y); y += 8;
      doc.text(`Patient ID: ${result.patient_id}`, 10, y); y += 6;
      doc.text(`Doctor ID: ${result.doctor_id}`, 10, y); y += 6;
      doc.text(`Date: ${new Date(result.appointment_date).toLocaleDateString()}`, 10, y); y += 6;
      doc.text(`Time: ${result.appointment_time}`, 10, y);
    }

    doc.save(`${lookupType}_lookup.pdf`);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🔍 Smart Lookup Panel</h2>

      {/* INPUT CONTROLS */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <select value={lookupType} onChange={e => setLookupType(e.target.value)}>
          <option value="patient">Patient ID</option>
          <option value="doctor">Doctor ID or Name</option>
          <option value="appointment">Appointment ID</option>
        </select>
        <input
          type="text"
          placeholder="Enter ID or Name"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Lookup</button>
      </div>

      {/* EXPORT BUTTON */}
      {result && (
        <button style={{ marginBottom: '1rem' }} onClick={exportToPDF}>
          📄 Export to PDF
        </button>
      )}

      {/* STATUS */}
      {status && <p>{status}</p>}

      {/* PATIENT RESULT */}
      {lookupType === 'patient' && result && (
        <div>
          <h3>🧑‍⚕️ Patient Profile</h3>
          {result.registration?.map(p => (
            <div key={p.patient_id} style={{ background: '#fafafa', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
              <p><strong>Name:</strong> {p.first_name} {p.last_name}</p>
              <p><strong>DOB:</strong> {new Date(p.dob).toLocaleDateString()}</p>
              <p><strong>Gender:</strong> {p.gender}</p>
              <p><strong>Phone:</strong> {p.phone}</p>
              <p><strong>Email:</strong> {p.email}</p>
              <p><strong>Address:</strong> {p.address}</p>
              <p><strong>Emergency Contact:</strong> {p.emergency_contact} ({p.emergency_phone})</p>
            </div>
          ))}

          <h4>📅 Appointments</h4>
          <table border="1" cellPadding="6" style={{ marginBottom: '2rem' }}>
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Doctor ID</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {result.appointments?.map(a => (
                <tr key={a.appointment_id}>
                  <td>{a.appointment_id}</td>
                  <td>{a.doctor_id}</td>
                  <td>{new Date(a.appointment_date).toLocaleDateString()}</td>
                  <td>{a.appointment_time}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4>🩺 Medical History</h4>
          {result.medical_history?.map(m => (
            <div key={m.history_id} style={{ background: '#f3f3f3', padding: '1rem', marginBottom: '1rem' }}>
              <p><strong>Chronic Illnesses:</strong> {m.chronic_illnesses}</p>
              <p><strong>Allergies:</strong> {m.allergies}</p>
              <p><strong>Family History:</strong> {m.family_history}</p>
              <p><strong>Immunizations:</strong> {m.immunizations}</p>
              <p><strong>Social History:</strong> {m.social_history}</p>
            </div>
          ))}
        </div>
      )}

      {/* DOCTOR RESULT */}
      {lookupType === 'doctor' && result && (
        <div>
          <h3>👨‍⚕️ Doctor Info</h3>
          <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
            {result.doctor ? (
              <>
                <p><strong>Name:</strong> {result.doctor.doctor_name}</p>
                <p><strong>Email:</strong> {result.doctor.email}</p>
                <p><strong>Department:</strong> {result.doctor.department}</p>
                <p><strong>Speciality:</strong> {result.doctor.speciality}</p>
                <p><strong>Phone:</strong> {result.doctor.phone}</p>
              </>
            ) : (
              <p>No doctor found</p>
            )}
          </div>

          <h4>📅 Appointments</h4>
          <table border="1" cellPadding="6">
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Patient ID</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {result.appointments?.map(a => (
                <tr key={a.appointment_id}>
                  <td>{a.appointment_id}</td>
                  <td>{a.patient_id}</td>
                  <td>{new Date(a.appointment_date).toLocaleDateString()}</td>
                  <td>{a.appointment_time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* APPOINTMENT RESULT */}
      {lookupType === 'appointment' && result && (
        <div>
          <h3>📄 Appointment Details</h3>
          <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px' }}>
            <p><strong>Appointment ID:</strong> {result.appointment_id}</p>
            <p><strong>Patient ID:</strong> {result.patient_id}</p>
            <p><strong>Doctor ID:</strong> {result.doctor_id}</p>
            <p><strong>Date:</strong> {new Date(result.appointment_date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {result.appointment_time}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartLookup;
