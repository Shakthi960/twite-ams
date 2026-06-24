from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import Config
from models import db

app = Flask(__name__)

app.config.from_object(Config)

db.init_app(app)

@app.route("/")
def home():
    return {
        "message": "Attendance Management System API Running"
    }

CORS(app)

jwt = JWTManager(app)

from routes.auth import auth_bp
from routes.employee import employee_bp
from routes.attendance import attendance_bp
from routes.dashboard import dashboard_bp

app.register_blueprint(auth_bp)
app.register_blueprint(employee_bp)
app.register_blueprint(attendance_bp)
app.register_blueprint(dashboard_bp)

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)