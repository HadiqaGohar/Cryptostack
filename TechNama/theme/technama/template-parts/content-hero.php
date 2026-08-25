<section class="tn-hero" id="hero-<?php the_ID(); ?>">
    <div class="tn-hero-bg">
        <?php if (has_post_thumbnail()) : ?>
            <?php the_post_thumbnail('full', array('loading' => 'eager')); ?>
        <?php else : ?>
            <img src="<?php echo esc_url(get_stylesheet_directory_uri()); ?>/assets/images/default-hero.jpg" alt="<?php the_title_attribute(); ?>" loading="eager">
        <?php endif; ?>
        <div class="tn-hero-overlay"></div>
    </div>
    <div class="tn-hero-content">
        <div class="tn-hero-inner">
            <span class="tn-hero-cat"><?php echo esc_html(technama_get_primary_category()); ?></span>
            <h1 class="tn-hero-title">
                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
            </h1>
            <p class="tn-hero-excerpt"><?php echo wp_trim_words(get_the_excerpt(), 25); ?></p>
            <div class="tn-hero-meta">
                <span class="tn-hero-author">
                    <?php echo get_avatar(get_the_author_meta('ID'), 32); ?>
                    <span><?php the_author(); ?></span>
                </span>
                <span class="tn-hero-date"><?php echo get_the_date(); ?></span>
                <span class="tn-hero-reading">
                    <?php
                    $content = get_the_content();
                    $word_count = str_word_count(strip_tags($content));
                    $minutes = max(1, ceil($word_count / 200));
                    echo $minutes . ' min read';
                    ?>
                </span>
            </div>
            <a href="<?php the_permalink(); ?>" class="tn-hero-btn">Read More</a>
        </div>
    </div>
</section>
