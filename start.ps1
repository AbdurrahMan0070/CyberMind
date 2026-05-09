# CyberMind - Windows Startup Script
# Usage: .\start.ps1 -ApiKey "your_gemini_key_here"

param(
    [string]$ApiKey = ""
)

if ($ApiKey -eq "") {
    Write-Host ""
    Write-Host "  WARNING: No API key - running in demo mode (mock data)" -ForegroundColor Yellow
    Write-Host "  Usage: .\start.ps1 -ApiKey 'your_gemini_key_here'" -ForegroundColor Yellow
    Write-Host ""
} else {
    $env:GEMINI_API_KEY = $ApiKey
}

Write-Host ""
Write-Host "  CyberMind - Autonomous Cyber Intelligence Platform" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Dashboard -> http://localhost:4000" -ForegroundColor Green
Write-Host ""
Write-Host "  Extension setup:" -ForegroundColor White
Write-Host "  1. Open chrome://extensions/" -ForegroundColor Gray
Write-Host "  2. Enable Developer mode" -ForegroundColor Gray
Write-Host "  3. Load unpacked -> select the 'extension' folder" -ForegroundColor Gray
Write-Host ""

Set-Location "$PSScriptRoot\server"
node server.js
