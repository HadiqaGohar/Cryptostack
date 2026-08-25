<?php
/**
 * The main template file (fallback)
 */

if (!defined('ABSPATH')) exit;

get_header();
?>

<div class="tn-container">
    <div class="tn-content-area">
        <?php if (have_posts()) : ?>
            <div class="tn-post-grid">
                <?php while (have_posts()) : the_post(); ?>
                    <?php get_template_part('template-parts/content', 'article'); ?>
                <?php endwhile; ?>
            </div>
            <?php the_posts_pagination(); ?>
        <?php else : ?>
            <?php get_template_part('template-parts/content', 'none'); ?>
        <?php endif; ?>
    </div>
    <?php get_sidebar(); ?>
</div>

<?php get_footer(); ?>
