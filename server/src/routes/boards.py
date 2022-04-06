"""Router for board related api requests"""

from flask import request
from flask_jwt_extended import jwt_required

from app import app
from services.db import query_db, insert_into_db
from services.user import check_admin
from services.response import json_response
from services.parser import parse_board, parse_board_edit
from database import queries

@app.route("/api/boards", methods=["GET"])
def get_boards():
    """Return all boards as JSON"""
    boards = query_db(queries.GET_ALL_BOARDS)

    return json_response(boards)

@app.route("/api/boards/<int:board_id>", methods=["GET"])
def get_board(board_id):
    """Return a single board by id"""
    board = query_db(queries.GET_BOARD_BY_ID, ( board_id, ), True)

    if not board:
        return { "msg": "Board not found" }, 404

    return json_response(board)

@app.route("/api/boards/<string:board_name>", methods=["GET"])
def get_board_id(board_name):
    """Return board id from board name"""
    board_id = query_db(queries.GET_BOARD_ID_BY_NAME, ( board_name, ), True)

    if not board_id:
        return { "msg": "Board not found" }, 404

    return json_response(board_id)

@app.route("/api/boards", methods=["POST"])
@jwt_required()
def create_board():
    """Allow admins to create boards"""
    if not check_admin():
        return { "msg": "Administrator privileges required" }, 401

    board = parse_board(request.json)

    insert_into_db(queries.CREATE_BOARD, board)

    return { "msg": f"Board {board[0]} created" }, 201

@app.route("/api/boards/<int:board_id>", methods=["PUT"])
@jwt_required()
def edit_board(board_id):
    """Allow admins to edit boards"""
    if not check_admin():
        return { "msg": "Administrator privileges required" }, 401

    board = query_db(queries.GET_BOARD_BY_ID, ( board_id, ), True)

    if not board:
        return { "msg": "Board not found" }, 404

    edit = parse_board_edit(request.json, board_id)

    insert_into_db(queries.EDIT_BOARD, edit)

    return { "msg": f"Board {edit[0]} edited" }

@app.route("/api/boards/<int:board_id>", methods=["DELETE"])
@jwt_required()
def delete_board(board_id):
    """Allow admins to delete boards"""
    if not check_admin():
        return { "msg": "Administrator privileges required" }, 401

    board = query_db(queries.GET_BOARD_BY_ID, ( board_id, ), True)

    if not board:
        return { "msg": "Board not found" }, 404

    insert_into_db(queries.DELETE_BOARD, ( board_id, ))

    return { "msg": f"Board {board['name']} deleted" }
