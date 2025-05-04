# 🤖 GTECH EMR – ML/AI Integration

## 🧠 Overview
This module enables AI-based clinical risk prediction using patient medical data. It integrates a trained ML model directly with the EMR backend and allows real-time predictions based on existing patient records.

---

## 🧪 ML Risk Model

- **Model Used**: `RandomForestClassifier` (from scikit-learn)
- **Training Dataset**: 1000 records of mock patient profiles
- **Feature Fields**:
  - `age` (derived from `dob`)
  - `gender`
  - `has_diabetes`
  - `has_hypertension`
  - `family_history`
  - `is_smoker`
- **Output**: Risk levels — `Low`, `Moderate`, or `High`

---

## 🔗 Backend Integration

- **Endpoint**: `POST /api/ml/predict-by-patient`
- **Payload**: `{ "patientId": 1001 }`
- **Processing Pipeline**:
  1. Extracts patient and medical history
  2. Derives model input features
  3. Sends data to Python AI via `child_process`
  4. Receives and returns `risk_level`

- **Fallback Handling**:
  - If data is missing → `status: "insufficient"`

---

## 🖥️ Frontend UI

- **Route**: `/ai-risk`
- **Component**: `SmartRiskPanel.jsx`
- **Interaction**:
  - Enter Patient ID
  - View styled risk assessment card
  - Risk color coded (Low = green, High = red)

---

## 🛡️ Safety & Accuracy

- Predicts based only on available EMR data
- Rejects incomplete datasets cleanly
- Model trained and tested with balanced outputs

---

## 📈 Future Enhancements

- 🔍 Symptom-based prediction via Smart Lookup
- 🧠 Explainable AI (XAI) output with reasoning
- 🧪 Test suggestions based on AI patterns
- 📊 Risk heatmaps and cohort-based trends

---

> Integrated, deployed, and tested by **Rahul Papaganti**  
> ⚙️ Phase: ML-Core, Status: ✅ Operational
