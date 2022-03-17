import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

DB_USERNAME = os.getenv("DB_USERNAME")
DB_PASSWORD= os.getenv("DB_PASSWORD")

conn = psycopg2.connect(
    host="localhost",
    database="tsoha",
    user=DB_USERNAME,
    password=DB_PASSWORD
)

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
