// Pruebas de la capa de motion: node scripts/motion-test.mjs [url]
import { chromium } from 'playwright';

const url = process.argv[2] ?? 'http://localhost:4321/';
const launch = () => chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium' });
const errors = [];
const results = {};

const b = await launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
p.on('pageerror', (e) => errors.push(e.message));
p.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
await p.goto(url, { waitUntil: 'networkidle' });
results.motionReady = await p.evaluate(() => document.documentElement.dataset.motion);

// Header
await p.evaluate(() => scrollTo(0, 400));
await p.waitForTimeout(500);
results.headerScrolled = await p.getAttribute('[data-motion="header"]', 'data-scrolled');

// Frentes: posición vertical de cada tarjeta en distintos puntos del scroll
const fronts = await p.$('[data-motion="fronts"]');
const top = await fronts.evaluate((el) => el.getBoundingClientRect().top + scrollY);
const offs = [];
for (const d of [-700, -450, -200, 100]) {
  await p.evaluate((y) => scrollTo(0, y), top + d);
  await p.waitForTimeout(1200);
  offs.push(await p.$$eval('[data-front-card]', (cs) => cs.map((c) => Math.round(c.getBoundingClientRect().top))));
}
results.frontsTopsRelative = offs.map((row) => row.map((v) => v - row[0]));

// Sectores: sector activo y posición del bloque mientras se hace scroll
const sec = await p.$('[data-motion="sectors"]');
const sTop = await sec.evaluate((el) => el.getBoundingClientRect().top + scrollY);
const active = [];
for (let i = 0; i < 8; i++) {
  await p.evaluate((y) => scrollTo(0, y), sTop + i * 280);
  await p.waitForTimeout(450);
  active.push(
    await p.evaluate(() => [
      document.querySelector('[data-sector][data-active="true"]')?.dataset.sector,
      Math.round(document.querySelector('[data-sectors-pin]').getBoundingClientRect().top),
    ]),
  );
}
results.sectorsWhileScrolling = active;

// Acordeón: hover sobre el tercer panel
await p.locator('[data-panel="2"]').scrollIntoViewIfNeeded();
await p.waitForTimeout(300);
await p.hover('[data-panel="2"]');
await p.waitForTimeout(1000);
results.accordion = await p.$$eval('[data-panel]', (ps) => ps.map((x) => [x.dataset.open, Math.round(x.getBoundingClientRect().width)]));
results.noVideoControl = await p.evaluate(() => !document.body.innerText.toUpperCase().includes('VER VIDEO'));

// Proceso: hover sobre el paso 4
await p.locator('[data-step="3"] [data-step-trigger]').scrollIntoViewIfNeeded();
await p.hover('[data-step="3"] [data-step-trigger]');
await p.waitForTimeout(500);
results.process = await p.evaluate(() => [
  document.querySelector('[data-step][data-active="true"]')?.dataset.step,
  document.querySelector('[data-step-panel][data-active="true"]')?.dataset.stepPanel,
]);

// FAQ con teclado
const sum = p.locator('[data-faq] summary').nth(2);
await sum.scrollIntoViewIfNeeded();
await sum.focus();
await p.keyboard.press('Enter');
await p.waitForTimeout(900);
results.faq = await p.$$eval('[data-faq]', (ds) => ds.map((d) => d.open));
await b.close();

// Movimiento reducido: sin pin ni contenido oculto
const b2 = await launch();
const p2 = await b2.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
await p2.goto(url, { waitUntil: 'networkidle' });
await p2.evaluate(() => scrollTo(0, document.body.scrollHeight / 2));
await p2.waitForTimeout(600);
results.reducedPinSpacers = await p2.evaluate(() => document.querySelectorAll('.pin-spacer').length);
results.reducedHiddenRevealItems = await p2.evaluate(
  () => [...document.querySelectorAll('[data-motion="reveal"] > *')].filter((e) => getComputedStyle(e).opacity === '0').length,
);
await b2.close();

console.log(JSON.stringify(results, null, 1));
console.log('errors', errors);
