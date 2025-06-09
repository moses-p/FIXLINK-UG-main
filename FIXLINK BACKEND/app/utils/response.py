from flask import jsonify

def success_response(data=None, message="Success", status_code=200):
    response = {
        "status": "success",
        "message": message,
        "data": data
    }
    return jsonify(response), status_code

def error_response(message="Error", status_code=400, errors=None):
    response = {
        "status": "error",
        "message": message,
        "errors": errors
    }
    return jsonify(response), status_code

def validation_error(errors):
    return error_response(
        message="Validation Error",
        status_code=422,
        errors=errors
    )

def not_found_error(message="Resource not found"):
    return error_response(
        message=message,
        status_code=404
    )

def unauthorized_error(message="Unauthorized"):
    return error_response(
        message=message,
        status_code=401
    )

def forbidden_error(message="Forbidden"):
    return error_response(
        message=message,
        status_code=403
    ) 