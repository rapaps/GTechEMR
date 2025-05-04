# 🚀 GTECH EMR – Deployment Guide

This guide walks you through setting up and running the full-stack Electronic Medical Records (EMR) system locally and preparing for production deployment.

---

## 📁 Project Structure

```txt
/gtech-emr/
├── /gtech-emr/      # React frontend (patient interface, admin, forms)
├── /backend/      # Express backend (API, MySQL)
├── /documentation/        # System documentation (this file + others)
└── /ML               # Python ML model API

⚙️ Tech Stack Summary

Layer | Tech Used
Frontend | React (CRA)
Backend | Node.js + Express
Database | MySQL
Styling | Inline CSS
Reporting | jsPDF
Charting | Chart.js

🧱 Prerequisites
Ensure the following are installed on your machine:

Node.js & npm (v14+ recommended)

MySQL Server

Git

MySQL Workbench – for GUI database operations

## 🔌 Backend Setup (`/server`)

1. Navigate to backend:

   ```bash
   cd server


2. Install dependencies:
npm install

3. Create .env file in /server:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=gtech_emr

4. Start backend server
npm start

This will run on:
➤ http://localhost:3001


💻 Frontend Setup (/client)
1.Navigate to frontend:
cd client

2. Install dependencies
npm install

3. Start frontend app
npm start

App launches at:
➤ http://localhost:3000


💽 Database Setup
1. Open MySQL Workbench or MySQL CLI

2. Create the database:
CREATE DATABASE gtech_emr;
USE gtech_emr;

3. Run the schema file:

Use gtech_emr_schema.sql provided

Or via terminal:
source /path/to/gtech_emr_schema.sql

4. (Optional) Seed data using seed_*.sql files

🔐 Security & Environment
Use .env to store sensitive credentials

Never commit .env to version control

For production, consider using:

.env.production

Docker Secrets or GitHub Actions Secrets

🚀 Deployment (Optional)
Recommended Tools for Production:
Tool | Use Case
Nginx | Reverse proxy, HTTPS
PM2 | Process manager for Node.js
MySQL Cloud | Hosted DB (e.g., AWS, RDS)
Docker | Containerize full stack

✅ Testing
Backend: Use Postman to hit endpoints on http://localhost:3001/api/...

Frontend: Use UI normally and test workflows

Admin Dashboard: Validate filters, chart rendering, PDF export

🧠 Troubleshooting
Issue | Suggested Fix
CORS errors | Check cors() middleware config in Express
DB connection errors | Validate credentials and port in .env
UUID insert issues | Ensure correct VARCHAR type + UUID() usage
Chart not rendering | Check Chart.js / react-chartjs-2 installed

📎 Deployment Checklist
 .env configured in production

 MySQL server and tables ready

 Backend launched via PM2 or npm start

 React frontend built: npm run build

 Frontend served via Nginx or static route

💡 Designed & Engineered by Rahul Papaganti 🧑‍💻
This deployment guide ensures you're launch-ready in any dev/ops scenario.