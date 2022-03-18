"""Initialize database"""

import sys
import os
from werkzeug.security import generate_password_hash
# Allow imports from parent directory
sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))
#pylint: disable=wrong-import-position, import-error
import queries
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
    "INSERT INTO Users (username, password, admin) VALUES (%s, %s, %s);",
    ( "admin", generate_password_hash(DB_PASSWORD), True )
)

cur.execute(
    "INSERT INTO Boards (name, description, private) VALUES (%s, %s, %s);",
    ( "TEST", "testing area", True )
)

conn.commit()

cur.close()
conn.close()
