document.addEventListener('DOMContentLoaded', function() {
  const select = document.getElementById('language');
  const sections = document.querySelectorAll('.lang');
  select.addEventListener('change', function() {
    sections.forEach(sec => sec.style.display = 'none');
    document.getElementById(select.value).style.display = 'block';
  });
});