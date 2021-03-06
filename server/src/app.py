"""Initialize and start the application"""

from flask import Flask, render_template
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

from config import JWT_SECRET_KEY

app = Flask(
    __name__,
    static_folder = "../../client/build/static",
    template_folder = "../../client/build"
)

CORS(app)

app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY
app.config["JWT EXPIRATION_DELTA"] = 3600
jwt = JWTManager(app)

bcrypt = Bcrypt(app)

#pylint: disable=wrong-import-position, unused-import
from routes import users
from routes import login
from routes import boards
from routes import threads
from routes import posts
from routes import images

@app.route("/")
def index():
    """Return React frontend as default route"""
    return render_template('index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0')
