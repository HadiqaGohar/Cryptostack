<?php
/**
 * Template part for displaying a post card
 * 
 * @package TechNama
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('tn-card tn-card-mini'); ?>>
    <?php if (has_post_thumbnail()) : ?>
        <div class="tn-card-image">
            <a href="<?php the_permalink(); ?>">
                <?php the_post_thumbnail('technama-thumb', array('loading' => 'lazy')); ?>
            </a>
        </div>
    <?php endif; ?>
    
    <div class="tn-card-content">
        <?php
        $categories = get_the_category();
        if (!empty($categories)) :
        ?>
            <span class="tn-card-category"><?php echo esc_html($categories[0]->name); ?></span>
        <?php endif; ?>
        
        <h3 class="tn-card-title">
            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
        </h3>
        
        <div class="tn-card-meta">
            <span class="tn-card-date"><?php echo esc_html( get_the_date() ); ?></span>
            <span class="tn-card-views"><?php echo esc_html( technama_get_post_views() ); ?> <?php esc_html_e('views', 'technama'); ?></span>
        </div>
    </div>
</article>
