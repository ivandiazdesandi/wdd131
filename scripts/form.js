document.addEventListener('DOMContentLoaded', () => {
  // 1. Populate product <select>
  const products = [
    { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
    { id: "fc-2050", name: "power laces",    averagerating: 4.7 },
    { id: "fs-1987", name: "time circuits",   averagerating: 3.5 },
    { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
    { id: "jj-1969", name: "warp equalizer",  averagerating: 5.0 }
  ];

  const select = document.getElementById('product');
  products.forEach(prod => {
    const option = document.createElement('option');
    option.value = prod.id;
    option.textContent = prod.name;
    select.appendChild(option);
  });

  // 2. Populate footer dates
  const yearEl     = document.getElementById('currentYear');
  const modifiedEl = document.getElementById('lastModified');
  if (yearEl)     yearEl.textContent     = new Date().getFullYear();
  if (modifiedEl) modifiedEl.textContent = `Last Modified: ${document.lastModified}`;
});