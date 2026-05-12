// SMC Design System · auth gate · 5 roles
(function(){
  const ROLES = {
    'kanki': {
      user: 'Martín',
      emoji: '🏄',
      project: 'kanki',
      seeProjects: ['kanki'],
      canClickProjects: false,
      canSeeOS: false,
      welcome: 'Welcome Martín · Kanki Street · ve los efectos del DS · proyectos otros bloqueados'
    },
    'infopet': {
      user: 'Javier',
      emoji: '🐾',
      project: 'infopet',
      seeProjects: ['infopet'],
      canClickProjects: false,
      canSeeOS: false,
      welcome: 'Welcome Javier · InfoPet · ve los efectos del DS · proyectos otros bloqueados'
    },
    'joey': {
      user: 'Joey',
      emoji: '👤',
      project: 'design',
      seeProjects: [],
      canClickProjects: false,
      canSeeOS: false,
      welcome: 'Welcome Joey · solo Design System · proyectos y SO bloqueados'
    },
    'smc.ui': {
      user: 'Sebastián',
      emoji: '🎨',
      project: 'design',
      seeProjects: 'all',
      canClickProjects: true,
      canSeeOS: false,
      welcome: 'Welcome Sebastián · Design System full + proyectos · SO restringido'
    },
    'smc.os': {
      user: 'Guillermo',
      emoji: '🧠',
      project: 'all',
      seeProjects: 'all',
      canClickProjects: true,
      canSeeOS: true,
      welcome: 'Welcome owner · acceso total · Design System + Banco SO'
    }
  };

  const LS_KEY = 'smc-auth-v15';
  const FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  function getRole() {
    const k = localStorage.getItem(LS_KEY);
    if (!k) return null;
    const kLower = k.toLowerCase();
    return ROLES[kLower] ? { key: kLower, ...ROLES[kLower] } : null;
  }

  function logout() {
    localStorage.removeItem(LS_KEY);
    location.reload();
  }
  window._logout = logout;
  window._getSMCRole = getRole;

  function applyFilter(role) {
    document.body.dataset.role = role.key;
    document.body.dataset.user = role.user;
    document.body.dataset.canSeeOs = role.canSeeOS ? 'yes' : 'no';

    // SO tile lock if user can't see SO
    if (!role.canSeeOS) {
      document.querySelectorAll('[data-needs-os]').forEach(el => {
        el.style.pointerEvents = 'none';
        el.style.opacity = '0.4';
        el.style.cursor = 'not-allowed';
        el.style.filter = 'grayscale(70%)';
        if (!el.querySelector('.locked-badge-os')) {
          const lock = document.createElement('div');
          lock.className = 'locked-badge-os';
          lock.innerHTML = '🔒 solo Guillermo';
          lock.style.cssText = 'position:absolute;top:14px;right:14px;z-index:5;background:rgba(0,0,0,0.7);color:white;padding:6px 12px;border-radius:980px;font:600 11px '+FONT+';letter-spacing:-0.012em;backdrop-filter:blur(8px)';
          if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
          el.appendChild(lock);
        }
      });
    }

    if (role.seeProjects === 'all') return;

    const projectKeywords = {
      kanki: ['kanki', 'kanki-street', 'kanki street', 'streetwear'],
      infopet: ['infopet', 'bsale', 'jumpseller', 'tsukai'],
      voy: ['voy', 'cotizador'],
      intranet: ['intranet', 'smc os'],
      marketing: ['marketing', 'smconnection.cl'],
      marketplace: ['marketplace', 'meli'],
      alpaso: ['alpaso', 'dance'],
      cencosud: ['cencosud', 'cem'],
      valmer: ['valmer', 'murex'],
      sap: ['sap cpi', 'parque arauco'],
      duoc: ['duoc'],
      discovery: ['discovery'],
      cerebro: ['cerebro']
    };
    const allowed = role.seeProjects;
    if (!Array.isArray(allowed)) return;

    document.querySelectorAll('.tile, .proj-card, .pg-card, .pg-tile, .pg-feature, a').forEach(el => {
      if (el.dataset.needsOs) return; // ya manejado arriba
      const txt = el.innerText.toLowerCase();
      if (!txt) return;
      let foundProject = null;
      for (const [proj, kws] of Object.entries(projectKeywords)) {
        if (kws.some(kw => txt.includes(kw))) {
          foundProject = proj;
          break;
        }
      }
      if (!foundProject) return;
      if (!allowed.includes(foundProject)) {
        if (el.tagName === 'A') {
          el.style.pointerEvents = 'none';
          el.style.opacity = '0.32';
          el.style.cursor = 'not-allowed';
          el.style.filter = 'grayscale(80%)';
          if (!el.querySelector('.locked-badge')) {
            const lock = document.createElement('div');
            lock.className = 'locked-badge';
            lock.innerHTML = '🔒';
            lock.style.cssText = 'position:absolute;top:14px;right:14px;font-size:18px;z-index:5;background:rgba(0,0,0,0.6);width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(8px)';
            if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
            el.appendChild(lock);
          }
        }
      }
    });
  }

  function renderWelcome(role) {
    const banner = document.createElement('div');
    banner.id = '_authBanner';
    banner.style.cssText = `position:fixed;top:0;left:0;right:0;z-index:200;background:#1D1D1F;color:white;padding:8px 22px;display:flex;align-items:center;gap:12px;font:500 13px ${FONT};letter-spacing:-0.012em`;
    banner.innerHTML = `
      <span style="font-size:18px">${role.emoji}</span>
      <span><strong>${role.user}</strong> · ${role.welcome}</span>
      <button onclick="_logout()" style="margin-left:auto;background:transparent;border:1px solid rgba(255,255,255,0.2);color:white;padding:4px 12px;border-radius:980px;font:500 11px ${FONT};cursor:pointer;letter-spacing:-0.012em">Cerrar sesión</button>
    `;
    document.body.appendChild(banner);
    document.body.style.paddingTop = '40px';
    const nav = document.querySelector('.nav');
    if (nav) nav.style.top = '40px';
  }

  function showGate() {
    const gate = document.createElement('div');
    gate.id = '_authGate';
    gate.style.cssText = `position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;font-family:${FONT};overflow:hidden;background:#000`;
    gate.innerHTML = `
      <style id="_gateStyles">
        @keyframes _gateFadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes _gateLogoBreathe { 0%,100% { transform:scale(1); box-shadow:0 0 0 0 rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.5); } 50% { transform:scale(1.04); box-shadow:0 0 0 8px rgba(255,255,255,0.04), 0 8px 24px rgba(0,0,0,0.5); } }
        @keyframes _gateOrb1 { 0%,100% { transform:translate(0,0) scale(1); } 50% { transform:translate(60px,-40px) scale(1.15); } }
        @keyframes _gateOrb2 { 0%,100% { transform:translate(0,0) scale(1); } 50% { transform:translate(-50px,30px) scale(0.9); } }
        @keyframes _gateOrb3 { 0%,100% { transform:translate(0,0) scale(1); } 50% { transform:translate(30px,-50px) scale(1.1); } }
        @keyframes _gateScanline { from { transform:translateY(-100%); } to { transform:translateY(100vh); } }
        @keyframes _gateShine { 0% { transform:translateX(-100%) skewX(-12deg); } 100% { transform:translateX(200%) skewX(-12deg); } }
        @keyframes _gateBtnShimmer { from { background-position:-200% 0; } to { background-position:200% 0; } }
        @keyframes _gateBorderGlow { 0%,100% { opacity:0.6; } 50% { opacity:1; } }
        @keyframes _gateGridFloat { 0% { transform:perspective(800px) rotateX(60deg) translateY(0); } 100% { transform:perspective(800px) rotateX(60deg) translateY(40px); } }
        @keyframes _gateDot { 0%,100% { opacity:0.4; } 50% { opacity:1; } }
        @keyframes _gateRotate { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes _gateShake { 0%,100% { transform:translateX(0); } 25% { transform:translateX(-5px); } 75% { transform:translateX(5px); } }

        #_authGate * { font-family:${FONT}; }
        #_authGate .gate-orb { position:absolute; border-radius:50%; filter:blur(60px); pointer-events:none; }
        #_authGate .gate-scanline { position:absolute; left:0; right:0; height:1px; background:linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent); animation:_gateScanline 6s linear infinite; pointer-events:none; opacity:0.5; }
        #_authGate .gate-grid {
          position:absolute; bottom:-40%; left:-20%; right:-20%; height:80%;
          background-image:
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
          background-size:60px 60px;
          mask-image:linear-gradient(0deg, black 0%, transparent 80%);
          -webkit-mask-image:linear-gradient(0deg, black 0%, transparent 80%);
          animation:_gateGridFloat 8s linear infinite alternate;
          pointer-events:none;
        }
        #_authGate .gate-noise {
          position:absolute; inset:0;
          background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22240%22 height=%22240%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence baseFrequency=%220.85%22 numOctaves=%222%22/%3E%3C/filter%3E%3Crect width=%22240%22 height=%22240%22 filter=%22url(%23n)%22 opacity=%220.45%22/%3E%3C/svg%3E');
          mix-blend-mode:overlay; opacity:0.35; pointer-events:none;
        }
        #_authGate .gate-card {
          position:relative; z-index:5;
          width:min(400px, 88vw);
          padding:48px 40px 32px;
          background:rgba(20,20,22,0.66);
          backdrop-filter:saturate(180%) blur(40px);
          -webkit-backdrop-filter:saturate(180%) blur(40px);
          border:0.5px solid rgba(255,255,255,0.14);
          border-radius:22px;
          box-shadow:
            0 0 0 0.5px rgba(255,255,255,0.08) inset,
            0 0 64px rgba(255,255,255,0.04),
            0 32px 64px -8px rgba(0,0,0,0.7),
            0 8px 16px -4px rgba(0,0,0,0.4);
          color:#F5F5F7;
          animation:_gateFadeUp 800ms cubic-bezier(0.16,1,0.3,1) both;
          overflow:hidden;
        }
        #_authGate .gate-card::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background:linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%);
          border-radius:22px;
        }
        #_authGate .gate-card::after {
          content:''; position:absolute; top:-100%; left:0; width:30%; height:300%;
          background:linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%);
          animation:_gateShine 8s ease-in-out infinite;
          animation-delay:1.5s;
          pointer-events:none;
        }

        #_authGate .gate-logo {
          width:56px; height:56px; border-radius:14px;
          background:linear-gradient(180deg, #3A3A3C 0%, #1C1C1E 100%);
          border:0.5px solid rgba(255,255,255,0.18);
          display:flex; align-items:center; justify-content:center;
          margin:0 auto 28px;
          position:relative;
          animation:_gateLogoBreathe 4s ease-in-out infinite;
        }
        #_authGate .gate-logo::before {
          content:''; position:absolute; inset:0; border-radius:14px;
          background:linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 50%);
          pointer-events:none;
        }
        #_authGate .gate-logo span {
          font:600 22px ${FONT}; letter-spacing:-0.022em;
          background:linear-gradient(180deg, #FFFFFF 0%, #999 100%);
          -webkit-background-clip:text; background-clip:text;
          -webkit-text-fill-color:transparent;
          position:relative; z-index:1;
        }
        #_authGate .gate-orbit {
          position:absolute; inset:-8px; border-radius:50%;
          border:1px dashed rgba(255,255,255,0.15);
          animation:_gateRotate 16s linear infinite;
          pointer-events:none;
        }
        #_authGate .gate-orbit::before, #_authGate .gate-orbit::after {
          content:''; position:absolute; width:5px; height:5px; border-radius:50%;
        }
        #_authGate .gate-orbit::before { top:-3px; left:50%; transform:translateX(-50%); background:#00E5B0; box-shadow:0 0 10px #00E5B0; }
        #_authGate .gate-orbit::after { bottom:-3px; left:50%; transform:translateX(-50%); background:#0A84FF; box-shadow:0 0 10px #0A84FF; }

        #_authGate h1 {
          font:600 24px ${FONT}; letter-spacing:-0.022em; line-height:1.2;
          margin:0 0 6px; color:#F5F5F7 !important; text-align:center;
          position:relative; z-index:2;
        }
        #_authGate .gate-sub {
          font:13px ${FONT}; color:rgba(235,235,245,0.55); letter-spacing:-0.012em;
          line-height:1.4; margin:0 0 30px; text-align:center;
          position:relative; z-index:2;
        }
        #_authGate .gate-sub .dot { display:inline-block; width:3px; height:3px; border-radius:50%; background:rgba(235,235,245,0.4); vertical-align:middle; margin:0 6px; }

        #_authGate .gate-label {
          display:block; font:500 11px ${FONT}; color:rgba(235,235,245,0.55);
          letter-spacing:0.04em; margin-bottom:8px; text-transform:uppercase;
          position:relative; z-index:2;
        }
        #_authGate input {
          width:100%; padding:13px 16px; border:0.5px solid rgba(255,255,255,0.18); border-radius:11px;
          font:15px ${FONT}; letter-spacing:0.04em;
          background:rgba(0,0,0,0.4); outline:none; color:#F5F5F7;
          margin-bottom:8px;
          transition:200ms cubic-bezier(0.4,0,0.2,1);
          box-sizing:border-box;
          position:relative; z-index:2;
        }
        #_authGate input:focus {
          border-color:rgba(0,229,176,0.6); background:rgba(0,229,176,0.04);
          box-shadow:0 0 0 4px rgba(0,229,176,0.12), 0 0 24px rgba(0,229,176,0.18);
        }
        #_authGate input::placeholder { color:rgba(235,235,245,0.22); letter-spacing:0.2em; }

        #_authGate .gate-err {
          font:12px ${FONT}; color:#FF453A; letter-spacing:-0.012em;
          min-height:14px; opacity:0; transition:opacity 200ms; margin-bottom:6px;
          text-align:center; position:relative; z-index:2;
        }
        #_authGate.err .gate-err { opacity:1; }
        #_authGate.err input { border-color:#FF453A; box-shadow:0 0 0 3px rgba(255,69,58,0.2); animation:_gateShake 320ms cubic-bezier(0.36,0.07,0.19,0.97); }

        #_authGate button {
          width:100%; padding:13px; border:none; border-radius:11px;
          font:600 14px ${FONT}; letter-spacing:-0.012em; cursor:pointer;
          transition:280ms cubic-bezier(0.4,0,0.2,1);
          margin-top:8px;
          color:#0A0A0B;
          background:linear-gradient(180deg, #FFFFFF 0%, #E8E8E8 100%);
          position:relative; overflow:hidden; z-index:2;
          box-shadow:0 1px 0 rgba(255,255,255,0.4) inset, 0 4px 12px rgba(0,0,0,0.3);
        }
        #_authGate button::before {
          content:''; position:absolute; top:0; left:-100%; width:60%; height:100%;
          background:linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          transform:skewX(-20deg);
          transition:left 700ms cubic-bezier(0.4,0,0.2,1);
        }
        #_authGate button:hover { transform:translateY(-1px); box-shadow:0 1px 0 rgba(255,255,255,0.4) inset, 0 8px 20px rgba(0,0,0,0.4), 0 0 0 4px rgba(255,255,255,0.06); }
        #_authGate button:hover::before { left:120%; }
        #_authGate button:active { transform:translateY(0); }
        #_authGate button span.arrow { display:inline-block; transition:transform 240ms; margin-left:6px; }
        #_authGate button:hover span.arrow { transform:translateX(3px); }

        #_authGate .gate-footer {
          margin-top:26px; padding-top:18px;
          border-top:0.5px solid rgba(255,255,255,0.06);
          display:flex; align-items:center; justify-content:space-between;
          font:10px 'JetBrains Mono','SF Mono', monospace;
          color:rgba(235,235,245,0.38); letter-spacing:0.12em;
          text-transform:uppercase;
          position:relative; z-index:2;
        }
        #_authGate .gate-status { display:flex; align-items:center; gap:6px; }
        #_authGate .gate-status::before {
          content:''; width:6px; height:6px; border-radius:50%;
          background:#00E5B0; box-shadow:0 0 8px #00E5B0;
          animation:_gateDot 2s ease-in-out infinite;
        }
      </style>

      <!-- Ambient orbs · cambian de color según theme activo via CSS vars -->
      <div class="gate-orb" id="_gateOrb1" style="width:480px;height:480px;top:-100px;left:-80px;background:radial-gradient(circle,var(--gate-orb-1, rgba(10,132,255,0.18)) 0%,transparent 70%);animation:_gateOrb1 18s ease-in-out infinite"></div>
      <div class="gate-orb" id="_gateOrb2" style="width:520px;height:520px;bottom:-120px;right:-100px;background:radial-gradient(circle,var(--gate-orb-2, rgba(0,229,176,0.14)) 0%,transparent 70%);animation:_gateOrb2 22s ease-in-out infinite"></div>
      <div class="gate-orb" id="_gateOrb3" style="width:380px;height:380px;top:50%;left:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,var(--gate-orb-3, rgba(124,58,237,0.10)) 0%,transparent 70%);animation:_gateOrb3 26s ease-in-out infinite"></div>

      <!-- Perspective grid floor -->
      <div class="gate-grid"></div>

      <!-- Scanlines barriendo · 2 sutiles -->
      <div class="gate-scanline" style="animation-delay:0s"></div>
      <div class="gate-scanline" style="animation-delay:3s;opacity:0.3"></div>

      <!-- Noise grain -->
      <div class="gate-noise"></div>

      <!-- Card glass -->
      <div class="gate-card">
        <!-- Logo SMC con orbit ring + breathing -->
        <div class="gate-logo">
          <div class="gate-orbit"></div>
          <span>S</span>
        </div>

        <h1>Iniciar sesión</h1>
        <p class="gate-sub">SMC Design System<span class="dot"></span>v15.3</p>

        <label class="gate-label" for="_authInput">Clave</label>
        <input type="password" id="_authInput" placeholder="••••••" autofocus autocomplete="off" autocapitalize="off" spellcheck="false">

        <div class="gate-err" id="_authErr"></div>

        <button id="_authBtn">Continuar<span class="arrow">→</span></button>

        <div class="gate-footer">
          <span>SMC OS · 2026</span>
          <span class="gate-status">LIVE</span>
        </div>
      </div>
    `;
    document.body.appendChild(gate);

    const input = document.getElementById('_authInput');
    const btn = document.getElementById('_authBtn');
    const err = document.getElementById('_authErr');

    function tryLogin() {
      const v = input.value.trim().toLowerCase();
      if (ROLES[v]) {
        localStorage.setItem(LS_KEY, v);
        gate.style.opacity = '0';
        gate.style.transition = 'opacity 360ms';
        setTimeout(() => { gate.remove(); init(); }, 360);
      } else {
        err.textContent = '✗ Clave inválida · intentá de nuevo';
        gate.classList.add('err');
        input.value = '';
        setTimeout(() => {
          gate.classList.remove('err');
          err.textContent = '';
        }, 2400);
      }
    }
    btn.onclick = tryLogin;
    input.addEventListener('keydown', e => { if (e.key === 'Enter') tryLogin(); });
  }

  function applyThemeToGate(themeId) {
    const colorMap = {
      'apple-premium':    ['rgba(10,132,255,0.18)', 'rgba(0,229,176,0.14)',  'rgba(124,58,237,0.10)'],
      'kanki-surf':       ['rgba(196,154,58,0.22)', 'rgba(27,47,78,0.30)',   'rgba(232,199,110,0.14)'],
      'infopet':          ['rgba(0,180,216,0.20)',  'rgba(0,229,176,0.18)',  'rgba(0,102,204,0.14)'],
      'smc-marketing':    ['rgba(0,229,176,0.22)',  'rgba(27,47,78,0.20)',   'rgba(0,180,216,0.14)'],
      'marketplace':      ['rgba(255,230,0,0.20)',  'rgba(0,102,204,0.20)',  'rgba(27,47,78,0.16)'],
      'discovery':        ['rgba(147,51,234,0.22)', 'rgba(0,229,176,0.14)',  'rgba(255,210,63,0.12)'],
      'intranet-dark':    ['rgba(0,229,176,0.22)',  'rgba(27,47,78,0.50)',   'rgba(147,51,234,0.14)'],
      'cerebro-ai':       ['rgba(147,51,234,0.22)', 'rgba(167,139,250,0.18)','rgba(45,27,78,0.30)']
    };
    const c = colorMap[themeId] || colorMap['apple-premium'];
    document.documentElement.style.setProperty('--gate-orb-1', c[0]);
    document.documentElement.style.setProperty('--gate-orb-2', c[1]);
    document.documentElement.style.setProperty('--gate-orb-3', c[2]);
  }

  // Listen for theme changes
  window.addEventListener('smc-theme-change', e => applyThemeToGate(e.detail.id));

  function init() {
    // Apply current theme to gate orbs
    const savedTheme = localStorage.getItem('smc-theme-v15') || 'apple-premium';
    applyThemeToGate(savedTheme);

    const role = getRole();
    if (!role) {
      showGate();
      return;
    }
    renderWelcome(role);
    applyFilter(role);

    // Block SO standalone page if user doesn't have OS access
    const isOSPage = document.body.dataset.requiresOs === 'true';
    if (isOSPage && !role.canSeeOS) {
      const block = document.createElement('div');
      block.style.cssText = `position:fixed;inset:0;background:rgba(10,10,11,0.96);z-index:99998;display:flex;align-items:center;justify-content:center;font-family:${FONT};color:white;text-align:center;padding:32px`;
      block.innerHTML = `
        <div>
          <div style="font-size:72px;margin-bottom:18px">🔒</div>
          <h1 style="font-family:'Instrument Serif',Georgia,serif;font-size:48px;font-weight:400;margin:0 0 12px">Acceso restringido</h1>
          <p style="font-size:17px;color:#86868B;max-width:480px;margin:0 auto 24px;line-height:1.5">El Banco de Sistema Operativo está reservado para owner únicamente.<br>Tu rol actual: <strong>${role.user}</strong></p>
          <a href="javascript:history.back()" style="display:inline-block;padding:12px 24px;background:white;color:#0A0A0B;border-radius:980px;font-weight:600;text-decoration:none">← Volver</a>
        </div>
      `;
      document.body.appendChild(block);
    }
  }

  init();
})();
