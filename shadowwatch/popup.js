// ShadowWatch Popup Script

// ─── Tracker Database (inlined for popup context) ─────────────────────────────
const TRACKER_DB = {
  "doubleclick.net": { name: "Google Ads (DoubleClick)", parent: "Google", category: "advertising", severity: "high", dataTypes: ["browsing history", "location", "identity", "behavioral profile"], description: "Google's primary ad network. Tracks your browsing across millions of websites to build a detailed behavioral profile for targeted advertising.", color: "#EA4335" },
  "google-analytics.com": { name: "Google Analytics", parent: "Google", category: "analytics", severity: "medium", dataTypes: ["page views", "clicks", "device info", "rough location"], description: "The world's most widely deployed web analytics tool. Tracks your behavior on websites and sends data to Google's servers.", color: "#FBBC05" },
  "googletagmanager.com": { name: "Google Tag Manager", parent: "Google", category: "analytics", severity: "medium", dataTypes: ["all events on page", "custom data"], description: "A container that can load any number of tracking scripts. Often used to deploy other trackers without updating site code.", color: "#FBBC05" },
  "googlesyndication.com": { name: "Google AdSense", parent: "Google", category: "advertising", severity: "high", dataTypes: ["browsing context", "content interests", "behavioral data"], description: "Serves display ads based on your browsing behavior and the content you read.", color: "#EA4335" },
  "googleadservices.com": { name: "Google Ad Services", parent: "Google", category: "advertising", severity: "high", dataTypes: ["conversion data", "ad clicks", "purchase intent"], description: "Tracks ad conversions and remarketing. Knows when you click an ad and what you do afterward.", color: "#EA4335" },
  "gstatic.com": { name: "Google Static", parent: "Google", category: "cdn", severity: "low", dataTypes: ["IP address", "request timing"], description: "Google's CDN for static resources. Low risk but confirms Google knows you visited.", color: "#4285F4" },
  "connect.facebook.net": { name: "Facebook Pixel", parent: "Meta", category: "advertising", severity: "critical", dataTypes: ["page views", "purchases", "sign-ups", "browsing behavior", "device fingerprint"], description: "The infamous Facebook Pixel. Sends highly detailed behavioral data to Facebook — including purchases and form fills — even if you're not logged in.", color: "#E91E63" },
  "fbcdn.net": { name: "Facebook CDN", parent: "Meta", category: "social", severity: "medium", dataTypes: ["IP address", "content requests"], description: "Facebook's content delivery network. Indicates Meta infrastructure is active on this page.", color: "#1877F2" },
  "facebook.com": { name: "Facebook", parent: "Meta", category: "social", severity: "high", dataTypes: ["identity", "social graph", "content interests", "purchase behavior"], description: "Meta's core social platform. Even non-users are tracked via the Facebook Pixel.", color: "#1877F2" },
  "amazon-adsystem.com": { name: "Amazon DSP", parent: "Amazon", category: "advertising", severity: "high", dataTypes: ["purchase history", "browsing behavior", "product interests"], description: "Amazon's ad network uses your shopping history to target you across the web.", color: "#FF9900" },
  "adsrvr.org": { name: "The Trade Desk", parent: "The Trade Desk", category: "advertising", severity: "high", dataTypes: ["cross-site browsing", "behavioral profile", "device fingerprint"], description: "One of the largest independent demand-side platforms. Tracks you across thousands of websites.", color: "#FF6B35" },
  "clarity.ms": { name: "Microsoft Clarity", parent: "Microsoft", category: "analytics", severity: "high", dataTypes: ["mouse movements", "scroll behavior", "clicks", "session recordings"], description: "Records your entire browsing session including mouse movements. Creates heatmaps and session replays.", color: "#0078D4" },
  "bat.bing.com": { name: "Bing Event Tracking", parent: "Microsoft", category: "advertising", severity: "high", dataTypes: ["conversions", "purchases", "sign-ups", "page visits"], description: "Tracks your actions on sites running Microsoft Ads — purchases, form submissions, and more.", color: "#0078D4" },
  "ads-twitter.com": { name: "X (Twitter) Ads", parent: "X Corp", category: "advertising", severity: "high", dataTypes: ["ad clicks", "website visits", "purchase behavior"], description: "Twitter/X's advertising and conversion tracking platform.", color: "#1DA1F2" },
  "analytics.tiktok.com": { name: "TikTok Pixel", parent: "ByteDance", category: "analytics", severity: "critical", dataTypes: ["page views", "conversions", "device info", "behavior"], description: "TikTok's pixel tracks behavior on sites outside TikTok and links to TikTok identity profiles. Data subject to Chinese data laws.", color: "#FE2C55" },
  "tiktok.com": { name: "TikTok", parent: "ByteDance", category: "social", severity: "critical", dataTypes: ["browsing behavior", "device fingerprint", "location", "content interests", "identity"], description: "ByteDance's platform has broad tracking capabilities. Has faced significant regulatory scrutiny for data practices.", color: "#FE2C55" },
  "acxiom.com": { name: "Acxiom", parent: "IPG", category: "data_broker", severity: "critical", dataTypes: ["personal identity", "financial data", "purchase history", "demographics", "location history"], description: "One of the largest data brokers in the world. Maintains profiles on billions of people.", color: "#C0392B" },
  "liveramp.com": { name: "LiveRamp", parent: "LiveRamp", category: "data_broker", severity: "critical", dataTypes: ["identity graph", "cross-device links", "purchase data", "location"], description: "Links your identity across devices, apps, and data providers — creating a unified surveillance profile.", color: "#C0392B" },
  "experian.com": { name: "Experian Marketing", parent: "Experian", category: "data_broker", severity: "critical", dataTypes: ["credit behavior", "financial profile", "demographics", "purchase history"], description: "Beyond credit scores, Experian sells detailed consumer profiles to marketers.", color: "#C0392B" },
  "rubiconproject.com": { name: "Magnite (Rubicon)", parent: "Magnite", category: "adtech", severity: "high", dataTypes: ["browsing context", "auction data", "behavioral segment"], description: "Your browser data is sold in real-time auctions to the highest bidder.", color: "#E74C3C" },
  "pubmatic.com": { name: "PubMatic", parent: "PubMatic", category: "adtech", severity: "high", dataTypes: ["bid stream data", "identity", "browsing behavior"], description: "A digital advertising platform. Participates in real-time bidding, exposing your data to hundreds of buyers.", color: "#E74C3C" },
  "criteo.com": { name: "Criteo", parent: "Criteo", category: "advertising", severity: "high", dataTypes: ["shopping behavior", "product views", "cart abandonment", "purchase intent"], description: "Retargeting specialist. Follows you across the web showing ads for products you've viewed.", color: "#FF6B35" },
  "hotjar.com": { name: "Hotjar", parent: "Hotjar", category: "analytics", severity: "high", dataTypes: ["session recordings", "heatmaps", "mouse movements", "form inputs"], description: "Records your actual screen session — mouse movements, clicks, and scrolling.", color: "#F9423A" },
  "fullstory.com": { name: "FullStory", parent: "FullStory", category: "analytics", severity: "high", dataTypes: ["full session recordings", "DOM snapshots", "all user interactions"], description: "Records everything you do on a website — a complete session replay.", color: "#F03030" },
  "segment.com": { name: "Segment (Twilio)", parent: "Twilio", category: "analytics", severity: "high", dataTypes: ["user events", "identity", "cross-platform behavior"], description: "A customer data platform that collects every user action and routes it to dozens of other tools.", color: "#52BD95" },
  "mixpanel.com": { name: "Mixpanel", parent: "Mixpanel", category: "analytics", severity: "medium", dataTypes: ["user events", "funnels", "retention", "feature usage"], description: "Product analytics tracking detailed user interactions.", color: "#7856FF" },
  "amplitude.com": { name: "Amplitude", parent: "Amplitude", category: "analytics", severity: "medium", dataTypes: ["user events", "behavioral flows", "cohort data"], description: "Behavioral analytics platform tracking how users interact with products.", color: "#2962FF" },
  "fingerprintjs.com": { name: "FingerprintJS", parent: "Fingerprint", category: "fingerprinting", severity: "critical", dataTypes: ["device fingerprint", "browser attributes", "persistent identity"], description: "Creates a unique persistent identifier for your device without cookies — harder to evade than cookies.", color: "#E53E3E" },
  "quantserve.com": { name: "Quantcast", parent: "Quantcast", category: "advertising", severity: "high", dataTypes: ["audience measurement", "cross-site identity", "behavioral segments"], description: "Tracks browsing to build demographic and psychographic profiles.", color: "#E74C3C" },
  "scorecardresearch.com": { name: "Scorecard Research", parent: "Comscore", category: "analytics", severity: "medium", dataTypes: ["page views", "audience metrics", "browsing behavior"], description: "Comscore's audience measurement panel.", color: "#F39C12" },
  "taboola.com": { name: "Taboola", parent: "Taboola", category: "advertising", severity: "medium", dataTypes: ["content interests", "scroll behavior", "click behavior"], description: "Content recommendation network. Tracks what articles you read and click.", color: "#FF6B35" },
  "outbrain.com": { name: "Outbrain", parent: "Outbrain", category: "advertising", severity: "medium", dataTypes: ["content interests", "reading behavior", "click patterns"], description: "Content discovery platform building interest profiles based on what you engage with.", color: "#FF6B35" },
  "intercom.io": { name: "Intercom", parent: "Intercom", category: "crm", severity: "medium", dataTypes: ["user identity", "page visits", "customer journey"], description: "Customer messaging platform tracking users across product journey.", color: "#286EFA" },
  "hubspot.com": { name: "HubSpot", parent: "HubSpot", category: "crm", severity: "medium", dataTypes: ["identity", "page visits", "form submissions", "email engagement"], description: "CRM platform that links anonymous visitors to known contacts.", color: "#FF7A59" },
  "marketo.com": { name: "Adobe Marketo", parent: "Adobe", category: "crm", severity: "high", dataTypes: ["identity resolution", "behavioral data", "lead scoring", "email tracking"], description: "Enterprise marketing automation building detailed behavioral profiles.", color: "#5C67F2" },
  "addthis.com": { name: "AddThis", parent: "Oracle", category: "social", severity: "high", dataTypes: ["browsing history", "social sharing behavior", "identity"], description: "Social sharing buttons that track your browsing even without clicking.", color: "#FF6600" },
  "disqus.com": { name: "Disqus", parent: "Zeta Global", category: "social", severity: "high", dataTypes: ["browsing history", "comment behavior", "identity", "cross-site profile"], description: "Comments platform that tracks you across all Disqus sites — building a comprehensive reading profile.", color: "#2E9FFF" },
  "yandex.ru": { name: "Yandex Metrica", parent: "Yandex", category: "analytics", severity: "high", dataTypes: ["session recordings", "heatmaps", "behavioral data"], description: "Russia-based analytics with session recording capabilities. Data subject to Russian jurisdiction.", color: "#FFCC00" }
};

