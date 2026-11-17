/* ==========================================================
   MbiseCAD — Civil Lab Tools · shared.js
   Theme toggle + mwaka wa footer kwa kurasa zote.
   Pakia kwa: <script src="../assets/shared.js"></script>
   (kwenye hub: <script src="assets/shared.js"></script>)
   ========================================================== */
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('themeBtn');

  function setTheme(theme) {
    root.dataset.theme = theme;
    if (btn) btn.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
    try { localStorage.setItem('mbisecad-theme', theme); } catch (e) {}
    // Ruhusu kurasa (mfano MDD) kuchora upya grafu theme ikibadilika
    document.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
  }

  var saved = 'dark';
  try { saved = localStorage.getItem('mbisecad-theme') || 'dark'; } catch (e) {}
  setTheme(saved);

  if (btn) {
    btn.addEventListener('click', function () {
      setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
    });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- auto tool counts kwenye hub ---------- */
  function each(selector, fn) {
    Array.prototype.forEach.call(document.querySelectorAll(selector), fn);
  }

  function updateToolCounts() {
    each('[data-tool-count]', function (badge) {
      var card = badge.parentElement;
      while (card && !(card.classList && card.classList.contains('card'))) card = card.parentElement;
      if (!card) card = document;
      var ready = card.querySelectorAll('.tool-list a').length;
      var planned = card.querySelectorAll('.tool-list .soon').length;
      if (ready === 0) badge.classList.add('planned');
      else badge.classList.remove('planned');
      if (!ready) badge.textContent = 'Planned';
      else if (planned) badge.textContent = ready + ' available · ' + planned + ' planned';
      else badge.textContent = ready + ' tool' + (ready === 1 ? '' : 's') + ' available';
    });
    var summary = document.querySelector('[data-tool-summary]');
    if (summary) {
      var readyAll = document.querySelectorAll('.tool-list a').length;
      var plannedAll = document.querySelectorAll('.tool-list .soon').length;
      summary.textContent = readyAll + ' ready · ' + plannedAll + ' planned';
    }
  }

  updateToolCounts();
})();
