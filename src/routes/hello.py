from app import app

from db import records

@app.route("/")
def hello_world():
    return f"<p>{records[0]}</p>"
