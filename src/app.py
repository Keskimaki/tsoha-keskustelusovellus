"""Start the application"""

from flask import Flask
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

from config import JWT_SECRET_KEY

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
jwt = JWTManager(app)

bcrypt = Bcrypt(app)

#pylint: disable=wrong-import-position, unused-import
from routes import users
from routes import login
from routes import boards
