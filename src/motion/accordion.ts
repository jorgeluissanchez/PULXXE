/**
 * Acordeón "Obra en acción": el panel bajo el puntero (o con foco/toque) se abre.
 * El ancho se anima con CSS (flex-grow); aquí solo se cambia data-open.
 */
export function initAccordion() {
  const root = document.querySelector<HTMLElement>('[data-motion="accordion"]');
  if (!root) return;
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-panel]'));
  const desktop = window.matchMedia('(min-width: 1024px)');

  const open = (target: HTMLElement) => {
    panels.forEach((p) => {
      const isOpen = p === target;
      p.dataset.open = String(isOpen);
      p.setAttribute('aria-expanded', String(isOpen));
    });
  };

  panels.forEach((panel) => {
    panel.addEventListener('mouseenter', () => desktop.matches && open(panel));
    panel.addEventListener('focusin', () => open(panel));
    panel.addEventListener('click', () => open(panel));
    panel.addEventListener('keydown', (e) => {
      const i = panels.indexOf(panel);
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') panels[(i + 1) % panels.length].focus();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') panels[(i - 1 + panels.length) % panels.length].focus();
    });
  });
}
