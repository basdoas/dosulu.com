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
