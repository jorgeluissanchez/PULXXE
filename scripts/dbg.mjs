import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await p.locator('#proceso').scrollIntoViewIfNeeded(); await p.waitForTimeout(1500);
console.log(await p.evaluate(() => [...document.querySelectorAll('[data-step-panel] img')].map(i => ({ c: i.complete, nw: i.naturalWidth, w: i.clientWidth, h: i.clientHeight, src: i.currentSrc.slice(-40), op: getComputedStyle(i.parentElement).opacity, act: i.parentElement.dataset.active }))));
await b.close();
