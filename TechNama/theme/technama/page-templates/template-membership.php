<?php
/**
 * Template Name: Membership
 */
get_header();

$login_error = '';
$register_error = '';
$register_success = '';
$show_dashboard = false;
$user_bookmarks = array();

if (is_user_logged_in()) {
    $show_dashboard = true;
    $current_user = wp_get_current_user();
    $user_bookmarks = get_user_meta($current_user->ID, 'tn_bookmarks', true);
    if (!is_array($user_bookmarks)) $user_bookmarks = array();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['tn_login_nonce'])) {
        if (!wp_verify_nonce($_POST['tn_login_nonce'], 'tn_membership_login')) {
            $login_error = __('Security verification failed.', 'technama');
        } else {
            $credentials = array(
                'user_login'    => isset($_POST['login_username']) ? sanitize_user($_POST['login_username']) : '',
                'user_password' => isset($_POST['login_password']) ? $_POST['login_password'] : '',
                'remember'      => !empty($_POST['login_remember']),
            );
            $user = wp_signon($credentials, is_ssl());
            if (is_wp_error($user)) {
                $login_error = $user->get_error_message();
            } else {
                wp_redirect(home_url('/membership/'));
                exit;
            }
        }
    }

    if (isset($_POST['tn_register_nonce'])) {
        if (!wp_verify_nonce($_POST['tn_register_nonce'], 'tn_membership_register')) {
            $register_error = __('Security verification failed.', 'technama');
        } else {
            $reg_username = isset($_POST['reg_username']) ? sanitize_user($_POST['reg_username']) : '';
            $reg_email = isset($_POST['reg_email']) ? sanitize_email($_POST['reg_email']) : '';
            $reg_password = isset($_POST['reg_password']) ? $_POST['reg_password'] : '';
            $reg_confirm = isset($_POST['reg_confirm_password']) ? $_POST['reg_confirm_password'] : '';

            if (empty($reg_username)) $register_error = __('Username is required.', 'technama');
            elseif (empty($reg_email) || !is_email($reg_email)) $register_error = __('A valid email is required.', 'technama');
            elseif (strlen($reg_password) < 8) $register_error = __('Password must be at least 8 characters.', 'technama');
            elseif ($reg_password !== $reg_confirm) $register_error = __('Passwords do not match.', 'technama');
            elseif (username_exists($reg_username)) $register_error = __('Username already taken.', 'technama');
            elseif (email_exists($reg_email)) $register_error = __('Email already registered.', 'technama');

            if (empty($register_error)) {
                $user_id = wp_create_user($reg_username, $reg_password, $reg_email);
                if (!is_wp_error($user_id)) {
                    wp_update_user(array(
                        'ID'           => $user_id,
                        'display_name' => $reg_username,
                        'role'         => 'subscriber',
                    ));
                    $register_success = __('Account created successfully! You can now log in.', 'technama');
                } else {
                    $register_error = $user_id->get_error_message();
                }
            }
        }
    }
}
?>
<div class="tn-container">
    <div class="tn-page-header">
        <h1 class="tn-page-title"><?php esc_html_e('Member Portal', 'technama'); ?></h1>
        <p class="tn-page-subtitle"><?php esc_html_e('Join the TechNama community to bookmark articles, get personalized recommendations, and more', 'technama'); ?></p>
    </div>

    <?php if ($show_dashboard) :
        $current_user = wp_get_current_user();
    ?>
    <div class="tn-membership-dashboard">
        <div class="tn-dash-sidebar">
            <div class="tn-dash-profile">
                <div class="tn-dash-avatar">
                    <?php echo get_avatar($current_user->ID, 96); ?>
                </div>
                <h2 class="tn-dash-name"><?php echo esc_html($current_user->display_name); ?></h2>
                <p class="tn-dash-email"><?php echo esc_html($current_user->user_email); ?></p>
                <span class="tn-dash-role tn-badge"><?php echo esc_html(ucfirst($current_user->roles[0] ?? 'Member')); ?></span>
                <p class="tn-dash-joined"><?php esc_html_e('Member since', 'technama'); ?> <?php echo esc_html(date('M Y', strtotime($current_user->user_registered))); ?></p>
            </div>
            <nav class="tn-dash-nav">
                <button class="tn-dash-nav-btn active" data-tab="bookmarks">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
                    <?php esc_html_e('Bookmarks', 'technama'); ?>
                </button>
                <button class="tn-dash-nav-btn" data-tab="profile">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    <?php esc_html_e('Profile', 'technama'); ?>
                </button>
                <a href="<?php echo esc_url(wp_logout_url(home_url('/membership/'))); ?>" class="tn-dash-nav-btn tn-dash-logout">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
                    <?php esc_html_e('Log Out', 'technama'); ?>
                </a>
            </nav>
        </div>

        <div class="tn-dash-content">
            <div class="tn-dash-tab active" id="tab-bookmarks">
                <h2 class="tn-dash-tab-title"><?php esc_html_e('Your Bookmarks', 'technama'); ?></h2>
                <?php if (!empty($user_bookmarks)) : ?>
                    <div class="tn-bookmarks-list">
                        <?php
                        $bookmarked_posts = new WP_Query(array(
                            'post_type'      => array('post', 'video_review', 'deals', 'reviews'),
                            'post__in'       => $user_bookmarks,
                            'posts_per_page' => 20,
                            'orderby'        => 'post__in',
                        ));
                        if ($bookmarked_posts->have_posts()) :
                            while ($bookmarked_posts->have_posts()) : $bookmarked_posts->the_post();
                        ?>
                        <div class="tn-bookmark-item">
                            <div class="tn-bookmark-thumb">
                                <a href="<?php the_permalink(); ?>">
                                    <?php if (has_post_thumbnail()) : ?>
                                        <?php the_post_thumbnail('technama-thumb', array('loading' => 'lazy')); ?>
                                    <?php else : ?>
                                        <div class="tn-bookmark-placeholder"></div>
                                    <?php endif; ?>
                                </a>
                            </div>
                            <div class="tn-bookmark-info">
                                <h3 class="tn-bookmark-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                                <span class="tn-bookmark-date"><?php echo esc_html(get_the_date()); ?></span>
                            </div>
                            <button class="tn-bookmark-remove" data-post-id="<?php the_ID(); ?>" aria-label="<?php esc_attr_e('Remove bookmark', 'technama'); ?>">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                            </button>
                        </div>
                        <?php
                            endwhile;
                            wp_reset_postdata();
                        endif;
                        ?>
                    </div>
                <?php else : ?>
                    <div class="tn-dash-empty">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
                        <h3><?php esc_html_e('No bookmarks yet', 'technama'); ?></h3>
                        <p><?php esc_html_e('Start exploring and bookmark articles to read later!', 'technama'); ?></p>
                        <a href="<?php echo esc_url(home_url('/')); ?>" class="tn-btn tn-btn-primary"><?php esc_html_e('Browse Articles', 'technama'); ?></a>
                    </div>
                <?php endif; ?>
            </div>

            <div class="tn-dash-tab" id="tab-profile">
                <h2 class="tn-dash-tab-title"><?php esc_html_e('Profile Settings', 'technama'); ?></h2>
                <form method="post" class="tn-profile-form">
                    <?php wp_nonce_field('tn_profile_update', 'tn_profile_nonce'); ?>
                    <div class="tn-form-group">
                        <label for="display_name"><?php esc_html_e('Display Name', 'technama'); ?></label>
                        <input type="text" id="display_name" name="display_name" class="tn-form-control" value="<?php echo esc_attr($current_user->display_name); ?>">
                    </div>
                    <div class="tn-form-group">
                        <label for="user_email"><?php esc_html_e('Email Address', 'technama'); ?></label>
                        <input type="email" id="user_email" name="user_email" class="tn-form-control" value="<?php echo esc_attr($current_user->user_email); ?>">
                    </div>
                    <div class="tn-form-group">
                        <label for="user_url"><?php esc_html_e('Website', 'technama'); ?></label>
                        <input type="url" id="user_url" name="user_url" class="tn-form-control" value="<?php echo esc_attr($current_user->user_url); ?>">
                    </div>
                    <div class="tn-form-group">
                        <label for="description"><?php esc_html_e('Bio', 'technama'); ?></label>
                        <textarea id="description" name="description" class="tn-form-control tn-form-textarea" rows="4"><?php echo esc_textarea(get_user_meta($current_user->ID, 'description', true)); ?></textarea>
                    </div>
                    <div class="tn-form-actions">
                        <button type="submit" class="tn-btn tn-btn-primary"><?php esc_html_e('Save Changes', 'technama'); ?></button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <?php else : ?>
    <div class="tn-membership-auth">
        <div class="tn-auth-grid">
            <div class="tn-auth-card tn-auth-login">
                <h2 class="tn-auth-title">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"/></svg>
                    <?php esc_html_e('Sign In', 'technama'); ?>
                </h2>

                <?php if (!empty($login_error)) : ?>
                    <div class="tn-alert tn-alert-error"><?php echo esc_html($login_error); ?></div>
                <?php endif; ?>

                <form method="post" class="tn-auth-form">
                    <?php wp_nonce_field('tn_membership_login', 'tn_login_nonce'); ?>
                    <div class="tn-form-group">
                        <label for="login_username"><?php esc_html_e('Username or Email', 'technama'); ?></label>
                        <input type="text" id="login_username" name="login_username" class="tn-form-control" required autocomplete="username">
                    </div>
                    <div class="tn-form-group">
                        <label for="login_password"><?php esc_html_e('Password', 'technama'); ?></label>
                        <input type="password" id="login_password" name="login_password" class="tn-form-control" required autocomplete="current-password">
                    </div>
                    <div class="tn-form-row tn-form-row-between">
                        <label class="tn-checkbox-label">
                            <input type="checkbox" name="login_remember" value="1">
                            <?php esc_html_e('Remember me', 'technama'); ?>
                        </label>
                        <a href="<?php echo esc_url(wp_lostpassword_url()); ?>" class="tn-link"><?php esc_html_e('Forgot password?', 'technama'); ?></a>
                    </div>
                    <button type="submit" class="tn-btn tn-btn-primary tn-btn-block"><?php esc_html_e('Sign In', 'technama'); ?></button>
                </form>
            </div>

            <div class="tn-auth-divider">
                <span><?php esc_html_e('or', 'technama'); ?></span>
            </div>

            <div class="tn-auth-card tn-auth-register">
                <h2 class="tn-auth-title">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    <?php esc_html_e('Create Account', 'technama'); ?>
                </h2>

                <?php if (!empty($register_error)) : ?>
                    <div class="tn-alert tn-alert-error"><?php echo esc_html($register_error); ?></div>
                <?php endif; ?>
                <?php if (!empty($register_success)) : ?>
                    <div class="tn-alert tn-alert-success"><?php echo esc_html($register_success); ?></div>
                <?php endif; ?>

                <form method="post" class="tn-auth-form">
                    <?php wp_nonce_field('tn_membership_register', 'tn_register_nonce'); ?>
                    <div class="tn-form-group">
                        <label for="reg_username"><?php esc_html_e('Username', 'technama'); ?></label>
                        <input type="text" id="reg_username" name="reg_username" class="tn-form-control" required autocomplete="username" minlength="3">
                    </div>
                    <div class="tn-form-group">
                        <label for="reg_email"><?php esc_html_e('Email Address', 'technama'); ?></label>
                        <input type="email" id="reg_email" name="reg_email" class="tn-form-control" required autocomplete="email">
                    </div>
                    <div class="tn-form-group">
                        <label for="reg_password"><?php esc_html_e('Password', 'technama'); ?></label>
                        <input type="password" id="reg_password" name="reg_password" class="tn-form-control" required autocomplete="new-password" minlength="8">
                        <small class="tn-form-help"><?php esc_html_e('Minimum 8 characters', 'technama'); ?></small>
                    </div>
                    <div class="tn-form-group">
                        <label for="reg_confirm_password"><?php esc_html_e('Confirm Password', 'technama'); ?></label>
                        <input type="password" id="reg_confirm_password" name="reg_confirm_password" class="tn-form-control" required autocomplete="new-password">
                    </div>
                    <div class="tn-form-group">
                        <label class="tn-checkbox-label">
                            <input type="checkbox" required>
                            <?php printf(esc_html__('I agree to the %sTerms of Service%s and %sPrivacy Policy%s', 'technama'), '<a href="' . esc_url(home_url('/terms/')) . '" target="_blank">', '</a>', '<a href="' . esc_url(home_url('/privacy/')) . '" target="_blank">', '</a>'); ?>
                        </label>
                    </div>
                    <button type="submit" class="tn-btn tn-btn-primary tn-btn-block"><?php esc_html_e('Create Account', 'technama'); ?></button>
                </form>
            </div>
        </div>
    </div>
    <?php endif; ?>

    <?php if (!$show_dashboard) : ?>
    <div class="tn-member-benefits">
        <h2 class="tn-section-title"><?php esc_html_e('Member Benefits', 'technama'); ?></h2>
        <div class="tn-benefits-grid">
            <div class="tn-benefit-card">
                <div class="tn-benefit-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="currentColor"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
                </div>
                <h3 class="tn-benefit-title"><?php esc_html_e('Bookmark Articles', 'technama'); ?></h3>
                <p class="tn-benefit-desc"><?php esc_html_e('Save your favorite articles, reviews, and deals to your personal reading list for easy access later.', 'technama'); ?></p>
            </div>
            <div class="tn-benefit-card">
                <div class="tn-benefit-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
                </div>
                <h3 class="tn-benefit-title"><?php esc_html_e('Deal Alerts', 'technama'); ?></h3>
                <p class="tn-benefit-desc"><?php esc_html_e('Get notified about exclusive deals and discounts on the latest tech products and gadgets.', 'technama'); ?></p>
            </div>
            <div class="tn-benefit-card">
                <div class="tn-benefit-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </div>
                <h3 class="tn-benefit-title"><?php esc_html_e('Newsletter', 'technama'); ?></h3>
                <p class="tn-benefit-desc"><?php esc_html_e('Receive curated weekly digests with the top stories, deals, and insights from Pakistan\'s tech scene.', 'technama'); ?></p>
            </div>
            <div class="tn-benefit-card">
                <div class="tn-benefit-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                </div>
                <h3 class="tn-benefit-title"><?php esc_html_e('Community', 'technama'); ?></h3>
                <p class="tn-benefit-desc"><?php esc_html_e('Connect with fellow tech enthusiasts, founders, and industry professionals across Pakistan.', 'technama'); ?></p>
            </div>
        </div>
    </div>
    <?php endif; ?>
</div>
<?php get_footer(); ?>
