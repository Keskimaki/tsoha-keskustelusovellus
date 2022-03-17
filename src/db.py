"""Helper functions for PostgreSQL database"""

import psycopg2

from config import DB_USERNAME, DB_PASSWORD

def get_db_connection():
    """Open database connection with user defined in .env"""
    conn = psycopg2.connect(
        host = "localhost",
        database = "tsoha",
        user = DB_USERNAME,
        password = DB_PASSWORD
    )

    return conn
