#!/bin/bash

# Script to trigger a new Netlify deployment

echo "=========================================="
echo "   TRIGGERING NEW NETLIFY DEPLOYMENT"
echo "=========================================="
echo

# Show current git status
echo "Current git status:"
git status
echo

# Create a temporary file in the repository to force a change
TEMP_FILE="deployment-trigger-$(date +%s).txt"
echo "Deployment triggered at $(date)" > "$TEMP_FILE"
git add "$TEMP_FILE"

# Commit the file
echo "Creating commit to trigger deployment..."
git commit -m "Trigger new deployment - $(date)"

# Push to trigger deployment
echo "Pushing changes to trigger new deployment..."
if git push origin main; then
    echo "✅ Push successful - Netlify deployment should be triggered"
    
    # Wait a moment for deployment to start
    sleep 5
    
    # Show latest deployment info
    echo
    echo "Latest deployment status:"
    curl -s https://api.netlify.com/api/v1/sites/tk999-betting-app.netlify.app/deploys | jq -r '.[0].state, .[0].created_at' 2>/dev/null || echo "Could not fetch deployment status"
    
    echo
    echo "Check https://app.netlify.com/sites/tk999-betting-app/deploys for detailed status"
else
    echo "❌ Push failed"
fi

# Clean up the temporary file
git rm "$TEMP_FILE" >/dev/null 2>&1
git commit -m "Remove deployment trigger file" >/dev/null 2>&1
git push origin main >/dev/null 2>&1

echo
echo "Deployment trigger process completed!"