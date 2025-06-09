from flask import Blueprint, request
from app.utils.response import success_response, error_response

bookings_bp = Blueprint('bookings', __name__)

@bookings_bp.route('/client', methods=['GET'])
def get_client_bookings():
    # This is a placeholder for now. You would fetch actual booking history
    # for the current client from the database.
    dummy_bookings = [
        {
            "id": 1,
            "provider": "John Doe Plumbing",
            "service": "Drain Cleaning",
            "date": "2023-05-10T10:00:00Z",
            "amount": "UGX 50,000",
            "status": "Completed"
        },
        {
            "id": 2,
            "provider": "Jane's Cleaning Services",
            "service": "Deep Cleaning",
            "date": "2023-06-01T14:30:00Z",
            "amount": "UGX 70,000",
            "status": "In Progress"
        }
    ]
    return success_response(data=dummy_bookings, message="Client booking history fetched successfully") 