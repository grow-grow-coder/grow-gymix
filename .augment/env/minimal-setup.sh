#!/bin/bash
# =============================================================================
# GROW GYMIX - MINIMAL AUGMENT REMOTE AGENT SETUP
# =============================================================================
# Lightweight setup script for quick Remote Agent deployment

set -e

echo "⚡ Quick setup for Grow Gymix Remote Agent..."

# =============================================================================
# ESSENTIAL SETUP ONLY
# =============================================================================

# Navigate to workspace
cd /mnt/persist/workspace

# Install project dependencies (Node.js and npm are pre-installed)
echo "📥 Installing dependencies..."
npm ci

# Install Convex CLI
npm install -g @convex-dev/cli

# Create .env from template
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "📝 Created .env file from template"
fi

# Set essential environment variables
export NODE_ENV=development
export AUGMENT_REMOTE_AGENT=true
export VITE_APP_ENV=development

# Add to bashrc for persistence
echo 'export NODE_ENV=development' >> ~/.bashrc
echo 'export AUGMENT_REMOTE_AGENT=true' >> ~/.bashrc
echo 'export VITE_APP_ENV=development' >> ~/.bashrc

# Basic git config
git config --global user.name "Augment Agent"
git config --global user.email "agent@augmentcode.com"

echo "✅ Minimal setup complete! Ready to start development."
echo "🚀 Run: npm run dev"
