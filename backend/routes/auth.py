from flask import Blueprint
from flask import request
from flask import jsonify

from flask_jwt_extended import (
    create_access_token
)

auth_bp = Blueprint(
    "auth",
    __name__
)

@auth_bp.route(
    "/login",
    methods=["POST"]
)
def login():

    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    if (
        username == "admin"
        and
        password == "admin123"
    ):

        token = create_access_token(
            identity=username
        )

        return jsonify(
            access_token=token
        )

    return jsonify(
        message="Invalid Credentials"
    ), 401