from datetime import timedelta

class Config:

    SECRET_KEY = "twite_secret_key"

    JWT_SECRET_KEY = "twite_jwt_secret"

    SQLALCHEMY_DATABASE_URI = (
        "mysql+pymysql://kvvsh1:Kshakthi960%40%23@kvvsh1.mysql.database.azure.com:3306/attendance_db?ssl_ca=ssl"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=12)