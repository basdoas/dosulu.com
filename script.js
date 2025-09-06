document.addEventListener('DOMContentLoaded', function() {
  const select = document.getElementById('language');
  const contentDiv = document.getElementById('content');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const supportedLangs = ['tr','en','it','el'];

  // Language loader
  let detectedLang = (navigator.language || navigator.userLanguage).slice(0,2);
  if (!supportedLangs.includes(detectedLang)) detectedLang = 'tr';
  select.value = detectedLang;

  function loadLang(lang) {
    fetch(`lang/${lang}.html`)
      .then(response => response.text())
      .then(html => contentDiv.innerHTML = html);
  }

  loadLang(detectedLang);
  select.addEventListener('change', function() {
    loadLang(select.value);
  });

  // Theme toggle
  function applyTheme(theme) {
    document.body.classList.remove('light-theme', 'dark-theme');
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      themeToggleBtn.textContent = '☀️ Light Mode';
    } else if (theme === 'light') {
      document.body.classList.add('light-theme');
      themeToggleBtn.textContent = '🌙 Dark Mode';
    } else {
      // No explicit theme, use browser preference
      themeToggleBtn.textContent = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? '☀️ Light Mode'
        : '🌙 Dark Mode';
    }
  }

  // Load theme from localStorage or use browser setting
  let storedTheme = localStorage.getItem('theme');
  applyTheme(storedTheme);

  themeToggleBtn.addEventListener('click', function() {
    let currentTheme = document.body.classList.contains('dark-theme') ? 'dark'
                      : (document.body.classList.contains('light-theme') ? 'light' : null);
    let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  });

  // React to browser preference changes unless user has set a theme
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem('theme')) {
      applyTheme();
    }
  });

  // World clocks updater
  function updateClocks() {
    const zones = {
      'clock-istanbul': 'Europe/Istanbul',
      'clock-london': 'Europe/London',
      'clock-ny': 'America/New_York',
      'clock-tokyo': 'Asia/Tokyo'
    };

    Object.entries(zones).forEach(([id, tz]) => {
      const now = new Date();
      const time = now.toLocaleTimeString('en-US', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      document.getElementById(id).textContent = time;
    });
  }

  // Start the clock and update every second
  setInterval(updateClocks, 1000);
  window.addEventListener('DOMContentLoaded', updateClocks);
});