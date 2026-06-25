import os
from urllib.parse import quote_plus
from datetime import timedelta

password = quote_plus(os.getenv("DB_PASSWORD"))

class Config:

    SECRET_KEY = os.getenv("SECRET_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://"
        f"{os.getenv('DB_USER')}:{password}"
        f"@{os.getenv('DB_HOST')}:3306/"
        f"{os.getenv('DB_NAME')}"
        "?ssl_verify_cert=false"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=12)