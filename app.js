// daşak
// Utility: Get user's timezone offset and name
function getUserTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Istanbul';
}

// Render clock in user's time zone
function updateClock() {
  const clockLabel = document.getElementById('clock-label');
  const clockTime = document.getElementById('clock-time');
  const tz = getUserTimeZone();
  clockLabel.textContent = i18n('clockLabel', { tz });
  const now = new Date();
  clockTime.textContent = now.toLocaleTimeString(currentLang, { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

// Theme toggle with animated transition
const rootHtml = document.getElementById('root-html');
const themeToggleBtn = document.getElementById('theme-toggle');
function setTheme(theme) {
  rootHtml.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeToggleBtn.textContent = theme === 'light' ? i18n('darkMode') : i18n('lightMode');
}
themeToggleBtn.onclick = () => {
  const theme = rootHtml.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  setTheme(theme);
};

// Initialize theme
setTheme(localStorage.getItem('theme') || 'light');

// i18n: Language selector + translation
const langSelect = document.getElementById('lang-select');
Object.entries(window.LANGUAGES).forEach(([code, langObj]) => {
  const opt = document.createElement('option');
  opt.value = code;
  opt.textContent = langObj.__name;
  langSelect.appendChild(opt);
});
let currentLang = localStorage.getItem('lang') || navigator.language.split('-')[0] || 'en';
if (!window.LANGUAGES[currentLang]) currentLang = 'en';
langSelect.value = currentLang;
langSelect.onchange = () => {
  currentLang = langSelect.value;
  localStorage.setItem('lang', currentLang);
  renderI18n();
  updateClock();
  setTheme(rootHtml.getAttribute('data-theme')); // update button text
  showSurprise();
};

// i18n helper
function i18n(key, vars={}) {
  let str = (window.LANGUAGES[currentLang] && window.LANGUAGES[currentLang][key]) || window.LANGUAGES['en'][key] || key;
  for (const v in vars) {
    str = str.replace(`{${v}}`, vars[v]);
  }
  return str;
}
// Render all [data-i18n]
function renderI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = i18n(el.getAttribute('data-i18n'));
  });
  document.title = i18n('title');
}

setInterval(updateClock, 1000);
renderI18n();
updateClock();

// Surprise feature: Random fun fact or quote (multi-lingual)
function showSurprise() {
  const arr = window.LANGUAGES[currentLang].surpriseList || window.LANGUAGES['en'].surpriseList;
  document.getElementById('surprise').textContent = arr[Math.floor(Math.random() * arr.length)];
}
showSurprise();


// sex
//sex 


function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  document.getElementById("clock-time").textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();




function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  document.getElementById("clock-time").textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock(); // Sayfa açıldığında hemen göster
