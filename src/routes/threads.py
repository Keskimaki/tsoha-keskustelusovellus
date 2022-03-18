"""Router for thread related api requests"""

from app import app
from services.db import query_db
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
