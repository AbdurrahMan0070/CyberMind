#!/bin/bash
# CyberMind Installation Script for Mac/Linux
# Run this script to automatically install CyberMind

# Colors
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
GRAY='\033[0;37m'
NC='\033[0m' # No Color

echo -e "${CYAN}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║                                                               ║${NC}"
echo -e "${CYAN}║   🛡️  CyberMind - Autonomous Cyber Intelligence Platform     ║${NC}"
echo -e "${CYAN}║                    Installation Script                        ║${NC}"
echo -e "${CYAN}║                                                               ║${NC}"
echo -e "${CYAN}╚═══════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if Node.js is installed
echo -e "${YELLOW}🔍 Checking prerequisites...${NC}"
echo ""

if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✅ Node.js found: $NODE_VERSION${NC}"
else
    echo -e "${RED}❌ Node.js is not installed!${NC}"
    echo ""
    echo -e "${YELLOW}Please install Node.js from: https://nodejs.org/${NC}"
    echo -e "${YELLOW}After installation, run this script again.${NC}"
    echo ""
    read -p "Press Enter to exit"
    exit 1
fi

if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✅ npm found: v$NPM_VERSION${NC}"
else
    echo -e "${RED}❌ npm is not installed!${NC}"
    exit 1
fi

echo ""
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo ""

# Install server dependencies
echo -e "${YELLOW}📦 Installing server dependencies...${NC}"
echo -e "${GRAY}   This may take 1-2 minutes...${NC}"
echo ""

cd server

if npm install; then
    echo ""
    echo -e "${GREEN}✅ Dependencies installed successfully!${NC}"
else
    echo ""
    echo -e "${RED}❌ Failed to install dependencies!${NC}"
    cd ..
    read -p "Press Enter to exit"
    exit 1
fi

cd ..

echo ""
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo ""

# Installation complete
echo -e "${GREEN}✅ Installation Complete!${NC}"
echo ""
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}📋 Next Steps:${NC}"
echo ""
echo -e "1️⃣  ${NC}Start the server:${NC}"
echo -e "${CYAN}   Run: ./start.sh${NC}"
echo -e "${GRAY}   Or:  cd server && npm start${NC}"
echo ""
echo -e "2️⃣  ${NC}Install Chrome Extension:${NC}"
echo -e "${GRAY}   • Open Chrome and go to: chrome://extensions/${NC}"
echo -e "${GRAY}   • Enable 'Developer mode' (top-right toggle)${NC}"
echo -e "${GRAY}   • Click 'Load unpacked'${NC}"
echo -e "${GRAY}   • Select the 'extension' folder${NC}"
echo ""
echo -e "3️⃣  ${NC}Start using CyberMind:${NC}"
echo -e "${GRAY}   • Browse any website - automatic scanning!${NC}"
echo -e "${GRAY}   • Click extension icon for stats${NC}"
echo -e "${GRAY}   • Click 'View Dashboard' for full reports${NC}"
echo ""
echo -e "${CYAN}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}📖 For detailed instructions, see: INSTALLATION_GUIDE.md${NC}"
echo ""
echo -e "${GREEN}🚀 Ready to start? Run: ./start.sh${NC}"
echo ""

read -p "Press Enter to exit"
