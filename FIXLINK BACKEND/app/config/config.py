import os
from datetime import timedelta

class Config:
    # Application Settings
    SECRET_KEY = os.getenv('SECRET_KEY', 'a-very-secret-and-complex-key')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'another-very-secret-and-complex-jwt-key')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)

    # Database Settings
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///fixlink_ug.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Redis Settings
    REDIS_URL = os.getenv('REDIS_URL', 'redis://localhost:6379/0')

    # Email Settings
    MAIL_SERVER = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
    MAIL_PORT = int(os.getenv('MAIL_PORT', 587))
    MAIL_USE_TLS = os.getenv('MAIL_USE_TLS', 'True').lower() == 'true'
    MAIL_USERNAME = os.getenv('MAIL_USERNAME', 'fixlinkug8@gmail.com')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD', '')

    # MTN Mobile Money Settings
    MTN_API_KEY = os.getenv('MTN_API_KEY', '')
    MTN_API_SECRET = os.getenv('MTN_API_SECRET', '')

    # PayPal Settings
    PAYPAL_CLIENT_ID = os.getenv('PAYPAL_CLIENT_ID', '')
    PAYPAL_CLIENT_SECRET = os.getenv('PAYPAL_CLIENT_SECRET', '')

    # Google Maps API
    GOOGLE_MAPS_API_KEY = os.getenv('GOOGLE_MAPS_API_KEY', '')

    # Security Settings
    CORS_ORIGINS = [
        'http://localhost:3000',  # React default port
        'http://localhost:5173',  # Vite default port
        'http://127.0.0.1:3000',
        'http://127.0.0.1:5173',
        'http://localhost:3001',  # Added for new frontend port
        'http://127.0.0.1:3001',  # Added for new frontend port
        'http://192.168.0.111:3000', # Added for network frontend access
        'https://fixlinkug.com'
    ]
    RATE_LIMIT = os.getenv('RATE_LIMIT', '100/minute')

    # File Upload Settings
    UPLOAD_FOLDER = 'uploads'
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'pdf', 'doc', 'docx'}

class DevelopmentConfig(Config):
    DEBUG = True
    CORS_ORIGINS = [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:5173',
        'http://localhost:3001',  # Added for new frontend port
        'http://127.0.0.1:3001',  # Added for new frontend port
        'http://192.168.0.111:3000', # Added for network frontend access
        'https://fixlinkug.com'
    ]

class ProductionConfig(Config):
    DEBUG = False
    CORS_ORIGINS = [
        'https://fixlinkug.com',
        'https://www.fixlinkug.com'
    ]

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:postgres@postgres:5432/fixlink_ug_test'
    CORS_ORIGINS = ['http://localhost:3000']

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
} 