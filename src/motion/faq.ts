import { gsap } from 'gsap';

/** FAQ: <details> nativo con apertura animada; solo una pregunta abierta a la vez. */
export function initFaq() {
  const items = Array.from(document.querySelectorAll<HTMLDetailsElement>('[data-faq]'));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  const close = (d: HTMLDetailsElement) => {
    const body = d.querySelector<HTMLElement>('[data-faq-body]');
    if (!body || reduce.matches) return void (d.open = false);
    gsap.to(body, { height: 0, duration: 0.45, ease: 'power2.inOut', onComplete: () => { d.open = false; gsap.set(body, { clearProps: 'height' }); } });
  };
  const open = (d: HTMLDetailsElement) => {
    d.open = true;
    const body = d.querySelector<HTMLElement>('[data-faq-body]');
    if (!body || reduce.matches) return;
    gsap.fromTo(body, { height: 0 }, { height: 'auto', duration: 0.5, ease: 'power2.out', clearProps: 'height' });
  };

  items.forEach((d) => {
    d.querySelector('summary')?.addEventListener('click', (e) => {
      e.preventDefault();
      if (d.open) return close(d);
      items.filter((o) => o !== d && o.open).forEach(close);
      open(d);
    });
  });
}
