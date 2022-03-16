from flask import Flask

from db import records

app = Flask(__name__)

@app.route("/")
def hello_world():
    return f"<p>{records[0]}</p>"
