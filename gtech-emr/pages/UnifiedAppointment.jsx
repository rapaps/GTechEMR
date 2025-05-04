// src/pages/UnifiedAppointment.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UnifiedAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    appointmentId: '',
    patientId: '',
    doctorId: '',
    appointmentDate: '',
    appointmentTime: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [filters, setFilters] = useState({
    patientId: '',
    doctorId: '',
    date: ''
  });
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);
  const [status, setStatus] = useState('');

  // Load all appointments on mount
  useEffect(() => {
    fetchAppointments();
    fetchAutocomplete();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/appointments');
      setAppointments(res.data);
    } catch (err) {
      console.error('❌ Failed to load appointments:', err);
    }
  };

  const fetchAutocomplete = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/patient/autocomplete?q=');
      setAutocompleteOptions(res.data || []);
    } catch (err) {
      console.error('❌ Autocomplete failed:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:3001/api/appointments/${form.appointmentId}`, form);
        setStatus('✅ Appointment updated');
      } else {
        await axios.post(`http://localhost:3001/api/appointments`, form);
        setStatus('✅ Appointment booked');
      }
      setForm({ appointmentId: '', patientId: '', doctorId: '', appointmentDate: '', appointmentTime: '' });
      setIsEditing(false);
      fetchAppointments();
    } catch (err) {
      console.error(err);
      setStatus('❌ Submit failed');
    }
  };

  const handleEdit = (appt) => {
    setForm({ ...appt });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;
    try {
      await axios.delete(`http://localhost:3001/api/appointments/${id}`);
      fetchAppointments();
      setStatus('🗑️ Appointment deleted');
    } catch (err) {
      console.error(err);
      setStatus('❌ Delete failed');
    }
  };

  const applyFilters = (data) => {
    const normalizedPatientId = filters.patientId.trim();
    const normalizedDoctorId = filters.doctorId.trim();
    const normalizedDate = filters.date.trim();
    return data.filter(appt => {
      const byPatient = filters.patientId ? String(appt.patient_id).includes(filters.patientId) : true;
      const byDoctor = filters.doctorId ? String(appt.doctor_id).includes(filters.doctorId) : true;
      const byDate = filters.date ? appt.appointment_date === filters.date : true;
      return byPatient && byDoctor && byDate;
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🧠 Unified Appointment System</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', marginBottom: '2rem' }}>
        <input name="appointmentId" placeholder="Appointment ID" value={form.appointmentId} onChange={handleChange} required={!isEditing} disabled={isEditing} />
        <input name="patientId" placeholder="Patient ID" value={form.patientId} onChange={handleChange} required />
        <input name="doctorId" placeholder="Doctor ID" value={form.doctorId} onChange={handleChange} required />
        <input type="date" name="appointmentDate" value={form.appointmentDate} onChange={handleChange} required />
        <input type="time" name="appointmentTime" value={form.appointmentTime} onChange={handleChange} required />
        <button type="submit" style={{ marginTop: '1rem' }}>{isEditing ? 'Update' : 'Book'} Appointment</button>
      </form>

      {/* FILTERS */}
      <h3>🔍 Filters</h3>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <input name="patientId" placeholder="Filter by Patient ID" value={filters.patientId} onChange={handleFilterChange} />
        <input name="doctorId" placeholder="Filter by Doctor ID" value={filters.doctorId} onChange={handleFilterChange} />
        <input name="date" type="date" value={filters.date} onChange={handleFilterChange} />
      </div>

      {/* STATUS */}
      {status && <p style={{ color: 'green', fontWeight: 'bold' }}>{status}</p>}

      {/* APPOINTMENT LIST */}
      <h3>📋 Appointments</h3>
      {appointments.length === 0 ? <p>No appointments found.</p> : (
        <table border="1" cellPadding="8" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>⚙️</th>
            </tr>
          </thead>
          <tbody>
            {applyFilters(appointments).map(appt => (
              <tr key={appt.appointment_id}>
                <td>{appt.appointment_id}</td>
                <td>{appt.patient_id}</td>
                <td>{appt.doctor_id}</td>
                <td>{new Date(appt.appointment_date).toISOString().split('T')[0]}</td>
                <td>{appt.appointment_time}</td>
                <td>
                  <button onClick={() => handleEdit(appt)}>✏️</button>
                  <button onClick={() => handleDelete(appt.appointment_id)} style={{ marginLeft: '0.5rem' }}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UnifiedAppointment;
