# Tasks

## 1. Base del proyecto

- [x] 1.1 Configurar Astro 7, `@astrojs/sitemap`, Fonts API y PostCSS con `@tailwindcss/postcss`; verificar con `npm run build` sin errores
- [x] 1.2 Declarar tokens de Figma (colores, tipografías, tamaños) en `@theme` de `src/styles/global.css`; verificar que `bg-navy`/`text-h2` generan los valores de Figma
- [x] 1.3 Centralizar contenidos en `src/data/site.ts` y `src/data/content.ts`; verificar que ningún texto de sección está escrito dentro de los organismos

## 2. Assets

- [x] 2.1 Exportar de Figma fotos, recortes PNG (casa del hero, edificio de "Lo que hacemos") y el logo en SVG a `src/assets`; verificar que cada imagen de la página tiene archivo
- [x] 2.2 Generar imagen Open Graph 1200×630 y favicon; verificar que existen en `public/`

## 3. Capa presentacional (Atomic Design)

- [x] 3.1 Átomos: Button (dashed, hover amarillo claro), Kicker, Logo, Icon, Rule, Marker; verificar visualmente en la página
- [x] 3.2 Moléculas: StatCell, BenefitItem, FrontCard, ProcessStep, SectorRow, FaqItem, FooterColumn, AccordionPanel
- [x] 3.3 Organismos de las 13 piezas (header, hero, 02 a 10, banner de cierre, pie) y el triángulo de WhatsApp
- [x] 3.4 Responsive 390 / 768 / 1024 / 1440 sin scroll horizontal; verificar con Playwright midiendo `scrollWidth`
- [x] 3.5 Quitar "Ver video" y la capa de opacidad del acordeón; dejar solo el degradado inferior; verificar en captura

## 4. Capa de motion (GSAP)

- [x] 4.1 Entrada `src/motion/index.ts` con `matchMedia` y reduced-motion; verificar que con `reducedMotion: reduce` no hay ScrollTriggers
- [x] 4.2 Reveals escalonados por sección y marquee infinito
- [x] 4.3 Acordeón de Obra en acción (hover, foco y toque)
- [x] 4.4 Proceso por pasos (hover, foco y scroll)
- [x] 4.5 Encaje de Frentes de obra con scrub; verificar en capturas a 0 %, 50 % y 100 % del recorrido
- [x] 4.6 Sectores sticky centrado con pin en desktop; verificar que el sector activo cambia con el scroll
- [x] 4.7 FAQ con `aria-expanded` y teclado; verificar con Playwright pulsando Enter
- [x] 4.8 Header que cambia de estado al hacer scroll

## 5. SEO y calidad

- [x] 5.1 Metadatos, canonical, OG, Twitter y JSON-LD `GeneralContractor` + `FAQPage`; verificar el HTML generado
- [x] 5.2 `robots.txt` y sitemap; verificar que existen en `dist/`
- [x] 5.3 `astro check` sin errores
- [x] 5.4 Comparación visual contra capturas de Figma en 1440 y 390
- [x] 5.5 Lighthouse mobile ≥ 90 en las cuatro categorías

## 6. Publicación

- [ ] 6.1 Crear repositorio en GitHub y subir el código; verificar que el repo muestra el último commit
- [ ] 6.2 Importar en Vercel y desplegar; verificar que la URL responde 200 y se ve igual que en local
- [ ] 6.3 Actualizar `site` con la URL final y redesplegar; verificar canonical y sitemap con la URL correcta

## Workflow follow-up

- Archivar el cambio con `openspec archive migrar-landing-astro` cuando el cliente apruebe.
