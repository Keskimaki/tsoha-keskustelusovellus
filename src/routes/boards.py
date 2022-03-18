"""Router for board related api requests"""

from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity

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
    board = query_db("SELECT * FROM Boards WHERE id=%s;", ( str(board_id), ), True)

    if not board:
        return { "msg": "Board not found" }, 404

    return json_response(board)

@app.route("/api/boards", methods=["POST"])
@jwt_required()
def create_board():
    """Allow admins to create boards"""
    if not check_admin():
        return { "msg": "Administrator privileges required" }, 401

    body = request.json

    if not "private" in body:
        body["private"] = False

    insert_into_db(
        "INSERT INTO Boards (name, description, private) VALUES (%s, %s, %s);",
        ( body["name"], body["description"], body["private"] )
    )

    return { "msg": f"Board {body['name']} created" }, 201

def check_admin():
    identity = get_jwt_identity()
    user = query_db("SELECT admin FROM Users WHERE username=%s;", ( identity, ), True)

    return user["admin"]
