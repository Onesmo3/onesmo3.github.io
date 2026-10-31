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
})();
