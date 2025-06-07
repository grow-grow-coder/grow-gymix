#!/bin/bash
# =============================================================================
# GROW GYMIX - AUGMENT REMOTE AGENT ENVIRONMENT SETUP
# =============================================================================
# Environment setup script for Augment Remote Agents
# This script configures the Ubuntu 22.04 environment for the Grow Gymix project

set -e

echo "🚀 Setting up Grow Gymix environment for Augment Remote Agent..."

# =============================================================================
# SYSTEM UPDATES AND BASIC TOOLS
# =============================================================================
echo "📦 Updating system packages..."
sudo apt-get update
sudo apt-get upgrade -y

# Install essential development tools
sudo apt-get install -y \
    curl \
    wget \
    git \
    build-essential \
    software-properties-common \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release \
    unzip \
    vim \
    nano \
    tree \
    jq

# =============================================================================
# NODE.JS AND NPM SETUP
# =============================================================================
echo "🟢 Setting up Node.js environment..."

# Node.js is pre-installed in base environment (v22.x), but let's ensure we have the right version
node --version
npm --version

# Install global packages needed for the project
npm install -g \
    typescript \
    @types/node \
    prettier \
    eslint \
    npm-run-all

# =============================================================================
# PROJECT-SPECIFIC SETUP
# =============================================================================
echo "🏗️ Setting up project environment..."

# Navigate to workspace
cd /mnt/persist/workspace

# Install project dependencies
echo "📥 Installing project dependencies..."
npm ci

# =============================================================================
# CONVEX SETUP
# =============================================================================
echo "🔧 Setting up Convex..."

# Install Convex CLI globally
npm install -g @convex-dev/cli

# Create .env file from template if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Remember to configure your .env file with actual values"
fi

# =============================================================================
# ENVIRONMENT VARIABLES FOR REMOTE AGENT
# =============================================================================
echo "🌍 Setting up environment variables..."

# Add environment variables to profile for persistent sessions
cat >> ~/.bashrc << 'EOF'

# Grow Gymix Remote Agent Environment
export NODE_ENV=development
export VITE_APP_ENV=development
export AUGMENT_REMOTE_AGENT=true
export AUGMENT_DEV_MODE=true
export AUGMENT_LOG_LEVEL=verbose
export VITE_ENABLE_DEBUG=true
export VITE_SHOW_DEV_TOOLS=true

# Project paths
export PROJECT_ROOT=/mnt/persist/workspace
export PATH=$PATH:$PROJECT_ROOT/node_modules/.bin

# Convex environment
export CONVEX_ENV=development

EOF

# Source the environment
source ~/.bashrc

# =============================================================================
# DEVELOPMENT TOOLS SETUP
# =============================================================================
echo "🛠️ Setting up development tools..."

# Create necessary directories
mkdir -p logs tmp .convex

# Set up git configuration for the agent
git config --global user.name "Augment Remote Agent"
git config --global user.email "agent@augmentcode.com"
git config --global init.defaultBranch main
git config --global pull.rebase false

# =============================================================================
# PROJECT BUILD AND VALIDATION
# =============================================================================
echo "✅ Validating project setup..."

# Check if all dependencies are installed
npm list --depth=0 || echo "Some dependencies may need attention"

# Run type checking to ensure everything is set up correctly
npm run lint || echo "Linting completed with warnings"

# =============================================================================
# FINAL SETUP
# =============================================================================
echo "🎯 Final environment configuration..."

# Create a startup script for easy development
cat > ~/start-dev.sh << 'EOF'
#!/bin/bash
cd /mnt/persist/workspace
echo "🚀 Starting Grow Gymix development environment..."
echo "📍 Working directory: $(pwd)"
echo "🟢 Node.js version: $(node --version)"
echo "📦 npm version: $(npm --version)"
echo ""
echo "Available commands:"
echo "  npm run dev              - Start development server"
echo "  npm run dev:frontend     - Start frontend only"
echo "  npm run dev:backend      - Start Convex backend only"
echo "  npm run lint            - Run linting"
echo ""
echo "Environment ready! 🎉"
EOF

chmod +x ~/start-dev.sh

# =============================================================================
# COMPLETION MESSAGE
# =============================================================================
echo ""
echo "✅ Grow Gymix environment setup complete!"
echo ""
echo "🎯 Quick start commands:"
echo "  ~/start-dev.sh           - Show development info"
echo "  npm run dev              - Start development server"
echo "  npx convex dev           - Start Convex backend"
echo ""
echo "📁 Project location: /mnt/persist/workspace"
echo "🔧 Environment: Remote Agent Development"
echo ""
echo "🚀 Ready for Augment Remote Agent! 🤖"
