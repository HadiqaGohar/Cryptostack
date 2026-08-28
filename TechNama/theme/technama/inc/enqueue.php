<?php
/**
 * TechNama Enqueue Scripts & Styles
 */

if (!defined('ABSPATH')) exit;

/**
 * Enqueue frontend styles
 */
function technama_enqueue_styles() {
    // Google Fonts
    wp_enqueue_style(
        'technama-google-fonts',
        'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap',
        array(),
        null
    );

    // Parent theme style
    wp_enqueue_style(
        'generatepress',
        get_template_directory_uri() . '/style.css',
        array(),
        wp_get_theme('generatepress')->get('Version')
    );

    // Child theme style
    wp_enqueue_style(
        'technama-style',
        get_stylesheet_uri(),
        array('generatepress'),
        wp_get_theme()->get('Version')
    );
}
add_action('wp_enqueue_scripts', 'technama_enqueue_styles');

/**
 * Enqueue frontend scripts
 */
function technama_enqueue_scripts() {
    // Main script
    wp_enqueue_script(
        'technama-main',
        get_stylesheet_directory_uri() . '/assets/js/main.js',
        array(),
        wp_get_theme()->get('Version'),
        true
    );

    // Ticker script - homepage only
    if (is_front_page()) {
        wp_enqueue_script(
            'technama-ticker',
            get_stylesheet_directory_uri() . '/assets/js/ticker.js',
            array('technama-main'),
            wp_get_theme()->get('Version'),
            true
        );
    }

    // Search script
    if (is_search()) {
        wp_enqueue_script(
            'technama-search',
            get_stylesheet_directory_uri() . '/assets/js/search.js',
            array('technama-main'),
            wp_get_theme()->get('Version'),
            true
        );
    }

    // Video player script
    if (is_page_template('page-templates/template-live-shows.php')) {
        wp_enqueue_script(
            'technama-video',
            get_stylesheet_directory_uri() . '/assets/js/video-player.js',
            array('technama-main'),
            wp_get_theme()->get('Version'),
            true
        );
    }

    // Show filters script
    if (is_page_template('page-templates/template-live-shows.php') || is_singular('video_review')) {
        wp_enqueue_script(
            'technama-show-filters',
            get_stylesheet_directory_uri() . '/assets/js/show-filters.js',
            array(),
            '1.0.0',
            true
        );
        wp_localize_script('technama-show-filters', 'tn_share_vars', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce'    => wp_create_nonce('technama_nonce'),
        ));
    }

    // Localize script for AJAX
    wp_localize_script('technama-main', 'technamaAjax', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
        'nonce'   => wp_create_nonce('technama_nonce'),
    ));

    // Membership script - load on membership page and single posts (for bookmark)
    if (is_page_template('page-templates/template-membership.php') || is_single()) {
        wp_enqueue_script(
            'technama-membership',
            get_stylesheet_directory_uri() . '/assets/js/membership.js',
            array('technama-main'),
            wp_get_theme()->get('Version'),
            true
        );

        wp_localize_script('technama-membership', 'tnMembership', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce'    => wp_create_nonce('technama_nonce'),
            'login_url' => wp_login_url(home_url('/membership/')),
        ));
    }

    // Comment reply script
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }

    // Back to top and smooth scroll
    wp_enqueue_script(
        'technama-scroll-behavior',
        get_stylesheet_directory_uri() . '/assets/js/scroll-behavior.js',
        array(),
        wp_get_theme()->get('Version'),
        true
    );
}
add_action('wp_enqueue_scripts', 'technama_enqueue_scripts');

/**
 * Preload critical resources
 */
function technama_preload_resources() {
    if (is_front_page()) {
        echo '<link rel="preload" href="' . esc_url(get_stylesheet_directory_uri()) . '/assets/images/hero-placeholder.webp" as="image">' . PHP_EOL;
    }
}
add_action('wp_head', 'technama_preload_resources', 1);

/**
 * Defer non-critical JavaScript
 */
