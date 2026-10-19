import { gsap } from 'gsap';

/** Hero: entrada inicial y parallax suave de la palabra PULXXE y la casa. */
export function initHero(desktop: boolean) {
  const root = document.querySelector<HTMLElement>('[data-motion="hero"]');
  if (!root) return;
  const word = root.querySelector('[data-motion="hero-word"]');
  const image = root.querySelector('[data-motion="hero-image"]');
  const content = root.querySelector('[data-motion="hero-content"]');
  const highlight = root.querySelector('[data-motion="hero-highlight"]');

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  if (word) tl.from(word, { yPercent: 30, opacity: 0, duration: 1.2 });
  if (image) tl.from(image, { y: 80, opacity: 0, duration: 1.3 }, 0.15);
  if (content) tl.from(content.querySelectorAll(':scope > *, h1 > span'), { y: 30, opacity: 0, stagger: 0.06, duration: 0.9 }, 0.35);
  if (highlight) tl.from(highlight, { scaleX: 0, transformOrigin: '0% 50%', duration: 0.9, ease: 'expo.out' }, 0.9);

  if (desktop) {
    const st = { trigger: root, start: 'top top', end: 'bottom top', scrub: true };
    if (word) gsap.to(word, { yPercent: 18, ease: 'none', scrollTrigger: st });
    if (image) gsap.to(image, { y: -60, ease: 'none', scrollTrigger: st });
  }
}
