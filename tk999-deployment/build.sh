#!/bin/bash

# Build script for TK999 application

echo "Building TK999 application..."

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

echo "Build completed successfully!"