// src/pages/MedicalHistory.jsx
import React, { useState } from 'react';
import axios from 'axios';

const MedicalHistory = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    chronicIllnesses: '',
    previousSurgeries: '',
    currentMedications: '',
    allergies: '',
    hospitalizations: '',
    familyHistory: '',
    immunizations: '',
    socialHistory: '',
    otherConditions: ''
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
    setStatus('🚀 Submitting...');
    try {
      const res = await axios.post('http://localhost:3001/api/medical-history', {
        patientId: formData.patientId,
        chronicIllnesses: formData.chronicIllnesses,
        previousSurgeries: formData.previousSurgeries,
        currentMedications: formData.currentMedications,
        allergies: formData.allergies,
        hospitalizations: formData.hospitalizations,
        familyHistory: formData.familyHistory,
        immunizations: formData.immunizations,
        socialHistory: formData.socialHistory,
        otherConditions: formData.otherConditions
      });
      setStatus(`✅ ${res.data}`);
    } catch (err) {
      console.error(err);
      setStatus(`❌ Error: ${err.response?.data || 'Submission failed'}`);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📋 Medical History</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px' }}>
        <input name="patientId" placeholder="Patient ID" value={formData.patientId} onChange={handleChange} required />
        <input name="chronicIllnesses" placeholder="Chronic Illnesses" value={formData.chronicIllnesses} onChange={handleChange} />
        <input name="previousSurgeries" placeholder="Previous Surgeries" value={formData.previousSurgeries} onChange={handleChange} />
        <input name="currentMedications" placeholder="Current Medications" value={formData.currentMedications} onChange={handleChange} />
        <input name="allergies" placeholder="Allergies" value={formData.allergies} onChange={handleChange} />
        <input name="hospitalizations" placeholder="Hospitalizations" value={formData.hospitalizations} onChange={handleChange} />
        <input name="familyHistory" placeholder="Family History" value={formData.familyHistory} onChange={handleChange} />
        <input name="immunizations" placeholder="Immunizations" value={formData.immunizations} onChange={handleChange} />
        <input name="socialHistory" placeholder="Social History" value={formData.socialHistory} onChange={handleChange} />
        <input name="otherConditions" placeholder="Other Conditions" value={formData.otherConditions} onChange={handleChange} />
        <button type="submit" style={{ marginTop: '1rem' }}>Submit</button>
      </form>
      {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
    </div>
  );
};

export default MedicalHistory;
