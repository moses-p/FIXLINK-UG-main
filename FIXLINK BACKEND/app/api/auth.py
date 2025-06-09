from flask import Blueprint, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.models.user import User
from app.utils.response import success_response, error_response, validation_error
from app import db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['email', 'phone', 'password', 'role']
    for field in required_fields:
        if field not in data:
            return validation_error({field: f"{field} is required"})
    
    # Check if user already exists
    if User.query.filter_by(email=data['email']).first():
        return error_response("Email already registered", 400)
    if User.query.filter_by(phone=data['phone']).first():
        return error_response("Phone number already registered", 400)
    
    # Create new user
    user = User(
        email=data['email'],
        phone=data['phone'],
        full_name=data.get('full_name'),
        role=data['role']
    )
    user.set_password(data['password'])
    
    try:
        db.session.add(user)
        db.session.commit()
        return success_response(
            data=user.to_dict(),
            message="User registered successfully",
            status_code=201
        )
    except Exception as e:
        db.session.rollback()
        return error_response("Error registering user", 500)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    # Validate required fields
    if not data.get('email') or not data.get('password'):
        return validation_error({
            'email': 'Email is required',
            'password': 'Password is required'
        })
    
    # Find user and verify password
    user = User.query.filter_by(email=data['email']).first()
    if not user or not user.check_password(data['password']):
        return error_response("Invalid email or password", 401)
    
    # Create access token
    access_token = create_access_token(identity={
        'id': user.id,
        'email': user.email,
        'role': user.role
    })
    
    return success_response({
        'token': access_token,
        'user': user.to_dict()
    })

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user = get_jwt_identity()
    user = User.query.get(current_user['id'])
    if not user:
        return error_response("User not found", 404)
    return success_response(user.to_dict())

@auth_bp.route('/verify-email', methods=['POST'])
def verify_email():
    data = request.get_json()
    if not data.get('email') or not data.get('token'):
        return validation_error({
            'email': 'Email is required',
            'token': 'Verification token is required'
        })
    
    user = User.query.filter_by(email=data['email']).first()
    if not user:
        return error_response("User not found", 404)
    
    # TODO: Implement email verification logic
    user.is_verified = True
    db.session.commit()
    
    return success_response(message="Email verified successfully") 