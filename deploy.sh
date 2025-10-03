#!/bin/bash
echo \"Deploying TK999 Betting Platform to Netlify...\"

# Check if zip exists
if [ ! -f \"tk999-betting-platform.zip\" ]; then
    echo \"Creating zip file...\"
    zip -r tk999-betting-platform.zip . -x \"node_modules/*\" \".git/*\" \".qodo/*\" \"*.log\" \"*/Thumbs.db\" \"*/.DS_Store\"
fi

# Get Netlify authentication token if available
if [ -z \"$NETLIFY_AUTH_TOKEN\" ]; then
    echo \"Please set your Netlify authentication token:\"
    echo \"export NETLIFY_AUTH_TOKEN=your_token_here\"
    echo \"You can get your token from https://app.netlify.com/user/applications#personal-access-tokens\"
    exit 1
fi

# Deploy to Netlify
echo \"Deploying...\"
curl -X POST \\
  https://api.netlify.com/api/v1/sites \\
  -H \"Authorization: Bearer $NETLIFY_AUTH_TOKEN\" \\
  -H \"Content-Type: application/zip\" \\
  --data-binary @tk999-betting-platform.zip

echo \"Deployment completed! Check your Netlify dashboard for the URL.\"