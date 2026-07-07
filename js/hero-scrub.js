// ━━━━━━━━━━━━━━ HERO SCROLL-SCRUB — Lenis + GSAP ScrollTrigger ━━━━━━━━━━━━━━
// Scroll drives the hero video's playhead: scrolling moves the camera
// through the space, forwards and backwards.

(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const video = document.getElementById('scrubVideo');
  if (!video || typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // ── Lenis smooth scroll (site-wide) ──
  let lenis = null;
  if (!reducedMotion && typeof Lenis !== 'undefined') {
    // CSS smooth-scrolling fights both Lenis and ScrollTrigger's measurements
    document.documentElement.style.scrollBehavior = 'auto';
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1.0 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // ── Fallback: mobile loops the video. Desktop always gets the scrub —
  // it's user-driven motion (nothing moves unless the visitor scrolls),
  // so it's fine under prefers-reduced-motion; only the self-playing
  // extras (Lenis glide, entrance stagger) are disabled for that setting. ──
  if (isMobile) {
    video.muted = true;
    video.loop = true;
    video.play().catch(() => {});
    return;
  }

  // ── Scroll-scrub ──
  const proxy = { t: 0 };          // scrub target (seconds)
  let duration = 0;

  function initScrub() {
    duration = video.duration || 5;
    video.pause();
    video.currentTime = 0;

    gsap.to(proxy, {
      t: () => Math.max(duration - 0.05, 0),
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,                // slight smoothing on the playhead
        onUpdate(self) {
          const fill = document.querySelector('.hero-scrub-progress .fill');
          if (fill) fill.style.height = (self.progress * 100).toFixed(1) + '%';
        },
      },
      onUpdate() {
        // Avoid redundant seeks — only set when meaningfully different
        if (Math.abs(video.currentTime - proxy.t) > 0.01) {
          video.currentTime = proxy.t;
        }
      },
    });

    // Title block eases away as the walk-through begins
    gsap.to('.hero-scrub-content', {
      opacity: 0,
      y: -36,
      ease: 'power2.in',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '22% top',
        scrub: true,
      },
    });

    // Scroll cue fades immediately on first movement
    gsap.to('.hero-scrub-cue', {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '6% top',
        scrub: true,
      },
    });
  }

  if (video.readyState >= 1) initScrub();
  else video.addEventListener('loadedmetadata', initScrub, { once: true });

  // Re-measure after full load (fonts/images shift layout; preloader delays paint)
  window.addEventListener('load', () => setTimeout(() => ScrollTrigger.refresh(), 250));

  // ── Entrance: staggered rise for eyebrow → title → stats (Framer-style) ──
  window.addEventListener('load', () => {
    if (reducedMotion) return; // no self-playing entrance for reduced motion
    gsap.fromTo(
      '.hero-scrub-content > *',
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09, delay: 0.35 }
    );
  });
})();