const CATEGORY_ICONS = {
  advertising: "📢",
  analytics: "📊",
  data_broker: "🗃️",
  fingerprinting: "👆",
  social: "🔗",
  adtech: "⚡",
  crm: "📧",
  affiliate: "🛍️",
  cdn: "🌐",
  infrastructure: "⚙️"
};

const CATEGORY_LABELS = {
  advertising: "Advertising",
  analytics: "Analytics",
  data_broker: "Data Broker",
  fingerprinting: "Fingerprinting",
  social: "Social Media",
  adtech: "Ad Exchange",
  crm: "CRM / Marketing",
  affiliate: "Affiliate",
  cdn: "CDN",
  infrastructure: "Infrastructure"
};

// ─── State ────────────────────────────────────────────────────────────────────
let currentTrackers = [];
let currentEvents = [];
let isBlocking = false;

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  await loadCurrentTab();
  setupTabs();
  setupDrawer();
  setupActions();
  listenForUpdates();
});

// ─── Load Current Tab Data ────────────────────────────────────────────────────
async function loadCurrentTab() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return;

    // Update site bar
    const hostname = tab.url ? new URL(tab.url).hostname : 'Unknown';
    document.getElementById('site-name').textContent = hostname;

    // Get favicon
    if (tab.favIconUrl) {
      const icon = document.getElementById('site-icon');
      icon.innerHTML = `<img src="${tab.favIconUrl}" width="20" height="20" style="border-radius:3px" onerror="this.parentElement.textContent='🌐'">`;
    }

    // Request data from background
    chrome.runtime.sendMessage({ type: 'GET_TAB_DATA' }, (response) => {
      if (chrome.runtime.lastError || !response) return;
      renderTrackers(response.trackers || [], response.events || [], response.score || 0);
    });

  } catch (e) {
    document.getElementById('site-name').textContent = 'Extension page';
    document.getElementById('site-meta').textContent = 'Navigate to a website to scan';
  }
}

