<article id="post-<?php the_ID(); ?>" <?php post_class('tn-card tn-card-video'); ?> data-show-status="<?php echo esc_attr(get_post_meta(get_the_ID(), '_tn_show_status', true)); ?>">
    <div class="tn-card-thumb">
        <a href="<?php the_permalink(); ?>">
            <div class="post-thumbnail <?php echo !has_post_thumbnail() ? 'no-thumbnail' : ''; ?>">
                <?php if (has_post_thumbnail()) : ?>
                    <?php the_post_thumbnail('technama-card', array('loading' => 'lazy')); ?>
                <?php else : ?>
                    <div class="placeholder-image" aria-label="<?php echo esc_attr(get_the_title()); ?>">
                        <span class="placeholder-icon">📰</span>
                    </div>
                <?php endif; ?>
            </div>
        </a>
        <span class="tn-card-play" aria-label="<?php esc_attr_e('Play video', 'technama'); ?>">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
        </span>
        <?php
        $video_id = get_post_meta(get_the_ID(), '_tn_youtube_id', true);
        $duration = get_post_meta(get_the_ID(), '_tn_video_duration', true);
        if ($duration) :
        ?>
            <span class="tn-card-duration"><?php echo esc_html($duration); ?></span>
        <?php endif; ?>
        <span class="tn-card-cat"><?php echo esc_html(technama_get_primary_category()); ?></span>
    </div>
    <div class="tn-card-body">
        <h3 class="tn-card-title">
            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
        </h3>
        <p class="tn-card-excerpt"><?php echo esc_html( wp_trim_words( get_the_excerpt(), 15 ) ); ?></p>
        <div class="tn-card-meta">
            <span class="tn-card-author"><?php echo get_avatar(get_the_author_meta('ID'), 24); ?> <?php echo esc_html( get_the_author() ); ?></span>
            <span class="tn-card-date"><?php echo esc_html( human_time_diff( get_the_time('U'), current_time('timestamp') ) ); ?> <?php esc_html_e('ago', 'technama'); ?></span>
            <?php if ($video_id) : ?>
                <span class="tn-card-video-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" fill="currentColor"/></svg>
                    <?php esc_html_e('Video', 'technama'); ?>
                </span>
            <?php endif; ?>
        </div>
    </div>
</article>
