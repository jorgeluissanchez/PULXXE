// Revisa cada sección en un viewport de laptop: node scripts/sections-test.mjs [ancho] [alto]
import { chromium } from 'playwright';
const [W, H] = [Number(process.argv[2] ?? 1366), Number(process.argv[3] ?? 657)];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: W, height: H } });
await p.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } scrollTo(0, 0); });
await p.waitForTimeout(800);
const secs = await p.$$eval('main > section, main > div > section, section[id], section', (ss) => [...new Set(ss)].filter(s => !s.parentElement.closest('section')).map((s, i) => { const r = s.getBoundingClientRect(); return { i, id: s.id || s.dataset.motion || s.className.slice(0, 30), top: Math.round(r.top + scrollY), h: Math.round(r.height) }; }));
console.log(JSON.stringify(secs));
// elementos sticky más altos que el viewport
const tall = await p.evaluate((H) => [...document.querySelectorAll('*')].filter(e => getComputedStyle(e).position === 'sticky').map(e => { const sh = e.scrollHeight, r = e.getBoundingClientRect(); return { cls: e.className.toString().slice(0, 60), h: Math.round(r.height), content: sh, sec: e.closest('section')?.id || e.closest('section')?.dataset.motion }; }), H);
console.log('sticky', JSON.stringify(tall));
for (const s of secs) {
  for (const off of [0, Math.max(0, s.h - H)]) {
    await p.evaluate((y) => scrollTo(0, y), s.top + off - 0);
    await p.waitForTimeout(700);
    await p.screenshot({ path: `screenshots/sec-${s.i}-${off ? 'end' : 'start'}.png` });
    if (s.h <= H) break;
  }
}
await b.close();
