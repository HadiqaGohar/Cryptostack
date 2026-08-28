/**
 * TechNama Customizer Live Preview
 * Handles real-time preview of customizer changes
 */

(function($) {
    'use strict';

    var api = wp.customize;

    // Site title
    api('blogname', function(value) {
        value.bind(function(to) {
            $('.site-title a').text(to);
        });
    });

    // Site description
    api('blogdescription', function(value) {
        value.bind(function(to) {
            $('.site-description').text(to);
        });
    });

    // Primary color
    api('technama_primary_color', function(value) {
        value.bind(function(to) {
            document.documentElement.style.setProperty('--tn-color-primary', to);
        });
    });

    // Secondary color
    api('technama_secondary_color', function(value) {
        value.bind(function(to) {
            document.documentElement.style.setProperty('--tn-color-secondary', to);
        });
    });

    // Show video section toggle
    api('technama_show_video_section', function(value) {
        value.bind(function(to) {
            $('.tn-homepage-video').toggle(to);
        });
    });

    // Live video ID
    api('technama_live_video_id', function(value) {
        value.bind(function(to) {
            if (to) {
                var embedUrl = 'https://www.youtube.com/embed/' + to;
                $('.tn-live-stream-video iframe').attr('src', embedUrl);
                $('.tn-live-stream').show();
            } else {
                $('.tn-live-stream').hide();
            }
        });
    });

    // Social URLs
    var socialLinks = ['twitter', 'facebook', 'instagram', 'linkedin', 'youtube'];
    socialLinks.forEach(function(platform) {
        api('technama_social_' + platform, function(value) {
            value.bind(function(to) {
                var selector = '.tn-social-' + platform;
                if (to) {
                    $(selector).attr('href', to).show();
                } else {
                    $(selector).hide();
                }
            });
        });
    });

})(jQuery);
