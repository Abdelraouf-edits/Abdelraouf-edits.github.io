# Video Manager Server Startup Script
Write-Host "Starting Portfolio Video Manager Server..." -ForegroundColor Cyan
Write-Host ""

# Change to the correct directory
Set-Location -Path $PSScriptRoot

# Start the server
node video-manager-server.js
