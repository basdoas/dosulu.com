window.LANGUAGES = {
  en: {
    __name: "English",
    title: "World Clock",
    welcome: "Welcome to your personalized clock!",
    description: "Your local time is displayed above. Switch theme or language using the controls.",
    clockLabel: "Local time ({tz})",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    surpriseList: [
      "Did you know? Istanbul is the only city in the world located on two continents!",
      "Every time you switch the theme, a kitten gets happier.",
      "Fun fact: The world's largest clock face is in Mecca!",
      "Time flies—unless you're the pilot.",
      "Surprise! You're awesome.",
      "It's always a good time to learn something new."
    ]
  },
  tr: {
    __name: "Türkçe",
    title: "Dünya Saati",
    welcome: "Kişisel saatinize hoş geldiniz!",
    description: "Yukarıda yerel saatinizi görebilirsiniz. Tema veya dili yan taraftan değiştirebilirsiniz.",
    clockLabel: "Yerel saat ({tz})",
    darkMode: "Karanlık Mod",
    lightMode: "Aydınlık Mod",
    surpriseList: [
      "Biliyor muydunuz? İstanbul, iki kıtada bulunan tek şehirdir!",
      "Her tema değiştiğinde bir kedi mutlu olur.",
      "Dünyanın en büyük saat kadranı Mekke'dedir!",
      "Zaman uçar—tabii pilot değilseniz.",
      "Sürpriz! Harikasınız.",
      "Yeni bir şey öğrenmek için her zaman iyi bir zamandır."
    ]
  },
  fr: {
    __name: "Français",
    title: "Horloge Mondiale",
    welcome: "Bienvenue sur votre horloge personnalisée !",
    description: "Votre heure locale s'affiche ci-dessus. Changez de thème ou de langue à tout moment.",
    clockLabel: "Heure locale ({tz})",
    darkMode: "Mode Sombre",
    lightMode: "Mode Clair",
    surpriseList: [
      "Le saviez-vous ? Istanbul est la seule ville au monde située sur deux continents !",
      "À chaque changement de thème, un chaton devient heureux.",
      "Le plus grand cadran d'horloge du monde est à La Mecque !",
      "Le temps passe vite, sauf si vous êtes le pilote.",
      "Surprise ! Vous êtes génial.",
      "Il est toujours temps d'apprendre quelque chose de nouveau."
    ]
  },
  es: {
    __name: "Español",
    title: "Reloj Mundial",
    welcome: "¡Bienvenido a tu reloj personal!",
    description: "Tu hora local se muestra arriba. Cambia el tema o idioma cuando quieras.",
    clockLabel: "Hora local ({tz})",
    darkMode: "Modo Oscuro",
    lightMode: "Modo Claro",
    surpriseList: [
      "¿Sabías que Estambul es la única ciudad del mundo en dos continentes?",
      "Cada vez que cambias el tema, un gatito se alegra.",
      "El reloj más grande del mundo está en La Meca.",
      "El tiempo vuela — a menos que seas el piloto.",
      "¡Sorpresa! Eres increíble.",
      "Siempre es buen momento para aprender algo nuevo."
    ]
  }
};
// i18n.js
function loadLanguage(lang) {
  const dict = window.LANGUAGES[lang];
  if (!dict) return;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.innerText = dict[key];
    }
  });

  document.documentElement.lang = lang;
}

// açılışta default dil yükle
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("lang-select");
  loadLanguage(select.value);

  select.addEventListener("change", () => {
    loadLanguage(select.value);
  });
});
  const now = new Date();
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timeStr = now.toLocaleTimeString(currentLang, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  document.getElementById('clock').textContent = timeStr;
  document.getElementById('clock-label').textContent = i18n('clockLabel', {tz});
}

// Theme toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const rootHtml = document.documentElement;
function setTheme(theme) {
  rootHtml.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeToggleBtn.textContent = theme === 'light' ? i18n('darkMode') : i18n('lightMode');
}
themeToggleBtn.onclick = () => {
  const theme = rootHtml.getAttribute('data-theme') === 'dark' ? 'light' : 'dark
  setTheme(theme);
}

return theme;
};

// Initialize theme
setTheme(localStorage.getItem('theme') || 'light');

// Language selector
const langSelect = document.getElementById('lang-select');
Object.entries(window.LANGUAGES).forEach(([code, langObj]) => {
  const opt = document.createElement('option');
  opt.value = code;
  opt.textContent = langObj.__name;
  langSelect.appendChild(opt);
}






const translations = {
  en: { title: "World Clock", description: "...", clockLabel: "Time:", languageLabel: "Language:" },
  tr: { title: "Dünya Saati", description: "...", clockLabel: "Saat:", languageLabel: "Dil:" },
  el: { title: "Παγκόσμιο Ρολόι", description: "...", clockLabel: "Ώρα:", languageLabel: "Γλώσσα:" }
};

function applyTranslations(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = translations[lang][key] || el.textContent;
  });
}

document.getElementById("lang-select").addEventListener("change", (e) => {
  applyTranslations(e.target.value);
});

applyTranslations("en");

