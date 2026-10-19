import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Header: estado "Scrolled" (fondo blanco 72 % + blur) pasada la primera pantalla. */
export function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-motion="header"]');
  if (!header) return;
  ScrollTrigger.create({
    start: 24,
    end: 'max',
    onToggle: (self) => (header.dataset.scrolled = self.isActive ? 'true' : 'false'),
  });

  // Cerrar el menú mobile al elegir un enlace
  const menu = document.getElementById('menu-mobile') as (HTMLElement & { hidePopover?: () => void }) | null;
  menu?.querySelectorAll('[data-close-menu]').forEach((link) =>
    link.addEventListener('click', () => menu.hidePopover?.()),
  );
}
