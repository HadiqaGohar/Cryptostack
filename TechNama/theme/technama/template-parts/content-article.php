<article class="tn-card" id="post-<?php the_ID(); ?>">
    <div class="tn-card-thumb">
        <a href="<?php the_permalink(); ?>">
            <?php if (has_post_thumbnail()) : ?>
                <?php the_post_thumbnail('technama-card', array('loading' => 'lazy')); ?>
            <?php else : ?>
                <img src="<?php echo esc_url(get_stylesheet_directory_uri()); ?>/assets/images/default-thumb.jpg" alt="<?php the_title_attribute(); ?>" loading="lazy">
            <?php endif; ?>
        </a>
        <span class="tn-card-cat"><?php echo esc_html(technama_get_primary_category()); ?></span>
    </div>
    <div class="tn-card-body">
        <h3 class="tn-card-title">
            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
        </h3>
        <p class="tn-card-excerpt"><?php echo wp_trim_words(get_the_excerpt(), 15); ?></p>
        <div class="tn-card-meta">
            <span class="tn-card-author"><?php echo get_avatar(get_the_author_meta('ID'), 24); ?> <?php the_author(); ?></span>
            <span class="tn-card-date"><?php echo human_time_diff(get_the_time('U'), current_time('timestamp')) . ' ago'; ?></span>
        </div>
    </div>
</article>
