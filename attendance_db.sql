-- ==========================================
-- Attendance Management System Database
-- Developed by: Shakthi K
-- ==========================================

DROP DATABASE IF EXISTS attendance_db;

CREATE DATABASE attendance_db;

USE attendance_db;

-- ==========================================
-- USERS TABLE
-- ==========================================

CREATE TABLE users (

    user_id INT AUTO_INCREMENT PRIMARY KEY,

    username VARCHAR(100) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL

);

-- Default Login

INSERT INTO users
(
username,
password
)

VALUES

(
'admin',
'admin123'
);

-- ==========================================
-- EMPLOYEE TABLE
-- ==========================================

CREATE TABLE employee (

    employee_id INT AUTO_INCREMENT PRIMARY KEY,

    employee_name VARCHAR(100) NOT NULL,

    email VARCHAR(100) NOT NULL UNIQUE,

    mobile VARCHAR(15) NOT NULL UNIQUE,

    department VARCHAR(100) NOT NULL,

    designation VARCHAR(100) NOT NULL,

    status ENUM(
        'Active',
        'Inactive'
    ) DEFAULT 'Active'

);

-- ==========================================
-- ATTENDANCE TABLE
-- ==========================================

CREATE TABLE attendance (

    attendance_id INT AUTO_INCREMENT PRIMARY KEY,

    employee_id INT NOT NULL,

    attendance_date DATE NOT NULL,

    check_in TIME NULL,

    check_out TIME NULL,

    attendance_status ENUM(
        'Present',
        'Absent'
    ) NOT NULL,

    created_at TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_employee

    FOREIGN KEY(employee_id)

    REFERENCES employee(employee_id)

    ON DELETE CASCADE

);

-- ==========================================
-- SAMPLE EMPLOYEES
-- ==========================================

INSERT INTO employee
(
employee_name,
email,
mobile,
department,
designation,
status
)

VALUES

(
'Shakthi',
'shakthi@gmail.com',
'9876543210',
'Software Development',
'Software Engineer Trainee',
'Active'
),

(
'Arun',
'arun@gmail.com',
'9876543211',
'Human Resources',
'HR Executive',
'Active'
),

(
'Rahul',
'rahul@gmail.com',
'9876543212',
'Sales',
'Sales Executive',
'Active'
),

(
'Priya',
'priya@gmail.com',
'9876543213',
'Finance',
'Accountant',
'Inactive'
);

-- ==========================================
-- SAMPLE ATTENDANCE
-- ==========================================

INSERT INTO attendance
(
employee_id,
attendance_date,
check_in,
check_out,
attendance_status
)

VALUES

(
1,
CURDATE(),
'09:00:00',
'18:00:00',
'Present'
),

(
2,
CURDATE(),
'09:15:00',
NULL,
'Present'
),

(
3,
CURDATE(),
NULL,
NULL,
'Absent'
),

(
4,
CURDATE(),
'09:05:00',
'17:55:00',
'Present'
);

-- ==========================================
-- VERIFY TABLES
-- ==========================================

SELECT * FROM users;

SELECT * FROM employee;

SELECT * FROM attendance;