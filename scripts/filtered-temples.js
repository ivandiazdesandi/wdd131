const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // 3 additional temples:
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 10000,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/400x250/rome-italy-temple-exterior.jpg"
  },
  {
    templeName: "Tokyo Japan",
    location: "Tokyo, Japan",
    dedicated: "1980, October, 27",
    area: 83000,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/tokyo-japan/400x250/tokyo-japan-temple-exterior.jpg"
  },
  {
    templeName: "São Paulo Brazil",
    location: "São Paulo, Brazil",
    dedicated: "1978, June, 28",
    area: 25250,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/sao-paulo-brazil/400x250/sao-paulo-brazil-temple-exterior.jpg"
  }
];

// 2. References to DOM elements
const cardsContainer = document.getElementById("temple-cards");
const filterLinks   = document.querySelectorAll("#nav-menu a");
const toggleBtn     = document.getElementById("menu-toggle");
const navMenu       = document.getElementById("nav-menu");

// 3. Helper: create and append a card
function createCard(t) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${t.imageUrl}" alt="${t.templeName}" loading="lazy">
    <h3>${t.templeName}</h3>
    <p><strong>Location:</strong> ${t.location}</p>
    <p><strong>Dedicated:</strong> ${t.dedicated}</p>
    <p><strong>Area:</strong> ${t.area.toLocaleString()} sq ft</p>
  `;
  cardsContainer.appendChild(card);
}

// 4. Render a set of temples
function renderTemples(list) {
  cardsContainer.innerHTML = "";
  list.forEach(createCard);
}

// 5. Filter functions
const filters = {
  all:    () => temples,
  old:    () => temples.filter(t => new Date(t.dedicated).getFullYear() < 1900),
  new:    () => temples.filter(t => new Date(t.dedicated).getFullYear() > 2000),
  large:  () => temples.filter(t => t.area > 90000),
  small:  () => temples.filter(t => t.area < 10000)
};

// 6. Set up filter link click handlers
filterLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const key = link.dataset.filter;
    if (filters[key]) {
      renderTemples(filters[key]());
      // Update heading
      document.querySelector("main h2").textContent =
        key.charAt(0).toUpperCase() + key.slice(1);
    }
    // Close nav on mobile
    navMenu.style.display = "none";
    toggleBtn.textContent = "☰";
  });
});

// 7. Initial render (Home)
renderTemples(temples);

// 8. Hamburger toggle
toggleBtn.addEventListener("click", () => {
  const visible = navMenu.style.display === "block";
  navMenu.style.display = visible ? "none" : "block";
  toggleBtn.textContent = visible ? "☰" : "✕";
});

// 9. Footer dates
const yearEl     = document.getElementById("currentyear");
const modifiedEl = document.getElementById("lastModified");
if (yearEl)     yearEl.textContent     = new Date().getFullYear();
if (modifiedEl) modifiedEl.textContent = `Last Modified: ${document.lastModified}`;