// ─── Render Trackers ──────────────────────────────────────────────────────────
function renderTrackers(trackers, events, score) {
  currentTrackers = trackers;
  currentEvents = events;

  const list = document.getElementById('tracker-list');
  const empty = document.getElementById('empty-state');
  const feedCount = document.getElementById('feed-count');

  // Update score
  updateScore(score);

  // Update stats
  const cats = { advertising: 0, analytics: 0, fingerprinting: 0, data_broker: 0 };
  for (const t of trackers) {
    if (t.category === 'adtech') cats.advertising++;
    else if (cats.hasOwnProperty(t.category)) cats[t.category]++;
    else if (t.category === 'advertising') cats.advertising++;
  }

  setStatCount('stat-ads', cats.advertising + (trackers.filter(t => t.category === 'adtech').length));
  setStatCount('stat-analytics', trackers.filter(t => t.category === 'analytics' || t.category === 'crm').length);
  setStatCount('stat-fp', trackers.filter(t => t.category === 'fingerprinting').length);
  setStatCount('stat-broker', trackers.filter(t => t.category === 'data_broker').length);

  // Update site meta
  if (trackers.length > 0) {
    const worst = trackers.sort((a, b) => severityScore(b.severity) - severityScore(a.severity))[0];
    document.getElementById('site-meta').textContent = `${trackers.length} tracker${trackers.length !== 1 ? 's' : ''} detected • Worst: ${worst.name}`;
  } else {
    document.getElementById('site-meta').textContent = 'Monitoring active';
  }

  // Feed count
  feedCount.textContent = trackers.length > 0
    ? `${trackers.length} WATCHER${trackers.length !== 1 ? 'S' : ''} DETECTED`
    : 'WATCHING...';

  // Sort by severity
  const sorted = [...trackers].sort((a, b) => severityScore(b.severity) - severityScore(a.severity));

  if (sorted.length === 0) {
    empty.style.display = 'flex';
    // Remove all tracker rows
    list.querySelectorAll('.tracker-row').forEach(r => r.remove());
    return;
  }

  empty.style.display = 'none';
  list.querySelectorAll('.tracker-row').forEach(r => r.remove());

  for (const tracker of sorted) {
    const row = createTrackerRow(tracker);
    list.appendChild(row);
  }
}

