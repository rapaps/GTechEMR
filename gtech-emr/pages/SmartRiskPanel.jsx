// src/pages/SmartRiskPanel.jsx
import React, { useState } from 'react';
import axios from 'axios';

const SmartRiskPanel = () => {
  const [patientId, setPatientId] = useState('');
  const [status, setStatus] = useState('');
  const [riskLevel, setRiskLevel] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('⏳ Processing...');
    setRiskLevel('');
    
    try {
      const res = await axios.post('http://localhost:3001/api/ml/predict-by-patient', { patientId });

      if (res.data.status === 'insufficient') {
        setStatus('⚠️ Insufficient data to predict risk.');
      } else if (res.data.status === 'ok') {
        setRiskLevel(res.data.risk_level);
        setStatus('');
      } else {
        setStatus('❌ Unexpected response');
      }

    } catch (err) {
      console.error(err);
      setStatus('❌ Error connecting to server');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h2>🧠 Patient Risk Predictor</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Enter Patient ID"
          value={patientId}
          onChange={e => setPatientId(e.target.value)}
          required
        />
        <button type="submit">Predict Risk</button>
      </form>

      {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
      {riskLevel && (
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor:
            riskLevel === 'High' ? '#ffcccc' :
            riskLevel === 'Moderate' ? '#fff2cc' :
            '#ccffcc',
          border: '1px solid #ccc',
          borderRadius: '8px'
        }}>
          <h3>🔮 Risk Level: {riskLevel}</h3>
        </div>
      )}
    </div>
  );
};

export default SmartRiskPanel;
