<?php
/**
 * Header template for Technama theme.
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- Skip to content for accessibility -->
<a class="skip-link screen-reader-text" href="#main-content"><?php esc_html_e('Skip to content', 'technama'); ?></a>

<header class="tn-header" role="banner">
    <div class="tn-header-inner">
        <!-- Top Bar -->
        <div class="tn-topbar">
            <div class="tn-container">
                <div class="tn-topbar-left">
                    <span class="tn-topbar-date"><?php echo esc_html( date('l, F j, Y') ); ?></span>
                </div>
                <div class="tn-topbar-right">
                    <nav class="tn-topbar-nav" aria-label="<?php esc_attr_e('Quick Links', 'technama'); ?>">
                        <a href="<?php echo esc_url(home_url('/about/')); ?>"><?php esc_html_e('About', 'technama'); ?></a>
                        <a href="<?php echo esc_url(home_url('/contact/')); ?>"><?php esc_html_e('Contact', 'technama'); ?></a>
                        <a href="<?php echo esc_url(home_url('/advertise/')); ?>"><?php esc_html_e('Advertise', 'technama'); ?></a>
                    </nav>
                    <div class="tn-topbar-social">
                        <?php
$social_twitter = get_theme_mod('technama_social_twitter', '');
$social_facebook = get_theme_mod('technama_social_facebook', '');
$social_instagram = get_theme_mod('technama_social_instagram', '');
$social_youtube = get_theme_mod('technama_social_youtube', '');
?>
<?php if ($social_twitter) : ?><a href="<?php echo esc_url($social_twitter); ?>" class="tn-social-twitter" target="_blank" rel="noopener noreferrer">𝕏</a><?php endif; ?>
<?php if ($social_facebook) : ?><a href="<?php echo esc_url($social_facebook); ?>" class="tn-social-facebook" target="_blank" rel="noopener noreferrer">f</a><?php endif; ?>
<?php if ($social_instagram) : ?><a href="<?php echo esc_url($social_instagram); ?>" class="tn-social-instagram" target="_blank" rel="noopener noreferrer">📷</a><?php endif; ?>
<?php if ($social_youtube) : ?><a href="<?php echo esc_url($social_youtube); ?>" class="tn-social-youtube" target="_blank" rel="noopener noreferrer">▶</a><?php endif; ?>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Header -->
        <div class="tn-main-header">
            <div class="tn-container">
                <div class="tn-header-row">
                    <!-- Logo -->
                    <div class="tn-logo">
                        <a href="<?php echo esc_url(home_url('/')); ?>" aria-label="<?php echo esc_attr( get_bloginfo('name') ); ?>">
                            <?php if (has_custom_logo()) : ?>
                                <?php the_custom_logo(); ?>
                            <?php else : ?>
                                <div class="tn-logo-text">
                                    <span class="tn-logo-name">Tech<span class="tn-logo-accent">Nama</span></span>
                                </div>
                            <?php endif; ?>
                        </a>
                    </div>

                    <!-- Header Ad Banner -->
                    <div class="tn-header-ad">
                        <!-- Sponsor 728x90 placement -->
                    </div>

                    <!-- Search & Actions -->
                    <div class="tn-header-actions">
                        <button class="tn-search-toggle" aria-label="<?php esc_attr_e('Search', 'technama'); ?>">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        </button>
                        <?php if (is_user_logged_in()) : ?>
                            <a href="<?php echo esc_url(admin_url()); ?>" class="tn-btn tn-btn-member">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                                <?php esc_html_e('My Account', 'technama'); ?>
                            </a>
                        <?php else : ?>
                            <a href="<?php echo esc_url(home_url('/membership/')); ?>" class="tn-btn tn-btn-member">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                                <?php esc_html_e('Sign In', 'technama'); ?>
                            </a>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>

        <!-- Category Navigation -->
        <nav class="tn-nav" role="navigation" aria-label="<?php esc_attr_e('Primary Navigation', 'technama'); ?>">
            <div class="tn-container">
                <button class="tn-menu-toggle" aria-label="<?php esc_attr_e('Toggle Menu', 'technama'); ?>" aria-expanded="false">
                    <span class="tn-menu-icon"></span>
                </button>
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'primary',
                    'container'      => false,
                    'menu_class'     => 'tn-nav-list',
                    'fallback_cb'    => 'technama_fallback_menu',
                    'depth'          => 2,
                ));
                ?>
            </div>
        </nav>
    </div>

    <!-- Search Overlay -->
    <div class="tn-search-overlay" id="tn-search-overlay">
        <div class="tn-container">
            <form role="search" method="get" class="tn-search-form" action="<?php echo esc_url(home_url('/')); ?>">
                <input type="search" class="tn-search-input" placeholder="<?php esc_attr_e('Search articles, videos, startups...', 'technama'); ?>" value="<?php echo esc_attr( get_search_query() ); ?>" name="s" />
                <button type="submit" class="tn-search-submit" aria-label="<?php esc_attr_e('Search', 'technama'); ?>">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </button>
                <button type="button" class="tn-search-close" id="tn-search-close" aria-label="<?php esc_attr_e('Close Search', 'technama'); ?>">✕</button>
            </form>
        </div>
    </div>
</header>

<!-- Breaking News Ticker -->
<?php if (is_front_page()) : ?>
<div class="tn-ticker">
    <div class="tn-container">
        <div class="tn-ticker-inner">
            <span class="tn-ticker-label">
                <span class="tn-ticker-dot"></span>
                <?php esc_html_e('BREAKING', 'technama'); ?>
            </span>
            <div class="tn-ticker-content">
                <div class="tn-ticker-scroll">
                    <?php
                    $breaking_news = new WP_Query(array(
                        'posts_per_page' => 10,
                        'orderby'        => 'date',
                        'order'          => 'DESC',
                        'category'       => absint(get_theme_mod('technama_ticker_category', 0)),
                    ));
                    if ($breaking_news->have_posts()) :
                        while ($breaking_news->have_posts()) : $breaking_news->the_post();
                    ?>
                    <a href="<?php echo esc_url( get_permalink() ); ?>" class="tn-ticker-item">
                        <span class="tn-ticker-cat"><?php echo esc_html(technama_get_primary_category()); ?></span>
                        <?php echo esc_html( get_the_title() ); ?>
                    </a>
                    <?php
                        endwhile;
                        wp_reset_postdata();
                    endif;
                    ?>
                </div>
            </div>
        </div>
    </div>
</div>
<?php endif; ?>

<main id="main-content" class="tn-main" role="main">
