"""Router for user related api requests"""

from app import app
from services.db import query_db
from services.response import json_response

@app.route("/api/users")
def get_users():
    """Return all users as JSON"""

    users = query_db("SELECT * FROM Users;")

    return json_response(users)
