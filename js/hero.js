// ━━━━━━━━━━━━━━ HERO SCROLL-SNAP EXPERIENCE ━━━━━━━━━━━━━━

const HIGHFIELD_BASE = '';

// Self-hosted renders (30 June 2026 final set) — no external image dependencies.
const RENDERS = {
  entryHall: 'images/entry-hall-2.jpg',
  familyRoom: 'images/family-room.jpg',
  primarySuite: 'images/master-bedroom-2.jpg',
  living: 'images/living.jpg',
};

const HERO_PROPERTY = {
  address: '28 Bristol Road',
  location: 'Newton, Massachusetts',
  beds: 7,
  baths: 6.5,
  sqft: 5400,
  lot: 0.38,
};

const HERO_ROOMS = [
  {
    id: 'exterior',
    number: '01',
    eyebrow: 'Pre-Construction · Newton, Massachusetts',
    title: '28 Bristol Road',
    copy: 'A singular residence conceived as livable sculpture — where every beam, stone, and pane of glass serves both structure and art.',
    label: 'Exterior',
    roomKey: 'Exterior Placeholder',
    poster: 'images/exterior-02.jpg',
    videoFile: '',
    preload: 'auto',
    kenBurns: { s0: 1.06, s1: 1.095, tx: '-0.45%', ty: '-0.25%' },
    isPropertyHero: true,
  },
  {
    id: 'entry-hall',
    number: '02',
    eyebrow: 'Ground Floor · Entry Hall',
    title: 'A grand first impression',
    copy: 'Chevron white oak, a sculptural stair, and a chandelier moment set the tone from the first step inside.',
    label: 'Entry Hall',
    roomKey: '360_Hallway',
    poster: RENDERS.entryHall,
    videoFile: '',
    preload: 'none',
    kenBurns: { s0: 1.07, s1: 1.13, tx: '-0.9%', ty: '-0.35%' },
  },
  {
    id: 'living-kitchen',
    number: '03',
    eyebrow: 'Ground Floor · Living + Kitchen',
    title: 'Designed for gathering',
    copy: 'Open living, kitchen, and dining spaces are staged as one continuous social room for daily life and entertaining.',
    label: 'Living + Kitchen',
    roomKey: 'Living + Kitchen',
    poster: RENDERS.familyRoom,
    videoFile: '',
    preload: 'none',
    kenBurns: { s0: 1.035, s1: 1.065, tx: '-0.22%', ty: '-0.1%' },
  },
  {
    id: 'primary-suite',
    number: '04',
    eyebrow: 'Second Floor · Primary Suite',
    title: 'A private retreat above it all',
    copy: 'The primary level shifts the mood quieter: generous scale, soft light, and a more intimate sense of arrival.',
    label: 'Primary Suite',
    roomKey: 'Primary Suite',
    poster: RENDERS.primarySuite,
    videoFile: '',
    preload: 'none',
    kenBurns: { s0: 1.04, s1: 1.075, tx: '0.34%', ty: '-0.14%' },
  },
  {
    id: 'walkthrough',
    number: '05',
    eyebrow: 'Digital Walkthrough',
    title: 'Explore the residence in 360',
    copy: 'Continue from the cinematic overview into the live interactive walkthrough, beginning at the entry hallway.',
    label: '360 Walkthrough',
    roomKey: '360 Walkthrough',
    poster: RENDERS.living,
    videoFile: '',
    preload: 'none',
    kenBurns: { s0: 1.035, s1: 1.06, tx: '-0.18%', ty: '0.1%' },
    cta: { label: 'Open 360 Walkthrough', target: 'tour' },
  },
];

let activeHeroScene = 0;

/** Escapes static room copy before it is injected into generated markup. */
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

/** Resolves the final video URL only when a confirmed Highfield filename exists. */
function getVideoUrl(room) {
  return room.videoFile ? HIGHFIELD_BASE + room.videoFile : '';
}

/** Resolves image paths from the page URL so CSS variables do not point into /css/. */
function getPosterUrl(room) {
  return new URL(room.poster, window.location.href).href;
}

/** Builds the original property hero content for the first snap scene. */
function buildPropertyHeroContent() {
  return `
    <div class="hero-content">
      <p class="hero-eyebrow">Pre-Construction &middot; Newton, Massachusetts</p>
      <h1 class="hero-title">28 Bristol Road</h1>
      <div class="hero-stats" id="heroStats">
        <div class="stat">
          <div class="stat-val">7</div>
          <div class="stat-lbl">Bedrooms</div>
        </div>
        <div class="stat">
          <div class="stat-val">6.5</div>
          <div class="stat-lbl">Bathrooms</div>
        </div>
        <div class="stat">
          <div class="stat-val">5,400</div>
          <div class="stat-lbl">Sq Ft</div>
        </div>
        <div class="stat">
          <div class="stat-val">0.38 ac</div>
          <div class="stat-lbl">Lot</div>
        </div>
      </div>
    </div>
  `;
}

