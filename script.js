const clock = document.getElementById("clock");
const date = document.getElementById("date");
const title = document.getElementById("title");
const languageSelector = document.getElementById("languageSelector");
const body = document.body;

const translations = {
  tr: "Saat",
  en: "Clock",
  ru: "Часы",
  zh: "時辰",
  de: "Uhr",
  ja: "時計",
  it: "Ora"
};

function updateDate() {
  const now = new Date();
  const lang = languageSelector.value;
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  date.textContent = now.toLocaleDateString(lang, options);
}

function updateClock() {
  const now = new Date();
  const lang = languageSelector.value;
  const timeString = now.toLocaleTimeString(lang, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  clock.textContent = timeString;
  updateDate();
}

setInterval(updateClock, 1000);
updateClock();

languageSelector.addEventListener("change", () => {
  const lang = languageSelector.value;
  title.textContent = translations[lang] || "Saat";
  updateClock();
});

document.getElementById("light-mode").onclick = () => {
  body.className = "light-theme";
};

document.getElementById("dark-mode").onclick = () => {
  body.className = "dark-theme";
};

document.getElementById("auto-mode").onclick = () => {
  const hour = new Date().getHours();
  body.className = hour >= 7 && hour < 19 ? "light-theme" : "dark-theme";
};

body.classList.add("light-theme");

const date = new Date();
console.log(date);
