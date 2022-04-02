"""Router for image related api requests"""

from flask import request, make_response

from app import app
from services.db import query_db, insert_into_db
from database import queries

@app.route("/api/images/<int:post_id>", methods=["GET"])
def get_image(post_id):
    """Return image by post id"""
    image = query_db(queries.GET_IMAGE_BY_POST_ID, ( str(post_id), ), True)

    if not image:
        return { "msg": "Image not found" }, 404

    data = bytes(image["data"])

    response = make_response(data)
    response.headers.set("Content-Type", "image/jpeg")

    return response

@app.route("/api/images/<int:post_id>", methods=["POST"])
def upload_image(post_id):
    """New image can be uploaded"""
    post_id = str(post_id)

    file = request.files["file"]

    if not file:
        return { "msg": "No image provided" }, 400

    data = file.read()

    insert_into_db(queries.CREATE_IMAGE, ( post_id, file.filename, data ))

    insert_into_db(queries.ADD_IMAGE_TO_POST, ( post_id, ))

    return { "msg": "Image uploaded" }, 201
