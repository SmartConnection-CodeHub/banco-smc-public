# Bendito Capricho — Review entrega Créalo SpA (Fase 1)
**Fecha**: 2026-05-11 | **Posición SMC**: segunda opinión técnica · NO somos implementadores
**Cliente**: Bendito Capricho (María José Norambuela) | **Proveedor**: Créalo SpA (Sergio Gary)

---

## Qué es el cliente

Tienda retail de **accesorios** en Quilpué y San Antonio bajo modelo de **subarriendo de stands a emprendedores**: cada stand vende productos de un emprendedor distinto, BC cobra arriendo + comisión sobre ventas, paga al emprendedor menos mermas atribuibles. Equipo de **19 trabajadores** organizados en **8 departamentos**, operación 100% manual hoy (Word + Excel local + WhatsApp).

## Quién es el proveedor

**Créalo SpA** (RUT 78.408.754-9) — Sergio Gary. Estudio de desarrollo tecnológico que entregó Fase 1 el 06 mayo 2026. SMC entró como **second opinion** después de que Guillermo cuestionara decisiones técnicas en `RESPUESTA-STACK-GUILLERMO.md`.

## Stack entregado (Fase 1)

| Componente | Tecnología | Versión |
|-----------|------------|---------|
| Framework | Next.js App Router | 16.2.4 (versión no existe — verificar) |
| Lenguaje | TypeScript strict | 5.x |
| Base de datos | Airtable | API v0 · Free (⚠ 1.000 rows max) |
| Auth | NextAuth · magic link email | v5 |
| UI | Tailwind + shadcn/ui | v4 |
| Validación | Zod | 4.4.3 |
| Hosting | Vercel | Hobby (free) |
| Mobile | PWA + Service Worker | — |

**URL prod**: https://app-alpha-beige-15.vercel.app

## Qué entregaron en Fase 1

| Módulo | Estado | Descripción |
|--------|--------|-------------|
| Login + Auth | ✓ | Magic link, 8 roles |
| Mi Día (panel personal) | ✓ | Checklists y tareas del usuario |
| Dashboard supervisión | ✓ | Semáforo 8 departamentos |
| Checklists digitales | ✓ | 36 plantillas · 172 ítems · cron 7am |
| Revisión checklists | ✓ | Aprobar/rechazar con observación |
| Tareas ad-hoc | ✓ | Crear, asignar, completar |
| Emprendedores | ✓ | CRUD básico (sin pipeline) |
| Reportes semanales | ✓ | Comparativa + ranking |
| Calendario mensual | ✓ | Vista con indicadores estado |
| Gestión usuarios | ✓ | Crear/editar con roles |
| PWA mobile | ✓ | Instalable Android+iOS |
| Cron diario 7am | ✓ | Vercel cron + CRON_SECRET |

## Lo que NO está construido todavía

| Módulo | Fase | Estimación |
|--------|------|------------|
| Cierres de caja · depósitos · pagos | F2 | 3-4 sem |
| Comercial · pipeline emprendedores 7 etapas | F2 | incluido F2 |
| Marketing · calendario contenido RRSS | F2 | incluido F2 |
| Inventario digital 8 pasos + mermas | F3 | 2-3 sem |
| Administración · asistencia + liquidaciones | F4 | 2 sem |
| Portal emprendedores | F5 | 2-3 sem |
| Logística web + Paris marketplace | F6 | 2 sem |

## Dolores reales del negocio (hoy)

### 1. Cierres de caja sin cuadratura 🔴
- Excel local por tienda, descuadres se descubren mensual con Joel
- Sin foto arqueo obligatoria, sin segundo filtro digital
- **NO resuelto en Fase 1** · vendrá en F2

### 2. Pagos a emprendedores manuales 🔴
- Francis calcula a mano: ventas − comisión − mermas − subarriendo
- Pagos quincenales atrasan 3-5 días
- **NO resuelto en Fase 1** · vendrá en F2

### 3. Captación emprendedores se pierde 🟡
- DMs Instagram sueltos, sin pipeline, prospectos calientes se enfrían
- En Fase 1 solo hay CRUD básico de emprendedores, no pipeline 7 etapas
- **NO resuelto en Fase 1** · pipeline F2

### 4. Inventario en papel 🟡
- Emprendedor entrega hoja, líder firma, se pierden en bibliorato
- 48 hrs convertidas en 7 días
- **NO resuelto en Fase 1** · vendrá en F3

### 5. Checklists por WhatsApp ✅
- "¿completaste lo de hoy?" en grupos sin registro
- **RESUELTO Fase 1** · 36 plantillas + cron 7am + dashboard semáforo

