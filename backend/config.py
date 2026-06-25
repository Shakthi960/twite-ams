from urllib.parse import quote_plus
from datetime import timedelta

password = quote_plus("Kshakthi960@#")

class Config:

    SECRET_KEY = "twite_secret_key"
    JWT_SECRET_KEY = "twite_jwt_secret"

    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://kvvsh1:{password}"
        "@kvvsh1.mysql.database.azure.com:3306/attendance_db"
        "?ssl_mode=REQUIRED&charset=utf8mb4"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=12)
