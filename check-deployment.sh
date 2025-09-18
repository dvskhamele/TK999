#!/bin/bash

# Check if frontend is deployed and running
echo "Checking if frontend is deployed and running..."

# Try to get the deployment URL from Vercel CLI if available
if command -v vercel &> /dev/null; then
    echo "Vercel CLI is available. Checking deployments..."
    vercel list
else
    echo "Vercel CLI is not available or not properly installed."
    echo "Please provide the deployed URL of your frontend application."
    echo "Example: https://your-app.vercel.app"
    read -p "Enter the frontend URL: " FRONTEND_URL
    
    if [ ! -z "$FRONTEND_URL" ]; then
        echo "Checking frontend at $FRONTEND_URL..."
        curl -I "$FRONTEND_URL" 2>/dev/null | head -n 1
        if [ $? -eq 0 ]; then
            echo "Frontend is accessible."
        else
            echo "Failed to access frontend."
        fi
    else
        echo "No URL provided. Cannot check frontend status."
    fi
fi