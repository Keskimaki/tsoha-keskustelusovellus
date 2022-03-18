"""Router for user related api requests"""

from flask import Response, request
from werkzeug.security import generate_password_hash

from app import app
from services.db import query_db, insert_into_db
from services.response import json_response

@app.route("/api/users", methods=["GET"])
def get_users():
    """Return all users as JSON"""
    users = query_db("SELECT * FROM Users;")

    return json_response(users)

@app.route("/api/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    """Return a single user by id"""
    user = query_db("SELECT * FROM Users WHERE id=%s;", ( str(user_id) ), get_one=True)

    if not user:
        return Response(status=404)

    return json_response(user)

@app.route("/api/users", methods=["POST"])
def create_user():
    """Create a new user"""
    body = request.json

    insert_into_db(
        "INSERT INTO Users (username, password) VALUES (%s, %s);",
        ( body["username"], generate_password_hash(body["password"]) )
    )

    return Response(status=201)
