"""Helper functions for user authentication"""

from flask_jwt_extended import get_jwt_identity

from services.db import query_db

def generate_user_session(token, username):
    """Generate user session for frontend"""
    res = query_db("SELECT id FROM Users WHERE username=%s;", ( username, ), True)
    token = "bearer " + token

    return { "access_token": token, "username": username, "id": res["id"], "admin": check_admin(username) }

def check_admin(username=None):
    """Get username as parameter or from session and check admin status"""
    if not username:
        username = get_jwt_identity()
    
    user = query_db("SELECT admin FROM Users WHERE username=%s;", ( username, ), True)

    return user["admin"]