function severityScore(s) {
  return { critical: 4, high: 3, medium: 2, low: 1 }[s] || 0;
}

function setStatCount(id, val) {
  const el = document.getElementById(id);
  el.textContent = val;
  el.classList.toggle('has-value', val > 0);
}

function updateScore(score) {
  const pill = document.getElementById('score-pill');
  const val = document.getElementById('score-value');
  val.textContent = score || '0';

  pill.classList.remove('risk-critical', 'risk-high', 'risk-medium', 'risk-low');
  if (score >= 60) pill.classList.add('risk-critical');
  else if (score >= 35) pill.classList.add('risk-high');
  else if (score >= 15) pill.classList.add('risk-medium');
  else pill.classList.add('risk-low');
}

function createTrackerRow(tracker) {
  const row = document.createElement('div');
  row.className = 'tracker-row';
  row.innerHTML = `
    <div class="tracker-sev ${tracker.severity || 'low'}"></div>
    <div class="tracker-icon">${CATEGORY_ICONS[tracker.category] || '🔍'}</div>
    <div class="tracker-info">
      <div class="tracker-name">${escHtml(tracker.name)}</div>
      <div class="tracker-parent">${escHtml(tracker.parent || '')} · ${escHtml(CATEGORY_LABELS[tracker.category] || tracker.category)}</div>
    </div>
    <div class="tracker-right">
      <div class="sev-badge ${tracker.severity}">${tracker.severity}</div>
      <div class="tracker-arrow">›</div>
    </div>
  `;
  row.addEventListener('click', () => openDrawer(tracker));
  return row;
}

