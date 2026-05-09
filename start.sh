#!/bin/bash
# ─────────────────────────────────────────────────────────────────
#  CyberMind — Single terminal startup
#  Usage: GEMINI_API_KEY=your_key bash start.sh
# ─────────────────────────────────────────────────────────────────

if [ -z "$GEMINI_API_KEY" ] && [ -z "$GOOGLE_API_KEY" ]; then
  echo ""
  echo "  ⚠  No API key found — running in demo mode (mock data)"
  echo "  To use real Gemini AI: GEMINI_API_KEY=your_key bash start.sh"
  echo ""
fi

echo ""
echo "  ⬡ ─────────────────────────────────────────────────────"
echo "  ⬡  CyberMind — Autonomous Cyber Intelligence Platform"
echo "  ⬡ ─────────────────────────────────────────────────────"
echo ""
echo "  Dashboard → http://localhost:4000"
echo "  API       → http://localhost:4000/api"
echo ""
echo "  Chrome Extension setup:"
echo "  1. Open chrome://extensions/"
echo "  2. Enable Developer mode"
echo "  3. Load unpacked → select the 'extension/' folder"
echo ""
echo "  ─────────────────────────────────────────────────────────"
echo ""

cd "$(dirname "$0")/server"
node server.js
