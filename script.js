const date = document.getElementById("date");

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
// 1. HTML'deki elementleri yakala
const clock = document.getElementById("clock");
const date = document.getElementById("date");
const title = document.getElementById("title");
const languageSelector = document.getElementById("languageSelector");
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// 2. Dil çevirileri
const translations = {
  tr: "Saat",
  el: "Ώρα",
  it: "Ora",
  zh: "時辰"
};

// 3. Tarihi güncelleyen fonksiyon
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

// ✅ 4. Saat + tarih güncelleyen ana fonksiyon
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString(languageSelector.value);
  clock.textContent = timeString;
  updateDate(); // Tarihi de güncelle
}

// 5. Her saniyede bir güncelle
setInterval(updateClock, 1000);
updateClock(); // Sayfa açıldığında hemen göster

// 6. Dil değişince başlığı ve tarihi güncelle
languageSelector.addEventListener("change", () => {
  const lang = languageSelector.value;
  title.textContent = translations[lang] || "Saat";
  updateDate();
});

// 7. Tema geçişi
themeToggle.addEventListener("click", () => {
  if (body.classList.contains("light-theme")) {
    body.classList.replace("light-theme", "dark-theme");
  } else {
    body.classList.replace("dark-theme", "light-theme");
  }
});

// 8. Başlangıç teması
body.classList.add("light-theme");


function loadModule(module) {
  const content = document.getElementById("main-content");
  content.innerHTML = ""; // Temizle

  if (module === "datetime") {
    const clockBox = document.createElement("div");
    clockBox.id = "clock-box";
    content.appendChild(clockBox);

    function updateClock() {
      const now = new Date();
      const lang = document.getElementById("lang").value || "tr";

      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };

      const formatted = now.toLocaleString(lang, options);
      clockBox.innerHTML = `<h2>${formatted}</h2>`;
    }

    updateClock(); // İlk çağrı
    setInterval(updateClock, 1000); // Her saniye güncelle
  }
}

