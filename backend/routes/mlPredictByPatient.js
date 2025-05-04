const express = require('express');
const router = express.Router();
const { spawnSync } = require('child_process');
const db = require('../db'); // adjust if your DB connector file is elsewhere

router.post('/ml/predict-by-patient', async (req, res) => {
  const { patientId } = req.body;
  if (!patientId) return res.status(400).json({ error: 'Missing patient ID' });

  try {
    // Fetch registration data
    const [registration] = await db.promise().query(
      'SELECT dob, gender FROM registration WHERE patient_id = ?', [patientId]
    );

    if (!registration.length) return res.status(404).json({ error: 'Patient not found' });

    const dob = new Date(registration[0].dob);
    const age = new Date().getFullYear() - dob.getFullYear();
    const gender = registration[0].gender;

    // Fetch medical history
    const [history] = await db.promise().query(
      'SELECT chronic_illnesses, family_history, social_history FROM medical_history WHERE patient_id = ?', [patientId]
    );

    if (!history.length) {
      return res.json({ status: 'insufficient', message: 'No medical history found' });
    }

    const illness = (history[0].chronic_illnesses || '').toLowerCase();
    const family = history[0].family_history;
    const social = (history[0].social_history || '').toLowerCase();

    // Process fields for model
    const input = {
      age,
      gender,
      has_diabetes: illness.includes('diabetes') ? 1 : 0,
      has_hypertension: illness.includes('hypertension') ? 1 : 0,
      family_history: family ? 1 : 0,
      is_smoker: social.includes('smoker') ? 1 : 0
    };

    // Run prediction
    const result = spawnSync('python', ['../ML/predict_v2.py'], {
      input: JSON.stringify(input),
      encoding: 'utf-8'
    });

    if (result.stderr && result.stderr.length > 0) {
      console.error('❌ Python error:', result.stderr);
      return res.status(500).json({ error: 'Prediction engine failed' });
    }

    const output = result.stdout.trim();
    if (output.includes("❌ Insufficient")) {
      return res.json({ status: 'insufficient', message: 'Insufficient data for prediction' });
    }

    const risk = output.replace("Predicted Risk Level:", "").trim();
    res.json({ status: 'ok', risk_level: risk });

  } catch (err) {
    console.error('❌ Predict-by-patient error:', err);
    res.status(500).json({ error: 'Backend prediction error' });
  }
});

module.exports = router;
