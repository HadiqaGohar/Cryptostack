<?php
/**
 * TechNama Header Template
 */
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
                    <span class="tn-topbar-date"><?php echo date('l, F j, Y'); ?></span>
                </div>
                <div class="tn-topbar-right">
                    <nav class="tn-topbar-nav" aria-label="<?php esc_attr_e('Quick Links', 'technama'); ?>">
                        <a href="<?php echo esc_url(home_url('/about/')); ?>"><?php esc_html_e('About', 'technama'); ?></a>
                        <a href="<?php echo esc_url(home_url('/contact/')); ?>"><?php esc_html_e('Contact', 'technama'); ?></a>
                        <a href="<?php echo esc_url(home_url('/advertise/')); ?>"><?php esc_html_e('Advertise', 'technama'); ?></a>
                    </nav>
                    <div class="tn-topbar-social">
                        <a href="#" aria-label="Facebook"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
                        <a href="#" aria-label="Twitter"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                        <a href="#" aria-label="LinkedIn"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
                        <a href="#" aria-label="YouTube"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
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
                        <a href="<?php echo esc_url(home_url('/')); ?>" aria-label="<?php bloginfo('name'); ?>">
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
                <input type="search" class="tn-search-input" placeholder="<?php esc_attr_e('Search articles, videos, startups...', 'technama'); ?>" value="<?php echo get_search_query(); ?>" name="s" />
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
                        'category'       => 0, // Add your breaking news category ID
                    ));
                    if ($breaking_news->have_posts()) :
                        while ($breaking_news->have_posts()) : $breaking_news->the_post();
                    ?>
                    <a href="<?php the_permalink(); ?>" class="tn-ticker-item">
                        <span class="tn-ticker-cat"><?php echo esc_html(technama_get_primary_category()); ?></span>
                        <?php the_title(); ?>
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
