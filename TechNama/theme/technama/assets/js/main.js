/**
 * TechNama Main JavaScript
 * Handles: mobile menu, search overlay, back to top, sticky header,
 * newsletter form AJAX, smooth scroll for anchors.
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /*  DOM Ready                                                         */
  /* ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initSearchOverlay();
    initBackToTop();
    initStickyHeader();
    initNewsletterForm();
    initSmoothScroll();
  });

  /* ------------------------------------------------------------------ */
  /*  Mobile Menu Toggle                                                */
  /* ------------------------------------------------------------------ */
  function initMobileMenu() {
    var toggle = document.querySelector('.tn-nav-toggle');
    var menu = document.querySelector('.tn-nav-menu');
    var overlay = document.querySelector('.tn-nav-overlay');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.contains('is-open');
      menu.classList.toggle('is-open');
      toggle.classList.toggle('is-active');
      document.body.classList.toggle('tn-menu-open');

      if (overlay) {
        overlay.classList.toggle('is-visible', !isOpen);
      }

      toggle.setAttribute('aria-expanded', String(!isOpen));
    });

    if (overlay) {
      overlay.addEventListener('click', function () {
        closeMenu();
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu();
      }
    });

    function closeMenu() {
      menu.classList.remove('is-open');
      toggle.classList.remove('is-active');
      document.body.classList.remove('tn-menu-open');
      if (overlay) overlay.classList.remove('is-visible');
      toggle.setAttribute('aria-expanded', 'false');
    }

    var subMenuParents = menu.querySelectorAll('.menu-item-has-children');
    subMenuParents.forEach(function (item) {
      var link = item.querySelector('a');
      var btn = document.createElement('button');
      btn.className = 'tn-submenu-toggle';
      btn.setAttribute('aria-label', 'Toggle submenu');
      btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12"><path d="M7 10l5 5 5-5z" fill="currentColor"/></svg>';

      link.parentNode.insertBefore(btn, link.nextSibling);

      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        item.classList.toggle('is-active');
        btn.classList.toggle('is-rotated');
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /*  Search Overlay                                                    */
  /* ------------------------------------------------------------------ */
  function initSearchOverlay() {
    var openBtn = document.querySelector('.tn-search-toggle');
    var closeBtn = document.querySelector('.tn-search-close');
    var searchOverlay = document.querySelector('.tn-search-overlay');
    var searchInput = document.querySelector('.tn-search-overlay input[type="search"]');

    if (!openBtn || !searchOverlay) return;

    openBtn.addEventListener('click', function (e) {
      e.preventDefault();
      searchOverlay.classList.add('is-open');
      document.body.classList.add('tn-search-open');
      if (searchInput) {
        setTimeout(function () {
          searchInput.focus();
        }, 100);
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        closeSearch();
      });
    }

    searchOverlay.addEventListener('click', function (e) {
      if (e.target === searchOverlay) {
        closeSearch();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && searchOverlay.classList.contains('is-open')) {
        closeSearch();
      }
    });

    function closeSearch() {
      searchOverlay.classList.remove('is-open');
      document.body.classList.remove('tn-search-open');
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Back to Top                                                       */
  /* ------------------------------------------------------------------ */
  function initBackToTop() {
    var btn = document.querySelector('.tn-back-to-top');
    if (!btn) return;

    var scrollThreshold = 400;
    var scrollTimer = null;

    function toggleButton() {
      if (window.scrollY > scrollThreshold) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    }

    window.addEventListener('scroll', function () {
      if (scrollTimer) return;
      scrollTimer = setTimeout(function () {
        toggleButton();
        scrollTimer = null;
      }, 100);
    }, { passive: true });

    toggleButton();

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /*  Sticky Header                                                     */
  /* ------------------------------------------------------------------ */
  function initStickyHeader() {
    var header = document.querySelector('.tn-header');
    if (!header) return;

    var lastScrollY = 0;
    var headerHeight = header.offsetHeight;
    var scrollTimer = null;

    function onScroll() {
      var currentScrollY = window.scrollY;

      if (currentScrollY > headerHeight) {
        header.classList.add('tn-header--sticky');

        if (currentScrollY > lastScrollY && currentScrollY > headerHeight * 2) {
          header.classList.add('tn-header--hidden');
        } else {
          header.classList.remove('tn-header--hidden');
        }
      } else {
        header.classList.remove('tn-header--sticky');
        header.classList.remove('tn-header--hidden');
      }

      lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', function () {
      if (scrollTimer) return;
      scrollTimer = setTimeout(function () {
        onScroll();
        scrollTimer = null;
      }, 50);
    }, { passive: true });
  }

  /* ------------------------------------------------------------------ */
  /*  Newsletter Form AJAX Submission                                   */
  /* ------------------------------------------------------------------ */
  function initNewsletterForm() {
    var forms = document.querySelectorAll('.tn-newsletter-form');

    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var emailInput = form.querySelector('input[type="email"]');
        var submitBtn = form.querySelector('button[type="submit"]');
        var messageEl = form.querySelector('.tn-newsletter-message');

        if (!emailInput || !emailInput.value.trim()) return;

        var email = emailInput.value.trim();
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          showMessage(messageEl, 'Please enter a valid email address.', 'error');
          return;
        }

        var originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="tn-spinner"></span>Subscribing...';

        var data = new FormData();
        data.append('action', 'tn_subscribe');
        data.append('email', email);
        data.append('nonce', typeof technamaAjax !== 'undefined' ? technamaAjax.nonce : '');

        fetch(typeof technamaAjax !== 'undefined' ? technamaAjax.ajaxurl : '/wp-admin/admin-ajax.php', {
          method: 'POST',
          body: data,
          credentials: 'same-origin'
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (result) {
            if (result.success) {
              showMessage(messageEl, result.data.message || 'Successfully subscribed!', 'success');
              emailInput.value = '';
            } else {
              showMessage(messageEl, result.data.message || 'Something went wrong. Please try again.', 'error');
            }
          })
          .catch(function (err) {
            console.error('[Newsletter AJAX]', err);
            showMessage(messageEl, 'Something went wrong. Please try again.', 'error');
          })
          .finally(function () {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          });
      });
    });

    function showMessage(el, text, type) {
      if (!el) return;
      el.textContent = text;
      el.className = 'tn-newsletter-message tn-newsletter-message--' + type;
      el.style.display = 'block';

      setTimeout(function () {
        el.style.display = 'none';
      }, 5000);
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Smooth Scrolling for Anchor Links                                 */
  /* ------------------------------------------------------------------ */
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;

      var hash = link.getAttribute('href');
      if (!hash || hash === '#' || hash === '#0') return;

      var target;
      try {
        target = document.querySelector(hash);
      } catch (err) {
        return;
      }

      if (!target) return;

      e.preventDefault();

      var headerHeight = 0;
      var stickyHeader = document.querySelector('.tn-header--sticky');
      if (stickyHeader) {
        headerHeight = stickyHeader.offsetHeight;
      }

      var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      history.pushState(null, null, hash);
    });
  }
})();

/* Reading Progress Bar */
(function(){
    var bar = document.getElementById('tn-reading-progress');
    if (!bar || !document.querySelector('.post-content, article')) return;
    window.addEventListener('scroll', function() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var progress = (scrollTop / docHeight) * 100;
        bar.style.width = Math.min(progress, 100) + '%';
    });
})();
