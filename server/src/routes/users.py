"""Router for user related api requests"""

from flask import request
from flask_jwt_extended import create_access_token

from app import app, bcrypt
from services.db import query_db, insert_into_db
from services.user import generate_user_session
from services.response import json_response

@app.route("/api/users", methods=["GET"])
def get_users():
    """Return all users as JSON"""
    users = query_db("SELECT * FROM Users;")

    return json_response(users)

@app.route("/api/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    """Return a single user by id"""
    user = query_db("SELECT * FROM Users WHERE id=%s;", ( str(user_id), ), True)

    if not user:
        return { "msg": "User not found" }, 404

    return json_response(user)

@app.route("/api/users", methods=["POST"])
def create_user():
    """Create a new user"""
    body = request.json

    insert_into_db(
        "INSERT INTO Users (username, password_hash) VALUES (%s, %s);",
        ( body["username"], bcrypt.generate_password_hash(body["password"]).decode("utf8") )
    )

    jwt = create_access_token(body["username"])

    return generate_user_session(jwt, body["username"]), 201
