// ━━━━━━━━━━━━━━ SCROLL REVEAL ━━━━━━━━━━━━━━
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });

document.querySelectorAll('.rev').forEach(el => revObs.observe(el));

// Vision strip reveal
const visionObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.1 });
const vImg = document.getElementById('visionImg');
if (vImg) visionObs.observe(vImg);

// ━━━━━━━━━━━━━━ INTERIOR PANEL PARALLAX ━━━━━━━━━━━━━━
const interiorPanels = document.querySelectorAll('.interior-panel');
const hovered = new Set();

interiorPanels.forEach((panel, i) => {
  panel.addEventListener('mouseenter', () => hovered.add(i));
  panel.addEventListener('mouseleave', () => hovered.delete(i));
});

function updatePanelParallax() {
  interiorPanels.forEach((panel, i) => {
    const img = panel.querySelector('img');
    if (!img) return;
    const rect = panel.getBoundingClientRect();
    if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
    const centerOff = rect.top + rect.height / 2 - window.innerHeight / 2;
    const ty = centerOff * 0.07;
    const sc = hovered.has(i) ? 1.055 : 1.0;
    img.style.transform = `translateY(${ty}px) scale(${sc})`;
    img.style.transition = hovered.has(i) ? 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)' : 'transform 0.1s linear';
  });
}

window.addEventListener('scroll', updatePanelParallax, { passive: true });
window.addEventListener('resize', updatePanelParallax);
updatePanelParallax();

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
