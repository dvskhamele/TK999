#!/bin/bash

# Deployment script for TK999 to Netlify

echo "=========================================="
echo "   TK999 NETLIFY DEPLOYMENT SCRIPT"
echo "=========================================="
echo

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null
then
    echo "❌ Netlify CLI is not installed"
    echo "Please install it with: npm install -g netlify-cli"
    exit 1
fi

echo "✅ Netlify CLI is installed"

# Create a temporary directory for deployment
echo "📦 Preparing deployment files..."
rm -rf /tmp/tk999-netlify-deploy
mkdir -p /tmp/tk999-netlify-deploy

# Extract frontend files
echo "📂 Extracting frontend files..."
unzip -q tk999-frontend.zip -d /tmp/tk999-netlify-deploy

# Move files to root of temp directory for easier deployment
mv /tmp/tk999-netlify-deploy/frontend/dist/* /tmp/tk999-netlify-deploy/
rm -rf /tmp/tk999-netlify-deploy/frontend

echo "✅ Deployment files prepared in /tmp/tk999-netlify-deploy"

# Show what we're deploying
echo
echo "📁 Deployment package contents:"
ls -la /tmp/tk999-netlify-deploy
echo

# Deploy to Netlify
echo "🚀 Deploying to Netlify..."
echo "Note: You'll need to authenticate with Netlify if not already logged in"
echo

# Try to deploy (will prompt for login if needed)
netlify deploy \
  --dir=/tmp/tk999-netlify-deploy \
  --prod

echo
echo "✅ Deployment completed!"

# Clean up
echo "🧹 Cleaning up temporary files..."
rm -rf /tmp/tk999-netlify-deploy

echo
echo "=========================================="
echo "   DEPLOYMENT SUMMARY"
echo "=========================================="
echo "1. If this is your first deployment, Netlify will:"
echo "   - Open a browser for authentication"
echo "   - Ask you to create a new site or link to existing one"
echo "2. After deployment, your site will be live on a Netlify URL"
echo "3. You can later set up a custom domain in Netlify dashboard"
echo
echo "For manual deployment or troubleshooting:"
echo "1. Visit https://app.netlify.com/"
echo "2. Create a new site from the /tmp/tk999-netlify-deploy directory"
echo "   (or extract tk999-frontend.zip and deploy the frontend/dist folder)"
echo