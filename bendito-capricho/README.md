# Bendito Capricho · documentación técnico-funcional

> **Para:** Sebastián (review interno SMC)
> **Cliente del proyecto:** María José Norambuela — Bendito Capricho
> **Proveedor que entregó:** Créalo SpA (Sergio Gary)
> **Posición SMC:** segunda opinión técnica · no somos los implementadores

---

## 📄 Documentos

- [**index.html**](index.html) — Maqueta completa con arquitectura Visio + 10 secciones (Versión corregida 2026-05-11 20:10 · solo procesos REALES de Fase 1)
- [**ENTREGA-FASE1-CREALO.pdf**](ENTREGA-FASE1-CREALO.pdf) — PDF oficial firmado por Sergio Gary · 9 páginas · fuente de verdad

## 🔄 Versión actual: v2 (corregida)

**Cambio importante respecto a v1:** la primera versión inventó 3 procesos (cierres de caja, inventario 8 pasos, pipeline captación 7 etapas) presentándolos como si fueran de Fase 1, cuando el PDF oficial los lista como Fase 2-3 planificadas. **v2 separa explícitamente lo entregado de lo planificado:**

- **Sección 02 · Procesos Fase 1 entregada** · 14 flujos verificados según PDF punto 12
  - Grupo A: Login + Cron generación checklists (2 flujos)
  - Grupo B: Checklists · responder, completar, revisar, filtrar (4 flujos)
  - Grupo C: Tareas adhoc (1 flujo)
  - Grupo D: Supervisión · dashboard, reportes, calendario (3 flujos)
  - Grupo E: Gestión · emprendedores, usuarios, scope (3 flujos)
  - Grupo F: PWA mobile (1 flujo)
- **Sección 02b · Procesos Fase 2-3 planificados** (NO construidos) · cards con badge "FASE 2" o "FASE 3"

```
https://smartconnection-codehub.github.io/banco-smc-public/bendito-capricho/
```

10 secciones:

| # | Sección | Contenido |
|---|---------|-----------|
| 01 | **Visión** | 6 cards · qué resuelve la plataforma |
| 02 | **Procesos** | 3 flujos dinámicos con ▶ Play (inventario 8 pasos · cierre caja · captación 7 etapas) |
| 03 | **Arquitectura** | Visio enterprise estilo Cencomall · 3 zonas (Next.js · Airtable · Vercel) · SVG con conectores · post-its |
| 04 | **Mapa INT** | Matriz permisos 8 roles × 10 módulos · 8 departamentos · 10 usuarios · 6 fases |
| 05 | **BA** | Antes/después + 6 reglas de negocio |
| 06 | **Opp** | Pipeline 7 etapas captación emprendedores |
| 07 | **Approval** | 3 flujos aprobación horizontales (cierre · pago empr · gasto extra) |
| 08 | **Secuencias** | 3 diagramas ASCII en tabs (nuevo emprendedor · cron 7am · descuadre) |
| 09 | **Cifras** | 20 KPIs con counters animados |
| 10 | **RFP** | Contexto · problema · hipótesis · 8 KPIs baseline→target · 7 riesgos · stack · roadmap 6 fases |

---

## 🎯 Para qué la abre Sebas

1. **Revisar el stack elegido por Créalo** (Next.js + Airtable + Vercel) — ¿es defendible para 19 usuarios o sobre/sub-diseñado?
2. **Validar los 3 flujos críticos** (inventario · cierre caja · captación) — ¿faltan pasos?
3. **Cuestionar las 3 inconsistencias** detectadas en la respuesta-stack de Sergio:
   - Costos Airtable Team: $20 vs $100 USD/mes (los 2 docs originales no coinciden)
   - Straw man HTML vanilla vs Next.js (yo sugerí Supabase + AWS, no HTML vanilla)
   - Falsa dicotomía Vercel-fácil vs AWS-complejo (Supabase también es PaaS sin DevOps)
4. **Decidir posición SMC**: ¿refutamos formalmente · validamos y soltamos · proponemos absorber el proyecto · solo dejamos pasar?

---

## 📂 Archivos en este folder

```
bendito-capricho/
├── README.md                              # este archivo
├── index.html                             # documento principal (144 KB · 10 secciones)
└── rfp/
    └── 2026-05-11-rfp-bendito-capricho.html   # mismo doc (alias para acceso directo a sección RFP)
```

---

## 🔗 Documentos originales que recibimos

Carpeta `~/Downloads/` con los 11 archivos que envió Sergio Gary:

- `PROPUESTA-BENDITO-CAPRICHO.md` · propuesta v1.0 04-may-2026
- `propuesta-arquitectura.md` · 1.459 líneas · 18 tablas Airtable detalladas
- `analisis-finanzas.md` · módulo financiero
- `analisis-marketing-comercial.md` · Marketing + Comercial + Logística Web
- `analisis-operaciones-admin.md` · Gerencia + Admin + Inventario + Tiendas
- `ENTREGA-FASE1.md` · 10 módulos en producción · 12 endpoints API
- `MANUAL-USUARIO.md` · guía para el equipo BC
- `MENSAJE-PARA-BC.md` · email setup Google Workspace + DNS
- `RESPUESTA-STACK-GUILLERMO.md` · defensa del stack vs nuestra sugerencia
- `TOKEN-TRACKING.md` · estimado ~3.5M-4.5M tokens proyecto completo

---

## 🛡 Decisión sin tomar todavía

Después de que Sebas revise, definimos:
- [ ] Refutar técnicamente las 3 inconsistencias del doc de Sergio
- [ ] Validar y dejar correr Fase 1
- [ ] Proponer asociación / absorción del proyecto
- [ ] Solo mentoria externa sin tomar el proyecto

*Generado por SMC OS · Cerebro + Functional-Lead + Architect en modo Sentinela · 2026-05-11*
