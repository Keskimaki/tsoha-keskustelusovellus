"""Start the application"""

from flask import Flask
from flask_bcrypt import Bcrypt

app = Flask(__name__)
bcrypt = Bcrypt(app)

#pylint: disable=wrong-import-position, unused-import
from routes import users
from routes import boards
