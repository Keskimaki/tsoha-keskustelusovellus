"""Helper functions for api responses"""

import json
from flask import Response

def json_response(data):
    """Convert a dictionary or a list of dictionaries into a HTTP JSON response"""
    if isinstance(data, dict):
        if "time" in data:
            data.update({ "time": str(data["time"]) })
        if "edit" in data:
            data.update({ "edit": str(data["edit"]) })
        
        return data

    if data and "time" in data[0]:
        for value in data:
            value.update({ "time": str(value["time"]) })

    if "edit" in data[0]:
        for value in data:
            value.update({ "edit": str(value["edit"]) })

    return Response(json.dumps(data), mimetype='application/json')
