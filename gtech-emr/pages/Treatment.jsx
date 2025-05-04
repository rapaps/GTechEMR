// src/pages/Treatment.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Treatment = () => {
  const [formData, setFormData] = useState({
    treatmentId: '',
    diagnosisId: '',
    patientId: '',
    treatmentDate: '',
    prescribedMedications: '',
    performedProcedures: '',
    therapyPlan: '',
    dietRecommendations: '',
    lifestyleRecommendations: '',
    followUpSchedule: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      const response = await axios.post('http://localhost:3001/api/treatment', formData);
      setStatus('✅ Treatment data submitted successfully');
    } catch (err) {
      console.error('❌ Treatment submission error:', err);
      setStatus(`❌ Error: ${err.response?.data || 'Something went wrong'}`);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>💊 Submit Treatment Details</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px' }}>
        <input name="treatmentId" placeholder="Treatment ID" value={formData.treatmentId} onChange={handleChange} required />
        <input name="diagnosisId" placeholder="Diagnosis ID" value={formData.diagnosisId} onChange={handleChange} required />
        <input name="patientId" placeholder="Patient ID" value={formData.patientId} onChange={handleChange} required />
        <input name="treatmentDate" type="date" placeholder="Treatment Date" value={formData.treatmentDate} onChange={handleChange} required />

        <textarea name="prescribedMedications" placeholder="Prescribed Medications" value={formData.prescribedMedications} onChange={handleChange} />
        <textarea name="performedProcedures" placeholder="Performed Procedures" value={formData.performedProcedures} onChange={handleChange} />
        <textarea name="therapyPlan" placeholder="Therapy Plan" value={formData.therapyPlan} onChange={handleChange} />
        <textarea name="dietRecommendations" placeholder="Diet Recommendations" value={formData.dietRecommendations} onChange={handleChange} />
        <textarea name="lifestyleRecommendations" placeholder="Lifestyle Recommendations" value={formData.lifestyleRecommendations} onChange={handleChange} />
        <textarea name="followUpSchedule" placeholder="Follow Up Schedule" value={formData.followUpSchedule} onChange={handleChange} />

        <button type="submit" style={{ marginTop: '1rem' }}>Submit</button>
      </form>
      {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
    </div>
  );
};

export default Treatment;
