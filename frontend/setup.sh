#!/bin/bash

echo "Setting up Sneaker Engine Frontend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is required but not installed."
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "Error: Node.js 20.x or higher is required. Current version: $(node -v)"
    echo "Please install Node.js 20.9.0 or higher."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install

echo ""
echo "✅ Frontend setup complete!"
echo ""
echo "Next steps:"
echo "1. Make sure the backend is running on http://127.0.0.1:8000"
echo "2. Start the development server: npm run dev"
echo "3. Open your browser to http://localhost:4200"
