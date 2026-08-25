<?php
/**
 * TechNama Template Tags
 * Custom template functions for use in templates
 */

if (!defined('ABSPATH')) exit;

/**
 * Display post meta information
 */
function technama_post_meta() {
    $categories = get_the_category();
    $category_name = !empty($categories) ? $categories[0]->name : '';
    $category_link = !empty($categories) ? get_category_link($categories[0]->term_id) : '';
    $reading_time = technama_get_reading_time();

    echo '<div class="card-meta">';
    if ($category_name) {
        printf('<a href="%s" class="meta-category">%s</a>', esc_url($category_link), esc_html($category_name));
    }
    echo '<span class="meta-separator">|</span>';
    printf('<span class="meta-author">By %s</span>', esc_html(get_the_author()));
    echo '<span class="meta-separator">|</span>';
    printf('<time class="meta-date" datetime="%s">%s</time>', esc_attr(get_the_date('c')), esc_html(get_the_date()));
    if ($reading_time > 0) {
        echo '<span class="meta-separator">|</span>';
        printf('<span class="meta-reading-time">%d min read</span>', $reading_time);
    }
    echo '</div>';
}

/**
 * Display post meta for single post
 */
function technama_single_post_meta() {
    $categories = get_the_category();
    $tags = get_the_tags();
    $reading_time = technama_get_reading_time();

    echo '<div class="single-post-meta">';
    echo '<div class="meta-left">';

    if (!empty($categories)) {
        printf('<a href="%s" class="meta-category">%s</a>', esc_url(get_category_link($categories[0]->term_id)), esc_html($categories[0]->name));
    }

    echo '<time class="meta-date" datetime="' . esc_attr(get_the_date('c')) . '">' . esc_html(get_the_date()) . '</time>';

    if ($reading_time > 0) {
        printf('<span class="meta-reading-time">%d min read</span>', $reading_time);
    }

    echo '</div>';
    echo '<div class="meta-right">';

    echo '<div class="share-buttons">';
    echo '<span class="share-label">Share:</span>';
    printf('<a href="https://twitter.com/intent/tweet?url=%s&text=%s" target="_blank" rel="noopener" class="share-twitter">Twitter</a>', esc_url(get_permalink()), esc_attr(get_the_title()));
    printf('<a href="https://www.facebook.com/sharer/sharer.php?u=%s" target="_blank" rel="noopener" class="share-facebook">Facebook</a>', esc_url(get_permalink()));
    printf('<a href="https://wa.me/?text=%s%%20%s" target="_blank" rel="noopener" class="share-whatsapp">WhatsApp</a>', esc_attr(get_the_title()), esc_url(get_permalink()));
    echo '</div>';

    echo '</div>';
    echo '</div>';
}

/**
 * Get reading time for a post
 */
function technama_get_reading_time($post_id = 0) {
    if (!$post_id) {
        global $post;
        $post_id = $post->ID;
    }

    $content = get_post_field('post_content', $post_id);
    $word_count = str_word_count(strip_tags($content));
    return max(1, ceil($word_count / 200));
}

/**
 * Display breadcrumb navigation
 */
function technama_breadcrumbs() {
    if (is_front_page()) return;

    echo '<nav class="breadcrumbs" aria-label="Breadcrumb">';
    echo '<a href="' . esc_url(home_url('/')) . '">Home</a>';

    if (is_category()) {
        echo '<span class="separator">/</span>';
        single_cat_title('', true);
    } elseif (is_tag()) {
        echo '<span class="separator">/</span>';
        single_tag_title('', true);
    } elseif (is_search()) {
        echo '<span class="separator">/</span>';
        echo 'Search Results for: ' . esc_html(get_search_query());
    } elseif (is_single()) {
        $categories = get_the_category();
        if (!empty($categories)) {
            echo '<span class="separator">/</span>';
            echo '<a href="' . esc_url(get_category_link($categories[0]->term_id)) . '">' . esc_html($categories[0]->name) . '</a>';
        }
        echo '<span class="separator">/</span>';
        echo '<span class="current">' . esc_html(get_the_title()) . '</span>';
    } elseif (is_page()) {
        echo '<span class="separator">/</span>';
        echo '<span class="current">' . esc_html(get_the_title()) . '</span>';
    } elseif (is_archive()) {
        echo '<span class="separator">/</span>';
        echo '<span class="current">' . esc_html(get_the_archive_title()) . '</span>';
    }

    echo '</nav>';
}

/**
 * Display category badges on cards
 */
function technama_category_badge($echo = true) {
    $categories = get_the_category();
    if (empty($categories)) return;

    $html = sprintf(
        '<span class="card-category" style="background-color: %s;">%s</span>',
        esc_attr(technama_get_category_color($categories[0]->term_id)),
        esc_html($categories[0]->name)
    );

    if ($echo) {
        echo $html;
    }
    return $html;
}

/**
 * Get category color
 */
function technama_get_category_color($category_id) {
    $color = get_term_meta($category_id, 'category_color', true);
    if (empty($color)) {
        $color = '#0881BE';
    }
    return $color;
}

/**
 * Display author avatar
 */
function technama_author_avatar($size = 48) {
    $author_id = get_the_author_meta('ID');
    $avatar = get_avatar($author_id, $size);
    echo '<div class="author-avatar">' . $avatar . '</div>';
}

/**
 * Display pagination
 */
function technama_pagination() {
    the_posts_pagination(array(
        'mid_size'  => 2,
        'prev_text' => '&laquo; Previous',
        'next_text' => 'Next &raquo;',
        'class'     => 'pagination',
    ));
}

/**
 * Display related posts
 */
