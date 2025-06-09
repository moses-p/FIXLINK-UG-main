from flask import Blueprint, request
from app.utils.response import success_response, error_response

providers_bp = Blueprint('providers', __name__)

@providers_bp.route('/saved', methods=['GET'])
def get_saved_providers():
    # This is a placeholder for now. In a real application,
    # you would fetch saved providers for the current user from the database.
    dummy_providers = [
        {
            "id": 1,
            "name": "John Doe Plumbing",
            "service": "Plumbing",
            "rating": 4.8,
            "location": "Kampala",
            "price": "UGX 50,000",
            "image": "/placeholder.svg"
        },
        {
            "id": 2,
            "name": "Jane's Cleaning Services",
            "service": "House Cleaning",
            "rating": 4.5,
            "location": "Entebbe",
            "price": "UGX 70,000",
            "image": "/placeholder.svg"
        }
    ]
    return success_response(data=dummy_providers, message="Saved providers fetched successfully") 