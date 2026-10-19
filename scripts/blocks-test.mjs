// Comprueba que el bloque visual principal de cada sección cabe en una pantalla de laptop.
import { chromium } from 'playwright';
const [W, H] = [Number(process.argv[2] ?? 1366), Number(process.argv[3] ?? 657)];
const sel = { servicios: '[data-motion="strips"]', proceso: '#proceso .flex.flex-col.gap-12', accion: '[data-motion="accordion"]', frentes: '#frentes .grid', resultados: 'section[aria-labelledby="resultado-title"] .grid', monitoreo: '[data-motion="collage"]', sectores: '[data-sectors-track]', faq: '#preguntas > div' };
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: W, height: H } });
await p.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 50)); } });
for (const [k, s] of Object.entries(sel)) {
  const r = await p.$eval(s, (e) => { const r = e.getBoundingClientRect(); return { top: r.top + scrollY, h: r.height }; });
  await p.evaluate((y) => scrollTo(0, y), r.top - 65 - Math.max(0, (H - 65 - r.h) / 2));
  await p.waitForTimeout(1300);
  const fits = r.h <= H - 65;
  console.log(k, Math.round(r.h), fits ? 'cabe' : 'NO CABE');
  await p.screenshot({ path: `screenshots/block-${k}.png` });
}
await b.close();