function technama_related_posts($count = 3) {
    $posts = technama_get_related_posts($count);
    if (empty($posts)) return;

    echo '<div class="content-grid content-grid-' . esc_attr($count) . '">';
    foreach ($posts as $post) {
        setup_postdata($post);
        get_template_part('template-parts/content', 'card');
    }
    wp_reset_postdata();
    echo '</div>';
}

/**
 * Display social share buttons
 */
function technama_social_share() {
    $url = urlencode(get_permalink());
    $title = urlencode(get_the_title());
    $excerpt = urlencode(wp_trim_words(get_the_excerpt(), 20));

    echo '<div class="social-share">';
    printf('<a href="https://twitter.com/intent/tweet?url=%s&text=%s" target="_blank" rel="noopener" class="share-link share-twitter">Twitter</a>', $url, $title);
    printf('<a href="https://www.facebook.com/sharer/sharer.php?u=%s" target="_blank" rel="noopener" class="share-link share-facebook">Facebook</a>', $url);
    printf('<a href="https://wa.me/?text=%s%%20%s" target="_blank" rel="noopener" class="share-link share-whatsapp">WhatsApp</a>', $title, $url);
    printf('<a href="https://t.me/share/url?url=%s&text=%s" target="_blank" rel="noopener" class="share-link share-telegram">Telegram</a>', $url, $title);
    printf('<a href="mailto:?subject=%s&body=%s" class="share-link share-email">Email</a>', $title, $url);
    echo '</div>';
}

/**
 * Display newsletter signup form
 */
function technama_newsletter_form() {
    $newsletter_url = get_theme_mod('technama_newsletter_url', '#');
    echo '<div class="newsletter-form">';
    echo '<form action="' . esc_url($newsletter_url) . '" method="post" target="_blank" rel="noopener">';
    echo '<input type="email" name="EMAIL" placeholder="Your email address" required>';
    echo '<button type="submit" class="btn btn-primary btn-sm">Subscribe</button>';
    echo '</form>';
    echo '</div>';
}

/**
 * Display popular posts widget
 */
function technama_popular_posts($count = 5) {
    $posts = technama_get_trending_posts($count);
    if (empty($posts)) return;

    echo '<div class="widget_recent_entries">';
    foreach ($posts as $post) {
        setup_postdata($post);
        $views = (int) get_post_meta($post->ID, 'post_views_count', true);
        echo '<div class="post-item">';
        echo '<div class="post-thumb">';
        echo '<a href="' . esc_url(get_permalink()) . '">';
        if (has_post_thumbnail()) {
            the_post_thumbnail('technama-thumb');
        }
        echo '</a>';
        echo '</div>';
        echo '<div class="post-info">';
        echo '<h4 class="post-title"><a href="' . esc_url(get_permalink()) . '">' . esc_html(get_the_title()) . '</a></h4>';
        echo '<span class="post-date">' . esc_html(get_the_date()) . '</span>';
        echo '</div>';
        echo '</div>';
    }
    wp_reset_postdata();
    echo '</div>';
}

/**
 * Post view count display
 */
function technama_post_views() {
    $views = (int) get_post_meta(get_the_ID(), 'post_views_count', true);
    printf('<span class="post-views">%s %s</span>', number_format_i18n($views), _n('view', 'views', $views, 'technama'));
}

/**
 * Calculate and display total word count
 */
function technama_word_count() {
    global $post;
    $count = str_word_count(strip_tags($post->post_content));
    printf('%s %s', number_format_i18n($count), __('words', 'technama'));
}

/**
 * Display post navigation with thumbnails
 */
function technama_post_navigation() {
    $prev = get_previous_post();
    $next = get_next_post();

    if (!$prev && !$next) return;

    echo '<nav class="post-navigation">';
    echo '<div class="nav-links">';

    if ($prev) {
        echo '<div class="nav-previous">';
        echo '<span class="nav-label">&larr; Previous</span>';
        echo '<a class="nav-title" href="' . esc_url(get_permalink($prev)) . '">' . esc_html(get_the_title($prev)) . '</a>';
        echo '</div>';
    }

    if ($next) {
        echo '<div class="nav-next">';
        echo '<span class="nav-label">Next &rarr;</span>';
        echo '<a class="nav-title" href="' . esc_url(get_permalink($next)) . '">' . esc_html(get_the_title($next)) . '</a>';
        echo '</div>';
    }

    echo '</div>';
    echo '</nav>';
}

/**
 * Display post tags
 */
function technama_post_tags() {
    $tags = get_the_tags();
    if (empty($tags)) return;

    echo '<div class="post-tags">';
    echo '<span class="tags-label">Tags:</span>';
    foreach ($tags as $tag) {
        printf('<a href="%s" class="post-tag">%s</a>', esc_url(get_tag_link($tag->term_id)), esc_html($tag->name));
    }
    echo '</div>';
}

/**
 * Display author bio box
 */
function technama_author_bio() {
    $author_id = get_the_author_meta('ID');
    ?>
    <div class="author-box">
        <div class="author-avatar">
            <?php echo get_avatar($author_id, 80); ?>
        </div>
        <div class="author-info">
            <h4 class="author-name">
                <a href="<?php echo esc_url(get_author_posts_url($author_id)); ?>">
                    <?php echo esc_html(get_the_author()); ?>
                </a>
            </h4>
            <p class="author-description"><?php echo esc_html(get_the_author_meta('description')); ?></p>
            <p class="author-posts-count">
                <?php
                $post_count = count_user_posts($author_id);
                printf(
                    _n('%s post', '%s posts', $post_count, 'technama'),
                    number_format_i18n($post_count)
                );
                ?>
            </p>
        </div>
    </div>
    <?php
}
