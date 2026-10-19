// Verifica Sectores: columna derecha centrada y sector activo cambiando con el scroll
import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
for (const [w, h] of [[1316, 600], [1440, 900]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.goto(process.argv[2] ?? 'http://localhost:4321/', { waitUntil: 'networkidle' });
  await p.$eval('[data-motion="sectors"]', (el) => el.scrollIntoView()); await p.waitForTimeout(400);
  const out = [];
  for (let i = 0; i < 10; i++) {
    out.push(await p.evaluate(() => {
      const list = document.querySelector('[data-sectors-list]').parentElement;
      const a = list.firstElementChild.getBoundingClientRect(), z = list.lastElementChild.getBoundingClientRect();
      return `${Math.round((a.top + z.bottom) / 2 - innerHeight / 2)}:${document.querySelector('[data-sector][data-active="true"]').dataset.sector}`;
    }));
    await p.mouse.wheel(0, 250); await p.waitForTimeout(350);
  }
  console.log(`${w}x${h}`, 'desvío_centro:sector →', out.join('  '));
  await p.close();
}
await b.close();
