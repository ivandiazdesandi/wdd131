// scripts/temples.js
// This script handles the dynamic footer dates and the mobile “hamburger” menu toggle.
// It runs after parsing HTML thanks to the `defer` attribute.

// 1. Populate current year
const yearEl = document.getElementById('currentyear');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// 2. Populate last-modified timestamp
const modifiedEl = document.getElementById('lastModified');
if (modifiedEl) {
  modifiedEl.textContent = `Last Modified: ${document.lastModified}`;
}

// 3. Hamburger menu toggle (mobile view)
const toggleBtn = document.getElementById('menu-toggle');
const navMenu  = document.getElementById('nav-menu');

if (toggleBtn && navMenu) {
  toggleBtn.addEventListener('click', () => {
    // Toggle nav visibility
    const isVisible = navMenu.style.display === 'block';
    navMenu.style.display = isVisible ? 'none' : 'block';
    // Change toggle symbol (☰ ↔ ✕)
    toggleBtn.textContent = isVisible ? '☰' : '✕';
  });
}