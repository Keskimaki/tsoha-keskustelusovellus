"""Helper functions for api responses"""

import json
from flask import Response

def json_response(data):
    """Convert a list of dictionaries into a HTTP JSON response"""
    if "time" in data[0]:
        for value in data:
            value.update({ "time": str(value["time"]) })

    return Response(json.dumps(data), mimetype='application/json')
