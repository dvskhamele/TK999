#!/bin/bash

# Auto-start script for TK999 application

echo "🚀 Starting TK999 Application..."

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if node is installed
if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js to run this application."
    echo "Visit https://nodejs.org/ to download and install Node.js"
    exit 1
fi

# Check if npm is installed
if ! command_exists npm; then
    echo "❌ npm is not installed. Please install npm to run this application."
    echo "npm is usually installed with Node.js. Visit https://nodejs.org/ to download and install Node.js"
    exit 1
fi

echo "✅ Node.js $(node --version) and npm $(npm --version) are installed"

# Check if concurrently is installed globally
if ! command_exists concurrently; then
    echo "⚠️  concurrently is not installed globally. Installing..."
    npm install -g concurrently
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing root dependencies..."
    npm install
else
    echo "✅ Root dependencies already installed"
fi

if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing server dependencies..."
    npm install --prefix server
else
    echo "✅ Server dependencies already installed"
fi

if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing client dependencies..."
    npm install --prefix client
else
    echo "✅ Client dependencies already installed"
fi

# Start the application
echo "🔥 Starting TK999 application..."
echo "📖 Application will be available at http://localhost:5173"
echo "📖 Press Ctrl+C to stop the application"
npm run dev