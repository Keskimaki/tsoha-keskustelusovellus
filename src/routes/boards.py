"""Router for board related api requests"""

from flask import Response, request

from app import app
from services.db import insert_into_db

#@app.route("/api/boards", methods=["GET"])

# TODO Admin authentication
@app.route("/api/boards", methods=["POST"])
def create_board():
    """Allow admins to create boards"""
    body = request.json

    if not "private" in body:
        body["private"] = False

    insert_into_db(
        "INSERT INTO Boards (name, description, private) VALUES (%s, %s, %s);",
        ( body["name"], body["description"], body["private"] )
    )

    return Response(status=201)
