/**
 * Capa de motion (GSAP + ScrollTrigger).
 * Regla: este módulo nunca crea markup; solo lee atributos data-* de la capa presentacional.
 * Sin JS (o con reduced motion) la página se ve completa y estática.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initHeader } from './header';
import { initReveals } from './reveal';
import { initHero } from './hero';
import { initAccordion } from './accordion';
import { initProcess } from './process';
import { initFronts } from './fronts';
import { initSectors } from './sectors';
import { initFaq } from './faq';
import { initMonitoring } from './monitoring';

gsap.registerPlugin(ScrollTrigger);

export const BREAKPOINT_DESKTOP = '(min-width: 1024px)';
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

export function initMotion() {
  // Interacciones (funcionan siempre, con o sin movimiento reducido)
  initHeader();
  initAccordion();
  initProcess();
  initSectors();
  initFaq();

  // Animaciones de scroll: solo si el usuario no pidió reducir movimiento
  const mm = gsap.matchMedia();
  mm.add(
    {
      motion: MOTION_OK,
      desktop: `${BREAKPOINT_DESKTOP} and ${MOTION_OK}`,
      mobile: `(max-width: 1023px) and ${MOTION_OK}`,
    },
    (ctx) => {
      const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
      if (!motion) return;
      initHero(desktop);
      initReveals();
      initFronts(desktop);
      initMonitoring(desktop);
    },
  );

  document.documentElement.dataset.motion = 'ready';
  // Recalcular posiciones cuando las fuentes e imágenes terminan de cargar
  window.addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
