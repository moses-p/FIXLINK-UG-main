#!/bin/bash

# Function to generate random string
generate_random_string() {
    openssl rand -base64 32 | tr -dc 'a-zA-Z0-9' | head -c 32
}

# Function to prompt for input with default value
prompt_with_default() {
    local prompt="$1"
    local default="$2"
    local value
    
    read -p "$prompt [$default]: " value
    echo "${value:-$default}"
}

echo "Setting up FixLink production environment..."

# Generate secure keys
SECRET_KEY=$(generate_random_string)
JWT_SECRET_KEY=$(generate_random_string)

# Prompt for configuration values
DB_USER=$(prompt_with_default "Enter database username" "fixlink_user")
DB_PASS=$(prompt_with_default "Enter database password" "fixlink_password")
DB_NAME=$(prompt_with_default "Enter database name" "fixlink")
DB_HOST=$(prompt_with_default "Enter database host" "localhost")

MAIL_USER=$(prompt_with_default "Enter email address" "noreply@fixlink.ug")
MAIL_PASS=$(prompt_with_default "Enter email password" "")
MAIL_SERVER=$(prompt_with_default "Enter mail server" "smtp.gmail.com")
MAIL_PORT=$(prompt_with_default "Enter mail port" "587")

REDIS_HOST=$(prompt_with_default "Enter Redis host" "localhost")
REDIS_PORT=$(prompt_with_default "Enter Redis port" "6379")

# Create .env.production file
cat > .env.production << EOL
# Flask
FLASK_ENV=production
SECRET_KEY=$SECRET_KEY
JWT_SECRET_KEY=$JWT_SECRET_KEY

# Database
DATABASE_URL=postgresql://$DB_USER:$DB_PASS@$DB_HOST/$DB_NAME

# Mail
MAIL_SERVER=$MAIL_SERVER
MAIL_PORT=$MAIL_PORT
MAIL_USE_TLS=True
MAIL_USERNAME=$MAIL_USER
MAIL_PASSWORD=$MAIL_PASS
MAIL_DEFAULT_SENDER=$MAIL_USER

# Redis
REDIS_URL=redis://$REDIS_HOST:$REDIS_PORT/0

# CORS
CORS_ORIGINS=https://fixlink.ug,https://www.fixlink.ug

# File Upload
MAX_CONTENT_LENGTH=16777216  # 16MB in bytes
UPLOAD_FOLDER=/var/www/fixlink/uploads

# Logging
LOG_LEVEL=INFO
LOG_FILE=/var/log/fixlink/app.log
EOL

echo "Created .env.production file successfully!"

# Create necessary directories
echo "Creating necessary directories..."
sudo mkdir -p /var/www/fixlink/uploads
sudo mkdir -p /var/log/fixlink
sudo chown -R www-data:www-data /var/www/fixlink
sudo chown -R www-data:www-data /var/log/fixlink

# Set proper permissions
echo "Setting proper permissions..."
sudo chmod 600 .env.production

echo "Setup completed successfully!"
echo "Please review the .env.production file and make any necessary adjustments."
echo "Next steps:"
echo "1. Set up the database"
echo "2. Configure Nginx"
echo "3. Set up SSL certificates"
echo "4. Start the services" 