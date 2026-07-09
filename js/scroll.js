/**
 * scroll.js - 滚动动画模块
 * IIFE pattern, exposes initScrollAnimations, initBackToTop, initParallax, initCountUp to window
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

  // ========== Scroll Reveal with IntersectionObserver ==========
  window.initScrollAnimations = function () {
    const revealEls = document.querySelectorAll('.reveal');

    if (revealEls.length === 0) {
      console.info('[scroll] No .reveal elements found');
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.getAttribute('data-delay') || '0', 10);

          if (delay > 0) {
            setTimeout(() => {
              el.classList.add('visible');
            }, delay);
          } else {
            el.classList.add('visible');
          }

          observer.unobserve(el);
        }
      });
    }, observerOptions);

    revealEls.forEach((el) => observer.observe(el));
  };

  // ========== Back to Top Button ==========
  window.initBackToTop = function () {
    const btn = document.getElementById('backToTop') || document.querySelector('.back-to-top');
    if (!btn) {
      console.info('[scroll] No back-to-top button found');
      return;
    }

    const SHOW_THRESHOLD = 300;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > SHOW_THRESHOLD) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    };

    const throttledScroll = throttle(handleScroll, 50);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll();

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  // ========== Parallax Effect ==========
  window.initParallax = function () {
    const hero = document.querySelector('.hero') || document.querySelector('#home');
    if (!hero) return;

    const parallaxTarget = hero.querySelector('.hero__image-wrapper') || hero;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    let ticking = false;

    const updateParallax = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const heroBottom = hero.offsetTop + hero.offsetHeight;

      if (scrollY < heroBottom && parallaxTarget !== hero) {
        const translateY = scrollY * 0.15;
        parallaxTarget.style.transform = `translate3d(0, ${translateY}px, 0)`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  };

  // ========== Count-Up Animation ==========
  window.initCountUp = function () {
    const counters = document.querySelectorAll('[data-count]');

    if (counters.length === 0) {
      console.info('[scroll] No [data-count] elements found');
      return;
    }

    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      const duration = 2000;

      if (isNaN(target)) return;

      let startTime = null;

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);

        el.textContent = current.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target.toLocaleString();
        }
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    });

    counters.forEach((counter) => {
      counter.textContent = '0';
      observer.observe(counter);
    });
  };

  // ========== Expandable Competition Cards ==========
  const initExpandableCards = () => {
    const cards = document.querySelectorAll('[data-expandable]');
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const details = card.querySelector('.competition-details');
        if (!details) return;

        const isExpanded = card.classList.contains('expanded');
        
        // Close all other cards
        cards.forEach((c) => {
          if (c !== card) {
            c.classList.remove('expanded');
            const d = c.querySelector('.competition-details');
            if (d) d.style.maxHeight = null;
          }
        });

        if (isExpanded) {
          card.classList.remove('expanded');
          details.style.maxHeight = null;
        } else {
          card.classList.add('expanded');
          details.style.maxHeight = details.scrollHeight + 'px';
        }
      });

      card.style.cursor = 'pointer';
    });
  };

  // Auto-init expandable cards when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExpandableCards);
  } else {
    initExpandableCards();
  }
})();
