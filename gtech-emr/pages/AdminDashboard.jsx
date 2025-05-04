import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import jsPDF from 'jspdf';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [filters, setFilters] = useState({
    patientId: '',
    doctorId: '',
    startDate: '',
    endDate: ''
  });

  const fetchDashboard = async () => {
    try {
      const params = new URLSearchParams(filters).toString();
      const res = await axios.get(`http://localhost:3001/api/admin/dashboard?${params}`);
      setDashboardData(res.data);
    } catch (err) {
      console.error('❌ Failed to load dashboard:', err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchDashboard();
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('📊 Admin Dashboard Report', 10, 10);
    doc.text(`Total Patients: ${dashboardData.totalPatients || 0}`, 10, 20);
    doc.text(`Total Doctors: ${dashboardData.totalDoctors || 0}`, 10, 30);
    doc.text(`Total Appointments: ${dashboardData.totalAppointments || 0}`, 10, 40);
    doc.text(`Lab Reports Today: ${dashboardData.labReportsToday || 0}`, 10, 50);
    doc.save('admin_dashboard_report.pdf');
  };

  const chartData = {
    labels: dashboardData?.trends?.map(item => item.date) || [],
    datasets: [
      {
        label: 'Appointments per Day',
        data: dashboardData?.trends?.map(item => item.count) || [],
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.4
      }
    ]
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🧠 Admin Dashboard</h2>

      {/* FILTERS */}
      <form onSubmit={handleFilterSubmit} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <input type="text" name="patientId" placeholder="Patient ID" value={filters.patientId} onChange={handleChange} />
        <input type="text" name="doctorId" placeholder="Doctor ID" value={filters.doctorId} onChange={handleChange} />
        <input type="date" name="startDate" value={filters.startDate} onChange={handleChange} />
        <input type="date" name="endDate" value={filters.endDate} onChange={handleChange} />
        <button type="submit">Apply Filters</button>
        <button type="button" onClick={downloadPDF}>Export to PDF</button>
      </form>

      {/* METRICS */}
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div><h4>Total Patients</h4><p>{dashboardData.totalPatients || 0}</p></div>
        <div><h4>Total Doctors</h4><p>{dashboardData.totalDoctors || 0}</p></div>
        <div><h4>Total Appointments</h4><p>{dashboardData.totalAppointments || 0}</p></div>
        <div><h4>Lab Reports Today</h4><p>{dashboardData.labReportsToday || 0}</p></div>
      </div>

      {/* CHART */}
      <div style={{ marginTop: '3rem', maxWidth: '700px' }}>
        <h4>📈 Appointments Over Time</h4>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default AdminDashboard;
