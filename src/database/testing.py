from app import bcrypt
from config import DB_PASSWORD

def insert_test_data(cur):
    cur.execute(
        "INSERT INTO Users (username, password_hash, admin) VALUES (%s, %s, %s);",
        ( "admin", bcrypt.generate_password_hash(DB_PASSWORD).decode("utf8"), True )
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
        ( 1, 1, "testing comment" )
    )