/** Builds a room overlay for each generated interior snap scene. */
function buildRoomHeroContent(room) {
  const cta = room.cta ? `
    <button class="hero-panel-cta" type="button" data-scroll-to="${escapeHtml(room.cta.target)}" style="margin-top:32px">
      ${escapeHtml(room.cta.label)}
    </button>
  ` : '';
  return `
    <div class="hero-content hero-room-content">
      <p class="hero-room-kicker">${escapeHtml(room.eyebrow)}</p>
      <h2 class="hero-room-title">${escapeHtml(room.title)}</h2>
      <p class="hero-room-text">${escapeHtml(room.copy)}</p>
      ${cta}
    </div>
  `;
}

/** Creates a single hero scene from HERO_ROOMS data. */
function createHeroScene(room, index) {
  const section = document.createElement('section');
  const videoUrl = getVideoUrl(room);
  const posterUrl = getPosterUrl(room);

  section.className = 'hero-scene';
  if (room.cta) section.classList.add('hero-scene-cta');
  section.id = index === 0 ? 'hero-start' : `hero-${room.id}`;
  section.dataset.sceneId = room.id;
  section.dataset.sceneIndex = index;
  section.style.setProperty('--hero-poster', `url('${posterUrl}')`);
  section.setAttribute('aria-label', `${room.label} walkthrough scene`);

  section.innerHTML = `
    <div class="hero-bg" aria-hidden="true"></div>
    ${videoUrl ? `
      <video class="hero-video" muted loop playsinline preload="${room.preload}" aria-label="${escapeHtml(room.label)} walkthrough video" poster="${escapeHtml(posterUrl)}">
        <source src="${escapeHtml(videoUrl)}" type="video/mp4">
      </video>
    ` : ''}
    <div class="hero-overlay" aria-hidden="true"></div>
    ${room.isPropertyHero ? buildPropertyHeroContent() : buildRoomHeroContent(room)}
  `;

  return section;
}

/** Injects one Ken Burns keyframe per scene, generated from HERO_ROOMS data. */
function injectHeroKenBurnsCSS() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = window.matchMedia('(max-width: 767px)').matches;
  if (reducedMotion || mobile) return;

  const css = HERO_ROOMS.map(room => {
    const { s0, s1, tx, ty } = room.kenBurns;
    return `
@keyframes hero-kb-${room.id} {
  0% { transform: scale(${s0}) translate(0%, 0%); }
  50% { transform: scale(${s1}) translate(${tx}, ${ty}); }
  100% { transform: scale(${s0}) translate(0%, 0%); }
}
.hero-scene[data-scene-id="${room.id}"].is-active .hero-bg,
.hero-scene[data-scene-id="${room.id}"].is-active .hero-video {
  animation: hero-kb-${room.id} 24s ease-in-out infinite;
}`;
  }).join('\n');

  const style = document.createElement('style');
  style.id = 'hero-ken-burns-css';
  style.textContent = css;
  document.head.appendChild(style);
}

