/* ===========================================================
   Banco SMC v8 · Auth Gate (light barrier)
   Visual estilo Antonella · paleta SMC Apple-grade
   ⚠️ Barrera UI · cualquiera con devtools puede bypass.
   =========================================================== */
(function(){
  // SHA-256 del PIN "hoku" (4 caracteres · PIN canónico SMC)
  const PIN_HASH = '2b14ee3fcd60f65d2e248beaeb53f6e2070fe6ceaef2a21a1010dc3b10d18c69';
  const PIN_LEN  = 4;
  const STORAGE_KEY = 'smc-banco-v15-auth';

  async function sha256(text){
    const buf = new TextEncoder().encode(text);
    const hash = await crypto.subtle.digest('SHA-256', buf);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
  }
  function setAuthed(){ sessionStorage.setItem(STORAGE_KEY, 'ok'); }
  function isAuthed(){ return sessionStorage.getItem(STORAGE_KEY) === 'ok'; }

  window._logout = function(){ sessionStorage.removeItem(STORAGE_KEY); location.reload(); };

  if (isAuthed()) return;

  document.documentElement.style.visibility = 'hidden';

  function init(){
    const style = document.createElement('style');
    style.textContent = `
      @keyframes smc-fadein { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes smc-shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }
      #smc-gate * { box-sizing: border-box; font-family: 'SF Pro Display', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
      #smc-gate {
        position: fixed; inset: 0; z-index: 99999;
        background: linear-gradient(135deg, #FAF7F2 0%, #F5F1E8 50%, #EBE6D9 100%);
        background-image: radial-gradient(ellipse at top left, rgba(0,102,204,0.18) 0%, transparent 50%),
                          radial-gradient(ellipse at bottom right, rgba(0,193,193,0.16) 0%, transparent 50%);
        display: flex; align-items: center; justify-content: center;
        animation: smc-fadein .5s ease;
      }
      .smc-card {
        background: rgba(255, 255, 255, 0.70);
        border: 1px solid rgba(0, 102, 204, 0.10);
        border-radius: 24px;
        padding: 64px 80px;
        max-width: 560px; width: 90%;
        text-align: center;
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        box-shadow: 0 32px 64px -8px rgba(0,0,0,0.08), 0 8px 16px -4px rgba(0,0,0,0.04);
      }
      .smc-logo {
        display: flex; align-items: center; justify-content: center;
        gap: 16px; margin-bottom: 56px;
      }
      .smc-logo svg { filter: drop-shadow(0 0 16px rgba(0,193,193,0.35)); }
      .smc-brand {
        font-size: 32px; font-weight: 800; letter-spacing: 4px;
        color: #0F172A;
      }
      .smc-brand span {
        background: linear-gradient(135deg, #0066CC 0%, #00C1C1 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
      .smc-title {
        font-size: 28px; font-weight: 800; color: #0F172A;
        margin: 0 0 8px;
      }
      .smc-sub {
        font-size: 14px; color: rgba(15, 23, 42, 0.55);
        margin: 0 0 40px; font-weight: 400;
      }
      .smc-boxes {
        display: flex; justify-content: center; gap: 14px;
        margin-bottom: 24px;
      }
      .smc-box {
        width: 72px; height: 80px;
        background: rgba(255, 255, 255, 0.85);
        border: 2px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        font-size: 32px; font-weight: 700;
        color: #0F172A; text-align: center;
        outline: none; transition: all .15s ease;
        font-family: 'SF Mono', 'JetBrains Mono', Monaco, monospace;
      }
      .smc-box:focus, .smc-box.active {
        border-color: #00C1C1;
        background: rgba(0, 193, 193, 0.04);
        box-shadow: 0 0 24px rgba(0, 193, 193, 0.28), inset 0 0 16px rgba(0, 193, 193, 0.05);
      }
      .smc-box.filled { border-color: rgba(0, 193, 193, 0.45); }
      .smc-err {
        height: 20px; color: #F87171; font-size: 12px;
        font-weight: 500; letter-spacing: 0.5px;
      }
      .smc-boxes.error { animation: smc-shake .4s ease; }
      .smc-boxes.error .smc-box { border-color: rgba(239, 68, 68, 0.5); }
      .smc-hint {
        margin-top: 32px; font-size: 11px;
        color: rgba(0, 102, 204, 0.5);
        letter-spacing: 2px; text-transform: uppercase;
      }
    `;
    document.head.appendChild(style);

    document.body.innerHTML = `
      <div id="smc-gate">
        <div class="smc-card">
          <div class="smc-logo">
            <svg width="42" height="42" viewBox="0 0 64 64" fill="none">
              <path d="M48 36c0-7.732-6.268-14-14-14-6.83 0-12.515 4.886-13.764 11.353C16.18 34.078 13 37.668 13 42c0 4.97 4.03 9 9 9h24c4.418 0 8-3.582 8-8 0-3.473-2.213-6.43-5.305-7.534" stroke="url(#smc-logo-grad)" stroke-width="3" stroke-linecap="round"/>
              <path d="M26 42l5 5 9-11" stroke="url(#smc-logo-grad)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              <defs>
                <linearGradient id="smc-logo-grad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stop-color="#0066CC"/>
                  <stop offset="1" stop-color="#00C1C1"/>
                </linearGradient>
              </defs>
            </svg>
            <div class="smc-brand">SMART<span>CONNECTION</span></div>
          </div>
          <h1 class="smc-title">Banco SMC v8</h1>
          <p class="smc-sub">Ingresa tu PIN de acceso</p>
          <div class="smc-boxes" id="smc-boxes">
            ${Array.from({length: PIN_LEN}).map((_, i) =>
              `<input class="smc-box" maxlength="1" data-idx="${i}" autocapitalize="off" autocomplete="off" spellcheck="false"/>`
            ).join('')}
          </div>
          <div class="smc-err" id="smc-err"></div>
          <div class="smc-hint">Confidencial · uso interno SMC</div>
        </div>
      </div>
    `;
    document.documentElement.style.visibility = 'visible';

    const boxes  = Array.from(document.querySelectorAll('.smc-box'));
    const wrap   = document.getElementById('smc-boxes');
    const errEl  = document.getElementById('smc-err');

    setTimeout(() => boxes[0].focus(), 200);

    async function tryAuth(){
      const pin = boxes.map(b => b.value).join('').toLowerCase();
      if (pin.length !== PIN_LEN) return;
      const h = await sha256(pin);
      if (h === PIN_HASH){
        setAuthed();
        wrap.style.transition = 'opacity .3s'; wrap.style.opacity = '0.4';
        errEl.textContent = '';
        boxes.forEach(b => b.style.borderColor = '#22C55E');
        setTimeout(() => location.reload(), 350);
      } else {
        wrap.classList.add('error');
        errEl.textContent = 'PIN incorrecto · intenta de nuevo';
        setTimeout(() => {
          wrap.classList.remove('error');
          boxes.forEach(b => { b.value = ''; b.classList.remove('filled'); });
          boxes[0].focus();
          errEl.textContent = '';
        }, 800);
      }
    }

    boxes.forEach((box, idx) => {
      box.addEventListener('input', e => {
        const v = e.target.value;
        if (v.length > 0){
          box.classList.add('filled');
          if (idx < PIN_LEN - 1) boxes[idx + 1].focus();
          else tryAuth();
        } else {
          box.classList.remove('filled');
        }
      });
      box.addEventListener('keydown', e => {
        if (e.key === 'Backspace' && !box.value && idx > 0){
          boxes[idx - 1].focus();
          boxes[idx - 1].value = '';
          boxes[idx - 1].classList.remove('filled');
        }
        if (e.key === 'ArrowLeft' && idx > 0) boxes[idx - 1].focus();
        if (e.key === 'ArrowRight' && idx < PIN_LEN - 1) boxes[idx + 1].focus();
      });
      box.addEventListener('paste', e => {
        e.preventDefault();
        const data = (e.clipboardData.getData('text') || '').toLowerCase().slice(0, PIN_LEN);
        data.split('').forEach((ch, i) => {
          if (boxes[i]){ boxes[i].value = ch; boxes[i].classList.add('filled'); }
        });
        if (data.length === PIN_LEN) tryAuth();
        else boxes[Math.min(data.length, PIN_LEN - 1)].focus();
      });
    });
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
