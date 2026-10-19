# Pulxxe · Landing

Sitio de Pulxxe (ingeniería y construcción en Barranquilla) hecho con **Astro 7**, **Tailwind CSS 4 vía PostCSS** y **GSAP + ScrollTrigger**.
El diseño fuente está en Figma: archivo `yDh4EUUIi5KpBcIlIDvGnC`, páginas "🖥 Desktop" y "📱 Mobile".

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor local en `http://localhost:4321` |
| `npm run build` | Genera el sitio estático en `dist/` |
| `npm run preview` | Sirve `dist/` para revisarlo |
| `npm run check` | Revisión de tipos y plantillas Astro |
| `node scripts/motion-test.mjs` | Prueba automática de las animaciones (con `preview` corriendo) |
| `node scripts/shots.mjs` | Capturas desktop / tablet / mobile en `screenshots/` |

## Organización

```
src/
  components/
    atoms/        Button, Kicker, Icon, Logo, Ruler, MeasureRuler, Marker, Tag
    molecules/    StatCell, ProcessStep, AccordionPanel, FrontCard, SectorRow,
                  ProgressBoard, Marquee, FaqItem, BenefitItem, FooterColumn
    organisms/    SiteHeader, Hero, Purpose, Services, Process, WorkInAction, Fronts,
                  Results, Sectors, Monitoring, Faq, ClosingBanner, SiteFooter, WhatsappCorner
    templates/    LandingTemplate (orden de secciones)
  layouts/        BaseLayout (SEO, JSON-LD, fuentes, motion)
  pages/          index, privacidad, 404, robots.txt
  data/           site.ts (contacto y negocio) · content.ts (textos e imágenes)
  motion/         capa GSAP, un módulo por comportamiento
  styles/         global.css (tokens de Figma en @theme)
  assets/         imágenes y fuentes
openspec/         plan del proyecto (OpenSpec)
```

**Dos capas separadas:**

1. **Presentación (Atomic Design + Tailwind):** todo el markup y el estilo. Funciona completo sin JavaScript.
2. **Motion (`src/motion`):** GSAP solo lee atributos `data-motion`, `data-active`, `data-open`… y nunca crea HTML. Respeta `prefers-reduced-motion`.

| Efecto | Módulo |
| --- | --- |
| Header que cambia al hacer scroll | `header.ts` |
| Entrada del hero y parallax | `hero.ts` |
| Apariciones escalonadas, máscaras de imagen, parallax | `reveal.ts` |
| Proceso por pasos (hover, foco y scroll) | `process.ts` |
| Acordeón "Obra en acción" (sin "ver video", solo degradado) | `accordion.ts` |
| Frentes de obra que se encajan alineados con el scroll | `fronts.ts` |
| Sectores con la sección fija y centrada (pin) | `sectors.ts` |
| Contador 78 %, barras de avance y sello | `monitoring.ts` |
| Preguntas frecuentes animadas | `faq.ts` |

## Datos por confirmar con el cliente

Todos están en `src/data/site.ts`: teléfono / WhatsApp, NIT, correo y enlaces de redes. Al cambiarlos se actualizan el pie, el botón de WhatsApp y los datos estructurados.

## SEO incluido

Title y description por página, canonical, Open Graph / Twitter, `lang="es-CO"`, geo meta, JSON-LD `GeneralContractor` + `FAQPage`, `sitemap-index.xml`, `robots.txt`, imágenes WebP responsive con tamaños explícitos, fuentes auto-alojadas con precarga y un solo `h1`.

## Dominio

La URL pública se define con la variable `SITE_URL` (por defecto `https://pulxxe-web.vercel.app`). Al conectar el dominio propio en Vercel, crea `SITE_URL=https://tudominio.com` en las variables del proyecto y vuelve a desplegar.
