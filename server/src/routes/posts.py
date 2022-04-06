"""Router for post related api requests"""

from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity

from app import app
from services.db import query_db, insert_into_db
from services.user import check_admin
from services.response import json_response
from services.parser import parse_post, parse_post_edit
from database import queries

@app.route("/api/posts", methods=["GET"])
def get_posts():
    """Return all posts or posts by thread id or user id as JSON"""
    thread_id = request.args.get("thread_id")
    user_id = request.args.get("user_id")

    if thread_id:
        thread = query_db(queries.GET_THREAD_BY_ID, ( thread_id, ), True)
        if thread["closed"]:
            return { "msg": "Thread is closed" }, 403

        posts = query_db(queries.GET_POSTS_BY_THREAD_ID, ( thread_id, ))
    elif user_id:
        posts = query_db(queries.GET_POSTS_BY_USER_ID, ( user_id, ))
    else:
        posts = query_db(queries.GET_ALL_POSTS)

    return json_response(posts)

@app.route("/api/posts/<int:post_id>", methods=["GET"])
def get_post(post_id):
    """Return a single post by id"""
    post = query_db(queries.GET_POST_BY_ID, ( post_id, ), True)

    if not post:
        return { "msg": "Post not found" }, 404

    return json_response(post)

@app.route("/api/posts", methods=["POST"])
@jwt_required()
def create_post():
    """Logged user can create a new post"""
    post = parse_post(request.json)

    thread = query_db(queries.GET_THREAD_BY_ID, ( post[1], ), True)

    if thread["closed"]:
        return { "msg": "Thread is closed" }, 403

    insert_into_db(queries.CREATE_POST, post)

    return { "msg": f"Post '{post[2]}' created" }, 201

@app.route("/api/posts/<int:post_id>", methods=["PUT"])
@jwt_required()
def edit_post(post_id):
    """User can edit own post and admin can edit any post"""
    post = check_and_get_post(post_id)

    if not post:
        return { "msg": "Post not found" }, 404

    edit = parse_post_edit(request.json, post_id)

    insert_into_db(queries.UPDATE_POST, edit)

    return { "msg": f"Post '{edit[0]}' edited" }

@app.route("/api/posts/<int:post_id>", methods=["DELETE"])
@jwt_required()
def delete_post(post_id):
    """User can delete own post and admin can delete any post"""
    post = check_and_get_post(post_id)

    if not post:
        return { "msg": "Post not found" }, 404

    insert_into_db(queries.DELETE_POST, ( post_id, ))

    return { "msg": f"Post {post['content']} deleted" }

def check_and_get_post(post_id):
    """Query database for post with given id if user is admin or post owner"""
    if check_admin():
        post = query_db(queries.GET_POST_BY_ID, ( post_id, ), True)
    else:
        identity = get_jwt_identity()
        post = query_db(queries.GET_POST_BY_ID_AND_USER_ID, ( post_id, identity ), True)

    return post
