// ShadowWatch Background Service Worker
// Handles tracker detection, scoring, storage, and notifications

import { TRACKER_DB, CATEGORIES, SEVERITY_LEVELS } from './database/trackers.js';

// ─── State ────────────────────────────────────────────────────────────────────
const tabTrackers = new Map(); // tabId -> Set of tracker domains
const tabEvents = new Map();   // tabId -> Array of events

// ─── Scoring ──────────────────────────────────────────────────────────────────
function calcScore(events) {
  if (!events || events.length === 0) return 0;
  let score = 0;
  const seen = new Set();
  for (const e of events) {
    if (seen.has(e.domain)) continue;
    seen.add(e.domain);
    const t = TRACKER_DB[e.domain];
    if (!t) continue;
    if (t.severity === 'critical') score += 20;
    else if (t.severity === 'high') score += 10;
    else if (t.severity === 'medium') score += 5;
    else score += 1;
  }
  return Math.min(100, score);
}

// ─── Request Interception ─────────────────────────────────────────────────────
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (details.tabId < 0) return;
    try {
      const url = new URL(details.url);
      const domain = url.hostname.replace(/^www\./, '');

      // Check full domain and parent domains
      let matched = null;
      let matchedDomain = null;
      const parts = domain.split('.');
      for (let i = 0; i < parts.length - 1; i++) {
        const candidate = parts.slice(i).join('.');
        if (TRACKER_DB[candidate]) {
          matched = TRACKER_DB[candidate];
          matchedDomain = candidate;
          break;
        }
      }

      if (!matched) return;

      // Get tab info
      chrome.tabs.get(details.tabId, (tab) => {
        if (chrome.runtime.lastError) return;

        const event = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
          timestamp: Date.now(),
          domain: matchedDomain,
          tracker: matched,
          tabUrl: tab.url || '',
          tabTitle: tab.title || '',
          requestUrl: details.url,
          type: details.type,
          blocked: false
        };

        // Store in tab state
        if (!tabTrackers.has(details.tabId)) {
          tabTrackers.set(details.tabId, new Set());
        }
        if (!tabEvents.has(details.tabId)) {
          tabEvents.set(details.tabId, []);
        }

        const isNew = !tabTrackers.get(details.tabId).has(matchedDomain);
        tabTrackers.get(details.tabId).add(matchedDomain);
        tabEvents.get(details.tabId).push(event);

        // Update badge
        updateBadge(details.tabId);

        // Persist to storage
        persistEvent(event);

        // Alert on critical/high if new tracker
        if (isNew && (matched.severity === 'critical')) {
          showAlert(event, tab);
        }

        // Notify popup
        chrome.runtime.sendMessage({
          type: 'NEW_TRACKER',
          tabId: details.tabId,
          event
        }).catch(() => {});
      });
    } catch (e) {}
  },
  { urls: ["<all_urls>"] },
  ["requestBody"]
);

// ─── Badge Updates ────────────────────────────────────────────────────────────
function updateBadge(tabId) {
  const count = tabTrackers.has(tabId) ? tabTrackers.get(tabId).size : 0;
  const events = tabEvents.get(tabId) || [];

  // Determine badge color based on worst severity
  let color = '#4CAF50';
  for (const domain of (tabTrackers.get(tabId) || [])) {
    const t = TRACKER_DB[domain];
    if (!t) continue;
    if (t.severity === 'critical') { color = '#FF1744'; break; }
    if (t.severity === 'high') color = '#FF6D00';
    else if (t.severity === 'medium' && color === '#4CAF50') color = '#FFD600';
  }

  chrome.action.setBadgeText({ tabId, text: count > 0 ? String(count) : '' });
  chrome.action.setBadgeBackgroundColor({ tabId, color });
}

// ─── Tab Cleanup ──────────────────────────────────────────────────────────────
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'loading') {
    tabTrackers.delete(tabId);
    tabEvents.delete(tabId);
    chrome.action.setBadgeText({ tabId, text: '' });
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  tabTrackers.delete(tabId);
  tabEvents.delete(tabId);
});

// ─── Storage ──────────────────────────────────────────────────────────────────
async function persistEvent(event) {
  try {
    const today = new Date().toISOString().split('T')[0];
    const key = `events_${today}`;
    const result = await chrome.storage.local.get([key, 'total_trackers', 'daily_stats']);
    const events = result[key] || [];
    events.push({
      id: event.id,
      ts: event.timestamp,
      domain: event.domain,
      name: event.tracker.name,
      category: event.tracker.category,
      severity: event.tracker.severity,
      tabUrl: event.tabUrl
    });

    // Keep max 2000 events per day
    const trimmed = events.slice(-2000);

    // Update daily stats
    const stats = result.daily_stats || {};
    if (!stats[today]) stats[today] = { total: 0, unique: new Set(), topTrackers: {} };
    const dayStats = stats[today];
    dayStats.total = (dayStats.total || 0) + 1;

    const uniqueSet = new Set(dayStats.uniqueArr || []);
    uniqueSet.add(event.domain);
    dayStats.uniqueArr = [...uniqueSet];
    dayStats.unique = dayStats.uniqueArr.length;

    dayStats.topTrackers = dayStats.topTrackers || {};
    dayStats.topTrackers[event.tracker.name] = (dayStats.topTrackers[event.tracker.name] || 0) + 1;

    // Keep only last 30 days
    const allDays = Object.keys(stats).sort().slice(-30);
    const trimmedStats = {};
    for (const d of allDays) trimmedStats[d] = stats[d];

    await chrome.storage.local.set({
      [key]: trimmed,
      daily_stats: trimmedStats
    });
  } catch (e) {
    console.error('ShadowWatch storage error:', e);
  }
}

