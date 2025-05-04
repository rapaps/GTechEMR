// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{
      padding: '1rem',
      backgroundColor: '#e6f2ff', // Light hospital blue
      borderBottom: '2px solid #99c2ff',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ marginRight: '1rem', fontWeight: 'bold' }}>🏠 Home</Link>
      <Link to="/register" style={{ marginRight: '1rem' }}>📝 Register</Link>
      <Link to="/manage-appointments" style={{ marginRight: '1rem' }}>📂 Appointments</Link>
      <Link to="/medical-history" style={{ marginRight: '1rem' }}>📖 Medical History</Link>
      <Link to="/lab-reports" style={{ marginRight: '1rem' }}>🧪 Lab Reports</Link>
      <Link to="/diagnosis" style={{ marginRight: '1rem' }}>🩺 Diagnosis</Link>
      <Link to="/treatment" style={{ marginRight: '1rem' }}>💊 Treatment</Link>
      <Link to="/doctor" style={{ marginRight: '1rem' }}>👨‍⚕️ Doctor Form</Link>
      <Link to="/smartlookup" style={{ marginRight: '1rem' }}>🔍 Smart Lookup</Link>
      <Link to="/admin" style={{ marginRight: '1rem' }}>📊 Admin</Link>
      <Link to="/ai-risk" style={{ marginRight: '1rem' }}>🤖 Risk AI</Link>

    </nav>
  );
};

export default Navbar;
