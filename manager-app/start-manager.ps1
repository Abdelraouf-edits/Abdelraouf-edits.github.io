# Video Manager Launcher
# Simple launcher that starts the server and opens the browser

param(
    [switch]$NoBrowser
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "Video Manager Launcher" -ForegroundColor Cyan
Write-Host "======================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
$nodeCheck = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeCheck) {
    Write-Host "Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

$nodeVersion = node --version
Write-Host "Node.js $nodeVersion found" -ForegroundColor Green

# Get the script directory and navigate to pr folder
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$prFolder = Join-Path (Split-Path -Parent $scriptDir) "pr"

if (-not (Test-Path $prFolder)) {
    Write-Host "Error: 'pr' folder not found at: $prFolder" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

$serverFile = Join-Path $prFolder "video-manager-server.js"
if (-not (Test-Path $serverFile)) {
    Write-Host "Error: Server file not found at: $serverFile" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Found server at: $prFolder" -ForegroundColor Green
Write-Host ""
Write-Host "Starting Video Manager Server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Server will be available at: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Start the server
Set-Location $prFolder

# Open browser after a delay if not disabled
if (-not $NoBrowser) {
    Start-Job -ScriptBlock {
        Start-Sleep -Seconds 3
        Start-Process "http://localhost:3000"
    } | Out-Null
}

# Run the server (this blocks until Ctrl+C)
node $serverFile
