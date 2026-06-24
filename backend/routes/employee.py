from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from models import db, Employee

employee_bp = Blueprint(
    "employee",
    __name__
)

@employee_bp.route(
    "/employees",
    methods=["POST"]
)
@jwt_required()
def create_employee():

    data = request.get_json()

    existing_email = Employee.query.filter_by(
    email=data["email"]
    ).first()

    if existing_email:
        return jsonify({
            "message": "Email already exists"
        }), 400

    existing_mobile = Employee.query.filter_by(
        mobile=data["mobile"]
    ).first()

    if existing_mobile:
        return jsonify({
            "message": "Mobile number already exists"
        }), 400

    employee = Employee(
        employee_name=data["employee_name"],
        email=data["email"],
        mobile=data["mobile"],
        department=data["department"],
        designation=data["designation"],
        status=data["status"]
    )

    db.session.add(employee)
    db.session.commit()

    return jsonify({
        "message": "Employee created successfully"
    }), 201

@employee_bp.route(
    "/employees",
    methods=["GET"]
)
@jwt_required()
def get_employees():

    page = request.args.get(
        "page",
        1,
        type=int
    )

    per_page = request.args.get(
        "per_page",
        10,
        type=int
    )

    search = request.args.get(
        "search",
        ""
    )

    query = Employee.query

    department = request.args.get(
        "department",
        ""
    )

    if search:
        query = query.filter(
            Employee.employee_name.contains(search)
        )

    if department:
        query = query.filter(
            Employee.department == department
        )

    employees = query.paginate(
        page=page,
        per_page=per_page,
        error_out=False
    )

    result = []

    for emp in employees.items:

        result.append({

            "employee_id":
                emp.employee_id,

            "employee_name":
                emp.employee_name,

            "email":
                emp.email,

            "mobile":
                emp.mobile,

            "department":
                emp.department,

            "designation":
                emp.designation,

            "status":
                emp.status
        })

    return jsonify({
        "employees": result,
        "total": employees.total
    })

from models import db, Employee, Attendance
@employee_bp.route(
    "/employees/<int:employee_id>",
    methods=["DELETE"]
)
@jwt_required()
def delete_employee(employee_id):

    employee = Employee.query.get(employee_id)

    if not employee:
        return jsonify({
            "message": "Employee not found"
        }), 404

    # Delete employee attendance records first
    Attendance.query.filter_by(
        employee_id=employee_id
    ).delete()

    # Delete employee
    db.session.delete(employee)

    db.session.commit()

    return jsonify({
        "message": "Employee deleted successfully"
    })

@employee_bp.route(
    "/employees/<int:employee_id>",
    methods=["PUT"]
)
@jwt_required()
def update_employee(employee_id):

    employee = Employee.query.get(employee_id)

    if not employee:
        return jsonify({
            "message": "Employee not found"
        }), 404

    data = request.get_json()

    employee.employee_name = data.get(
        "employee_name",
        employee.employee_name
    )

    employee.email = data.get(
        "email",
        employee.email
    )

    employee.mobile = data.get(
        "mobile",
        employee.mobile
    )

    employee.department = data.get(
        "department",
        employee.department
    )

    employee.designation = data.get(
        "designation",
        employee.designation
    )

    employee.status = data.get(
        "status",
        employee.status
    )

    db.session.commit()

    return jsonify({
        "message": "Employee updated successfully"
    })

@employee_bp.route(
    "/employees/<int:employee_id>",
    methods=["GET"]
)
@jwt_required()
def get_employee(employee_id):

    employee = Employee.query.get(employee_id)

    if not employee:
        return jsonify({
            "message": "Employee not found"
        }), 404

    return jsonify({
        "employee_id": employee.employee_id,
        "employee_name": employee.employee_name,
        "email": employee.email,
        "mobile": employee.mobile,
        "department": employee.department,
        "designation": employee.designation,
        "status": employee.status
    })