from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class User(db.Model):

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(
        db.String(50),
        unique=True,
        nullable=False
    )

    password = db.Column(
        db.String(255),
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )


class Employee(db.Model):

    __tablename__ = "employees"

    employee_id = db.Column(
        db.Integer,
        primary_key=True
    )

    employee_name = db.Column(
        db.String(100),
        nullable=False
    )

    email = db.Column(
        db.String(100),
        unique=True
    )

    mobile = db.Column(
        db.String(15)
    )

    department = db.Column(
        db.String(50)
    )

    designation = db.Column(
        db.String(50)
    )

    status = db.Column(
        db.String(20),
        default="Active"
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )


class Attendance(db.Model):

    __tablename__ = "attendance"

    attendance_id = db.Column(
        db.Integer,
        primary_key=True
    )

    employee_id = db.Column(
        db.Integer,
        db.ForeignKey("employees.employee_id")
    )

    attendance_date = db.Column(
        db.Date
    )

    check_in = db.Column(
        db.Time
    )

    check_out = db.Column(
        db.Time,nullable=True
    )

    attendance_status = db.Column(
        db.String(20)
    )

    employee = db.relationship(
        "Employee",
        backref="attendance_records"
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )