function updateClockAndDate() {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString();
  document.getElementById("date").textContent = now.toLocaleDateString();
}

setInterval(updateClockAndDate, 1000);
updateClockAndDate();

const languageSelector = document.getElementById("languageSelector");
const body = document.body;

function updateClockAndDate() {
  const now = new Date();
  const locale = languageSelector.value;
  document.getElementById("clock").textContent = now.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  document.getElementById("date").textContent = now.toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

languageSelector.addEventListener("change", updateClockAndDate);

setInterval(updateClockAndDate, 1000);
updateClockAndDate();

// Tema kontrolü
document.getElementById("light-mode").onclick = () => {
  body.className = "light-theme";
};
document.getElementById("dark-mode").onclick = () => {
  body.className = "dark-theme";
};
document.getElementById("auto-mode").onclick = () => {
  setAutoTheme();
};

function setAutoTheme() {
  const hour = new Date().getHours();
  if (hour >= 22 || hour < 6) {
    body.className = "dark-theme";
  } else {
    body.className = "light-theme";
  }
}

// Sayfa ilk açıldığında otomatik tema uygula
setAutoTheme();