# 🚀 CyberMind Installation Guide

## 📋 Prerequisites

Before installing CyberMind, make sure you have:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Google Chrome** or **Microsoft Edge** browser
- **Git** (optional, for cloning) - [Download here](https://git-scm.com/)

---

## 🔧 Installation Steps

### **Step 1: Download CyberMind**

#### Option A: Download ZIP
1. Download the CyberMind package
2. Extract the ZIP file to a folder (e.g., `C:\CyberMind` or `~/CyberMind`)

#### Option B: Clone from Git (if available)
```bash
git clone <repository-url>
cd cybermind2
```

---

### **Step 2: Install Server Dependencies**

Open a terminal/command prompt in the CyberMind folder:

#### Windows (PowerShell or CMD):
```powershell
cd cybermind2\server
npm install
```

#### Mac/Linux:
```bash
cd cybermind2/server
npm install
```

**Wait for installation to complete** (may take 1-2 minutes)

---

### **Step 3: Start the Server**

#### Windows:
```powershell
# Option 1: Using the start script
cd cybermind2
.\start.ps1

# Option 2: Manual start
cd server
npm start
```

#### Mac/Linux:
```bash
# Option 1: Using the start script
cd cybermind2
./start.sh

# Option 2: Manual start
cd server
npm start
```

**You should see:**
```
⬡ CyberMind running → http://localhost:4000
⬡ WebSocket ready
⬡ Gemini API: ✗ no key (demo mode)
```

**Keep this terminal window open!** The server must run in the background.

---

### **Step 4: Install Chrome Extension**

1. **Open Chrome** and go to: `chrome://extensions/`

2. **Enable Developer Mode**
   - Toggle the switch in the top-right corner

3. **Load the Extension**
   - Click **"Load unpacked"**
   - Navigate to: `cybermind2/extension` folder
   - Click **"Select Folder"**

4. **Verify Installation**
   - You should see "CyberMind" in your extensions list
   - Pin the extension to your toolbar (click the puzzle icon, then pin)

---

### **Step 5: Test the Installation**

1. **Click the CyberMind extension icon** in Chrome
2. You should see the popup with stats
3. **Click "⬡ View Dashboard"** button
4. Dashboard should open at http://localhost:4000

**✅ Installation Complete!**

---

## 🎯 Usage

### **Automatic Scanning:**
- Browse any website
- CyberMind automatically scans it in the background
- Check the extension popup for results

### **View Dashboard:**
- Click extension icon → "View Dashboard"
- Or visit: http://localhost:4000

### **Dashboard Tabs:**
- **Overview** - Statistics and charts
- **Agent Feed** - Real-time AI agent activity
- **Scan History** - All scanned domains
- **Test a Domain** - Manually test any URL

---

## 🔑 Optional: Add Gemini API Key (For Real AI Analysis)

By default, CyberMind runs in **demo mode** with mock data.

To enable **real AI analysis**:

1. Get a Gemini API key from: https://makersuite.google.com/app/apikey

2. Set the environment variable:

   **Windows (PowerShell):**
   ```powershell
   $env:GEMINI_API_KEY="your-api-key-here"
   cd cybermind2\server
   npm start
   ```

   **Mac/Linux:**
   ```bash
   export GEMINI_API_KEY="your-api-key-here"
   cd cybermind2/server
   npm start
   ```

3. Restart the server

---

## 🛠️ Troubleshooting

### **Server won't start:**
- Make sure Node.js is installed: `node --version`
- Delete `node_modules` folder and run `npm install` again
- Check if port 4000 is already in use

### **Extension not loading:**
- Make sure you selected the `extension` folder, not the parent folder
- Check that `manifest.json` exists in the selected folder
- Try removing and re-adding the extension

### **Dashboard button doesn't work:**
- Make sure the server is running (check terminal)
- Reload the extension in `chrome://extensions/`
- Try opening http://localhost:4000 manually

### **"Can't reach this page" error:**
- Server is not running - start it with `npm start`
- Check the terminal for error messages

---

## 🔄 Starting CyberMind After Installation

Every time you want to use CyberMind:

1. **Start the server:**
   - Windows: Run `start.ps1` or `cd server && npm start`
   - Mac/Linux: Run `./start.sh` or `cd server && npm start`

2. **Use the extension:**
   - Extension is always loaded in Chrome
   - Just browse normally - it works automatically!

---

## 🗑️ Uninstallation

### **Remove Extension:**
1. Go to `chrome://extensions/`
2. Find CyberMind
3. Click "Remove"

### **Remove Server:**
1. Stop the server (Ctrl+C in terminal)
2. Delete the `cybermind2` folder

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Make sure all prerequisites are installed
3. Verify the server is running
4. Check browser console for errors (F12 → Console)

---

**Enjoy your autonomous cyber intelligence platform!** 🛡️
