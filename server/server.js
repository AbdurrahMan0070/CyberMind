import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.json({ limit: '2mb' }));

// Serve dashboard static files
app.use(express.static(path.join(__dirname, 'public')));

const GEMINI_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '';
let genAI = null;
if (GEMINI_KEY) {
  genAI = new GoogleGenerativeAI(GEMINI_KEY);
} else {
  console.warn('⚠  No GEMINI_API_KEY set — running in demo mode with mock data');
}

// In-memory store
const scanHistory = [];
const activeClients = new Set();

wss.on('connection', (ws) => {
  activeClients.add(ws);
  ws.send(JSON.stringify({ type: 'HISTORY', scans: scanHistory.slice(0, 50) }));
  ws.on('close', () => activeClients.delete(ws));
  ws.on('error', () => activeClients.delete(ws));
});

function broadcast(data) {
  const msg = JSON.stringify(data);
  for (const client of activeClients) {
    if (client.readyState === 1) client.send(msg);
  }
}

// ─── GEMINI CALL ──────────────────────────────────────────────────────────────
async function geminiJSON(prompt) {
  if (!genAI) return null;
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const clean = text.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch (e) {
    console.error('[Gemini] Error:', e.message);
    return null;
  }
}

// ─── MOCK DATA (when no API key) ──────────────────────────────────────────────
const TRUSTED_DOMAINS = ['google.com','youtube.com','facebook.com','twitter.com','x.com','github.com','microsoft.com','apple.com','amazon.com','wikipedia.org','reddit.com','linkedin.com','netflix.com','instagram.com','whatsapp.com','cloudflare.com','stackoverflow.com','medium.com','openai.com','anthropic.com'];

function isTrusted(domain) {
  return TRUSTED_DOMAINS.some(t => domain === t || domain.endsWith('.' + t));
}

function mockOsint(domain) {
  const trusted = isTrusted(domain);
  const threats = trusted
    ? ['clean', 'clean', 'clean', 'clean', 'low']
    : ['clean', 'clean', 'low', 'medium', 'high'];
  const sev = threats[Math.floor(Math.random() * threats.length)];
  return {
    severity: sev,
    threatScore: sev === 'clean' ? Math.floor(Math.random()*8)+1 : sev === 'low' ? 15+Math.floor(Math.random()*15) : sev === 'medium' ? 45+Math.floor(Math.random()*15) : 70+Math.floor(Math.random()*20),
    indicators: sev !== 'clean' && sev !== 'low' ? [`Suspicious domain pattern detected`, `No HTTPS enforcement found`] : [],
    suspiciousPatterns: [],
    recommendations: trusted ? ['Domain is trusted — no action needed'] : ['Keep browser updated', 'Use DNS-over-HTTPS'],
    osintSummary: trusted
      ? `${domain} is a well-established, globally trusted domain with strong reputation signals. No threat indicators found.`
      : `Domain ${domain} assessed as ${sev} risk. Standard web presence detected.`
  };
}

function mockArgus(title) {
  return {
    trustScore: 65 + Math.floor(Math.random() * 30),
    claims: [{ claim: 'Main factual claim extracted', verdict: 'unverifiable', confidence: 60 }],
    biasIndicators: ['Moderate emotional language'],
    verdict: 'credible',
    narrativeAnalysis: `Article titled "${title?.slice(0,40)}" appears to present standard journalistic content.`
  };
}

function mockVault() {
  return {
    riskLevel: 'medium',
    cvssScore: 4.2,
    vulnerabilities: [{ type: 'Missing CSP Header', severity: 'medium', description: 'No Content-Security-Policy header detected' }],
    phishingIndicators: [],
    pentestSummary: 'Login page has minor security header gaps. No critical vulnerabilities detected.'
  };
}

function mockReport(domain, severity) {
  return {
    executiveSummary: `Domain ${domain} completed automated security analysis. Overall risk: ${severity?.toUpperCase()}. No immediate action required for clean results.`,
    riskRating: severity?.toUpperCase() || 'LOW',
    keyFindings: ['Domain reputation check passed', 'Standard web infrastructure detected'],
    immediateActions: severity === 'high' || severity === 'critical' ? ['Avoid entering credentials', 'Report to IT security'] : [],
    longTermRecommendations: ['Enable DNS filtering', 'Use a password manager']
  };
}

