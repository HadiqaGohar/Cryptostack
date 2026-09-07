/* ==========================================
   CryptoStack - Crypto Trading Platform
   Main JavaScript File
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------
     1. ANIMATED COUNTERS
     ------------------------------------------ */

  /**
   * Formats a number with commas as thousand separators
   * @param {number} num - The number to format
   * @returns {string} Formatted number string
   */
  function formatNumber(num) {
    if (num >= 1000000) {
      return '$' + (num / 1000000).toFixed(0) + 'M+';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K+';
    }
    return num.toLocaleString('en-US') + '+';
  }

  /**
   * Animates a counter element from 0 to its target value
   * @param {HTMLElement} el - The element to animate
   */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000; // Animation duration in ms
    const startTime = performance.now();
    const startValue = 0;

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + (target - startValue) * eased);

      el.textContent = formatNumber(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // Initialize counters when stats section enters viewport
  const statsSection = document.querySelector('.stats');
  let countersAnimated = false;

  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          const counters = document.querySelectorAll('.stat-number[data-target]');
          counters.forEach((counter) => animateCounter(counter));
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  }


  /* ------------------------------------------
     2. FAQ ACCORDION
     ------------------------------------------ */

  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const chevron = item.querySelector('.faq-chevron');

    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all other FAQ items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          const otherChevron = otherItem.querySelector('.faq-chevron');
          if (otherAnswer) otherAnswer.style.maxHeight = '0';
          if (otherChevron) otherChevron.style.transform = 'rotate(0deg)';
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('active');
        answer.style.maxHeight = '0';
        if (chevron) chevron.style.transform = 'rotate(0deg)';
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        if (chevron) chevron.style.transform = 'rotate(180deg)';
      }
    });
  });


  /* ------------------------------------------
     3. SMOOTH SCROLLING
     ------------------------------------------ */

  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });


  /* ------------------------------------------
     4. INTERSECTION OBSERVER (Scroll Animations)
     ------------------------------------------ */

  const animatedElements = document.querySelectorAll(
    '.fade-in, .slide-up, .slide-in-left, .slide-in-right'
  );

  if (animatedElements.length > 0) {
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optionally stop observing after animation triggers
          // scrollObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach((el) => {
      scrollObserver.observe(el);
    });
  }


  /* ------------------------------------------
     5. MOBILE NAVIGATION
     ------------------------------------------ */

  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
  const body = document.body;

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.contains('active');

      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');

      // Toggle body scroll lock
      if (!isOpen) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });

    // Close mobile menu when a link is clicked
    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        body.style.overflow = '';
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        body.style.overflow = '';
      }
    });
  }


  /* ------------------------------------------
     6. NAVBAR SCROLL EFFECT
     ------------------------------------------ */

  const navbar = document.querySelector('.navbar');

  if (navbar) {
    let lastScrollY = 0;

    function handleNavbarScroll() {
      const scrollY = window.scrollY;

      // Add background and shadow after scrolling
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      lastScrollY = scrollY;
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    // Run once on load in case page is already scrolled
    handleNavbarScroll();
  }


  /* ------------------------------------------
     7. PARALLAX EFFECT (Hero Section)
     ------------------------------------------ */

  const heroSection = document.querySelector('.hero');
  const heroBackground = document.querySelector('.hero-bg');

  if (heroSection && heroBackground) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroHeight = heroSection.offsetHeight;

      // Only apply parallax while hero is visible
      if (scrollY < heroHeight) {
        const offset = scrollY * 0.4;
        heroBackground.style.transform = `translateY(${offset}px)`;
      }
    }, { passive: true });
  }


  /* ------------------------------------------
     8. BUTTON RIPPLE EFFECT
     ------------------------------------------ */

  const ctaButtons = document.querySelectorAll('.btn-cta, .btn-primary, .btn-hero');

  ctaButtons.forEach((button) => {
    // Ensure button has relative positioning for ripple placement
    button.style.position = 'relative';
    button.style.overflow = 'hidden';

    button.addEventListener('click', (e) => {
      const rect = button.getBoundingClientRect();

      // Calculate click position relative to button
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Create ripple element
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        animation: ripple-effect 0.6s ease-out forwards;
      `;

      button.appendChild(ripple);

      // Remove ripple element after animation
      ripple.addEventListener('animationend', () => {
        ripple.remove();
      });
    });
  });

  // Inject ripple animation keyframes if not already present
  if (!document.querySelector('#ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
      @keyframes ripple-effect {
        to {
          width: 300px;
          height: 300px;
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

});
