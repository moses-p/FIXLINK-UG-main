from flask import Blueprint

# Create base API blueprint
api_bp = Blueprint('api', __name__)

# Import all API routes
from . import auth 