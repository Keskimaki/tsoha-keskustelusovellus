"""Create user schema and initialize database"""

import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))

from werkzeug.security import generate_password_hash

from config import DB_PASSWORD
from services.db import get_db_connection
from queries import create_users_table

conn = get_db_connection()

cur = conn.cursor()

cur.execute("DROP TABLE IF EXISTS users;")

cur.execute(create_users_table)

cur.execute(
    "INSERT INTO Users (username, password, admin) VALUES (%s, %s, %s);",
    ( "admin", generate_password_hash(DB_PASSWORD), True )
)

conn.commit()

cur.close()
conn.close()