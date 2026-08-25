<?php
/**
 * The search results template
 */

if (!defined('ABSPATH')) exit;

get_header();
?>

<div class="tn-container">
    <div class="tn-content-area">

        <?php technama_breadcrumbs(); ?>

        <header class="page-header tn-search-header">
            <h1 class="page-title tn-search-title">
                <?php
                printf(
                    esc_html__('Search Results for: %s', 'technama'),
                    '<span class="search-query">' . esc_html(get_search_query()) . '</span>'
                );
                ?>
            </h1>
            <div class="tn-search-results-count">
                <?php
                global $wp_query;
                $total_results = $wp_query->found_posts;
                printf(
                    _n('%s result found', '%s results found', $total_results, 'technama'),
                    '<span class="results-count">' . number_format_i18n($total_results) . '</span>'
                );
                ?>
            </div>
        </header>

        <?php if (have_posts()) : ?>
            <div class="tn-search-results">
                <?php while (have_posts()) : the_post(); ?>
                    <?php
                    $search_cats        = get_the_category();
                    $search_cat_name    = !empty($search_cats) ? $search_cats[0]->name : '';
                    $search_reading_time = technama_get_reading_time();
                    $search_query       = get_search_query();
                    ?>
                    <article class="article-card article-card-horizontal">
                        <div class="card-image">
                            <a href="<?php the_permalink(); ?>" aria-label="<?php the_title_attribute(); ?>">
                                <?php if (has_post_thumbnail()) : ?>
                                    <?php the_post_thumbnail('technama-card', array('alt' => get_the_title())); ?>
                                <?php else : ?>
                                    <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/placeholder-card.jpg" alt="<?php the_title_attribute(); ?>">
                                <?php endif; ?>
                            </a>
                        </div>
                        <div class="card-body">
                            <?php if ($search_cat_name) : ?>
                                <span class="card-category"><?php echo esc_html($search_cat_name); ?></span>
                            <?php endif; ?>
                            <h2 class="card-title">
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </h2>
                            <p class="card-excerpt">
                                <?php
                                $excerpt = get_the_excerpt();
                                if ($search_query) {
                                    $excerpt = wp_strip_all_tags($excerpt);
                                    $highlighted = preg_replace(
                                        '/(' . preg_quote($search_query, '/') . ')/iu',
                                        '<mark>$1</mark>',
                                        $excerpt
                                    );
                                    echo wp_kses($highlighted, array('mark' => array()));
                                } else {
                                    echo esc_html(wp_trim_words($excerpt, 25));
                                }
                                ?>
                            </p>
                            <div class="card-meta">
                                <span class="author"><?php echo esc_html(get_the_author()); ?></span>
                                <span class="date">
                                    <time datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(get_the_date()); ?></time>
                                </span>
                                <?php if ($search_reading_time > 0) : ?>
                                    <span class="reading-time"><?php printf(esc_html__('%d min read', 'technama'), $search_reading_time); ?></span>
                                <?php endif; ?>
                            </div>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>

            <?php technama_pagination(); ?>

        <?php else : ?>
            <div class="no-results">
                <h2><?php esc_html_e('No Results Found', 'technama'); ?></h2>
                <p><?php esc_html_e('Sorry, but nothing matched your search terms. Please try again with different keywords.', 'technama'); ?></p>
                <div class="no-results-search">
                    <?php get_search_form(); ?>
                </div>
            </div>
        <?php endif; ?>

    </div>

    <?php get_sidebar(); ?>
</div>

<?php get_footer(); ?>
