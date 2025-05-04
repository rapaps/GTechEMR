// src/pages/LabReports.jsx
import React, { useState } from 'react';
import axios from 'axios';

const LabReports = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    testDate: '',
    hemoglobin: '',
    rbc: '',
    wbc: '',
    bloodGlucose: '',
    cholesterol: '',
    microbiology: '',
    xray: '',
    ctScan: '',
    mri: '',
    ultrasound: ''
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
    setStatus('Submitting...');

    // Cast float fields to numbers (or null)
    const payload = {
      ...formData,
      hemoglobin: parseFloat(formData.hemoglobin) || null,
      rbc: parseFloat(formData.rbc) || null,
      wbc: parseFloat(formData.wbc) || null,
      bloodGlucose: parseFloat(formData.bloodGlucose) || null,
      cholesterol: parseFloat(formData.cholesterol) || null
    };

    try {
      const response = await axios.post('http://localhost:3001/api/lab-report', payload);
      setStatus('✅ Lab report submitted');
    } catch (err) {
      console.error('❌ Lab submission error:', err);
      setStatus(`❌ Error: ${err.response?.data || 'Something went wrong'}`);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🧪 Submit Lab Report</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
        <input name="patientId" placeholder="Patient ID" value={formData.patientId} onChange={handleChange} required />
        <input name="doctorId" placeholder="Doctor ID" value={formData.doctorId} onChange={handleChange} required />
        <input name="testDate" type="date" placeholder="Test Date" value={formData.testDate} onChange={handleChange} required />

        <input name="hemoglobin" type="number" step="any" placeholder="Hemoglobin" value={formData.hemoglobin} onChange={handleChange} />
        <input name="rbc" type="number" step="any" placeholder="RBC" value={formData.rbc} onChange={handleChange} />
        <input name="wbc" type="number" step="any" placeholder="WBC" value={formData.wbc} onChange={handleChange} />
        <input name="bloodGlucose" type="number" step="any" placeholder="Blood Glucose" value={formData.bloodGlucose} onChange={handleChange} />
        <input name="cholesterol" type="number" step="any" placeholder="Cholesterol" value={formData.cholesterol} onChange={handleChange} />

        <textarea name="microbiology" placeholder="Microbiology Findings" value={formData.microbiology} onChange={handleChange} />
        <textarea name="xray" placeholder="X-Ray Findings" value={formData.xray} onChange={handleChange} />
        <textarea name="ctScan" placeholder="CT Scan Findings" value={formData.ctScan} onChange={handleChange} />
        <textarea name="mri" placeholder="MRI Findings" value={formData.mri} onChange={handleChange} />
        <textarea name="ultrasound" placeholder="Ultrasound Findings" value={formData.ultrasound} onChange={handleChange} />

        <button type="submit" style={{ marginTop: '1rem' }}>Submit</button>
      </form>
      {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
    </div>
  );
};

export default LabReports;
