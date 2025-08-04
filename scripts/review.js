document.addEventListener('DOMContentLoaded', () => {
  // 1. Read the current count (or start at 0)
  let count = parseInt(localStorage.getItem('reviewCount') || '0', 10);

  // 2. Increment and save back to localStorage
  count += 1;
  localStorage.setItem('reviewCount', count);

  // 3. Update the page
  const display = document.getElementById('reviewCount');
  if (display) {
    display.textContent = count;
  }

  // 4. Populate footer dates too
  const yearEl     = document.getElementById('currentYear');
  const modifiedEl = document.getElementById('lastModified');
  if (yearEl)     yearEl.textContent     = new Date().getFullYear();
  if (modifiedEl) modifiedEl.textContent = `Last Modified: ${document.lastModified}`;
});