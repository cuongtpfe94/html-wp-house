(function () {
  'use strict';

  function initListExpand() {
    const expandButtons = document.querySelectorAll('.hpd-003__list-expand-btn');
    expandButtons.forEach(button => {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const row = this.closest('.hpd-003__list-row');
        const detailRow = row.nextElementSibling;
        if (!detailRow || !detailRow.classList.contains('hpd-003__list-detail-row')) {
          return;
        }
        const isExpanded = this.classList.contains('is-expanded');
        if (isExpanded) {
          // Collapse
          this.classList.remove('is-expanded');
          this.setAttribute('aria-expanded', 'false');
          detailRow.style.display = 'none';
          detailRow.classList.remove('is-expanded');
        } else {
          // Expand
          this.classList.add('is-expanded');
          this.setAttribute('aria-expanded', 'true');
          detailRow.style.display = 'table-row';
          detailRow.classList.add('is-expanded');
        }
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initListExpand);
  } else {
    initListExpand();
  }
})();