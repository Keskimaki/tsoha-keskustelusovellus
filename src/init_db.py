"""Create user schema and initialize database"""

import os
from dotenv import load_dotenv

from db import get_db_connection

load_dotenv()

DB_USERNAME = os.getenv("DB_USERNAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")

conn = get_db_connection()

cur = conn.cursor()

cur.execute("DROP TABLE IF EXISTS users;")

cur.execute("""
    CREATE TABLE Users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        admin BOOLEAN DEFAULT FALSE,
        time TIME DEFAULT CURRENT_TIMESTAMP(0));
    """
)

cur.execute(
    "INSERT INTO Users (username, password, admin) VALUES (%s, %s, %s)",
    ( "admin", DB_PASSWORD, True )
)

conn.commit()

cur.close()
conn.close()
