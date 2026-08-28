<?php
/**
 * Template part for displaying a message when no posts are found
 * 
 * @package TechNama
 */
?>

<article id="post-0" class="post no-results not-found">
    <header class="entry-header">
        <h1 class="entry-title"><?php _e('Nothing Found', 'technama'); ?></h1>
    </header>

    <div class="entry-content">
        <?php if (is_search()) : ?>
            <p><?php _e('Sorry, but nothing matched your search terms. Please try again with different keywords.', 'technama'); ?></p>
            <?php get_search_form(); ?>
        <?php elseif (is_home() || is_archive()) : ?>
            <p><?php _e('No posts have been published yet. Check back soon!', 'technama'); ?></p>
        <?php else : ?>
            <p><?php _e('It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'technama'); ?></p>
            <?php get_search_form(); ?>
        <?php endif; ?>
    </div>
</article>
