<div class="tn-ticker-item" data-id="<?php the_ID(); ?>">
    <span class="tn-ticker-label">Breaking</span>
    <a href="<?php the_permalink(); ?>" class="tn-ticker-link">
        <?php echo esc_html( get_the_title() ); ?>
    </a>
    <span class="tn-ticker-separator">&bull;</span>
</div>
