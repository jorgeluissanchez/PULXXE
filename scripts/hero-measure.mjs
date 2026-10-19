import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 1366, height: 657 } });
await p.goto('http://localhost:4321/', { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
const r = await p.evaluate(() => {
  const q = s => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y - 65), w: Math.round(r.width), h: Math.round(r.height), fs: getComputedStyle(e).fontSize }; };
  return { hero: q('#inicio'), word: q('[data-motion="hero-word"]'), img: q('[data-motion="hero-image"]'), content: q('[data-motion="hero-content"]'), h1: q('#inicio h1'), p: q('#inicio p.type-body'), kicker: q('#inicio h1').y };
});
console.log(JSON.stringify(r));
await p.screenshot({ path: 'screenshots/hero-1366x657.png' });
await b.close();
