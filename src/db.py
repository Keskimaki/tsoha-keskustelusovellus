"""Connects to PostgreSQL db and executes a placeholder query"""

import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

DB_USERNAME = os.getenv("DB_USERNAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")

def get_db_connection():
    conn = psycopg2.connect(
        host = "localhost",
        database = "tsoha",
        user = DB_USERNAME,
        password = DB_PASSWORD
    )

    return conn
