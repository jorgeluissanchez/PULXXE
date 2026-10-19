// Captura cada sección como una pantalla (dvh): node scripts/screens-test.mjs [ancho] [alto]
import { chromium } from 'playwright';
const [W, H] = [Number(process.argv[2] ?? 1366), Number(process.argv[3] ?? 657)];
const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: W, height: H } });
await p.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await p.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
const secs = await p.$$eval('main section, body > section, section', (ss) => [...new Set(ss)].filter((s) => !s.parentElement.closest('section')).map((s) => { const r = s.getBoundingClientRect(); return { id: s.id || s.getAttribute('aria-labelledby') || 'sec', top: Math.round(r.top + scrollY), h: Math.round(r.height) }; }));
const out = [];
for (const [i, s] of secs.entries()) {
  await p.evaluate((i) => { const all = [...document.querySelectorAll('section')].filter((x) => !x.parentElement.closest('section')); const el = all[i]; scrollTo(0, el.getBoundingClientRect().top + scrollY - (i === 0 ? 0 : 65)); }, i);
  await p.waitForTimeout(400);
  await p.screenshot({ path: `screenshots/scr-${W}x${H}-${String(i).padStart(2, '0')}.png` });
  out.push(`${s.id}:${s.h}`);
}
console.log(W, H, out.join('  '), 'scrollW', await p.evaluate(() => document.documentElement.scrollWidth));
await b.close();
