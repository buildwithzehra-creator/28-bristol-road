// ━━━━━━━━━━━━━━ PRELOADER ━━━━━━━━━━━━━━
const loader = document.getElementById('loader');
requestAnimationFrame(() => requestAnimationFrame(() => loader.classList.add('rdy')));
function dismissLoader() { setTimeout(() => {
  loader.classList.add('out');
  loader.addEventListener('transitionend', () => loader.style.display = 'none', { once: true });
}, 1500); }
if (document.readyState === 'complete') { dismissLoader(); }
else { window.addEventListener('load', dismissLoader); setTimeout(dismissLoader, 5000); }
