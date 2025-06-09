#!/bin/bash

# Function to prompt for input with default value
prompt_with_default() {
    local prompt="$1"
    local default="$2"
    local value
    
    read -p "$prompt [$default]: " value
    echo "${value:-$default}"
}

echo "Setting up FixLink frontend production environment..."

# Prompt for configuration values
API_URL=$(prompt_with_default "Enter API URL" "https://api.fixlink.ug")
NEXT_PUBLIC_API_URL=$(prompt_with_default "Enter public API URL" "https://api.fixlink.ug")

# Create .env.production file
cat > .env.production << EOL
# API Configuration
NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_FEEDBACK=true

# External Services
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key

# Social Media
NEXT_PUBLIC_FACEBOOK_APP_ID=your_facebook_app_id
NEXT_PUBLIC_TWITTER_HANDLE=@fixlinkug

# Contact Information
NEXT_PUBLIC_CONTACT_EMAIL=contact@fixlink.ug
NEXT_PUBLIC_SUPPORT_PHONE=+256XXXXXXXXX

# Company Information
NEXT_PUBLIC_COMPANY_NAME=FixLink Uganda
NEXT_PUBLIC_COMPANY_ADDRESS=Kampala, Uganda
NEXT_PUBLIC_COMPANY_WEBSITE=https://fixlink.ug
EOL

echo "Created .env.production file successfully!"

# Set proper permissions
echo "Setting proper permissions..."
chmod 600 .env.production

echo "Setup completed successfully!"
echo "Please review the .env.production file and make any necessary adjustments."
echo "Next steps:"
echo "1. Update the analytics ID"
echo "2. Add your Google Maps API key"
echo "3. Add your Stripe public key"
echo "4. Configure social media integration"
echo "5. Update contact information" 