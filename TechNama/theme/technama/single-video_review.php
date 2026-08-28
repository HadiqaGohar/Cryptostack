<?php
/**
 * Template for single video review / show episode
 * 
 * @package TechNama
 */

get_header();

$guest_id = get_post_meta(get_the_ID(), '_tn_show_guest_id', true);
$show_date = get_post_meta(get_the_ID(), '_tn_show_date', true);
$show_time = get_post_meta(get_the_ID(), '_tn_show_time', true);
$show_status = get_post_meta(get_the_ID(), '_tn_show_status', true);
$episode_number = get_post_meta(get_the_ID(), '_tn_show_episode_number', true);
$season = get_post_meta(get_the_ID(), '_tn_show_season', true);
$show_topic = get_post_meta(get_the_ID(), '_tn_show_topic', true);
$youtube_id = get_post_meta(get_the_ID(), '_tn_youtube_id', true);
$duration = get_post_meta(get_the_ID(), '_tn_show_duration', true);
$views = technama_get_post_views();
$guest = $guest_id ? technama_get_guest_profile($guest_id) : null;
$share_count = technama_get_share_count();
?>

<main id="primary" class="tn-single-video">
    <article id="post-<?php the_ID(); ?>" <?php post_class('tn-episode'); ?>>
        
        <!-- HERO: Video + Meta -->
        <header class="tn-episode-hero">
            <div class="tn-container">
                <div class="tn-episode-hero-grid">
                    
                    <div class="tn-episode-video">
                        <?php if ($youtube_id) : ?>
                            <?php echo technama_youtube_embed($youtube_id); ?>
                        <?php elseif (has_post_thumbnail()) : ?>
                            <div class="tn-episode-thumbnail">
                                <?php the_post_thumbnail('technama-hero'); ?>
                            </div>
                        <?php else : ?>
                            <div class="tn-episode-placeholder">
                                <span class="tn-play-icon-large">▶</span>
                            </div>
                        <?php endif; ?>
                    </div>

                    <div class="tn-episode-info">
                        <?php if ($show_status) : ?>
                            <span class="tn-badge tn-badge-<?php echo esc_attr($show_status); ?>">
                                <?php echo esc_html(ucfirst($show_status)); ?>
                            </span>
                        <?php endif; ?>
                        
                        <h1 class="tn-episode-title"><?php the_title(); ?></h1>
                        
                        <div class="tn-episode-meta">
                            <?php if ($season && $episode_number) : ?>
                                <span class="tn-meta-item">Season <?php echo esc_html($season); ?> • Episode <?php echo esc_html($episode_number); ?></span>
                            <?php endif; ?>
                            
                            <?php if ($show_date) : ?>
                                <span class="tn-meta-item">
                                    📅 <?php echo esc_html(date('M j, Y', strtotime($show_date))); ?>
                                    <?php if ($show_time) : ?>
                                        • <?php echo esc_html(date('g:i A', strtotime($show_time))); ?>
                                    <?php endif; ?>
                                </span>
                            <?php endif; ?>
                            
                            <?php if ($duration) : ?>
                                <span class="tn-meta-item">⏱ <?php echo esc_html($duration); ?></span>
                            <?php endif; ?>
                            
                            <span class="tn-meta-item">👁 <?php echo esc_html(number_format($views)); ?> views</span>
                            <span class="tn-meta-item">🔗 <?php echo esc_html($share_count); ?> shares</span>
                        </div>

                        <?php if ($show_topic) : ?>
                            <p class="tn-episode-topic"><strong>Topic:</strong> <?php echo esc_html($show_topic); ?></p>
                        <?php endif; ?>

                        <?php technama_share_buttons(); ?>
                    </div>
                </div>
            </div>
        </header>

        <!-- GUEST SECTION -->
        <?php if ($guest && !empty($guest['name'])) : ?>
        <section class="tn-episode-guest">
            <div class="tn-container">
                <div class="tn-guest-card">
                    <div class="tn-guest-avatar">
                        <img src="<?php echo esc_url($guest['avatar']); ?>" alt="<?php echo esc_attr($guest['name']); ?>" width="120" height="120" loading="lazy" />
                    </div>
                    <div class="tn-guest-info">
                        <h3 class="tn-guest-name"><?php echo esc_html($guest['name']); ?></h3>
                        <?php if (!empty($guest['title']) || !empty($guest['company'])) : ?>
                            <p class="tn-guest-role">
                                <?php echo esc_html($guest['title']); ?>
                                <?php if (!empty($guest['title']) && !empty($guest['company'])) echo '@ '; ?>
                                <?php echo esc_html($guest['company']); ?>
                            </p>
                        <?php endif; ?>
                        <?php if (!empty($guest['bio'])) : ?>
                            <p class="tn-guest-bio"><?php echo esc_html($guest['bio']); ?></p>
                        <?php endif; ?>
                        <div class="tn-guest-social">
                            <?php if (!empty($guest['twitter'])) : ?>
                                <a href="<?php echo esc_url($guest['twitter']); ?>" target="_blank" rel="noopener noreferrer" class="tn-social-link tn-social-twitter">𝕏 Twitter</a>
                            <?php endif; ?>
                            <?php if (!empty($guest['linkedin'])) : ?>
                                <a href="<?php echo esc_url($guest['linkedin']); ?>" target="_blank" rel="noopener noreferrer" class="tn-social-link tn-social-linkedin">in LinkedIn</a>
                            <?php endif; ?>
                            <?php if (!empty($guest['website'])) : ?>
                                <a href="<?php echo esc_url($guest['website']); ?>" target="_blank" rel="noopener noreferrer" class="tn-social-link tn-social-website">🌐 Website</a>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <?php endif; ?>

        <!-- SHOW NOTES / CONTENT -->
        <section class="tn-episode-content">
            <div class="tn-container tn-container-narrow">
                <?php if (has_blocks(get_the_content())) : ?>
                    <?php the_content(); ?>
                <?php else : ?>
                    <div class="tn-show-notes">
                        <h2>📝 Show Notes</h2>
                        <?php the_content(); ?>
                    </div>
                <?php endif; ?>
            </div>
        </section>

        <!-- TAGS & CATEGORIES -->
        <section class="tn-episode-taxonomies">
            <div class="tn-container tn-container-narrow">
                <div class="tn-taxonomy-row">
                    <?php if (has_category()) : ?>
                        <div class="tn-taxonomy-group">
                            <strong>Categories:</strong>
                            <?php the_category(', '); ?>
                        </div>
                    <?php endif; ?>
                    
                    <?php if (has_tag()) : ?>
                        <div class="tn-taxonomy-group">
                            <strong>Tags:</strong>
                            <?php the_tags('', ', '); ?>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </section>

        <!-- BOTTOM SHARE -->
        <section class="tn-episode-share-bottom">
            <div class="tn-container tn-container-narrow">
                <p class="tn-share-label">Share this episode:</p>
                <?php technama_share_buttons(); ?>
            </div>
        </section>

        <!-- RELATED EPISODES -->
        <?php
        $related = technama_get_related_posts(get_the_ID(), 3);
        if ($related->have_posts()) :
        ?>
        <section class="tn-episode-related">
            <div class="tn-container">
                <h2 class="tn-section-title">📺 More Episodes</h2>
                <div class="tn-video-grid">
                    <?php
                    while ($related->have_posts()) {
                        $related->the_post();
                        get_template_part('template-parts/content', 'video');
                    }
                    wp_reset_postdata();
                    ?>
                </div>
            </div>
        </section>
        <?php endif; ?>

    </article>
</main>

<?php get_footer(); ?>
