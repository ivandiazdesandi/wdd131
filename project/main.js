const $  = (sel, scope = document) => scope.querySelector(sel);
const $$ = (sel, scope = document) => [...scope.querySelectorAll(sel)];

function setFooterDates() {
  const yearEl = $('#year');
  const modEl  = $('#lastModified');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (modEl)  modEl.textContent  = `Last Modified: ${document.lastModified}`;
}

function markActiveNav() {
  const here = location.pathname.split('/').pop() || 'index.html';
  $$('.site-nav a').forEach(a => {
    const target = a.getAttribute('href');
    const isCurrent = target.endsWith(here);
    a.setAttribute('aria-current', isCurrent ? 'page' : 'false');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setFooterDates();
  markActiveNav();
});