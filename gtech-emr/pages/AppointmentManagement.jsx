// src/pages/AppointmentManagement.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    appointmentId: '',
    patientId: '',
    doctorId: '',
    appointmentDate: '',
    appointmentTime: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Load all appointments
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/appointments');
      setAppointments(res.data);
    } catch (err) {
      console.error('❌ Failed to load appointments:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await axios.put(`http://localhost:3001/api/appointments/${form.appointmentId}`, form);
        setIsEditing(false);
      } else {
        await axios.post('http://localhost:3001/api/appointments', form);
      }
      setForm({ appointmentId: '', patientId: '', doctorId: '', appointmentDate: '', appointmentTime: '' });
      fetchAppointments();
    } catch (err) {
      console.error('❌ Submit error:', err);
    }
  };

  const handleEdit = (appt) => {
    setForm({ ...appt });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/appointments/${id}`);
      fetchAppointments();
    } catch (err) {
      console.error('❌ Delete error:', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📅 Appointment Management</h2>

      <div style={{ marginBottom: '2rem' }}>
        <h3>{isEditing ? '✏️ Edit Appointment' : '➕ Create Appointment'}</h3>
        <input name="appointmentId" value={form.appointmentId} onChange={handleChange} placeholder="Appointment ID" disabled={isEditing} />
        <input name="patientId" value={form.patientId} onChange={handleChange} placeholder="Patient ID" />
        <input name="doctorId" value={form.doctorId} onChange={handleChange} placeholder="Doctor ID" />
        <input name="appointmentDate" value={form.appointmentDate} onChange={handleChange} type="date" />
        <input name="appointmentTime" value={form.appointmentTime} onChange={handleChange} type="time" />
        <button onClick={handleSubmit} style={{ marginLeft: '1rem' }}>
          {isEditing ? 'Update' : 'Create'}
        </button>
      </div>

      <h3>🗂️ Existing Appointments</h3>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>🛠️ Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appt => (
              <tr key={appt.appointment_id}>
                <td>{appt.appointment_id}</td>
                <td>{appt.patient_id}</td>
                <td>{appt.doctor_id}</td>
                <td>{appt.appointment_date}</td>
                <td>{appt.appointment_time}</td>
                <td>
                  <button onClick={() => handleEdit(appt)}>Edit</button>
                  <button onClick={() => handleDelete(appt.appointment_id)} style={{ marginLeft: '1rem' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppointmentManagement;
