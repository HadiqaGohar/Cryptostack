<?php
/**
 * Template Name: Press Release
 */
get_header();

$submitted = isset($_GET['pr_submitted']) && $_GET['pr_submitted'] === '1';
?>
<div class="tn-container">
    <div class="tn-page-header">
        <h1 class="tn-page-title"><?php esc_html_e('Submit a Press Release', 'technama'); ?></h1>
        <p class="tn-page-subtitle"><?php esc_html_e('Share your company news with Pakistan\'s tech community. Submissions are reviewed before publishing.', 'technama'); ?></p>
    </div>

    <div class="tn-press-release-layout">
        <div class="tn-pr-main">
            <?php if ($submitted) : ?>
                <div class="tn-alert tn-alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                    <div>
                        <h3><?php esc_html_e('Press Release Submitted Successfully!', 'technama'); ?></h3>
                        <p><?php esc_html_e('Thank you for your submission. Our editorial team will review it and get back to you within 2-3 business days. You will receive an email notification once it is reviewed.', 'technama'); ?></p>
                    </div>
                </div>
            <?php endif; ?>

            <div class="tn-pr-form-wrapper">
                <h2 class="tn-pr-form-title"><?php esc_html_e('Press Release Submission Form', 'technama'); ?></h2>
                <p class="tn-pr-form-note"><?php esc_html_e('Fields marked with * are required.', 'technama'); ?></p>

                <form method="post" enctype="multipart/form-data" class="tn-pr-form" novalidate>
                    <?php wp_nonce_field('tn_press_release_nonce'); ?>

                    <fieldset class="tn-form-section">
                        <legend class="tn-form-section-title"><?php esc_html_e('Organization Details', 'technama'); ?></legend>

                        <div class="tn-form-row">
                            <div class="tn-form-group">
                                <label for="pr_organization"><?php esc_html_e('Organization Name', 'technama'); ?> <span class="required">*</span></label>
                                <input type="text" id="pr_organization" name="pr_organization" class="tn-form-control" required placeholder="<?php esc_attr_e('e.g. TechNama Pvt Ltd', 'technama'); ?>">
                            </div>
                        </div>

                        <div class="tn-form-row tn-form-row-2col">
                            <div class="tn-form-group">
                                <label for="pr_contact_name"><?php esc_html_e('Contact Person', 'technama'); ?> <span class="required">*</span></label>
                                <input type="text" id="pr_contact_name" name="pr_contact_name" class="tn-form-control" required placeholder="<?php esc_attr_e('Full name', 'technama'); ?>">
                            </div>
                            <div class="tn-form-group">
                                <label for="pr_contact_email"><?php esc_html_e('Contact Email', 'technama'); ?> <span class="required">*</span></label>
                                <input type="email" id="pr_contact_email" name="pr_contact_email" class="tn-form-control" required placeholder="<?php esc_attr_e('email@example.com', 'technama'); ?>">
                            </div>
                        </div>

                        <div class="tn-form-row">
                            <div class="tn-form-group">
                                <label for="pr_contact_phone"><?php esc_html_e('Contact Phone', 'technama'); ?></label>
                                <input type="tel" id="pr_contact_phone" name="pr_contact_phone" class="tn-form-control" placeholder="<?php esc_attr_e('+92-XXX-XXXXXXX', 'technama'); ?>">
                            </div>
                        </div>
                    </fieldset>

                    <fieldset class="tn-form-section">
                        <legend class="tn-form-section-title"><?php esc_html_e('Press Release Content', 'technama'); ?></legend>

                        <div class="tn-form-row">
                            <div class="tn-form-group">
                                <label for="pr_title"><?php esc_html_e('Headline / Title', 'technama'); ?> <span class="required">*</span></label>
                                <input type="text" id="pr_title" name="pr_title" class="tn-form-control" required placeholder="<?php esc_attr_e('Enter a compelling headline for your press release', 'technama'); ?>">
                            </div>
                        </div>

                        <div class="tn-form-row">
                            <div class="tn-form-group">
                                <label for="pr_content"><?php esc_html_e('Press Release Body', 'technama'); ?> <span class="required">*</span></label>
                                <textarea id="pr_content" name="pr_content" class="tn-form-control tn-form-textarea" rows="12" required placeholder="<?php esc_attr_e('Write your press release content here. Include key details: who, what, when, where, and why.', 'technama'); ?>"></textarea>
                            </div>
                        </div>

                        <div class="tn-form-row">
                            <div class="tn-form-group">
                                <label for="pr_attachments"><?php esc_html_e('Attachments (optional)', 'technama'); ?></label>
                                <p class="tn-form-help"><?php esc_html_e('Upload PDFs, images, or documents. Max 5MB per file. You can select multiple files.', 'technama'); ?></p>
                                <input type="file" id="pr_attachments" name="pr_attachments[]" class="tn-form-control tn-form-file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif">
                            </div>
                        </div>
                    </fieldset>

                    <div class="tn-form-actions">
                        <button type="submit" name="tn_press_release_submit" class="tn-btn tn-btn-primary tn-btn-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                            <?php esc_html_e('Submit Press Release', 'technama'); ?>
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <aside class="tn-pr-sidebar">
            <div class="tn-pr-info-card">
                <h3 class="tn-pr-info-title">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                    <?php esc_html_e('Submission Guidelines', 'technama'); ?>
                </h3>
                <ul class="tn-pr-guidelines">
                    <li><?php esc_html_e('Press releases are reviewed within 2-3 business days.', 'technama'); ?></li>
                    <li><?php esc_html_e('Content must be related to technology, startups, or digital innovation in Pakistan.', 'technama'); ?></li>
                    <li><?php esc_html_e('Include accurate facts, figures, and contact information.', 'technama'); ?></li>
                    <li><?php esc_html_e('We reserve the right to edit for clarity and style.', 'technama'); ?></li>
                    <li><?php esc_html_e('Promotional or spam content will be rejected.', 'technama'); ?></li>
                    <li><?php esc_html_e('Images and logos should be high resolution (min 800px wide).', 'technama'); ?></li>
                </ul>
            </div>

            <?php if (is_user_logged_in()) : ?>
            <div class="tn-pr-info-card">
                <h3 class="tn-pr-info-title">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
                    <?php esc_html_e('Your Previous Submissions', 'technama'); ?>
                </h3>
                <?php
                $my_releases = new WP_Query(array(
                    'post_type'      => 'press_release',
                    'posts_per_page' => 10,
                    'author'         => get_current_user_id(),
                    'orderby'        => 'date',
                    'order'          => 'DESC',
                ));
                if ($my_releases->have_posts()) :
                ?>
                <ul class="tn-pr-my-submissions">
                    <?php while ($my_releases->have_posts()) : $my_releases->the_post(); ?>
                        <li>
                            <a href="<?php the_permalink(); ?>" class="tn-pr-submission-link">
                                <span class="tn-pr-submission-title"><?php the_title(); ?></span>
                                <span class="tn-pr-submission-status tn-status-<?php echo esc_attr(get_post_status()); ?>">
                                    <?php
                                    $status_labels = array(
                                        'pending'  => __('Pending Review', 'technama'),
                                        'publish'  => __('Published', 'technama'),
                                        'draft'    => __('Draft', 'technama'),
                                        'trash'    => __('Trashed', 'technama'),
                                    );
                                    echo esc_html($status_labels[get_post_status()] ?? get_post_status());
                                    ?>
                                </span>
                                <span class="tn-pr-submission-date"><?php echo esc_html(get_the_date()); ?></span>
                            </a>
                        </li>
                    <?php endwhile; wp_reset_postdata(); ?>
                </ul>
                <?php else : ?>
                <p class="tn-pr-no-submissions"><?php esc_html_e('You have no previous submissions.', 'technama'); ?></p>
                <?php endif; ?>
            </div>
            <?php endif; ?>

            <div class="tn-pr-info-card">
                <h3 class="tn-pr-info-title">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                    <?php esc_html_e('Need Help?', 'technama'); ?>
                </h3>
                <p><?php esc_html_e('For urgent press releases or bulk submissions, contact us directly:', 'technama'); ?></p>
                <p><strong><?php esc_html_e('Email:', 'technama'); ?></strong> <a href="mailto:pr@technama.com">pr@technama.com</a></p>
                <p><strong><?php esc_html_e('Phone:', 'technama'); ?></strong> <a href="tel:+92XXXXXXXXXX">+92-XXX-XXXXXXX</a></p>
            </div>
        </aside>
    </div>
</div>
<?php get_footer(); ?>
