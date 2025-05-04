// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Register from './pages/Register';
import UnifiedAppointment from './pages/UnifiedAppointment';

import MedicalHistory from './pages/MedicalHistory';
import LabReports from './pages/LabReports';
import Diagnosis from './pages/Diagnosis';
import Treatment from './pages/Treatment';
import DoctorForm from './pages/DoctorForm';
import SmartLookup from './pages/SmartLookup';
import AdminDashboard from './pages/AdminDashboard';
import SmartRiskPanel from './pages/SmartRiskPanel';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
	<Route path="/appointment" element={<UnifiedAppointment />} />
	<Route path="/manage-appointments" element={<UnifiedAppointment />} />

        <Route path="/medical-history" element={<MedicalHistory />} />
        <Route path="/lab-reports" element={<LabReports />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
        <Route path="/treatment" element={<Treatment />} />
        <Route path="/doctor" element={<DoctorForm />} />
        <Route path="/smartlookup" element={<SmartLookup />} />
	<Route path="/admin" element={<AdminDashboard />} />
	<Route path="/ai-risk" element={<SmartRiskPanel />} />


        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
