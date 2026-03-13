<div align="center">

<br/>

```
███████╗██╗  ██╗ █████╗ ██████╗  ██████╗ ██╗    ██╗
██╔════╝██║  ██║██╔══██╗██╔══██╗██╔═══██╗██║    ██║
███████╗███████║███████║██║  ██║██║   ██║██║ █╗ ██║
╚════██║██╔══██║██╔══██║██║  ██║██║   ██║██║███╗██║
███████║██║  ██║██║  ██║██████╔╝╚██████╔╝╚███╔███╔╝
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝  ╚═════╝  ╚══╝╚══╝

██╗    ██╗ █████╗ ████████╗ ██████╗██╗  ██╗
██║    ██║██╔══██╗╚══██╔══╝██╔════╝██║  ██║
██║ █╗ ██║███████║   ██║   ██║     ███████║
██║███╗██║██╔══██║   ██║   ██║     ██╔══██║
╚███╔███╔╝██║  ██║   ██║   ╚██████╗██║  ██║
 ╚══╝╚══╝ ╚═╝  ╚═╝   ╚═╝    ╚═════╝╚═╝  ╚═╝
```

### *The watchers have been watching long enough.*

<br/>

<br/>

**Right now, hundreds of invisible companies are watching exactly what you're reading, buying, and thinking about — without your knowledge.**

**ShadowWatch makes them visible. In real time. By name.**

<br/>
<br/>
---

</div>

## 👁 What Is ShadowWatch?

ShadowWatch is a **Chrome browser extension** that intercepts every network request your browser makes and tells you — in plain English — exactly which companies are collecting your data as you browse.

Not technical jargon. Not IP addresses. **Names.**

> *"Facebook Pixel is tracking your purchases right now."*
> *"TikTok's surveillance pixel just loaded on this news site."*
> *"This page uses Canvas fingerprinting — a tracking method that survives clearing your cookies."*

<br/>

## ⚡ Features

<table>
<tr>
<td width="50%">

**🔴 Real-Time Tracker Feed**
Live, scrolling feed of every surveillance company active on the current page — updated as you browse, sorted by severity.

</td>
<td width="50%">

**👆 Fingerprint Detection**
Catches Canvas, WebGL, and Audio fingerprinting attempts — tracking methods that survive incognito mode and cookie deletion.

</td>
</tr>
<tr>
<td width="50%">

**📊 Risk Score**
A 0–100 risk score per page based on tracker severity. Critical data brokers score high. CDN infrastructure scores low. No guessing.

</td>
<td width="50%">

**🛡 One-Click Blocking**
Block all detected trackers on a page instantly using Chrome's declarativeNetRequest API — the same engine used by uBlock Origin.

</td>
</tr>
<tr>
<td width="50%">

**📅 7-Day History**
Bar chart and daily breakdown of every surveillance event across the past week. See which sites are the worst offenders.

</td>
<td width="50%">

**🔔 Daily Summary**
End-of-day notification telling you how many tracker events occurred, which company watched you most, and your daily risk score.

</td>
</tr>
</table>

<br/>

## 🚀 Installation

> **Chrome Web Store listing coming soon.** Until then, install in 60 seconds via Developer Mode:

**1. Download**

