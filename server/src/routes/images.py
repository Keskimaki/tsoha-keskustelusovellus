"""Router for image related api requests"""

from flask import request, make_response
from flask_jwt_extended import jwt_required

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
    """User can upload image to post"""
    post_id = str(post_id)

    file = request.files["file"]

    if not file:
        return { "msg": "No image provided" }, 400

    data = file.read()

    insert_into_db(queries.ADD_IMAGE, ( post_id, file.filename, data ))

    insert_into_db(queries.ADD_IMAGE_TO_POST, ( post_id, ))

    return { "msg": "Image uploaded" }, 201

@app.route("/api/images/<int:post_id>", methods=["DELETE"])
@jwt_required()
def remove_image(post_id):
    """User can remove image from post"""
    post_id = str(post_id)

    image = query_db(queries.GET_IMAGE_BY_POST_ID, ( post_id, ), True)

    if not image:
        return { "msg": "Image not found" }, 404

    insert_into_db(queries.REMOVE_IMAGE_BY_POST_ID, ( post_id, ))

    insert_into_db(queries.REMOVE_IMAGE_FROM_POST, ( post_id, ))

    return { "msg": "Image removed" }