// ─── Drawer ───────────────────────────────────────────────────────────────────
function setupDrawer() {
  const overlay = document.getElementById('drawer-overlay');
  overlay.addEventListener('click', closeDrawer);
}

function openDrawer(tracker) {
  const drawer = document.getElementById('tracker-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const content = document.getElementById('drawer-content');

  const dataChips = (tracker.dataTypes || [])
    .map(d => `<div class="data-chip">${escHtml(d)}</div>`).join('');

  const searchQuery = encodeURIComponent(`${tracker.name} privacy tracking data collection`);

  content.innerHTML = `
    <div class="drawer-header">
      <div class="drawer-icon">${CATEGORY_ICONS[tracker.category] || '🔍'}</div>
      <div class="drawer-title-block">
        <div class="drawer-name">${escHtml(tracker.name)}</div>
        <div class="drawer-parent">By ${escHtml(tracker.parent || 'Unknown')}</div>
      </div>
      <div class="drawer-sev-badge sev-badge ${tracker.severity}">${tracker.severity}</div>
    </div>

    <div class="drawer-section-label">WHAT THEY COLLECT</div>
    <div class="drawer-description">${escHtml(tracker.description || 'This tracker collects data about your browsing behavior.')}</div>

    <div class="drawer-section-label">DATA TYPES</div>
    <div class="drawer-data-types">${dataChips || '<div class="data-chip">unknown</div>'}</div>

    <div class="drawer-section-label">DOMAIN</div>
    <div class="drawer-domain">${escHtml(tracker.domain || '')}</div>

    <div class="drawer-actions">
      <div class="drawer-action-btn btn-block" id="drawer-block-btn">🛡 Block Domain</div>
      <a class="drawer-action-btn btn-learn" href="https://www.google.com/search?q=${searchQuery}" target="_blank">🔍 Learn More</a>
    </div>
  `;

  document.getElementById('drawer-block-btn').addEventListener('click', () => {
    // In a full deployment, this would add to dynamic rules
    const btn = document.getElementById('drawer-block-btn');
    btn.textContent = '✓ Blocked';
    btn.style.background = 'rgba(0,230,118,0.1)';
    btn.style.borderColor = '#00E676';
    btn.style.color = '#00E676';
  });

  drawer.classList.add('open');
  overlay.classList.add('open');
}

function closeDrawer() {
  document.getElementById('tracker-drawer').classList.remove('open');
  document.getElementById('drawer-overlay').classList.remove('open');
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
function setupTabs() {
  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`tab-${tabId}`).classList.add('active');

      if (tabId === 'history') loadHistory();
    });
  });
}

// ─── History ──────────────────────────────────────────────────────────────────
async function loadHistory() {
  chrome.runtime.sendMessage({ type: 'GET_HISTORY' }, (data) => {
    if (chrome.runtime.lastError || !data) return;
    renderHistory(data);
    renderBars(data);
  });
}

