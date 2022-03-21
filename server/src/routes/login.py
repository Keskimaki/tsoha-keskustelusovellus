"""Login router"""

from flask import request
from flask_jwt_extended import create_access_token

from services.db import query_db
from app import app, bcrypt

@app.route("/api/login", methods=["POST"])
def login_user():
    """Authenticate user, create JWT for user session"""
    body = request.json

    user = query_db("SELECT * FROM Users WHERE username=%s;", ( body["username"], ), True)

    if not user:
        return { "msg": "User not found" }, 404

    check_password = bcrypt.check_password_hash(user["password_hash"], body["password"])

    if not check_password:
        return { "msg": "Invalid password" }, 401

    jwt = create_access_token(body["username"])

    return { "access_token": jwt }
