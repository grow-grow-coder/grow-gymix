#!/bin/bash

# =============================================================================
# GROW GYMIX - REMOTE AGENT STARTUP SCRIPT
# =============================================================================
# Lightweight script to start the development environment for remote agents

set -e

# Parse command line arguments
VERBOSE=false
DEBUG=false
LOG_LEVEL="info"

while [[ $# -gt 0 ]]; do
    case $1 in
        -v|--verbose)
            VERBOSE=true
            shift
            ;;
        -d|--debug)
            DEBUG=true
            shift
            ;;
        -l|--log-level)
            LOG_LEVEL="$2"
            shift 2
            ;;
        *)
            echo "Unknown option $1"
            exit 1
            ;;
    esac
done

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[AGENT]${NC} $1"
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

echo -e "${CYAN}🤖 Starting Grow Gymix Remote Agent Environment...${NC}"

# Set agent-specific environment variables
print_status "Setting up agent environment variables..."

export AUGMENT_DEV_MODE=true
export AUGMENT_AGENT_MODE=true
export NODE_ENV=development
export VITE_APP_ENV=development

if [ "$VERBOSE" = true ]; then
    export AUGMENT_LOG_LEVEL=verbose
    export VITE_LOG_LEVEL=debug
elif [ "$DEBUG" = true ]; then
    export AUGMENT_LOG_LEVEL=debug
    export VITE_LOG_LEVEL=debug
else
    export AUGMENT_LOG_LEVEL=$LOG_LEVEL
    export VITE_LOG_LEVEL=$LOG_LEVEL
fi

export VITE_ENABLE_DEBUG=true
export VITE_SHOW_DEV_TOOLS=true
export AUGMENT_ENABLE_LIVE_RELOAD=true

print_success "Agent environment configured"

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_warning ".env file not found. Creating from template..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        print_warning "Please edit .env file with your actual values before continuing"
        echo -e "${YELLOW}Press any key to continue after editing .env...${NC}"
        read -n 1 -s
    else
        print_error ".env.example not found. Please create environment configuration first."
        exit 1
    fi
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        print_error "Failed to install dependencies"
        exit 1
    fi
    print_success "Dependencies installed"
fi

# Display current configuration
print_status "Current Agent Configuration:"
echo -e "  ${MAGENTA}• Dev Mode: $AUGMENT_DEV_MODE${NC}"
echo -e "  ${MAGENTA}• Log Level: $AUGMENT_LOG_LEVEL${NC}"
echo -e "  ${MAGENTA}• Environment: $NODE_ENV${NC}"
echo -e "  ${MAGENTA}• Debug Tools: $VITE_SHOW_DEV_TOOLS${NC}"

print_status "Starting development server..."
echo -e "${GREEN}🚀 Agent environment ready! Starting development server...${NC}"

# Start the development server
npm run dev
