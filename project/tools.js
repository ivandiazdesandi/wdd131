const $  = (sel, scope = document) => scope.querySelector(sel);
const $$ = (sel, scope = document) => [...scope.querySelectorAll(sel)];

const consentBox  = $('#riskConsent');
const consentHint = $('#consentHint');
function hasConsent() {
  return Boolean(consentBox?.checked);
}
function requireConsent(action) {
  if (!hasConsent()) {
    if (consentHint) consentHint.textContent = 'Please accept the risk notice above to use the calculators.';
    return false;
  }
  if (consentHint) consentHint.textContent = 'You may now use the calculators.';
  return true;
}

const fxForm    = $('#fxForm');
const fxBtn     = $('#fxCalcBtn');
const fxResults = $('#fxResults');

function calcFx() {
  if (!requireConsent()) return;

  const pairType  = $('#pairType').value;
  const lotSize   = parseFloat($('#lotSize').value || '0');
  const entry     = parseFloat($('#entryPrice').value || '0');
  const exit      = parseFloat($('#exitPrice').value || '0');

  if (!(entry > 0 && exit > 0 && lotSize > 0)) {
    fxResults.textContent = 'Enter valid numbers for entry, exit, and lot size.';
    return;
  }

  const pipSize   = pairType === 'jpy' ? 0.01 : 0.0001;
  const diff      = exit - entry;
  const pips      = diff / pipSize;  
  const pipValue  = 10 * lotSize;       
  const pl        = pips * pipValue;

  fxResults.innerHTML = `
    <div><strong>Distance:</strong> ${pips.toFixed(1)} pips</div>
    <div><strong>P/L:</strong> $${pl.toFixed(2)}</div>
    <div class="muted small">Assumption: USD-quoted pair, pip value ≈ $${pipValue.toFixed(2)} for chosen lot size.</div>
  `;
}

const cryptoForm    = $('#cryptoForm');
const cryptoBtn     = $('#cryptoCalcBtn');
const cryptoResults = $('#cryptoResults');

function calcCrypto() {
  if (!requireConsent()) return;

  const symbol = ($('#coinSymbol').value || '').toUpperCase().trim();
  const entry  = parseFloat($('#cryptoEntry').value || '0');
  const exit   = parseFloat($('#cryptoExit').value || '0');
  const size   = parseFloat($('#cryptoSize').value || '0');

  if (!(entry > 0 && exit > 0 && size > 0)) {
    cryptoResults.textContent = 'Enter valid numbers for entry, exit, and position size.';
    return;
  }

  const diff   = exit - entry;
  const pl     = diff * size;
  const pct    = (diff / entry) * 100;

  cryptoResults.innerHTML = `
    <div><strong>${symbol || 'Position'}</strong></div>
    <div><strong>P/L:</strong> $${pl.toFixed(2)} (${pct.toFixed(2)}%)</div>
  `;
}

const WATCH_KEY  = 'tw_watch';
const watchForm  = $('#watchForm');
const clearBtn   = $('#clearWatch');
const watchList  = $('#watchList');

function loadWatch() {
  try {
    return JSON.parse(localStorage.getItem(WATCH_KEY) || '[]');
  } catch {
    return [];
  }
}
function saveWatch(items) {
  localStorage.setItem(WATCH_KEY, JSON.stringify(items));
}
function renderWatch() {
  const items = loadWatch();
  if (!items.length) {
    watchList.innerHTML = `<li class="muted">No symbols yet. Add one above.</li>`;
    return;
  }
  watchList.innerHTML = items
    .map(item => `
      <li>
        <span><strong>${item.symbol}</strong>${item.note ? ` — ${item.note}` : ''}</span>
        <button type="button" data-id="${item.id}" aria-label="Remove ${item.symbol}">Remove</button>
      </li>
    `)
    .join('');
}
function addWatch(symbol, note) {
  const items = loadWatch();
  const id = `${Date.now()}`;
  items.push({ id, symbol, note });
  saveWatch(items);
  renderWatch();
}
function removeWatch(id) {
  const items = loadWatch().filter(it => it.id !== id);
  saveWatch(items);
  renderWatch();
}
function clearWatch() {
  localStorage.removeItem(WATCH_KEY);
  renderWatch();
}

document.addEventListener('DOMContentLoaded', () => {
  consentBox?.addEventListener('change', () => {
    consentHint.textContent = hasConsent()
      ? 'You may now use the calculators.'
      : 'Please accept the risk notice above to use the calculators.';
  });

  fxBtn?.addEventListener('click', calcFx);
  fxForm?.addEventListener('submit', e => e.preventDefault());

  cryptoBtn?.addEventListener('click', calcCrypto);
  cryptoForm?.addEventListener('submit', e => e.preventDefault());

  watchForm?.addEventListener('submit', e => {
    e.preventDefault();
    if (!requireConsent()) return;

    const sym = ($('#watchSymbol').value || '').toUpperCase().trim();
    const note = ($('#watchNote').value || '').trim();
    if (!sym) return;

    addWatch(sym, note);
    watchForm.reset();
    $('#watchSymbol').focus();
  });

  watchList?.addEventListener('click', e => {
    const btn = e.target.closest('button[data-id]');
    if (!btn) return;
    removeWatch(btn.dataset.id);
  });

  clearBtn?.addEventListener('click', clearWatch);

  renderWatch();
});