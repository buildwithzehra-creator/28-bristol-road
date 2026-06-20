// ━━━━━━━━━━━━━━ NAV SCROLL ━━━━━━━━━━━━━━
const nav = document.getElementById('nav');
const heroSection = document.getElementById('hero');
window.addEventListener('scroll', () => {
  const heroH = heroSection ? heroSection.offsetHeight : 600;
  nav.classList.toggle('scrolled', window.scrollY > 60);
  nav.classList.toggle('light-nav', window.scrollY > heroH - 80);
}, { passive: true });

// ━━━━━━━━━━━━━━ MOBILE NAV ━━━━━━━━━━━━━━
(function() {
  const burger = document.getElementById('navBurger');
  const menu   = document.getElementById('navMobileMenu');
  const nav    = document.getElementById('nav');
  if (!burger || !menu) return;

  function openMenu() {
    nav.classList.add('menu-open');
    menu.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  window.closeMenu = function() {
    nav.classList.remove('menu-open');
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  burger.addEventListener('click', () => {
    nav.classList.contains('menu-open') ? closeMenu() : openMenu();
  });
  menu.addEventListener('click', e => { if (e.target === menu) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
})();

// ━━━━━━━━━━━━━━ SCROLL PROGRESS BAR ━━━━━━━━━━━━━━
const scrollBar = document.getElementById('scroll-bar');
window.addEventListener('scroll', () => {
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  scrollBar.style.width = (docH > 0 ? (window.scrollY / docH * 100) : 0) + '%';
}, { passive: true });
