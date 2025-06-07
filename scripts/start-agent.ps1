# =============================================================================
# GROW GYMIX - REMOTE AGENT STARTUP SCRIPT (PowerShell)
# =============================================================================
# Lightweight script to start the development environment for remote agents

param(
    [switch]$Verbose,
    [switch]$Debug,
    [string]$LogLevel = "info"
)

# Colors for output
$Colors = @{
    Red = "Red"
    Green = "Green"
    Yellow = "Yellow"
    Blue = "Blue"
    Cyan = "Cyan"
    Magenta = "Magenta"
}

function Write-Status {
    param([string]$Message)
    Write-Host "[AGENT] $Message" -ForegroundColor $Colors.Blue
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

Write-Host "🤖 Starting Grow Gymix Remote Agent Environment..." -ForegroundColor $Colors.Cyan

# Set agent-specific environment variables
Write-Status "Setting up agent environment variables..."

$env:AUGMENT_DEV_MODE = "true"
$env:AUGMENT_AGENT_MODE = "true"
$env:NODE_ENV = "development"
$env:VITE_APP_ENV = "development"

if ($Verbose) {
    $env:AUGMENT_LOG_LEVEL = "verbose"
    $env:VITE_LOG_LEVEL = "debug"
} elseif ($Debug) {
    $env:AUGMENT_LOG_LEVEL = "debug"
    $env:VITE_LOG_LEVEL = "debug"
} else {
    $env:AUGMENT_LOG_LEVEL = $LogLevel
    $env:VITE_LOG_LEVEL = $LogLevel
}

$env:VITE_ENABLE_DEBUG = "true"
$env:VITE_SHOW_DEV_TOOLS = "true"
$env:AUGMENT_ENABLE_LIVE_RELOAD = "true"

Write-Success "Agent environment configured"

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Warning ".env file not found. Creating from template..."
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Warning "Please edit .env file with your actual values before continuing"
        Write-Host "Press any key to continue after editing .env..." -ForegroundColor $Colors.Yellow
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    } else {
        Write-Error ".env.example not found. Please create environment configuration first."
        exit 1
    }
}

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Status "Installing dependencies..."
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to install dependencies"
        exit 1
    }
    Write-Success "Dependencies installed"
}

# Display current configuration
Write-Status "Current Agent Configuration:"
Write-Host "  • Dev Mode: $env:AUGMENT_DEV_MODE" -ForegroundColor $Colors.Magenta
Write-Host "  • Log Level: $env:AUGMENT_LOG_LEVEL" -ForegroundColor $Colors.Magenta
Write-Host "  • Environment: $env:NODE_ENV" -ForegroundColor $Colors.Magenta
Write-Host "  • Debug Tools: $env:VITE_SHOW_DEV_TOOLS" -ForegroundColor $Colors.Magenta

Write-Status "Starting development server..."
Write-Host "🚀 Agent environment ready! Starting development server..." -ForegroundColor $Colors.Green

# Start the development server
npm run dev
