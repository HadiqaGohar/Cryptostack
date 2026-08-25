<?php
/**
 * Template Name: Contact Us
 */
get_header();

$contact_success = false;
$contact_errors = array();
$form_data = array(
    'name'    => '',
    'email'   => '',
    'subject' => '',
    'message' => '',
);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['tn_contact_nonce'])) {
    if (!wp_verify_nonce($_POST['tn_contact_nonce'], 'tn_contact_form')) {
        $contact_errors[] = __('Security verification failed. Please try again.', 'technama');
    } else {
        $form_data['name'] = isset($_POST['contact_name']) ? sanitize_text_field($_POST['contact_name']) : '';
        $form_data['email'] = isset($_POST['contact_email']) ? sanitize_email($_POST['contact_email']) : '';
        $form_data['subject'] = isset($_POST['contact_subject']) ? sanitize_text_field($_POST['contact_subject']) : '';
        $form_data['message'] = isset($_POST['contact_message']) ? sanitize_textarea_field($_POST['contact_message']) : '';

        if (empty($form_data['name'])) $contact_errors[] = __('Name is required.', 'technama');
        if (empty($form_data['email']) || !is_email($form_data['email'])) $contact_errors[] = __('A valid email is required.', 'technama');
        if (empty($form_data['subject'])) $contact_errors[] = __('Subject is required.', 'technama');
        if (empty($form_data['message'])) $contact_errors[] = __('Message is required.', 'technama');

        if (empty($contact_errors)) {
            $to = get_option('admin_email');
            $email_subject = sprintf('[%s] Contact Form: %s', get_bloginfo('name'), $form_data['subject']);
            $email_body = sprintf(
                "Name: %s\nEmail: %s\nSubject: %s\n\nMessage:\n%s",
                $form_data['name'],
                $form_data['email'],
                $form_data['subject'],
                $form_data['message']
            );
            $headers = array(
                'Content-Type: text/plain; charset=UTF-8',
                sprintf('Reply-To: %s <%s>', $form_data['name'], $form_data['email']),
            );

            $sent = wp_mail($to, $email_subject, $email_body, $headers);
            if ($sent) {
                $contact_success = true;
                $form_data = array('name' => '', 'email' => '', 'subject' => '', 'message' => '');
            } else {
                $contact_errors[] = __('Failed to send message. Please try again or email us directly.', 'technama');
            }
        }
    }
}
?>
<div class="tn-container">
    <div class="tn-page-header">
        <h1 class="tn-page-title"><?php esc_html_e('Contact Us', 'technama'); ?></h1>
        <p class="tn-page-subtitle"><?php esc_html_e('Have a question, tip, or feedback? We\'d love to hear from you.', 'technama'); ?></p>
    </div>

    <div class="tn-contact-layout">
        <div class="tn-contact-main">
            <?php if ($contact_success) : ?>
                <div class="tn-alert tn-alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                    <div>
                        <h3><?php esc_html_e('Message Sent Successfully!', 'technama'); ?></h3>
                        <p><?php esc_html_e('Thank you for reaching out. We will get back to you within 24-48 hours.', 'technama'); ?></p>
                    </div>
                </div>
            <?php endif; ?>

            <?php if (!empty($contact_errors)) : ?>
                <div class="tn-alert tn-alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>
                    <div>
                        <h3><?php esc_html_e('Please fix the following errors:', 'technama'); ?></h3>
                        <ul>
                            <?php foreach ($contact_errors as $error) : ?>
                                <li><?php echo esc_html($error); ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                </div>
            <?php endif; ?>

            <form method="post" class="tn-contact-form" novalidate>
                <?php wp_nonce_field('tn_contact_form', 'tn_contact_nonce'); ?>

                <div class="tn-form-row tn-form-row-2col">
                    <div class="tn-form-group">
                        <label for="contact_name"><?php esc_html_e('Your Name', 'technama'); ?> <span class="required">*</span></label>
                        <input type="text" id="contact_name" name="contact_name" class="tn-form-control" value="<?php echo esc_attr($form_data['name']); ?>" required placeholder="<?php esc_attr_e('John Doe', 'technama'); ?>">
                    </div>
                    <div class="tn-form-group">
                        <label for="contact_email"><?php esc_html_e('Email Address', 'technama'); ?> <span class="required">*</span></label>
                        <input type="email" id="contact_email" name="contact_email" class="tn-form-control" value="<?php echo esc_attr($form_data['email']); ?>" required placeholder="<?php esc_attr_e('john@example.com', 'technama'); ?>">
                    </div>
                </div>

                <div class="tn-form-group">
                    <label for="contact_subject"><?php esc_html_e('Subject', 'technama'); ?> <span class="required">*</span></label>
                    <select id="contact_subject" name="contact_subject" class="tn-form-control" required>
                        <option value=""><?php esc_html_e('Select a subject', 'technama'); ?></option>
                        <option value="general" <?php selected($form_data['subject'], 'general'); ?>><?php esc_html_e('General Inquiry', 'technama'); ?></option>
                        <option value="tip" <?php selected($form_data['subject'], 'tip'); ?>><?php esc_html_e('News Tip', 'technama'); ?></option>
                        <option value="feedback" <?php selected($form_data['subject'], 'feedback'); ?>><?php esc_html_e('Feedback', 'technama'); ?></option>
                        <option value="advertising" <?php selected($form_data['subject'], 'advertising'); ?>><?php esc_html_e('Advertising', 'technama'); ?></option>
                        <option value="partnership" <?php selected($form_data['subject'], 'partnership'); ?>><?php esc_html_e('Partnership', 'technama'); ?></option>
                        <option value="press-release" <?php selected($form_data['subject'], 'press-release'); ?>><?php esc_html_e('Press Release', 'technama'); ?></option>
                        <option value="bug-report" <?php selected($form_data['subject'], 'bug-report'); ?>><?php esc_html_e('Bug Report', 'technama'); ?></option>
                        <option value="other" <?php selected($form_data['subject'], 'other'); ?>><?php esc_html_e('Other', 'technama'); ?></option>
                    </select>
                </div>

                <div class="tn-form-group">
                    <label for="contact_message"><?php esc_html_e('Message', 'technama'); ?> <span class="required">*</span></label>
                    <textarea id="contact_message" name="contact_message" class="tn-form-control tn-form-textarea" rows="8" required placeholder="<?php esc_attr_e('Write your message here...', 'technama'); ?>"><?php echo esc_textarea($form_data['message']); ?></textarea>
                </div>

                <div class="tn-form-actions">
                    <button type="submit" class="tn-btn tn-btn-primary tn-btn-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                        <?php esc_html_e('Send Message', 'technama'); ?>
                    </button>
                </div>
            </form>
        </div>

        <aside class="tn-contact-sidebar">
            <div class="tn-contact-info-card">
                <h3 class="tn-contact-card-title"><?php esc_html_e('Office Address', 'technama'); ?></h3>
                <div class="tn-contact-address">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    <address>
                        <strong>TechNama</strong><br>
                        <?php esc_html_e('Karachi, Sindh', 'technama'); ?><br>
                        <?php esc_html_e('Pakistan', 'technama'); ?>
                    </address>
                </div>
            </div>

            <div class="tn-contact-info-card">
                <h3 class="tn-contact-card-title"><?php esc_html_e('Email Us', 'technama'); ?></h3>
                <ul class="tn-contact-emails">
                    <li>
                        <strong><?php esc_html_e('General', 'technama'); ?>:</strong>
                        <a href="mailto:info@technama.com">info@technama.com</a>
                    </li>
                    <li>
                        <strong><?php esc_html_e('Advertising', 'technama'); ?>:</strong>
                        <a href="mailto:ads@technama.com">ads@technama.com</a>
                    </li>
                    <li>
                        <strong><?php esc_html_e('Press & PR', 'technama'); ?>:</strong>
                        <a href="mailto:pr@technama.com">pr@technama.com</a>
                    </li>
                    <li>
                        <strong><?php esc_html_e('Careers', 'technama'); ?>:</strong>
                        <a href="mailto:careers@technama.com">careers@technama.com</a>
                    </li>
                </ul>
            </div>

            <div class="tn-contact-info-card">
                <h3 class="tn-contact-card-title"><?php esc_html_e('Follow Us', 'technama'); ?></h3>
                <div class="tn-contact-social">
                    <a href="#" class="tn-social-circle" target="_blank" rel="noopener" aria-label="Facebook">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href="#" class="tn-social-circle" target="_blank" rel="noopener" aria-label="Twitter">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                    <a href="#" class="tn-social-circle" target="_blank" rel="noopener" aria-label="LinkedIn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                    <a href="#" class="tn-social-circle" target="_blank" rel="noopener" aria-label="YouTube">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                </div>
            </div>

            <div class="tn-contact-map-placeholder">
                <div class="tn-map-placeholder">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                    <p><?php esc_html_e('Map coming soon', 'technama'); ?></p>
                </div>
            </div>
        </aside>
    </div>
</div>
<?php get_footer(); ?>
