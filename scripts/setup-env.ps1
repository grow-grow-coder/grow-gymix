# =============================================================================
# GROW GYMIX - ENVIRONMENT SETUP SCRIPT (PowerShell)
# =============================================================================
# PowerShell script to set up environment for development and remote agents

param(
    [switch]$Force,
    [switch]$SkipDependencies
)

# Colors for output
$Colors = @{
    Red = "Red"
    Green = "Green"
    Yellow = "Yellow"
    Blue = "Blue"
    Cyan = "Cyan"
}

function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor $Colors.Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor $Colors.Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor $Colors.Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor $Colors.Red
}

Write-Host "🚀 Setting up Grow Gymix environment..." -ForegroundColor $Colors.Cyan

# Check if .env file exists
if (-not (Test-Path ".env") -or $Force) {
    Write-Status "Creating .env file from template..."
    Copy-Item ".env.example" ".env"
    Write-Warning "Please edit .env file with your actual values"
} else {
    Write-Success ".env file already exists"
}

# Check if .env.local exists
if (-not (Test-Path ".env.local") -or $Force) {
    Write-Status "Creating .env.local file..."
    @"
# Local environment overrides
# This file is ignored by git and can contain sensitive data

# Add your local overrides here
# Example:
# CONVEX_DEPLOYMENT=your-deployment-name
# VITE_CONVEX_URL=https://your-convex-url
"@ | Out-File -FilePath ".env.local" -Encoding UTF8
    Write-Success "Created .env.local file"
} else {
    Write-Success ".env.local file already exists"
}

# Install dependencies if node_modules doesn't exist
if ((-not (Test-Path "node_modules")) -and (-not $SkipDependencies)) {
    Write-Status "Installing dependencies..."
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Dependencies installed"
    } else {
        Write-Error "Failed to install dependencies"
        exit 1
    }
} else {
    Write-Success "Dependencies already installed or skipped"
}

# Set up Convex if not already set up
if (-not (Test-Path ".convex")) {
    Write-Status "Setting up Convex..."
    Write-Warning "You'll need to run 'npx convex dev' to complete Convex setup"
} else {
    Write-Success "Convex already set up"
}

# Create directories
$directories = @("logs", "tmp")
foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir | Out-Null
        Write-Success "Created $dir directory"
    } else {
        Write-Success "$dir directory already exists"
    }
}

# Set up git hooks (if .git exists)
if (Test-Path ".git") {
    Write-Status "Setting up git hooks..."
    
    $hooksDir = ".git/hooks"
    if (-not (Test-Path $hooksDir)) {
        New-Item -ItemType Directory -Path $hooksDir | Out-Null
    }
    
    # Pre-commit hook
    @"
#!/bin/bash
# Run linting before commit
npm run lint
"@ | Out-File -FilePath "$hooksDir/pre-commit" -Encoding UTF8
    
    Write-Success "Git hooks set up"
}

# Check for required tools
Write-Status "Checking required tools..."

# Check Node.js version
try {
    $nodeVersion = node --version
    Write-Success "Node.js: $nodeVersion"
} catch {
    Write-Error "Node.js is not installed"
    exit 1
}

# Check npm version
try {
    $npmVersion = npm --version
    Write-Success "npm: $npmVersion"
} catch {
    Write-Error "npm is not installed"
    exit 1
}

# Check git version
try {
    $gitVersion = git --version
    Write-Success "Git: $gitVersion"
} catch {
    Write-Warning "Git is not installed (recommended for version control)"
}

# Check Docker (optional)
try {
    $dockerVersion = docker --version
    Write-Success "Docker: $dockerVersion"
} catch {
    Write-Warning "Docker is not installed (optional for containerized development)"
}

Write-Host ""
Write-Success "Environment setup complete! 🎉"
Write-Host ""
Write-Status "Next steps:"
Write-Host "1. Edit .env file with your actual values"
Write-Host "2. Run 'npm run dev' to start development server"
Write-Host "3. Run 'npx convex dev' to start Convex backend"
Write-Host ""
Write-Status "For remote agents:"
Write-Host "1. Make sure your GitHub token is set in .env"
Write-Host "2. Configure AUGMENT_* variables in .env"
Write-Host "3. Use Docker Compose: 'docker-compose up'"
