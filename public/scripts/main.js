window.addEventListener('DOMContentLoaded', () => {
  // HEADER
  class HeaderComponent {
    constructor() {
      this.header = document.querySelector('.hpd-header');
      this.menuToggle = document.querySelector('.hpd-header__menu-toggle');
      this.drawer = document.querySelector('.hpd-header__drawer');
      this.drawerOverlay = document.querySelector('.hpd-header__drawer-overlay');
      this.drawerClose = document.querySelector('.hpd-header__drawer-close');
      // Add mobile search elements
      this.searchButton = document.querySelector('.hpd-header__search-button');
      this.searchMobile = document.querySelector('.hpd-header__search-mobile');
      this.init();
    }
    init() {
      if (!this.menuToggle || !this.drawer) return;
      this.bindEvents();
    }
    bindEvents() {
      // Toggle menu when hamburger button is clicked
      this.menuToggle.addEventListener('click', e => {
        e.preventDefault();
        this.toggleMenu();
      });
      // Toggle mobile search when search button is clicked
      if (this.searchButton && this.searchMobile) {
        this.searchButton.addEventListener('click', e => {
          e.preventDefault();
          this.toggleMobileSearch();
        });
      }
      // Close menu when overlay is clicked
      if (this.drawerOverlay) {
        this.drawerOverlay.addEventListener('click', () => {
          this.closeMenu();
        });
      }
      // Close menu when close button is clicked
      if (this.drawerClose) {
        this.drawerClose.addEventListener('click', () => {
          this.closeMenu();
        });
      }
      // Close menu when escape key is pressed
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && this.isMenuOpen()) {
          this.closeMenu();
        }
      });
      // Close menu when window is resized to desktop size
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && this.isMenuOpen()) {
          this.closeMenu();
        }
      });
      // Handle drawer links click (optional - for smooth closing)
      const drawerLinks = document.querySelectorAll('.hpd-header__drawer-link');
      drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
          // Add small delay to allow navigation
          setTimeout(() => {
            this.closeMenu();
          }, 100);
        });
      });
    }
    toggleMenu() {
      if (this.isMenuOpen()) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    }
    // Mobile search methods
    toggleMobileSearch() {
      if (this.isMobileSearchOpen()) {
        this.closeMobileSearch();
      } else {
        this.openMobileSearch();
      }
    }
    openMobileSearch() {
      this.searchMobile.classList.add('is-open');
      this.searchButton.classList.add('is-active');
      // Focus on search input
      const searchInput = this.searchMobile.querySelector('.hpd-header__search-input-mobile');
      if (searchInput) {
        setTimeout(() => {
          searchInput.focus();
        }, 300); // Wait for animation
      }
    }
    closeMobileSearch() {
      this.searchMobile.classList.remove('is-open');
      this.searchButton.classList.remove('is-active');
    }
    isMobileSearchOpen() {
      return this.searchMobile.classList.contains('is-open');
    }
    openMenu() {
      this.drawer.classList.add('is-open');
      this.menuToggle.classList.add('is-active');
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
      // Focus management for accessibility
      this.drawerClose?.focus();
      // Add aria-expanded for accessibility
      this.menuToggle.setAttribute('aria-expanded', 'true');
    }
    closeMenu() {
      this.drawer.classList.remove('is-open');
      this.menuToggle.classList.remove('is-active');
      // Restore body scroll
      document.body.style.overflow = '';
      // Return focus to menu toggle button
      this.menuToggle.focus();
      // Update aria-expanded for accessibility
      this.menuToggle.setAttribute('aria-expanded', 'false');
    }
    isMenuOpen() {
      return this.drawer.classList.contains('is-open');
    }
  }
  new HeaderComponent();

  // SIDEBAR ACCORDION
  class SidebarAccordion {
    constructor() {
      this.sidebar = document.querySelector('.hpd-sidebar');
      this.items = document.querySelectorAll('.hpd-sidebar__item');
      this.init();
    }
    init() {
      if (!this.sidebar || this.items.length === 0) return;
      this.bindEvents();
    }
    bindEvents() {
      this.items.forEach(item => {
        const header = item.querySelector('.hpd-sidebar__header');
        if (!header) return;
        header.addEventListener('click', () => {
          this.toggleItem(item, header);
        });
      });
    }
    toggleItem(item, header) {
      const isActive = item.classList.contains('is-active');
      if (isActive) {
        // Close this item
        item.classList.remove('is-active');
        header.setAttribute('aria-expanded', 'false');
      } else {
        // Open this item
        item.classList.add('is-active');
        header.setAttribute('aria-expanded', 'true');
      }
    }
    closeAllItems() {
      this.items.forEach(item => {
        const header = item.querySelector('.hpd-sidebar__header');
        item.classList.remove('is-active');
        if (header) {
          header.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }
  new SidebarAccordion();

  // Export for potential module usage
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      HeaderComponent,
      SidebarAccordion
    };
  }
});