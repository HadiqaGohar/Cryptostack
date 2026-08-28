/**
 * TechNama Show Filters
 * Client-side filtering for live shows page
 * Phase 11: Startup Live Show - Operating Model
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initShowFilters();
        initShareTracking();
        initCopyLink();
    });

    /**
     * Initialize show filter buttons
     */
    function initShowFilters() {
        var filterButtons = document.querySelectorAll('.tn-filter-btn');
        var videoCards = document.querySelectorAll('.tn-video-grid .tn-card, .tn-video-grid article');

        if (!filterButtons.length || !videoCards.length) return;

        filterButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var filter = this.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(function(b) { b.classList.remove('active'); });
                this.classList.add('active');

                // Filter cards
                videoCards.forEach(function(card) {
                    var status = card.getAttribute('data-show-status') || '';
                    
                    if (filter === 'all') {
                        card.style.display = '';
                    } else if (filter === 'live' && status === 'live') {
                        card.style.display = '';
                    } else if (filter === 'upcoming' && status === 'scheduled') {
                        card.style.display = '';
                    } else if (filter === 'episodes' && (status === 'archived' || status === '')) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });

                // Show empty state if no cards visible
                var visibleCount = 0;
                videoCards.forEach(function(card) {
                    if (card.style.display !== 'none') visibleCount++;
                });

                var emptyState = document.querySelector('.tn-no-videos');
                if (emptyState) {
                    emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
                }
            });
        });
    }

    /**
     * Track social shares via AJAX
     */
    function initShareTracking() {
        var shareButtons = document.querySelectorAll('.tn-share-btn[data-post-id]');

        shareButtons.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                var postId = this.getAttribute('data-post-id');
                var platform = '';

                if (this.classList.contains('tn-share-twitter')) platform = 'twitter';
                else if (this.classList.contains('tn-share-linkedin')) platform = 'linkedin';
                else if (this.classList.contains('tn-share-facebook')) platform = 'facebook';
                else if (this.classList.contains('tn-share-copy')) platform = 'copy';

                if (!platform || !postId) return;

                // Track the share (don't block navigation)
                if (typeof tn_share_vars !== 'undefined') {
                    var data = new FormData();
                    data.append('action', 'tn_track_share');
                    data.append('nonce', tn_share_vars.nonce);
                    data.append('post_id', postId);
                    data.append('platform', platform);

                    fetch(tn_share_vars.ajax_url, {
                        method: 'POST',
                        body: data,
                        credentials: 'same-origin'
                    }).catch(function() {
                        // Silently fail - don't break user experience
                    });
                }
            });
        });
    }

    /**
     * Copy link functionality
     */
    function initCopyLink() {
        var copyButtons = document.querySelectorAll('.tn-share-copy');

        copyButtons.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                var url = this.getAttribute('data-url');

                if (navigator.clipboard) {
                    navigator.clipboard.writeText(decodeURIComponent(url)).then(function() {
                        btn.innerHTML = '<span class="tn-share-icon">✓</span> Copied!';
                        setTimeout(function() {
                            btn.innerHTML = '<span class="tn-share-icon">🔗</span> Copy Link';
                        }, 2000);
                    });
                } else {
                    // Fallback
                    var textarea = document.createElement('textarea');
                    textarea.value = decodeURIComponent(url);
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    btn.innerHTML = '<span class="tn-share-icon">✓</span> Copied!';
                    setTimeout(function() {
                        btn.innerHTML = '<span class="tn-share-icon">🔗</span> Copy Link';
                    }, 2000);
                }
            });
        });
    }

})();
