// SMC Design System · Theme Switcher · 8 themes · slide bar global
(function(){
  const SF = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif';
  const SF_TEXT = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", sans-serif';
  const MONO = '"JetBrains Mono", "SF Mono", ui-monospace, monospace';

  const THEMES = [
    {
      id: 'apple-premium',
      name: 'Apple Premium',
      emoji: '🍏',
      desc: 'Cream warm · Apple blue · SF Pro',
      vars: {
        '--bg':'#FFFFFF', '--bg-soft':'#F5F5F7', '--bg-warm':'#FAF7F4',
        '--text':'#1D1D1F', '--text-muted':'#6E6E73',
        '--accent':'#0066CC', '--border-soft':'#E5E5E7',
        '--smc-accent':'#00E5B0', '--smc-gold':'#C49A3A', '--smc-navy':'#1B2F4E',
        '--font-display': SF, '--font-sans': SF_TEXT, '--font-mono': MONO,
        '--display-weight':'600', '--display-tracking':'-0.022em', '--body-tracking':'-0.012em',
        '--display-style':'normal', '--theme-radius':'14px'
      }
    },
    {
      id: 'kanki-surf',
      name: 'Kanki Surf',
      emoji: '🏄',
      desc: 'Streetwear · serif italic · gold + navy',
      vars: {
        '--bg':'#FAF7F2', '--bg-soft':'#F4ECD8', '--bg-warm':'#FFF8E8',
        '--text':'#1B2F4E', '--text-muted':'#5C4716',
        '--accent':'#C49A3A', '--border-soft':'#E8DCB8',
        '--smc-accent':'#C49A3A', '--smc-gold':'#8A6B23', '--smc-navy':'#0A1322',
        '--font-display': '"Cormorant Garamond", "Instrument Serif", Georgia, serif',
        '--font-sans': '"Inter", -apple-system, sans-serif',
        '--font-mono': MONO,
        '--display-weight':'500', '--display-tracking':'-0.018em', '--body-tracking':'0',
        '--display-style':'italic', '--theme-radius':'4px'
      }
    },
    {
      id: 'kanki-black',
      name: 'Kanki Black',
      emoji: '🌊',
      desc: 'Dark surf · gold accent + serif',
      vars: {
        '--bg':'#0A1322', '--bg-soft':'#0F1C30', '--bg-warm':'#142847',
        '--text':'#FAF7F2', '--text-muted':'#B8C5DD',
        '--accent':'#C49A3A', '--border-soft':'rgba(196,154,58,0.18)',
        '--smc-accent':'#C49A3A', '--smc-gold':'#FFD23F', '--smc-navy':'#FAF7F2',
        '--font-display': '"Cormorant Garamond", "Instrument Serif", Georgia, serif',
        '--font-sans': '"Inter", -apple-system, sans-serif',
        '--font-mono': MONO,
        '--display-weight':'500', '--display-tracking':'-0.018em', '--body-tracking':'0',
        '--display-style':'italic', '--theme-radius':'4px'
      }
    },
    {
      id: 'infopet',
      name: 'InfoPet · Tsukai',
      emoji: '🐾',
      desc: 'Pet friendly · Nunito rounded · IA accent',
      vars: {
        '--bg':'#FFFFFF', '--bg-soft':'#EEF7F4', '--bg-warm':'#F0FAF7',
        '--text':'#0A1322', '--text-muted':'#3F557A',
        '--accent':'#00B4D8', '--border-soft':'#D6EDE5',
        '--smc-accent':'#00E5B0', '--smc-gold':'#0066CC', '--smc-navy':'#1B2F4E',
        '--font-display': '"Nunito", "Inter", -apple-system, sans-serif',
        '--font-sans': '"Nunito", "Inter", -apple-system, sans-serif',
        '--font-mono': MONO,
        '--display-weight':'800', '--display-tracking':'-0.025em', '--body-tracking':'-0.006em',
        '--display-style':'normal', '--theme-radius':'24px'
      }
    },
    {
      id: 'smc-marketing',
      name: 'SMC Marketing',
      emoji: '💡',
      desc: 'Light · smconnection.cl · Inter bold',
      vars: {
        '--bg':'#FFFFFF', '--bg-soft':'#F5F5F7', '--bg-warm':'#EEF7F4',
        '--text':'#1B2F4E', '--text-muted':'#6B7E9C',
        '--accent':'#00E5B0', '--border-soft':'#D6DEEA',
        '--smc-accent':'#00E5B0', '--smc-gold':'#C49A3A', '--smc-navy':'#1B2F4E',
        '--font-display': '"Inter", -apple-system, sans-serif',
        '--font-sans': '"Inter", -apple-system, sans-serif',
        '--font-mono': MONO,
        '--display-weight':'700', '--display-tracking':'-0.028em', '--body-tracking':'-0.012em',
        '--display-style':'normal', '--theme-radius':'12px'
      }
    },
    {
      id: 'smc-cosmic',
      name: 'SMC Cosmic',
      emoji: '🌌',
      desc: 'Dark cosmic · gradient mesh · Space Grotesk',
      vars: {
        '--bg':'#000000', '--bg-soft':'#0A0A14', '--bg-warm':'#13132E',
        '--text':'#F5F5F7', '--text-muted':'#9097B3',
        '--accent':'#00E5B0', '--border-soft':'rgba(255,255,255,0.08)',
        '--smc-accent':'#00E5B0', '--smc-gold':'#FFD23F', '--smc-navy':'#FFFFFF',
        '--font-display': '"Space Grotesk", "Inter", sans-serif',
        '--font-sans': '"Space Grotesk", "Inter", sans-serif',
        '--font-mono': MONO,
        '--display-weight':'600', '--display-tracking':'-0.03em', '--body-tracking':'0',
        '--display-style':'normal', '--theme-radius':'8px'
      }
    },
    {
      id: 'marketplace',
      name: 'Marketplace',
      emoji: '🛒',
      desc: 'B2C/B2G · yellow vibrant · Inter 800',
      vars: {
        '--bg':'#FFFFFF', '--bg-soft':'#FBF6E8', '--bg-warm':'#FFF8E8',
        '--text':'#1B2F4E', '--text-muted':'#6B7E9C',
        '--accent':'#FFE600', '--border-soft':'#E8DCB8',
        '--smc-accent':'#0066CC', '--smc-gold':'#FFE600', '--smc-navy':'#1B2F4E',
        '--font-display': '"Inter", -apple-system, sans-serif',
        '--font-sans': '"Inter", -apple-system, sans-serif',
        '--font-mono': MONO,
        '--display-weight':'800', '--display-tracking':'-0.035em', '--body-tracking':'-0.012em',
        '--display-style':'normal', '--theme-radius':'8px'
      }
    },
    {
      id: 'discovery',
      name: 'Discovery',
      emoji: '🔍',
      desc: 'Lab academic · JetBrains Mono · violet',
      vars: {
        '--bg':'#FAFAFA', '--bg-soft':'#F0F4F8', '--bg-warm':'#F5F0E8',
        '--text':'#1B2F4E', '--text-muted':'#6B7E9C',
        '--accent':'#9333EA', '--border-soft':'#D6DEEA',
        '--smc-accent':'#00E5B0', '--smc-gold':'#C49A3A', '--smc-navy':'#1B2F4E',
        '--font-display': '"JetBrains Mono", "SF Mono", monospace',
        '--font-sans': '"Inter", -apple-system, sans-serif',
        '--font-mono': MONO,
        '--display-weight':'500', '--display-tracking':'-0.04em', '--body-tracking':'0',
        '--display-style':'normal', '--theme-radius':'4px'
      }
    },
    {
      id: 'intranet-dark',
      name: 'Intranet Dark',
      emoji: '🖥️',
      desc: 'Dark premium · 24 agentes · Space Grotesk',
      vars: {
        '--bg':'#0A1322', '--bg-soft':'#131F35', '--bg-warm':'#1B2F4E',
        '--text':'#F5F5F7', '--text-muted':'#9AA9C2',
        '--accent':'#00E5B0', '--border-soft':'rgba(255,255,255,0.08)',
        '--smc-accent':'#00E5B0', '--smc-gold':'#C49A3A', '--smc-navy':'#0A1322',
        '--font-display': '"Space Grotesk", "Inter", sans-serif',
        '--font-sans': '"Inter", -apple-system, sans-serif',
        '--font-mono': MONO,
        '--display-weight':'600', '--display-tracking':'-0.025em', '--body-tracking':'-0.012em',
        '--display-style':'normal', '--theme-radius':'14px'
      }
    },
    {
      id: 'cerebro-ai',
      name: 'Cerebro AI',
      emoji: '🧠',
      desc: 'Italic editorial · Instrument Serif · purple',
      vars: {
        '--bg':'#FAFAFA', '--bg-soft':'#F5F0FA', '--bg-warm':'#FAF5FF',
        '--text':'#2D1B4E', '--text-muted':'#7B6B9C',
        '--accent':'#9333EA', '--border-soft':'#E0D6F0',
        '--smc-accent':'#A78BFA', '--smc-gold':'#C49A3A', '--smc-navy':'#2D1B4E',
        '--font-display': '"Instrument Serif", "Cormorant Garamond", Georgia, serif',
        '--font-sans': '"Inter", -apple-system, sans-serif',
        '--font-mono': MONO,
        '--display-weight':'400', '--display-tracking':'-0.022em', '--body-tracking':'0',
        '--display-style':'italic', '--theme-radius':'18px'
      }
    }
  ];

  // Inject Google Fonts loader if not present
  if (!document.getElementById('_themeFonts')) {
    const fl = document.createElement('link');
    fl.id = '_themeFonts';
    fl.rel = 'stylesheet';
    fl.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Inter:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Nunito:wght@400;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap';
    document.head.appendChild(fl);
  }

  // Inject theme-driven typography overrides (so headings auto-pick up theme font)
  if (!document.getElementById('_themeTypography')) {
    const ts = document.createElement('style');
    ts.id = '_themeTypography';
    ts.textContent = `
      body { font-family: var(--font-sans, ${SF_TEXT}); letter-spacing: var(--body-tracking, -0.012em); }
      body h1, body h2, body h3, body .hero-title, body .hub-title, body .sec-head h2 {
        font-family: var(--font-display, ${SF}) !important;
        font-weight: var(--display-weight, 600) !important;
        letter-spacing: var(--display-tracking, -0.022em) !important;
        font-style: var(--display-style, normal) !important;
      }
      body .font-mono, body code, body .eb, body [class*="mono"] { font-family: var(--font-mono, ${MONO}) !important; }
    `;
    document.head.appendChild(ts);
  }

  // Expose THEMES globally for other scripts (login gate, etc)
  window._SMC_THEMES = THEMES;

  const FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';
  const LS_KEY = 'smc-theme-v15';
  let current = localStorage.getItem(LS_KEY) || 'apple-premium';

  function applyTheme(id) {
    const t = THEMES.find(x => x.id === id);
    if (!t) return;
    Object.entries(t.vars).forEach(([k,v]) => document.documentElement.style.setProperty(k, v));
    document.body.dataset.theme = id;
    current = id;
    localStorage.setItem(LS_KEY, id);
    renderBar();
    // Notify any listeners (login gate background · custom UIs · etc)
    window.dispatchEvent(new CustomEvent('smc-theme-change', { detail: { id, theme: t } }));
  }

  window._setTheme = applyTheme;
  window._getCurrentTheme = () => THEMES.find(x => x.id === current);

  // ─── Theme Slide Bar · fija abajo siempre visible ───
  const bar = document.createElement('div');
  bar.id = '_themeBar';
  bar.style.cssText = `
    position:fixed; left:50%; bottom:24px; transform:translateX(-50%); z-index:9998;
    display:flex; align-items:center; gap:6px; padding:8px;
    background:rgba(20,20,22,0.78); backdrop-filter:saturate(180%) blur(28px); -webkit-backdrop-filter:saturate(180%) blur(28px);
    border:0.5px solid rgba(255,255,255,0.14); border-radius:999px;
    box-shadow:0 16px 48px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(255,255,255,0.06) inset;
    font-family:${FONT};
    max-width:calc(100vw - 32px); overflow-x:auto; scrollbar-width:none;
    animation:_themeBarIn 700ms cubic-bezier(0.16,1,0.3,1) both;
  `;
  document.body.appendChild(bar);

  // Inject styles ONCE
  if (!document.getElementById('_themeBarStyles')) {
    const styles = document.createElement('style');
    styles.id = '_themeBarStyles';
    styles.textContent = `
      @keyframes _themeBarIn { from { opacity:0; transform:translateX(-50%) translateY(12px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
      #_themeBar::-webkit-scrollbar { display:none; }
      #_themeBar .tb-label { padding:6px 12px; font:600 10px 'JetBrains Mono','SF Mono',monospace; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.45); white-space:nowrap; flex-shrink:0; }
      #_themeBar .tb-chip {
        display:inline-flex; align-items:center; gap:7px;
        padding:7px 12px 7px 8px; border-radius:99px;
        border:0.5px solid rgba(255,255,255,0.08);
        background:transparent; color:rgba(245,245,247,0.7);
        font:500 12px ${FONT}; letter-spacing:-0.012em;
        cursor:pointer; transition:all 240ms cubic-bezier(0.4,0,0.2,1);
        white-space:nowrap; flex-shrink:0;
      }
      #_themeBar .tb-chip:hover { background:rgba(255,255,255,0.06); color:#F5F5F7; border-color:rgba(255,255,255,0.18); }
      #_themeBar .tb-chip.active {
        background:rgba(255,255,255,0.96); color:#0A0A0B; border-color:rgba(255,255,255,0.96);
        box-shadow:0 4px 12px rgba(0,0,0,0.2);
      }
      #_themeBar .tb-chip .tb-emoji { font-size:14px; line-height:1; }
      #_themeBar .tb-chip .tb-dots { display:inline-flex; gap:2px; }
      #_themeBar .tb-chip .tb-dots span { width:5px; height:5px; border-radius:50%; }
      #_themeBar .tb-close { width:28px; height:28px; border-radius:50%; background:transparent; border:none; color:rgba(255,255,255,0.5); cursor:pointer; font-size:14px; flex-shrink:0; transition:all 200ms; }
      #_themeBar .tb-close:hover { background:rgba(255,255,255,0.08); color:#F5F5F7; }
      @media (max-width:640px) {
        #_themeBar { left:8px; right:8px; transform:none; max-width:none; bottom:12px; padding:6px; gap:4px; }
        #_themeBar .tb-label { display:none; }
        #_themeBar .tb-chip span:nth-child(2) { display:none; }
      }
    `;
    document.head.appendChild(styles);
  }

  function renderBar() {
    bar.innerHTML = `
      <div class="tb-label">🎨 Theme</div>
      ${THEMES.map(t => {
        const dots = `<div class="tb-dots"><span style="background:${t.vars['--smc-navy']}"></span><span style="background:${t.vars['--accent']}"></span><span style="background:${t.vars['--smc-accent']}"></span></div>`;
        return `<button class="tb-chip${t.id === current ? ' active' : ''}" data-tid="${t.id}" title="${t.desc}">
          <span class="tb-emoji">${t.emoji}</span>
          <span>${t.name}</span>
          ${dots}
        </button>`;
      }).join('')}
      <button class="tb-close" id="_themeBarClose" title="Cerrar (⌘T para reabrir)">×</button>
    `;
    bar.querySelectorAll('.tb-chip').forEach(chip => {
      chip.onclick = () => {
        applyTheme(chip.dataset.tid);
        chip.scrollIntoView({ behavior:'smooth', block:'nearest', inline:'center' });
      };
    });
    const closeBtn = document.getElementById('_themeBarClose');
    if (closeBtn) closeBtn.onclick = () => {
      bar.style.display = 'none';
      sessionStorage.setItem('_themeBarHidden', '1');
    };
  }

  // Toggle with ⌘T
  window.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 't') {
      e.preventDefault();
      const isHidden = bar.style.display === 'none';
      bar.style.display = isHidden ? 'flex' : 'none';
      sessionStorage.setItem('_themeBarHidden', isHidden ? '0' : '1');
    }
  });

  // Honor sessionStorage hide state
  if (sessionStorage.getItem('_themeBarHidden') === '1') {
    bar.style.display = 'none';
  }

  // Apply saved theme on load
  applyTheme(current);
})();
