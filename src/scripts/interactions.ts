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
      const t = trigger ? el.querySelector(trigger) : el;
      t?.setAttribute(t.hasAttribute('aria-expanded') || !trigger ? 'aria-expanded' : 'aria-pressed', String(k === i));
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
  initNavSpy();
  const menu = document.getElementById('menu-mobile') as (HTMLElement & { hidePopover?: () => void }) | null;
  menu?.querySelectorAll('[data-close-menu]').forEach((a) => a.addEventListener('click', () => menu.hidePopover?.()));

  const accordion = document.querySelector('[data-accordion]');
  if (accordion) {
    single(accordion, '[data-panel]', '[data-panel-trigger]', null, true);
    initAccordionCarousel(accordion);
  }
  const process = document.querySelector('[data-process]');
  if (process) single(process, '[data-step]', '[data-step-trigger]', '[data-step-panel]', true);
  const sectors = document.querySelector('[data-sectors]');
  if (sectors) single(sectors, '[data-sector]', '[data-sector-trigger]', '[data-sector-panel]', true);
  initFrontsScroll();
  initCursorRipple();
  initHeroParallax();
  initScrollParallax();
  initLeadTracking();
}

/**
 * Medición de leads para Google Tag Manager: cada clic a WhatsApp, teléfono o correo empuja un evento al
 * dataLayer (más fiable que los activadores de clic automáticos de GTM, que se cargan después de la página,
 * así no se pierde). En GTM: activador "Evento personalizado" = whatsapp_click | phone_click | email_click.
 * Parámetros: cta_text (texto del botón), cta_location (id de la sección) y link_url.
 * El mismo nombre se envía a Microsoft Clarity como evento personalizado.
 */
function initLeadTracking() {
  const w = window as unknown as { dataLayer?: Record<string, unknown>[]; clarity?: (...args: unknown[]) => void };
  document.addEventListener(
    'click',
    (e) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.href;
      const event = /wa\.me|whatsapp\.com/.test(href) ? 'whatsapp_click' : href.startsWith('tel:') ? 'phone_click' : href.startsWith('mailto:') ? 'email_click' : '';
      if (!event) return;
      (w.dataLayer = w.dataLayer || []).push({
        event,
        cta_text: (a.getAttribute('aria-label') || a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 100),
        cta_location: a.closest('section[id], header, footer')?.id || a.closest('header, footer')?.tagName.toLowerCase() || 'otro',
        link_url: href.split('?')[0],
      });
      // Clarity: marca la grabación para poder filtrar las sesiones que terminaron en contacto.
      w.clarity?.('event', event);
    },
    { capture: true },
  );
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

/**
 * Menú: el enlace de la sección que está en pantalla queda activo (subrayado amarillo).
 * Activa la sección que cruza la línea al 40 % del alto de la ventana; si ninguna la cruza
 * (secciones que no están en el menú), no hay enlace activo.
 */
function initNavSpy() {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'));
  const pairs = links
    .map((a) => ({ a, el: document.querySelector<HTMLElement>(a.getAttribute('href') || '') }))
    .filter((p): p is { a: HTMLAnchorElement; el: HTMLElement } => !!p.el);
  if (!pairs.length) return;
  let ticking = false;
  const update = () => {
    ticking = false;
    const line = window.innerHeight * 0.4;
    const hit = pairs.find(({ el }) => { const r = el.getBoundingClientRect(); return r.top <= line && r.bottom > line; });
    pairs.forEach((p) => {
      const on = p === hit;
      p.a.dataset.active = String(on);
      if (on) p.a.setAttribute('aria-current', 'true'); else p.a.removeAttribute('aria-current');
    });
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
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

/** Clic con mouse: onda amarilla desde la punta del cursor (Figma: "Cursor / Pulxxe" → Click). */
function initCursorRipple() {
  if (!window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
  window.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    const dot = document.createElement('span');
    dot.className = 'cursor-ripple';
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    document.documentElement.appendChild(dot); // sobre todo, incluso el header fijo
    dot.addEventListener('animationend', () => dot.remove(), { once: true });
  });
}

/** Hero: parallax con el cursor. Interpola suave hacia la posición del mouse; vuelve al centro al salir. */
function initHeroParallax() {
  const hero = document.querySelector<HTMLElement>('[data-hero-parallax]');
  if (!hero || !window.matchMedia('(pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)').matches) return;
  let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
  const loop = () => {
    x += (tx - x) * 0.08;
    y += (ty - y) * 0.08;
    hero.style.setProperty('--mx', x.toFixed(4));
    hero.style.setProperty('--my', y.toFixed(4));
    raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.001 ? requestAnimationFrame(loop) : 0;
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    tx = ((e.clientX - r.left) / r.width) * 2 - 1;
    ty = ((e.clientY - r.top) / r.height) * 2 - 1;
    kick();
  });
  hero.addEventListener('pointerleave', () => { tx = 0; ty = 0; kick(); });
}

/**
 * Parallax con el scroll (solo desktop, sin "reducir movimiento"; en mobile todo queda quieto):
 * - Hero: --sy = píxeles recorridos dentro del hero. PULXXE sube un poco más rápido que la página y la casa baja (va más lenta).
 * - Banner de cierre: --bp de −1 a 1 mientras cruza la pantalla; la foto de fondo se desplaza más lento.
 */
function initScrollParallax() {
  if (!window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)').matches) return;
  const hero = document.querySelector<HTMLElement>('[data-hero-parallax]');
  const banner = document.querySelector<HTMLElement>('[data-banner-parallax]');
  // Palabra gigante de fondo (Nosotros): se desliza a la izquierda mientras la sección cruza la pantalla
  const word = document.querySelector<HTMLElement>('[data-scroll-word]');
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    if (hero) {
      const r = hero.getBoundingClientRect();
      if (r.bottom > 0) hero.style.setProperty('--sy', Math.max(0, -r.top).toFixed(1));
    }
    if (word) {
      const sec = word.parentElement!;
      const r = sec.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) {
        // Avance de la sección por la pantalla: 0 cuando entra por abajo, 1 cuando sale por arriba
        const p = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
        // Horizontal: arranca con la palabra entrando por la derecha y termina con su final saliendo por la izquierda
        const w = word.offsetWidth, cw = sec.clientWidth;
        word.style.setProperty('--wx', `${(cw * 0.35 - p * (w + cw * 0.1)).toFixed(1)}px`);
        // Vertical: la palabra se queda centrada en la pantalla mientras la sección está a la vista
        const h = word.offsetHeight;
        const y = Math.max(0, Math.min(r.height - h, vh / 2 - h / 2 - r.top));
        word.style.setProperty('--wy', `${y.toFixed(1)}px`);
      }
    }
    if (banner) {
      const r = banner.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) {
        const p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
        banner.style.setProperty('--bp', Math.max(-1, Math.min(1, p)).toFixed(4));
      }
    }
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
}
