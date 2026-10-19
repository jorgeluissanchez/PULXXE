# Design

## Context

El diseño fuente está en Figma: componente "Página / Desktop" (1440 px) y "Página / Mobile" (390 px), con variables de color, tipografías Black Ops One + Manrope y estilos de texto con nombre (H1–H4, Text/Lead, Label/Base…). Ver proposal.md para el porqué. El sitio es una sola página estática, sin backend.

## Goals / Non-Goals

**Goals:**
- Separar estrictamente presentación (markup + Tailwind) de motion (GSAP), de modo que el sitio funcione completo sin JavaScript.
- Que un desarrollador encuentre cualquier pieza por su nombre de Figma.
- Lighthouse ≥ 90 en las cuatro categorías en mobile.

**Non-Goals:**
- CMS, formularios con backend o blog.
- Reproducir variantes de prototipo que Figma no define (por ejemplo, estados de error de formularios).

## Decisions

### Estructura de carpetas (Atomic Design)
```
src/
  components/
    atoms/        Button, Kicker, Icon, Logo, Rule, Marker, Badge…
    molecules/    BenefitItem, StatCell, FrontCard, ProcessStep, SectorRow, FaqItem, FooterColumn…
    organisms/    SiteHeader, Hero, Purpose, Services, Process, WorkInAction, Fronts,
                  Results, Sectors, Monitoring, Faq, ClosingBanner, SiteFooter, WhatsappCorner
    templates/    LandingTemplate (orden de organismos)
  layouts/        BaseLayout (head, SEO, fuentes, JSON-LD)
  pages/          index.astro, 404.astro
  data/           site.ts (contacto, NAP, redes) y content.ts (textos de cada sección)
  motion/         index.ts (registro), y un módulo por comportamiento:
                  reveal.ts, marquee.ts, accordion.ts, process.ts, sectors.ts,
                  fronts.ts, faq.ts, header.ts
  styles/         global.css (Tailwind + tokens @theme)
  assets/         imágenes exportadas de Figma
```
Alternativa considerada: carpetas por sección. Se descartó porque el cliente pidió Atomic Design y porque átomos como Button o Kicker se repiten en casi todas las secciones.

### Contrato entre presentación y motion
Los componentes solo exponen atributos `data-motion="…"` y `data-*` de estado (por ejemplo `data-active`). Los módulos de `src/motion/` buscan esos atributos y nunca crean markup. Sin JS, el estado por defecto es el que dibuja Figma (panel 1 abierto, paso 03 activo, sector 1 activo, FAQ 01 abierto).

### Tailwind v4 vía PostCSS
`@tailwindcss/postcss` en `postcss.config.mjs` (pedido explícito del cliente) en lugar del plugin de Vite. Los tokens de Figma se declaran en `@theme` (`--color-navy`, `--color-paper`, `--text-h1`…), así las clases (`bg-navy`, `text-h2`) usan los mismos nombres que las variables de Figma. No se escribe CSS a mano salvo `@keyframes` y utilidades `@utility` para texto contorneado.

### Tipografía
Fuentes auto-alojadas con la Fonts API de Astro (`fontProviders.fontsource()`), Black Ops One y Manrope 400/700/800, con `preload` solo para las del primer pantallazo. Evita la petición a Google Fonts y mejora LCP.

### Imágenes
Las fotos se exportan de Figma una vez y viven en `src/assets/`; se sirven con `<Image>`/`<Picture>` de `astro:assets` (AVIF/WebP, `width`/`height` explícitos, `loading="lazy"` salvo el hero con `fetchpriority="high"`).

### Motion con GSAP + ScrollTrigger
- Un solo punto de entrada (`<script>` en BaseLayout) que importa `src/motion/index.ts`; Astro lo empaqueta y difiere.
- `gsap.matchMedia()` separa desktop (≥1024) y mobile, y respeta `prefers-reduced-motion` (no se registra ningún ScrollTrigger).
- Encaje de Frentes: `scrub` sobre `y` de la tarjeta central (96 px → 0) y de las laterales (0 → 0), ligado a la entrada de la sección.
- Sectores: `ScrollTrigger` con `pin` de la sección (alto = 4 × 60 vh), el progreso decide el índice activo; hover y foco siguen funcionando.
- Acordeón: transición de `flex-grow` con GSAP, sin capa de opacidad; el degradado vive en el panel y no cambia.

### SEO
`BaseLayout` recibe title/description/og y genera canonical, OG, Twitter, `theme-color`, JSON-LD `GeneralContractor` y `FAQPage` desde `src/data`. `@astrojs/sitemap` y `public/robots.txt`. `site` configurado con la URL de Vercel.

## Risks / Trade-offs

- [El pin de Sectores alarga la página y puede marear en pantallas bajas] → Solo se activa en desktop con alto ≥ 700 px; en mobile la sección es estática con selección por toque.
- [Fotos de Figma pesadas] → Exportar a 2× máximo y dejar que `astro:assets` genere tamaños responsive.
- [Los textos en Black Ops One no tienen todos los glifos] → Revisar tildes y signos en la comparación visual; Black Ops One incluye latín extendido.
- [Datos de contacto de ejemplo] → Centralizados en `src/data/site.ts` y señalados en el README.

## Migration Plan

1. Construir y verificar en local (`astro build` + Playwright).
2. Crear repositorio en GitHub y subir.
3. Importar en Vercel (preset Astro, sin variables de entorno) y verificar la URL.
4. Rollback: Vercel permite promover el despliegue anterior.

## Open Questions

- Dominio definitivo (por ejemplo `pulxxe.com`); se configura después en Vercel sin cambiar el código salvo `site`.
- Número real de WhatsApp y enlaces de redes.
