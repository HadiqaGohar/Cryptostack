<?php
/**
 * The 404 template
 */

if (!defined('ABSPATH')) exit;

get_header();
?>

<div class="tn-container">
    <div class="tn-content-area">

        <div class="tn-404-page">

            <div class="tn-404-content">
                <span class="tn-404-number" aria-hidden="true">404</span>
                <h1 class="tn-404-title"><?php esc_html_e('Page Not Found', 'technama'); ?></h1>
                <p class="tn-404-message"><?php esc_html_e('The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.', 'technama'); ?></p>

                <div class="tn-404-search">
                    <?php get_search_form(); ?>
                </div>

                <div class="tn-404-actions">
                    <a href="<?php echo esc_url(home_url('/')); ?>" class="btn btn-primary">
                        <?php esc_html_e('Back to Homepage', 'technama'); ?>
                    </a>
                </div>
            </div>

            <?php
            $recent_args = array(
                'posts_per_page'      => 4,
                'post_status'         => 'publish',
                'ignore_sticky_posts' => 1,
                'meta_query'          => array(
                    array(
                        'key'     => '_thumbnail_id',
                        'compare' => 'EXISTS',
                    ),
                ),
            );
            $recent_query = new WP_Query($recent_args);

            if ($recent_query->have_posts()) :
            ?>
            <div class="tn-404-recent">
                <h2 class="tn-404-recent-title"><?php esc_html_e('You might also like', 'technama'); ?></h2>
                <div class="content-grid content-grid-2">
                    <?php while ($recent_query->have_posts()) : $recent_query->the_post(); ?>
                        <?php
                        $recent_cats         = get_the_category();
                        $recent_cat_name     = !empty($recent_cats) ? $recent_cats[0]->name : '';
                        $recent_reading_time = technama_get_reading_time();
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
                                <?php if ($recent_cat_name) : ?>
                                    <span class="card-category"><?php echo esc_html($recent_cat_name); ?></span>
                                <?php endif; ?>
                            </div>
                            <div class="card-body">
                                <h3 class="card-title">
                                    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                </h3>
                                <div class="card-meta">
                                    <span class="author"><?php echo esc_html(get_the_author()); ?></span>
                                    <span class="date">
                                        <time datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date()); ?></time>
                                    </span>
                                    <?php if ($recent_reading_time > 0) : ?>
                                        <span class="reading-time"><?php printf(esc_html__('%d min read', 'technama'), $recent_reading_time); ?></span>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </article>
                    <?php endwhile; ?>
                </div>
            </div>
            <?php
            wp_reset_postdata();
            endif;
            ?>

        </div>

    </div>
</div>

<?php get_footer(); ?>
