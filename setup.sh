#!/bin/bash

echo "🧪 Lab Testing & Calibration Management System Setup"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v16 or higher) first."
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL (v12 or higher) first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend && npm install && cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend && npm install && cd ..

echo "✅ All dependencies installed successfully!"

echo ""
echo "🚀 Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Make sure PostgreSQL is running"
echo "2. Create database: CREATE DATABASE lab_testing_db;"
echo "3. Update database credentials in backend/.env if needed"
echo "4. Run the application: npm run dev"
echo ""
echo "Default login credentials:"
echo "Email: admin@labtesting.com"
echo "Password: admin123"
echo ""
echo "Backend will run on: http://localhost:3001"
echo "Frontend will run on: http://localhost:3000"