@echo off
REM Quick launcher for Video Manager Python app
REM Falls back to PowerShell version if Python is not available

where python >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    python "%~dp0video_manager.py"
) else (
    echo Python not found, using PowerShell version...
    powershell -ExecutionPolicy Bypass -File "%~dp0VideoManagerApp.ps1"
)
