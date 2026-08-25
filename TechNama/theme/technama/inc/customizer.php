<?php
/**
 * TechNama Customizer Settings
 */

if (!defined('ABSPATH')) exit;

/**
 * Add customizer settings
 */
function technama_customize_register($wp_customize) {

    // =====================
    // TechNama Theme Panel
    // =====================
    $wp_customize->add_panel('technama_panel', array(
        'title'    => __('TechNama Settings', 'technama'),
        'priority' => 30,
    ));

    // =====================
    // General Settings Section
    // =====================
    $wp_customize->add_section('technama_general', array(
        'title' => __('General Settings', 'technama'),
        'panel' => 'technama_panel',
    ));

    // Site Tagline
    $wp_customize->add_setting('technama_tagline', array(
        'default'           => 'Technology News & Reviews',
        'sanitize_callback' => 'sanitize_text_field',
        'transport'         => 'postMessage',
    ));
    $wp_customize->add_control('technama_tagline', array(
        'label'   => __('Tagline Text', 'technama'),
        'section' => 'technama_general',
        'type'    => 'text',
    ));

    // Custom CSS
    $wp_customize->add_setting('technama_custom_css', array(
        'default'           => '',
        'sanitize_callback' => 'technama_sanitize_css',
    ));
    $wp_customize->add_control('technama_custom_css', array(
        'label'       => __('Custom CSS', 'technama'),
        'description' => __('Add custom CSS to override theme styles.', 'technama'),
        'section'     => 'technama_general',
        'type'        => 'textarea',
    ));

    // =====================
    // Header Settings
    // =====================
    $wp_customize->add_section('technama_header', array(
        'title' => __('Header Settings', 'technama'),
        'panel' => 'technama_panel',
    ));

    // Header Background Color
    $wp_customize->add_setting('technama_header_bg_color', array(
        'default'           => '#37215F',
        'sanitize_callback' => 'sanitize_hex_color',
        'transport'         => 'postMessage',
    ));
    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'technama_header_bg_color', array(
        'label'   => __('Header Background Color', 'technama'),
        'section' => 'technama_header',
    )));

    // Header Text Color
    $wp_customize->add_setting('technama_header_text_color', array(
        'default'           => '#ffffff',
        'sanitize_callback' => 'sanitize_hex_color',
        'transport'         => 'postMessage',
    ));
    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'technama_header_text_color', array(
        'label'   => __('Header Text Color', 'technama'),
        'section' => 'technama_header',
    )));

    // Show Search in Header
    $wp_customize->add_setting('technama_header_search', array(
        'default'           => true,
        'sanitize_callback' => 'technama_sanitize_checkbox',
    ));
    $wp_customize->add_control('technama_header_search', array(
        'label'   => __('Show Search Form in Header', 'technama'),
        'section' => 'technama_header',
        'type'    => 'checkbox',
    ));

    // =====================
    // Ticker Settings
    // =====================
    $wp_customize->add_section('technama_ticker', array(
        'title' => __('Breaking News Ticker', 'technama'),
        'panel' => 'technama_panel',
    ));

    // Enable Ticker
    $wp_customize->add_setting('technama_ticker_enabled', array(
        'default'           => true,
        'sanitize_callback' => 'technama_sanitize_checkbox',
    ));
    $wp_customize->add_control('technama_ticker_enabled', array(
        'label'   => __('Enable Breaking News Ticker', 'technama'),
        'section' => 'technama_ticker',
        'type'    => 'checkbox',
    ));

    // Ticker Category
    $wp_customize->add_setting('technama_ticker_category', array(
        'default'           => 0,
        'sanitize_callback' => 'absint',
    ));
    $wp_customize->add_control('technama_ticker_category', array(
        'label'   => __('Ticker Category', 'technama'),
        'desc'    => __('Select category for breaking news ticker posts.', 'technama'),
        'section' => 'technama_ticker',
        'type'    => 'dropdown-pages',
    ));

    // Ticker Label
    $wp_customize->add_setting('technama_ticker_label', array(
        'default'           => 'Breaking',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('technama_ticker_label', array(
        'label'   => __('Ticker Label', 'technama'),
        'section' => 'technama_ticker',
        'type'    => 'text',
    ));

    // Ticker Speed
    $wp_customize->add_setting('technama_ticker_speed', array(
        'default'           => 30,
        'sanitize_callback' => 'absint',
    ));
    $wp_customize->add_control('technama_ticker_speed', array(
        'label'       => __('Ticker Scroll Speed (seconds)', 'technama'),
        'description' => __('Lower number = faster scroll.', 'technama'),
        'section'     => 'technama_ticker',
        'type'        => 'number',
        'input_attrs' => array('min' => 10, 'max' => 120, 'step' => 5),
    ));

    // =====================
    // Hero Section Settings
    // =====================
    $wp_customize->add_section('technama_hero', array(
        'title' => __('Hero Section', 'technama'),
        'panel' => 'technama_panel',
    ));

    // Hero Category
    $wp_customize->add_setting('technama_hero_category', array(
        'default'           => 0,
        'sanitize_callback' => 'absint',
    ));
    $wp_customize->add_control('technama_hero_category', array(
        'label'   => __('Hero Category', 'technama'),
        'desc'    => __('Select category for hero section posts.', 'technama'),
        'section' => 'technama_hero',
        'type'    => 'dropdown-pages',
    ));

    // Number of hero items
    $wp_customize->add_setting('technama_hero_count', array(
        'default'           => 3,
        'sanitize_callback' => 'absint',
    ));
    $wp_customize->add_control('technama_hero_count', array(
        'label'       => __('Number of Hero Items', 'technama'),
        'section'     => 'technama_hero',
        'type'        => 'number',
        'input_attrs' => array('min' => 1, 'max' => 6, 'step' => 1),
    ));

    // =====================
    // Homepage Settings
    // =====================
    $wp_customize->add_section('technama_homepage', array(
        'title' => __('Homepage Layout', 'technama'),
        'panel' => 'technama_panel',
    ));

    // Posts per section
    $wp_customize->add_setting('technama_posts_per_section', array(
        'default'           => 6,
        'sanitize_callback' => 'absint',
    ));
    $wp_customize->add_control('technama_posts_per_section', array(
        'label'       => __('Posts Per Section', 'technama'),
        'section'     => 'technama_homepage',
        'type'        => 'number',
        'input_attrs' => array('min' => 3, 'max' => 12, 'step' => 1),
    ));

    // Enable video section
    $wp_customize->add_setting('technama_show_video_section', array(
        'default'           => true,
        'sanitize_callback' => 'technama_sanitize_checkbox',
    ));
    $wp_customize->add_control('technama_show_video_section', array(
        'label'   => __('Show Video Section', 'technama'),
        'section' => 'technama_homepage',
        'type'    => 'checkbox',
    ));

    // Live stream YouTube video ID
    $wp_customize->add_setting('technama_live_video_id', array(
        'default'           => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('technama_live_video_id', array(
        'label'       => __('YouTube Video ID for Live Stream', 'technama'),
        'description' => __('Enter just the YouTube video ID (e.g. dQw4w9WgXcQ). Leave empty to hide.', 'technama'),
        'section'     => 'technama_homepage',
        'type'        => 'text',
    ));

    // Enable deals section
    $wp_customize->add_setting('technama_show_deals_section', array(
        'default'           => true,
        'sanitize_callback' => 'technama_sanitize_checkbox',
    ));
    $wp_customize->add_control('technama_show_deals_section', array(
        'label'   => __('Show Deals Section', 'technama'),
        'section' => 'technama_homepage',
        'type'    => 'checkbox',
    ));

    // =====================
    // Footer Settings
    // =====================
    $wp_customize->add_section('technama_footer', array(
        'title' => __('Footer Settings', 'technama'),
        'panel' => 'technama_panel',
    ));

    // Footer Background Color
    $wp_customize->add_setting('technama_footer_bg_color', array(
        'default'           => '#37215F',
        'sanitize_callback' => 'sanitize_hex_color',
        'transport'         => 'postMessage',
    ));
    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'technama_footer_bg_color', array(
        'label'   => __('Footer Background Color', 'technama'),
        'section' => 'technama_footer',
    )));

    // Copyright Text
    $wp_customize->add_setting('technama_copyright_text', array(
        'default'           => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('technama_copyright_text', array(
        'label'       => __('Copyright Text', 'technama'),
        'description' => __('Leave empty for default copyright text.', 'technama'),
        'section'     => 'technama_footer',
        'type'        => 'textarea',
    ));

    // =====================
    // Social Media Settings
    // =====================
    $wp_customize->add_section('technama_social', array(
        'title' => __('Social Media', 'technama'),
        'panel' => 'technama_panel',
    ));

    $social_platforms = array(
        'facebook'  => 'Facebook',
        'twitter'   => 'Twitter / X',
        'instagram' => 'Instagram',
        'youtube'   => 'YouTube',
        'telegram'  => 'Telegram',
        'whatsapp'  => 'WhatsApp',
        'linkedin'  => 'LinkedIn',
    );

    foreach ($social_platforms as $key => $label) {
        $wp_customize->add_setting("technama_social_{$key}", array(
            'default'           => '',
            'sanitize_callback' => 'esc_url_raw',
        ));
        $wp_customize->add_control("technama_social_{$key}", array(
            'label'   => sprintf(__('%s URL', 'technama'), $label),
            'section' => 'technama_social',
            'type'    => 'url',
        ));
    }

    // =====================
    // Newsletter Settings
    // =====================
    $wp_customize->add_section('technama_newsletter', array(
        'title' => __('Newsletter', 'technama'),
        'panel' => 'technama_panel',
    ));

    $wp_customize->add_setting('technama_newsletter_url', array(
        'default'           => '#',
        'sanitize_callback' => 'esc_url_raw',
    ));
    $wp_customize->add_control('technama_newsletter_url', array(
        'label'       => __('Newsletter Form Action URL', 'technama'),
        'description' => __('Paste your Mailchimp or newsletter service form action URL.', 'technama'),
        'section'     => 'technama_newsletter',
        'type'        => 'url',
    ));

    // Show newsletter widget
    $wp_customize->add_setting('technama_show_newsletter', array(
        'default'           => true,
        'sanitize_callback' => 'technama_sanitize_checkbox',
    ));
    $wp_customize->add_control('technama_show_newsletter', array(
        'label'   => __('Show Newsletter Widget in Sidebar', 'technama'),
        'section' => 'technama_newsletter',
        'type'    => 'checkbox',
    ));

    // Newsletter Title
    $wp_customize->add_setting('technama_newsletter_title', array(
        'default'           => 'Stay Updated',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('technama_newsletter_title', array(
        'label'   => __('Newsletter Widget Title', 'technama'),
        'section' => 'technama_newsletter',
        'type'    => 'text',
    ));

    // Newsletter Description
    $wp_customize->add_setting('technama_newsletter_desc', array(
        'default'           => 'Get the latest tech news delivered to your inbox.',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('technama_newsletter_desc', array(
        'label'   => __('Newsletter Widget Description', 'technama'),
        'section' => 'technama_newsletter',
        'type'    => 'textarea',
    ));

    // Analytics Section
    $wp_customize->add_section('technama_analytics', array(
        'title'    => __('Analytics', 'technama'),
        'panel'    => 'technama_panel',
        'priority' => 99,
    ));

    $wp_customize->add_setting('technama_ga_measurement_id', array(
        'default'           => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('technama_ga_measurement_id', array(
        'label'       => __('Google Analytics Measurement ID', 'technama'),
        'description' => __('e.g. G-XXXXXXXXXX or UA-XXXXXXXX-X. Leave empty to disable.', 'technama'),
        'section'     => 'technama_analytics',
        'type'        => 'text',
    ));
}
add_action('customize_register', 'technama_customize_register');

/**
 * Sanitize checkbox
 */
function technama_sanitize_checkbox($checked) {
    return (isset($checked) && true == $checked) ? true : false;
}

/**
 * Enqueue customizer preview scripts
 */
function technama_customize_preview_js() {
    wp_enqueue_script(
        'technama-customizer-preview',
        get_stylesheet_directory_uri() . '/assets/js/customizer-preview.js',
        array('customize-preview'),
        wp_get_theme()->get('Version'),
        true
    );
}
add_action('customize_preview_init', 'technama_customize_preview_js');

/**
 * Output customizer CSS to head
 */
function technama_customizer_output_css() {
    $header_bg = get_theme_mod('technama_header_bg_color', '#37215F');
    $header_text = get_theme_mod('technama_header_text_color', '#ffffff');
    $footer_bg = get_theme_mod('technama_footer_bg_color', '#37215F');

    $css = '';

    if ($header_bg !== '#37215F') {
        $css .= '.site-header { background-color: ' . esc_attr($header_bg) . '; }';
    }

    if ($header_text !== '#ffffff') {
        $css .= '.site-header, .site-title, .site-title a { color: ' . esc_attr($header_text) . '; }';
    }

    if ($footer_bg !== '#37215F') {
        $css .= '.site-footer { background-color: ' . esc_attr($footer_bg) . '; }';
    }

    if (!empty($css)) {
        echo '<style id="technama-customizer-css">' . $css . '</style>' . PHP_EOL;
    }
}
add_action('wp_head', 'technama_customizer_output_css', 50);

/**
 * Customizer controls helper
 */
function technama_customize_control_select($wp_customize, $id, $args) {
    $wp_customize->add_setting($id, array(
        'default'           => $args['default'],
        'sanitize_callback' => $args['sanitize'] ?? 'sanitize_text_field',
    ));

    $wp_customize->add_control($id, array(
        'label'   => $args['label'],
        'section' => $args['section'],
        'type'    => 'select',
        'choices' => $args['choices'],
    ));
}
