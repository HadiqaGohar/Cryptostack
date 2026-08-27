<?php
/**
 * The single post template
 */

if (!defined('ABSPATH')) exit;

get_header();
?>

<div class="tn-container">
    <div class="tn-content-area">

        <?php while (have_posts()) : the_post(); ?>
            <?php
            $categories     = get_the_category();
            $cat_name       = !empty($categories) ? $categories[0]->name : '';
            $cat_link       = !empty($categories) ? get_category_link($categories[0]->term_id) : '#';
            $reading_time   = technama_get_reading_time();
            $share_url      = urlencode(get_permalink());
            $share_title    = urlencode(get_the_title());
            $share_excerpt  = urlencode(wp_trim_words(get_the_excerpt(), 20));
            ?>

            <article id="post-<?php the_ID(); ?>" <?php post_class('tn-single-article'); ?>>

                <?php technama_breadcrumbs(); ?>

                <header class="entry-header tn-single-header">
                    <?php if ($cat_name) : ?>
                        <a href="<?php echo esc_url($cat_link); ?>" class="card-category"><?php echo esc_html($cat_name); ?></a>
                    <?php endif; ?>

                    <div class="single-post-meta">
                        <time class="meta-date" datetime="<?php echo esc_attr(get_the_date('c')); ?>">
                            <?php echo esc_html(get_the_date()); ?>
                        </time>
                        <span class="meta-separator">|</span>
                        <span class="meta-author"><?php echo esc_html(get_the_author()); ?></span>
                        <?php if ($reading_time > 0) : ?>
                            <span class="meta-separator">|</span>
                            <span class="meta-reading-time"><?php printf(esc_html__('%d min read', 'technama'), $reading_time); ?></span>
                        <?php endif; ?>
                    </div>

                    <h1 class="entry-title tn-single-title"><?php the_title(); ?></h1>
                </header>

                <?php if (has_post_thumbnail()) : ?>
                    <div class="tn-single-featured-image">
                        <?php the_post_thumbnail('technama-hero', array('alt' => get_the_title())); ?>
                    </div>
                <?php endif; ?>

                <div class="tn-single-content-wrapper">

                    <aside class="tn-social-share-sidebar" aria-label="<?php esc_attr_e('Share this article', 'technama'); ?>">
                        <div class="social-share-sticky">
                            <span class="share-label"><?php esc_html_e('Share', 'technama'); ?></span>
                            <a href="https://twitter.com/intent/tweet?url=<?php echo $share_url; ?>&text=<?php echo $share_title; ?>"
                               target="_blank" rel="noopener noreferrer" class="share-link share-twitter"
                               aria-label="<?php esc_attr_e('Share on Twitter', 'technama'); ?>">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </a>
                            <a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo $share_url; ?>"
                               target="_blank" rel="noopener noreferrer" class="share-link share-facebook"
                               aria-label="<?php esc_attr_e('Share on Facebook', 'technama'); ?>">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                            </a>
                            <a href="https://wa.me/?text=<?php echo $share_title; ?>%20<?php echo $share_url; ?>"
                               target="_blank" rel="noopener noreferrer" class="share-link share-whatsapp"
                               aria-label="<?php esc_attr_e('Share on WhatsApp', 'technama'); ?>">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                            </a>
                            <a href="https://t.me/share/url?url=<?php echo $share_url; ?>&text=<?php echo $share_title; ?>"
                               target="_blank" rel="noopener noreferrer" class="share-link share-telegram"
                               aria-label="<?php esc_attr_e('Share on Telegram', 'technama'); ?>">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                            </a>
                            <a href="mailto:?subject=<?php echo $share_title; ?>&body=<?php echo $share_url; ?>"
                               class="share-link share-email"
                               aria-label="<?php esc_attr_e('Share via Email', 'technama'); ?>">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                            </a>
                        </div>
                    </aside>

                    <div class="entry-content tn-single-body">
                        <?php the_content(); ?>

<!-- In-Article Ad -->
<div class="tn-ad-slot tn-ad-inarticle">
    <ins class="adsbygoogle"
         style="display:block; text-align:center;"
         data-ad-layout="in-article"
         data-ad-format="fluid"
         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
         data-ad-slot="XXXXXXXXXX"></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>
                    </div>

                </div>

                <?php
                if (is_active_sidebar('sponsor-banner')) :
                ?>
                <div class="tn-inline-sponsor">
                    <?php dynamic_sidebar('sponsor-banner'); ?>
                </div>
                <?php endif; ?>

                <?php technama_post_tags(); ?>

                <?php technama_author_bio(); ?>

                <?php technama_post_navigation(); ?>

            </article>

            <?php
            // Related Articles
            $related_posts = technama_get_related_posts(3);
            if (!empty($related_posts)) :
            ?>
            <section class="tn-related-posts">
                <div class="section-header">
                    <h2><?php esc_html_e('Related Articles', 'technama'); ?></h2>
                </div>
                <div class="content-grid">
                    <?php foreach ($related_posts as $post) : setup_postdata($post); ?>
                        <?php
                        $rel_cats         = get_the_category();
                        $rel_cat_name     = !empty($rel_cats) ? $rel_cats[0]->name : '';
                        $rel_reading_time = technama_get_reading_time($post->ID);
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
                                <?php if ($rel_cat_name) : ?>
                                    <span class="card-category"><?php echo esc_html($rel_cat_name); ?></span>
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
                                    <?php if ($rel_reading_time > 0) : ?>
                                        <span class="reading-time"><?php printf(esc_html__('%d min read', 'technama'), $rel_reading_time); ?></span>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </article>
                    <?php endforeach; ?>
                </div>
            </section>
            <?php
            wp_reset_postdata();
            endif;
            ?>

            <?php
            if (comments_open() || get_comments_number()) :
                comments_template();
            endif;
            ?>

        <?php endwhile; ?>

    </div>

    <?php get_sidebar(); ?>
</div>

<?php get_footer(); ?>
