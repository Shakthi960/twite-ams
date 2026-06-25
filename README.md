# twite-ams
# Attendance Management System

A full-stack Attendance Management System developed using **React.js**, **Flask**, and **MySQL**. This application enables administrators to manage employees, record attendance, and monitor attendance statistics through a clean and responsive dashboard.

---

## Features

### Authentication
- JWT Authentication
- Secure Login
- Protected Routes

### Employee Management
- Add Employee
- Edit Employee
- Delete Employee
- View Employee Details
- Search Employees
- Sort Employees
- Pagination
- Filter by Status
- Filter by Department

### Attendance Management
- Mark Attendance
- Present / Absent Status
- Check-In
- Check-Out
- Employee Attendance History
- Attendance Search
- Attendance Sorting
- Attendance Pagination

### Dashboard
- Total Employees
- Active Employees
- Present Today
- Absent Today
- Department-wise Employee Count
- Department-wise Bar Chart

### API Documentation
- Swagger API Documentation

---

# Technology Stack

## Frontend

- React.js
- Axios
- Bootstrap 5
- Chart.js
- React ChartJS 2
- React Router DOM

## Backend

- Python
- Flask
- Flask-JWT-Extended
- Flask-SQLAlchemy
- Flask-CORS
- Flasgger (Swagger)

## Database

- MySQL

---

# Project Structure

```
Attendance_Management_System
│
├── backend
│   ├── app.py
│   ├── config.py
│   ├── models.py
│   ├── requirements.txt
│   └── routes
│       ├── auth.py
│       ├── employee.py
│       ├── attendance.py
│       └── dashboard.py
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── attendance_db.sql
│
└── README.md
```

---

# Database Tables

The project uses the following tables:

- Users
- Employees
- Attendance

The database is designed using:

- Primary Keys
- Foreign Keys
- Relationships
- Constraints
- Normalized Structure

---

# Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/Attendance_Management_System.git
```

```
cd Attendance_Management_System
```

---

# Backend Setup

```
cd backend
```

Create virtual environment

```bash
python -m venv venv
```

Activate

Windows

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run backend

```bash
python app.py
```

Backend runs on

```
http://127.0.0.1:5000
```

---

# Frontend Setup

```
cd frontend
```

Install dependencies

```bash
npm install
```

Run frontend

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# Database Setup

1. Open MySQL.

2. Create database

```sql
CREATE DATABASE attendance_db;
```

3. Import

```
attendance_db.sql
```

---

# Login Credentials

```
Username : admin

Password : admin123
```

(Modify according to your database.)

---

# API Documentation

Swagger Documentation

```
http://127.0.0.1:5000/apidocs/
```

---

# REST APIs

## Authentication

- POST /login

---

## Employee APIs

- GET /employees
- GET /employees/{id}
- POST /employees
- PUT /employees/{id}
- DELETE /employees/{id}

---

## Attendance APIs

- GET /attendance
- POST /attendance
- PUT /attendance/checkout/{id}
- GET /attendance-summary

---

## Dashboard APIs

- GET /dashboard

---

# Bonus Features Implemented

✔ JWT Authentication

✔ Employee Search

✔ Attendance Search

✔ Pagination

✔ Sorting

✔ Department Filter

✔ Employee Status Filter

✔ Swagger Documentation

✔ Responsive Design

✔ Department-wise Dashboard Chart

---

# Screenshots

Add screenshots here before submission.

Example

```
screenshots/

dashboard.png

employees.png

attendance.png

login.png
```

---

# Future Improvements

- Export Attendance Report (Excel / CSV)
- Email Notifications
- Role-Based Access Control
- Face Recognition Attendance
- Azure Cloud Deployment
- Docker Deployment

---

# Author

**Shakthi K**

Bachelor of Engineering (Computer Science and Engineering)

---

# License

This project is developed for technical assessment and educational purposes.
