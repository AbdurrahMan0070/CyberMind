# ⚡ CyberMind Quick Start Guide

**Get CyberMind running in 5 minutes!**

---

## 🎯 For Users Installing CyberMind

### **Windows Users:**

1. **Extract the ZIP file** to a folder (e.g., `C:\CyberMind`)

2. **Run the installer:**
   - Right-click `install.ps1`
   - Select "Run with PowerShell"
   - Wait for installation to complete

3. **Start the server:**
   - Double-click `start.ps1`
   - Keep the window open

4. **Install extension:**
   - Open Chrome → `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `extension` folder

5. **Done!** Click the extension icon and browse!

---

### **Mac/Linux Users:**

1. **Extract the ZIP file** to a folder

2. **Open Terminal** in that folder

3. **Run the installer:**
   ```bash
   chmod +x install.sh
   ./install.sh
   ```

4. **Start the server:**
   ```bash
   chmod +x start.sh
   ./start.sh
   ```
   Keep the terminal open

5. **Install extension:**
   - Open Chrome → `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `extension` folder

6. **Done!** Click the extension icon and browse!

---

## 🎯 For Developers/Contributors

### **Clone and Setup:**

```bash
# Clone the repository
git clone <repository-url>
cd cybermind2

# Install dependencies
cd server
npm install
cd ..

# Start the server
npm start
```

### **Load Extension:**

1. Open `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select `cybermind2/extension` folder

---

## 🎯 First Time Usage

### **1. Test the Extension:**
- Click the CyberMind icon in Chrome toolbar
- You should see the popup with stats

### **2. Visit a Website:**
- Go to any website (e.g., google.com)
- Extension automatically scans it
- Check the popup for results

### **3. View Dashboard:**
- Click "⬡ View Dashboard" in popup
- Or visit: http://localhost:4000
- Explore the tabs:
  - **Overview** - Stats and charts
  - **Agent Feed** - Real-time activity
  - **Scan History** - All scans
  - **Test a Domain** - Manual testing

---

## 🎯 Common First-Time Issues

### **"Server not running" error:**
```bash
# Make sure you started the server:
cd server
npm start
```

### **Extension not loading:**
- Make sure you selected the `extension` folder, not the parent folder
- Check that `manifest.json` exists in the selected folder

### **Dashboard button doesn't work:**
- Reload the extension in `chrome://extensions/`
- Make sure server is running on port 4000

### **Port 4000 already in use:**
```bash
# Use a different port:
PORT=8080 npm start

# Then update extension files to use port 8080
```

---

## 🎯 What Happens When You Browse?

```
1. You visit a website
   ↓
2. Extension extracts page data
   ↓
3. Sends to server for analysis
   ↓
4. AI agents analyze the page:
   • ThreatOps OSINT (always)
   • ArgusAI (articles only)
   • VaultBreaker (login pages only)
   • Report Agent (always)
   ↓
5. Results shown in:
   • Extension badge (color)
   • Extension popup (stats)
   • Dashboard (full report)
```

---

## 🎯 Keyboard Shortcuts

- **Open Dashboard:** Click extension → "View Dashboard"
- **Refresh Dashboard:** F5 or Ctrl+R
- **Open DevTools:** F12 (for debugging)
- **Reload Extension:** chrome://extensions/ → Reload button

---

## 🎯 Tips for Best Experience

1. **Keep server running** in background
2. **Pin the extension** to toolbar for easy access
3. **Check dashboard** regularly for insights
4. **Test with different sites** to see various threat levels
5. **Add Gemini API key** for real AI analysis (optional)

---

## 🎯 Next Steps

- Read [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md) for detailed info
- Read [README.md](README.md) for features and tech details
- Check dashboard tabs to explore all features
- Test with different types of websites

---

## 🎯 Need Help?

- Check [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md) troubleshooting section
- Open browser console (F12) to see errors
- Check server terminal for error messages
- Make sure Node.js version is 16 or higher: `node --version`

---

**Enjoy your autonomous cyber intelligence platform!** 🛡️
