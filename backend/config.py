import os
from urllib.parse import quote_plus
from datetime import timedelta

print("=" * 60)
print("DB_USER     :", repr(os.getenv("DB_USER")))
print("DB_PASSWORD :", repr(os.getenv("DB_PASSWORD")))
print("DB_HOST     :", repr(os.getenv("DB_HOST")))
print("DB_NAME     :", repr(os.getenv("DB_NAME")))
print("=" * 60)

password = quote_plus(os.getenv("DB_PASSWORD"))

print(
    f"mysql+pymysql://{os.getenv('DB_USER')}:{password}@{os.getenv('DB_HOST')}:3306/{os.getenv('DB_NAME')}"
)
