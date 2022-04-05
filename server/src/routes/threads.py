"""Router for thread related api requests"""

from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity

from app import app
from services.db import query_db, insert_into_db
from services.user import check_admin
from services.response import json_response
from services.parser import parse_thread, parse_thread_edit
from database import queries

@app.route("/api/threads", methods=["GET"])
def get_threads():
    """Return all threads or threads by board id or user id as JSON"""
    board_id = request.args.get("board_id")
    user_id = request.args.get("user_id")

    if board_id:
        threads = query_db(queries.GET_THREADS_BY_BOARD_ID, ( board_id, ))
    elif user_id:
        threads = query_db(queries.GET_THREADS_BY_USER_ID, ( user_id, ))
    else:
        threads = query_db(queries.GET_ALL_THREADS)

    return json_response(threads)

@app.route("/api/threads/<int:thread_id>", methods=["GET"])
def get_thread(thread_id):
    """Return a single thread by id"""
    thread = query_db(queries.GET_THREAD_BY_ID, ( str(thread_id), ), True)

    if not thread:
        return { "msg": "Thread not found" }, 404

    return json_response(thread)

@app.route("/api/threads/<string:thread_name>", methods=["GET"])
def get_thread_id(thread_name):
    """Return thread id from thread name"""
    thread_id = query_db(queries.GET_THREAD_ID_BY_NAME, ( thread_name, ), True)

    if not thread_id:
        return { "msg": "Thread not found" }, 404

    return json_response(thread_id)

@app.route("/api/threads", methods=["POST"])
@jwt_required()
def create_thread():
    """Logged user can create a new thread"""
    thread = parse_thread(request.json)

    insert_into_db(queries.CREATE_THREAD, thread)

    return { "msg": f"Thread {thread[2]} created" }, 201

@app.route("/api/threads/<int:thread_id>", methods=["PUT"])
@jwt_required()
def edit_thread(thread_id):
    """User can edit own thread and admin can edit any thread"""
    thread = check_and_get_thread(thread_id)

    if not thread:
        return { "msg": "Thread not found" }, 404

    body = request.json

    if "name" in body:
        edit = parse_thread_edit(body, thread_id)
        insert_into_db(queries.EDIT_THREAD_NAME, edit)

    if check_admin() and "closed" in body:
        insert_into_db(queries.EDIT_THREAD_STATUS, ( body["closed"], thread_id ))

    return { "msg": f"Thread {body['name']} edited" }

@app.route("/api/threads/<int:thread_id>", methods=["DELETE"])
@jwt_required()
def delete_thread(thread_id):
    """User can delete own thread and admin can delete any thread"""
    thread = check_and_get_thread(thread_id)

    if not thread:
        return { "msg": "Thread not found" }, 404

    insert_into_db(queries.DELETE_POSTS_BY_THREAD_ID, ( thread_id, ))

    insert_into_db(queries.DELETE_THREAD, ( thread_id, ))

    return { "msg": f"Thread {thread['name']} deleted" }

def check_and_get_thread(thread_id):
    """Query database for thread with given id if user is admin or thread owner"""
    thread_id = str(thread_id)

    if check_admin():
        thread = query_db("SELECT * FROM Threads WHERE id=%s;", ( thread_id, ), True)
    else:
        identity = get_jwt_identity()
        thread = query_db(queries.GET_THREAD_IF_ADMIN_OR_OWNER, ( thread_id, identity ), True)

    return thread
