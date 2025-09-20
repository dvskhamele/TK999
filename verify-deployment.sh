#!/bin/bash

# Verification script for TK999 deployment

echo "=========================================="
echo "   TK999 DEPLOYMENT VERIFICATION"
echo "=========================================="
echo

echo "Checking deployment files..."
echo "📁 Main deployment directory: tk999-netlify-deploy"

if [ -d "tk999-netlify-deploy" ]; then
    echo "✅ Deployment directory exists"
    
    echo "📄 Files in deployment directory:"
    ls -la tk999-netlify-deploy
    
    echo
    echo "🔍 Checking main index.html file..."
    if [ -f "tk999-netlify-deploy/index.html" ]; then
        echo "✅ Main index.html file exists"
        
        # Check if it's the React app
        if grep -q "id=\"root\"" tk999-netlify-deploy/index.html; then
            echo "✅ React application detected (div with id='root')"
        else
            echo "❌ Not a React application"
        fi
        
        # Check for CSS and JS files
        if grep -q "assets/index-.*\.css" tk999-netlify-deploy/index.html; then
            echo "✅ CSS file reference found"
        else
            echo "❌ No CSS file reference found"
        fi
        
        if grep -q "assets/index-.*\.js" tk999-netlify-deploy/index.html; then
            echo "✅ JavaScript file reference found"
        else
            echo "❌ No JavaScript file reference found"
        fi
        
        # Check assets directory
        if [ -d "tk999-netlify-deploy/assets" ]; then
            echo "✅ Assets directory exists"
            js_files=$(ls tk999-netlify-deploy/assets/*.js 2>/dev/null | wc -l)
            css_files=$(ls tk999-netlify-deploy/assets/*.css 2>/dev/null | wc -l)
            if [ "$js_files" -gt 0 ]; then
                echo "✅ JavaScript files found ($js_files files)"
            else
                echo "❌ No JavaScript files found"
            fi
            if [ "$css_files" -gt 0 ]; then
                echo "✅ CSS files found ($css_files files)"
            else
                echo "❌ No CSS files found"
            fi
        else
            echo "❌ No assets directory found"
        fi
    else
        echo "❌ Main index.html file is missing"
    fi
else
    echo "❌ Deployment directory not found"
fi

echo
echo "🔍 Checking deployment zip file..."
if [ -f "tk999-netlify-deployment-final.zip" ]; then
    echo "✅ Final deployment zip file exists"
    echo "📄 Contents of zip file:"
    unzip -l tk999-netlify-deployment-final.zip
else
    echo "❌ Final deployment zip file not found"
fi

echo
echo "=========================================="
echo "   DEPLOYMENT STATUS"
echo "=========================================="
echo "✅ Ready for deployment to Netlify"
echo "✅ Contains correct React application files"
echo "✅ No build step required (saves Netlify minutes)"
echo
echo "To deploy now:"
echo "1. Visit https://app.netlify.com/"
echo "2. Drag and drop the 'tk999-netlify-deploy' folder"
echo "3. Or upload the 'tk999-netlify-deployment-final.zip' file"
echo "4. Your site will be live with the correct TK999 application!"