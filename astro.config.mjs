// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// URL pública del sitio. Se usa en canonical, Open Graph y sitemap.
const SITE = process.env.SITE_URL ?? 'https://pulxxe.co';

/* ── Sitemap enriquecido ────────────────────────────────────────────────────────────────────────
 * Se genera al final del build leyendo el HTML ya compilado de cada página, así cualquier página nueva
 * entra sola con todas sus imágenes y videos:
 *  - <image:image>: cada foto de la página (la versión más grande del srcset, sin repetir tamaños).
 *  - <video:video>: cada video con miniatura (la foto de su tarjeta), título y descripción.
 *  - <lastmod>: fecha del último commit que tocó la página (Google solo usa lastmod si es real).
 * Sin <priority> ni <changefreq>: Google los ignora.
 */
const DIST = fileURLToPath(new URL('./dist/', import.meta.url));
const gitDate = (paths) => {
  try {
    const d = execSync(`git log -1 --format=%cI -- ${paths}`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    return d || undefined;
  } catch {
    return undefined;
  }
};
// Página → archivos de los que depende su contenido (para su lastmod)
const pageSources = { '/': 'src public', '/privacidad': 'src/pages/privacidad.astro src/data/site.ts' };
const abs = (u) => new URL(u, SITE).href;
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
const largest = (tag) => {
  const set = attr(tag, 'srcset');
  if (!set) return attr(tag, 'src');
  return set.split(',').map((s) => s.trim().split(/\s+/)).sort((a, b) => parseInt(b[1]) - parseInt(a[1]))[0][0];
};
const decode = (t = '') => t.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

function enrich(item) {
  const path = new URL(item.url).pathname.replace(/\/$/, '') || '/';
  item.lastmod = gitDate(pageSources[path] ?? `src/pages${path}.astro`) ?? new Date().toISOString();
  const file = path === '/' ? `${DIST}index.html` : `${DIST}${path.slice(1)}/index.html`;
  const alt = `${DIST}${path.slice(1)}.html`;
  const html = existsSync(file) ? readFileSync(file, 'utf8') : existsSync(alt) ? readFileSync(alt, 'utf8') : '';
  if (!html) return item;

  // Imágenes: una entrada por foto (se agrupan los distintos tamaños de la misma imagen)
  const seen = new Set();
  const img = [];
  for (const tag of html.match(/<img\b[^>]*>/g) ?? []) {
    const src = largest(tag);
    if (!src || /\.svg($|\?)/.test(src) || src.startsWith('data:')) continue;
    const key = src.replace(/_[A-Za-z0-9]+\.(webp|avif|jpe?g|png)$/, '');
    if (seen.has(key)) continue;
    seen.add(key);
    img.push({ url: abs(src) });
  }
  if (img.length) item.img = img.slice(0, 1000);

  // Videos: miniatura = la primera foto de la misma tarjeta
  const video = [];
  for (const block of html.split(/<article\b/).slice(1)) {
    const tag = block.match(/<video\b[^>]*data-panel-video[^>]*>/)?.[0];
    if (!tag) continue;
    const mp4 = block.match(/<source[^>]*src="([^"]+\.mp4)"/)?.[1];
    const thumbTag = block.match(/<img\b[^>]*>/)?.[0];
    const title = decode(attr(tag, 'data-title'));
    const description = decode(attr(tag, 'data-description'));
    if (!mp4 || !thumbTag || !title || !description) continue;
    video.push({
      thumbnail_loc: abs(largest(thumbTag)),
      title,
      description,
      content_loc: abs(mp4),
      family_friendly: 'yes',
      requires_subscription: 'no',
    });
  }
  if (video.length) item.video = video;
  return item;
}

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  // Conserva los espacios entre elementos inline (comportamiento previo a Astro 7).
  compressHTML: true,
  integrations: [
    sitemap({ serialize: enrich, xslURL: '/sitemap.xsl' }),
    // Google Tag Manager (y GA4 dentro de él) corre en un web worker; dataLayer.push se reenvía al worker
  ],
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