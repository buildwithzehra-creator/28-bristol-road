// ━━━━━━━━━━━━━━ ROOM ACTIVITY ━━━━━━━━━━━━━━
(function() {
  const roomCounts = [18, 23, 11, 9, 7, 26, 14, 8, 19, 12];
  const roomEl = document.getElementById('roomCount');
  const activityEl = document.getElementById('roomActivity');
  if (!roomEl || !activityEl) return;

  let current = roomCounts[0];
  let flickerTimer;

  function startFlicker(base) {
    clearTimeout(flickerTimer);
    function tick() {
      const delta = Math.floor(Math.random() * 5) - 2;
      current = Math.max(3, base + delta);
      roomEl.textContent = current;
      flickerTimer = setTimeout(tick, 3200 + Math.random() * 2000);
    }
    tick();
  }

  window.__setRoomActivity = function(idx) {
    const base = roomCounts[idx] ?? (8 + Math.floor(Math.random() * 18));
    current = base;
    roomEl.textContent = current;
    activityEl.style.transform = 'scale(1.04)';
    activityEl.style.transition = 'transform 0.18s ease';
    setTimeout(() => { activityEl.style.transform = ''; activityEl.style.transition = ''; }, 200);
    startFlicker(base);
  };

  startFlicker(roomCounts[0]);
})();

// ━━━━━━━━━━━━━━ 360 PANORAMA ━━━━━━━━━━━━━━
const scenes = [
  { label: 'First Floor', name: 'Living Room',     src: 'images/pano-0.jpg' },
  { label: 'First Floor', name: "Chef's Kitchen",  src: 'images/pano-1.jpg' },
  { label: 'First Floor', name: 'Kitchen Overview',src: 'images/pano-2.jpg' },
  { label: 'Entry',       name: 'Entry Hallway',   src: 'images/pano-3.jpg' },
  { label: 'First Floor', name: 'Home Office',     src: 'images/pano-4.jpg' },
  { label: 'Second Floor',name: 'Primary Suite',   src: 'images/pano-5.jpg' },
  { label: 'Second Floor',name: 'Bedroom Two',     src: 'images/pano-6.jpg' },
  { label: 'Second Floor',name: 'Bedroom Three',   src: 'images/pano-7.jpg' },
  { label: 'Second Floor',name: 'Primary Bath',    src: 'images/pano-8.jpg' },
  { label: 'Ground Floor',name: 'Kitchen Level 2', src: 'images/pano-9.jpg' }
];

const panoWrap = document.getElementById('panoWrap');
const tourNav  = document.getElementById('tourNav');
const panoCue  = document.getElementById('panoCue');
const panoProgress = document.getElementById('panoProgress');

let currentScene = 0;
let dragActive = false;
let dragStartX = 0;
let panPercent = 50;
let sceneElements = [];

scenes.forEach((sc, i) => {
  const div = document.createElement('div');
  div.className = 'pano-scene' + (i === 0 ? ' active' : '');
  div.innerHTML = `
    <div class="pano-inner" id="panoInner${i}" style="transform:translateX(-25%)">
      <img src="${sc.src}" alt="${sc.name}" draggable="false" loading="${i === 0 ? 'eager' : 'lazy'}">
    </div>
    <div class="pano-info">
      <p class="pano-info-lbl">${sc.label}</p>
      <p class="pano-info-name">${sc.name}</p>
    </div>
  `;
  panoWrap.insertBefore(div, panoCue);
  sceneElements.push(div);

  const btn = document.createElement('button');
  btn.className = 'tnav-btn' + (i === 0 ? ' active' : '');
  btn.textContent = sc.name;
  btn.onclick = () => switchScene(i);
  tourNav.appendChild(btn);
});

function switchScene(idx) {
  sceneElements[currentScene].classList.remove('active');
  document.querySelectorAll('.tnav-btn')[currentScene].classList.remove('active');
  currentScene = idx;
  sceneElements[idx].classList.add('active');
  document.querySelectorAll('.tnav-btn')[idx].classList.add('active');
  panPercent = 50;
  applyPan();
  if (window.__setRoomActivity) window.__setRoomActivity(idx);
}

function applyPan() {
  const tx = -panPercent / 2;
  const inner = document.getElementById('panoInner' + currentScene);
  if (inner) inner.style.transform = `translateX(${tx}%)`;
  panoProgress.style.width = panPercent + '%';
}

panoWrap.addEventListener('mousedown', e => {
  dragActive = true;
  dragStartX = e.clientX;
  panoCue.classList.add('gone');
});
window.addEventListener('mousemove', e => {
  if (!dragActive) return;
  const dx = e.clientX - dragStartX;
  dragStartX = e.clientX;
  panPercent = Math.max(0, Math.min(100, panPercent - dx * 0.06));
  applyPan();
});
window.addEventListener('mouseup', () => { dragActive = false; });

panoWrap.addEventListener('touchstart', e => {
  dragStartX = e.touches[0].clientX;
  panoCue.classList.add('gone');
}, { passive: true });
panoWrap.addEventListener('touchmove', e => {
  const dx = e.touches[0].clientX - dragStartX;
  dragStartX = e.touches[0].clientX;
  panPercent = Math.max(0, Math.min(100, panPercent - dx * 0.06));
  applyPan();
}, { passive: true });

document.addEventListener('keydown', e => {
  const tourEl = document.getElementById('tour');
  const rect = tourEl.getBoundingClientRect();
  const inView = rect.top < window.innerHeight && rect.bottom > 0;
  if (!inView) return;
  if (e.key === 'ArrowLeft')  { panPercent = Math.max(0, panPercent - 4); applyPan(); }
  if (e.key === 'ArrowRight') { panPercent = Math.min(100, panPercent + 4); applyPan(); }
});
