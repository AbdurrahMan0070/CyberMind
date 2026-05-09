# CyberMind Installation Script for Windows
# Run this script to automatically install CyberMind

Write-Host "╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                               ║" -ForegroundColor Cyan
Write-Host "║   🛡️  CyberMind - Autonomous Cyber Intelligence Platform     ║" -ForegroundColor Cyan
Write-Host "║                    Installation Script                        ║" -ForegroundColor Cyan
Write-Host "║                                                               ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "🔍 Checking prerequisites..." -ForegroundColor Yellow
Write-Host ""

try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "After installation, run this script again." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

try {
    $npmVersion = npm --version
    Write-Host "✅ npm found: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Install server dependencies
Write-Host "📦 Installing server dependencies..." -ForegroundColor Yellow
Write-Host "   This may take 1-2 minutes..." -ForegroundColor Gray
Write-Host ""

Set-Location -Path "server"

try {
    npm install
    Write-Host ""
    Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
} catch {
    Write-Host ""
    Write-Host "❌ Failed to install dependencies!" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    Set-Location -Path ".."
    Read-Host "Press Enter to exit"
    exit 1
}

Set-Location -Path ".."

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Installation complete
Write-Host "✅ Installation Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1️⃣  Start the server:" -ForegroundColor White
Write-Host "   Run: .\start.ps1" -ForegroundColor Cyan
Write-Host "   Or:  cd server && npm start" -ForegroundColor Gray
Write-Host ""
Write-Host "2️⃣  Install Chrome Extension:" -ForegroundColor White
Write-Host "   • Open Chrome and go to: chrome://extensions/" -ForegroundColor Gray
Write-Host "   • Enable 'Developer mode' (top-right toggle)" -ForegroundColor Gray
Write-Host "   • Click 'Load unpacked'" -ForegroundColor Gray
Write-Host "   • Select the 'extension' folder" -ForegroundColor Gray
Write-Host ""
Write-Host "3️⃣  Start using CyberMind:" -ForegroundColor White
Write-Host "   • Browse any website - automatic scanning!" -ForegroundColor Gray
Write-Host "   • Click extension icon for stats" -ForegroundColor Gray
Write-Host "   • Click 'View Dashboard' for full reports" -ForegroundColor Gray
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "📖 For detailed instructions, see: INSTALLATION_GUIDE.md" -ForegroundColor Yellow
Write-Host ""
Write-Host "🚀 Ready to start? Run: .\start.ps1" -ForegroundColor Green
Write-Host ""

Read-Host "Press Enter to exit"