Go to [**Releases**](https://github.com/YOUR_USERNAME/shadowwatch/releases/tag/v1.0) and download `shadowwatch_v1.0.zip`

**2. Unzip**

Extract the ZIP file. You should see `manifest.json` directly inside the extracted folder.

**3. Load in Chrome**

```
chrome://extensions/  →  Developer mode ON  →  Load unpacked  →  select the extracted folder
```

**4. Start browsing**

Pin ShadowWatch to your toolbar. Navigate to any website. Watch the trackers appear.

<br/>

## 🔍 How It Works

```
Your browser makes a request
         ↓
ShadowWatch intercepts it (chrome.webRequest)
         ↓
Checks against database of 80+ known tracker domains
         ↓
Matches? → Identifies company, category, severity, data types
         ↓
Displays in real-time feed with plain-English description
         ↓
Stores locally (chrome.storage.local) — nothing leaves your device
```

**Fingerprint detection** works differently — a content script patches browser APIs at page load time, before any scripts run:

| API Patched | Detects |
|---|---|
| `HTMLCanvasElement.toDataURL` | Canvas fingerprinting |
| `WebGLRenderingContext.getParameter` | WebGL hardware fingerprinting |
| `AudioContext.createOscillator` | Audio fingerprinting |
| `document.fonts.check` | Font enumeration |

<br/>

## 📋 Tracker Categories

| Category | Icon | Examples | Risk |
|---|---|---|---|
| Data Broker | 🗃️ | Acxiom, LiveRamp, Experian | 🔴 Critical |
| Fingerprinting | 👆 | FingerprintJS, iovation | 🔴 Critical |
| Ad Network | 📢 | Google Ads, Facebook Pixel, Criteo | 🟠 High |
| Session Recording | 📹 | Hotjar, FullStory, Microsoft Clarity | 🟠 High |
| Ad Exchange | ⚡ | Magnite, PubMatic, OpenX | 🟠 High |
| Analytics | 📊 | Google Analytics, Mixpanel, Amplitude | 🟡 Medium |
| Social | 🔗 | Disqus, AddThis, Twitter | 🟡 Medium |
| CRM | 📧 | HubSpot, Intercom, Marketo | 🟡 Medium |
| CDN / Infrastructure | 🌐 | Cloudflare, Fastly | 🟢 Low |

<br/>

## 🛡 Privacy Promise

ShadowWatch was built to expose surveillance. It would be deeply ironic if it were itself a surveillance tool.

| Commitment | Status |
|---|---|
| All data stored locally on your device | ✅ |
| Zero data transmitted to ShadowWatch servers | ✅ |
| No account required | ✅ |
| No ads, ever | ✅ |
| No telemetry or usage tracking | ✅ |
| Full source code available here | ✅ |

Every piece of data ShadowWatch collects — tracker events, history, settings — lives exclusively in `chrome.storage.local` on your machine. We have no servers receiving user data because we built none.

<br/>

## 📁 Project Structure

```
shadowwatch/
├── manifest.json           Chrome MV3 manifest
├── background.js           Service worker — tracker detection engine
├── content.js              Content script — fingerprint detection  
├── popup.html              Extension popup UI shell
├── popup.css               Dark surveillance aesthetic
├── popup.js                Popup logic & rendering
├── database/
│   └── trackers.js         80+ tracker definitions with descriptions
├── rules/
│   └── tracker_rules.json  35 declarativeNetRequest blocking rules
└── icons/
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    └── icon128.png
```

<br/>

## 🗺 Roadmap

- [x] Chrome extension MVP
- [x] Real-time tracker detection (80+ trackers)
- [x] Canvas / WebGL / Audio fingerprint detection
- [x] Severity scoring & risk score
- [x] 7-day history with visualization
- [x] One-click blocking
- [ ] Firefox extension port
- [ ] Safari extension (iOS + macOS)
- [ ] Watcher Map — visual network diagram of surveillance ecosystem
- [ ] GDPR / CCPA opt-out automation
- [ ] Data broker email scanner
- [ ] Mobile app (iOS Privacy Report API integration)
- [ ] Weekly PDF surveillance reports
- [ ] Tracker database auto-updates via CDN

<br/>

## 🤝 Contributing

Contributions welcome — especially:

- **New tracker definitions** — add entries to `database/trackers.js`
- **False positive reports** — open an issue with the domain
- **New fingerprinting techniques** — add detection to `content.js`
- **UI improvements** — popup redesigns, new views

Please open an issue before submitting large PRs.

<br/>

## ⚖️ Legal

Tracker descriptions are sourced from publicly available information including company privacy policies, SEC filings, academic research, and regulatory filings. All descriptions reflect companies' stated data practices.

ShadowWatch does not make legal claims about any company's compliance with privacy law.

<br/>

---

<div align="center">

**ShadowWatch** · Built with 👁 · Zero servers · Zero telemetry · Zero irony

*If you find this useful, star the repo. If you find a bug, open an issue.*

</div>
