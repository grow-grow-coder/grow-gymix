#!/bin/bash

# =============================================================================
# GROW GYMIX - ENVIRONMENT SETUP SCRIPT
# =============================================================================
# Script to set up environment for development and remote agents

set -e

echo "🚀 Setting up Grow Gymix environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_status "Creating .env file from template..."
    cp .env.example .env
    print_warning "Please edit .env file with your actual values"
else
    print_success ".env file already exists"
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    print_status "Creating .env.local file..."
    cat > .env.local << EOF
# Local environment overrides
# This file is ignored by git and can contain sensitive data

# Add your local overrides here
# Example:
# CONVEX_DEPLOYMENT=your-deployment-name
# VITE_CONVEX_URL=https://your-convex-url
EOF
    print_success "Created .env.local file"
else
    print_success ".env.local file already exists"
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    npm install
    print_success "Dependencies installed"
else
    print_success "Dependencies already installed"
fi

# Set up Convex if not already set up
if [ ! -d ".convex" ]; then
    print_status "Setting up Convex..."
    print_warning "You'll need to run 'npx convex dev' to complete Convex setup"
else
    print_success "Convex already set up"
fi

# Create logs directory
mkdir -p logs
print_success "Created logs directory"

# Create tmp directory
mkdir -p tmp
print_success "Created tmp directory"

# Set up git hooks (if .git exists)
if [ -d ".git" ]; then
    print_status "Setting up git hooks..."
    mkdir -p .git/hooks
    
    # Pre-commit hook
    cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
# Run linting before commit
npm run lint
EOF
    chmod +x .git/hooks/pre-commit
    print_success "Git hooks set up"
fi

# Check for required tools
print_status "Checking required tools..."

# Check Node.js version
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_success "Node.js: $NODE_VERSION"
else
    print_error "Node.js is not installed"
    exit 1
fi

# Check npm version
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    print_success "npm: $NPM_VERSION"
else
    print_error "npm is not installed"
    exit 1
fi

# Check git version
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    print_success "Git: $GIT_VERSION"
else
    print_warning "Git is not installed (recommended for version control)"
fi

# Check Docker (optional)
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version)
    print_success "Docker: $DOCKER_VERSION"
else
    print_warning "Docker is not installed (optional for containerized development)"
fi

echo ""
print_success "Environment setup complete! 🎉"
echo ""
print_status "Next steps:"
echo "1. Edit .env file with your actual values"
echo "2. Run 'npm run dev' to start development server"
echo "3. Run 'npx convex dev' to start Convex backend"
echo ""
print_status "For remote agents:"
echo "1. Make sure your GitHub token is set in .env"
echo "2. Configure AUGMENT_* variables in .env"
echo "3. Set environment variables and run 'npm run dev'"
