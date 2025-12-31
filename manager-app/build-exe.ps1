# Build Video Manager EXE
# This script builds a standalone Windows executable using PyInstaller

# Prerequisites:
# 1. Python 3.10+ installed
# 2. pip install pyinstaller

Write-Host "=== Video Manager EXE Builder ===" -ForegroundColor Cyan
Write-Host ""

# Check Python
$pythonVersion = python --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Python is not installed or not in PATH" -ForegroundColor Red
    exit 1
}
Write-Host "Found: $pythonVersion" -ForegroundColor Green

# Check pip and install pyinstaller if needed
Write-Host "Checking PyInstaller..." -ForegroundColor Yellow
$pyinstallerCheck = pip show pyinstaller 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Installing PyInstaller..." -ForegroundColor Yellow
    pip install pyinstaller
}
Write-Host "PyInstaller ready!" -ForegroundColor Green

# Set paths
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$iconPath = Join-Path (Split-Path -Parent $scriptDir) "pr\public\icons\favicon.ico"
$mainScript = Join-Path $scriptDir "video_manager.py"
$outputName = "VideoManager"

# Check if icon exists
$iconArg = ""
if (Test-Path $iconPath) {
    $iconArg = "--icon=`"$iconPath`""
    Write-Host "Using icon: $iconPath" -ForegroundColor Green
} else {
    Write-Host "No icon found, building without icon" -ForegroundColor Yellow
}

# Build command
Write-Host ""
Write-Host "Building executable..." -ForegroundColor Cyan

$buildArgs = @(
    "-m", "PyInstaller",
    "--onefile",
    "--windowed",
    "--name", $outputName,
    "--clean",
    "--noconfirm"
)

if ($iconArg) {
    $buildArgs += "--icon=$iconPath"
}

$buildArgs += $mainScript

# Run PyInstaller
Push-Location $scriptDir
python @buildArgs

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=== BUILD SUCCESSFUL ===" -ForegroundColor Green
    Write-Host ""
    Write-Host "Executable created at:" -ForegroundColor Cyan
    Write-Host "  $scriptDir\dist\$outputName.exe" -ForegroundColor White
    Write-Host ""
    
    # Copy to manager-app folder for convenience
    $destPath = Join-Path $scriptDir "$outputName.exe"
    Copy-Item "dist\$outputName.exe" $destPath -Force
    Write-Host "Also copied to: $destPath" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "=== BUILD FAILED ===" -ForegroundColor Red
}

Pop-Location
