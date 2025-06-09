from flask import Blueprint, request, jsonify
from app import db
from app.models.review import Review
from app.models.booking import Booking
from app.utils.auth import token_required
from app.utils.response import success_response, error_response

bp = Blueprint('reviews', __name__)

@bp.route('/', methods=['POST'])
@token_required
def create_review(current_user):
    try:
        data = request.get_json()
        
        # Verify booking exists and belongs to user
        booking = Booking.query.get_or_404(data['booking_id'])
        if booking.user_id != current_user.id:
            return error_response('Unauthorized', 403)
            
        # Check if review already exists
        existing_review = Review.query.filter_by(booking_id=booking.id).first()
        if existing_review:
            return error_response('Review already exists for this booking', 400)
            
        review = Review(
            rating=data['rating'],
            comment=data.get('comment'),
            user_id=current_user.id,
            provider_id=booking.provider_id,
            booking_id=booking.id
        )
        
        db.session.add(review)
        db.session.commit()
        
        return success_response('Review created successfully', review.to_dict())
    except Exception as e:
        return error_response(str(e))

@bp.route('/provider/<int:provider_id>', methods=['GET'])
def get_provider_reviews(provider_id):
    try:
        reviews = Review.query.filter_by(provider_id=provider_id).all()
        return success_response('Reviews retrieved successfully', [review.to_dict() for review in reviews])
    except Exception as e:
        return error_response(str(e))

@bp.route('/<int:review_id>', methods=['PUT'])
@token_required
def update_review(current_user, review_id):
    try:
        review = Review.query.get_or_404(review_id)
        
        # Verify user owns the review
        if review.user_id != current_user.id:
            return error_response('Unauthorized', 403)
            
        data = request.get_json()
        
        review.rating = data.get('rating', review.rating)
        review.comment = data.get('comment', review.comment)
        
        db.session.commit()
        
        return success_response('Review updated successfully', review.to_dict())
    except Exception as e:
        return error_response(str(e))

@bp.route('/<int:review_id>', methods=['DELETE'])
@token_required
def delete_review(current_user, review_id):
    try:
        review = Review.query.get_or_404(review_id)
        
        # Verify user owns the review
        if review.user_id != current_user.id:
            return error_response('Unauthorized', 403)
            
        db.session.delete(review)
        db.session.commit()
        
        return success_response('Review deleted successfully')
    except Exception as e:
        return error_response(str(e)) 