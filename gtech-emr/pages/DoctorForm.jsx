// src/pages/DoctorForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const DoctorForm = () => {
  const [formData, setFormData] = useState({
    doctorId: '',
    doctorName: '',
    doctorSpeciality: '',
    department: '',
    gender: '',
    dob: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('🛰️ Sending...');
    try {
      const response = await axios.post('http://localhost:3001/api/doctor', formData);
      setStatus(`✅ Doctor Added: ${response.data}`);
    } catch (error) {
      console.error('❌ Doctor save failed:', error);
      setStatus(`❌ Error: ${error.response?.data || 'Something went wrong'}`);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🩺 Add New Doctor</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
        <input name="doctorId" placeholder="Doctor ID" value={formData.doctorId} onChange={handleChange} required />
        <input name="doctorName" placeholder="Full Name" value={formData.doctorName} onChange={handleChange} required />
        <input name="doctorSpeciality" placeholder="Speciality" value={formData.doctorSpeciality} onChange={handleChange} required />
        <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input name="dob" type="date" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} required />
        <button type="submit" style={{ marginTop: '1rem' }}>Submit</button>
      </form>
      {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
    </div>
  );
};

export default DoctorForm;