// ─── Notifications ────────────────────────────────────────────────────────────
function showAlert(event, tab) {
  chrome.notifications.create(`sw_${event.id}`, {
    type: 'basic',
    iconUrl: 'icons/icon48.png',
    title: `⚠️ ${event.tracker.name}`,
    message: `${event.tracker.description.slice(0, 100)}...`,
    contextMessage: `Detected on: ${new URL(tab.url || 'about:blank').hostname}`
  });
}

// ─── Daily Summary Alarm ──────────────────────────────────────────────────────
chrome.alarms.create('daily_summary', {
  when: getNext9PM(),
  periodInMinutes: 24 * 60
});

function getNext9PM() {
  const now = new Date();
  const target = new Date();
  target.setHours(21, 0, 0, 0);
  if (now >= target) target.setDate(target.getDate() + 1);
  return target.getTime();
}

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== 'daily_summary') return;

  const today = new Date().toISOString().split('T')[0];
  const result = await chrome.storage.local.get('daily_stats');
  const stats = result.daily_stats || {};
  const todayStats = stats[today];
  if (!todayStats || !todayStats.total) return;

  // Find top watcher
  const top = Object.entries(todayStats.topTrackers || {})
    .sort((a, b) => b[1] - a[1])[0];

  chrome.notifications.create('sw_daily', {
    type: 'basic',
    iconUrl: 'icons/icon48.png',
    title: '🔍 ShadowWatch Daily Report',
    message: `Today: ${todayStats.total} tracker events across ${todayStats.unique} unique trackers.${top ? ` Biggest watcher: ${top[0]} (${top[1]}x).` : ''}`,
    priority: 0
  });
});

// ─── Message Handler (from popup) ─────────────────────────────────────────────
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'GET_TAB_DATA') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id;
      if (!tabId) return sendResponse({ events: [], trackers: [] });

      const events = tabEvents.get(tabId) || [];
      const trackers = [...(tabTrackers.get(tabId) || [])].map(domain => ({
        domain,
        ...TRACKER_DB[domain]
      }));

      sendResponse({ events, trackers, score: calcScore(events) });
    });
    return true; // keep channel open
  }

  if (msg.type === 'GET_HISTORY') {
    getHistory().then(sendResponse);
    return true;
  }

  if (msg.type === 'GET_STATS') {
    chrome.storage.local.get('daily_stats', (r) => sendResponse(r.daily_stats || {}));
    return true;
  }

  if (msg.type === 'CLEAR_DATA') {
    chrome.storage.local.clear(() => sendResponse({ ok: true }));
    return true;
  }
});

async function getHistory() {
  const keys = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    keys.push(`events_${d.toISOString().split('T')[0]}`);
  }
  const result = await chrome.storage.local.get(keys);
  return result;
}

// ─── Fingerprint Detection Messages ───────────────────────────────────────────
chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type === 'FINGERPRINT_DETECTED') {
    if (!sender.tab) return;
    const tabId = sender.tab.id;

    const event = {
      id: `fp_${Date.now()}`,
      timestamp: Date.now(),
      domain: new URL(sender.tab.url || 'about:blank').hostname,
      tracker: {
        name: `Fingerprinting: ${msg.technique}`,
        parent: 'Unknown',
        category: 'fingerprinting',
        severity: 'critical',
        dataTypes: ['device fingerprint'],
        description: `This page is using ${msg.technique} fingerprinting to identify your device without cookies. This tracking method persists even if you clear cookies or use incognito mode.`,
        color: '#8E44AD'
      },
      tabUrl: sender.tab.url || '',
      type: 'fingerprint',
      blocked: false
    };

    if (!tabEvents.has(tabId)) tabEvents.set(tabId, []);
    tabEvents.get(tabId).push(event);

    if (!tabTrackers.has(tabId)) tabTrackers.set(tabId, new Set());
    tabTrackers.get(tabId).add(`fp_${msg.technique}`);

    updateBadge(tabId);

    chrome.runtime.sendMessage({
      type: 'NEW_TRACKER',
      tabId,
      event
    }).catch(() => {});
  }
});

console.log('ShadowWatch background worker started');
