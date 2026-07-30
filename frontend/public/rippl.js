/**
 * Rippl Tracking Pixel & Conversion Engine v3.0
 * Lightweight, zero-dependency affiliate attribution script for e-commerce and web platforms.
 * 
 * Usage:
 * <script src="https://your-domain.com/rippl.js" data-merchant-id="YOUR_MERCHANT_ID" data-api-host="http://localhost:8080"></script>
 * 
 * Manual Conversion Call:
 * Rippl.trackConversion({ orderId: "ORD-12345", orderValue: 25000 });
 */

(function (window, document) {
  'use strict';

  var COOKIE_NAME = 'rippl_ref_code';
  var STORAGE_KEY = 'rippl_attribution';
  var DEFAULT_API_HOST = 'http://localhost:8080';
  var DEFAULT_ATTRIBUTION_DAYS = 30;

  // Read dataset script config if available
  var currentScript = document.currentScript || (function () {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  var merchantId = currentScript ? currentScript.getAttribute('data-merchant-id') : null;
  var apiHost = (currentScript ? currentScript.getAttribute('data-api-host') : null) || window.RipplHost || DEFAULT_API_HOST;

  // Utility Functions
  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (encodeURIComponent(value) || "") + expires + "; path=/; SameSite=Lax";
  }

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
  }

  function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  function getQueryParam(param) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  function getStorageData() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function setStorageData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      // LocalStorage unavailable
    }
  }

  // Core Rippl SDK Implementation
  var Rippl = {
    version: '3.0.0',
    config: {
      merchantId: merchantId,
      apiHost: apiHost,
      cookieDays: DEFAULT_ATTRIBUTION_DAYS,
      autoTrackClicks: true
    },

    /**
     * Initialize the Rippl tracking script with custom config options
     */
    init: function (opts) {
      if (opts) {
        if (opts.merchantId) this.config.merchantId = opts.merchantId;
        if (opts.apiHost) this.config.apiHost = opts.apiHost.replace(/\/$/, '');
        if (opts.cookieDays) this.config.cookieDays = opts.cookieDays;
        if (typeof opts.autoTrackClicks !== 'undefined') this.config.autoTrackClicks = opts.autoTrackClicks;
      }

      if (this.config.autoTrackClicks) {
        this.processReferralParam();
      }

      return this;
    },

    /**
     * Inspect URL for referral parameters (?ref=, ?rippl_ref=, ?r=)
     */
    processReferralParam: function () {
      var code = getQueryParam('ref') || getQueryParam('rippl_ref') || getQueryParam('r');
      var utmSource = getQueryParam('utm_source') || 'referral_link';
      var utmMedium = getQueryParam('utm_medium') || 'affiliate';

      if (code) {
        var attributionData = {
          code: code,
          capturedAt: new Date().toISOString(),
          landingUrl: window.location.href,
          utmSource: utmSource,
          utmMedium: utmMedium
        };

        // Persist to cookie and localStorage
        setCookie(COOKIE_NAME, code, this.config.cookieDays);
        setStorageData(attributionData);

        // Notify backend of click
        this.logClick(code, utmSource, utmMedium);
      }
    },

    /**
     * Record a click event on the backend
     */
    logClick: function (code, utmSource, utmMedium) {
      var self = this;
      var endpoint = self.config.apiHost + '/api/referral/click';

      var payload = {
        code: code,
        utm_source: utmSource || 'referral_link',
        utm_medium: utmMedium || 'affiliate',
        ip: ''
      };

      if (typeof fetch === 'function') {
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(function (err) {
          console.warn('[Rippl Tracking] Click logging failed:', err);
        });
      }
    },

    /**
     * Get the active referral code stored in the browser
     */
    getRefCode: function () {
      var codeFromCookie = getCookie(COOKIE_NAME);
      if (codeFromCookie) return codeFromCookie;

      var storageData = getStorageData();
      return storageData ? storageData.code : null;
    },

    /**
     * Track a completed sale / conversion
     * @param {Object} data - Conversion details
     * @param {string} data.orderId - Unique merchant order reference
     * @param {number} data.orderValue - Total order amount in NGN (e.g. 15000)
     * @param {string} [data.referralCode] - Optional override referral code
     */
    trackConversion: function (data) {
      var self = this;

      return new Promise(function (resolve, reject) {
        if (!data || !data.orderId || typeof data.orderValue === 'undefined') {
          var err = new Error('[Rippl Tracking] orderId and orderValue are required fields');
          console.error(err.message);
          return reject(err);
        }

        var refCode = data.referralCode || self.getRefCode();

        if (!refCode) {
          console.info('[Rippl Tracking] No active referral attribution code found for this session.');
          return resolve({ status: 'no_referral', message: 'No referral code present' });
        }

        var endpoint = self.config.apiHost + '/api/pixel/conversion';
        var payload = {
          referral_code: refCode,
          order_id: String(data.orderId),
          order_value: Math.round(Number(data.orderValue)), // NGN
          ip: '',
          user_agent: navigator.userAgent || ''
        };

        if (typeof fetch !== 'function') {
          return reject(new Error('[Rippl Tracking] Fetch API not supported in browser environment'));
        }

        fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })
          .then(function (res) {
            if (!res.ok) {
              return res.json().then(function (errBody) {
                throw new Error(errBody.error || errBody.message || 'Conversion tracking failed');
              });
            }
            return res.json();
          })
          .then(function (result) {
            console.log('[Rippl Tracking] Conversion logged successfully:', result);
            resolve(result);
          })
          .catch(function (error) {
            console.error('[Rippl Tracking] Conversion tracking error:', error);
            reject(error);
          });
      });
    },

    /**
     * Clear stored referral attribution data
     */
    clear: function () {
      eraseCookie(COOKIE_NAME);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
    }
  };

  // Auto initialize on script load
  Rippl.init();

  // Expose to global scope
  window.Rippl = Rippl;

  // Dispatch custom event for async loaders
  try {
    var event = new CustomEvent('rippl:ready', { detail: Rippl });
    window.dispatchEvent(event);
  } catch (e) {}

})(window, document);