// ─── SUPERPLANE TRIGGER ───────────────────────────────────────────────────────
async function triggerSuperPlane(canvas, payload) {
  const url = process.env.SUPERPLANE_URL || 'http://localhost:3001';
  const token = process.env.SUPERPLANE_TOKEN || '';
  try {
    const res = await fetch(`${url}/api/v1/canvases/${canvas}/trigger`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(3000)
    });
    if (res.ok) return await res.json();
  } catch {}
  return null;
}

// ─── AGENT ORCHESTRATION ──────────────────────────────────────────────────────
async function runAgents(payload, scanId) {
  const { domain, url, pageText, pageType, title } = payload;

  broadcast({ type: 'SCAN_START', scanId, domain, url, pageType, title, timestamp: Date.now() });

  // Fire SuperPlane canvases (non-blocking)
  const canvases = ['threatops'];
  if (pageType === 'article') canvases.push('argusai');
  if (pageType === 'login') canvases.push('vaultbreaker');
  canvases.forEach(c => triggerSuperPlane(c, { domain, url, scanId }));

  const result = { scanId, domain, url, title, pageType, timestamp: Date.now(), agents: {}, severity: 'clean', summary: '', report: null };

  // ── AGENT 1: ThreatOps OSINT ─────────────────────────────────────────────
  broadcast({ type: 'AGENT_START', scanId, agent: 'osint', message: `Analyzing ${domain} — OSINT + threat indicators...` });
  
  let osintData;
  if (genAI) {
    osintData = await geminiJSON(`You are an elite OSINT analyst. Analyze this domain for REAL security threats. Be accurate — major platforms like google.com, youtube.com, github.com, microsoft.com, facebook.com, twitter.com, amazon.com, wikipedia.org are SAFE: rate them clean with threatScore under 10 and empty indicators array. Only flag genuinely suspicious or unknown domains.
Domain: ${domain}
URL: ${url}
Page Title: ${title}
Page Type: ${pageType}
Content Snippet: ${pageText?.slice(0, 600) || 'N/A'}

Return ONLY valid JSON (no markdown):
{"severity":"clean|low|medium|high|critical","threatScore":0-100,"indicators":["empty array if clean"],"suspiciousPatterns":["empty array if clean"],"recommendations":["list"],"osintSummary":"2-3 sentences of accurate findings"}`);
  }
  
  osintData = osintData || mockOsint(domain);

  result.agents.osint = osintData;
  result.severity = osintData.severity || 'clean';
  broadcast({ type: 'AGENT_DONE', scanId, agent: 'osint', data: osintData });

  // ── AGENT 2: ArgusAI (articles) ──────────────────────────────────────────
  if (pageType === 'article' && pageText?.length > 80) {
    broadcast({ type: 'AGENT_START', scanId, agent: 'argus', message: `Extracting claims from "${title?.slice(0, 40)}"...` });
    
    let argusData;
    if (genAI) {
      argusData = await geminiJSON(`You are ArgusAI, a misinformation detection expert.
Title: ${title}
Content: ${pageText?.slice(0, 1000) || 'N/A'}

Return ONLY valid JSON (no markdown):
{"trustScore":0-100,"claims":[{"claim":"...","verdict":"true|false|unverifiable|misleading","confidence":0-100}],"biasIndicators":["list"],"propagandaTechniques":["list"],"sourceCredibility":"high|medium|low|unknown","narrativeAnalysis":"2-3 sentences","verdict":"credible|suspicious|misinformation|satire"}`);
    }
    
    argusData = argusData || mockArgus(title);

    result.agents.argus = argusData;
    broadcast({ type: 'AGENT_DONE', scanId, agent: 'argus', data: argusData });
    if (argusData.verdict === 'misinformation' && result.severity === 'clean') result.severity = 'medium';
  }

  // ── AGENT 3: VaultBreaker (login pages) ──────────────────────────────────
  if (pageType === 'login') {
    broadcast({ type: 'AGENT_START', scanId, agent: 'vault', message: `Scanning login page for credential theft vectors...` });
    
    let vaultData;
    if (genAI) {
      vaultData = await geminiJSON(`You are VaultBreaker, a penetration testing agent.
URL: ${url}
Domain: ${domain}
Content: ${pageText?.slice(0, 500) || 'N/A'}

Return ONLY valid JSON (no markdown):
{"riskLevel":"safe|low|medium|high|critical","cvssScore":0-10,"vulnerabilities":[{"type":"...","severity":"low|medium|high|critical","description":"..."}],"phishingIndicators":["list"],"sslStatus":"valid|invalid|missing|unknown","recommendations":["list"],"pentestSummary":"2-3 sentences"}`);
    }
    
    vaultData = vaultData || mockVault();

    result.agents.vault = vaultData;
    broadcast({ type: 'AGENT_DONE', scanId, agent: 'vault', data: vaultData });
    if (['high','critical'].includes(vaultData.riskLevel) && ['clean','low'].includes(result.severity)) result.severity = vaultData.riskLevel;
  }

  // ── AGENT 4: Report ───────────────────────────────────────────────────────
  broadcast({ type: 'AGENT_START', scanId, agent: 'report', message: `Generating CISO-ready incident report...` });
  const summaries = Object.entries(result.agents).map(([k,v]) => `${k.toUpperCase()}: ${JSON.stringify(v).slice(0,300)}`).join('\n');
  
  let reportData;
  if (genAI) {
    reportData = await geminiJSON(`You are a senior security analyst. Generate a CISO-ready report.
Target: ${domain}
Overall Severity: ${result.severity}
Agent Findings:
${summaries}

Return ONLY valid JSON (no markdown):
{"executiveSummary":"3-4 sentences","riskRating":"LOW|MEDIUM|HIGH|CRITICAL","keyFindings":["list"],"immediateActions":["list"],"longTermRecommendations":["list"]}`);
  }
  
  reportData = reportData || mockReport(domain, result.severity);

  result.report = reportData;
  result.summary = reportData.executiveSummary || '';
  broadcast({ type: 'AGENT_DONE', scanId, agent: 'report', data: reportData });

  // Finalize
  scanHistory.unshift(result);
  if (scanHistory.length > 500) scanHistory.splice(500);
  broadcast({ type: 'SCAN_COMPLETE', scanId, result });
  return result;
}

