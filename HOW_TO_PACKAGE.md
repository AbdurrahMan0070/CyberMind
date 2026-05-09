# 📦 How to Package CyberMind for Distribution

## For Developer: Creating the .crx File

### **Method 1: Using Chrome (Easiest)**

1. Open Chrome and go to `chrome://extensions/`
2. Enable **"Developer mode"** (top-right)
3. Click **"Pack extension"**
4. Click **"Browse"** and select the `extension` folder
5. Leave "Private key file" empty (first time)
6. Click **"Pack Extension"**
7. Chrome creates two files:
   - `extension.crx` (the packaged extension)
   - `extension.pem` (private key - keep this safe!)
8. Rename `extension.crx` to `cybermind.crx`

### **Method 2: Using Command Line**

```bash
# Navigate to project root
cd cybermind2

# Pack extension (Chrome must be installed)
# Windows:
"C:\Program Files\Google\Chrome\Application\chrome.exe" --pack-extension=extension

# Mac:
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --pack-extension=extension

# Linux:
google-chrome --pack-extension=extension
```

---

## 📤 Upload to GitHub Releases

1. Go to your GitHub repository
2. Click **"Releases"** → **"Create a new release"**
3. Tag version: `v1.0.0`
4. Release title: `CyberMind v1.0.0 - Initial Release`
5. Upload these files:
   - `cybermind.crx` (packaged extension)
   - `cybermind-extension.zip` (ZIP of extension folder as backup)
6. Write release notes
7. Click **"Publish release"**

---

## 📝 Create the ZIP File

```bash
# Navigate to project root
cd cybermind2

# Create ZIP of extension folder
# Windows PowerShell:
Compress-Archive -Path extension -DestinationPath cybermind-extension.zip

# Mac/Linux:
zip -r cybermind-extension.zip extension/
```

---

## ✅ What to Upload to GitHub Release

Your release should have:
1. **`cybermind.crx`** - Packaged extension (drag-and-drop install)
2. **`cybermind-extension.zip`** - Backup method (load unpacked)

---

## 🎯 Update README with Release Link

After creating the release, update your README.md with the actual release link:

```markdown
## 🚀 Quick Install

**[Download CyberMind Extension](https://github.com/YOUR_USERNAME/cybermind2/releases/latest)**

1. Download `cybermind.crx`
2. Drag into Chrome
3. Click "Add Extension"
4. Done! 🎉
```

---

## 🔒 Important Notes

- **Keep the `.pem` file safe!** You need it to update the extension later
- Don't commit the `.pem` file to GitHub (it's in .gitignore)
- The `.crx` file is signed with your private key
- Users can verify the extension hasn't been tampered with

---

## 🆘 Troubleshooting

**"Pack extension" button disabled?**
- Make sure Developer mode is enabled
- Make sure you're selecting the `extension` folder, not the root

**Chrome blocks .crx file?**
- This is normal for security
- Users can use the ZIP method instead
- Or publish to Chrome Web Store (costs $5, takes 1-3 days)

---

**Ready for hackathon!** 🏆
