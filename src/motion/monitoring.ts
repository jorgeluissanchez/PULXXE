import { gsap } from 'gsap';

/** Monitoreo: barras de avance, contador del 78 %, collage con parallax y sello. */
export function initMonitoring(desktop: boolean) {
  const board = document.querySelector<HTMLElement>('[data-motion="board"]');
  if (board) {
    const tl = gsap.timeline({ scrollTrigger: { trigger: board, start: 'top 75%', once: true } });
    tl.from(board.querySelectorAll('[data-bar]'), { scaleX: 0, duration: 1.2, ease: 'power3.out', stagger: 0.12 }, 0);
    const counter = board.querySelector<HTMLElement>('[data-count-to]');
    if (counter) {
      const to = Number(counter.dataset.countTo);
      const suffix = counter.dataset.suffix ?? '';
      const obj = { v: 0 };
      tl.to(obj, { v: to, duration: 1.4, ease: 'power2.out', onUpdate: () => (counter.textContent = `${Math.round(obj.v)}${suffix}`) }, 0);
    }
  }

  const stamp = document.querySelector('[data-motion="stamp"]');
  if (stamp) {
    gsap.from(stamp, { scale: 0.4, rotate: -40, opacity: 0, duration: 0.9, ease: 'back.out(2)', scrollTrigger: { trigger: stamp, start: 'top 90%', once: true } });
  }

  const photo = document.querySelector('[data-motion="collage-photo"]');
  if (photo && desktop) {
    gsap.fromTo(photo, { y: 60 }, { y: -40, ease: 'none', scrollTrigger: { trigger: photo, start: 'top bottom', end: 'bottom top', scrub: true } });
  }
}
