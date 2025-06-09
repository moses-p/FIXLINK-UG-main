from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from flask_cors import CORS
import os

app = Flask(__name__)

# CORS Configuration
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "http://localhost:3000",  # React default port
            "http://localhost:5173",  # Vite default port
            "http://127.0.0.1:3000",
            "http://127.0.0.1:5173",
            "https://fixlinkug.com"
        ],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///fixlink_ug.db'  # Changed to SQLite
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Change this in production
app.config['UPLOAD_FOLDER'] = 'uploads/'

db = SQLAlchemy(app)
jwt = JWTManager(app)

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # client, provider, admin
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Provider(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    service = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    location = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    rating = db.Column(db.Float, default=0.0)
    is_verified = db.Column(db.Boolean, default=False)
    is_approved = db.Column(db.Boolean, default=False)

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    provider_id = db.Column(db.Integer, db.ForeignKey('provider.id'), nullable=False)
    service = db.Column(db.String(100), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default='pending')

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    booking_id = db.Column(db.Integer, db.ForeignKey('booking.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default='pending')
    payment_method = db.Column(db.String(50), nullable=False)

# Authentication Endpoints
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'User already exists'}), 400
    
    user = User(email=data['email'], role=data['role'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if not user or not user.check_password(data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401
    from flask_jwt_extended import create_access_token
    token = create_access_token(identity={'id': user.id, 'role': user.role})
    return jsonify({'token': token}), 200

@app.route('/api/auth/me', methods=['GET'])
@jwt_required()
def get_me():
    current_user = get_jwt_identity()
    user = User.query.get(current_user['id'])
    return jsonify({'email': user.email, 'role': user.role}), 200

# Provider Endpoints
@app.route('/api/providers', methods=['GET'])
def list_providers():
    providers = Provider.query.filter_by(is_approved=True).all()
    return jsonify([{'id': p.id, 'name': p.name, 'service': p.service, 'rating': p.rating} for p in providers]), 200

@app.route('/api/providers/<int:id>', methods=['GET'])
def get_provider(id):
    provider = Provider.query.get_or_404(id)
    return jsonify({'id': provider.id, 'name': provider.name, 'service': provider.service, 'description': provider.description}), 200

@app.route('/api/providers', methods=['POST'])
@jwt_required()
def create_provider():
    current_user = get_jwt_identity()
    if current_user['role'] != 'provider':
        return jsonify({'message': 'Unauthorized'}), 403
    data = request.get_json()
    provider = Provider(user_id=current_user['id'], name=data['name'], service=data['service'], description=data['description'])
    db.session.add(provider)
    db.session.commit()
    return jsonify({'message': 'Provider created'}), 201

# Booking Endpoints
@app.route('/api/bookings', methods=['POST'])
@jwt_required()
def create_booking():
    current_user = get_jwt_identity()
    if current_user['role'] != 'client':
        return jsonify({'message': 'Unauthorized'}), 403
    data = request.get_json()
    booking = Booking(client_id=current_user['id'], provider_id=data['provider_id'], service=data['service'], date=datetime.strptime(data['date'], '%Y-%m-%d'), amount=data['amount'])
    db.session.add(booking)
    db.session.commit()
    return jsonify({'message': 'Booking created'}), 201

@app.route('/api/bookings/client/<int:client_id>', methods=['GET'])
@jwt_required()
def get_client_bookings(client_id):
    current_user = get_jwt_identity()
    if current_user['id'] != client_id or current_user['role'] != 'client':
        return jsonify({'message': 'Unauthorized'}), 403
    bookings = Booking.query.filter_by(client_id=client_id).all()
    return jsonify([{'id': b.id, 'service': b.service, 'date': b.date.isoformat(), 'status': b.status} for b in bookings]), 200

# Payment Endpoints
@app.route('/api/payments/initiate', methods=['POST'])
@jwt_required()
def initiate_payment():
    data = request.get_json()
    transaction = Transaction(booking_id=data['booking_id'], amount=data['amount'], payment_method=data['payment_method'])
    db.session.add(transaction)
    db.session.commit()
    return jsonify({'message': 'Payment initiated', 'transaction_id': transaction.id}), 200

@app.route('/api/payments/history', methods=['GET'])
@jwt_required()
def payment_history():
    current_user = get_jwt_identity()
    transactions = Transaction.query.join(Booking).filter(Booking.client_id == current_user['id']).all()
    return jsonify([{'id': t.id, 'amount': t.amount, 'status': t.status} for t in transactions]), 200

# Admin Endpoints
@app.route('/api/admin/stats', methods=['GET'])
@jwt_required()
def admin_stats():
    current_user = get_jwt_identity()
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Unauthorized'}), 403
    stats = {
        'total_users': User.query.count(),
        'total_providers': Provider.query.count(),
        'total_bookings': Booking.query.count()
    }
    return jsonify(stats), 200

@app.route('/api/admin/providers/<int:id>/approve', methods=['PUT'])
@jwt_required()
def approve_provider(id):
    current_user = get_jwt_identity()
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Unauthorized'}), 403
    provider = Provider.query.get_or_404(id)
    provider.is_approved = True
    db.session.commit()
    return jsonify({'message': 'Provider approved'}), 200

# Search Endpoint
@app.route('/api/search/providers', methods=['GET'])
def search_providers():
    query = request.args.get('q', '')
    location = request.args.get('location', '')
    providers = Provider.query.filter(Provider.name.ilike(f'%{query}%'), Provider.location.ilike(f'%{location}%'), Provider.is_approved==True).all()
    return jsonify([{'id': p.id, 'name': p.name, 'service': p.service} for p in providers]), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)