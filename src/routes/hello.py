"""Simple placeholder router"""

from app import app

from db import records

@app.route("/")
def hello_world():
    """Returns the first message in the database."""
    return f"<p>{records[0]}</p>"