function renderBars(data) {
  const container = document.getElementById('bars-container');
  container.innerHTML = '';

  const days = [];
  let maxCount = 1;

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = `events_${d.toISOString().split('T')[0]}`;
    const events = data[key] || [];
    const label = i === 0 ? 'Today' : d.toLocaleDateString('en', { weekday: 'short' });
    const count = events.length;
    maxCount = Math.max(maxCount, count);
    days.push({ label, count, isToday: i === 0 });
  }

  for (const day of days) {
    const pct = Math.max(4, Math.round((day.count / maxCount) * 100));
    const col = document.createElement('div');
    col.className = 'bar-col';
    col.innerHTML = `
      <div class="bar-fill ${day.isToday ? 'today' : ''}" style="height:${pct}%" title="${day.count} events"></div>
      <div class="bar-label">${day.label}</div>
    `;
    container.appendChild(col);
  }
}

function renderHistory(data) {
  const list = document.getElementById('history-list');
  list.innerHTML = '';

  let hasData = false;

  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const key = `events_${dateStr}`;
    const events = data[key];
    if (!events || events.length === 0) continue;
    hasData = true;

    // Aggregate by tracker name
    const counts = {};
    for (const e of events) {
      counts[e.name] = (counts[e.name] || 0) + 1;
    }

    const label = i === 0 ? 'Today' : i === 1 ? 'Yesterday' : d.toLocaleDateString('en', { weekday: 'long', month: 'short', day: 'numeric' });

    const dayDiv = document.createElement('div');
    dayDiv.className = 'history-day';
    dayDiv.innerHTML = `
      <div class="history-day-header">
        <span>${label}</span>
        <span class="history-day-count">${events.length} events</span>
      </div>
    `;

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8);
    for (const [name, count] of sorted) {
      const item = document.createElement('div');
      item.className = 'history-tracker-item';
      item.innerHTML = `
        <span class="history-tracker-name">${escHtml(name)}</span>
        <span class="history-tracker-count">${count}×</span>
      `;
      dayDiv.appendChild(item);
    }

    list.appendChild(dayDiv);
  }

  if (!hasData) {
    list.innerHTML = '<div class="loading-state">No history yet. Browse some websites to start tracking the trackers.</div>';
  }
}

// ─── Actions ──────────────────────────────────────────────────────────────────
function setupActions() {
  const blockBtn = document.getElementById('block-btn');
  blockBtn.addEventListener('click', () => {
    isBlocking = !isBlocking;
    blockBtn.classList.toggle('active', isBlocking);
    document.getElementById('block-label').textContent = isBlocking ? 'Blocking' : 'Block All';

    if (isBlocking) {
      blockBtn.querySelector('.block-icon').textContent = '✓';
      // Notify background to enable blocking rules for this tab
      chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        if (tab) {
          chrome.runtime.sendMessage({ type: 'ENABLE_BLOCKING', tabId: tab.id });
        }
      });
    } else {
      blockBtn.querySelector('.block-icon').textContent = '🛡';
    }
  });

  document.getElementById('clear-btn').addEventListener('click', () => {
    if (confirm('Clear all ShadowWatch stored data? This cannot be undone.')) {
      chrome.runtime.sendMessage({ type: 'CLEAR_DATA' }, () => {
        alert('Data cleared.');
      });
    }
  });
}

// ─── Live Updates ─────────────────────────────────────────────────────────────
function listenForUpdates() {
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'NEW_TRACKER') {
      chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        if (tab && tab.id === msg.tabId) {
          // Add to current list if not already there
          const existing = currentTrackers.find(t => t.domain === msg.event.domain);
          if (!existing) {
            const tracker = { domain: msg.event.domain, ...msg.event.tracker };
            currentTrackers.push(tracker);
            currentEvents.push(msg.event);

            // Re-render
            const score = calcLocalScore(currentTrackers);
            renderTrackers(currentTrackers, currentEvents, score);
          }
        }
      });
    }
  });
}

function calcLocalScore(trackers) {
  let score = 0;
  for (const t of trackers) {
    if (t.severity === 'critical') score += 20;
    else if (t.severity === 'high') score += 10;
    else if (t.severity === 'medium') score += 5;
    else score += 1;
  }
  return Math.min(100, score);
}

// ─── Utils ────────────────────────────────────────────────────────────────────
function escHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
