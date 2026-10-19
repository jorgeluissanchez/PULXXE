// Verifica que la columna izquierda de "Nosotros" quede centrada en pantalla al hacer scroll
import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
for (const h of [800, 1000]) {
  const p = await b.newPage({ viewport: { width: 1440, height: h } });
  await p.goto(process.argv[2] ?? 'http://localhost:4321/', { waitUntil: 'networkidle' });
  await p.$eval('#nosotros', (el) => el.scrollIntoView()); await p.waitForTimeout(500);
  const out = [];
  for (let i = 0; i < 6; i++) {
    out.push(await p.$eval('#nosotros', (s) => {
      const col = s.querySelector('.lg\\:sticky');
      const a = col.firstElementChild.getBoundingClientRect(), z = col.lastElementChild.getBoundingClientRect();
      return Math.round((a.top + z.bottom) / 2 - innerHeight / 2);
    }));
    await p.mouse.wheel(0, 250); await p.waitForTimeout(350);
  }
  console.log('viewport', h, 'desvío del centro (px):', out);
  await p.close();
}
await b.close();
