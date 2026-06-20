// ━━━━━━━━━━━━━━ HERO ENTRANCE ━━━━━━━━━━━━━━
window.addEventListener('load', () => {
  document.getElementById('heroBg').classList.add('loaded');
  document.getElementById('heroSvg').classList.add('in');

  const delays = [
    ['hEyebrow', 300],
    ['hTitle',   550],
    ['hSub',     750],
    ['heroStats',900],
    ['scrollArrow', 1600]
  ];
  delays.forEach(([id, ms]) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.classList.add('in');
    }, ms);
  });

  setTimeout(() => {
    const pill = document.getElementById('livePill');
    if (pill) pill.classList.add('in');
  }, 2200);
});

// ━━━━━━━━━━━━━━ WEEKLY VISITS COUNTER ━━━━━━━━━━━━━━
(function() {
  const countEl = document.getElementById('liveCount');
  if (!countEl) return;
  let count = 820 + Math.floor(Math.random() * 60);
  countEl.textContent = count.toLocaleString();

  function addVisit() {
    count += Math.floor(Math.random() * 3) + 1;
    countEl.textContent = count.toLocaleString();
    setTimeout(addVisit, (8 + Math.random() * 6) * 60 * 1000);
  }
  setTimeout(addVisit, (8 + Math.random() * 6) * 60 * 1000);
})();

// ━━━━━━━━━━━━━━ PARALLAX HERO BG ━━━━━━━━━━━━━━
window.addEventListener('scroll', () => {
  const heroBg = document.getElementById('heroBg');
  const y = window.scrollY;
  if (y < window.innerHeight) {
    heroBg.style.transform = `scale(1) translateY(${y * 0.25}px)`;
  }
}, { passive: true });

// ━━━━━━━━━━━━━━ STAT COUNTER ANIMATION ━━━━━━━━━━━━━━
function animateValue(el, target, duration, decimals, suffix) {
  const start = performance.now();
  const tick = now => {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    const v = target * ease;
    el.textContent = (decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString()) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const statsEl = document.getElementById('heroStats');
const statCfg = [
  { target: 7,    dur: 900,  dec: 0, sfx: '' },
  { target: 6.5,  dur: 1000, dec: 1, sfx: '' },
  { target: 5400, dur: 1400, dec: 0, sfx: '' },
  { target: 0.38, dur: 1100, dec: 2, sfx: ' ac' },
];
const statVals = statsEl.querySelectorAll('.stat-val');
let countersRan = false;
const statsObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !countersRan) {
      countersRan = true;
      statCfg.forEach((d, i) => { if (statVals[i]) animateValue(statVals[i], d.target, d.dur, d.dec, d.sfx); });
      statsObs.disconnect();
    }
  });
}, { threshold: 0.5 });
statsObs.observe(statsEl);
