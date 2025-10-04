#!/bin/bash

# Netlify Deployment Script for TK999 Betting Platform
# This script ensures proper deployment to Netlify with error handling

set -e  # Exit on any error

echo "=========================================="
echo "TK999 Betting Platform - Netlify Deployment"
echo "=========================================="
echo

# Check if git is clean
if [[ -n $(git status --porcelain) ]]; then
    echo "⚠️  Warning: You have uncommitted changes!"
    echo "It's recommended to commit your changes before deploying."
    read -p "Do you want to continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Deployment cancelled."
        exit 1
    fi
fi

echo "Step 1: Pulling latest changes from remote..."
git pull origin main

echo
echo "Step 2: Verifying required files exist..."
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found!"
    exit 1
fi

if [ ! -f "netlify.toml" ]; then
    echo "⚠️  Warning: netlify.toml not found, creating default..."
    cat > netlify.toml << EOF
[build]
  publish = "."
  command = "echo 'Deploying static site'"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
EOF
fi

echo "✅ All required files found"

echo
echo "Step 3: Verifying assets exist..."
if [ -d "assets" ]; then
    echo "✅ Assets directory found with $(ls assets/ | wc -l) files"
else
    echo "⚠️  Assets directory not found"
fi

echo
echo "Step 4: Adding and committing any changes..."
git add .
if [ -n "$(git status --porcelain)" ]; then
    git commit -m "Deploy: Add netlify deployment script and fix assets"
fi

echo
echo "Step 5: Pushing to GitHub (which triggers Netlify deployment)..."
git push origin main

echo
echo "=========================================="
echo "🎉 Deployment Process Complete!"
echo "=========================================="
echo
echo "Your site will be deployed to Netlify automatically."
echo "Monitor the deployment at: https://app.netlify.com/sites/tk999-betting-app/deploys"
echo
echo "If the deployment shows as cancelled, check:"
echo "- That index-cwg3bxhf.js exists in the assets folder"
echo "- That your netlify.toml configuration is correct"
echo "- The Netlify deployment logs for specific errors"
echo
echo "Once complete, your site will be available at:"
echo "https://tk999-betting-app.netlify.app"