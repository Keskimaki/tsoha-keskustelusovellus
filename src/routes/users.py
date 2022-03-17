"""Router for user related api requests"""

import json
from flask import Response

from app import app
from services.db import query_db

@app.route("/api/users")
def get_users():
    """Return all users as JSON"""

    users = query_db("SELECT * FROM Users;")

    for user in users:
        user.update({ "time": str(user["time"]) })

    return Response(json.dumps(users), mimetype='application/json')

