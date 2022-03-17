"""Simple placeholder router"""

from app import app

@app.route("/")
def hello_world():
    """Returns the first message in the database."""
    return "<p>Hello, World!</p>"
