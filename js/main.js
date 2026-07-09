/**
 * main.js - 主入口文件
 * 初始化所有模块，提供全局工具函数
 */
(function () {
  'use strict';

  // ========== Global Utility Functions ==========

  /**
   * Throttle function - limits execution to once per `wait` ms
   * @param {Function} fn - function to throttle
   * @param {number} wait - delay in milliseconds
   * @returns {Function}
   */
  window.Utils = {
    throttle(fn, wait = 16) {
      let lastTime = 0;
      return function (...args) {
        const now = Date.now();
        if (now - lastTime >= wait) {
          lastTime = now;
          return fn.apply(this, args);
        }
      };
    },

    /**
     * Debounce function - delays execution until after `wait` ms of inactivity
     * @param {Function} fn - function to debounce
     * @param {number} wait - delay in milliseconds
     * @returns {Function}
     */
    debounce(fn, wait = 250) {
      let timer;
      return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), wait);
      };
    },

    /**
     * Check if an element is in the viewport
     * @param {HTMLElement} el
     * @returns {boolean}
     */
    isInViewport(el) {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return (
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom > 0
      );
    },

    /**
     * Generate a unique ID string
     * @returns {string}
     */
    uniqueId() {
      return 'id-' + Math.random().toString(36).substring(2, 9);
    },
  };

  // ========== Module Initialization ==========

  /**
   * Initialize all modules in the correct order
   */
  const initAll = () => {
    console.log('[Sweet Portfolio] Initializing...');

    // 1. Navbar - fixed navigation with scroll spy
    if (typeof window.initNavbar === 'function') {
      window.initNavbar();
      console.log('[Sweet Portfolio] ✓ Navbar initialized');
    }

    // 2. Accordion - expandable project panels
    if (typeof window.initAccordion === 'function') {
      window.initAccordion();
      console.log('[Sweet Portfolio] ✓ Accordion initialized');
    }

    // 3. Modal - award certificate popups
    if (typeof window.initModal === 'function') {
      window.initModal();
      console.log('[Sweet Portfolio] ✓ Modal initialized');
    }

    // 4. Scroll animations - reveal on scroll
    if (typeof window.initScrollAnimations === 'function') {
      window.initScrollAnimations();
      console.log('[Sweet Portfolio] ✓ Scroll animations initialized');
    }

    // 5. Back to top button
    if (typeof window.initBackToTop === 'function') {
      window.initBackToTop();
      console.log('[Sweet Portfolio] ✓ Back to top initialized');
    }

    // 6. Parallax effect
    if (typeof window.initParallax === 'function') {
      window.initParallax();
      console.log('[Sweet Portfolio] ✓ Parallax initialized');
    }

    // 7. Count-up animation for numbers
    if (typeof window.initCountUp === 'function') {
      window.initCountUp();
      console.log('[Sweet Portfolio] ✓ Count-up initialized');
    }

    console.log('[Sweet Portfolio] All modules initialized ✓');
  };

  // ========== DOM Ready ==========

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    // DOM already loaded (e.g., script at bottom of body)
    initAll();
  }
})();
