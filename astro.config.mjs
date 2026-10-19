// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// URL pública del sitio. Se usa en canonical, Open Graph y sitemap.
const SITE = process.env.SITE_URL ?? 'https://pulxxe-web.vercel.app';

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  // Conserva los espacios entre elementos inline (comportamiento previo a Astro 7).
  compressHTML: true,
  integrations: [sitemap()],
  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },
  // Fuentes auto-alojadas (subconjunto latín: cubre tildes, ñ, ¿ y ¡).
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Black Ops One',
      cssVariable: '--font-black-ops',
      fallbacks: ['Impact', 'sans-serif'],
      options: {
        variants: [{ src: ['./src/assets/fonts/black-ops-one-latin-400-normal.woff2'], weight: 400, style: 'normal' }],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Manrope',
      cssVariable: '--font-manrope',
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [
          { src: ['./src/assets/fonts/manrope-latin-400-normal.woff2'], weight: 400, style: 'normal' },
          { src: ['./src/assets/fonts/manrope-latin-700-normal.woff2'], weight: 700, style: 'normal' },
          { src: ['./src/assets/fonts/manrope-latin-800-normal.woff2'], weight: 800, style: 'normal' },
        ],
      },
    },
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: true,
});
