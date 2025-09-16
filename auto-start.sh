#!/bin/bash

# Auto-start script for TK999 application

echo "🚀 Starting TK999 Application..."

# Check if node is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js to run this application."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "❌ npm is not installed. Please install npm to run this application."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing root dependencies..."
    npm install
fi

if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing server dependencies..."
    npm install --prefix server
fi

if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing client dependencies..."
    npm install --prefix client
fi

# Start the application
echo "🔥 Starting TK999 application..."
npm run dev