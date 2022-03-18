"""Initialize database"""

import sys
import os
# Allow imports from parent directory
sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))
#pylint: disable=wrong-import-position, import-error
import queries
from app import bcrypt
from config import DB_PASSWORD
from services.db import get_db_connection

conn = get_db_connection()

cur = conn.cursor()

cur.execute(queries.DROP_TABLES)

cur.execute(queries.CREATE_USER_TABLE)
cur.execute(queries.CREATE_BOARD_TABLE)
cur.execute(queries.CREATE_THREAD_TABLE)
cur.execute(queries.CREATE_POST_TABLE)

cur.execute(
    "INSERT INTO Users (username, password_hash, admin) VALUES (%s, %s, %s);",
    ( "admin", bcrypt.generate_password_hash(DB_PASSWORD).decode("utf8"), True )
)

cur.execute(
    "INSERT INTO Boards (name, description, private) VALUES (%s, %s, %s);",
    ( "TEST", "testing area", True )
)

conn.commit()

cur.close()
conn.close()
