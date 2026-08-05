(() => {
  const body = document.body;
  const header = document.querySelector('.site-header');
  const menu = document.getElementById('mobile-menu');
  const menuToggle = document.querySelector('.menu-toggle');
  const menuClose = document.querySelector('.menu-close');
  const menuLinks = menu?.querySelectorAll('a') ?? [];
  const year = document.getElementById('year');
  let lastFocused = null;

  if (year) year.textContent = new Date().getFullYear();

  const openMenu = () => {
    if (!menu || !menuToggle) return;
    lastFocused = document.activeElement;
    menu.hidden = false;
    body.classList.add('menu-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'إغلاق القائمة');
    window.requestAnimationFrame(() => menuClose?.focus());
  };

  const closeMenu = () => {
    if (!menu || !menuToggle) return;
    menu.hidden = true;
    body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'فتح القائمة');
    if (lastFocused instanceof HTMLElement) lastFocused.focus();
  };

  menuToggle?.addEventListener('click', () => {
    if (menu?.hidden) openMenu(); else closeMenu();
  });
  menuClose?.addEventListener('click', closeMenu);
  menu?.addEventListener('click', (event) => {
    if (event.target === menu) closeMenu();
  });
  menuLinks.forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu && !menu.hidden) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 960 && menu && !menu.hidden) closeMenu();
  });

  const revealItems = document.querySelectorAll('[data-reveal]');
  revealItems.forEach((item) => {
    const delay = item.getAttribute('data-delay');
    if (delay) item.style.setProperty('--delay', `${delay}ms`);
  });

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const navLinks = [...document.querySelectorAll('.desktop-nav a[href^="#"]')];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`));
    }, { rootMargin: '-30% 0px -60% 0px', threshold: [0.05, 0.3] });
    sections.forEach((section) => navObserver.observe(section));
  }

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    header?.classList.toggle('is-scrolled', current > 12);
    lastScroll = current;
  }, { passive: true });
})();
