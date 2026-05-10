# 🤝 Contributing to CyberMind

Thank you for your interest in contributing to CyberMind! We welcome contributions from developers worldwide.

---

## 🌟 Ways to Contribute

### **1. Add More Languages** 🌍
Help make CyberMind accessible to more people!

**Currently Supported:**
- English, Spanish, French, German, Hindi, Chinese, Japanese

**How to Add a Language:**
1. Create folder: `extension/_locales/[language_code]/`
2. Copy `extension/_locales/en/messages.json`
3. Translate all messages
4. Test the extension
5. Submit a pull request

**Wanted Languages:**
- Portuguese (pt_BR)
- Arabic (ar)
- Russian (ru)
- Korean (ko)
- Italian (it)
- Dutch (nl)
- Turkish (tr)

---

### **2. Expand Trusted Domains Database** 🎯
Add more trusted domains to improve accuracy!

**File:** `extension/background.js`
**Array:** `TRUSTED_DOMAINS`

**Criteria for Trusted Domains:**
- Well-established (5+ years)
- Global recognition
- Strong security reputation
- High Alexa/traffic ranking

---

### **3. Improve Threat Detection** 🔍
Enhance the analysis algorithm!

**Ideas:**
- Add more threat indicators
- Improve domain pattern analysis
- Add URL parameter analysis
- Implement reputation scoring

---

### **4. UI/UX Improvements** 🎨
Make the extension more beautiful and user-friendly!

**Ideas:**
- Dark/light theme toggle
- Customizable color schemes
- Animation improvements
- Accessibility enhancements

---

### **5. Documentation** 📖
Help improve our docs!

**Needs:**
- More language translations for README
- Video tutorials
- Screenshots
- Use case examples

---

### **6. Testing** 🧪
Help us test on different platforms!

**Test On:**
- Different Chrome versions
- Chromium-based browsers (Edge, Brave, Opera)
- Different operating systems
- Various websites

---

## 🚀 Getting Started

### **1. Fork the Repository**
Click the "Fork" button on GitHub

### **2. Clone Your Fork**
```bash
git clone https://github.com/YOUR_USERNAME/CyberMind.git
cd CyberMind
```

### **3. Create a Branch**
```bash
git checkout -b feature/your-feature-name
```

### **4. Make Changes**
Edit the files in the `extension/` folder

### **5. Test Your Changes**
1. Open Chrome → `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `extension` folder
5. Test thoroughly!

### **6. Commit and Push**
```bash
git add .
git commit -m "Add: your feature description"
git push origin feature/your-feature-name
```

### **7. Create Pull Request**
Go to GitHub and create a pull request from your branch

---

## 📋 Code Style Guidelines

### **JavaScript:**
- Use `const` and `let` (no `var`)
- Use arrow functions where appropriate
- Add comments for complex logic
- Keep functions small and focused

### **Naming:**
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Variables: `camelCase`

### **Comments:**
```javascript
// Good: Explains WHY
// Cache results to avoid redundant API calls
const cache = new Map();

// Bad: Explains WHAT (obvious from code)
// Create a new map
const cache = new Map();
```

---

## 🌍 Translation Guidelines

### **Message Keys:**
Keep the same keys as English version

### **Placeholders:**
Preserve placeholder syntax: `$DOMAIN$`, `$SEVERITY$`

### **Tone:**
- Professional but friendly
- Clear and concise
- Avoid technical jargon where possible

### **Testing:**
Test your translation in the actual extension!

---

## 🐛 Bug Reports

### **Before Reporting:**
1. Check if it's already reported
2. Test on latest version
3. Try disabling other extensions

### **Include:**
- Chrome version
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Console errors (F12 → Console)

---

## 💡 Feature Requests

### **Good Feature Requests Include:**
- Clear description of the feature
- Use case / problem it solves
- How it would work (user perspective)
- Why it's valuable

### **Consider:**
- Does it align with CyberMind's goals?
- Is it feasible technically?
- Would it benefit most users?
- Does it maintain privacy-first approach?

---

## ✅ Pull Request Checklist

Before submitting:
- [ ] Code follows style guidelines
- [ ] Tested in Chrome
- [ ] No console errors
- [ ] Documentation updated (if needed)
- [ ] Commit messages are clear
- [ ] Branch is up to date with main

---

## 🎯 Priority Areas

**High Priority:**
1. 🌍 More language translations
2. 🎯 Expanded trusted domains list
3. 📖 Documentation improvements

**Medium Priority:**
1. 🔍 Enhanced threat detection
2. 🎨 UI/UX improvements
3. 🧪 Browser compatibility testing

**Low Priority:**
1. 🎨 Themes and customization
2. 📊 Advanced analytics
3. 🔧 Developer tools

---

## 📞 Questions?

- Open an issue on GitHub
- Tag it with `question` label
- We'll respond within 24-48 hours

---

## 🏆 Contributors

Thank you to all contributors who help make CyberMind better!

<!-- Contributors will be listed here -->

---

## 📜 Code of Conduct

### **Our Standards:**
- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Respect different viewpoints

### **Not Acceptable:**
- Harassment or discrimination
- Trolling or insulting comments
- Personal attacks
- Spam or off-topic content

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to CyberMind!** 🛡️🌍

Together, we can make the web safer for everyone!
