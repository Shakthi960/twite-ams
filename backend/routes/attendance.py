from flask import Blueprint
from flask import request
from flask import jsonify
import csv
from flask import Response

from flask_jwt_extended import jwt_required

from models import db
from models import Attendance
from models import Employee

from datetime import datetime

import csv
import io

from flask import send_file

attendance_bp = Blueprint(
    "attendance",
    __name__
)

@attendance_bp.route(
    "/attendance",
    methods=["POST"]
)
@jwt_required()
def mark_attendance():

    data = request.get_json()
    
    existing = Attendance.query.filter_by(
        employee_id=data["employee_id"],
        attendance_date=datetime.strptime(
            data["attendance_date"],
            "%Y-%m-%d"
        ).date()
    ).first()

    if existing:
        return jsonify({
            "message":
            "Attendance already marked today"
        }), 400

    employee = Employee.query.get(
        data["employee_id"]
    )

    if not employee:

        return jsonify({
            "message": "Employee not found"
        }), 404

    attendance = Attendance(

    employee_id=data["employee_id"],

    attendance_date=datetime.strptime(
        data["attendance_date"],
        "%Y-%m-%d"
    ).date(),

    check_in=(
        datetime.strptime(
            data["check_in"],
            "%H:%M:%S"
        ).time()
        if data.get("check_in")
        else None
    ),

    check_out=None,

    attendance_status=data[
        "attendance_status"
    ]
)

    db.session.add(attendance)
    db.session.commit()

    return jsonify({
        "message": "Attendance marked successfully"
    })

from datetime import date

@attendance_bp.route(
    "/attendance-summary",
    methods=["GET"]
)
@jwt_required()
def attendance_summary():

    today = date.today()

    total = Attendance.query.filter_by(
        attendance_date=today
    ).count()

    present = Attendance.query.filter(
        Attendance.attendance_date == today,
        Attendance.attendance_status == "Present"
    ).count()

    absent = Attendance.query.filter(
        Attendance.attendance_date == today,
        Attendance.attendance_status == "Absent"
    ).count()

    print("TODAY =", today)
    print("PRESENT =", present)
    print("ABSENT =", absent)

    return jsonify({
        "total_records": total,
        "present": present,
        "absent": absent
    })


@attendance_bp.route(
    "/attendance",
    methods=["GET"]
)
@jwt_required()
def get_attendance():

    page = request.args.get(
        "page",
        1,
        type=int
    )

    per_page = request.args.get(
        "per_page",
        5,
        type=int
    )

    records = Attendance.query.paginate(
        page=page,
        per_page=per_page,
        error_out=False
    )

    result = []

    for r in records.items:

        result.append({

            "attendance_id":
                r.attendance_id,

            "employee_id":
                r.employee_id,

            "employee_name":
                r.employee.employee_name
                if r.employee
                else "Deleted Employee",

            "attendance_date":
                str(r.attendance_date),

            "check_in":
                str(r.check_in),

            "check_out":
                str(r.check_out),

            "attendance_status":
                r.attendance_status
        })

    return jsonify({
        "attendance": result,
        "total": records.total
    })

@attendance_bp.route(
    "/attendance/<int:employee_id>",
    methods=["GET"]
)
@jwt_required()
def employee_history(
    employee_id
):

    records = Attendance.query.filter_by(
        employee_id=employee_id
    ).all()

    result=[]

    for r in records:

        result.append({

            "date":
                str(r.attendance_date),

            "status":
                r.attendance_status
        })

    return jsonify(result)

@attendance_bp.route(
    "/attendance-export",
    methods=["GET"]
)
@jwt_required()
def export_csv():

    records = Attendance.query.all()

    def generate():

        yield (
            "EmployeeID,"
            "Date,"
            "Status\n"
        )

        for r in records:

            yield (
                f"{r.employee_id},"
                f"{r.attendance_date},"
                f"{r.attendance_status}\n"
            )

    return Response(

        generate(),

        mimetype="text/csv",

        headers={

            "Content-Disposition":

            "attachment;"
            "filename=attendance.csv"
        }
    )

@attendance_bp.route(
    "/attendance/<int:attendance_id>",
    methods=["PUT"]
)
@jwt_required()
def update_attendance(attendance_id):

    attendance = Attendance.query.get(
        attendance_id
    )

    if not attendance:

        return jsonify({
            "message":
            "Attendance not found"
        }), 404

    data = request.get_json()

    attendance.check_out = datetime.strptime(
        data["check_out"],
        "%H:%M:%S"
    ).time()

    db.session.commit()

    return jsonify({
        "message":
        "Check Out Updated Successfully"
    })

@attendance_bp.route(
    "/attendance/export",
    methods=["GET"]
)
@jwt_required()
def export_attendance():

    output = io.StringIO()

    writer = csv.writer(output)

    writer.writerow([
        "Employee ID",
        "Employee Name",
        "Date",
        "Check In",
        "Check Out",
        "Status"
    ])

    records = (
        db.session.query(
            Attendance,
            Employee.employee_name
        )
        .join(
            Employee,
            Attendance.employee_id == Employee.employee_id
        )
        .order_by(
            Attendance.attendance_date.desc()
        )
        .all()
    )

    for attendance, employee_name in records:

        writer.writerow([
            attendance.employee_id,
            employee_name,
            attendance.attendance_date,
            attendance.check_in,
            attendance.check_out,
            attendance.attendance_status
        ])

    output.seek(0)

    return send_file(

        io.BytesIO(
            output.getvalue().encode()
        ),

        mimetype="text/csv",

        as_attachment=True,

        download_name="attendance_report.csv"

    )