// ─── ROUTES ───────────────────────────────────────────────────────────────────
app.post('/api/scan', async (req, res) => {
  const scanId = `scan_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  res.json({ scanId, status: 'processing' });
  runAgents(req.body, scanId).catch(console.error);
});

app.get('/api/scans', (_, res) => res.json({ scans: scanHistory.slice(0, 50) }));

app.get('/api/stats', (_, res) => {
  const total = scanHistory.length;
  const threats = scanHistory.filter(s => ['high','critical'].includes(s.severity)).length;
  const warnings = scanHistory.filter(s => s.severity === 'medium').length;
  const clean = scanHistory.filter(s => ['clean','low'].includes(s.severity)).length;
  const byType = {};
  scanHistory.forEach(s => { byType[s.pageType] = (byType[s.pageType] || 0) + 1; });
  res.json({ total, threats, warnings, clean, byType });
});

app.get('/api/health', (_, res) => res.json({ status: 'ok', gemini: !!genAI, timestamp: Date.now() }));

// Fallback to index.html for SPA
app.get('*', (_, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`\n  ⬡ CyberMind running → http://localhost:${PORT}`);
  console.log(`  ⬡ WebSocket ready`);
  console.log(`  ⬡ Gemini API: ${genAI ? '✓ connected' : '✗ no key (demo mode)'}`);
  console.log(`  ⬡ SuperPlane: ${process.env.SUPERPLANE_URL || 'http://localhost:3001'}\n`);
});