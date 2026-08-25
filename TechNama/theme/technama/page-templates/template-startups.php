<?php
/**
 * Template Name: Startups
 */
get_header();
?>
<div class="tn-container">
    <div class="tn-page-header">
        <h1 class="tn-page-title"><?php esc_html_e('Pakistan Startup Showcase', 'technama'); ?></h1>
        <p class="tn-page-subtitle"><?php esc_html_e('Discover and explore innovative startups building the future of Pakistan', 'technama'); ?></p>
    </div>

    <?php
    $featured_startup = new WP_Query(array(
        'post_type'      => 'startup',
        'posts_per_page' => 1,
        'meta_key'       => '_tn_is_featured_startup',
        'meta_value'     => '1',
    ));
    if ($featured_startup->have_posts()) : $featured_startup->the_post();
        $funding = get_post_meta(get_the_ID(), '_tn_funding_stage', true);
        $founded = get_post_meta(get_the_ID(), '_tn_founded_year', true);
        $founders = get_post_meta(get_the_ID(), '_tn_founders', true);
        $website = get_post_meta(get_the_ID(), '_tn_startup_website', true);
        $sector = get_post_meta(get_the_ID(), '_tn_sector', true);
    ?>
    <div class="tn-featured-startup">
        <div class="tn-featured-startup-inner">
            <div class="tn-featured-startup-image">
                <?php if (has_post_thumbnail()) : ?>
                    <?php the_post_thumbnail('technama-hero', array('loading' => 'eager')); ?>
                <?php else : ?>
                    <img src="<?php echo esc_url(get_stylesheet_directory_uri()); ?>/assets/images/default-startup.jpg" alt="<?php the_title_attribute(); ?>" loading="eager">
                <?php endif; ?>
                <span class="tn-badge tn-badge-featured"><?php esc_html_e('Featured Startup', 'technama'); ?></span>
            </div>
            <div class="tn-featured-startup-content">
                <div class="tn-startup-tags">
                    <?php if ($sector) : ?>
                        <span class="tn-tag"><?php echo esc_html($sector); ?></span>
                    <?php endif; ?>
                    <?php if ($funding) : ?>
                        <span class="tn-tag tn-tag-funding"><?php echo esc_html($funding); ?></span>
                    <?php endif; ?>
                </div>
                <h2 class="tn-featured-startup-name"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                <p class="tn-featured-startup-desc"><?php echo wp_trim_words(get_the_excerpt(), 40); ?></p>
                <div class="tn-startup-details">
                    <?php if ($founded) : ?>
                        <div class="tn-detail-item">
                            <span class="tn-detail-label"><?php esc_html_e('Founded', 'technama'); ?></span>
                            <span class="tn-detail-value"><?php echo esc_html($founded); ?></span>
                        </div>
                    <?php endif; ?>
                    <?php if ($founders) : ?>
                        <div class="tn-detail-item">
                            <span class="tn-detail-label"><?php esc_html_e('Founders', 'technama'); ?></span>
                            <span class="tn-detail-value"><?php echo esc_html($founders); ?></span>
                        </div>
                    <?php endif; ?>
                    <?php if ($funding) : ?>
                        <div class="tn-detail-item">
                            <span class="tn-detail-label"><?php esc_html_e('Stage', 'technama'); ?></span>
                            <span class="tn-detail-value"><?php echo esc_html($funding); ?></span>
                        </div>
                    <?php endif; ?>
                </div>
                <div class="tn-startup-actions">
                    <a href="<?php the_permalink(); ?>" class="tn-btn tn-btn-primary"><?php esc_html_e('View Profile', 'technama'); ?></a>
                    <?php if ($website) : ?>
                        <a href="<?php echo esc_url($website); ?>" class="tn-btn tn-btn-outline" target="_blank" rel="noopener"><?php esc_html_e('Visit Website', 'technama'); ?></a>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
    <?php wp_reset_postdata(); endif; ?>

    <?php
    $sectors = get_terms(array(
        'taxonomy'   => 'startup_sector',
        'hide_empty' => true,
    ));
    if (!is_wp_error($sectors) && !empty($sectors)) :
    ?>
    <div class="tn-sector-filter">
        <h3 class="tn-section-label"><?php esc_html_e('Filter by Sector', 'technama'); ?></h3>
        <div class="tn-filter-pills">
            <button class="tn-pill active" data-sector="all"><?php esc_html_e('All Sectors', 'technama'); ?></button>
            <?php foreach ($sectors as $sector) : ?>
                <button class="tn-pill" data-sector="<?php echo esc_attr($sector->slug); ?>">
                    <?php echo esc_html($sector->name); ?>
                    <span class="tn-pill-count"><?php echo esc_html($sector->count); ?></span>
                </button>
            <?php endforeach; ?>
        </div>
    </div>
    <?php endif; ?>

    <div class="tn-startup-grid">
        <?php
        $startups = new WP_Query(array(
            'post_type'      => 'startup',
            'posts_per_page' => 12,
            'orderby'        => 'date',
            'order'          => 'DESC',
        ));
        if ($startups->have_posts()) :
            while ($startups->have_posts()) : $startups->the_post();
                $s_funding = get_post_meta(get_the_ID(), '_tn_funding_stage', true);
                $s_sector = get_post_meta(get_the_ID(), '_tn_sector', true);
                $s_founded = get_post_meta(get_the_ID(), '_tn_founded_year', true);
            ?>
            <article class="tn-card tn-card-startup" id="startup-<?php the_ID(); ?>" data-sector="<?php echo esc_attr($s_sector ? sanitize_title($s_sector) : ''); ?>">
                <div class="tn-card-thumb">
                    <a href="<?php the_permalink(); ?>">
                        <?php if (has_post_thumbnail()) : ?>
                            <?php the_post_thumbnail('technama-card', array('loading' => 'lazy')); ?>
                        <?php else : ?>
                            <img src="<?php echo esc_url(get_stylesheet_directory_uri()); ?>/assets/images/default-startup.jpg" alt="<?php the_title_attribute(); ?>" loading="lazy">
                        <?php endif; ?>
                    </a>
                    <?php if ($s_sector) : ?>
                        <span class="tn-card-cat"><?php echo esc_html($s_sector); ?></span>
                    <?php endif; ?>
                </div>
                <div class="tn-card-body">
                    <h3 class="tn-card-title">
                        <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                    </h3>
                    <p class="tn-card-excerpt"><?php echo wp_trim_words(get_the_excerpt(), 15); ?></p>
                    <div class="tn-card-startup-meta">
                        <?php if ($s_funding) : ?>
                            <span class="tn-badge tn-badge-sm"><?php echo esc_html($s_funding); ?></span>
                        <?php endif; ?>
                        <?php if ($s_founded) : ?>
                            <span class="tn-meta-founded"><?php esc_html_e('Est.', 'technama'); ?> <?php echo esc_html($s_founded); ?></span>
                        <?php endif; ?>
                    </div>
                </div>
            </article>
            <?php
            endwhile;
            wp_reset_postdata();
        else :
        ?>
            <div class="tn-no-results">
                <h3><?php esc_html_e('No startups listed yet', 'technama'); ?></h3>
                <p><?php esc_html_e('Be the first to list your startup on TechNama!', 'technama'); ?></p>
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

    <div class="tn-cta-section tn-cta-startup">
        <div class="tn-cta-inner">
            <div class="tn-cta-content">
                <h2 class="tn-cta-title"><?php esc_html_e('Building Something Amazing?', 'technama'); ?></h2>
                <p class="tn-cta-text"><?php esc_html_e('Submit your startup to be featured on TechNama and reach thousands of tech enthusiasts, investors, and potential partners across Pakistan.', 'technama'); ?></p>
            </div>
            <div class="tn-cta-action">
                <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="tn-btn tn-btn-primary tn-btn-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                    <?php esc_html_e('Submit Your Startup', 'technama'); ?>
                </a>
            </div>
        </div>
    </div>
</div>
<?php get_footer(); ?>
