/**
 * TechNama Smooth Scroll Behavior
 * Handles smooth scrolling for anchor links and back-to-top
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initSmoothScroll();
        initBackToTop();
    });

    /**
     * Smooth scroll for anchor links
     */
    function initSmoothScroll() {
        var links = document.querySelectorAll('a[href^="#"]');

        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                var targetId = this.getAttribute('href');
                if (targetId === '#' || targetId === '#0') return;

                var target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    var headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
                    var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Back to top button
     */
    function initBackToTop() {
        var backToTop = document.createElement('button');
        backToTop.className = 'tn-back-to-top';
        backToTop.innerHTML = '↑';
        backToTop.setAttribute('aria-label', 'Back to top');
        backToTop.style.cssText = 'display:none;position:fixed;bottom:30px;right:30px;width:50px;height:50px;border-radius:50%;background:#37215F;color:#fff;border:none;font-size:1.5rem;cursor:pointer;z-index:9999;transition:opacity 0.3s;box-shadow:0 2px 10px rgba(0,0,0,0.3);';
        document.body.appendChild(backToTop);

        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 500) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

})();
