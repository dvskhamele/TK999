#!/bin/bash

# Deployment script for TK999 application

echo "Starting TK999 deployment..."

# Build frontend
echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Build backend
echo "Building backend..."
cd backend
npm install
cd ..

echo "Deployment ready!"
echo "To deploy to Vercel:"
echo "1. Create a new project on Vercel"
echo "2. Connect your GitHub repository"
echo "3. Set the root directory to 'tk999-deployment'"
echo "4. Set the build command to './deploy.sh'"
echo "5. Set the output directory to 'frontend/dist'"
echo "6. Add environment variables as needed"