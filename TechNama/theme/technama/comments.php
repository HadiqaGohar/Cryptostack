<?php
/**
 * The comments template
 */

if (!defined('ABSPATH')) exit;

if (post_password_required()) {
    return;
}
?>

<div id="comments" class="comments-area">

    <?php if (have_comments()) : ?>
        <h2 class="comments-title">
            <?php
            $comment_count = get_comments_number();
            printf(
                _n('%1$s comment on &ldquo;%2$s&rdquo;', '%1$s comments on &ldquo;%2$s&rdquo;', $comment_count, 'technama'),
                '<span class="comment-count">' . number_format_i18n($comment_count) . '</span>',
                '<span class="comment-post-title">' . esc_html(get_the_title()) . '</span>'
            );
            ?>
        </h2>

        <ol class="comment-list">
            <?php
            wp_list_comments(array(
                'style'       => 'ol',
                'short_ping'  => true,
                'avatar_size' => 48,
                'callback'    => 'technama_comment_template',
            ));
            ?>
        </ol>

        <?php
        the_comments_navigation(array(
            'prev_text' => esc_html__('&laquo; Older Comments', 'technama'),
            'next_text' => esc_html__('Newer Comments &raquo;', 'technama'),
        ));
        ?>

    <?php endif; ?>

    <?php if (!comments_open() && get_comments_number() && post_type_supports(get_post_type(), 'comments')) : ?>
        <p class="no-comments"><?php esc_html_e('Comments are closed.', 'technama'); ?></p>
    <?php endif; ?>

    <?php comment_form(array(
        'class_form'          => 'comment-form',
        'title_reply'         => esc_html__('Leave a Comment', 'technama'),
        'title_reply_before'  => '<div id="respond" class="comment-respond"><h3 id="reply-title" class="comment-reply-title">',
        'title_reply_after'   => '</h3>',
        'cancel_reply_before' => ' <small>',
        'cancel_reply_after'  => '</small>',
        'comment_notes_after' => '</div>',
        'label_submit'        => esc_html__('Post Comment', 'technama'),
        'submit_button'       => '<div class="form-submit"><button type="submit" name="%1$s" id="%2$s" class="btn btn-primary">%4$s</button></div>',
    )); ?>

</div>

<?php
/**
 * Custom comment template callback
 */
function technama_comment_template($comment, $args, $depth) {
    $tag = ($args['style'] === 'div') ? 'div' : 'li';
    ?>
    <<?php echo $tag; ?> id="comment-<?php comment_ID(); ?>" <?php comment_class('comment-item'); ?>>
        <div class="comment-body">
            <div class="comment-avatar">
                <?php echo get_avatar($comment, $args['avatar_size']); ?>
            </div>
            <div class="comment-content">
                <div class="comment-header">
                    <span class="comment-author">
                        <?php
                        printf(
                            esc_html__('%s says', 'technama'),
                            '<strong>' . esc_html(get_comment_author_link()) . '</strong>'
                        );
                        ?>
                    </span>
                    <span class="comment-date">
                        <time datetime="<?php echo esc_attr(get_comment_date('c')); ?>">
                            <?php
                            printf(
                                esc_html__('%1$s at %2$s', 'technama'),
                                esc_html(get_comment_date()),
                                esc_html(get_comment_time())
                            );
                            ?>
                        </time>
                    </span>
                    <?php
                    comment_reply_link(array_merge($args, array(
                        'depth'     => $depth,
                        'max_depth' => $args['max_depth'],
                        'before'    => '<span class="comment-reply-link">',
                        'after'     => '</span>',
                    )));
                    ?>
                </div>
                <div class="comment-text">
                    <?php comment_text(); ?>
                </div>
            </div>
        </div>
    <?php
}
?>