### 6. María José sin visibilidad real-time ✅
- Revisaba estado el fin de semana cuando ya pasó la quincena
- **RESUELTO Fase 1** · dashboard semáforo + reportes semanales

## Posición SMC (review técnico)

### Score auditoría: 67/100 (C+) → objetivo 88/100 (B+) con 1 semana de fix

| Área | Score | Estado |
|------|-------|--------|
| Arquitectura | 14/20 | Sólido |
| Seguridad | 14/20 | Sólido |
| UX | 10/15 | Mejorable |
| Funcionalidad | 12/20 | Mejorable |
| Documentación | 7/15 | Falta manual |
| Base de datos | 8/20 | **Crítico** — Airtable Free se llena en 3 sem |

### 3 inconsistencias detectadas en respuesta-stack de Sergio

1. **Costos Airtable** — el ENTREGA-FASE1 dice "$100 USD/mes Team" pero RESPUESTA-STACK dice "$20/mes Team". 80 USD de diferencia cambia conclusión.
2. **Straw man HTML vanilla** — Guillermo sugirió Supabase + AWS, no HTML vanilla puro. Sergio infla la diferencia.
3. **Falsa dicotomía Vercel vs AWS** — Supabase es PaaS igual que Vercel (zero DevOps). Comparar Supabase con EC2 + IAM + VPC es trampa retórica.

### Donde tiene razón Sergio
- Stack ya está en producción funcionando
- Airtable como UI admin sin código es ventaja real para María José
- Para 19 usuarios no se justifica sobre-ingeniería

## Decisión SMC pendiente (4 caminos)

- [ ] **Refutar técnicamente** las 3 inconsistencias con counter-doc
- [ ] **Validar y soltar** — el stack está OK para esta escala
- [ ] **Pivot business** — proponer absorción/asociación del proyecto
- [ ] **Solo mentoría externa** sin tomar el proyecto

## Plan de acción 30 días (si SMC asesora)

| # | Acción | Tiempo | Costo |
|---|--------|--------|-------|
| 1 | Confirmar versión real Next.js | 1h | — |
| 2 | Migrar Airtable → Supabase | 3-5 días | dev externo si Créalo no |
| 3 | Upgrade Vercel Hobby → Pro | 30 min | $20/mes |
| 4 | Activar backups DB automáticos | 1h | incluido en Supabase |
| 5 | Separar dashboard por rol | 3-5 días | dev |
| 6 | Instalar Sentry | 0.5 días | free |
| 7 | Solicitar manual usuario a Créalo | coordinar | — |
| 8 | Aplicar 5 mejoras visuales P1/P2 | 1 sem | dev |
| 9 | Diseñar módulo tickets | 2-3 sem | F3 |

## Pasos inmediatos para producción real (5 ítems)

1. Lista definitiva de correos por persona (María José)
2. Google Workspace o usar correos personales
3. DNS · CNAME `app` → `cname.vercel-dns.com`
4. Upgrade Airtable Free → Team (antes 3 sem)
5. Capacitación 1h al equipo

## Archivos relacionados en este folder

```
bendito-capricho/
├── README.md                                       # navegación + URLs
├── index.html                                      # maqueta interactiva 11 secciones
├── ENTREGA-FASE1-CREALO.pdf                        # PDF oficial firmado · fuente verdad
├── 2026-05-11-bendito-capricho-review-crealo.md    # este archivo
├── rfp/
│   └── 2026-05-11-rfp-bendito-capricho.html        # mismo doc (alias acceso RFP)
└── reporte/
    └── reporte-crealo-fase1-standalone.html        # assessment SMC dark mode
```

## Versiones publicadas

| v | Fecha | Cambio principal |
|---|-------|------------------|
| v1 | 11-may 19:46 | Maqueta inicial · arquitectura + RFP |
| v2 | 11-may 20:05 | Procesos reales Fase 1 según PDF · quitar invenciones |
| v3 | 11-may 20:10 | Sección Reporte assessment integrada |
| v4 | 11-may 20:15 | Cifras con dashboards visuales tipo Cencosud |
| v5 | 11-may 20:20 | Síntesis minimalista · 3 bloques (Func/Téc/Cierre) |
| v6 | 11-may 20:25 | Procesos compactos dinámicos + Matriz navegable |
| v7 | 11-may 20:30 | Proceso homologado a Aprobación + sidebar versiones |
| v8 | 11-may 20:40 | Cifras minimalista (menos es más) |
| v9 | 11-may 20:50 | Focused & Clean global aplicado |

URL live: https://smartconnection-codehub.github.io/banco-smc-public/bendito-capricho/

---

*Generado por SMC OS · Cerebro + Functional-Lead + Architect en modo Sentinela · 2026-05-11*
