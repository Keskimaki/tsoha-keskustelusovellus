"""Router for board related api requests"""

from flask import Response, request

from app import app
from services.db import query_db, insert_into_db
from services.response import json_response

@app.route("/api/boards", methods=["GET"])
def get_boards():
    """Return all boards as JSON"""
    boards = query_db("SELECT * FROM Boards;")

    return json_response(boards)

@app.route("/api/boards/<int:board_id>", methods=["GET"])
def get_board(board_id):
    """Return a single board by id"""
    board = query_db("SELECT * FROM Boards WHERE id=%s", ( str(board_id) ), get_one=True)

    if not board:
        return Response(status=404)

    return json_response(board)

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
