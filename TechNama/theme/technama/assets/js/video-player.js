/**
 * TechNama YouTube Video Player Integration
 * Lazy load YouTube embeds, responsive containers, play/pause controls.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initLazyYouTube();
    initResponsiveVideos();
  });

  /* ------------------------------------------------------------------ */
  /*  Lazy Load YouTube Embeds                                          */
  /* ------------------------------------------------------------------ */
  function initLazyYouTube() {
    var videoContainers = document.querySelectorAll('[data-youtube-id]');
    if (videoContainers.length === 0) return;

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            loadYouTubePlayer(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '200px 0px',
        threshold: 0.1
      });

      videoContainers.forEach(function (container) {
        observer.observe(container);
      });
    } else {
      videoContainers.forEach(function (container) {
        loadYouTubePlayer(container);
      });
    }
  }

  function loadYouTubePlayer(container) {
    var videoId = container.getAttribute('data-youtube-id');
    if (!videoId) return;

    var startTime = container.getAttribute('data-start-time') || 0;
    var autoplay = container.getAttribute('data-autoplay') === 'true' ? 1 : 0;
    var loop = container.getAttribute('data-loop') === 'true' ? 1 : 0;
    var showRelated = container.getAttribute('data-related') === 'false' ? 0 : 1;

    var embedUrl = 'https://www.youtube-nocookie.com/embed/' + videoId +
      '?autoplay=' + autoplay +
      '&start=' + startTime +
      '&loop=' + loop +
      '&rel=' + showRelated +
      '&enablejsapi=1' +
      '&origin=' + encodeURIComponent(window.location.origin);

    var wrapper = document.createElement('div');
    wrapper.className = 'tn-video-wrapper tn-video-wrapper--loaded';

    var responsiveContainer = document.createElement('div');
    responsiveContainer.className = 'tn-video-responsive';

    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', embedUrl);
    iframe.setAttribute('title', container.getAttribute('data-video-title') || 'YouTube video player');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('loading', 'lazy');

    responsiveContainer.appendChild(iframe);
    wrapper.appendChild(responsiveContainer);

    container.innerHTML = '';
    container.appendChild(wrapper);

    container.classList.add('tn-video--loaded');
  }

  function createYouTubePlaceholder(container) {
    var videoId = container.getAttribute('data-youtube-id');
    if (!videoId) return;

    var thumbnailUrl = 'https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg';
    var fallbackThumbnail = 'https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg';

    var placeholder = document.createElement('div');
    placeholder.className = 'tn-video-placeholder';
    placeholder.setAttribute('role', 'button');
    placeholder.setAttribute('tabindex', '0');
    placeholder.setAttribute('aria-label', 'Play video');

    var img = document.createElement('img');
    img.className = 'tn-video-thumbnail';
    img.src = thumbnailUrl;
    img.alt = container.getAttribute('data-video-title') || 'Video thumbnail';
    img.loading = 'lazy';

    img.onerror = function () {
      img.src = fallbackThumbnail;
    };

    var playBtn = document.createElement('div');
    playBtn.className = 'tn-video-play-btn';
    playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="68" height="68"><circle cx="12" cy="12" r="11" fill="rgba(0,0,0,0.6)" stroke="white" stroke-width="1"/><path d="M10 8l6 4-6 4z" fill="white"/></svg>';

    placeholder.appendChild(img);
    placeholder.appendChild(playBtn);

    placeholder.addEventListener('click', function () {
      loadYouTubePlayer(container);
    });

    placeholder.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        loadYouTubePlayer(container);
      }
    });

    container.appendChild(placeholder);
  }

  /* ------------------------------------------------------------------ */
  /*  Responsive Video Containers                                       */
  /* ------------------------------------------------------------------ */
  function initResponsiveVideos() {
    var contentArea = document.querySelector('.entry-content, .tn-content, .tn-post-content');
    if (!contentArea) return;

    var iframes = contentArea.querySelectorAll('iframe[src*="youtube.com"], iframe[src*="youtu.be"], iframe[src*="vimeo.com"]');
    iframes.forEach(function (iframe) {
      wrapResponsive(iframe);
    });

    var videoElements = contentArea.querySelectorAll('video');
    videoElements.forEach(function (video) {
      wrapResponsive(video);
    });

    embedInContentYouTube();
  }

  function wrapResponsive(element) {
    if (element.parentNode && element.parentNode.classList && element.parentNode.classList.contains('tn-video-responsive')) {
      return;
    }

    var wrapper = document.createElement('div');
    wrapper.className = 'tn-video-responsive';

    element.parentNode.insertBefore(wrapper, element);
    wrapper.appendChild(element);
  }

  function embedInContentYouTube() {
    var content = document.querySelectorAll('.entry-content p, .tn-content p, .tn-post-content p');

    content.forEach(function (p) {
      var text = p.textContent.trim();
      var youtubeMatch = text.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/);

      if (youtubeMatch) {
        var videoId = youtubeMatch[1];
        var container = document.createElement('div');
        container.className = 'tn-video-inline';
        container.setAttribute('data-youtube-id', videoId);

        createYouTubePlaceholder(container);

        p.parentNode.insertBefore(container, p);
        p.remove();
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /*  Public API: Video Controls                                        */
  /* ------------------------------------------------------------------ */
  window.TechNamaVideo = {
    play: function (container) {
      var iframe = container.querySelector('iframe');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: 'playVideo',
          args: ''
        }), '*');
      }
    },

    pause: function (container) {
      var iframe = container.querySelector('iframe');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: 'pauseVideo',
          args: ''
        }), '*');
      }
    },

    togglePlay: function (container) {
      var state = container.getAttribute('data-player-state');
      if (state === 'playing') {
        this.pause(container);
        container.setAttribute('data-player-state', 'paused');
      } else {
        this.play(container);
        container.setAttribute('data-player-state', 'playing');
      }
    },

    loadById: function (container, videoId) {
      container.setAttribute('data-youtube-id', videoId);
      container.classList.remove('tn-video--loaded');
      container.innerHTML = '';
      createYouTubePlaceholder(container);
    },

    onPlayerReady: function (event) {
      var container = event.target.getIframe().closest('[data-youtube-id]');
      if (container) {
        container.setAttribute('data-player-state', 'ready');
      }
    },

    onPlayerStateChange: function (event) {
      var container = event.target.getIframe().closest('[data-youtube-id]');
      if (!container) return;

      var stateMap = {
        '-1': 'unstarted',
        '0': 'ended',
        '1': 'playing',
        '2': 'paused',
        '3': 'buffering',
        '5': 'video_cued'
      };

      var state = stateMap[String(event.data)] || 'unknown';
      container.setAttribute('data-player-state', state);

      var customEvent = new CustomEvent('tn-video-state-change', {
        detail: {
          container: container,
          state: state,
          videoId: container.getAttribute('data-youtube-id')
        }
      });
      container.dispatchEvent(customEvent);
    }
  };
})();
