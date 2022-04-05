"""Router for user related api requests"""

from flask import request
from flask_jwt_extended import create_access_token

from app import app
from services.db import query_db, insert_into_db
from services.user import generate_user_session
from services.response import json_response
from services.parser import parse_user
from database import queries

@app.route("/api/users", methods=["GET"])
def get_users():
    """Return all users as JSON"""
    users = query_db(queries.GET_ALL_USERS)

    return json_response(users)

@app.route("/api/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    """Return a single user by id"""
    user = query_db(queries.GET_USER_BY_ID, ( str(user_id), ), True)

    if not user:
        return { "msg": "User not found" }, 404

    return json_response(user)

@app.route("/api/users", methods=["POST"])
def create_user():
    """Create a new user"""
    user = parse_user(request.json)

    insert_into_db(queries.CREATE_USER, user)

    username = user[0]
    jwt = create_access_token(username)

    return generate_user_session(jwt, username), 201
