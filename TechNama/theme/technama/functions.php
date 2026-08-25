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
                    <td><?php echo is_active_sidebar('sponsor-homepage-leaderboard') ? '<span style="color:green">Active</span>' : '<span style="color:red">Empty</span>'; ?></td>
                    <td><a href="<?php echo admin_url('widgets.php'); ?>"><?php _e('Configure', 'technama'); ?></a></td>
                </tr>
                <tr>
                    <td><?php _e('Sidebar Banner', 'technama'); ?></td>
                    <td>300 x 250</td>
                    <td><?php echo is_active_sidebar('sponsor-sidebar') ? '<span style="color:green">Active</span>' : '<span style="color:red">Empty</span>'; ?></td>
                    <td><a href="<?php echo admin_url('widgets.php'); ?>"><?php _e('Configure', 'technama'); ?></a></td>
                </tr>
                <tr>
                    <td><?php _e('Article Top Banner', 'technama'); ?></td>
                    <td>728 x 90</td>
                    <td><?php echo is_active_sidebar('sponsor-article-top') ? '<span style="color:green">Active</span>' : '<span style="color:red">Empty</span>'; ?></td>
                    <td><a href="<?php echo admin_url('widgets.php'); ?>"><?php _e('Configure', 'technama'); ?></a></td>
                </tr>
                <tr>
                    <td><?php _e('Footer Banner', 'technama'); ?></td>
                    <td>728 x 90</td>
                    <td><?php echo is_active_sidebar('sponsor-footer') ? '<span style="color:green">Active</span>' : '<span style="color:red">Empty</span>'; ?></td>
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
    if (is_page_template('page-templates/template-full-width.php')) {
        $classes[] = 'technama-full-width';
    }
    if (is_page_template('page-templates/template-live-shows.php')) {
        $classes[] = 'technama-live-shows';
    }
    return $classes;
}
add_filter('body_class', 'technama_body_classes');

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
function technama_set_post_views() {
    if (is_single()) {
        global $post;
        $post_id = $post->ID;
        $count = (int) get_post_meta($post_id, 'post_views_count', true);
        $count++;
        update_post_meta($post_id, 'post_views_count', $count);
    }
}
add_action('wp_head', 'technama_set_post_views');

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
        wp_send_json_success(array('message' => 'Welcome back! You are now subscribed.'));
    } else {
        $wpdb->insert($table, array(
            'email' => $email,
            'status' => 'active',
            'consent_date' => current_time('mysql'),
        ));
        wp_send_json_success(array('message' => 'Thank you for subscribing!'));
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
add_action('init', 'technama_handle_press_release');
