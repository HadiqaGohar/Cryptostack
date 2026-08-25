<?php
/**
 * The archive template
 */

if (!defined('ABSPATH')) exit;

get_header();
?>

<div class="tn-container">
    <div class="tn-content-area">

        <header class="page-header tn-archive-header">
            <?php the_archive_title('<h1 class="page-title tn-archive-title">', '</h1>'); ?>
            <?php the_archive_description('<div class="archive-description tn-archive-desc">', '</div>'); ?>
        </header>

        <?php technama_breadcrumbs(); ?>

        <?php if (have_posts()) : ?>
            <div class="content-grid">
                <?php while (have_posts()) : the_post(); ?>
                    <?php
                    $arc_categories     = get_the_category();
                    $arc_cat_name       = !empty($arc_categories) ? $arc_categories[0]->name : '';
                    $arc_reading_time   = technama_get_reading_time();
                    ?>
                    <article class="article-card">
                        <div class="card-image">
                            <a href="<?php the_permalink(); ?>" aria-label="<?php the_title_attribute(); ?>">
                                <?php if (has_post_thumbnail()) : ?>
                                    <?php the_post_thumbnail('technama-card', array('alt' => get_the_title())); ?>
                                <?php else : ?>
                                    <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/placeholder-card.jpg" alt="<?php the_title_attribute(); ?>">
                                <?php endif; ?>
                            </a>
                            <?php if ($arc_cat_name) : ?>
                                <span class="card-category"><?php echo esc_html($arc_cat_name); ?></span>
                            <?php endif; ?>
                        </div>
                        <div class="card-body">
                            <h2 class="card-title">
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </h2>
                            <p class="card-excerpt"><?php echo esc_html(wp_trim_words(get_the_excerpt(), 20)); ?></p>
                            <div class="card-meta">
                                <span class="author"><?php echo esc_html(get_the_author()); ?></span>
                                <span class="date">
                                    <time datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date()); ?></time>
                                </span>
                                <?php if ($arc_reading_time > 0) : ?>
                                    <span class="reading-time"><?php printf(esc_html__('%d min read', 'technama'), $arc_reading_time); ?></span>
                                <?php endif; ?>
                            </div>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>

            <?php technama_pagination(); ?>

        <?php else : ?>
            <div class="no-results">
                <h2><?php esc_html_e('Nothing Found', 'technama'); ?></h2>
                <p><?php esc_html_e('It seems we can&rsquo;t find what you&rsquo;re looking for. Try searching?', 'technama'); ?></p>
                <?php get_search_form(); ?>
            </div>
        <?php endif; ?>

    </div>

    <?php get_sidebar(); ?>
</div>

<?php get_footer(); ?>
