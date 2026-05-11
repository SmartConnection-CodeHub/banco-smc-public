# Storefront — Ambientes

## 1. DEV (local)
Carpeta: `./DEV/`
Última maqueta: `2026-04-29_183000-storefront-v2.html` (29 abr, 19:37)
Abrir: doble-click sobre el HTML
Stack: HTML + CSS + JS inline (maqueta estática, sin Supabase)

## 2. GitHub Pages
URL: https://smartconnection-codehub.github.io/kanki-maquetas/storefront.html
Repo: SmartConnection-CodeHub/kanki-maquetas
Last-modified: 2026-05-02 00:45
Estado: 🟢 LIVE — solo visual, sin backend

## 3. QAS (GitHub Pages + dominio custom — $0)
URL: https://qas.kanki.smconnection.cl/storefront.html
URL alterna: https://smartconnection-codehub.github.io/kanki-maquetas/storefront.html
Repo: SmartConnection-CodeHub/kanki-maquetas (rama main)
DNS: Route53 CNAME → smartconnection-codehub.github.io
HTTPS: Let's Encrypt automático (provisión 5-30 min tras propagación DNS)
Deploy: push a main → GitHub Pages publica solo
Costo: $0 AWS, $0 GitHub

## 4. PROD AWS
URL: https://kanki.smconnection.cl/
CloudFront origin: d3ewdch1a6ivht.cloudfront.net (otra cuenta AWS — no la principal SMC)
Stack real:
- HTML + JS modules: supabase.umd.js, supabase-init.js, auth.js, cart.js, store.js, chat.js, app.js, app-supabase.js
- Supabase Auth + DB + Realtime (chat)
- Cache CloudFront: s-maxage=31536000 (1 año — invalidar tras cada deploy)
Last-modified: 2026-05-02 00:40
Estado: 🟢 LIVE
