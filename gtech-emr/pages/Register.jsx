// src/pages/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    gender: '',
    phone: '',
    address: '',
    medicalHistory: '',
    allergies: '',
    emergencyContact: '',
    emergencyPhone: '',
    maritalStatus: '',
    occupation: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const response = await axios.post('http://localhost:3001/api/register', formData);
      setStatus(`✅ Registered: ${response.data}`);
    } catch (error) {
      console.error('Registration error:', error);
      setStatus(`❌ Error: ${error.response?.data || 'Something went wrong'}`);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📝 Register Patient</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
        <input name="patientId" placeholder="Patient ID" value={formData.patientId} onChange={handleChange} required />
        <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="dob" type="date" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} required />

        {/* Gender Dropdown */}
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">-- Select Gender --</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input name="medicalHistory" placeholder="Medical History" value={formData.medicalHistory} onChange={handleChange} />
        <input name="allergies" placeholder="Allergies" value={formData.allergies} onChange={handleChange} />
        <input name="emergencyContact" placeholder="Emergency Contact" value={formData.emergencyContact} onChange={handleChange} />
        <input name="emergencyPhone" placeholder="Emergency Phone" value={formData.emergencyPhone} onChange={handleChange} />

        {/* Marital Status Dropdown */}
        <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required>
          <option value="">-- Select Marital Status --</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
          <option value="Widowed">Widowed</option>
        </select>

        <input name="occupation" placeholder="Occupation" value={formData.occupation} onChange={handleChange} />

        <button type="submit" style={{ marginTop: '1rem' }}>Register</button>
      </form>
      {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
    </div>
  );
};

export default Register;
