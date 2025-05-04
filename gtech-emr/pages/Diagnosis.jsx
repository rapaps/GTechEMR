// src/pages/Diagnosis.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Diagnosis = () => {
  const [formData, setFormData] = useState({
    diagnosisId: '',
    patientId: '',
    diagnosisDate: '',
    symptoms: '',
    observations: '',
    bp: '',
    heartRate: '',
    provisionalDiagnosis: '',
    testsPerformed: '',
    finalDiagnosis: '',
    treatmentPlan: '',
    followUpInstructions: ''
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

    try {
      await axios.post('http://localhost:3001/api/diagnosis', formData);
      setStatus('✅ Diagnosis submitted');
    } catch (err) {
      console.error('❌ Diagnosis submission error:', err);
      setStatus(`❌ Error: ${err.response?.data || 'Something went wrong'}`);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🔍 Submit Diagnosis</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
        <input name="diagnosisId" placeholder="Diagnosis ID" value={formData.diagnosisId} onChange={handleChange} required />
        <input name="patientId" placeholder="Patient ID" value={formData.patientId} onChange={handleChange} required />
        <input name="diagnosisDate" type="date" value={formData.diagnosisDate} onChange={handleChange} required />
        <textarea name="symptoms" placeholder="Symptoms" value={formData.symptoms} onChange={handleChange} />
        <textarea name="observations" placeholder="Observations" value={formData.observations} onChange={handleChange} />
        <input name="bp" placeholder="Blood Pressure" value={formData.bp} onChange={handleChange} />
        <input name="heartRate" placeholder="Heart Rate" value={formData.heartRate} onChange={handleChange} />
        <textarea name="provisionalDiagnosis" placeholder="Provisional Diagnosis" value={formData.provisionalDiagnosis} onChange={handleChange} />
        <textarea name="testsPerformed" placeholder="Tests Performed" value={formData.testsPerformed} onChange={handleChange} />
        <textarea name="finalDiagnosis" placeholder="Final Diagnosis" value={formData.finalDiagnosis} onChange={handleChange} />
        <textarea name="treatmentPlan" placeholder="Treatment Plan" value={formData.treatmentPlan} onChange={handleChange} />
        <textarea name="followUpInstructions" placeholder="Follow-up Instructions" value={formData.followUpInstructions} onChange={handleChange} />
        <button type="submit" style={{ marginTop: '1rem' }}>Submit</button>
      </form>
      {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
    </div>
  );
};

export default Diagnosis;
