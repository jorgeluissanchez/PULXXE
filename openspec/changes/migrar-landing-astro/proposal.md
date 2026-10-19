# Proposal

## Why

La landing de Pulxxe existe solo como diseño en Figma (archivo `yDh4EUUIi5KpBcIlIDvGnC`, página "Desktop" y "Mobile"). Para posicionarse en Barranquilla necesita existir como sitio web rápido, accesible y optimizado para buscadores, fiel al diseño aprobado y con las interacciones de scroll que el cliente pidió.

## What Changes

- Nuevo sitio estático en Astro 7 que reproduce las 12 piezas de la landing (header, hero, propósito, lo que hacemos, proceso, obra en acción, frentes de obra, resultados, sectores, monitoreo, preguntas frecuentes, banner de cierre y pie) en desktop (1440) y mobile (390), responsive entre ambos.
- Capa **presentacional** organizada con Atomic Design (átomos, moléculas, organismos, plantillas, páginas) y estilos 100 % Tailwind CSS v4 cargado vía PostCSS, con los tokens de color, espaciado y tipografía de Figma.
- Capa de **motion** separada, con GSAP + ScrollTrigger: entradas al hacer scroll, marquee de valores, acordeón de "Obra en acción", proceso por pasos, sectores interactivos y FAQ.
- Ajustes pedidos por el cliente sobre el diseño de Figma:
  - "Frentes de obra": las tres tarjetas empiezan desfasadas y se **encajan alineadas** a medida que se hace scroll.
  - "Sectores": la columna derecha queda **sticky centrada** mientras el scroll recorre los cuatro sectores.
  - "Obra en acción": se elimina el control "Ver video" y el panel abierto ya no se oscurece con una capa de opacidad; solo lleva un **degradado** que da contraste al título y la descripción.
- SEO técnico: HTML semántico, metadatos, Open Graph, JSON-LD `GeneralContractor` + `FAQPage`, sitemap, robots, imágenes optimizadas y fuentes auto-alojadas.
- Repositorio en GitHub y despliegue en Vercel.

## Capabilities

### New Capabilities
- `landing-presentacion`: contenido, estructura, estilos y comportamiento responsive de la landing de una página.
- `landing-motion`: animaciones e interacciones ligadas al scroll, al hover y al teclado, incluido el respeto a `prefers-reduced-motion`.
- `seo-tecnico`: metadatos, datos estructurados, rendimiento y accesibilidad que afectan el posicionamiento.

### Modified Capabilities

## Impact

- Código nuevo en este repositorio (`src/`, `public/`, configuración de Astro, PostCSS y Tailwind).
- Dependencias: `astro`, `@astrojs/sitemap`, `gsap`, `tailwindcss`, `@tailwindcss/postcss`, `postcss`.
- Infraestructura: repositorio GitHub y proyecto Vercel con dominio `*.vercel.app` (el dominio propio queda pendiente).
- Datos pendientes del cliente que se dejan marcados: teléfono, NIT, correo y redes reales.
