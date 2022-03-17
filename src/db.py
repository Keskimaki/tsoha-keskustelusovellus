"""Connects to PostgreSQL db and executes a placeholder query"""

import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

conn = psycopg2.connect(
    host="localhost",
    database="tsoha",
    user=os.getenv("DB_USERNAME"),
    password=os.getenv("DB_PASSWORD")
)

cur = conn.cursor()

cur.execute("SELECT * FROM Users")

records = cur.fetchone()
