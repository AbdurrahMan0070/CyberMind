#!/bin/bash
# Bash script to package CyberMind extension for distribution
# Run this to create the .zip file for GitHub release

echo "📦 Packaging CyberMind Extension..."
echo ""

# Check if extension folder exists
if [ ! -d "extension" ]; then
    echo "❌ Error: extension folder not found!"
    echo "Make sure you're running this from the cybermind2 directory"
    exit 1
fi

# Create ZIP file
echo "Creating cybermind-extension.zip..."
rm -f cybermind-extension.zip
zip -r cybermind-extension.zip extension/
echo "✅ Created cybermind-extension.zip"
echo ""

# Instructions for .crx file
echo "📋 To create the .crx file:"
echo "1. Open Chrome and go to: chrome://extensions/"
echo "2. Enable 'Developer mode' (top-right toggle)"
echo "3. Click 'Pack extension'"
echo "4. Browse and select the 'extension' folder"
echo "5. Leave 'Private key file' empty (first time)"
echo "6. Click 'Pack Extension'"
echo "7. Rename the generated .crx file to 'cybermind.crx'"
echo ""

echo "📤 Upload to GitHub Release:"
echo "1. Go to your GitHub repo → Releases → Create new release"
echo "2. Upload both files:"
echo "   - cybermind.crx (packaged extension)"
echo "   - cybermind-extension.zip (backup method)"
echo ""

echo "✨ Done! Your extension is ready for distribution!"
echo ""
echo "⚠️  Remember: Keep the .pem file safe (don't upload to GitHub)!"
