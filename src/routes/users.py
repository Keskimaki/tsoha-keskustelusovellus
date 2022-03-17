"""Router for user related api requests"""

from app import app

from db import get_db_connection

@app.route("/api/users")
def get_users():
    """Return all users, currently unsafe plaintext passwords"""
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM Users;")
    users = cur.fetchall()
    cur.close()
    conn.close()

    # TODO turn Postgre data into JSON
    return str(users)
