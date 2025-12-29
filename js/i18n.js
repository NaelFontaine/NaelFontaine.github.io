let currentLang = 'en';

async function loadLanguage(lang) {
  const response = await fetch(`lang/${lang}.json`);
  const translations = await response.json();

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = translations[key];
    if (Array.isArray(value)) {
      el.innerHTML = value.join(' ');
    } else {
      el.innerHTML = value;
    }
  });

  localStorage.setItem('lang', lang);
}

function setLanguage(lang) {
  currentLang = lang;
  console.log(`Language set to: ${lang}`);
  loadLanguage(lang);
}

// langue sauvegardée ou navigateur
const savedLang = localStorage.getItem('lang');
const browserLang = navigator.language.slice(0, 2);

loadLanguage(savedLang || browserLang || 'en');
