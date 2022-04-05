"""Parsers for user inputs"""
# pylint: disable=missing-function-docstring

from datetime import datetime

from app import bcrypt

def parse_string(string, name):
    print(string)
    if not string or not isinstance(string, str):
        raise Exception(f"{name} must be a string")

    return string

def parse_id(some_id, name):
    if not id or not isinstance(some_id, int):
        raise Exception(f"{name} must be an integer")

    return some_id

def parse_boolean(boolean):
    if boolean is None or not isinstance(boolean, bool):
        return False

    return boolean

def parse_username(username):
    username = parse_string(username, "Username")

    if len(username) < 4:
        raise Exception("Username must be at least 4 characters long")

    return username

def parse_password(password):
    password = parse_string(password, "Password")

    if len(password) < 8:
        raise Exception("Password must be at least 8 characters long")

    password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    return password_hash

def parse_board(body):
    board = (
        parse_string(body["name"], "Name"),
        parse_string(body["description"], "Description"),
    )

    return board

def parse_board_edit(body, board_id):
    edit = (
        parse_string(body["name"], "Name"),
        parse_string(body["description"], "Description"),
        parse_id(board_id, "Board ID")
    )

    return edit

def parse_thread(body):
    thread = (
        parse_id(body["user_id"], "User ID"),
        parse_id(body["board_id"], "Board ID"),
        parse_string(body["name"], "Name")
    )

    return thread

def parse_thread_edit(body, thread_id):
    edit = (
        parse_string(body["name"], "Name"),
        parse_id(thread_id, "Thread ID")
    )

    return edit

def parse_post(body):
    post = (
        parse_id(body["user_id"], "User ID"),
        parse_id(body["thread_id"], "Thread ID"),
        parse_string(body["content"], "Content")
    )

    return post

def parse_post_edit(body, post_id):
    edit = (
        parse_string(body["content"], "Content"),
        datetime.now(),
        parse_id(post_id, "Post ID")
    )

    return edit

def parse_user(body):
    user = (
        parse_username(body["username"]),
        parse_password(body["password"])
    )

    return user

def parse_login(body):
    login = (
        parse_string(body["username"], "Username"),
        parse_string(body["password"], "Password")
    )

    return login
