/**
 * 28 Bristol Road — main.js
 * Vanilla JS, zero framework dependencies.
 * Modules: VideoManager · KenBurnsController · ScrollTracker ·
 *          NavController · ModalController · FloorPlanSVG ·
 *          ProgressDots · ScrollIndicator
 */

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DATA CONSTANTS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const PROPERTY = {
  address:    '28 Bristol Road',
  city:       'Newton, MA 02465',
  price:      '$4,850,000',
  beds:       5,
  baths:      6,
  sqft:       '6,500',
  lot:        '0.52 acres',
  fireplaces: 5,
  year:       2003,
};

const BASE = 'https://d8j0ntlcm91z4.cloudfront.net/user_3FZ23qe6er1GndDtX16N8ULc4La/';

/**
 * Each room defines:
 *  id        — CSS/DOM slug
 *  num       — display number (01–09)
 *  name      — display name
 *  floor     — floor label
 *  fpId      — matching id in floorplan.svg (or null)
 *  video     — Higgsfield CDN URL
 *  tagline   — single-line descriptor overlay
 *  features  — modal bullet list
 *  kenBurns  — { s0, s1, tx, ty } scale-start/end + max translate
 */
const ROOMS = [
  {
    id:       'entry-hall',
    num:      '01',
    name:     'Entry Hall',
    floor:    'Ground Floor',
    fpId:     'fp-entry',
    video:    BASE + 'hf_20260626_192425_5f5651b0-b663-4da6-b7d4-0a1b2f47cb34.mp4',
    tagline:  'A grand first impression',
    features: [
      'Grand staircase with wrought-iron railing',
      'Restoration Hardware crystal chandelier',
      'Honed marble tile flooring',
      'Soaring 20-foot coffered ceiling',
    ],
    kenBurns: { s0: 1.08, s1: 1.14, tx: '-1.2%', ty: '-0.6%' },
  },
  {
    id:       'living-room',
    num:      '02',
    name:     'Living Room',
    floor:    'Ground Floor',
    fpId:     'fp-living',
    video:    BASE + 'hf_20260626_191854_a87dffcc-aa68-4c52-b8b3-bd9db668761e.mp4',
    tagline:  'Where natural light commands the room',
    features: [
      'Wood-burning fireplace with carved surround',
      'Floor-to-ceiling panelled windows',
      'Custom white-oak built-in millwork',
      'Coffered ceiling with plaster detail',
    ],
    kenBurns: { s0: 1.03, s1: 1.055, tx: '-0.4%', ty: '-0.2%' }, /* most restrained — hero shot */
  },
  {
    id:       'chefs-kitchen',
    num:      '03',
    name:     "Chef's Kitchen",
    floor:    'Ground Floor',
    fpId:     'fp-kitchen',
    video:    BASE + 'hf_20260626_192427_93875272-a076-46cf-97f8-1f263749ca7b.mp4',
    tagline:  'Engineered for culinary mastery',
    features: [
      'Sub-Zero 48" refrigerator',
      'Wolf 6-burner dual-fuel range',
      'Calacatta marble 12-foot island',
      'Custom inset cabinetry to ceiling',
    ],
    kenBurns: { s0: 1.07, s1: 1.12, tx: '0.9%', ty: '0.4%' },
  },
  {
    id:       'family-room',
    num:      '04',
    name:     'Family Room',
    floor:    'Ground Floor',
    fpId:     'fp-fk',
    video:    BASE + 'hf_20260626_201041_14208ae2-3e94-4325-a3a8-c11958bc9769.mp4',
    tagline:  'Open living on a grand scale',
    features: [
      'Vaulted 18-foot shiplap ceiling',
      'Reclaimed-oak statement fireplace',
      'Bifold steel-and-glass doors to terrace',
      'Custom entertainment millwork',
    ],
    kenBurns: { s0: 1.06, s1: 1.11, tx: '-0.8%', ty: '0.3%' },
  },
  {
    id:       'family-kitchen',
    num:      '05',
    name:     'Family & Kitchen',
    floor:    'Ground Floor',
    fpId:     'fp-family',
    video:    BASE + 'hf_20260626_191901_e1212c4a-7cd8-4e92-8702-395a2684489e.mp4',
    tagline:  'The heart of the home',
    features: [
      'Seamless open-plan flow',
      'Island seating for eight',
      'Wet bar with wine refrigerator',
      'Rear garden views on three sides',
    ],
    kenBurns: { s0: 1.06, s1: 1.10, tx: '1.0%', ty: '-0.3%' },
  },
  {
    id:       'primary-suite',
    num:      '06',
    name:     'Primary Suite',
    floor:    'Second Floor',
    fpId:     null,
    video:    BASE + 'hf_20260626_192908_c3bceb2f-124c-4b89-acdf-2bf0f0aa65d2.mp4',
    tagline:  'A private retreat above it all',
    features: [
      'Fireplace with sitting area',
      'Dual custom walk-in closets',
      'Private balcony over rear garden',
      'Spa en-suite with heated floors',
    ],
    kenBurns: { s0: 1.07, s1: 1.12, tx: '-0.9%', ty: '-0.4%' },
  },
  {
    id:       'master-bath',
    num:      '07',
    name:     'Master Bath',
    floor:    'Second Floor',
    fpId:     null,
    video:    BASE + 'hf_20260626_191904_e75f87ea-02ad-419a-b6aa-ca9f21cf55a5.mp4',
    tagline:  'Spa-caliber sanctuary',
    features: [
      'Radiant-heated Calacatta marble floors',
      'Freestanding Waterworks soaking tub',
      'Dual rain-head walk-in shower',
      'Double vanity with vessel sinks',
    ],
    kenBurns: { s0: 1.06, s1: 1.10, tx: '0.7%', ty: '0.3%' },
  },
  {
    id:       'bedroom-two',
    num:      '08',
    name:     'Bedroom Two',
    floor:    'Second Floor',
    fpId:     null,
    video:    BASE + 'hf_20260626_191909_8683ced7-3e9b-479c-9096-cae4e5e6e342.mp4',
    tagline:  'Guest suite with character',
    features: [
      'En-suite bathroom',
      'Custom walk-in closet',
      'Window seat overlooking garden',
      'Original wide-plank hardwood floors',
    ],
    kenBurns: { s0: 1.07, s1: 1.11, tx: '-0.7%', ty: '0.3%' },
  },
  {
    id:       'bedroom-three',
    num:      '09',
    name:     'Bedroom Three',
    floor:    'Second Floor',
    fpId:     null,
    video:    BASE + 'hf_20260626_191912_61c0c78e-c22f-4c28-958c-b23527f021c7.mp4',
    tagline:  'Light-filled and serene',
    features: [
      'Corner double-aspect windows',
      'Built-in desk nook',
      'En-suite bathroom',
      'Hardwood floors throughout',
    ],
    kenBurns: { s0: 1.06, s1: 1.10, tx: '0.8%', ty: '-0.2%' },
  },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   1. KEN BURNS CSS INJECTOR
   Generates a unique @keyframes per room, injected at runtime.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function injectKenBurnsCSS() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return; /* skip all animation if user prefers reduced motion */

  const rules = ROOMS.map(r => {
    const { s0, s1, tx, ty } = r.kenBurns;
    return `
@keyframes kb-${r.id} {
  0%   { transform: scale(${s0}) translate(0%, 0%); }
  40%  { transform: scale(${s1}) translate(${tx}, ${ty}); }
  75%  { transform: scale(${(s0 + s1) / 2}) translate(${parseFloat(tx) * -0.4}%, ${parseFloat(ty) * -0.4}%); }
  100% { transform: scale(${s0}) translate(0%, 0%); }
}
.room-section[data-room-id="${r.id}"] .room-video {
  animation: kb-${r.id} 22s ease-in-out infinite;
}`;
  }).join('\n');

  const style = document.createElement('style');
  style.id = 'kb-styles';
  style.textContent = rules;
  document.head.appendChild(style);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   2. DOM BUILDER
   Dynamically injects all room sections from ROOMS data.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function buildRoomSections() {
  const container = document.getElementById('roomContainer');
  if (!container) return;

  ROOMS.forEach((room, i) => {
    const section = document.createElement('section');
    section.className = 'room-section';
    section.id = room.id;
    section.dataset.roomId = room.id;
    section.dataset.idx = i;
    section.setAttribute('aria-label', `${room.name} walkthrough video`);

    section.innerHTML = `
      <video
        class="room-video"
        autoplay
        muted
        loop
        playsinline
        preload="${i === 0 ? 'auto' : 'none'}"
        aria-hidden="true"
      >
        <source src="${room.video}" type="video/mp4">
      </video>
      <div class="room-vignette" aria-hidden="true"></div>
      <div class="room-overlay">
        <div class="room-meta">
          <span class="room-num">${room.num}</span>
          <span class="room-floor">${room.floor}</span>
        </div>
        <div class="room-headline">
          <p class="room-tagline">${room.tagline}</p>
          <h2 class="room-name">${room.name}</h2>
        </div>
        <button class="room-details-btn" data-idx="${i}" aria-label="View details for ${room.name}">
          View Details
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M6 1L11 6L6 11M1 6H11" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    `;
    container.appendChild(section);
  });
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   3. VIDEO MANAGER
   IntersectionObserver: lazy-load and play/pause per room.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function initVideoManager() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const vid = entry.target.querySelector('.room-video');
      if (!vid) return;

      if (entry.isIntersecting) {
        /* Lazy-load: upgrade preload="none" on entry */
        if (vid.preload === 'none') {
          vid.preload = 'auto';
          vid.load();
        }
        if (!prefersReduced) {
          vid.play().catch(() => {});
        }
      } else {
        vid.pause();
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.room-section').forEach(s => obs.observe(s));
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   4. SCROLL TRACKER
   Detects which room is in view; updates nav, dots, floor plan.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

let activeIdx = 0;
const scrollCallbacks = []; /* register handlers via onRoomChange(fn) */

function onRoomChange(fn) { scrollCallbacks.push(fn); }

function fireRoomChange(idx) {
  if (idx === activeIdx && idx !== 0) return;
  activeIdx = idx;
  scrollCallbacks.forEach(fn => fn(idx, ROOMS[idx]));
}

function initScrollTracker() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        fireRoomChange(+entry.target.dataset.idx);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.room-section').forEach(s => obs.observe(s));
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   5. NAV CONTROLLER
   Adds .scrolled after 60px; updates room counter.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function initNavController() {
  const nav         = document.getElementById('siteNav');
  const counter     = document.getElementById('navCounter');
  const total       = document.getElementById('navTotal');
  const navFloor    = document.getElementById('navFloor');
  const navRoomName = document.getElementById('navRoomName');

  if (total) total.textContent = ROOMS.length.toString().padStart(2, '0');

  /* Throttled scroll listener */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      nav?.classList.toggle('scrolled', window.scrollY > 60);
      ticking = false;
    });
    ticking = true;
  }, { passive: true });

  /* Update nav text when room changes */
  onRoomChange((idx, room) => {
    if (counter)     counter.textContent  = (idx + 1).toString().padStart(2, '0');
    if (navFloor)    navFloor.textContent  = room.floor;
    if (navRoomName) navRoomName.textContent = room.name;
  });
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   6. PROGRESS DOTS
   Right-rail pill dots; click to smooth-scroll.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function initProgressDots() {
  const rail = document.getElementById('progressDots');
  if (!rail) return;

  /* Build dots from ROOMS data */
  ROOMS.forEach((room, i) => {
    const dot = document.createElement('button');
    dot.className = 'progress-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to ${room.name}`);
    dot.setAttribute('title', room.name);
    dot.addEventListener('click', () => scrollToRoom(i));
    rail.appendChild(dot);
  });

  /* Sync active dot when room changes */
  onRoomChange(idx => {
    rail.querySelectorAll('.progress-dot').forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
  });
}

