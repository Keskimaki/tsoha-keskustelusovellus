"""Data and functions for database testing"""

from app import bcrypt
from config import DB_PASSWORD

def insert_test_data(cur):
    """Add admin and test user, board, thread and post to database"""
    cur.execute(
        "INSERT INTO Users (username, password_hash, admin) VALUES (%s, %s, %s);",
        ( "Admin", bcrypt.generate_password_hash(DB_PASSWORD).decode("utf8"), True )
    )

    cur.execute(
        "INSERT INTO Users (username, password_hash, admin) VALUES (%s, %s, %s);",
        ( "TestUser", bcrypt.generate_password_hash(DB_PASSWORD).decode("utf8"), False )
    )

    cur.execute(
       "INSERT INTO Boards (name, description, private) VALUES (%s, %s, %s);",
        ( "TEST", "testing area", True )
    )

    cur.execute(
        "INSERT INTO Threads (user_id, board_id, name, closed) VALUES (%s, %s, %s, %s);",
        ( 1, 1, "testing thread", True )
    )

    cur.execute(
        "INSERT INTO Posts (user_id, thread_id, content) VALUES (%s, %s, %s);",
        ( 1, 1, "thread content" )
    )

    cur.execute(
        "INSERT INTO Posts (user_id, thread_id, content) VALUES (%s, %s, %s);",
        ( 2, 1, "testing comment" )
    )
