// ━━━━━━━━━━━━━━ VIDEO TOUR — Phases 1, 2, 3 ━━━━━━━━━━━━━━
const BASE = 'https://d8j0ntlcm91z4.cloudfront.net/user_3FZ23qe6er1GndDtX16N8ULc4La/';

const scenes = [
  { name: 'Entry Hall',      floor: 'Entry',         video: BASE + 'hf_20260626_192425_5f5651b0-b663-4da6-b7d4-0a1b2f47cb34.mp4', roomId: 'r-entry',   abbr: 'E'  },
  { name: 'Living Room',     floor: 'First Floor',   video: BASE + 'hf_20260626_191854_a87dffcc-aa68-4c52-b8b3-bd9db668761e.mp4', roomId: 'r-living',  abbr: 'LR' },
  { name: "Chef's Kitchen",  floor: 'First Floor',   video: BASE + 'hf_20260626_192427_93875272-a076-46cf-97f8-1f263749ca7b.mp4', roomId: 'r-kitchen', abbr: 'K'  },
  { name: 'Family Room',     floor: 'First Floor',   video: BASE + 'hf_20260626_192423_e52f3743-fd20-4c06-897f-c92f50475a92.mp4', roomId: 'r-family',  abbr: 'FR' },
  { name: 'Family & Kit.',   floor: 'First Floor',   video: BASE + 'hf_20260626_191901_e1212c4a-7cd8-4e92-8702-395a2684489e.mp4', roomId: 'r-fk',      abbr: 'FK' },
  { name: 'Primary Suite',   floor: 'Second Floor',  video: BASE + 'hf_20260626_192908_c3bceb2f-124c-4b89-acdf-2bf0f0aa65d2.mp4', roomId: 'r-master',  abbr: 'PS' },
  { name: 'Master Bath',     floor: 'Second Floor',  video: BASE + 'hf_20260626_191904_e75f87ea-02ad-419a-b6aa-ca9f21cf55a5.mp4', roomId: 'r-bath',    abbr: 'MB' },
  { name: 'Bedroom Two',     floor: 'Second Floor',  video: BASE + 'hf_20260626_191909_8683ced7-3e9b-479c-9096-cae4e5e6e342.mp4', roomId: 'r-bed2',    abbr: 'B2' },
  { name: 'Bedroom Three',   floor: 'Second Floor',  video: BASE + 'hf_20260626_191912_61c0c78e-c22f-4c28-958c-b23527f021c7.mp4', roomId: 'r-bed3',    abbr: 'B3' },
];

const roomCounts = [18, 23, 11, 9, 7, 26, 14, 8, 19];

const panoWrap    = document.getElementById('panoWrap');
const tourHotspots = document.getElementById('tourHotspots');
const panoFloorLbl = document.getElementById('panoFloorLbl');
const panoNameLbl  = document.getElementById('panoNameLbl');
const roomCountEl  = document.getElementById('roomCount');
const roomActivityEl = document.getElementById('roomActivity');

