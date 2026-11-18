/* ==========================================================
   MbiseCAD — tool-kit.js
   Vifaa vya pamoja kwa calculators zote za Civil Lab Tools:
   kuhifadhi (localStorage), export (CSV/JSON) na print report.

   Tumia: <script src="../assets/shared.js"></script>
          <script src="../assets/tool-kit.js"></script>
   Kisha: MbiseTool.store('moisture').save({...})
   ========================================================== */
window.MbiseTool = (function () {
  'use strict';

  /* ---------- storage: hifadhi ya data ya mtihani ---------- */
  function storageKey(ns) {
    return 'mbisecad-' + String(ns);
  }

  function store(ns) {
    var key = storageKey(ns);
    return {
      load: function (fallback) {
        try {
          var raw = localStorage.getItem(key);
          if (raw === null) return fallback === undefined ? null : fallback;
          var value = JSON.parse(raw);
          return value === null || value === undefined
            ? (fallback === undefined ? null : fallback)
            : value;
        } catch (e) {
          return fallback === undefined ? null : fallback;
        }
      },
      save: function (data) {
        try {
          localStorage.setItem(key, JSON.stringify(data));
          return true;
        } catch (e) {
          return false;
        }
      },
      clear: function () {
        try { localStorage.removeItem(key); } catch (e) {}
      }
    };
  }

  /* ---------- utilities ---------- */
  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function fmt(value, decimals) {
    var d = decimals === undefined ? 2 : decimals;
    if (typeof value !== 'number' || !isFinite(value)) return '—';
    var s = value.toFixed(d);
    if (/^-0(\.0*)?$/.test(s)) s = s.slice(1);
    return s;
  }

  function debounce(fn, wait) {
    var timer = null;
    var ms = wait === undefined ? 400 : wait;
    return function () {
      var args = arguments, self = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(self, args); }, ms);
    };
  }

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function dateStamp(date) {
    var d = date || new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function fileStamp(date) {
    var d = date || new Date();
    return dateStamp(d).replace(/-/g, '');
  }

  /* ---------- downloads ---------- */
  function download(filename, text, mime) {
    try {
      var blob = new Blob([text], { type: mime || 'text/plain;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
      return true;
    } catch (e) {
      return false;
    }
  }

  function csvCell(value) {
    var s = value === null || value === undefined ? '' : String(value);
    if (/[",\r\n]/.test(s)) s = '"' + s.replace(/"/g, '""') + '"';
    return s;
  }

  /* rows: safu za safu, mf. [['Sample','w (%)'],['S1',12.3]] */
  function exportCSV(filename, rows) {
    var body = (rows || []).map(function (row) {
      return row.map(csvCell).join(',');
    }).join('\r\n');
    /* BOM ili Excel isongeza herufi za Kiswahili vizuri */
    return download(filename, '\uFEFF' + body + '\r\n', 'text/csv;charset=utf-8');
  }

  function exportJSON(filename, data) {
    return download(filename, JSON.stringify(data, null, 2), 'application/json;charset=utf-8');
  }

  /* ---------- print report ---------- */
  /* opts: {title, meta:[...], subtitle} — meta inaweza kuwa mistari ya maelezo */
  function printReport(opts) {
    var o = opts || {};
    var box = document.getElementById('printHead');
    if (!box) {
      box = document.createElement('div');
      box.id = 'printHead';
      box.className = 'print-head';
      document.body.insertBefore(box, document.body.firstChild);
    }
    var title = escapeHTML(o.title || document.title);
    var meta = (o.meta || []).filter(function (m) {
      return m !== null && m !== undefined && String(m).trim() !== '';
    });
    if (!meta.length) meta = ['MbiseCAD · Civil Lab Tools', 'Printed ' + dateStamp()];
    else meta.push('Printed ' + dateStamp());
    box.innerHTML = '<h1>' + title + '</h1><div class="meta">' +
      meta.map(function (m) { return '<div>' + escapeHTML(m) + '</div>'; }).join('') +
      '</div>';
    window.print();
  }

  /* ---------- template-faithful report helpers ---------- */
  var LOGO_KEY = 'mbisecad-report-logos';
  var SAMPLE_KEY = 'mbisecad-sample-register';

  function defaultLogos() {
    return {
      contractor: '../assets/report/contractor.png',
      client: '../assets/report/client.png',
      consultant: '../assets/report/consultant.jpeg'
    };
  }

  function logos() {
    var out = defaultLogos();
    try {
      var raw = localStorage.getItem(LOGO_KEY);
      if (!raw) return out;
      var saved = JSON.parse(raw);
      if (!saved || typeof saved !== 'object') return out;
      Object.keys(out).forEach(function (role) {
        if (typeof saved[role] === 'string' && saved[role].trim() !== '') out[role] = saved[role];
      });
    } catch (e) {}
    return out;
  }

  function saveLogo(role, dataUrl) {
    if (!/^(contractor|client|consultant)$/.test(role) || typeof dataUrl !== 'string') return false;
    var all = logos();
    all[role] = dataUrl;
    try { localStorage.setItem(LOGO_KEY, JSON.stringify(all)); return true; } catch (e) { return false; }
  }

  function clearLogos() {
    try { localStorage.removeItem(LOGO_KEY); } catch (e) {}
    return defaultLogos();
  }

  function logoBand() {
    var L = logos(), roles = ['contractor', 'client', 'consultant'];
    return '<div class="rpt-logos">' + roles.map(function (role) {
      return '<img src="' + escapeHTML(L[role]) + '" alt="' + role + ' logo">';
    }).join('') + '</div>';
  }

  /* Sample master: NMC owns the shared identity fields. */
  function samples() {
    try {
      var raw = localStorage.getItem(SAMPLE_KEY);
      var value = raw ? JSON.parse(raw) : null;
      return value && typeof value === 'object' ? value : {};
    } catch (e) { return {}; }
  }

  function sample(no) {
    if (!no) return null;
    var all = samples(), key = String(no).trim();
    return all[key] || null;
  }

  function saveSample(no, fields) {
    if (!no || !fields || typeof fields !== 'object') return false;
    var all = samples(), key = String(no).trim();
    var prev = all[key] && typeof all[key] === 'object' ? all[key] : {};
    Object.keys(fields).forEach(function (k) {
      var v = fields[k];
      if (typeof v === 'string' || typeof v === 'number') prev[k] = String(v);
    });
    prev.updated = dateStamp();
    all[key] = prev;
    try { localStorage.setItem(SAMPLE_KEY, JSON.stringify(all)); return true; } catch (e) { return false; }
  }

  /* map: canonical key -> local info key. Shared fields are read-only unless sampleOverride === '1'. */
  function linkSample(info, no, map) {
    var rec = sample(no);
    var linked = !!(rec && info && info.sampleOverride !== '1');
    if (!linked || !info || !map) return { record: rec, linked: linked };
    Object.keys(map).forEach(function (canonical) {
      var local = map[canonical];
      var value = rec[canonical];
      if (local && value !== undefined && value !== null && String(value) !== '') info[local] = String(value);
    });
    return { record: rec, linked: linked };
  }

  function saveSampleFrom(info, no, map) {
    if (!info || !no || !map) return false;
    var fields = {};
    Object.keys(map).forEach(function (canonical) {
      var local = map[canonical];
      if (local) fields[canonical] = String(info[local] == null ? '' : info[local]);
    });
    return saveSample(no, fields);
  }

  function dateDisplay(iso) {
    var s = String(iso == null ? '' : iso).trim();
    if (!s) return '';
    var p = s.split('-');
    if (p.length === 3 && /^\d{4}$/.test(p[0])) return p[2] + '/' + p[1] + '/' + p[0];
    return s;
  }

  function canvasImage(id) {
    var c = document.getElementById(id);
    if (!c || typeof c.toDataURL !== 'function') return '';
    try { return c.toDataURL('image/png'); } catch (e) { return ''; }
  }

  function printSheet(html) {
    var box = document.getElementById('printSheet');
    if (!box) {
      box = document.createElement('div');
      box.id = 'printSheet';
      box.className = 'print-sheet';
      document.body.appendChild(box);
    }
    box.innerHTML = html || '';
    window.print();
    return box;
  }

  function readLogoFile(file, done) {
    if (!file || typeof FileReader === 'undefined' || typeof Image === 'undefined') {
      done(null);
      return;
    }
    var reader = new FileReader();
    reader.onload = function () {
      var img = new Image();
      img.onload = function () {
        try {
          var maxW = 600, maxH = 200;
          var scale = Math.min(1, maxW / (img.width || 1), maxH / (img.height || 1));
          var c = document.createElement('canvas');
          c.width = Math.max(1, Math.round((img.width || 1) * scale));
          c.height = Math.max(1, Math.round((img.height || 1) * scale));
          var ctx = c.getContext('2d');
          if (ctx) ctx.drawImage(img, 0, 0, c.width, c.height);
          done(c.toDataURL('image/png'));
        } catch (e) { done(null); }
      };
      img.onerror = function () { done(null); };
      img.src = reader.result;
    };
    reader.onerror = function () { done(null); };
    reader.readAsDataURL(file);
  }

  function mountLogoSetup(hostId, onChange) {
    var host = document.getElementById(hostId);
    if (!host) return;
    var L = logos();
    host.className = 'tool stack editor-only report-setup';
    host.innerHTML = '<h3>Report letterhead</h3>' +
      '<p class="hint">Upload the contractor, client and consultant logos. They are stored in this browser and used at the top of every printable soil report. Leave unchanged to use the logos from the Excel template.</p>' +
      '<div class="fields compact mt">' +
      ['contractor', 'client', 'consultant'].map(function (role) {
        var label = role.charAt(0).toUpperCase() + role.slice(1);
        return '<div class="field"><label for="logo-' + role + '">' + label + ' logo</label>' +
          '<input id="logo-' + role + '" type="file" accept="image/*" data-logo-role="' + role + '">' +
          '<img class="logo-preview" data-logo-preview="' + role + '" src="' + escapeHTML(L[role]) + '" alt="' + label + ' logo preview"></div>';
      }).join('') + '</div>' +
      '<div class="actions"><button class="btn secondary" id="logosReset" type="button">Use template logos</button></div>' +
      '<p class="hint" id="logoStatus"></p>';
    Array.prototype.forEach.call(host.querySelectorAll('[data-logo-role]'), function (input) {
      input.addEventListener('change', function () {
        var role = input.getAttribute('data-logo-role'), file = input.files && input.files[0];
        if (!file) return;
        readLogoFile(file, function (dataUrl) {
          var status = document.getElementById('logoStatus');
          if (!dataUrl) { if (status) status.textContent = 'Could not read that image.'; return; }
          if (saveLogo(role, dataUrl)) {
            var preview = host.querySelector('[data-logo-preview="' + role + '"]');
            if (preview) preview.src = dataUrl;
            if (status) status.textContent = labelName(role) + ' logo saved in this browser.';
            if (typeof onChange === 'function') onChange(role);
          } else if (status) status.textContent = 'Browser storage is full — use a smaller image.';
        });
      });
    });
    var reset = host.querySelector('#logosReset');
    if (reset) reset.addEventListener('click', function () {
      var fresh = clearLogos();
      Array.prototype.forEach.call(host.querySelectorAll('[data-logo-preview]'), function (img) {
        img.src = fresh[img.getAttribute('data-logo-preview')];
      });
      Array.prototype.forEach.call(host.querySelectorAll('[data-logo-role]'), function (input) { input.value = ''; });
      var status = document.getElementById('logoStatus');
      if (status) status.textContent = 'Template logos restored.';
      if (typeof onChange === 'function') onChange('reset');
    });
  }

  function labelName(role) {
    return role.charAt(0).toUpperCase() + role.slice(1);
  }

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  return {
    store: store,
    debounce: debounce,
    escapeHTML: escapeHTML,
    fmt: fmt,
    download: download,
    exportCSV: exportCSV,
    exportJSON: exportJSON,
    printReport: printReport,
    onReady: onReady,
    dateStamp: dateStamp,
    fileStamp: fileStamp,
    logos: logos,
    saveLogo: saveLogo,
    clearLogos: clearLogos,
    logoBand: logoBand,
    mountLogoSetup: mountLogoSetup,
    samples: samples,
    sample: sample,
    saveSample: saveSample,
    linkSample: linkSample,
    saveSampleFrom: saveSampleFrom,
    dateDisplay: dateDisplay,
    canvasImage: canvasImage,
    printSheet: printSheet
  };
})();
