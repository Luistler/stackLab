import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initMotionEngine() {
  gsap.registerPlugin(ScrollTrigger);

  // Prevent mobile browser address bar expand/collapse from causing scroll stutter and recalculations
  ScrollTrigger.config({ ignoreMobileResize: true });

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  let lenis: Lenis | null = null;

  if (!prefersReducedMotion) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time: number) => {
      lenis?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
    window.__lenis = lenis;
    (window as any).lenis = lenis;

    // Smooth anchor navigation for both '#' and '/#' links when on home page
    const isHomePage =
      window.location.pathname === '/' || window.location.pathname === '';

    document
      .querySelectorAll('a[href^="#"], a[href^="/#"]')
      .forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
          const rawHref = anchor.getAttribute('href');
          if (!rawHref || rawHref === '#' || rawHref === '/#') return;

          // Extract anchor hash (e.g. #collection from /#collection)
          const hash = rawHref.startsWith('/#')
            ? rawHref.substring(1)
            : rawHref;

          // If on the home page, intercept and scroll smoothly
          if (isHomePage) {
            const target = document.querySelector(hash);
            if (target) {
              e.preventDefault();
              lenis?.scrollTo(target as HTMLElement, { offset: -30 });
              history.pushState(null, '', hash);
            }
          }
          // If on another page (e.g. /checkout), allow natural browser navigation to /#collection
        });
      });

    // On page load, if arriving with a hash, smooth scroll to it
    if (window.location.hash) {
      setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target && lenis) {
          lenis.scrollTo(target as HTMLElement, { offset: -30 });
        }
      }, 300);
    }
  }

  // Modal open / close global helper hooks to pause / resume Lenis
  window.openToolModal = (modalId: string) => {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    if (window.__lenis) {
      window.__lenis.stop();
    }
    modal.classList.add('active');
    modal.classList.remove('opacity-0', 'pointer-events-none');
    const card = modal.querySelector('.modal-card');
    if (card) {
      card.classList.remove('scale-95');
      card.classList.add('scale-100');
    }
    document.body.classList.add('lenis-stopped');
    document.body.style.overflow = 'hidden';

    if (typeof window.playMechanicalClick === 'function') {
      window.playMechanicalClick(1400, 0.03);
    }
    setTimeout(() => {
      const firstInput = modal.querySelector(
        'input, textarea, button'
      ) as HTMLElement | null;
      firstInput?.focus();
    }, 50);
  };

  window.closeToolModal = (modalOrId: HTMLElement | string) => {
    const modal =
      typeof modalOrId === 'string'
        ? document.getElementById(modalOrId)
        : modalOrId;
    if (!modal) return;
    modal.classList.remove('active');
    modal.classList.add('opacity-0', 'pointer-events-none');
    const card = modal.querySelector('.modal-card');
    if (card) {
      card.classList.remove('scale-100');
      card.classList.add('scale-95');
    }
    const anyActive = document.querySelector('.modal-overlay.active');
    if (!anyActive) {
      document.body.classList.remove('lenis-stopped');
      document.body.style.overflow = '';
      if (window.__lenis) {
        window.__lenis.start();
      }
    }
    if (typeof window.playMechanicalClick === 'function') {
      window.playMechanicalClick(900, 0.02);
    }
  };

  // Wire Escape key to close any active modal
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      const activeModals = document.querySelectorAll('.modal-overlay.active');
      activeModals.forEach((m) => window.closeToolModal?.(m as HTMLElement));
    }
  });

  return { lenis, ScrollTrigger, gsap };
}
