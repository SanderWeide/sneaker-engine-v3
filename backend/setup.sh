#!/bin/bash

echo "Setting up Sneaker Engine Backend..."

# Check if uv is installed
if ! command -v uv &> /dev/null; then
    echo "Error: uv is required but not installed."
    echo "Install it with: curl -LsSf https://astral.sh/uv/install.sh | sh"
    exit 1
fi

# Create virtual environment with uv
echo "Creating virtual environment with uv..."
uv venv --python 3.12

# Activate virtual environment
echo "Activating virtual environment..."
source .venv/bin/activate

# Install requirements with uv
echo "Installing dependencies with uv..."
uv pip install -r requirements.txt

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env with your actual configuration!"
fi

echo ""
echo "✅ Backend setup complete!"
echo ""
echo "Next steps:"
echo "1. Update the .env file with your database credentials"
echo "2. Make sure PostgreSQL is running"
echo "3. Activate the virtual environment: source .venv/bin/activate"
echo "4. Run the server: uv run uvicorn main:app --reload --host 127.0.0.1 --port 8000"
