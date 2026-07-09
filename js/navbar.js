/**
 * navbar.js - 导航栏模块
 * IIFE pattern, exposes initNavbar to window
 */
(function () {
  'use strict';

  const throttle = (fn, wait = 16) => {
    let lastTime = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastTime >= wait) {
        lastTime = now;
        fn.apply(this, args);
      }
    };
  };

  // ========== Scroll: add "scrolled" class after 100px ==========
  const handleNavScroll = (navbar) => {
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  // ========== Scroll Spy: highlight active nav link ==========
  const initScrollSpy = (navLinks) => {
    const sections = [];

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const section = document.getElementById(href.substring(1));
        if (section) {
          sections.push({ el: section, link });
        }
      }
    });

    if (sections.length === 0) return;

    const updateActive = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const offset = 120;
      let current = null;

      for (let i = sections.length - 1; i >= 0; i--) {
        const { el } = sections[i];
        const top = el.offsetTop - offset;
        if (scrollY >= top) {
          current = sections[i];
          break;
        }
      }

      if (!current && scrollY < 200) {
        current = sections[0];
      }

      navLinks.forEach((link) => link.classList.remove('active'));
      if (current) {
        current.link.classList.add('active');
      }
    };

    const throttledUpdate = throttle(updateActive, 50);
    window.addEventListener('scroll', throttledUpdate, { passive: true });
    updateActive();
  };

  // ========== Mobile menu toggle ==========
  const initMobileToggle = (navbar) => {
    const toggle = navbar.querySelector('.navbar__toggle');
    const mobileMenu = navbar.querySelector('.navbar__mobile-menu');

    if (!toggle || !mobileMenu) return;

    toggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      toggle.classList.toggle('active', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  };

  // ========== Smooth scroll & close mobile menu on link click ==========
  const initNavLinks = (navbar) => {
    // Desktop nav links
    const desktopLinks = navbar.querySelectorAll('.navbar__links .navbar__link');
    // Mobile nav links
    const mobileLinks = navbar.querySelectorAll('.navbar__mobile-menu .navbar__mobile-link');
    // All links combined
    const allLinks = [...desktopLinks, ...mobileLinks];
    const mobileMenu = navbar.querySelector('.navbar__mobile-menu');
    const toggle = navbar.querySelector('.navbar__toggle');

    allLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.getElementById(href.substring(1));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          history.pushState(null, '', href);
        }

        // Close mobile menu
        if (mobileMenu && mobileMenu.classList.contains('open')) {
          mobileMenu.classList.remove('open');
          if (toggle) {
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
          }
          document.body.style.overflow = '';
        }
      });
    });

    return desktopLinks;
  };

  // ========== Main init ==========
  window.initNavbar = function () {
    const navbar = document.getElementById('navbar');
    if (!navbar) {
      console.warn('[navbar] #navbar element not found');
      return;
    }

    const throttledScroll = throttle(() => handleNavScroll(navbar), 16);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleNavScroll(navbar);

    initMobileToggle(navbar);
    const navLinks = initNavLinks(navbar);

    if (navLinks) {
      initScrollSpy(navLinks);
    }
  };
})();
