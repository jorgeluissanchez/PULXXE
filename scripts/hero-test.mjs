// Capturas del hero en varios tamaños: node scripts/hero-test.mjs (con el sitio servido en :4321)
import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium' });
for (const [w, h] of [[1366, 657], [1360, 640], [1280, 720], [1536, 730], [1440, 900], [1920, 1080], [390, 844]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  const r = await p.evaluate(() => {
    const word = document.querySelector('#inicio p[aria-hidden="true"]');
    const fs = parseFloat(getComputedStyle(word).fontSize);
    const content = document.querySelector('#inicio h1').closest('.order-1').getBoundingClientRect();
    return { wordFs: Math.round(fs), glyphBottom: Math.round(word.getBoundingClientRect().top + fs * 0.78 * 0.94), contentTop: Math.round(content.top), contentBottom: Math.round(content.bottom), heroBottom: Math.round(document.querySelector('#inicio').getBoundingClientRect().bottom), sw: document.documentElement.scrollWidth };
  });
  console.log(w, h, JSON.stringify(r));
  await p.screenshot({ path: `screenshots/hero-${w}x${h}.png` });
}
await b.close();
