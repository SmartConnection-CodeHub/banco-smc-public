# Panel Admin — Ambientes

## 1. DEV (local)
Carpeta: `./DEV/`
Última maqueta: `2026-04-29_154700-admin.html` (29 abr, 17:58)
Abrir: doble-click sobre el HTML
Stack: HTML + CSS + JS inline (maqueta estática)

## 2. GitHub Pages
URL: https://smartconnection-codehub.github.io/kanki-maquetas/admin.html
Repo: SmartConnection-CodeHub/kanki-maquetas
Last-modified: 2026-05-02 00:45
Estado: 🟢 LIVE — solo visual, sin login funcional

## 3. QAS (GitHub Pages + dominio custom — $0)
URL: https://qas.kanki.smconnection.cl/admin.html
URL alterna: https://smartconnection-codehub.github.io/kanki-maquetas/admin.html
Repo: SmartConnection-CodeHub/kanki-maquetas (rama main)
DNS: Route53 CNAME → smartconnection-codehub.github.io
HTTPS: Let's Encrypt automático (provisión 5-30 min tras propagación DNS)
Deploy: push a main → GitHub Pages publica solo
Costo: $0 AWS, $0 GitHub
Nota: maqueta sin login funcional (solo visual)

## 4. PROD AWS
URL: https://kanki.smconnection.cl/admin
Tamaño: ~10KB (login screen activo)
Auth: Supabase Auth (login email/password)
Funciones detectadas en HTML: stat-cards, tablas pedidos, modales CRUD, status-select pedidos
Estado: 🟢 LIVE con login funcional
Last-modified: 2026-05-02 00:40
