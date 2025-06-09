#!/bin/bash

# Install dependencies
npm install

# Build the application
npm run build

# Create production environment file
cat > .env.production << EOL
NEXT_PUBLIC_API_URL=https://api.fixlink.ug
NEXT_PUBLIC_SITE_URL=https://fixlink.ug
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
EOL

# Create Nginx configuration
cat > nginx.conf << EOL
server {
    listen 80;
    server_name fixlink.ug www.fixlink.ug;
    
    location / {
        return 301 https://\$host\$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name fixlink.ug www.fixlink.ug;
    
    ssl_certificate /etc/letsencrypt/live/fixlink.ug/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/fixlink.ug/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    
    root /var/www/fixlink/frontend;
    index index.html;
    
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    
    location /_next/static {
        alias /var/www/fixlink/frontend/.next/static;
        expires 365d;
        access_log off;
    }
    
    location /static {
        alias /var/www/fixlink/frontend/public;
        expires 365d;
        access_log off;
    }
}
EOL

echo "Build completed successfully!" 