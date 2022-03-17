"""Router for user related api requests"""

from flask import Response, request
from werkzeug.security import generate_password_hash

from app import app
from services.db import query_db, insert_to_db
from services.response import json_response

@app.route("/api/users", methods=["GET"])
def get_users():
    """Return all users as JSON"""
    users = query_db("SELECT * FROM Users;")

    return json_response(users)

@app.route("/api/users", methods=["POST"])
def create_user():
    """Create a new user"""
    body = request.json

    insert_to_db(
        "INSERT INTO Users (username, password) VALUES (%s, %s);",
        ( body["username"], generate_password_hash(body["password"]) )
    )

    return Response(status=201)
