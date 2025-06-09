from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_compress import Compress
from flask_caching import Cache
from flask_socketio import SocketIO
from app.config.config import Config

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
mail = Mail()
limiter = Limiter(key_func=get_remote_address)
compress = Compress()
cache = Cache()
socketio = SocketIO()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    CORS(app)
    mail.init_app(app)
    limiter.init_app(app)
    compress.init_app(app)
    cache.init_app(app)
    socketio.init_app(app, cors_allowed_origins=app.config['CORS_ORIGINS'])
    
    # Import models
    from app.models.user import User
    from app.models.provider import Provider
    from app.models.client import Client
    from app.models.booking import Booking
    from app.models.document import Document
    from app.models.service import Service
    from app.models.review import Review
    from app.models.transaction import Transaction
    from app.models.payment import Payment
    
    # Register blueprints
    from app.api.auth import bp as auth_bp
    from app.api.users import bp as users_bp
    from app.api.providers import bp as providers_bp
    from app.api.bookings import bp as bookings_bp
    from app.api.documents import bp as documents_bp
    from app.api.services import bp as services_bp
    from app.api.reviews import bp as reviews_bp
    from app.api.transactions import bp as transactions_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(users_bp, url_prefix='/api/users')
    app.register_blueprint(providers_bp, url_prefix='/api/providers')
    app.register_blueprint(bookings_bp, url_prefix='/api/bookings')
    app.register_blueprint(documents_bp, url_prefix='/api/documents')
    app.register_blueprint(services_bp, url_prefix='/api/services')
    app.register_blueprint(reviews_bp, url_prefix='/api/reviews')
    app.register_blueprint(transactions_bp, url_prefix='/api/transactions')
    
    # Register error handlers
    @jwt.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        return {'message': 'Token has expired', 'error': 'token_expired'}, 401
        
    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return {'message': 'Invalid token', 'error': 'invalid_token'}, 401
        
    @jwt.unauthorized_loader
    def unauthorized_callback(error):
        return {'message': 'Missing token', 'error': 'unauthorized'}, 401
    
    return app 