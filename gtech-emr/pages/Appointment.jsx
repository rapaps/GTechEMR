// src/pages/Appointment.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Appointment = () => {
  const [formData, setFormData] = useState({
    appointmentId: '',
    patientId: '',
    doctorId: '',
    appointmentDate: '',
    appointmentTime: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('📡 Booking appointment...');
    try {
      const res = await axios.post('http://localhost:3001/api/appointment', formData);
      setStatus(`✅ Success: ${res.data}`);
    } catch (err) {
      console.error(err);
      setStatus(`❌ Error: ${err.response?.data || 'Something went wrong'}`);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📅 Book Appointment</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
        <input name="appointmentId" placeholder="Appointment ID" value={formData.appointmentId} onChange={handleChange} required />
        <input name="patientId" placeholder="Patient ID" value={formData.patientId} onChange={handleChange} required />
        <input name="doctorId" placeholder="Doctor ID" value={formData.doctorId} onChange={handleChange} required />
        <input name="appointmentDate" type="date" value={formData.appointmentDate} onChange={handleChange} required />
        <input name="appointmentTime" type="time" value={formData.appointmentTime} onChange={handleChange} required />
        <button type="submit" style={{ marginTop: '1rem' }}>Book Appointment</button>
      </form>
      {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
    </div>
  );
};

export default Appointment;
