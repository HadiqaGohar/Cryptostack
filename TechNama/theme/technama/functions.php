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
        'before_widget' => '<div id="%1" class="widget %2">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));

    register_sidebar(array(
        'name'          => __('Footer Column 1', 'technama'),
        'id'            => 'footer-1',
        'description'   => __('First footer widget area.', 'technama'),
        'before_widget' => '<div id="%1" class="widget footer-widget %2">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ));

    register_sidebar(array(
        'name'          => __('Footer Column 2', 'technama'),
        'id'            => 'footer-2',
        'description'   => __('Second footer widget area.', 'technama'),
        'before_widget' => '<div id="%1" class="widget footer-widget %2">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ));

    register_sidebar(array(
        'name'          => __('Footer Column 3', 'technama'),
        'id'            => 'footer-3',
        'description'   => __('Third footer widget area.', 'technama'),
        'before_widget' => '<div id="%1" class="widget footer-widget %2">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title">',
        'after_title'   => '</h4>',
    ));

    register_sidebar(array(
        'name'          => __('Sponsor Banner', 'technama'),
        'id'            => 'sponsor-banner',
        'description'   => __('Sponsor/advertisement banner widget area.', 'technama'),
        'before_widget' => '<div id="%1" class="widget sponsor-widget %2">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));

    register_sidebar(array(
        'name'          => __('Homepage Above Hero', 'technama'),
        'id'            => 'homepage-above-hero',
        'description'   => __('Widgets appear above the hero section on homepage.', 'technama'),
        'before_widget' => '<div id="%1" class="widget %2">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));

    register_sidebar(array(
        'name'          => __('Homepage Below Hero', 'technama'),
        'id'            => 'homepage-below-hero',
        'description'   => __('Widgets appear below the hero section on homepage.', 'technama'),
        'before_widget' => '<div id="%1" class="widget %2">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));

    register_sidebar(array(
        'name'          => __('Sticky Sidebar', 'technama'),
        'id'            => 'sticky-sidebar',
        'description'   => __('Sticky sidebar that follows scroll.', 'technama'),
        'before_widget' => '<div id="%1" class="widget sticky-widget %2">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
}
add_action('widgets_init', 'technama_widgets_init');

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
 * Add related posts functionality
 */
function technama_get_related_posts($count = 3) {
    if (!is_single()) return array();

    global $post;
    $categories = get_the_category($post->ID);
    if (empty($categories)) return array();

    $cat_ids = array();
    foreach ($categories as $category) {
        $cat_ids[] = $category->term_id;
    }

    $args = array(
        'category__in'       => $cat_ids,
        'post__not_in'       => array($post->ID),
        'posts_per_page'     => $count,
        'orderby'            => 'rand',
        'ignore_sticky_posts' => 1,
    );

    return get_posts($args);
}

/**
 * Get trending posts
 */
function technama_get_trending_posts($count = 5) {
    $args = array(
        'posts_per_page'     => $count,
        'meta_key'           => 'post_views_count',
        'orderby'            => 'meta_value_num',
        'order'              => 'DESC',
        'ignore_sticky_posts' => 1,
        'date_query'         => array(
            array(
                'after' => '30 days ago',
            ),
        ),
    );

    $trending = get_posts($args);
    if (empty($trending)) {
        $args = array(
            'posts_per_page'     => $count,
            'orderby'            => 'comment_count',
            'order'              => 'DESC',
            'ignore_sticky_posts' => 1,
        );
        $trending = get_posts($args);
    }
    return $trending;
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
 * Get the primary category name for a post
 */
function technama_get_primary_category() {
    $categories = get_the_category();
    if (!empty($categories)) {
        return $categories[0]->name;
    }
    return '';
}
