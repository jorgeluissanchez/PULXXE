import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Sectores: en desktop la sección queda fija y centrada (pin) mientras el scroll
 * recorre los 4 sectores. Puntero, foco y toque también cambian el sector.
 */
export function initSectors() {
  const root = document.querySelector<HTMLElement>('[data-motion="sectors"]');
  if (!root) return;
  const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-sector]'));
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-sector-panel]'));
  let current = 0;

  const activate = (i: number) => {
    if (i === current) return;
    current = i;
    rows.forEach((r, k) => {
      r.dataset.active = String(k === i);
      r.querySelector('[data-sector-trigger]')?.setAttribute('aria-pressed', String(k === i));
    });
    panels.forEach((p, k) => {
      p.dataset.active = String(k === i);
      p.setAttribute('aria-hidden', String(k !== i));
    });
  };

  rows.forEach((row, i) => {
    const btn = row.querySelector<HTMLElement>('[data-sector-trigger]');
    btn?.addEventListener('mouseenter', () => activate(i));
    btn?.addEventListener('focus', () => activate(i));
    btn?.addEventListener('click', () => activate(i));
  });

  const pinTarget = root.querySelector<HTMLElement>('[data-sectors-pin]');
  const canPin = window.matchMedia('(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)');
  if (!pinTarget || !canPin.matches) return;

  ScrollTrigger.create({
    trigger: pinTarget,
    start: 'center center',
    end: () => `+=${window.innerHeight * 0.6 * rows.length}`,
    pin: root,
    pinSpacing: true,
    anticipatePin: 1,
    onUpdate: (self) => activate(Math.min(rows.length - 1, Math.floor(self.progress * rows.length))),
  });
}
