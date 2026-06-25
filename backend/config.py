import os
from urllib.parse import quote_plus
from datetime import timedelta

print("=" * 60)
print("DB_USER     :", repr(os.getenv("DB_USER")))
print("DB_PASSWORD :", repr(os.getenv("DB_PASSWORD")))
print("DB_HOST     :", repr(os.getenv("DB_HOST")))
print("DB_NAME     :", repr(os.getenv("DB_NAME")))
print("=" * 60)

user = quote_plus(os.getenv("DB_USER"))
password = quote_plus(os.getenv("DB_PASSWORD"))

print(
    f"mysql+pymysql://{os.getenv('DB_USER')}:{password}"
    f"@{os.getenv('DB_HOST')}:3306/{os.getenv('DB_NAME')}"
)

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://"
        "mysql+pymysql://{user}:{password}"
        f"@{os.getenv('DB_HOST')}:3306/{os.getenv('DB_NAME')}"
        f"{os.getenv('DB_NAME')}"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=12)
