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

# Prepare deployment files (already extracted to tk999-netlify-deploy directory)
echo "📦 Using deployment files in tk999-netlify-deploy directory"

# Show what we're deploying
echo
echo "📁 Deployment package contents:"
ls -la tk999-netlify-deploy
echo

# Try to deploy to Netlify
echo "🚀 Deploying to Netlify..."
echo "Note: You'll need to authenticate with Netlify if not already logged in"
echo

# Try to deploy (will prompt for login if needed)
if netlify deploy --dir=tk999-netlify-deploy --prod; then
    echo
    echo "✅ Deployment completed successfully!"
else
    echo
    echo "⚠️  Deployment failed. This might be due to permission issues."
    echo "Please try one of these alternatives:"
    echo "1. Run: netlify login && netlify deploy --dir=tk999-netlify-deploy --prod"
    echo "2. Manually deploy by:"
    echo "   - Going to https://app.netlify.com/"
    echo "   - Clicking 'New site from Git' or 'Import an existing project'"
    echo "   - Uploading the tk999-netlify-deploy directory"
    echo
    exit 1
fi

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
echo "2. Create a new site from the tk999-netlify-deploy directory"
echo