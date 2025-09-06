document.addEventListener('DOMContentLoaded', function() {
  const select = document.getElementById('language');
  const contentDiv = document.getElementById('content');
  const supportedLangs = ['tr','en','it','el'];

  // Detect browser language on first load
  let detectedLang = (navigator.language || navigator.userLanguage).slice(0,2);
  if (!supportedLangs.includes(detectedLang)) detectedLang = 'tr';
  select.value = detectedLang;

  function loadLang(lang) {
    fetch(`lang/${lang}.html`)
      .then(response => response.text())
      .then(html => contentDiv.innerHTML = html);
  }

  // Load detected language on first load
  loadLang(detectedLang);

  // On dropdown change, load selected language
  select.addEventListener('change', function() {
    loadLang(select.value);
  });
});