function technama_defer_scripts($tag, $handle, $src) {
    $defer_handles = array(
        'technama-ticker',
        'technama-video',
        'technama-scroll-behavior',
    );

    if (in_array($handle, $defer_handles)) {
        return str_replace(' src', ' defer src', $tag);
    }

    return $tag;
}
add_filter('script_loader_tag', 'technama_defer_scripts', 10, 3);

/**
 * Remove default WordPress emoji scripts
 */
function technama_disable_emojis() {
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_styles', 'print_emoji_styles');
    remove_filter('the_content_feed', 'wp_staticize_emoji');
    remove_filter('comment_text_rss', 'wp_staticize_emoji');
    remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
}
add_action('init', 'technama_disable_emojis');

/**
 * Add async/defer attributes to scripts
 */
function technama_script_attributes($tag, $handle) {
    $async_handles = array(
        'google-analytics',
    );

    if (in_array($handle, $async_handles)) {
        return str_replace(' src', ' async src', $tag);
    }

    return $tag;
}
add_filter('script_loader_tag', 'technama_script_attributes', 10, 2);

/**
 * Optimize Google Fonts loading
 */
function technama_optimize_google_fonts($html, $handle) {
    if ($handle === 'technama-google-fonts') {
        return str_replace(' rel="stylesheet"', ' rel="preload" as="style" onload="this.onload=null;this.rel=\'stylesheet\'"', $html);
    }
    return $html;
}
add_filter('style_loader_tag', 'technama_optimize_google_fonts', 10, 2);

/**
 * Add custom colors to Gutenberg editor
 */
function technama_editor_colors() {
    add_theme_support('editor-color-palette', array(
        array(
            'name'  => __('Primary Purple', 'technama'),
            'slug'  => 'technama-primary',
            'color' => '#37215F',
        ),
        array(
            'name'  => __('Primary Blue', 'technama'),
            'slug'  => 'technama-secondary',
            'color' => '#0881BE',
        ),
        array(
            'name'  => __('Dark', 'technama'),
            'slug'  => 'technama-dark',
            'color' => '#212529',
        ),
        array(
            'name'  => __('Light Gray', 'technama'),
            'slug'  => 'technama-light',
            'color' => '#f8f9fa',
        ),
        array(
            'name'  => __('White', 'technama'),
            'slug'  => 'technama-white',
            'color' => '#ffffff',
        ),
    ));
}
add_action('after_setup_theme', 'technama_editor_colors');

/**
 * Add custom font sizes to Gutenberg editor
 */
function technama_editor_font_sizes() {
    add_theme_support('editor-font-sizes', array(
        array(
            'name' => __('Small', 'technama'),
            'size' => 12,
            'slug' => 'small',
        ),
        array(
            'name' => __('Normal', 'technama'),
            'size' => 16,
            'slug' => 'normal',
        ),
        array(
            'name' => __('Medium', 'technama'),
            'size' => 20,
            'slug' => 'medium',
        ),
        array(
            'name' => __('Large', 'technama'),
            'size' => 24,
            'slug' => 'large',
        ),
        array(
            'name' => __('Extra Large', 'technama'),
            'size' => 32,
            'slug' => 'extra-large',
        ),
    ));
}
add_action('after_setup_theme', 'technama_editor_font_sizes');

/**
 * Enqueue editor styles
 */
function technama_enqueue_editor_assets() {
    wp_enqueue_style(
        'technama-editor-style',
        get_stylesheet_directory_uri() . '/assets/css/editor-style.css',
        array(),
        wp_get_theme()->get('Version')
    );
}
add_action('enqueue_block_editor_assets', 'technama_enqueue_editor_assets');

/**
 * Output Google Analytics gtag.js in <head>
 */
function technama_google_analytics() {
    $ga_id = get_theme_mod('technama_ga_measurement_id', '');
    if (empty($ga_id)) {
        return;
    }
    ?>
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo esc_js( $ga_id ); ?>"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '<?php echo esc_js( $ga_id ); ?>');
</script>
<!-- End Google Analytics -->
    <?php
}
add_action('wp_head', 'technama_google_analytics', 1);
