// ━━━━━━━━━━━━━━ SCROLL REVEAL ━━━━━━━━━━━━━━
// Premium path: GSAP staggered rise on a soft ease (Framer-style).
// Fallback path: original IntersectionObserver class toggle.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !reduceMotion) {
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll('.rev').forEach(el => {
    el.classList.add('in'); // neutralize the old CSS transition
    // Animate the block's direct children as a stagger; fall back to the block itself
    const targets = el.children.length > 1 ? el.children : el;
    gsap.fromTo(targets,
      { opacity: 0, y: 34 },
      {
        opacity: 1, y: 0,
        duration: 1.0,
        ease: 'power3.out',
        stagger: 0.09,
        scrollTrigger: { trigger: el, start: 'top 84%', once: true },
      });
  });
} else {
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });
  document.querySelectorAll('.rev').forEach(el => revObs.observe(el));
}

// Vision strip reveal
const visionObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.1 });
const vImg = document.getElementById('visionImg');
if (vImg) visionObs.observe(vImg);

// ━━━━━━━━━━━━━━ VISION STRIP PARALLAX ━━━━━━━━━━━━━━
const visionImgEl = document.getElementById('visionImg');
if (visionImgEl) {
  window.addEventListener('scroll', () => {
    const strip = document.getElementById('vision-strip');
    const rect = strip.getBoundingClientRect();
    if (rect.bottom > -100 && rect.top < window.innerHeight + 100) {
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * 0.12;
      visionImgEl.style.transform = `scale(1.1) translateY(${offset}px)`;
    }
  }, { passive: true });
}

// ━━━━━━━━━━━━━━ MAGNETIC CTA BUTTON ━━━━━━━━━━━━━━
const formBtn = document.querySelector('.form-btn');
if (formBtn) {
  formBtn.addEventListener('mousemove', e => {
    const rect = formBtn.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top  - rect.height / 2;
    formBtn.style.transform = `translate(${dx * 0.16}px, ${dy * 0.22}px)`;
  });
  formBtn.addEventListener('mouseleave', () => { formBtn.style.transform = ''; });
}
