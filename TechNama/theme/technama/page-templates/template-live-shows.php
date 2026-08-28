<?php
/**
 * Template Name: Live Shows
 * 
 * @package TechNama
 */

get_header();
?>

<main id="primary" class="tn-live-shows-page">
    
    <!-- PAGE HEADER -->
    <section class="tn-page-header tn-page-header-shows">
        <div class="tn-container">
            <h1 class="tn-page-title"><?php _e('Web Channel / Live Shows', 'technama'); ?></h1>
            <p class="tn-page-subtitle"><?php _e('Watch live interviews with Pakistan\'s top startup founders and tech leaders', 'technama'); ?></p>
        </div>
    </section>

    <?php
    // Enqueue show filters JS
    wp_enqueue_script('technama-show-filters', get_stylesheet_directory_uri() . '/assets/js/show-filters.js', array(), '1.0.0', true);
    wp_localize_script('technama-show-filters', 'tn_share_vars', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('technama_nonce'),
    ));
    ?>

    <?php
    // Check for live show
    $live_shows = technama_get_live_shows(1);
    if ($live_shows->have_posts()) :
        $live_shows->the_post();
        $live_youtube = get_post_meta(get_the_ID(), '_tn_youtube_id', true);
    ?>
    <!-- LIVE STREAM -->
    <section class="tn-live-banner">
        <div class="tn-container">
            <div class="tn-live-indicator">
                <span class="tn-live-dot"></span> <?php _e('LIVE NOW', 'technama'); ?>
            </div>
            <?php if ($live_youtube) : ?>
                <div class="tn-live-stream-wrapper">
                    <?php echo technama_youtube_embed($live_youtube, '100%', '500'); ?>
                </div>
            <?php endif; ?>
            <h2 class="tn-live-title"><?php the_title(); ?></h2>
        </div>
    </section>
    <?php wp_reset_postdata(); endif; ?>

    <!-- UPCOMING SHOWS CALENDAR -->
    <?php
    $upcoming = technama_get_upcoming_shows(5);
    if ($upcoming->have_posts()) :
    ?>
    <section class="tn-upcoming-shows">
        <div class="tn-container">
            <h2 class="tn-section-title">📅 <?php _e('Upcoming Shows', 'technama'); ?></h2>
            <div class="tn-calendar-list">
                <?php
                while ($upcoming->have_posts()) {
                    $upcoming->the_post();
                    $s_date = get_post_meta(get_the_ID(), '_tn_show_date', true);
                    $s_time = get_post_meta(get_the_ID(), '_tn_show_time', true);
                    $s_topic = get_post_meta(get_the_ID(), '_tn_show_topic', true);
                    $s_guest_id = get_post_meta(get_the_ID(), '_tn_show_guest_id', true);
                    $s_guest = $s_guest_id ? technama_get_guest_profile($s_guest_id) : null;
                    $s_status = get_post_meta(get_the_ID(), '_tn_show_status', true);
                    $s_episode = get_post_meta(get_the_ID(), '_tn_show_episode_number', true);
                    $s_season = get_post_meta(get_the_ID(), '_tn_show_season', true);
                ?>
                <a href="<?php the_permalink(); ?>" class="tn-calendar-item" data-show-status="<?php echo esc_attr($s_status); ?>">
                    <div class="tn-calendar-date">
                        <?php if ($s_date) : ?>
                            <span class="tn-cal-day"><?php echo esc_html(date('d', strtotime($s_date))); ?></span>
                            <span class="tn-cal-month"><?php echo esc_html(date('M', strtotime($s_date))); ?></span>
                        <?php endif; ?>
                    </div>
                    <div class="tn-calendar-details">
                        <h3 class="tn-calendar-title"><?php the_title(); ?></h3>
                        <div class="tn-calendar-meta">
                            <?php if ($s_time) : ?>
                                <span>🕐 <?php echo esc_html(date('g:i A', strtotime($s_time))); ?></span>
                            <?php endif; ?>
                            <?php if ($s_guest && !empty($s_guest['name'])) : ?>
                                <span>🎤 <?php echo esc_html($s_guest['name']); ?><?php if (!empty($s_guest['company'])) echo ' — ' . esc_html($s_guest['company']); ?></span>
                            <?php endif; ?>
                            <?php if ($s_season && $s_episode) : ?>
                                <span>📺 S<?php echo esc_html($s_season); ?>E<?php echo esc_html($s_episode); ?></span>
                            <?php endif; ?>
                        </div>
                        <?php if ($s_topic) : ?>
                            <p class="tn-calendar-topic"><?php echo esc_html($s_topic); ?></p>
                        <?php endif; ?>
                    </div>
                    <div class="tn-calendar-arrow">→</div>
                </a>
                <?php
                }
                wp_reset_postdata();
                ?>
            </div>
        </div>
    </section>
    <?php endif; ?>

    <!-- FILTER BAR -->
    <section class="tn-show-filters-section">
        <div class="tn-container">
            <div class="tn-show-filters">
                <button class="tn-filter-btn active" data-filter="all"><?php _e('All', 'technama'); ?></button>
                <button class="tn-filter-btn" data-filter="episodes"><?php _e('Episodes', 'technama'); ?></button>
                <button class="tn-filter-btn" data-filter="upcoming"><?php _e('Upcoming', 'technama'); ?></button>
                <button class="tn-filter-btn" data-filter="live"><?php _e('Live', 'technama'); ?></button>
            </div>
        </div>
    </section>

    <!-- VIDEO GRID -->
    <section class="tn-show-grid-section">
        <div class="tn-container">
            <div class="tn-video-grid">
                <?php
                $videos = new WP_Query(array(
                    'post_type'      => 'video_review',
                    'posts_per_page' => 12,
                    'post_status'    => 'publish',
                    'orderby'        => 'date',
                    'order'          => 'DESC',
                ));

                if ($videos->have_posts()) :
                    while ($videos->have_posts()) :
                        $videos->the_post();
                        $v_status = get_post_meta(get_the_ID(), '_tn_show_status', true);
                ?>
                    <div data-show-status="<?php echo esc_attr($v_status); ?>">
                        <?php get_template_part('template-parts/content', 'video'); ?>
                    </div>
                <?php
                    endwhile;
                    wp_reset_postdata();
                else :
                ?>
                    <div class="tn-no-videos">
                        <p><?php _e('No videos available yet.', 'technama'); ?></p>
                        <p><?php _e('Stay tuned for upcoming live shows and interviews.', 'technama'); ?></p>
                    </div>
                <?php endif; ?>
            </div>

            <?php
            // Pagination
            the_posts_pagination(array(
                'mid_size'  => 2,
                'prev_text' => '&laquo; ' . __('Previous', 'technama'),
                'next_text' => __('Next', 'technama') . ' &raquo;',
            ));
            ?>
        </div>
    </section>

    <!-- NEWSLETTER CTA -->
    <section class="tn-show-newsletter">
        <div class="tn-container tn-container-narrow">
            <div class="tn-newsletter-box">
                <h2><?php _e('🔔 Never Miss a Show', 'technama'); ?></h2>
                <p><?php _e('Subscribe to get notified about upcoming live shows and exclusive interviews.', 'technama'); ?></p>
                <form class="tn-newsletter-form" data-ajax="tn_subscribe">
                    <input type="email" name="email" placeholder="<?php _e('Your email address', 'technama'); ?>" required />
                    <button type="submit" class="tn-btn tn-btn-primary"><?php _e('Subscribe', 'technama'); ?></button>
                </form>
            </div>
        </div>
    </section>

</main>

<?php get_footer(); ?>
