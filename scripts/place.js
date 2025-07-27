const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


const modifiedEl = document.getElementById('lastModified');
if (modifiedEl) {
  modifiedEl.textContent = `Last Modified: ${document.lastModified}`;
}


const tempC = 5;     
const windKmh = 10;   

function calculateWindChill(t, v) {
  
  return Math.round(
    13.12 +
    0.6215 * t -
    11.37 * Math.pow(v, 0.16) +
    0.3965 * t * Math.pow(v, 0.16)
  );
}

const windChillEl = document.getElementById('windChill');
if (windChillEl) {
  if (tempC <= 10 && windKmh > 4.8) {
    windChillEl.textContent = calculateWindChill(tempC, windKmh) + ' °C';
  } else {
    windChillEl.textContent = 'N/A';
  }
}