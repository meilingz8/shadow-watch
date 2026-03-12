// ShadowWatch Content Script
// Detects fingerprinting techniques and other in-page surveillance

(function() {
  'use strict';

  const reported = new Set();

  function report(technique) {
    if (reported.has(technique)) return;
    reported.add(technique);
    chrome.runtime.sendMessage({
      type: 'FINGERPRINT_DETECTED',
      technique,
      url: window.location.href
    }).catch(() => {});
  }

  // ── Canvas Fingerprinting ──────────────────────────────────────────────────
  try {
    const origToDataURL = HTMLCanvasElement.prototype.toDataURL;
    const origGetImageData = CanvasRenderingContext2D.prototype.getImageData;

    HTMLCanvasElement.prototype.toDataURL = function(...args) {
      // Heuristic: fingerprinting usually calls toDataURL on a small canvas
      // with text or geometric shapes, not large visible content
      if (this.width < 500 && this.height < 200) {
        report('Canvas');
      }
      return origToDataURL.apply(this, args);
    };

    CanvasRenderingContext2D.prototype.getImageData = function(...args) {
      const canvas = this.canvas;
      if (canvas.width < 500 && canvas.height < 200) {
        report('Canvas');
      }
      return origGetImageData.apply(this, args);
    };
  } catch(e) {}

  // ── WebGL Fingerprinting ───────────────────────────────────────────────────
  try {
    const origGetParameter = WebGLRenderingContext.prototype.getParameter;
    let glParamCount = 0;

    WebGLRenderingContext.prototype.getParameter = function(param) {
      glParamCount++;
      // Fingerprinters typically call getParameter many times for hardware info
      if (glParamCount > 5) {
        report('WebGL');
      }
      return origGetParameter.apply(this, arguments);
    };

    // WebGL2
    if (typeof WebGL2RenderingContext !== 'undefined') {
      const origGetParameter2 = WebGL2RenderingContext.prototype.getParameter;
      WebGL2RenderingContext.prototype.getParameter = function() {
        glParamCount++;
        if (glParamCount > 5) report('WebGL');
        return origGetParameter2.apply(this, arguments);
      };
    }
  } catch(e) {}

  // ── Audio Fingerprinting ───────────────────────────────────────────────────
  try {
    const origCreateOscillator = AudioContext.prototype.createOscillator;
    const origCreateAnalyser = AudioContext.prototype.createAnalyser;

    AudioContext.prototype.createOscillator = function() {
      report('Audio');
      return origCreateOscillator.apply(this, arguments);
    };

    AudioContext.prototype.createAnalyser = function() {
      report('Audio');
      return origCreateAnalyser.apply(this, arguments);
    };
  } catch(e) {}

  // ── Font Fingerprinting ────────────────────────────────────────────────────
  // Detect rapid font enumeration via document.fonts
  try {
    if (document.fonts && document.fonts.check) {
      const origCheck = document.fonts.check.bind(document.fonts);
      let fontCheckCount = 0;
      let fontCheckTimer = null;

      document.fonts.check = function(font, text) {
        fontCheckCount++;
        clearTimeout(fontCheckTimer);
        fontCheckTimer = setTimeout(() => {
          if (fontCheckCount > 20) {
            report('Font enumeration');
          }
          fontCheckCount = 0;
        }, 1000);
        return origCheck(font, text);
      };
    }
  } catch(e) {}

  // ── Battery API Fingerprinting ─────────────────────────────────────────────
  try {
    if (navigator.getBattery) {
      const orig = navigator.getBattery.bind(navigator);
      navigator.getBattery = function() {
        report('Battery API');
        return orig();
      };
    }
  } catch(e) {}

  // ── Notification Permission Probing ───────────────────────────────────────
  try {
    const origQuery = Notification.requestPermission;
    if (origQuery) {
      // Just observe if permission API is invoked for fingerprinting
      // (checking status without permission is normal; requesting is tracked differently)
    }
  } catch(e) {}

})();
