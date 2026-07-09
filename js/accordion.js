/**
 * accordion.js - 手风琴/折叠面板模块
 */
(function () {
  'use strict';

  const toggleAccordion = (item) => {
    const content = item.querySelector('.accordion__content');
    const trigger = item.querySelector('.accordion__trigger');
    const icon = item.querySelector('.accordion__icon');

    if (!content || !trigger) return;

    const isOpen = item.classList.contains('active');

    if (isOpen) {
      // Close
      content.style.maxHeight = null;
      item.classList.remove('active');
      trigger.setAttribute('aria-expanded', 'false');
      if (icon) icon.style.transform = '';
    } else {
      // Open
      content.style.maxHeight = content.scrollHeight + 'px';
      item.classList.add('active');
      trigger.setAttribute('aria-expanded', 'true');
      if (icon) icon.style.transform = 'rotate(180deg)';
    }
  };

  const closeSiblings = (accordion, currentItem) => {
    const items = accordion.querySelectorAll('.accordion__item');
    items.forEach((sibling) => {
      if (sibling !== currentItem && sibling.classList.contains('active')) {
        const content = sibling.querySelector('.accordion__content');
        const trigger = sibling.querySelector('.accordion__trigger');
        const icon = sibling.querySelector('.accordion__icon');
        if (content) content.style.maxHeight = null;
        sibling.classList.remove('active');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
        if (icon) icon.style.transform = '';
      }
    });
  };

  const initSingleAccordion = (accordion) => {
    const items = accordion.querySelectorAll('.accordion__item');

    items.forEach((item) => {
      const trigger = item.querySelector('.accordion__trigger');
      if (!trigger) return;

      trigger.addEventListener('click', () => {
        const isMultiple = accordion.dataset.accordion === 'multiple';

        if (!isMultiple) {
          closeSiblings(accordion, item);
        }

        toggleAccordion(item);
      });

      // Keyboard support
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          trigger.click();
        }
      });
    });

    // Set initial state
    items.forEach((item) => {
      const trigger = item.querySelector('.accordion__trigger');
      const content = item.querySelector('.accordion__content');
      if (item.classList.contains('active') && content) {
        content.style.maxHeight = content.scrollHeight + 'px';
        if (trigger) trigger.setAttribute('aria-expanded', 'true');
      }
    });
  };

  window.initAccordion = function () {
    const accordions = document.querySelectorAll('[data-accordion]');
    if (accordions.length === 0) return;

    accordions.forEach(initSingleAccordion);
  };
})();
