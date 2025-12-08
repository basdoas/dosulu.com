const CACHE_NAME = 'saat-app-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
      .catch(err => console.error('Install error:', err))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        return caches.match('/index.html');
      });
    })
  );
});
const languageSelector = document.getElementById("languageSelector");
const body = document.body;

// Dil başlıkları (başlık alanı için)
const titleTranslations = {
  'tr-TR': 'Saat ve Tarih',
  'en-US': 'Clock and Date',
  'de-DE': 'Uhr und Datum',
  'fr-FR': 'Horloge et Date',
  'ru-RU': 'Часы и Дата',
  'zh-CN': '时钟和日期',
  'ja-JP': '時計と日付',
  'it-IT': 'Orologio e Data'
};

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
