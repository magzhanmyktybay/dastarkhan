var theme = localStorage.getItem('theme');

if (theme === null) {
  theme = 'light';
}

function applyTheme(name) {
  document.documentElement.setAttribute('data-theme', name);
  document.documentElement.setAttribute('data-bs-theme', name);
}

function updateIcon(name) {
  var button = document.getElementById('theme-toggle');
  if (button === null) {
    return;
  }
  var icon = button.querySelector('i');
  if (name === 'dark') {
    icon.className = 'bi bi-sun-fill';
  } else {
    icon.className = 'bi bi-moon-stars-fill';
  }
}

applyTheme(theme);

document.addEventListener('DOMContentLoaded', function () {
  var button = document.getElementById('theme-toggle');
  updateIcon(theme);

  if (button !== null) {
    button.addEventListener('click', function () {
      if (theme === 'light') {
        theme = 'dark';
      } else {
        theme = 'light';
      }

      applyTheme(theme);
      updateIcon(theme);
      localStorage.setItem('theme', theme);
    });
  }
});