#!/bin/bash

echo "Starting FixLink production setup..."

# Make scripts executable
chmod +x setup.sh
chmod +x frontend-setup.sh

# Run backend setup
echo "Running backend setup..."
./setup.sh

# Run frontend setup
echo "Running frontend setup..."
cd frontend
../frontend-setup.sh
cd ..

echo "Master setup completed!"
echo "Please review all generated .env.production files and make any necessary adjustments."
echo "Next steps:"
echo "1. Set up the database"
echo "2. Configure Nginx"
echo "3. Set up SSL certificates"
echo "4. Start the services"
echo "5. Configure monitoring"
echo "6. Set up backups" 