/* Smooth-scroll to a room section by index */
function scrollToRoom(idx) {
  const sections = document.querySelectorAll('.room-section');
  if (sections[idx]) {
    sections[idx].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   7. FLOOR PLAN SVG
   Highlights active room path; click to navigate.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function initFloorPlan() {
  const svg = document.getElementById('floorPlanInline');
  if (!svg) return;

  /* Wire SVG room clicks → scroll to matching section */
  svg.querySelectorAll('.fp-room').forEach(el => {
    el.addEventListener('click', () => {
      const roomId = el.dataset.roomId;
      const idx = ROOMS.findIndex(r => r.fpId === el.id);
      if (idx !== -1) scrollToRoom(idx);
    });
  });

  /* Update highlight when active room changes */
  onRoomChange((idx, room) => {
    svg.querySelectorAll('.fp-room').forEach(el => {
      const isActive = el.id === room.fpId;
      const wasActive = el.classList.contains('active');
      el.classList.toggle('active', isActive);

      if (isActive && !wasActive) {
        /* Stroke draw-on animation */
        let len = 800;
        try { len = el.getTotalLength(); } catch (_) {}
        el.style.setProperty('--fp-len', len + 'px');
        el.style.strokeDasharray = len;
        el.style.strokeDashoffset = len;
        el.getBoundingClientRect(); /* force reflow */
        el.classList.add('drawing');
        el.addEventListener('animationend', () => {
          el.classList.remove('drawing');
          el.style.strokeDasharray = '';
          el.style.strokeDashoffset = '';
        }, { once: true });
      }
    });

    /* Update text labels */
    svg.querySelectorAll('.fp-lbl').forEach(el => {
      el.classList.toggle('active', el.dataset.room === room.fpId?.replace('fp-', 'r-'));
    });
  });
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   8. MODAL CONTROLLER
   Room detail modal: open/close, ESC key, backdrop.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function initModalController() {
  const modal        = document.getElementById('roomModal');
  const modalClose   = document.getElementById('modalClose');
  const modalNum     = document.getElementById('modalNum');
  const modalName    = document.getElementById('modalName');
  const modalFloor   = document.getElementById('modalFloor');
  const modalTagline = document.getElementById('modalTagline');
  const modalFeatures = document.getElementById('modalFeatures');

  if (!modal) return;

  /* Open modal with room data */
  function openModal(idx) {
    const room = ROOMS[idx];
    if (!room) return;
    if (modalNum)      modalNum.textContent      = room.num;
    if (modalName)     modalName.textContent     = room.name;
    if (modalFloor)    modalFloor.textContent    = room.floor;
    if (modalTagline)  modalTagline.textContent  = room.tagline;
    if (modalFeatures) {
      modalFeatures.innerHTML = room.features
        .map(f => `<li>${f}</li>`)
        .join('');
    }
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalClose?.focus();
  }

  /* Close modal */
  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  /* Delegate: "View Details" button clicks inside room sections */
  document.addEventListener('click', e => {
    const btn = e.target.closest('.room-details-btn');
    if (btn) openModal(+btn.dataset.idx);
  });

  modalClose?.addEventListener('click', closeModal);

  /* Backdrop click */
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  /* ESC key */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   9. SCROLL INDICATOR
   Hero pulse chevron — hides after first scroll.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function initScrollIndicator() {
  const cue = document.getElementById('scrollCue');
  if (!cue) return;
  window.addEventListener('scroll', () => {
    cue.classList.add('gone');
  }, { once: true, passive: true });
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   BOOT — wire everything up after DOM is ready
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function boot() {
  injectKenBurnsCSS();   /* inject @keyframes before sections exist */
  buildRoomSections();   /* stamp room sections from ROOMS data */

  /* Then init controllers that depend on the DOM being ready */
  initVideoManager();
  initScrollTracker();
  initNavController();
  initProgressDots();
  initFloorPlan();
  initModalController();
  initScrollIndicator();

  /* Fire initial room state */
  fireRoomChange(0);

  /* CTA button smooth-scroll */
  document.querySelectorAll('[data-scroll-to]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.scrollTo);
      target?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
