/**
 * Interacciones básicas sin animación (la capa de motion con GSAP se retiró por ahora).
 * Solo cambia atributos data-*; el aspecto de cada estado lo define Tailwind.
 * - Header: estado "scrolled" pasada la primera pantalla.
 * - Menú mobile: se cierra al elegir un enlace.
 * - Obra en acción, Proceso y Sectores: un elemento activo a la vez (puntero, foco o clic).
 * - Frentes: la tarjeta central sube con el scroll hasta alinearse (y baja al devolverse).
 */
function single(root: ParentNode, item: string, trigger: string | null, panels: string | null, hover: boolean) {
  const items = Array.from(root.querySelectorAll<HTMLElement>(item));
  const views = panels ? Array.from(root.querySelectorAll<HTMLElement>(panels)) : [];
  const set = (i: number) => {
    items.forEach((el, k) => {
      el.dataset.active = String(k === i);
      el.dataset.open = String(k === i);
      (trigger ? el.querySelector(trigger) : el)?.setAttribute(trigger ? 'aria-pressed' : 'aria-expanded', String(k === i));
    });
    views.forEach((v, k) => {
      v.dataset.active = String(k === i);
      v.setAttribute('aria-hidden', String(k !== i));
    });
  };
  const desktop = window.matchMedia('(min-width: 1024px)');
  items.forEach((el, i) => {
    const t = (trigger ? el.querySelector<HTMLElement>(trigger) : el) ?? el;
    t.addEventListener('click', () => set(i));
    t.addEventListener('focus', () => set(i));
    if (hover) t.addEventListener('mouseenter', () => desktop.matches && set(i));
  });
}

export function initInteractions() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (header) {
    const update = () => (header.dataset.scrolled = String(window.scrollY > 24));
    update();
    window.addEventListener('scroll', update, { passive: true });
  }
  const menu = document.getElementById('menu-mobile') as (HTMLElement & { hidePopover?: () => void }) | null;
  menu?.querySelectorAll('[data-close-menu]').forEach((a) => a.addEventListener('click', () => menu.hidePopover?.()));

  const accordion = document.querySelector('[data-accordion]');
  if (accordion) {
    single(accordion, '[data-panel]', null, null, true);
    initAccordionCarousel(accordion);
  }
  const process = document.querySelector('[data-process]');
  if (process) single(process, '[data-step]', '[data-step-trigger]', '[data-step-panel]', true);
  const sectors = document.querySelector('[data-sectors]');
  if (sectors) single(sectors, '[data-sector]', '[data-sector-trigger]', '[data-sector-panel]', true);
  initFrontsScroll();
}

/**
 * Frentes de obra: --p va de 0 a 1 mientras la sección sube desde la mitad de la pantalla
 * hasta quedar bajo el header. La tarjeta central usa translateY(offset × (1 − p)).
 * Solo en desktop y si el sistema no pide reducir movimiento.
 */
export function initFrontsScroll() {
  const section = document.getElementById('frentes');
  const card = section?.querySelector<HTMLElement>('[data-front-shift]');
  if (!section || !card) return;
  const ok = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
  let ticking = false;
  const update = () => {
    ticking = false;
    if (!ok.matches) return card.style.removeProperty('--p');
    const top = section.getBoundingClientRect().top - 65;
    const range = window.innerHeight * 0.5;
    const p = Math.min(1, Math.max(0, 1 - top / range));
    card.style.setProperty('--p', p.toFixed(3));
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  ok.addEventListener('change', onScroll);
  update();
}

/** Obra en acción en mobile: la tarjeta más visible del carrusel se activa y mueve el indicador. */
function initAccordionCarousel(root: Element) {
  const track = root.querySelector<HTMLElement>('[data-accordion-track]');
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-panel]'));
  const dots = Array.from(root.querySelectorAll<HTMLElement>('[data-accordion-dot]'));
  if (!track || !panels.length) return;
  const mobile = window.matchMedia('(max-width: 1023.98px)');
  const setActive = (i: number) => {
    panels.forEach((p, k) => (p.dataset.open = String(k === i)));
    dots.forEach((d, k) => (d.dataset.active = String(k === i)));
  };
  const io = new IntersectionObserver(
    (entries) => {
      if (!mobile.matches) return;
      const best = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (best) setActive(panels.indexOf(best.target as HTMLElement));
    },
    { root: track, threshold: [0.55, 0.75, 0.95] },
  );
  panels.forEach((p) => io.observe(p));
  // Tocar una tarjeta lateral la centra
  panels.forEach((p) => p.addEventListener('click', () => mobile.matches && p.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })));
}
