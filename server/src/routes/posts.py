"""Router for post related api requests"""

from flask import request
from flask_jwt_extended import jwt_required

from app import app
from services.db import query_db, insert_into_db
from services.response import json_response

@app.route("/api/posts", methods=["GET"])
def get_posts():
    """Return all posts as JSON"""
    posts = query_db("SELECT * FROM Posts;")

    return json_response(posts)

@app.route("/api/posts/<int:post_id>", methods=["GET"])
def get_post(post_id):
    """Return a single post by id"""
    post = query_db("SELECT * FROM Posts WHERE id=%s;", ( str(post_id), ), True)

    if not post:
        return { "msg": "Post not found" }, 404

    return json_response(post)

@app.route("/api/posts", methods=["POST"])
@jwt_required()
def create_post():
    """Logged user can create a new post"""
    body = request.json

    insert_into_db(
        "INSERT INTO Posts (user_id, thread_id, content) VALUES (%s, %s, %s);",
        ( body["user_id"], body["thread_id"], body["content"] )
    )

    return { "msg": f"Post '{body['content']}' created" }, 201
