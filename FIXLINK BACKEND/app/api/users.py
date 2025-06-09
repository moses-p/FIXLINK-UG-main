from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user import User
from app.utils.response import success_response, error_response

users_bp = Blueprint('users', __name__)

@users_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_user_profile():
    current_user = get_jwt_identity()
    print(f"DEBUG: current_user from JWT: {current_user}")
    if not isinstance(current_user, dict) or 'id' not in current_user:
        print(f"DEBUG: Invalid JWT identity format: {current_user}")
        return error_response("Invalid token identity format", 400)
    
    user_id = current_user['id']
    print(f"DEBUG: Attempting to fetch user with ID: {user_id}")
    user = User.query.get(user_id)
    if not user:
        print(f"DEBUG: User with ID {user_id} not found.")
        return error_response("User not found", 404)
    return success_response(user.to_dict(), message="User profile fetched successfully") 