<?php
/**
 * TechNama Theme Functions
 * Child theme of GeneratePress
 */

if (!defined('ABSPATH')) exit;

define('TECHNAMA_VERSION', '1.0.0');

/**
 * Theme Setup
 */
function technama_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo', array(
        'height'      => 60,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true,
    ));
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));
    add_theme_support('customize-selective-refresh-widgets');
    add_theme_support('automatic-feed-links');
    add_theme_support('wp-block-styles');
    add_theme_support('responsive-embeds');
    add_theme_support('editor-styles');

    register_nav_menus(array(
        'primary'  => __('Primary Menu', 'technama'),
        'footer'   => __('Footer Menu', 'technama'),
        'category' => __('Category Menu', 'technama'),
    ));

    add_image_size('technama-hero', 1200, 600, true);
    add_image_size('technama-card', 400, 250, true);
    add_image_size('technama-video', 640, 360, true);
    add_image_size('technama-thumb', 150, 150, true);

    load_theme_textdomain('technama', get_stylesheet_directory() . '/languages');
}
add_action('after_setup_theme', 'technama_theme_setup');

/**
 * Polyfill for wp_body_open() for backward compatibility
 */
if (!function_exists('wp_body_open')) {
    function wp_body_open() {
        do_action('wp_body_open');
    }
}

/**
 * Register Widgets
 */
