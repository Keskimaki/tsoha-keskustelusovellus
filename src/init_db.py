"""Create user schema and initialize database"""

from config import DB_PASSWORD
from services.db import get_db_connection

conn = get_db_connection()

cur = conn.cursor()

cur.execute("DROP TABLE IF EXISTS users;")

# TODO Replace plaintext password with passwordhash
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
    "INSERT INTO Users (username, password, admin) VALUES (%s, %s, %s);",
    ( "admin", DB_PASSWORD, True )
)

conn.commit()

cur.close()
conn.close()
