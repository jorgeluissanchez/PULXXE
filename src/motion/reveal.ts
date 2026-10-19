import { gsap } from 'gsap';

/** Entradas escalonadas al hacer scroll y revelado de imágenes con máscara. */
export function initReveals() {
  gsap.utils.toArray<HTMLElement>('[data-motion="reveal"]').forEach((el) => {
    const items = el.children.length > 1 ? Array.from(el.children) : [el];
    gsap.from(items, {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });

  gsap.utils.toArray<HTMLElement>('[data-motion="stagger"]').forEach((el) => {
    gsap.from(el.children, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.07,
      scrollTrigger: { trigger: el, start: 'top 80%', once: true },
    });
  });

  gsap.utils.toArray<HTMLElement>('[data-motion="clip-reveal"]').forEach((el) => {
    const img = el.querySelector('img');
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power4.inOut' });
    if (img) tl.from(img, { scale: 1.15, duration: 1.4, ease: 'power3.out' }, 0);
  });

  gsap.utils.toArray<HTMLElement>('[data-motion="parallax-img"]').forEach((img) => {
    gsap.fromTo(
      img,
      { yPercent: -6, scale: 1.12 },
      { yPercent: 6, scale: 1.12, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  });

  // Composición en franjas de "Lo que hacemos": sube desde abajo con un leve zoom
  gsap.utils.toArray<HTMLElement>('[data-motion="strips"]').forEach((el) => {
    gsap.from(el, {
      clipPath: 'inset(100% 0% 0% 0%)',
      y: 60,
      duration: 1.3,
      ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
}
