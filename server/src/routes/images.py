"""Router for image related api requests"""

from flask import request, make_response

from app import app
from services.db import query_db, insert_into_db

@app.route("/api/images/<int:post_id>", methods=["POST"])
def upload_image(post_id):
    """New image can be uploaded"""
    file = request.files["file"]
    data = file.read()

    insert_into_db(
        "INSERT INTO Images (post_id, name, data) VALUES (%s, %s, %s);",
        ( post_id, file.filename, data )
    )

    return { "msg": "Image uploaded" }, 201

@app.route("/api/images/<int:post_id>", methods=["GET"])
def get_image(post_id):
    """Return image by post id"""
    image = query_db(
        "SELECT * FROM Images WHERE post_id=%s;",
        ( str(post_id), ), True
    )

    if not image:
        return { "msg": "Image not found" }, 404

    data = bytes(image["data"])

    response = make_response(data)
    response.headers.set("Content-Type", "image/jpeg")

    return response
