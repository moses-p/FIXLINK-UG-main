from flask import Blueprint, request, jsonify
from app import db
from app.models.transaction import Transaction
from app.models.booking import Booking
from app.utils.auth import token_required
from app.utils.response import success_response, error_response
import uuid

bp = Blueprint('transactions', __name__)

@bp.route('/', methods=['POST'])
@token_required
def create_transaction(current_user):
    try:
        data = request.get_json()
        
        # Verify booking exists and belongs to user
        booking = Booking.query.get_or_404(data['booking_id'])
        if booking.user_id != current_user.id:
            return error_response('Unauthorized', 403)
            
        # Check if transaction already exists
        existing_transaction = Transaction.query.filter_by(booking_id=booking.id).first()
        if existing_transaction:
            return error_response('Transaction already exists for this booking', 400)
            
        transaction = Transaction(
            amount=booking.service.price,
            payment_method=data['payment_method'],
            transaction_reference=str(uuid.uuid4()),
            user_id=current_user.id,
            booking_id=booking.id
        )
        
        db.session.add(transaction)
        db.session.commit()
        
        # TODO: Integrate with payment gateway
        # For now, just mark as completed
        transaction.status = 'completed'
        db.session.commit()
        
        return success_response('Transaction created successfully', transaction.to_dict())
    except Exception as e:
        return error_response(str(e))

@bp.route('/user', methods=['GET'])
@token_required
def get_user_transactions(current_user):
    try:
        transactions = Transaction.query.filter_by(user_id=current_user.id).all()
        return success_response('Transactions retrieved successfully', [tx.to_dict() for tx in transactions])
    except Exception as e:
        return error_response(str(e))

@bp.route('/<int:transaction_id>', methods=['GET'])
@token_required
def get_transaction(current_user, transaction_id):
    try:
        transaction = Transaction.query.get_or_404(transaction_id)
        if transaction.user_id != current_user.id:
            return error_response('Unauthorized', 403)
        return success_response('Transaction retrieved successfully', transaction.to_dict())
    except Exception as e:
        return error_response(str(e))

@bp.route('/<int:transaction_id>/verify', methods=['POST'])
@token_required
def verify_transaction(current_user, transaction_id):
    try:
        transaction = Transaction.query.get_or_404(transaction_id)
        if transaction.user_id != current_user.id:
            return error_response('Unauthorized', 403)
            
        # TODO: Implement payment verification logic
        # For now, just return the transaction status
        return success_response('Transaction verified successfully', transaction.to_dict())
    except Exception as e:
        return error_response(str(e)) 