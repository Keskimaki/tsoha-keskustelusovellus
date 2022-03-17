"""Start the application"""

from flask import Flask

app = Flask(__name__)

#pylint: disable=wrong-import-position, unused-import
from routes import hello
