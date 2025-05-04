// src/pages/Home.jsx
import React from 'react';

export default function Home() {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      padding: '2rem',
      backgroundColor: '#e6f2ff', // Light hospital blue
      textAlign: 'center',
      maxWidth: '1000px',
      margin: '0 auto'
    }}>
      {/* EMR Banner Image */}
      <img
        src="https://thumbs.dreamstime.com/b/electronic-health-record-ehr-emr-medicine-healthcare-concept-medical-doctor-working-modern-pc-electronic-health-record-152122450.jpg"
        alt="EMR System"
        style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '10px', marginBottom: '2rem' }}
      />

      {/* Title */}
      <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem', color: '#004080' }}>
        💊 GTECH Electronic Medical Record System
      </h1>

      {/* About / Feature Description */}
      <div style={{ textAlign: 'left', fontSize: '1.1rem', lineHeight: '1.7', color: '#333' }}>
        <p>
          GTECH EMR is a powerful, full-stack hospital-grade electronic medical record solution engineered to streamline healthcare operations.
        </p>
        <h3>⚙️ Core Modules:</h3>
        <ul>
          <li>📝 Patient registration with emergency contact</li>
          <li>📅 Appointment booking & management</li>
          <li>🩺 Doctor form & availability scheduler</li>
          <li>📖 Medical history and chronic illness tracking</li>
          <li>🧪 Lab reports management</li>
          <li>📋 Diagnosis and treatment documentation</li>
        </ul>

        <h3>📊 Admin & Intelligence:</h3>
        <ul>
          <li>📂 Admin dashboard with analytics</li>
          <li>📄 PDF export capabilities</li>
          <li>🤖 AI-based patient risk prediction</li>
          <li>🔍 Smart Lookup for patient, doctor, appointment</li>
        </ul>

        <h3>🔧 Built With:</h3>
        <ul>
          <li>💻 React + Node.js + MySQL (full MERN-alike stack)</li>
          <li>📡 RESTful APIs with Axios</li>
          <li>🧠 ML integration via Python (RandomForestClassifier)</li>
        </ul>
      </div>

      {/* Footer Note */}
      <p style={{ marginTop: '3rem', fontStyle: 'italic', color: '#666', fontSize: '1rem' }}>
        Designed & developed with ❤️ by <strong>Rahul Papaganti</strong>
      </p>
    </div>
  );
}
