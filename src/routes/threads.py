"""Router for thread related api requests"""

from flask import request
from flask_jwt_extended import jwt_required

from app import app
from services.db import query_db, insert_into_db
from services.response import json_response

@app.route("/api/threads", methods=["GET"])
def get_threads():
    """Return all threads as JSON"""
    threads = query_db("SELECT * FROM Threads;")

    return json_response(threads)

@app.route("/api/threads/<int:thread_id>", methods=["GET"])
def get_thread(thread_id):
    """Return a single thread by id"""
    thread = query_db("SELECT * FROM Threads WHERE id=%s;", ( str(thread_id), ), True)

    if not thread:
        return { "msg": "Thread not found" }, 404

    return json_response(thread)

@app.route("/api/threads", methods=["POST"])
@jwt_required()
def create_thread():
    """Logged user can create a new thread"""
    body = request.json

    insert_into_db(
        "INSERT INTO Threads (user_id, board_id, name) VALUES (%s, %s, %s);",
        ( body["user_id"], body["board_id"], body["name"] )
    )

    return { "msg": f"Thread {body['name']} created" }, 201
