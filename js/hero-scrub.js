// ━━━━━━━━━━━━━━ HERO (static still) — Lenis smooth scroll + entrance ━━━━━━━━━━━━━━
// The scroll-scrub video was replaced with a still image for fast, reliable
// loading across all devices and browsers. This keeps the site-wide smooth
// scroll and the hero content entrance animation; no video is loaded.
(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (typeof gsap !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  // ── Lenis smooth scroll (site-wide) ──
  if (!reducedMotion && typeof Lenis !== 'undefined' && typeof gsap !== 'undefined') {
    document.documentElement.style.scrollBehavior = 'auto';
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1.0 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // ── Hero content entrance: staggered rise (eyebrow → title → stats) ──
  window.addEventListener('load', () => {
    if (typeof ScrollTrigger !== 'undefined') setTimeout(() => ScrollTrigger.refresh(), 250);
    if (reducedMotion || typeof gsap === 'undefined') return;
    gsap.fromTo(
      '.hero-scrub-content > *',
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09, delay: 0.35 }
    );
  });
})();
