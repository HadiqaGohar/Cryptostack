<article class="tn-card tn-card-startup" id="post-<?php the_ID(); ?>">
    <div class="tn-startup-header">
        <?php if (has_post_thumbnail()) : ?>
            <div class="tn-startup-logo">
                <a href="<?php the_permalink(); ?>">
                    <?php the_post_thumbnail('thumbnail', array('loading' => 'lazy')); ?>
                </a>
            </div>
        <?php endif; ?>
        <div class="tn-startup-info">
            <h3 class="tn-startup-name">
                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
            </h3>
            <?php
            $company = get_post_meta(get_the_ID(), '_tn_startup_company', true);
            $role = get_post_meta(get_the_ID(), '_tn_startup_role', true);
            if ($company) :
            ?>
                <span class="tn-startup-company"><?php echo esc_html($company); ?></span>
            <?php endif; ?>
            <?php if ($role) : ?>
                <span class="tn-startup-role"><?php echo esc_html($role); ?></span>
            <?php endif; ?>
        </div>
    </div>

    <div class="tn-card-body">
        <p class="tn-card-excerpt"><?php echo esc_html( wp_trim_words( get_the_excerpt(), 20 ) ); ?></p>

        <?php
        $website = get_post_meta(get_the_ID(), '_tn_startup_website', true);
        $twitter = get_post_meta(get_the_ID(), '_tn_startup_twitter', true);
        $linkedin = get_post_meta(get_the_ID(), '_tn_startup_linkedin', true);
        ?>
        <div class="tn-startup-links">
            <?php if ($website) : ?>
                <a href="<?php echo esc_url($website); ?>" target="_blank" rel="noopener noreferrer" class="tn-startup-link tn-startup-link-website" aria-label="Website">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/></svg>
                </a>
            <?php endif; ?>
            <?php if ($twitter) : ?>
                <a href="<?php echo esc_url($twitter); ?>" target="_blank" rel="noopener noreferrer" class="tn-startup-link tn-startup-link-twitter" aria-label="Twitter">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" fill="currentColor"/></svg>
                </a>
            <?php endif; ?>
            <?php if ($linkedin) : ?>
                <a href="<?php echo esc_url($linkedin); ?>" target="_blank" rel="noopener noreferrer" class="tn-startup-link tn-startup-link-linkedin" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" fill="currentColor"/></svg>
                </a>
            <?php endif; ?>
        </div>

        <div class="tn-card-meta">
            <span class="tn-card-date"><?php echo esc_html( human_time_diff( get_the_time('U'), current_time('timestamp') ) ); ?> <?php esc_html_e('ago', 'technama'); ?></span>
            <?php if ($company) : ?>
                <span class="tn-card-read"><?php echo esc_html($company); ?></span>
            <?php endif; ?>
        </div>
    </div>
</article>
