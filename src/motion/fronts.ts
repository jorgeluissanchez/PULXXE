import { gsap } from 'gsap';

/**
 * Frentes de obra: las tarjetas empiezan desfasadas y se "encajan" alineadas
 * a medida que la sección avanza en el viewport (scrub, reversible).
 */
export function initFronts(desktop: boolean) {
  const root = document.querySelector<HTMLElement>('[data-motion="fronts"]');
  if (!root) return;
  const cards = gsap.utils.toArray<HTMLElement>('[data-front-card]', root);
  if (!cards.length) return;

  if (!desktop) {
    cards.forEach((card) =>
      gsap.from(card, { y: 50, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 88%', once: true } }),
    );
    return;
  }

  // Desfase inicial: el de Figma (central +96 px) acentuado para que se lea el encaje
  const from = [140, 236, 60];
  const rot = [-1.5, 1.5, -1];
  const tl = gsap.timeline({
    scrollTrigger: { trigger: root, start: 'top 75%', end: 'center 55%', scrub: 0.8 },
  });
  cards.forEach((card, i) => {
    tl.fromTo(card, { y: from[i] ?? 0, rotate: rot[i] ?? 0 }, { y: 0, rotate: 0, ease: 'power2.out' }, 0);
  });
}
