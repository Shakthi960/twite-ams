from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

from models import Employee, Attendance

from datetime import date

dashboard_bp = Blueprint(
    "dashboard",
    __name__
)


@dashboard_bp.route(
    "/dashboard",
    methods=["GET"]
)
@jwt_required()
def dashboard():

    total_employees = Employee.query.count()

    active_employees = Employee.query.filter_by(
        status="Active"
    ).count()

    today = date.today()

    present_today = Attendance.query.filter_by(
        attendance_date=today,
        attendance_status="Present"
    ).count()

    absent_today = Attendance.query.filter_by(
        attendance_date=today,
        attendance_status="Absent"
    ).count()

    departments = {}

    employees = Employee.query.all()

    for emp in employees:

        dept = emp.department

        if dept in departments:

            departments[dept] += 1

        else:

            departments[dept] = 1

    department_list = []

    for dept, count in departments.items():

        department_list.append({

            "department": dept,

            "count": count

        })

    return jsonify({

        "totalEmployees":
            total_employees,

        "activeEmployees":
            active_employees,

        "presentToday":
            present_today,

        "absentToday":
            absent_today,

        "departmentWise":
            department_list

    })