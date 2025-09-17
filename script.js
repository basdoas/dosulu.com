function updateClockAndDate() {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString();
  document.getElementById("date").textContent = now.toLocaleDateString();
}

setInterval(updateClockAndDate, 1000);
updateClockAndDate();

