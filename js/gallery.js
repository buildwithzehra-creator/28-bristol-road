// ━━━━━━━━━━━━━━ LIGHTBOX ━━━━━━━━━━━━━━
const matImgs = Array.from(document.querySelectorAll('.mat-thumb img'));
let lbIdx = 0;

function lbOpen(idx) {
  lbIdx = idx;
  const lb = document.getElementById('lb');
  document.getElementById('lbImg').src = matImgs[lbIdx].src;
  lb.classList.add('open');
  requestAnimationFrame(() => lb.classList.add('vis'));
  document.body.style.overflow = 'hidden';
}
function lbClose() {
  const lb = document.getElementById('lb');
  lb.classList.remove('vis');
  setTimeout(() => { lb.classList.remove('open'); document.body.style.overflow = ''; }, 400);
}
function lbNav(dir) {
  lbIdx = (lbIdx + dir + matImgs.length) % matImgs.length;
  document.getElementById('lbImg').src = matImgs[lbIdx].src;
}

document.querySelectorAll('.mat-thumb').forEach((el, i) => {
  el.addEventListener('click', () => lbOpen(i));
});
document.addEventListener('keydown', e => {
  const lb = document.getElementById('lb');
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape')     lbClose();
  if (e.key === 'ArrowLeft')  lbNav(-1);
  if (e.key === 'ArrowRight') lbNav(1);
});
document.getElementById('lb').addEventListener('click', e => {
  if (e.target === document.getElementById('lb')) lbClose();
});
