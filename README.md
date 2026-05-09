# 🛡️ CyberMind - Autonomous Cyber Intelligence

> **AI-powered Chrome extension that automatically scans every website you visit for threats and security risks.**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Chrome](https://img.shields.io/badge/chrome-extension-orange)

---

## ✨ What It Does

CyberMind is a **zero-click security extension** that:
- 🕵️ **Automatically scans** every website you visit
- ⚡ **Instant threat detection** - results in seconds
- 🎯 **Smart analysis** - identifies malicious domains
- 🔔 **Real-time alerts** - notifies you of high-risk sites
- 📊 **Scan history** - tracks all analyzed domains

**No setup required. No server needed. Just install and browse!**

---

## 🚀 Quick Install (30 Seconds!)

### **For Judges & Reviewers** ⚡

**[📥 Download Extension Here](https://github.com/AbdurrahMan0070/cybermind2/releases/latest)**

1. Click the link above
2. Download **`cybermind-extension.zip`**
3. **Extract the ZIP file** to a folder
4. Open Chrome → `chrome://extensions/`
5. Enable **"Developer mode"** (top-right toggle)
6. Click **"Load unpacked"**
7. Select the **`extension`** folder (from extracted files)
8. **Done!** 🎉

**Total time: 30 seconds** ⏱️

---

### **After Installing:**
- 🛡️ **CyberMind icon** appears in your Chrome toolbar
- Visit any website → **automatic scan starts**
- Click the icon to see **detailed results**
- Badge color shows threat level:
  - 🟢 **Green** = Safe / Trusted
  - 🟡 **Yellow** = Warning / Caution
  - 🔴 **Red** = Threat / Danger

**That's it! You're protected!** 🛡️

---

## 🎯 How It Works

```
You visit a website
        ↓
CyberMind automatically scans it
        ↓
Analyzes domain reputation
        ↓
Shows results instantly
        ↓
Badge changes color based on threat level
```

**Zero clicks. Automatic protection. Always on.**

---

## 🎨 Features

### **Automatic Scanning**
- Scans every page you visit
- No manual action needed
- Works in the background

### **Threat Detection**
- Identifies malicious domains
- Checks against trusted domain list
- Assigns threat scores (0-100)

### **Visual Indicators**
- Color-coded badge (green/yellow/red)
- Extension popup with details
- Desktop notifications for high threats

### **Scan History**
- Tracks all scanned domains
- Shows threat levels
- Stores up to 100 recent scans

### **Privacy First**
- All processing happens locally
- No data sent to external servers
- No tracking or analytics
- Your browsing stays private

---

## 📊 Threat Levels

| Badge | Level | Description |
|-------|-------|-------------|
| 🟢 ✓ | Clean | Trusted domain, no threats |
| 🟢 ✓ | Low | Minor concerns, generally safe |
| 🟡 ! | Medium | Warnings present, use caution |
| 🔴 ✗ | High | Significant threats detected |
| 🔴 ✗ | Critical | Immediate danger, avoid site |

---

## 🔒 Privacy & Security

- ✅ **100% Local** - All analysis happens on your device
- ✅ **No Data Collection** - We don't track your browsing
- ✅ **No External Servers** - No backend required
- ✅ **Open Source** - Inspect the code yourself
- ✅ **Minimal Permissions** - Only what's necessary

---

## 🎓 Use Cases

- **Personal Browsing** - Stay safe while surfing the web
- **Research** - Analyze suspicious domains safely
- **Education** - Learn about web security
- **Security Testing** - Quick domain reputation checks

---

## 🛠️ Technical Details

### **Built With:**
- Vanilla JavaScript (lightweight!)
- Chrome Extension API (Manifest V3)
- Local storage for scan history
- No external dependencies

### **How It Analyzes:**
- Checks against trusted domain database
- Analyzes domain patterns
- Assigns risk scores
- Caches results for performance

### **Performance:**
- Scan time: < 1 second
- Memory usage: ~10MB
- CPU usage: Minimal
- No network requests

---

## 📁 Project Structure

```
cybermind/
├── extension/
│   ├── manifest.json      # Extension configuration
│   ├── popup.html         # Extension popup UI
│   ├── popup.js           # Popup logic
│   ├── background.js      # Background worker (analysis engine)
│   ├── content.js         # Content script (page data extraction)
│   └── icons/             # Extension icons
├── README.md              # This file
└── LICENSE                # MIT License
```

---

## 🎬 Demo

### **Try It:**
1. Install the extension
2. Visit `google.com` → See green badge (trusted)
3. Visit any website → Automatic scan
4. Click extension icon → See detailed results

---

## 🤝 Contributing

Contributions welcome! Ideas for improvement:
- Expand trusted domain list
- Add more threat detection rules
- Improve UI/UX
- Add export functionality
- Browser compatibility (Firefox, Edge)

---

## 📝 License

MIT License - See [LICENSE](LICENSE) file

---

## 🙏 Acknowledgments

Built for hackathon with ❤️

---

## 📞 Support

Having issues?
1. Make sure you're using Chrome/Edge
2. Check that Developer mode is enabled
3. Try reloading the extension
4. Open an issue on GitHub

---

## 🗺️ Roadmap

- [ ] Firefox support
- [ ] Safari support
- [ ] Export scan history
- [ ] Custom domain lists
- [ ] Advanced threat analysis
- [ ] Team sharing features

---

**Stay safe online with CyberMind!** 🛡️

---

## ⭐ Like this project?

Give it a star on GitHub! It helps others discover it.

---

**Made By Team Vortex 2026**
