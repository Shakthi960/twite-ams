class Config:

    SECRET_KEY = "twite_secret_key"

    JWT_SECRET_KEY = "twite_jwt_secret"

    SQLALCHEMY_DATABASE_URI = (
        "mysql+pymysql://root:Kshakthi960%40%23@localhost/attendance_db"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False