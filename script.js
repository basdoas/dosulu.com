const languageSelector = document.getElementById("languageSelector");
const body = document.body;

function updateClockAndDate() {
  const now = new Date();
  const locale = (languageSelector && languageSelector.value) ? languageSelector.value : navigator.language || 'tr-TR';

  const clockEl = document.getElementById("clock");
  const dateEl = document.getElementById("date");

  if (clockEl) {
    clockEl.textContent = now.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }
  if (dateEl) {
    dateEl.textContent = now.toLocaleDateString(locale, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }
}

if (languageSelector) {
  languageSelector.addEventListener("change", updateClockAndDate);
}

setInterval(updateClockAndDate, 1000);
updateClockAndDate();

// Tema kontrolü (butonlar varsa çalışır)
const lightBtn = document.getElementById("light-mode");
const darkBtn = document.getElementById("dark-mode");
const autoBtn = document.getElementById("auto-mode");

if (lightBtn) lightBtn.addEventListener('click', () => body.className = 'light-theme');
if (darkBtn) darkBtn.addEventListener('click', () => body.className = 'dark-theme');
if (autoBtn) autoBtn.addEventListener('click', () => setAutoTheme());

function setAutoTheme() {
  const hour = new Date().getHours();
  if (hour >= 22 || hour < 6) {
    body.className = 'dark-theme';
  } else {
    body.className = 'light-theme';
  }
}

setAutoTheme();