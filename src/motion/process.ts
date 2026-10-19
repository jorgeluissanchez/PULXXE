import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Proceso: un paso activo a la vez, por puntero, foco, clic o avance del scroll (desktop). */
export function initProcess() {
  const root = document.querySelector<HTMLElement>('[data-motion="process"]');
  if (!root) return;
  const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-step]'));
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-step-panel]'));
  let current = steps.findIndex((s) => s.dataset.active === 'true');

  const activate = (i: number) => {
    if (i === current || i < 0) return;
    current = i;
    steps.forEach((s, k) => {
      s.dataset.active = String(k === i);
      s.querySelector('[data-step-trigger]')?.setAttribute('aria-pressed', String(k === i));
    });
    panels.forEach((p, k) => {
      p.dataset.active = String(k === i);
      p.setAttribute('aria-hidden', String(k !== i));
    });
  };

  steps.forEach((step, i) => {
    const trigger = step.querySelector<HTMLElement>('[data-step-trigger]');
    trigger?.addEventListener('mouseenter', () => activate(i));
    trigger?.addEventListener('focus', () => activate(i));
    trigger?.addEventListener('click', () => activate(i));
  });

  // Con scroll, el paso que cruza el centro del viewport se activa (solo desktop)
  if (window.matchMedia('(min-width: 1024px)').matches) {
    steps.forEach((step, i) => {
      ScrollTrigger.create({
        trigger: step,
        start: 'top 60%',
        end: 'bottom 60%',
        onEnter: () => activate(i),
        onEnterBack: () => activate(i),
      });
    });
  }
}
