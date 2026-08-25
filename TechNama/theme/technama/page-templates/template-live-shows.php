<?php
/**
 * Template Name: Live Shows
 */
get_header();
?>
<div class="tn-container">
    <div class="tn-page-header">
        <h1 class="tn-page-title"><?php esc_html_e('Web Channel / Live Shows', 'technama'); ?></h1>
        <p class="tn-page-subtitle"><?php esc_html_e('Watch live interviews with Pakistan startup founders and tech leaders', 'technama'); ?></p>
    </div>

    <?php
    $featured_video = new WP_Query(array(
        'post_type'      => 'video_review',
        'posts_per_page' => 1,
        'meta_key'       => '_tn_is_featured',
        'meta_value'     => '1',
    ));
    if ($featured_video->have_posts()) : $featured_video->the_post();
        $youtube_id = get_post_meta(get_the_ID(), '_tn_youtube_id', true);
    ?>
    <div class="tn-featured-video">
        <div class="tn-featured-video-wrapper">
            <?php if ($youtube_id) : ?>
                <iframe
                    src="https://www.youtube.com/embed/<?php echo esc_attr($youtube_id); ?>?rel=0"
                    title="<?php the_title_attribute(); ?>"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            <?php else : ?>
                <?php if (has_post_thumbnail()) : ?>
                    <a href="<?php the_permalink(); ?>" class="tn-featured-video-thumb">
                        <?php the_post_thumbnail('technama-hero', array('loading' => 'eager')); ?>
                        <span class="tn-featured-play-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="72" height="72"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
                        </span>
                    </a>
                <?php endif; ?>
            <?php endif; ?>
        </div>
        <div class="tn-featured-video-info">
            <span class="tn-badge tn-badge-live"><?php esc_html_e('Latest Episode', 'technama'); ?></span>
            <h2 class="tn-featured-video-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
            <p class="tn-featured-video-excerpt"><?php echo wp_trim_words(get_the_excerpt(), 25); ?></p>
            <div class="tn-featured-video-meta">
                <span class="tn-meta-date"><?php echo get_the_date(); ?></span>
                <span class="tn-meta-separator">&bull;</span>
                <span class="tn-meta-duration"><?php echo esc_html(get_post_meta(get_the_ID(), '_tn_video_duration', true)); ?></span>
            </div>
        </div>
    </div>
    <?php wp_reset_postdata(); endif; ?>

    <div class="tn-show-filters">
        <button class="tn-filter-btn active" data-filter="all"><?php esc_html_e('All', 'technama'); ?></button>
        <button class="tn-filter-btn" data-filter="episodes"><?php esc_html_e('Episodes', 'technama'); ?></button>
        <button class="tn-filter-btn" data-filter="upcoming"><?php esc_html_e('Upcoming', 'technama'); ?></button>
        <button class="tn-filter-btn" data-filter="live"><?php esc_html_e('Live', 'technama'); ?></button>
    </div>

    <div class="tn-video-grid">
        <?php
        $videos = new WP_Query(array(
            'post_type'      => 'video_review',
            'posts_per_page' => 12,
            'orderby'        => 'date',
            'order'          => 'DESC',
        ));
        if ($videos->have_posts()) :
            while ($videos->have_posts()) : $videos->the_post();
                get_template_part('template-parts/content', 'video');
            endwhile;
            wp_reset_postdata();
        else :
        ?>
            <div class="tn-no-results">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
                <h3><?php esc_html_e('No videos available yet', 'technama'); ?></h3>
                <p><?php esc_html_e('Stay tuned for upcoming live shows and interviews.', 'technama'); ?></p>
            </div>
        <?php endif; ?>
    </div>

    <div class="tn-pagination">
        <?php
        global $wp_query;
        if ($wp_query->max_num_pages > 1) {
            the_posts_pagination(array(
                'mid_size'  => 2,
                'prev_text' => '&laquo; ' . esc_html__('Previous', 'technama'),
                'next_text' => esc_html__('Next', 'technama') . ' &raquo;',
                'class'     => 'tn-pagination-links',
            ));
        }
        ?>
    </div>
</div>
<?php get_footer(); ?>
