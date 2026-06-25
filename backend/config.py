class Config:

    SECRET_KEY = "twite_secret_key"

    JWT_SECRET_KEY = "twite_jwt_secret"

    SQLALCHEMY_DATABASE_URI = (
        "mysql+pymysql://kvvsh1:Kshakthi960%40%23@kvvsh1.mysql.database.azure.com:3306/attendance_db?charset=utf8mb4"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False