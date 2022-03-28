"""Router for post related api requests"""

from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity

from app import app
from services.db import query_db, insert_into_db
from services.user import check_admin
from services.response import json_response

@app.route("/api/posts", methods=["GET"])
def get_posts():
    """Return all posts or posts by thread id or user id as JSON"""
    thread_id = request.args.get("thread_id")
    user_id = request.args.get("user_id")

    if thread_id:
        posts = query_db("SELECT * FROM Posts WHERE thread_id=%s;", ( thread_id, ))
    elif user_id:
        posts = query_db("SELECT * FROM Posts WHERE user_id=%s;", ( user_id, ))
    else:
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

@app.route("/api/posts/<int:post_id>", methods=["PUT"])
@jwt_required()
def edit_post(post_id):
    """User can edit own post and admin can edit any post"""
    post = check_and_get_post(post_id)

    if not post:
        return { "msg": "Post not found" }, 404

    body = request.json
    # TODO add timestamp from edit to post, needs to be added to db schema
    if "content" in body:
        insert_into_db("UPDATE Posts SET content=%s WHERE id=%s;", ( body["content"], post_id ))

    return { "msg": f"Post '{body['content']}' edited" }, 204

@app.route("/api/posts/<int:post_id>", methods=["DELETE"])
@jwt_required()
def delete_post(post_id):
    """User can delete own post and admin can delete any post"""
    post = check_and_get_post(post_id)

    if not post:
        return { "msg": "Post not found" }, 404

    insert_into_db("DELETE FROM Posts WHERE id=%s;", ( post_id, ))

    return { "msg": f"Post {post_id} deleted" }, 204

def check_and_get_post(post_id):
    """Query database for post with given id if user is admin or post owner"""
    post_id = str(post_id)

    if check_admin():
        post = query_db("SELECT * FROM Posts WHERE id=%s;", ( post_id, ), True)
    else:
        identity = get_jwt_identity()
        post = query_db(
            "SELECT * FROM Posts WHERE id=%s AND user_id=(SELECT id FROM Users WHERE username=%s);",
            ( post_id, identity ), True
        )

    return post
