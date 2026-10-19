// Capturas para comparar con Figma: node scripts/shots.mjs [url]
import { chromium } from 'playwright';
const url = process.argv[2] ?? 'http://localhost:4321/';
const out = process.argv[3] ?? 'screenshots';
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
for (const [name, width, height] of [['desktop', 1440, 900], ['tablet', 820, 1100], ['mobile', 390, 844]]) {
  const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } window.scrollTo(0, 0); });
  await page.waitForTimeout(500);
  const sw = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
  console.log(name, 'scrollWidth/clientWidth', sw);
  await page.screenshot({ path: `${out}/${name}-full.png`, fullPage: true });
  const sections = await page.$$('main > section, body > footer');
  let i = 0;
  for (const s of sections) { await s.screenshot({ path: `${out}/${name}-s${String(i++).padStart(2, '0')}.png` }); }
  await page.close();
}
await browser.close();
