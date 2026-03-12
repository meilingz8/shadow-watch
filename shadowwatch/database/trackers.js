// ShadowWatch Tracker Database
// Maps domains to tracker metadata
const TRACKER_DB = {
  // ── GOOGLE / ALPHABET ──────────────────────────────────────────────────────
  "doubleclick.net": { name: "Google Ads (DoubleClick)", parent: "Google", category: "advertising", severity: "high", dataTypes: ["browsing history", "location", "identity", "behavioral profile"], description: "Google's primary ad network. Tracks your browsing across millions of websites to build a detailed behavioral profile for targeted advertising.", color: "#EA4335" },
  "google-analytics.com": { name: "Google Analytics", parent: "Google", category: "analytics", severity: "medium", dataTypes: ["page views", "clicks", "device info", "rough location"], description: "The world's most widely deployed web analytics tool. Tracks your behavior on websites and sends data to Google's servers.", color: "#FBBC05" },
  "googletagmanager.com": { name: "Google Tag Manager", parent: "Google", category: "analytics", severity: "medium", dataTypes: ["all events on page", "custom data"], description: "A container that can load any number of tracking scripts. Often used to deploy other trackers without updating site code.", color: "#FBBC05" },
  "googlesyndication.com": { name: "Google AdSense", parent: "Google", category: "advertising", severity: "high", dataTypes: ["browsing context", "content interests", "behavioral data"], description: "Serves display ads based on your browsing behavior and the content you read.", color: "#EA4335" },
  "googleadservices.com": { name: "Google Ad Services", parent: "Google", category: "advertising", severity: "high", dataTypes: ["conversion data", "ad clicks", "purchase intent"], description: "Tracks ad conversions and remarketing. Knows when you click an ad and what you do afterward.", color: "#EA4335" },
  "gstatic.com": { name: "Google Static", parent: "Google", category: "cdn", severity: "low", dataTypes: ["IP address", "request timing"], description: "Google's CDN for static resources. Low risk but confirms Google knows you visited.", color: "#4285F4" },
  "googleapis.com": { name: "Google APIs", parent: "Google", category: "infrastructure", severity: "low", dataTypes: ["API requests", "usage patterns"], description: "Google's API infrastructure. Used for maps, fonts, and authentication.", color: "#4285F4" },
  "google.com": { name: "Google", parent: "Google", category: "search/analytics", severity: "medium", dataTypes: ["search queries", "click behavior", "identity"], description: "Core Google services. Tracks search behavior and cross-references with your Google account.", color: "#4285F4" },

  // ── META / FACEBOOK ────────────────────────────────────────────────────────
  "facebook.com": { name: "Facebook", parent: "Meta", category: "social", severity: "high", dataTypes: ["identity", "social graph", "content interests", "purchase behavior"], description: "Meta's core social platform. Even non-users are tracked via the Facebook Pixel deployed on millions of sites.", color: "#1877F2" },
  "fbcdn.net": { name: "Facebook CDN", parent: "Meta", category: "social", severity: "medium", dataTypes: ["IP address", "content requests"], description: "Facebook's content delivery network. Indicates Meta infrastructure is active on this page.", color: "#1877F2" },
  "connect.facebook.net": { name: "Facebook Connect / Pixel", parent: "Meta", category: "advertising", severity: "critical", dataTypes: ["page views", "purchases", "sign-ups", "browsing behavior", "device fingerprint"], description: "The infamous Facebook Pixel. Sends highly detailed behavioral data to Facebook, including purchases and form fills, even if you're not logged in.", color: "#E91E63" },
  "instagram.com": { name: "Instagram", parent: "Meta", category: "social", severity: "high", dataTypes: ["browsing behavior", "interests", "shopping behavior"], description: "Meta's photo/video platform. Shares data across the Meta ecosystem including Facebook and WhatsApp.", color: "#E1306C" },
  "atdmt.com": { name: "Atlas (Meta)", parent: "Meta", category: "advertising", severity: "high", dataTypes: ["cross-site identity", "ad performance", "purchase behavior"], description: "Meta's cross-device ad measurement platform. Links your identity across devices.", color: "#E91E63" },

  // ── AMAZON ─────────────────────────────────────────────────────────────────
  "amazon-adsystem.com": { name: "Amazon DSP / Advertising", parent: "Amazon", category: "advertising", severity: "high", dataTypes: ["purchase history", "browsing behavior", "product interests"], description: "Amazon's ad network. Uses your shopping history to target you across the web, not just on Amazon.", color: "#FF9900" },
  "adsrvr.org": { name: "The Trade Desk", parent: "The Trade Desk", category: "advertising", severity: "high", dataTypes: ["cross-site browsing", "behavioral profile", "device fingerprint"], description: "One of the largest independent demand-side platforms. Tracks you across thousands of websites to build advertising profiles.", color: "#FF6B35" },
  "advertising.com": { name: "AOL Advertising", parent: "Verizon Media", category: "advertising", severity: "high", dataTypes: ["browsing behavior", "demographics", "interests"], description: "Verizon's advertising network operating across a wide range of publisher sites.", color: "#FF6600" },

  // ── MICROSOFT ──────────────────────────────────────────────────────────────
  "clarity.ms": { name: "Microsoft Clarity", parent: "Microsoft", category: "analytics", severity: "high", dataTypes: ["mouse movements", "scroll behavior", "clicks", "session recordings", "rage clicks"], description: "Records your entire browsing session including mouse movements and what you type. Creates heatmaps and session replays.", color: "#0078D4" },
  "bing.com": { name: "Microsoft Bing Ads", parent: "Microsoft", category: "advertising", severity: "medium", dataTypes: ["search behavior", "ad clicks", "browsing context"], description: "Microsoft's advertising network. Tracks ad clicks and browsing to measure campaign performance.", color: "#0078D4" },
  "bat.bing.com": { name: "Bing Universal Event Tracking", parent: "Microsoft", category: "advertising", severity: "high", dataTypes: ["conversions", "purchases", "sign-ups", "page visits"], description: "Tracks your actions on websites running Microsoft Ads — purchases, form submissions, and more.", color: "#0078D4" },

  // ── TWITTER / X ────────────────────────────────────────────────────────────
  "twitter.com": { name: "X (Twitter)", parent: "X Corp", category: "social", severity: "medium", dataTypes: ["browsing context", "identity", "interests"], description: "Twitter/X embeds and widgets that track users browsing pages with Twitter content.", color: "#1DA1F2" },
  "ads-twitter.com": { name: "Twitter Ads", parent: "X Corp", category: "advertising", severity: "high", dataTypes: ["ad clicks", "website visits", "purchase behavior"], description: "Twitter's advertising and conversion tracking platform.", color: "#1DA1F2" },
  "t.co": { name: "Twitter Link Shortener", parent: "X Corp", category: "analytics", severity: "medium", dataTypes: ["click timing", "location", "device info"], description: "Every t.co link click is logged by Twitter, recording what you clicked and when.", color: "#1DA1F2" },

  // ── TIKTOK / BYTEDANCE ─────────────────────────────────────────────────────
  "tiktok.com": { name: "TikTok", parent: "ByteDance", category: "social", severity: "critical", dataTypes: ["browsing behavior", "device fingerprint", "location", "content interests", "identity"], description: "ByteDance's platform has broad tracking capabilities. Has faced significant regulatory scrutiny for data practices.", color: "#FE2C55" },
  "analytics.tiktok.com": { name: "TikTok Analytics", parent: "ByteDance", category: "analytics", severity: "critical", dataTypes: ["page views", "conversions", "device info", "behavior"], description: "TikTok's pixel for web. Tracks behavior on sites outside TikTok and links to TikTok identity profiles.", color: "#FE2C55" },

  // ── DATA BROKERS ───────────────────────────────────────────────────────────
  "acxiom.com": { name: "Acxiom", parent: "IPG", category: "data_broker", severity: "critical", dataTypes: ["personal identity", "financial data", "purchase history", "demographics", "location history"], description: "One of the largest data brokers in the world. Maintains profiles on billions of people including income, purchasing habits, and life events.", color: "#C0392B" },
  "liveramp.com": { name: "LiveRamp", parent: "LiveRamp", category: "data_broker", severity: "critical", dataTypes: ["identity graph", "cross-device links", "purchase data", "location"], description: "A data connectivity company that links your identity across devices, apps, and data providers — creating a unified surveillance profile.", color: "#C0392B" },
  "experian.com": { name: "Experian Marketing", parent: "Experian", category: "data_broker", severity: "critical", dataTypes: ["credit behavior", "financial profile", "demographics", "purchase history"], description: "Beyond credit scores, Experian sells detailed consumer profiles including financial behavior to marketers.", color: "#C0392B" },
  "epsilon.com": { name: "Epsilon Data", parent: "Publicis", category: "data_broker", severity: "critical", dataTypes: ["purchase history", "demographics", "life events", "behavioral data"], description: "A major data marketing company. Aggregates consumer data from hundreds of sources to build targetable profiles.", color: "#C0392B" },
  "neustar.biz": { name: "Neustar", parent: "TransUnion", category: "data_broker", severity: "critical", dataTypes: ["identity resolution", "device graph", "location", "financial behavior"], description: "Identity resolution and data enrichment company. Links anonymous users to real identities.", color: "#C0392B" },
  "datalogix.com": { name: "Oracle DataLogix", parent: "Oracle", category: "data_broker", severity: "critical", dataTypes: ["offline purchase data", "loyalty programs", "CPG behavior"], description: "Connects your offline purchase behavior (from loyalty cards) to your online identity for targeting.", color: "#C0392B" },

  // ── AD EXCHANGES ───────────────────────────────────────────────────────────
  "rubiconproject.com": { name: "Rubicon Project / Magnite", parent: "Magnite", category: "adtech", severity: "high", dataTypes: ["browsing context", "auction data", "behavioral segment"], description: "A major programmatic advertising exchange. Your browser data is sold in real-time auctions to the highest bidder.", color: "#E74C3C" },
  "openx.com": { name: "OpenX", parent: "OpenX", category: "adtech", severity: "high", dataTypes: ["ad auction data", "behavioral profile", "browsing context"], description: "An independent ad exchange running real-time bidding auctions using your browsing data.", color: "#E74C3C" },
  "pubmatic.com": { name: "PubMatic", parent: "PubMatic", category: "adtech", severity: "high", dataTypes: ["bid stream data", "identity", "browsing behavior"], description: "A digital advertising platform. Participates in real-time bidding, exposing your data to hundreds of buyers.", color: "#E74C3C" },
  "appnexus.com": { name: "Xandr (AppNexus)", parent: "Microsoft", category: "adtech", severity: "high", dataTypes: ["cross-site identity", "behavioral data", "ad performance"], description: "Microsoft's programmatic advertising platform. One of the largest ad tech stacks in existence.", color: "#E74C3C" },
  "criteo.com": { name: "Criteo", parent: "Criteo", category: "advertising", severity: "high", dataTypes: ["shopping behavior", "product views", "cart abandonment", "purchase intent"], description: "Retargeting specialist. Follows you across the web showing ads for products you've viewed — even after you leave a site.", color: "#FF6B35" },
  "taboola.com": { name: "Taboola", parent: "Taboola", category: "advertising", severity: "medium", dataTypes: ["content interests", "scroll behavior", "click behavior"], description: "Content recommendation and native advertising network. Tracks what articles you read and click.", color: "#FF6B35" },
  "outbrain.com": { name: "Outbrain", parent: "Outbrain", category: "advertising", severity: "medium", dataTypes: ["content interests", "reading behavior", "click patterns"], description: "Content discovery and native advertising platform. Builds interest profiles based on what content you engage with.", color: "#FF6B35" },

  // ── ANALYTICS PLATFORMS ────────────────────────────────────────────────────
  "segment.com": { name: "Segment (Twilio)", parent: "Twilio", category: "analytics", severity: "high", dataTypes: ["user events", "identity", "cross-platform behavior", "custom events"], description: "A customer data platform that collects every user action and routes it to dozens of other marketing and analytics tools.", color: "#52BD95" },
  "mixpanel.com": { name: "Mixpanel", parent: "Mixpanel", category: "analytics", severity: "medium", dataTypes: ["user events", "funnels", "retention", "feature usage"], description: "Product analytics tool that tracks detailed user interactions and builds engagement profiles.", color: "#7856FF" },
  "amplitude.com": { name: "Amplitude", parent: "Amplitude", category: "analytics", severity: "medium", dataTypes: ["user events", "behavioral flows", "cohort data"], description: "Behavioral analytics platform tracking how users interact with products and websites.", color: "#2962FF" },
  "hotjar.com": { name: "Hotjar", parent: "Hotjar", category: "analytics", severity: "high", dataTypes: ["session recordings", "heatmaps", "mouse movements", "form inputs", "scroll depth"], description: "Records your actual screen session — mouse movements, clicks, and scrolling. Your entire visit is potentially recorded.", color: "#F9423A" },
  "fullstory.com": { name: "FullStory", parent: "FullStory", category: "analytics", severity: "high", dataTypes: ["full session recordings", "DOM snapshots", "all user interactions", "form data"], description: "Records everything you do on a website — a complete session replay. Can capture form inputs if not properly masked.", color: "#F03030" },
  "logrocket.com": { name: "LogRocket", parent: "LogRocket", category: "analytics", severity: "high", dataTypes: ["session replay", "network requests", "console logs", "user actions"], description: "Developer-focused session recording. Captures complete user sessions including network activity.", color: "#764ABC" },
  "heap.io": { name: "Heap Analytics", parent: "Heap", category: "analytics", severity: "medium", dataTypes: ["all user interactions", "retroactive events", "user journeys"], description: "Auto-captures every user interaction without pre-configuration — every click, swipe, and input.", color: "#6E2FFF" },

  // ── FINGERPRINTING / IDENTITY ──────────────────────────────────────────────
  "fingerprintjs.com": { name: "FingerprintJS", parent: "Fingerprint", category: "fingerprinting", severity: "critical", dataTypes: ["device fingerprint", "browser attributes", "persistent identity"], description: "Specialized device fingerprinting service. Creates a unique persistent identifier for your device without cookies — harder to evade than cookies.", color: "#E53E3E" },
  "iovation.com": { name: "iovation (TransUnion)", parent: "TransUnion", category: "fingerprinting", severity: "critical", dataTypes: ["device fingerprint", "behavioral biometrics", "fraud signals"], description: "Device identity and fraud detection. Creates persistent device fingerprints linked to financial identity data.", color: "#E53E3E" },
  "threatmetrix.com": { name: "ThreatMetrix (LexisNexis)", parent: "LexisNexis", category: "fingerprinting", severity: "critical", dataTypes: ["device fingerprint", "network identity", "behavioral biometrics"], description: "Cybersecurity and identity platform collecting extensive device and behavioral data for fraud detection — and marketing.", color: "#E53E3E" },

  // ── CDNs / INFRASTRUCTURE ──────────────────────────────────────────────────
  "cloudflare.com": { name: "Cloudflare", parent: "Cloudflare", category: "cdn", severity: "low", dataTypes: ["IP address", "request metadata"], description: "CDN and security provider. Sees traffic passing through but has strict privacy policies.", color: "#F38020" },
  "fastly.com": { name: "Fastly CDN", parent: "Fastly", category: "cdn", severity: "low", dataTypes: ["IP address", "request timing"], description: "Content delivery network. Minimal tracking, primarily performance infrastructure.", color: "#FF282D" },
  "akamai.com": { name: "Akamai", parent: "Akamai", category: "cdn", severity: "low", dataTypes: ["IP address", "traffic patterns"], description: "Large CDN provider. Generally low risk for end-user privacy.", color: "#009BDE" },

  // ── AFFILIATE / COMMERCE ───────────────────────────────────────────────────
  "shareasale.com": { name: "ShareASale", parent: "Awin", category: "affiliate", severity: "medium", dataTypes: ["click attribution", "purchase tracking", "referral data"], description: "Affiliate marketing network. Tracks product clicks and purchases for commission attribution.", color: "#FF7043" },
  "linksynergy.com": { name: "Rakuten Advertising", parent: "Rakuten", category: "affiliate", severity: "medium", dataTypes: ["click data", "purchase history", "referral chains"], description: "Affiliate and performance marketing. Monitors purchase behavior across the affiliate network.", color: "#BF0000" },
  "skimresources.com": { name: "Skimlinks", parent: "Taboola", category: "affiliate", severity: "medium", dataTypes: ["link clicks", "purchase intent", "browsing context"], description: "Automatically converts links into affiliate links. Tracks which products you click and purchase.", color: "#FF6B35" },

  // ── EMAIL / CRM TRACKING ───────────────────────────────────────────────────
  "intercom.io": { name: "Intercom", parent: "Intercom", category: "crm", severity: "medium", dataTypes: ["user identity", "page visits", "customer journey", "support interactions"], description: "Customer messaging platform. Tracks logged-in users across your product journey and links to CRM data.", color: "#286EFA" },
  "hubspot.com": { name: "HubSpot", parent: "HubSpot", category: "crm", severity: "medium", dataTypes: ["identity", "page visits", "form submissions", "email engagement"], description: "CRM and marketing platform. Tracks visitor behavior and links anonymous visitors to known contacts.", color: "#FF7A59" },
  "marketo.com": { name: "Adobe Marketo", parent: "Adobe", category: "crm", severity: "high", dataTypes: ["identity resolution", "behavioral data", "lead scoring", "email tracking"], description: "Enterprise marketing automation. Builds detailed behavioral profiles and links anonymous web visitors to real identities.", color: "#5C67F2" },
  "pardot.com": { name: "Salesforce Pardot", parent: "Salesforce", category: "crm", severity: "high", dataTypes: ["identity", "lead behavior", "email opens", "page visits"], description: "Salesforce's B2B marketing automation. Tracks prospects across the web and scores buying intent.", color: "#00A1E0" },

  // ── SOCIAL / SHARE BUTTONS ─────────────────────────────────────────────────
  "addthis.com": { name: "AddThis", parent: "Oracle", category: "social", severity: "high", dataTypes: ["browsing history", "social sharing behavior", "identity"], description: "Social sharing buttons that track your browsing across all sites using AddThis widgets — even without clicking.", color: "#FF6600" },
  "sharethis.com": { name: "ShareThis", parent: "ShareThis", category: "social", severity: "medium", dataTypes: ["sharing behavior", "browsing context", "social identity"], description: "Social share buttons. Tracks which content you share and collects browsing data.", color: "#95D03A" },
  "disqus.com": { name: "Disqus", parent: "Zeta Global", category: "social", severity: "high", dataTypes: ["browsing history", "comment behavior", "identity", "cross-site profile"], description: "Commenting platform that tracks you across all sites using Disqus — building a comprehensive profile of what you read and engage with.", color: "#2E9FFF" },

  // ── ADDITIONAL HIGH-RISK ────────────────────────────────────────────────────
  "quantserve.com": { name: "Quantcast", parent: "Quantcast", category: "advertising", severity: "high", dataTypes: ["audience measurement", "cross-site identity", "behavioral segments"], description: "Audience measurement and programmatic advertising. Tracks browsing to build demographic and psychographic profiles.", color: "#E74C3C" },
  "scorecardresearch.com": { name: "Scorecard Research", parent: "Comscore", category: "analytics", severity: "medium", dataTypes: ["page views", "audience metrics", "browsing behavior"], description: "Comscore's audience measurement panel. Tracks browsing for media measurement purposes.", color: "#F39C12" },
  "comscore.com": { name: "Comscore", parent: "Comscore", category: "analytics", severity: "medium", dataTypes: ["audience data", "content consumption", "cross-device behavior"], description: "Media measurement company tracking content consumption across devices and platforms.", color: "#F39C12" },
  "moatads.com": { name: "Moat (Oracle)", parent: "Oracle", category: "analytics", severity: "medium", dataTypes: ["ad viewability", "attention data", "scroll behavior"], description: "Ad verification and attention analytics. Tracks how you interact with ads including dwell time and hover patterns.", color: "#F39C12" },
  "nr-data.net": { name: "New Relic", parent: "New Relic", category: "analytics", severity: "low", dataTypes: ["performance data", "error events", "page timing"], description: "Application performance monitoring. Primarily technical data, lower privacy risk.", color: "#008C99" },
  "sentry.io": { name: "Sentry", parent: "Sentry", category: "analytics", severity: "low", dataTypes: ["error reports", "stack traces", "browser info"], description: "Error tracking. Sends crash reports to developers. Low privacy risk but collects browser details.", color: "#362D59" },
  "optimizely.com": { name: "Optimizely", parent: "Optimizely", category: "analytics", severity: "medium", dataTypes: ["A/B test assignment", "user behavior", "conversion events"], description: "A/B testing and personalization. You may be in experiments determining what content you see.", color: "#0037FF" },
  "vwo.com": { name: "Visual Website Optimizer", parent: "Wingify", category: "analytics", severity: "medium", dataTypes: ["A/B test variants", "click behavior", "conversion tracking"], description: "Another A/B testing platform. Tracks your behavior to measure experiment outcomes.", color: "#F6A623" },
  "yandex.ru": { name: "Yandex Metrica", parent: "Yandex", category: "analytics", severity: "high", dataTypes: ["session recordings", "heatmaps", "behavioral data"], description: "Russia-based analytics with session recording capabilities. Data subject to Russian jurisdiction.", color: "#FFCC00" },
  "baidu.com": { name: "Baidu Analytics", parent: "Baidu", category: "analytics", severity: "high", dataTypes: ["browsing behavior", "identity", "search data"], description: "China-based analytics and advertising. Data subject to Chinese jurisdiction and data laws.", color: "#2932E1" }
};

