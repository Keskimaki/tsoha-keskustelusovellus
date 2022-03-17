"""Simple placeholder router"""

from app import app

@app.route("/")
def hello_world():
    """Return Hello, World!"""
    return "<p>Hello, World!</p>"
