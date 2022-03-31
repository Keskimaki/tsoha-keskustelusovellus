"""Login router"""

from flask import request
from flask_jwt_extended import create_access_token, jwt_required

from services.db import query_db
from services.user import generate_user_session
from app import app, bcrypt
from database import queries

@app.route("/api/login", methods=["POST"])
def login_user():
    """Authenticate user, create JWT for user session"""
    body = request.json

    user = query_db(queries.GET_USER_BY_USERNAME, ( body["username"], ), True)

    if not user:
        return { "msg": "User not found" }, 404

    check_password = bcrypt.check_password_hash(user["password_hash"], body["password"])

    if not check_password:
        return { "msg": "Invalid password" }, 401

    jwt = create_access_token(body["username"])

    return generate_user_session(jwt, body["username"])

@app.route("/api/login", methods=["GET"])
@jwt_required()
def get_login_status():
    """Check if user token is active"""
    return { "msg": "Logged in" }
