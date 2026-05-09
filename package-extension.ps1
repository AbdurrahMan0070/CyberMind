# PowerShell script to package CyberMind extension for distribution
# Run this to create the .crx and .zip files for GitHub release

Write-Host "📦 Packaging CyberMind Extension..." -ForegroundColor Cyan
Write-Host ""

# Check if extension folder exists
if (-not (Test-Path "extension")) {
    Write-Host "❌ Error: extension folder not found!" -ForegroundColor Red
    Write-Host "Make sure you're running this from the cybermind2 directory" -ForegroundColor Yellow
    exit 1
}

# Create ZIP file
Write-Host "Creating cybermind-extension.zip..." -ForegroundColor Yellow
if (Test-Path "cybermind-extension.zip") {
    Remove-Item "cybermind-extension.zip" -Force
}
Compress-Archive -Path "extension\*" -DestinationPath "cybermind-extension.zip" -Force
Write-Host "✅ Created cybermind-extension.zip" -ForegroundColor Green
Write-Host ""

# Instructions for .crx file
Write-Host "📋 To create the .crx file:" -ForegroundColor Cyan
Write-Host "1. Open Chrome and go to: chrome://extensions/" -ForegroundColor White
Write-Host "2. Enable 'Developer mode' (top-right toggle)" -ForegroundColor White
Write-Host "3. Click 'Pack extension'" -ForegroundColor White
Write-Host "4. Browse and select the 'extension' folder" -ForegroundColor White
Write-Host "5. Leave 'Private key file' empty (first time)" -ForegroundColor White
Write-Host "6. Click 'Pack Extension'" -ForegroundColor White
Write-Host "7. Rename the generated .crx file to 'cybermind.crx'" -ForegroundColor White
Write-Host ""

Write-Host "📤 Upload to GitHub Release:" -ForegroundColor Cyan
Write-Host "1. Go to your GitHub repo → Releases → Create new release" -ForegroundColor White
Write-Host "2. Upload both files:" -ForegroundColor White
Write-Host "   - cybermind.crx (packaged extension)" -ForegroundColor Yellow
Write-Host "   - cybermind-extension.zip (backup method)" -ForegroundColor Yellow
Write-Host ""

Write-Host "✨ Done! Your extension is ready for distribution!" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  Remember: Keep the .pem file safe (don't upload to GitHub)!" -ForegroundColor Yellow
