<div class="tn-sponsor-wrap" role="complementary" aria-label="Sponsored content">
    <div class="tn-sponsor-label">
        <span class="tn-sponsor-badge">Sponsored</span>
    </div>
    <div class="tn-sponsor-content">
        <?php
        $sponsor_name = get_post_meta(get_the_ID(), '_tn_sponsor_name', true);
        $sponsor_url = get_post_meta(get_the_ID(), '_tn_sponsor_url', true);
        $sponsor_logo = get_post_meta(get_the_ID(), '_tn_sponsor_logo_id', true);
        ?>
        <?php if ($sponsor_logo) : ?>
            <div class="tn-sponsor-logo">
                <?php if ($sponsor_url) : ?>
                    <a href="<?php echo esc_url($sponsor_url); ?>" target="_blank" rel="noopener noreferrer nofollow" aria-label="<?php echo esc_attr($sponsor_name); ?>">
                        <?php echo wp_get_attachment_image($sponsor_logo, 'medium', false, array('loading' => 'lazy')); ?>
                    </a>
                <?php else : ?>
                    <?php echo wp_get_attachment_image($sponsor_logo, 'medium', false, array('loading' => 'lazy')); ?>
                <?php endif; ?>
            </div>
        <?php endif; ?>

        <div class="tn-sponsor-posts">
            <?php
            $sponsor_args = array(
                'post_type'      => 'post',
                'posts_per_page' => 3,
                'meta_query'     => array(
                    array(
                        'key'   => '_tn_sponsor_name',
                        'value' => $sponsor_name,
                        'compare' => '=',
                    ),
                ),
            );
            $sponsor_query = new WP_Query($sponsor_args);

            if ($sponsor_query->have_posts()) :
                while ($sponsor_query->have_posts()) : $sponsor_query->the_post();
            ?>
                    <div class="tn-sponsor-item">
                        <a href="<?php the_permalink(); ?>" class="tn-sponsor-item-link">
                            <?php if (has_post_thumbnail()) : ?>
                                <div class="tn-sponsor-item-thumb">
                                    <?php the_post_thumbnail('thumbnail', array('loading' => 'lazy')); ?>
                                </div>
                            <?php endif; ?>
                            <div class="tn-sponsor-item-info">
                                <h4 class="tn-sponsor-item-title"><?php the_title(); ?></h4>
                                <span class="tn-sponsor-item-date"><?php echo esc_html( get_the_date() ); ?></span>
                            </div>
                        </a>
                    </div>
            <?php
                endwhile;
                wp_reset_postdata();
            endif;
            ?>
        </div>

        <?php if ($sponsor_url) : ?>
            <div class="tn-sponsor-cta">
                <a href="<?php echo esc_url($sponsor_url); ?>" target="_blank" rel="noopener noreferrer nofollow" class="tn-sponsor-cta-btn">
                    Visit <?php echo esc_html($sponsor_name); ?>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14"><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" fill="currentColor"/></svg>
                </a>
            </div>
        <?php endif; ?>
    </div>
</div>
