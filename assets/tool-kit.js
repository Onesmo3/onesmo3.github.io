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
    fileStamp: fileStamp
  };
})();
