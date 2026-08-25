/**
 * TechNama Breaking News Ticker
 * Auto-scrolling ticker with pause on hover and smooth CSS transforms.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initTicker();
  });

  function initTicker() {
    var ticker = document.querySelector('.tn-ticker');
    if (!ticker) return;

    var track = ticker.querySelector('.tn-ticker-track');
    if (!track) return;

    var items = track.querySelectorAll('.tn-ticker-item');
    if (items.length === 0) return;

    var isPaused = false;
    var scrollSpeed = 1;
    var pauseOnHover = true;
    var autoScrollInterval = null;
    var animationFrame = null;
    var currentTranslateX = 0;
    var trackWidth = 0;
    var containerWidth = 0;

    function measure() {
      trackWidth = track.scrollWidth;
      containerWidth = ticker.offsetWidth;
    }

    function cloneItems() {
      var cloneContainer = track.cloneNode(true);
      cloneContainer.classList.add('tn-ticker-track--clone');
      cloneContainer.setAttribute('aria-hidden', 'true');

      var cloneItems = cloneContainer.querySelectorAll('.tn-ticker-item');
      cloneItems.forEach(function (item) {
        item.removeAttribute('data-id');
      });

      ticker.appendChild(cloneContainer);
    }

    function animate() {
      if (!isPaused) {
        currentTranslateX -= scrollSpeed;

        var totalWidth = trackWidth;
        if (Math.abs(currentTranslateX) >= totalWidth) {
          currentTranslateX = 0;
        }

        track.style.transform = 'translateX(' + currentTranslateX + 'px)';

        var cloneTrack = ticker.querySelector('.tn-ticker-track--clone');
        if (cloneTrack) {
          cloneTrack.style.transform = 'translateX(' + (currentTranslateX + totalWidth) + 'px)';
        }
      }

      animationFrame = requestAnimationFrame(animate);
    }

    function startAnimation() {
      if (animationFrame) return;
      isPaused = false;
      animationFrame = requestAnimationFrame(animate);
    }

    function stopAnimation() {
      isPaused = true;
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    }

    if (pauseOnHover) {
      ticker.addEventListener('mouseenter', function () {
        stopAnimation();
      });

      ticker.addEventListener('mouseleave', function () {
        startAnimation();
      });

      ticker.addEventListener('touchstart', function () {
        stopAnimation();
      }, { passive: true });

      ticker.addEventListener('touchend', function () {
        setTimeout(function () {
          startAnimation();
        }, 2000);
      }, { passive: true });
    }

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        stopAnimation();
        measure();
        currentTranslateX = 0;
        startAnimation();
      }, 250);
    });

    measure();
    cloneItems();
    startAnimation();

    var event = new CustomEvent('tn-ticker-ready', {
      detail: {
        ticker: ticker,
        itemCount: items.length
      }
    });
    ticker.dispatchEvent(event);
  }
})();
