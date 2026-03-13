👁 ShadowWatch
Who's Watching You Right Now?
ShadowWatch is a Chrome browser extension that gives you real-time, plain-English visibility into every tracker, ad network, data broker, and fingerprinter collecting your data as you browse — and lets you block them instantly.

🚀 Installation (Developer Mode — Immediate Use)
Download or clone this folder
Open Chrome and go to chrome://extensions/
Enable "Developer mode" (toggle, top-right)
Click "Load unpacked"
Select the shadowwatch/ folder (the one containing manifest.json)
ShadowWatch appears in your toolbar — pin it for easy access
That's it. Start browsing and watch the trackers reveal themselves.

📦 Publishing to Chrome Web Store
Zip the extension folder (not the parent directory):
cd shadowwatch/
zip -r ../shadowwatch_v1.0.zip . --exclude "*.py" --exclude "generate_icons.py" --exclude "*.md" --exclude "database/"
Go to Chrome Web Store Developer Dashboard
Create a developer account ($5 one-time fee)
Click "New Item" → Upload the ZIP
Fill in store listing details (description, screenshots, privacy policy URL)
Submit for review (~3–7 business days)
🛠️ Features
Feature	Status
Real-time tracker detection	✅ Live
Named surveillance feed	✅ Live
Severity scoring (Critical/High/Medium/Low)	✅ Live
Canvas/WebGL/Audio fingerprint detection	✅ Live
Badge counter with color coding	✅ Live
One-click block all trackers	✅ Live
Tracker detail drawer with descriptions	✅ Live
7-day history with bar chart	✅ Live
Daily surveillance summary notification	✅ Live
Privacy-first: zero data to servers	✅ Live
🔒 Privacy Promise
All data stored locally via chrome.storage.local
Zero telemetry — ShadowWatch never phones home
No account required
No ads, ever — the business model is: watch the watchers, not you
📁 File Structure
shadowwatch/
├── manifest.json          Chrome MV3 manifest
├── background.js          Service worker — tracker detection engine
├── content.js             Content script — fingerprint detection
├── popup.html             Extension popup UI
├── popup.css              Popup styles (dark surveillance aesthetic)
├── popup.js               Popup JavaScript
├── database/
│   └── trackers.js        Tracker database (~80 entries)
├── rules/
│   └── tracker_rules.json declarativeNetRequest blocking rules (35 rules)
└── icons/
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    └── icon128.png
🔧 How It Works
Network Interception: The background service worker uses chrome.webRequest to intercept every network request. Incoming request URLs are matched against the tracker database to identify surveillance companies.

Fingerprint Detection: A content script injected into every page patches browser APIs (Canvas, WebGL, AudioContext) to detect fingerprinting attempts before they execute.

Local Storage: All events are stored in chrome.storage.local keyed by date. History capped at 7 days / 2000 events per day. Nothing leaves your device.

Blocking: When "Block All" is toggled, declarativeNetRequest rules prevent the browser from making requests to known tracker domains.

Risk Scoring: Each tracker is assigned severity points (Critical=20, High=10, Medium=5, Low=1). The sum, capped at 100, is your page Risk Score.

🗺️ Roadmap
 Firefox extension port
 Safari extension (iOS + macOS)
 Watcher Map visualization
 GDPR/CCPA opt-out automation
 Data broker email scanner
 Mobile app (iOS Privacy Report API)
 Tracker database auto-updates
⚖️ Legal
Tracker descriptions are derived from publicly available information including company privacy policies, SEC filings, and academic research. All descriptions note what companies may collect according to their stated practices.

ShadowWatch — The watchers have been watching long enough.