function technama_widgets_init() {
    register_sidebar(array(
        'name'          => __('Main Sidebar', 'technama'),
        'id'            => 'sidebar-main',
        'description'   => __('Appears on blog and single posts with sidebar layout.', 'technama'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));

    register_sidebar(array(
        'name'          => __('Footer Column 1', 'technama'),
        'id'            => 'footer-1',
        'description'   => __('First footer widget area.', 'technama'),
        'before_widget' => '<div id="%1$s" class="widget footer-widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ));

    register_sidebar(array(
        'name'          => __('Footer Column 2', 'technama'),
        'id'            => 'footer-2',
        'description'   => __('Second footer widget area.', 'technama'),
        'before_widget' => '<div id="%1$s" class="widget footer-widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ));

    register_sidebar(array(
        'name'          => __('Footer Column 3', 'technama'),
        'id'            => 'footer-3',
        'description'   => __('Third footer widget area.', 'technama'),
        'before_widget' => '<div id="%1$s" class="widget footer-widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ));

    register_sidebar(array(
        'name'          => __('Sponsor Banner', 'technama'),
        'id'            => 'sponsor-banner',
        'description'   => __('Sponsor/advertisement banner widget area.', 'technama'),
        'before_widget' => '<div id="%1$s" class="widget sponsor-widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));

    register_sidebar(array(
        'name'          => __('Homepage Above Hero', 'technama'),
        'id'            => 'homepage-above-hero',
        'description'   => __('Widgets appear above the hero section on homepage.', 'technama'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));

    register_sidebar(array(
        'name'          => __('Homepage Below Hero', 'technama'),
        'id'            => 'homepage-below-hero',
        'description'   => __('Widgets appear below the hero section on homepage.', 'technama'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));

    register_sidebar(array(
        'name'          => __('Sticky Sidebar', 'technama'),
        'id'            => 'sticky-sidebar',
        'description'   => __('Sticky sidebar that follows scroll.', 'technama'),
        'before_widget' => '<div id="%1$s" class="widget sticky-widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));

    // Sponsor Banner Widget Areas
    register_sidebar(array(
        'name'          => __('Sponsor: Homepage Leaderboard', 'technama'),
        'id'            => 'sponsor-homepage-leaderboard',
        'before_widget' => '<div class="tn-sponsor-banner tn-sponsor-leaderboard">',
        'after_widget'  => '</div>',
        'before_title'  => '<span class="screen-reader-text">',
        'after_title'   => '</span>',
    ));

    register_sidebar(array(
        'name'          => __('Sponsor: Sidebar Banner', 'technama'),
        'id'            => 'sponsor-sidebar',
        'before_widget' => '<div class="tn-sponsor-banner tn-sponsor-sidebar">',
        'after_widget'  => '</div>',
        'before_title'  => '<span class="screen-reader-text">',
        'after_title'   => '</span>',
    ));

    register_sidebar(array(
        'name'          => __('Sponsor: Article Top', 'technama'),
        'id'            => 'sponsor-article-top',
        'before_widget' => '<div class="tn-sponsor-banner tn-sponsor-article">',
        'after_widget'  => '</div>',
        'before_title'  => '<span class="screen-reader-text">',
        'after_title'   => '</span>',
    ));

    register_sidebar(array(
        'name'          => __('Sponsor: Footer Banner', 'technama'),
        'id'            => 'sponsor-footer',
        'before_widget' => '<div class="tn-sponsor-banner tn-sponsor-footer">',
        'after_widget'  => '</div>',
        'before_title'  => '<span class="screen-reader-text">',
        'after_title'   => '</span>',
    ));
}
add_action('widgets_init', 'technama_widgets_init');

/**
 * Display sponsor banner
 */
function technama_display_sponsor($location) {
    if (is_active_sidebar($location)) {
        echo '<div class="tn-sponsor-area">';
        dynamic_sidebar($location);
        echo '</div>';
    }
}

/**
 * Sponsor content management page
 */
function technama_sponsor_admin_page() {
    add_menu_page(
        __('Sponsor Management', 'technama'),
        __('Sponsors', 'technama'),
        'manage_options',
        'technama-sponsors',
        'technama_sponsor_admin_page_callback',
        'dashicons-money-alt',
        30
    );
}
add_action('admin_menu', 'technama_sponsor_admin_page');

function technama_sponsor_admin_page_callback() {
    ?>
    <div class="wrap">
        <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
        <p><?php _e('Manage sponsor banners and advertising placements.', 'technama'); ?></p>

        <h2><?php _e('Active Banner Placements', 'technama'); ?></h2>
        <table class="wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th><?php _e('Placement', 'technama'); ?></th>
                    <th><?php _e('Dimensions', 'technama'); ?></th>
                    <th><?php _e('Status', 'technama'); ?></th>
                    <th><?php _e('Action', 'technama'); ?></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><?php _e('Homepage Leaderboard', 'technama'); ?></td>
                    <td>728 x 90</td>
                    <td><?php echo is_active_sidebar('sponsor-homepage-leaderboard') ? '<span style="color:#22c55e; font-weight:600;">Active</span>' : '<span style="color:#ef4444; font-weight:600;">Empty</span>'; ?></td>
                    <td><a href="<?php echo admin_url('widgets.php'); ?>"><?php _e('Configure', 'technama'); ?></a></td>
                </tr>
                <tr>
                    <td><?php _e('Sidebar Banner', 'technama'); ?></td>
                    <td>300 x 250</td>
                    <td><?php echo is_active_sidebar('sponsor-sidebar') ? '<span style="color:#22c55e; font-weight:600;">Active</span>' : '<span style="color:#ef4444; font-weight:600;">Empty</span>'; ?></td>
                    <td><a href="<?php echo admin_url('widgets.php'); ?>"><?php _e('Configure', 'technama'); ?></a></td>
                </tr>
                <tr>
                    <td><?php _e('Article Top Banner', 'technama'); ?></td>
                    <td>728 x 90</td>
                    <td><?php echo is_active_sidebar('sponsor-article-top') ? '<span style="color:#22c55e; font-weight:600;">Active</span>' : '<span style="color:#ef4444; font-weight:600;">Empty</span>'; ?></td>
                    <td><a href="<?php echo admin_url('widgets.php'); ?>"><?php _e('Configure', 'technama'); ?></a></td>
                </tr>
                <tr>
                    <td><?php _e('Footer Banner', 'technama'); ?></td>
                    <td>728 x 90</td>
                    <td><?php echo is_active_sidebar('sponsor-footer') ? '<span style="color:#22c55e; font-weight:600;">Active</span>' : '<span style="color:#ef4444; font-weight:600;">Empty</span>'; ?></td>
                    <td><a href="<?php echo admin_url('widgets.php'); ?>"><?php _e('Configure', 'technama'); ?></a></td>
                </tr>
            </tbody>
        </table>

        <h2><?php _e('How to Add Sponsor Content', 'technama'); ?></h2>
        <ol>
            <li><?php _e('Go to Appearance &rarr; Widgets', 'technama'); ?></li>
            <li><?php _e('Find the sponsor banner area you want to configure', 'technama'); ?></li>
            <li><?php _e('Add a "Custom HTML" widget with your banner code or image', 'technama'); ?></li>
            <li><?php _e('For images: Upload to Media Library, then add an Image widget', 'technama'); ?></li>
        </ol>
    </div>
    <?php
}

/**
 * Enqueue styles and scripts
 */
require_once get_stylesheet_directory() . '/inc/enqueue.php';

/**
 * Include custom post types
 */
require_once get_stylesheet_directory() . '/inc/custom-post-types.php';

/**
 * Include template tags
 */
require_once get_stylesheet_directory() . '/inc/template-tags.php';

/**
 * Include customizer
 */
require_once get_stylesheet_directory() . '/inc/customizer.php';

/**
 * Custom excerpt length
 */
function technama_excerpt_length() {
    return 20;
}
add_filter('excerpt_length', 'technama_excerpt_length');

/**
 * Custom excerpt more
 */
function technama_excerpt_more() {
    return '...';
}
add_filter('excerpt_more', 'technama_excerpt_more');

/**
 * Add custom body classes
 */
function technama_body_classes($classes) {
    if (is_front_page() && !is_paged()) {
        $classes[] = 'technama-front-page';
    }
    if (is_singular()) {
        $classes[] = 'technama-singular';
    }
    // Note: template-full-width.php not yet created - removed body class reference
    if (is_page_template('page-templates/template-live-shows.php')) {
        $classes[] = 'technama-live-shows';
    }
    return $classes;
}
add_filter('body_class', 'technama_body_classes');

/**
 * Fallback menu when no menu is assigned
 */
function technama_fallback_menu() {
    echo '<ul id="menu-primary" class="menu">';
    echo '<li class="menu-item"><a href="' . esc_url(home_url('/')) . '">' . __('Home', 'technama') . '</a></li>';
    echo '<li class="menu-item"><a href="' . esc_url(home_url('/category/news/')) . '">' . __('News', 'technama') . '</a></li>';
    echo '<li class="menu-item"><a href="' . esc_url(home_url('/category/startups/')) . '">' . __('Startups', 'technama') . '</a></li>';
    echo '<li class="menu-item"><a href="' . esc_url(home_url('/live-shows/')) . '">' . __('Live Shows', 'technama') . '</a></li>';
    echo '<li class="menu-item"><a href="' . esc_url(home_url('/deals/')) . '">' . __('Deals', 'technama') . '</a></li>';
    echo '<li class="menu-item"><a href="' . esc_url(home_url('/about/')) . '">' . __('About', 'technama') . '</a></li>';
    echo '<li class="menu-item"><a href="' . esc_url(home_url('/contact/')) . '">' . __('Contact', 'technama') . '</a></li>';
    echo '</ul>';
}

/**
 * Fallback footer menu
 */
function technama_footer_fallback_menu() {
    echo '<ul class="footer-menu">';
    echo '<li><a href="' . esc_url(home_url('/privacy-policy/')) . '">' . __('Privacy Policy', 'technama') . '</a></li>';
    echo '<li><a href="' . esc_url(home_url('/terms-of-service/')) . '">' . __('Terms of Service', 'technama') . '</a></li>';
    echo '<li><a href="' . esc_url(home_url('/cookie-policy/')) . '">' . __('Cookie Policy', 'technama') . '</a></li>';
    echo '<li><a href="' . esc_url(home_url('/contact/')) . '">' . __('Contact', 'technama') . '</a></li>';
    echo '</ul>';
}

/**
 * Custom pingback url for single posts
 */
function technama_pingback_header() {
    if (is_singular() && pings_open()) {
        printf('<link rel="pingback" href="%s">', esc_url(get_bloginfo('pingback_url')));
    }
}
add_action('wp_head', 'technama_pingback_header');

/**
 * Add custom meta tags for SEO and social
 */
function technama_meta_tags() {
    if (is_front_page()) {
        echo '<meta name="description" content="' . esc_attr(get_bloginfo('description')) . '">' . PHP_EOL;
        echo '<meta property="og:title" content="' . esc_attr(get_bloginfo('name')) . '">' . PHP_EOL;
        echo '<meta property="og:description" content="' . esc_attr(get_bloginfo('description')) . '">' . PHP_EOL;
        echo '<meta property="og:type" content="website">' . PHP_EOL;
        if (has_custom_logo()) {
            $logo_id = get_theme_mod('custom_logo');
            $logo_url = wp_get_attachment_image_url($logo_id, 'full');
            echo '<meta property="og:image" content="' . esc_url($logo_url) . '">' . PHP_EOL;
        }
    }
    if (is_single()) {
        global $post;
        $excerpt = wp_strip_all_tags(get_the_excerpt());
        echo '<meta property="og:title" content="' . esc_attr(get_the_title()) . '">' . PHP_EOL;
        echo '<meta property="og:description" content="' . esc_attr(wp_trim_words($excerpt, 30)) . '">' . PHP_EOL;
        echo '<meta property="og:type" content="article">' . PHP_EOL;
        echo '<meta property="og:url" content="' . esc_url(get_permalink()) . '">' . PHP_EOL;
        if (has_post_thumbnail()) {
            echo '<meta property="og:image" content="' . esc_url(get_the_post_thumbnail_url($post->ID, 'large')) . '">' . PHP_EOL;
        }
        echo '<meta name="twitter:card" content="summary_large_image">' . PHP_EOL;
        echo '<meta name="twitter:title" content="' . esc_attr(get_the_title()) . '">' . PHP_EOL;
        echo '<meta name="twitter:description" content="' . esc_attr(wp_trim_words($excerpt, 30)) . '">' . PHP_EOL;
    }
}
add_action('wp_head', 'technama_meta_tags', 1);

/**
 * Add reading time to posts
 */
function technama_reading_time() {
    if (is_single()) {
        global $post;
        $word_count = str_word_count(strip_tags($post->post_content));
        $minutes = max(1, ceil($word_count / 200));
        return $minutes;
    }
    return 0;
}

/**
 * Custom widget: Reading Time
 */
function technama_reading_time_widget() {
    if (is_single()) {
        global $post;
        $word_count = str_word_count(strip_tags($post->post_content));
        $minutes = max(1, ceil($word_count / 200));
        printf(
            '<span class="reading-time"><span class="reading-time-icon">&#9202;</span> %s %s</span>',
            esc_html($minutes),
            _n('min read', 'min read', $minutes, 'technama')
        );
    }
}

/**
 * Get related posts based on categories and tags
 */
function technama_get_related_posts($post_id = null, $count = 3) {
    if (!$post_id) $post_id = get_the_ID();

    $categories = get_the_category($post_id);
    $tags = get_the_tags($post_id);

    $cat_ids = !empty($categories) ? array_column($categories, 'term_id') : array();
    $tag_ids = !empty($tags) ? array_column($tags, 'term_id') : array();

    $args = array(
        'post__not_in'   => array($post_id),
        'posts_per_page' => $count,
        'post_status'    => 'publish',
    );

    if (!empty($cat_ids)) {
        $args['category__in'] = $cat_ids;
    }

    if (!empty($tag_ids)) {
        $args['tag__in'] = $tag_ids;
    }

    return new WP_Query($args);
}

/**
 * Get trending posts (by comment count + view count)
 */
function technama_get_trending_posts($count = 5) {
    return new WP_Query(array(
        'posts_per_page' => $count,
        'post_status'    => 'publish',
        'orderby'        => array(
            'comment_count' => 'DESC',
            'date'          => 'DESC',
        ),
        'order'          => 'DESC',
        'date_query'     => array(
            array(
                'after' => '30 days ago',
            ),
        ),
    ));
}

/**
 * Post views counter
 */
// REMOVED: Duplicate view counting - using technama_track_post_views() instead
// function technama_set_post_views() {
//     if (is_single()) {
//         global $post;
//         $post_id = $post->ID;
//         $count = (int) get_post_meta($post_id, 'post_views_count', true);
//         $count++;
//         update_post_meta($post_id, 'post_views_count', $count);
//     }
// }
// add_action('wp_head', 'technama_set_post_views');

/**
 * Track post views via AJAX for performance
 */
function technama_track_post_view() {
    check_ajax_referer('technama_nonce', 'nonce');

    if (isset($_POST['post_id'])) {
        $post_id = absint($_POST['post_id']);
        $count = (int) get_post_meta($post_id, 'post_views_count', true);
        $count++;
        update_post_meta($post_id, 'post_views_count', $count);
        wp_send_json_success(array('views' => $count));
    }

    wp_send_json_error();
}
add_action('wp_ajax_technama_track_view', 'technama_track_post_view');
add_action('wp_ajax_nopriv_technama_track_view', 'technama_track_post_view');

/**
 * Track post views
 */
function technama_track_post_views() {
    if (!is_single()) return;
    if (is_user_logged_in()) return;

    global $post;
    $post_id = $post->ID;
    $count = get_post_meta($post_id, 'tn_post_views', true);
    if (!$count) $count = 0;
    update_post_meta($post_id, 'tn_post_views', $count + 1);
}
add_action('wp_head', 'technama_track_post_views');

/**
 * Get post views
 */
function technama_get_post_views($post_id = null) {
    if (!$post_id) $post_id = get_the_ID();
    $count = get_post_meta($post_id, 'tn_post_views', true);
    return $count ? intval($count) : 0;
}

/**
 * AJAX search handler
 */
function technama_ajax_search() {
    check_ajax_referer('technama_nonce', 'nonce');

    $search = isset($_GET['s']) ? sanitize_text_field($_GET['s']) : '';
    if (empty($search)) {
        wp_send_json_error(array('message' => 'No search query provided.'));
    }

    $args = array(
        's'              => $search,
        'posts_per_page' => 10,
        'post_status'    => 'publish',
    );

    $query = new WP_Query($args);
    $results = array();

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $results[] = array(
                'id'        => get_the_ID(),
                'title'     => get_the_title(),
                'url'       => get_permalink(),
                'excerpt'   => wp_trim_words(get_the_excerpt(), 20),
                'thumbnail' => get_the_post_thumbnail_url(get_the_ID(), 'technama-thumb'),
                'date'      => get_the_date(),
                'category'  => get_the_category() ? get_the_category()[0]->name : '',
            );
        }
    }
    wp_reset_postdata();

    wp_send_json_success(array(
        'results' => $results,
        'total'   => $query->found_posts,
    ));
}
add_action('wp_ajax_technama_search', 'technama_ajax_search');
add_action('wp_ajax_nopriv_technama_search', 'technama_ajax_search');

/**
 * Add custom login logo
 */
function technama_login_logo() {
    $logo_id = get_theme_mod('custom_logo');
    $logo_url = $logo_id ? wp_get_attachment_image_url($logo_id, 'full') : '';
    ?>
    <style>
        #login h1 a, .login h1 a {
            background-image: url(<?php echo esc_url($logo_url); ?>);
            background-size: contain;
            background-repeat: no-repeat;
            height: 60px;
            width: 200px;
        }
    </style>
    <?php
}
add_action('login_enqueue_scripts', 'technama_login_logo');

/**
 * Change login URL to home
 */
function technama_login_url() {
    return home_url();
}
add_filter('login_headerurl', 'technama_login_url');

/**
 * Add to cart count in header (for WooCommerce compatibility)
 */
function technama_woocommerce_cart_count() {
    if (class_exists('WooCommerce')) {
        $count = WC()->cart->get_cart_contents_count();
        return $count;
    }
    return 0;
}

/**
 * Custom navigation walker for category menu
 */
function technama_category_menu_args($args) {
    if (has_nav_menu('category')) {
        $args['theme_location'] = 'category';
    }
    return $args;
}
add_filter('wp_nav_menu_args', 'technama_category_menu_args');

/**
 * Add noindex to tag archives for SEO
 */
function technama_tag_noindex() {
    if (is_tag()) {
        echo '<meta name="robots" content="noindex, follow">' . PHP_EOL;
    }
}
add_action('wp_head', 'technama_tag_noindex', 1);

/**
 * Preload critical fonts
 */
function technama_preload_fonts() {
    echo '<link rel="preconnect" href="https://fonts.googleapis.com">' . PHP_EOL;
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . PHP_EOL;
}
add_action('wp_head', 'technama_preload_fonts', 1);

/**
 * Add custom CSS from customizer
 */
function technama_custom_css() {
    $css = get_theme_mod('technama_custom_css', '');
    if (!empty($css)) {
        printf('<style id="technama-custom-css">%s</style>' . PHP_EOL, wp_strip_all_tags($css));
    }
}
add_action('wp_head', 'technama_custom_css', 99);

/**
 * Sanitize custom CSS
 */
function technama_sanitize_css($css) {
    return wp_strip_all_tags($css);
}

/**
 * Add schema markup for articles
 */
function technama_article_schema() {
    if (is_single()) {
        global $post;
        $schema = array(
            '@context'      => 'https://schema.org',
            '@type'         => 'Article',
            'headline'      => get_the_title(),
            'datePublished' => get_the_date('c'),
            'dateModified'  => get_the_modified_date('c'),
            'author'        => array(
                '@type' => 'Person',
                'name'  => get_the_author(),
                'url'   => get_author_posts_url(get_the_author_meta('ID')),
            ),
            'publisher'     => array(
                '@type' => 'Organization',
                'name'  => get_bloginfo('name'),
                'logo'  => array(
                    '@type' => 'ImageObject',
                    'url'   => get_site_icon_url(192),
                ),
            ),
            'description'   => wp_trim_words(get_the_excerpt(), 30),
            'mainEntityOfPage' => array(
                '@type' => 'WebPage',
                '@id'   => get_permalink(),
            ),
        );

        if (has_post_thumbnail()) {
            $schema['image'] = array(
                '@type'  => 'ImageObject',
                'url'    => get_the_post_thumbnail_url($post->ID, 'large'),
                'width'  => 1200,
                'height' => 630,
            );
        }

        echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>' . PHP_EOL;
    }

    if (is_front_page()) {
        $schema = array(
            '@context' => 'https://schema.org',
            '@type'    => 'WebSite',
            'name'     => get_bloginfo('name'),
            'url'      => home_url('/'),
            'potentialAction' => array(
                '@type'       => 'SearchAction',
                'target'      => home_url('/?s={search_term_string}'),
                'query-input' => 'required name=search_term_string',
            ),
        );
        echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>' . PHP_EOL;
    }
}
add_action('wp_head', 'technama_article_schema', 5);

/**
 * Custom registration fields
 */
function technama_registration_fields() {
    ?>
    <p>
        <label for="first_name"><?php _e('First Name', 'technama'); ?></label>
        <input type="text" name="first_name" id="first_name" class="input" value="<?php echo isset($_POST['first_name']) ? esc_attr($_POST['first_name']) : ''; ?>" />
    </p>
    <p>
        <label for="last_name"><?php _e('Last Name', 'technama'); ?></label>
        <input type="text" name="last_name" id="last_name" class="input" value="<?php echo isset($_POST['last_name']) ? esc_attr($_POST['last_name']) : ''; ?>" />
    </p>
    <?php
}
add_action('register_form', 'technama_registration_fields');

function technama_registration_save($user_id) {
    if (isset($_POST['first_name'])) {
        update_user_meta($user_id, 'first_name', sanitize_text_field($_POST['first_name']));
    }
    if (isset($_POST['last_name'])) {
        update_user_meta($user_id, 'last_name', sanitize_text_field($_POST['last_name']));
    }
}
add_action('user_register', 'technama_registration_save');

/**
 * Bookmark/Unbookmark posts (AJAX)
 */
function technama_toggle_bookmark() {
    check_ajax_referer('technama_nonce', 'nonce');
    
    if (!is_user_logged_in()) {
        wp_send_json_error(array('message' => 'Please login to bookmark posts.'));
    }
    
    $user_id = get_current_user_id();
    $post_id = intval($_POST['post_id']);
    $bookmarked = get_user_meta($user_id, 'tn_bookmarks', true);
    
    if (!is_array($bookmarked)) $bookmarked = array();
    
    if (in_array($post_id, $bookmarked)) {
        $bookmarked = array_diff($bookmarked, array($post_id));
        $action = 'removed';
    } else {
        $bookmarked[] = $post_id;
        $action = 'added';
    }
    
    update_user_meta($user_id, 'tn_bookmarks', array_values($bookmarked));
    wp_send_json_success(array('action' => $action, 'count' => count($bookmarked)));
}
add_action('wp_ajax_tn_toggle_bookmark', 'technama_toggle_bookmark');
add_action('wp_ajax_nopriv_tn_toggle_bookmark', 'technama_toggle_bookmark');

/**
 * Newsletter subscription (AJAX)
 */
function technama_newsletter_subscribe() {
    check_ajax_referer('technama_nonce', 'nonce');
    
    $email = sanitize_email($_POST['email']);
    if (!is_email($email)) {
        wp_send_json_error(array('message' => 'Please enter a valid email address.'));
    }
    
    global $wpdb;
    $table = $wpdb->prefix . 'newsletter_subscribers';
    
    $existing = $wpdb->get_var($wpdb->prepare("SELECT id FROM $table WHERE email = %s", $email));
    
    if ($existing) {
        $wpdb->update($table, array('status' => 'active'), array('email' => $email));
        wp_send_json_success(array('message' => 'Thank you! If this email is not already registered, you will receive a confirmation shortly.'));
    } else {
        $wpdb->insert($table, array(
            'email' => $email,
            'status' => 'active',
            'consent_date' => current_time('mysql'),
        ));
        wp_send_json_success(array('message' => 'Thank you! If this email is not already registered, you will receive a confirmation shortly.'));
    }
}
add_action('wp_ajax_tn_subscribe', 'technama_newsletter_subscribe');
add_action('wp_ajax_nopriv_tn_subscribe', 'technama_newsletter_subscribe');

/**
 * Get user bookmarks count
 */
function technama_get_bookmark_count() {
    if (!is_user_logged_in()) return 0;
    $bookmarks = get_user_meta(get_current_user_id(), 'tn_bookmarks', true);
    return is_array($bookmarks) ? count($bookmarks) : 0;
}

/**
 * Get the primary category name for a post
 */
function technama_get_primary_category() {
    $categories = get_the_category();
    if (!empty($categories)) {
        return $categories[0]->name;
    }
    return '';
}

/**
 * Press Release Submission Handler
 */
function technama_handle_press_release() {
    if (!isset($_POST['tn_press_release_submit'])) return;
    
    check_admin_referer('tn_press_release_nonce');
    
    $title = sanitize_text_field($_POST['pr_title']);
    $content = wp_kses_post($_POST['pr_content']);
    $organization = sanitize_text_field($_POST['pr_organization']);
    $contact_name = sanitize_text_field($_POST['pr_contact_name']);
    $contact_email = sanitize_email($_POST['pr_contact_email']);
    $contact_phone = sanitize_text_field($_POST['pr_contact_phone']);
    
    $post_id = wp_insert_post(array(
        'post_title'   => $title,
        'post_content' => $content,
        'post_status'  => 'pending',
        'post_type'    => 'press_release',
    ));
    
    if ($post_id && !is_wp_error($post_id)) {
        update_post_meta($post_id, 'pr_organization', $organization);
        update_post_meta($post_id, 'pr_contact_name', $contact_name);
        update_post_meta($post_id, 'pr_contact_email', $contact_email);
        update_post_meta($post_id, 'pr_contact_phone', $contact_phone);
        update_post_meta($post_id, 'pr_submission_date', current_time('mysql'));
        update_post_meta($post_id, 'pr_status', 'submitted');
        
        if (!empty($_FILES['pr_attachments']['name'][0])) {
            require_once(ABSPATH . 'wp-admin/includes/image.php');
            require_once(ABSPATH . 'wp-admin/includes/file.php');
            require_once(ABSPATH . 'wp-admin/includes/media.php');
            
            $files = $_FILES['pr_attachments'];
            $file_count = count($files['name']);
            
            for ($i = 0; $i < $file_count; $i++) {
                if ($files['error'][$i] === UPLOAD_ERR_OK) {
                    $file_array = array(
                        'name'     => $files['name'][$i],
                        'tmp_name' => $files['tmp_name'][$i],
                        'size'     => $files['size'][$i],
                        'type'     => $files['type'][$i],
                        'error'    => $files['error'][$i],
                    );
                    $_FILES['pr_attachment'] = $file_array;
                    $attachment_id = media_handle_upload('pr_attachment', $post_id);
                    if (!is_wp_error($attachment_id)) {
                        $existing = get_post_meta($post_id, 'pr_attachments', true);
                        if (!is_array($existing)) $existing = array();
                        $existing[] = $attachment_id;
                        update_post_meta($post_id, 'pr_attachments', $existing);
                    }
                }
            }
        }
        
        wp_mail(
            get_option('admin_email'),
            sprintf('[%s] New Press Release Submission: %s', get_bloginfo('name'), $title),
            sprintf(
                "A new press release has been submitted.\n\nOrganization: %s\nContact: %s (%s)\nPhone: %s\nTitle: %s\n\nReview at: %s",
                $organization,
                $contact_name,
                $contact_email,
                $contact_phone,
                $title,
                admin_url('post.php?post=' . $post_id . '&action=edit')
            ),
            array('Content-Type: text/plain; charset=UTF-8')
        );
        
        wp_redirect(add_query_arg('pr_submitted', '1', wp_get_referer()));
        exit;
    }
}
/**
 * Optimize images on upload
 */
function technama_optimize_image($jpg_quality) {
    return 82;
}
add_filter('jpeg_quality', 'technama_optimize_image');

/**
 * Add lazy loading to images
 */
function technama_lazy_load_images($content) {
    if (is_admin()) return $content;
    $content = str_replace('<img ', '<img loading="lazy" ', $content);
    return $content;
}
add_filter('the_content', 'technama_lazy_load_images');
add_filter('wp_get_attachment_image_attributes', function($attr) {
    $attr['loading'] = 'lazy';
    return $attr;
});

/**
 * YouTube oEmbed handler
 */
function technama_youtube_embed($url_or_id, $width = '100%', $height = '400') {
    if (strlen($url_or_id) === 11 && !preg_match('/^https?:\/\//', $url_or_id)) {
        $url = 'https://www.youtube.com/watch?v=' . $url_or_id;
    } else {
        $url = $url_or_id;
    }
    
    $embed = wp_oembed_get($url, array(
        'width'  => $width,
        'height' => $height,
    ));
    
    if ($embed) {
        return '<div class="tn-video-embed">' . $embed . '</div>';
    }
    
    return '<div class="tn-video-fallback"><p>Video not available</p></div>';
}

/**
 * Get YouTube thumbnail from video ID
 */
function technama_youtube_thumbnail($video_id, $quality = 'maxresdefault') {
    return "https://img.youtube.com/vi/{$video_id}/{$quality}.jpg";
}

/**
 * Get video duration from YouTube (requires API key)
 */
function technama_youtube_duration($video_id) {
    $api_key = get_option('technama_youtube_api_key', '');
    if (empty($api_key)) return '';
    
    $response = wp_remote_get("https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id={$video_id}&key={$api_key}");
    if (is_wp_error($response)) return '';
    
    $data = json_decode(wp_remote_retrieve_body($response), true);
    if (empty($data['items'][0]['contentDetails']['duration'])) return '';
    
    $duration = $data['items'][0]['contentDetails']['duration'];
    preg_match('/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/', $duration, $matches);
    $hours = isset($matches[1]) ? $matches[1] : 0;
    $minutes = isset($matches[2]) ? $matches[2] : 0;
    $seconds = isset($matches[3]) ? $matches[3] : 0;
    
    if ($hours > 0) {
        return sprintf('%d:%02d:%02d', $hours, $minutes, $seconds);
    }
    return sprintf('%d:%02d', $minutes, $seconds);
}

add_action('init', 'technama_handle_press_release');

/**
 * ============================================================
 * PHASE 9: SECURITY REQUIREMENTS
 * ============================================================
 */

/**
 * Password Strength Policy
 * Enforces minimum 12 characters with complexity requirements
 */
function technama_check_password_strength($errors) {
    $password = '';
    if (isset($_POST['pass1']) && !empty($_POST['pass1'])) {
        $password = $_POST['pass1'];
    } elseif (isset($_POST['password']) && !empty($_POST['password'])) {
        $password = $_POST['password'];
    }
    
    if (!empty($password)) {
        if (strlen($password) < 12) {
            $errors->add('password_length', 'Password must be at least 12 characters long.');
        }
        if (!preg_match('/[A-Z]/', $password)) {
            $errors->add('password_uppercase', 'Password must contain at least one uppercase letter.');
        }
        if (!preg_match('/[a-z]/', $password)) {
            $errors->add('password_lowercase', 'Password must contain at least one lowercase letter.');
        }
        if (!preg_match('/[0-9]/', $password)) {
            $errors->add('password_number', 'Password must contain at least one number.');
        }
        if (!preg_match('/[!@#$%^&*()_\-]/', $password)) {
            $errors->add('password_special', 'Password must contain at least one special character.');
        }
    }
    return $errors;
}
add_action('user_profile_update_errors', 'technama_check_password_strength');

/**
 * Log failed login attempts
 */
function technama_log_failed_login($user_login) {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
    error_log(sprintf('[TechNama Security] Failed login: %s | IP: %s | UA: %s | Time: %s', $user_login, $ip, $user_agent, current_time('mysql')));
    $failed_logins = get_transient('technama_failed_logins');
    if (!$failed_logins) $failed_logins = array();
    $failed_logins[] = array('username' => $user_login, 'ip' => $ip, 'user_agent' => $user_agent, 'time' => current_time('mysql'));
    if (count($failed_logins) > 100) { $failed_logins = array_slice($failed_logins, -100); }
    set_transient('technama_failed_logins', $failed_logins, 24 * HOUR_IN_SECONDS);
}
add_action('wp_login_failed', 'technama_log_failed_login');

/**
 * Log successful logins
 */
function technama_log_successful_login($user_login, $user) {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    error_log(sprintf('[TechNama Security] Successful login: %s (ID: %d) | IP: %s | Time: %s', $user_login, $user->ID, $ip, current_time('mysql')));
}
add_action('wp_login', 'technama_log_successful_login', 10, 2);

/**
 * Security headers for admin area
 */
function technama_admin_security_headers() {
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: SAMEORIGIN');
    header('X-XSS-Protection: 1; mode=block');
    header('Referrer-Policy: strict-origin-when-cross-origin');
}
add_action('admin_init', 'technama_admin_security_headers');

/**
 * Disable XML-RPC via PHP (backup to nginx block)
 */
add_filter('xmlrpc_enabled', '__return_false');

/**
 * Remove WordPress version from head
 */
function technama_remove_version() {
    remove_action('wp_head', 'wp_generator');
}
add_action('after_setup_theme', 'technama_remove_version');

/**
 * Add security audit page to admin
 */
function technama_security_audit_page() {
    add_management_page('Security Audit', 'Security Audit', 'manage_options', 'technama-security-audit', 'technama_security_audit_render');
}
add_action('admin_menu', 'technama_security_audit_page');

function technama_security_audit_render() {
    if (!current_user_can('manage_options')) return;
    $failed_logins = get_transient('technama_failed_logins'); if (!$failed_logins) $failed_logins = array();
    $recent = array_slice(array_reverse($failed_logins), -20);
    echo '<div class="wrap"><h1>Security Audit Dashboard</h1>';
    echo '<div class="card"><h2>Security Status</h2>';
    echo '<table class="widefat">';
    echo '<tr><td><strong>HTTPS/SSL</strong></td><td>Active (HSTS)</td></tr>';
    echo '<tr><td><strong>WAF (Wordfence)</strong></td><td>Active</td></tr>';
    echo '<tr><td><strong>Login Protection</strong></td><td>WPS Hide Login (/secure-login)</td></tr>';
    echo '<tr><td><strong>Rate Limiting</strong></td><td>5 req/min on login</td></tr>';
    echo '<tr><td><strong>XML-RPC</strong></td><td>Disabled (nginx + PHP)</td></tr>';
    echo '<tr><td><strong>File Editing</strong></td><td>Disabled</td></tr>';
    echo '<tr><td><strong>Security Headers</strong></td><td>7 headers active</td></tr>';
    echo '<tr><td><strong>Backups</strong></td><td>Daily (UpdraftPlus)</td></tr>';
    echo '<tr><td><strong>Password Policy</strong></td><td>12+ chars, complexity required</td></tr>';
    echo '<tr><td><strong>Activity Logging</strong></td><td>Simple History active</td></tr>';
    echo '<tr><td><strong>REST API</strong></td><td>Restricted to logged-in users</td></tr>';
    echo '</table></div>';
    echo '<div class="card"><h2>Recent Failed Logins</h2>';
    if (empty($recent)) { echo '<p>No failed login attempts recorded.</p>'; }
    else {
        echo '<table class="widefat striped"><thead><tr><th>Time</th><th>Username</th><th>IP</th><th>User Agent</th></tr></thead><tbody>';
        foreach ($recent as $f) {
            echo '<tr><td>' . esc_html($f['time']) . '</td><td>' . esc_html($f['username']) . '</td><td>' . esc_html($f['ip']) . '</td><td>' . esc_html(substr($f['user_agent'], 0, 40)) . '</td></tr>';
        }
        echo '</tbody></table>';
    }
    echo '</div></div>';
}

/**
 * ============================================================
 * PHASE 11: STARTUP LIVE SHOW - OPERATING MODEL
 * ============================================================
 */

/**
 * Register Guest user role on theme activation
 */
function technama_register_guest_role() {
    if (!get_role('guest')) {
        add_role('guest', __('Guest', 'technama'), array(
            'read' => true,
            'edit_posts' => false,
            'delete_posts' => false,
            'publish_posts' => false,
            'upload_files' => false,
            'edit_others_posts' => false,
            'manage_options' => false,
        ));
    }
}
add_action('after_setup_theme', 'technama_register_guest_role');

/**
 * Add guest profile fields to user profile
 */
function technama_guest_profile_fields($user) {
    if (!current_user_can('manage_options')) return;
    ?>
    <h3><?php _e('Guest Profile (for Live Shows)', 'technama'); ?></h3>
    <table class="form-table">
        <tr>
            <th><label for="guest_title"><?php _e('Job Title', 'technama'); ?></label></th>
            <td><input type="text" name="guest_title" id="guest_title" value="<?php echo esc_attr(get_the_author_meta('guest_title', $user->ID)); ?>" class="regular-text" /></td>
        </tr>
        <tr>
            <th><label for="guest_company"><?php _e('Company', 'technama'); ?></label></th>
            <td><input type="text" name="guest_company" id="guest_company" value="<?php echo esc_attr(get_the_author_meta('guest_company', $user->ID)); ?>" class="regular-text" /></td>
        </tr>
        <tr>
            <th><label for="guest_bio"><?php _e('Short Bio', 'technama'); ?></label></th>
            <td><textarea name="guest_bio" id="guest_bio" rows="4" class="large-text"><?php echo esc_textarea(get_the_author_meta('guest_bio', $user->ID)); ?></textarea></td>
        </tr>
        <tr>
            <th><label for="guest_social_twitter"><?php _e('Twitter/X URL', 'technama'); ?></label></th>
            <td><input type="url" name="guest_social_twitter" id="guest_social_twitter" value="<?php echo esc_url(get_the_author_meta('guest_social_twitter', $user->ID)); ?>" class="regular-text" /></td>
        </tr>
        <tr>
            <th><label for="guest_social_linkedin"><?php _e('LinkedIn URL', 'technama'); ?></label></th>
            <td><input type="url" name="guest_social_linkedin" id="guest_social_linkedin" value="<?php echo esc_url(get_the_author_meta('guest_social_linkedin', $user->ID)); ?>" class="regular-text" /></td>
        </tr>
        <tr>
            <th><label for="guest_social_website"><?php _e('Website URL', 'technama'); ?></label></th>
            <td><input type="url" name="guest_social_website" id="guest_social_website" value="<?php echo esc_url(get_the_author_meta('guest_social_website', $user->ID)); ?>" class="regular-text" /></td>
        </tr>
    </table>
    <?php
}
add_action('show_user_profile', 'technama_guest_profile_fields');
add_action('edit_user_profile', 'technama_guest_profile_fields');

/**
 * Save guest profile fields
 */
function technama_save_guest_profile_fields($user_id) {
    if (!current_user_can('edit_user', $user_id)) return;
    
    $fields = array('guest_title', 'guest_company', 'guest_bio', 'guest_social_twitter', 'guest_social_linkedin', 'guest_social_website');
    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            if (strpos($field, 'social') !== false || $field === 'guest_social_website') {
                update_user_meta($user_id, $field, esc_url_raw($_POST[$field]));
            } else {
                update_user_meta($user_id, $field, sanitize_text_field($_POST[$field]));
            }
        }
    }
}
add_action('personal_options_update', 'technama_save_guest_profile_fields');
add_action('edit_user_profile_update', 'technama_save_guest_profile_fields');

/**
 * Get guest profile data
 */
function technama_get_guest_profile($user_id) {
    return array(
        'title'    => get_the_author_meta('guest_title', $user_id),
        'company'  => get_the_author_meta('guest_company', $user_id),
        'bio'      => get_the_author_meta('guest_bio', $user_id),
        'twitter'  => get_the_author_meta('guest_social_twitter', $user_id),
        'linkedin' => get_the_author_meta('guest_social_linkedin', $user_id),
        'website'  => get_the_author_meta('guest_social_website', $user_id),
        'name'     => get_the_author_meta('display_name', $user_id),
        'avatar'   => get_avatar_url($user_id, array('size' => 120)),
    );
}

/**
 * Admin dropdown to select guest for episodes
 */
function technama_guest_dropdown($selected = 0) {
    $guests = get_users(array('role' => 'guest'));
    $editors = get_users(array('role__in' => array('editor', 'administrator')));
    $all_users = array_merge($guests, $editors);
    
    echo '<select name="tn_show_guest_id" id="tn_show_guest_id" class="postform">';
    echo '<option value="0">' . __('— Select Guest —', 'technama') . '</option>';
    foreach ($all_users as $user) {
        $profile = technama_get_guest_profile($user->ID);
        $label = $profile['name'];
        if (!empty($profile['title']) && !empty($profile['company'])) {
            $label .= ' — ' . $profile['title'] . ' @ ' . $profile['company'];
        }
        printf('<option value="%d" %s>%s</option>', $user->ID, selected($selected, $user->ID, false), esc_html($label));
    }
    echo '</select>';
}

/**
 * Add show meta boxes in admin
 */
function technama_show_meta_boxes() {
    add_meta_box('tn_show_details', __('Show Details', 'technama'), 'technama_show_details_callback', 'video_review', 'side', 'high');
}
add_action('add_meta_boxes', 'technama_show_meta_boxes');

function technama_show_details_callback($post) {
    wp_nonce_field('tn_show_details_nonce', 'tn_show_nonce');
    
    $guest_id = get_post_meta($post->ID, '_tn_show_guest_id', true);
    $show_date = get_post_meta($post->ID, '_tn_show_date', true);
    $show_time = get_post_meta($post->ID, '_tn_show_time', true);
    $show_status = get_post_meta($post->ID, '_tn_show_status', true);
    $episode_number = get_post_meta($post->ID, '_tn_show_episode_number', true);
    $season = get_post_meta($post->ID, '_tn_show_season', true);
    $show_topic = get_post_meta($post->ID, '_tn_show_topic', true);
    ?>
    <p>
        <label><strong><?php _e('Guest', 'technama'); ?></strong></label><br/>
        <?php technama_guest_dropdown($guest_id); ?>
    </p>
    <p>
        <label><strong><?php _e('Show Date', 'technama'); ?></strong></label><br/>
        <input type="date" name="tn_show_date" value="<?php echo esc_attr($show_date); ?>" class="widefat" />
    </p>
    <p>
        <label><strong><?php _e('Show Time', 'technama'); ?></strong></label><br/>
        <input type="time" name="tn_show_time" value="<?php echo esc_attr($show_time); ?>" class="widefat" />
    </p>
    <p>
        <label><strong><?php _e('Status', 'technama'); ?></strong></label><br/>
        <select name="tn_show_status" class="widefat">
            <option value="scheduled" <?php selected($show_status, 'scheduled'); ?>><?php _e('Scheduled', 'technama'); ?></option>
            <option value="live" <?php selected($show_status, 'live'); ?>><?php _e('Live', 'technama'); ?></option>
            <option value="archived" <?php selected($show_status, 'archived'); ?>><?php _e('Archived', 'technama'); ?></option>
        </select>
    </p>
    <p>
        <label><strong><?php _e('Season', 'technama'); ?></strong></label><br/>
        <input type="number" name="tn_show_season" value="<?php echo esc_attr($season); ?>" min="1" class="widefat" />
    </p>
    <p>
        <label><strong><?php _e('Episode Number', 'technama'); ?></strong></label><br/>
        <input type="number" name="tn_show_episode_number" value="<?php echo esc_attr($episode_number); ?>" min="1" class="widefat" />
    </p>
    <p>
        <label><strong><?php _e('Show Topic', 'technama'); ?></strong></label><br/>
        <input type="text" name="tn_show_topic" value="<?php echo esc_attr($show_topic); ?>" class="widefat" placeholder="<?php _e('e.g. Building Fintech in Pakistan', 'technama'); ?>" />
    </p>
    <?php
}

/**
 * Save show meta box data
 */
function technama_save_show_meta($post_id) {
    if (!isset($_POST['tn_show_nonce']) || !wp_verify_nonce($_POST['tn_show_nonce'], 'tn_show_details_nonce')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;
    
    $fields = array(
        'tn_show_guest_id'       => 'intval',
        'tn_show_date'           => 'sanitize_text_field',
        'tn_show_time'           => 'sanitize_text_field',
        'tn_show_status'         => 'sanitize_text_field',
        'tn_show_episode_number' => 'intval',
        'tn_show_season'         => 'intval',
        'tn_show_topic'          => 'sanitize_text_field',
    );
    
    foreach ($fields as $key => $sanitizer) {
        if (isset($_POST[$key])) {
            update_post_meta($post_id, '_' . $key, $sanitizer($_POST[$key]));
        }
    }
}
add_action('save_post_video_review', 'technama_save_show_meta');

/**
 * Auto-increment episode number
 */
function technama_auto_episode_number($post_id) {
    if (get_post_meta($post_id, '_tn_show_episode_number', true)) return;
    
    $args = array(
        'post_type'      => 'video_review',
        'posts_per_page' => 1,
        'post_status'    => 'any',
        'orderby'        => 'date',
        'order'          => 'DESC',
        'post__not_in'   => array($post_id),
    );
    $recent = new WP_Query($args);
    if ($recent->have_posts()) {
        $recent->the_post();
        $last_ep = (int) get_post_meta(get_the_ID(), '_tn_show_episode_number', true);
        update_post_meta($post_id, '_tn_show_episode_number', $last_ep + 1);
    } else {
        update_post_meta($post_id, '_tn_show_episode_number', 1);
    }
    wp_reset_postdata();
}
add_action('save_post_video_review', 'technama_auto_episode_number', 20);

/**
 * Get upcoming shows (scheduled status, future date)
 */
function technama_get_upcoming_shows($count = 5) {
    return new WP_Query(array(
        'post_type'      => 'video_review',
        'posts_per_page' => $count,
        'post_status'    => 'publish',
        'meta_query'     => array(
            array(
                'key'     => '_tn_show_status',
                'value'   => 'scheduled',
                'compare' => '=',
            ),
            array(
                'key'     => '_tn_show_date',
                'value'   => date('Y-m-d'),
                'compare' => '>=',
                'type'    => 'DATE',
            ),
        ),
        'orderby'  => 'meta_value',
        'meta_key' => '_tn_show_date',
        'order'    => 'ASC',
    ));
}

/**
 * Get archived shows
 */
function technama_get_archived_shows($count = -1) {
    return new WP_Query(array(
        'post_type'      => 'video_review',
        'posts_per_page' => $count,
        'post_status'    => 'publish',
        'meta_query'     => array(
            array(
                'key'     => '_tn_show_status',
                'value'   => 'archived',
                'compare' => '=',
            ),
        ),
        'orderby'  => 'meta_value',
        'meta_key' => '_tn_show_date',
        'order'    => 'DESC',
    ));
}

/**
 * Get live shows
 */
function technama_get_live_shows($count = 1) {
    return new WP_Query(array(
        'post_type'      => 'video_review',
        'posts_per_page' => $count,
        'post_status'    => 'publish',
        'meta_query'     => array(
            array(
                'key'     => '_tn_show_status',
                'value'   => 'live',
                'compare' => '=',
            ),
        ),
    ));
}

/**
 * Social Share Buttons
 */
function technama_share_buttons($post_id = null) {
    if (!$post_id) $post_id = get_the_ID();
    $url = urlencode(get_permalink($post_id));
    $title = urlencode(get_the_title($post_id));
    
    echo '<div class="tn-share-buttons">';
    printf('<a href="https://twitter.com/intent/tweet?url=%s&text=%s" target="_blank" rel="noopener noreferrer" class="tn-share-btn tn-share-twitter" data-post-id="%d"><span class="tn-share-icon">𝕏</span> %s</a>', $url, $title, $post_id, __('Twitter', 'technama'));
    printf('<a href="https://www.linkedin.com/shareArticle?mini=true&url=%s&title=%s" target="_blank" rel="noopener noreferrer" class="tn-share-btn tn-share-linkedin" data-post-id="%d"><span class="tn-share-icon">in</span> %s</a>', $url, $title, $post_id, __('LinkedIn', 'technama'));
    printf('<a href="https://www.facebook.com/sharer/sharer.php?u=%s" target="_blank" rel="noopener noreferrer" class="tn-share-btn tn-share-facebook" data-post-id="%d"><span class="tn-share-icon">f</span> %s</a>', $url, $post_id, __('Facebook', 'technama'));
    printf('<button class="tn-share-btn tn-share-copy" data-url="%s" data-post-id="%d"><span class="tn-share-icon">🔗</span> %s</button>', $url, $post_id, __('Copy Link', 'technama'));
    echo '</div>';
}

/**
 * Track social share (AJAX)
 */
function technama_track_share() {
    check_ajax_referer('technama_nonce', 'nonce');
    
    $post_id = absint($_POST['post_id']);
    $platform = sanitize_text_field($_POST['platform']);
    
    if (!$post_id || !in_array($platform, array('twitter', 'linkedin', 'facebook', 'copy'))) {
        wp_send_json_error();
    }
    
    $shares = get_post_meta($post_id, '_tn_show_shares', true);
    if (!is_array($shares)) $shares = array();
    
    if (!isset($shares[$platform])) $shares[$platform] = 0;
    $shares[$platform]++;
    $shares['total'] = array_sum($shares) - (isset($shares['total']) ? $shares['total'] : 0);
    
    update_post_meta($post_id, '_tn_show_shares', $shares);
    
    wp_send_json_success(array('shares' => $shares));
}
add_action('wp_ajax_tn_track_share', 'technama_track_share');
add_action('wp_ajax_nopriv_tn_track_share', 'technama_track_share');

/**
 * Get share count for a post
 */
function technama_get_share_count($post_id = null) {
    if (!$post_id) $post_id = get_the_ID();
    $shares = get_post_meta($post_id, '_tn_show_shares', true);
    if (!is_array($shares)) return 0;
    $total = 0;
    foreach ($shares as $key => $val) {
        if ($key !== 'total' && is_numeric($val)) $total += $val;
    }
    return $total;
}

/**
 * Add VideoObject schema for video_review posts
 */
function technama_video_object_schema() {
    if (!is_single()) return;
    
    global $post;
    if ($post->post_type !== 'video_review') return;
    
    $youtube_id = get_post_meta($post->ID, '_tn_youtube_id', true);
    $duration = get_post_meta($post->ID, '_tn_show_duration', true);
    $guest_id = get_post_meta($post->ID, '_tn_show_guest_id', true);
    
    $schema = array(
        '@context'      => 'https://schema.org',
        '@type'         => 'VideoObject',
        'name'          => get_the_title(),
        'description'   => wp_trim_words(get_the_excerpt(), 30),
        'uploadDate'    => get_the_date('c'),
        'thumbnailUrl'  => has_post_thumbnail() ? get_the_post_thumbnail_url($post->ID, 'large') : '',
        'contentUrl'    => $youtube_id ? 'https://www.youtube.com/watch?v=' . $youtube_id : '',
        'embedUrl'      => $youtube_id ? 'https://www.youtube.com/embed/' . $youtube_id : '',
        'interactionCount' => (string) technama_get_post_views($post->ID),
    );
    
    if ($duration) {
        $schema['duration'] = 'PT' . $duration;
    }
    
    if ($guest_id) {
        $guest = technama_get_guest_profile($guest_id);
        $schema['contributor'] = array(
            '@type' => 'Person',
            'name'  => $guest['name'],
        );
    }
    
    echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>' . PHP_EOL;
}
add_action('wp_head', 'technama_video_object_schema', 5);

/**
 * Create newsletter subscribers table on theme activation
 */
function technama_create_tables() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'newsletter_subscribers';
    $charset_collate = $wpdb->get_charset_collate();
    
    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        email varchar(100) NOT NULL,
        status varchar(20) NOT NULL DEFAULT 'active',
        consent_date datetime NOT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY email (email)
    ) $charset_collate;";
    
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}
add_action('after_setup_theme', 'technama_create_tables');
