// getdates.js

const yearSpan = document.getElementById('currentyear');
if (yearSpan) {
  const now = new Date();
  yearSpan.textContent = now.getFullYear();
}


const modifiedPara = document.getElementById('lastModified');
if (modifiedPara) {
  modifiedPara.textContent = `Last Modified: ${document.lastModified}`;
}