if (panoWrap && tourHotspots) {

let currentScene = 0;
let flickerTimer;

// ── Room activity flicker ──
function startFlicker(base) {
  clearTimeout(flickerTimer);
  function tick() {
    if (roomCountEl) roomCountEl.textContent = Math.max(3, base + Math.floor(Math.random() * 5) - 2);
    flickerTimer = setTimeout(tick, 3200 + Math.random() * 2000);
  }
  tick();
}

// ━━━━━━━━━━━━━━ PHASE 1 + 2: Build scroll-snap scenes with video ━━━━━━━━━━━━━━
scenes.forEach((sc, i) => {
  const div = document.createElement('div');
  div.className = 'pano-scene';
  div.dataset.idx = i;
  div.innerHTML = `
    <video class="pano-video" autoplay muted loop playsinline preload="${i === 0 ? 'auto' : 'none'}">
      <source src="${sc.video}" type="video/mp4">
    </video>
  `;
  panoWrap.appendChild(div);
});

// ── Scroll cue (fades after first scroll) ──
const cue = document.createElement('div');
cue.className = 'pano-scroll-cue';
cue.innerHTML = `<span>Scroll</span><div class="pano-scroll-line"></div>`;
document.querySelector('.pano-overlay').appendChild(cue);
panoWrap.addEventListener('scroll', () => cue.classList.add('gone'), { once: true });

// ━━━━━━━━━━━━━━ PHASE 2: Floating hotspot buttons ━━━━━━━━━━━━━━
scenes.forEach((sc, i) => {
  const btn = document.createElement('button');
  btn.className = 'hotspot-btn' + (i === 0 ? ' active' : '');
  btn.textContent = sc.abbr;
  btn.setAttribute('title', sc.name);
  btn.addEventListener('click', () => scrollToScene(i));
  tourHotspots.appendChild(btn);
});

function scrollToScene(idx) {
  const sceneEls = panoWrap.querySelectorAll('.pano-scene');
  if (sceneEls[idx]) {
    panoWrap.scrollTo({ top: sceneEls[idx].offsetTop, behavior: 'smooth' });
  }
}

// ── Update UI when scene changes ──
function updateActiveScene(idx) {
  if (idx === currentScene && idx !== 0) return;
  currentScene = idx;
  const sc = scenes[idx];

  if (panoFloorLbl) panoFloorLbl.textContent = sc.floor;
  if (panoNameLbl)  panoNameLbl.textContent  = sc.name;

  // Hotspot buttons
  document.querySelectorAll('.hotspot-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === idx);
  });

  // Room activity pulse
  const base = roomCounts[idx] ?? 12;
  if (roomCountEl) roomCountEl.textContent = base;
  if (roomActivityEl) {
    roomActivityEl.style.transform = 'scale(1.05)';
    setTimeout(() => { roomActivityEl.style.transform = ''; }, 220);
  }
  startFlicker(base);

  // Floor plan
  updateFloorPlan(sc.roomId);
}

// ── IntersectionObserver: detect which scene is snapped ──
const sceneObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && e.intersectionRatio >= 0.5) {
      updateActiveScene(+e.target.dataset.idx);
    }
  });
}, { root: panoWrap, threshold: 0.5 });

// ── IntersectionObserver: lazy load + play/pause videos ──
const videoObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    const vid = e.target.querySelector('.pano-video');
    if (!vid) return;
    if (e.isIntersecting) {
      if (vid.preload === 'none') { vid.preload = 'auto'; vid.load(); }
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  });
}, { root: panoWrap, threshold: 0.15 });

panoWrap.querySelectorAll('.pano-scene').forEach(el => {
  sceneObs.observe(el);
  videoObs.observe(el);
});

// Init first scene
updateActiveScene(0);

// ━━━━━━━━━━━━━━ PHASE 3: SVG Floor Plan ━━━━━━━━━━━━━━
// FK shares kitchen + family rooms visually
const fkRooms = ['r-kitchen', 'r-family'];

function updateFloorPlan(roomId) {
  const activeIds = roomId === 'r-fk' ? fkRooms : [roomId];

  document.querySelectorAll('.fp-room').forEach(el => {
    const isActive = activeIds.includes(el.id);
    const wasActive = el.classList.contains('active');
    el.classList.toggle('active', isActive);

    if (isActive && !wasActive) {
      // Draw-on animation
      let len = 800;
      try { len = el.getTotalLength(); } catch(e) {}
      el.style.setProperty('--fp-len', len + 'px');
      el.style.strokeDasharray = len;
      el.style.strokeDashoffset = len;
      // Force reflow then animate
      el.getBoundingClientRect();
      el.classList.add('drawing');
      el.addEventListener('animationend', () => {
        el.classList.remove('drawing');
        el.style.strokeDasharray = '';
        el.style.strokeDashoffset = '';
      }, { once: true });
    }
  });

  // Update room labels
  document.querySelectorAll('.fp-room-lbl').forEach(el => {
    const rid = el.dataset.room;
    el.classList.toggle('active', activeIds.includes(rid));
  });
}

// Floor plan room clicks → scroll to matching scene
document.querySelectorAll('.fp-room').forEach(el => {
  el.addEventListener('click', () => {
    let targetIdx = scenes.findIndex(sc => {
      if (el.id === 'r-fk') return sc.roomId === 'r-fk';
      return sc.roomId === el.id;
    });
    // For FK combo clicks on kitchen/family paths, find FK scene
    if (targetIdx === -1 && fkRooms.includes(el.id)) {
      targetIdx = scenes.findIndex(sc => sc.roomId === el.id);
    }
    if (targetIdx !== -1) scrollToScene(targetIdx);
  });
});

// Init floor plan
updateFloorPlan('r-entry');

}
