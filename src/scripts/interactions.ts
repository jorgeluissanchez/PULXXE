/**
 * Interacciones básicas sin animación (la capa de motion con GSAP se retiró por ahora).
 * Solo cambia atributos data-*; el aspecto de cada estado lo define Tailwind.
 * - Header: estado "scrolled" pasada la primera pantalla.
 * - Menú mobile: se cierra al elegir un enlace.
 * - Obra en acción, Proceso y Sectores: un elemento activo a la vez (puntero, foco o clic).
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
  if (accordion) single(accordion, '[data-panel]', null, null, true);
  const process = document.querySelector('[data-process]');
  if (process) single(process, '[data-step]', '[data-step-trigger]', '[data-step-panel]', true);
  const sectors = document.querySelector('[data-sectors]');
  if (sectors) single(sectors, '[data-sector]', '[data-sector-trigger]', '[data-sector-panel]', true);
}