// Category metadata
const CATEGORIES = {
  advertising: { label: "Advertising", icon: "📢", color: "#E74C3C", description: "Collects data to serve and measure targeted ads" },
  analytics: { label: "Analytics", icon: "📊", color: "#F39C12", description: "Tracks behavior to measure and optimize user experience" },
  data_broker: { label: "Data Broker", icon: "🗃️", color: "#C0392B", description: "Buys and sells personal data profiles" },
  fingerprinting: { label: "Fingerprinting", icon: "👆", color: "#8E44AD", description: "Creates persistent device identifiers that survive cookie deletion" },
  social: { label: "Social", icon: "🔗", color: "#3498DB", description: "Social media tracking and share button surveillance" },
  adtech: { label: "Ad Exchange", icon: "⚡", color: "#E67E22", description: "Real-time bidding on your behavioral data" },
  crm: { label: "CRM / Marketing", icon: "📧", color: "#27AE60", description: "Customer relationship and email marketing tracking" },
  affiliate: { label: "Affiliate", icon: "🛍️", color: "#E91E63", description: "Purchase and click tracking for commission" },
  cdn: { label: "CDN / Infrastructure", icon: "🌐", color: "#95A5A6", description: "Content delivery - generally low privacy risk" },
  infrastructure: { label: "Infrastructure", icon: "⚙️", color: "#95A5A6", description: "Technical infrastructure with minimal tracking" }
};

const SEVERITY_LEVELS = {
  critical: { label: "Critical", color: "#FF1744", bg: "rgba(255,23,68,0.15)", description: "Highest risk: extensive data collection, data broker, or fingerprinting" },
  high: { label: "High", color: "#FF6D00", bg: "rgba(255,109,0,0.15)", description: "Significant data collection across many sites" },
  medium: { label: "Medium", color: "#FFD600", bg: "rgba(255,214,0,0.15)", description: "Moderate tracking, common analytics or social" },
  low: { label: "Low", color: "#00E676", bg: "rgba(0,230,118,0.15)", description: "Minimal user privacy impact" }
};

if (typeof module !== 'undefined') module.exports = { TRACKER_DB, CATEGORIES, SEVERITY_LEVELS };

// ES Module export for Chrome extension service worker
export { TRACKER_DB, CATEGORIES, SEVERITY_LEVELS };