/** Renders all hero scenes and their right-side progress dots from data. */
function buildHeroScenes() {
  const container = document.getElementById('heroScenes');
  const dots = document.getElementById('heroProgressDots');
  if (!container || !dots) return;

  HERO_ROOMS.forEach((room, index) => {
    container.appendChild(createHeroScene(room, index));

    const dot = document.createElement('button');
    dot.className = `hero-dot${index === 0 ? ' active' : ''}`;
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to ${room.label}`);
    dot.addEventListener('click', () => scrollToHeroScene(index));
    dots.appendChild(dot);
  });
}

/** Smooth-scrolls the document to a specific generated hero scene. */
function scrollToHeroScene(index) {
  const scene = document.querySelector(`.hero-scene[data-scene-index="${index}"]`);
  scene?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Plays videos only for the active scene and pauses offscreen scenes. */
function initHeroVideoManager() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scenes = document.querySelectorAll('.hero-scene');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const video = entry.target.querySelector('.hero-video');
      if (!video) return;

      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        if (video.preload === 'none') {
          video.preload = 'auto';
          video.load();
        }
        if (!reducedMotion) video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.5 });

  scenes.forEach(scene => observer.observe(scene));

  document.querySelectorAll('.hero-video').forEach(video => {
    video.addEventListener('canplay', () => video.classList.add('is-ready'), { once: true });
  });
}

/** Tracks the active hero scene and updates scene classes/progress dots. */
function initHeroSceneTracker() {
  const scenes = document.querySelectorAll('.hero-scene');
  const dots = document.querySelectorAll('.hero-dot');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || entry.intersectionRatio < 0.5) return;
      activeHeroScene = Number(entry.target.dataset.sceneIndex);

      scenes.forEach(scene => {
        scene.classList.toggle('is-active', Number(scene.dataset.sceneIndex) === activeHeroScene);
      });

      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeHeroScene);
      });
    });
  }, { threshold: 0.5 });

  scenes.forEach(scene => observer.observe(scene));
}

/** Adds the initial entrance animation classes after load. */
function initHeroEntrance() {
  window.addEventListener('load', () => {
    document.querySelectorAll('.hero-scene').forEach(scene => scene.classList.add('loaded'));
    document.getElementById('heroSvg')?.classList.add('in');

    const delays = [
      ['heroStats', 900],
      ['scrollArrow', 1600],
      ['heroProgressDots', 1700],
    ];

    delays.forEach(([id, ms]) => {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.classList.add('in');
      }, ms);
    });

    setTimeout(() => {
      document.getElementById('livePill')?.classList.add('in');
    }, 2200);
  });
}

/** Runs the weekly visits counter animation in the floating live pill. */
function initLiveCounter() {
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
}

/** Applies a light parallax drift to the active poster when the hero is in view. */
function initHeroParallax() {
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const hero = document.getElementById('hero');
      const activeSceneEl = document.querySelector('.hero-scene.is-active .hero-bg');
      if (!hero || !activeSceneEl) {
        ticking = false;
        return;
      }

      const heroBottom = hero.offsetTop + hero.offsetHeight;
      const inHero = window.scrollY < heroBottom - 80;
      document.body.classList.toggle('hero-chrome-hidden', !inHero);

      if (inHero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const sceneTop = document.querySelector('.hero-scene.is-active')?.offsetTop || 0;
        const localY = Math.max(0, window.scrollY - sceneTop);
        activeSceneEl.style.setProperty('--parallax-y', `${localY * 0.08}px`);
      }

      ticking = false;
    });
  }, { passive: true });
}

/** Counts the property stats up when the first hero scene enters view. */
function initStatCounters() {
  const statsEl = document.getElementById('heroStats');
  if (!statsEl) return;

  const statCfg = [
    { target: HERO_PROPERTY.beds, dur: 900, dec: 0, sfx: '' },
    { target: HERO_PROPERTY.baths, dur: 1000, dec: 1, sfx: '' },
    { target: HERO_PROPERTY.sqft, dur: 1400, dec: 0, sfx: '' },
    { target: HERO_PROPERTY.lot, dur: 1100, dec: 2, sfx: ' ac' },
  ];
  const statVals = statsEl.querySelectorAll('.stat-val');
  let countersRan = false;

  const statsObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersRan) {
        countersRan = true;
        statCfg.forEach((data, index) => {
          if (statVals[index]) animateValue(statVals[index], data.target, data.dur, data.dec, data.sfx);
        });
        statsObs.disconnect();
      }
    });
  }, { threshold: 0.5 });

  statsObs.observe(statsEl);
}

/** Animates a numeric stat value using requestAnimationFrame. */
function animateValue(el, target, duration, decimals, suffix) {
  const start = performance.now();

  function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    const value = target * ease;
    el.textContent = (decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString()) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

/** Hides the scroll cue after the visitor starts moving through the hero. */
function initScrollCue() {
  const arrow = document.getElementById('scrollArrow');
  if (!arrow) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 24) arrow.classList.remove('in');
  }, { once: true, passive: true });
}

/** Boots the generated hero experience in the correct dependency order. */
function initHeroExperience() {
  document.documentElement.classList.add('hero-snap-ready');
  injectHeroKenBurnsCSS();
  buildHeroScenes();
  initHeroEntrance();
  initHeroVideoManager();
  initHeroSceneTracker();
  initLiveCounter();
  initHeroParallax();
  initStatCounters();
  initScrollCue();

  const firstScene = document.querySelector('.hero-scene');
  firstScene?.classList.add('is-active');

  document.querySelectorAll('[data-scroll-to]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById(btn.dataset.scrollTo)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroExperience);
} else {
  initHeroExperience();
}
