import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 1316, height: 600 } });
await p.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await p.$eval('[data-motion="sectors"]', (el) => el.scrollIntoView());
for (let i = 0; i < 4; i++) { await p.mouse.wheel(0, 250); await p.waitForTimeout(350); }
await p.waitForTimeout(800);
await p.screenshot({ path: '/tmp/sect.png' });
await b.close();
