# 🚀 CyberMind Setup Guide

## 📋 Prerequisites

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **Chrome Browser** (v88 or higher)

---

## ⚡ Quick Setup (5 Minutes)

### **Step 1: Install Dependencies**

Open terminal in the `server` folder and run:

```bash
cd server
npm install
```

This installs Express and CORS packages.

---

### **Step 2: Start the Server**

```bash
npm start
```

You should see:
```
🛡️  CyberMind Server running on http://localhost:4000
📊 Dashboard: http://localhost:4000
🔌 API: http://localhost:4000/api
```

**Keep this terminal open!** The server needs to run while using the extension.

---

### **Step 3: Install Chrome Extension**

1. Open Chrome → `chrome://extensions/`
2. Enable **"Developer mode"** (top-right toggle)
3. Click **"Load unpacked"**
4. Select the **`extension`** folder
5. Done! ✅

---

### **Step 4: Test It**

1. Visit any website (e.g., google.com)
2. Watch the CyberMind badge change color
3. Click the extension icon
4. Click **"📊 VIEW DASHBOARD"** button
5. See all scans in the beautiful dashboard!

---

## 🎯 Usage

### **For Regular Use:**

1. **Start server** (once):
   ```bash
   cd server
   npm start
   ```

2. **Browse normally** - Extension scans automatically

3. **View dashboard** - Click button in extension popup

### **To Stop:**
- Press `Ctrl+C` in the terminal to stop the server
- Extension will still work (uses local analysis as fallback)

---

## 🔧 Troubleshooting

### **"Cannot connect to server" error**

**Problem:** Server is not running

**Solution:**
```bash
cd server
npm start
```

---

### **"npm: command not found"**

**Problem:** Node.js is not installed

**Solution:** Install Node.js from https://nodejs.org/

---

### **Dashboard shows "Connection Error"**

**Problem:** Server is not running on port 4000

**Solution:**
1. Check if server is running
2. Make sure nothing else is using port 4000
3. Restart the server

---

### **Extension works but dashboard is empty**

**Problem:** No scans yet

**Solution:** Visit some websites first, then refresh dashboard

---

## 📊 Dashboard Features

- **Real-time stats** - Total scans, clean sites, warnings, threats
- **Recent scans list** - See all analyzed domains
- **Auto-refresh** - Updates every 5 seconds
- **Beautiful UI** - Modern, clean design
- **Threat scores** - See risk levels for each domain

---

## 🌍 Multilingual Support

The extension automatically uses your browser's language!

**Supported languages:**
- English, Spanish, French, German, Hindi, Chinese, Japanese

---

## 💡 Tips

- **Keep server running** for best experience
- **Dashboard auto-refreshes** - no need to manually reload
- **Extension works offline** - uses local analysis if server is down
- **Scans are cached** - same domain won't be scanned twice within 1 hour

---

## 🎓 For Development

### **Auto-restart server on changes:**
```bash
npm run dev
```

This uses nodemon to restart automatically when you edit server.js

---

## 📝 Summary

**Quick Start:**
```bash
# 1. Install dependencies
cd server
npm install

# 2. Start server
npm start

# 3. Load extension in Chrome
# 4. Browse and enjoy!
```

**That's it!** 🎉

---

**Need help?** Open an issue on GitHub!
