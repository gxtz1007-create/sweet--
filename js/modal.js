/**
 * modal.js - 弹窗模块
 */
(function () {
  'use strict';

  const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
  let activeModal = null;
  let previousFocus = null;

  const openModal = (overlay) => {
    if (!overlay) return;
    previousFocus = document.activeElement;
    activeModal = overlay;
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    // Focus first focusable element
    const modal = overlay.querySelector('.modal');
    if (modal) {
      const firstFocusable = modal.querySelector(FOCUSABLE);
      if (firstFocusable) firstFocusable.focus();
    }
  };

  const closeModal = () => {
    if (!activeModal) return;
    activeModal.classList.remove('active');
    activeModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    if (previousFocus) {
      previousFocus.focus();
      previousFocus = null;
    }
    activeModal = null;
  };

  const initModalEvents = (overlay) => {
    // Close button
    const modal = overlay.querySelector('.modal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.modal__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    // Click overlay backdrop
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal();
      }
    });

    // ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && activeModal === overlay) {
        closeModal();
      }
    });

    // Tab trap
    modal.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const focusables = modal.querySelectorAll(FOCUSABLE);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  };

  window.initModal = function () {
    // Initialize all modal overlays
    const overlays = document.querySelectorAll('.modal-overlay');
    overlays.forEach(initModalEvents);

    // Initialize triggers (elements with data-modal-trigger attribute)
    const triggers = document.querySelectorAll('[data-modal-trigger]');
    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        // Find the modal overlay (use the single global overlay)
        const overlay = document.querySelector('.modal-overlay');
        if (overlay) {
          openModal(overlay);
        }
      });

      // Keyboard support
      trigger.setAttribute('tabindex', '0');
      trigger.setAttribute('role', 'button');
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          trigger.click();
        }
      });
    });
  };
})();
