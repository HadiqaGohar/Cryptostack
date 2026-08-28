<?php
/**
 * Template Name: Advertise
 */
get_header();

$ad_success = false;
$ad_errors = array();
$ad_form = array(
    'advertiser_name'    => '',
    'advertiser_email'   => '',
    'advertiser_company' => '',
    'ad_budget'          => '',
    'ad_message'         => '',
);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['tn_advertise_nonce'])) {
    if (!wp_verify_nonce($_POST['tn_advertise_nonce'], 'tn_advertise_submit')) {
        $ad_errors[] = __('Security verification failed. Please try again.', 'technama');
    } else {
        $ad_form['advertiser_name'] = isset($_POST['advertiser_name']) ? sanitize_text_field($_POST['advertiser_name']) : '';
        $ad_form['advertiser_email'] = isset($_POST['advertiser_email']) ? sanitize_email($_POST['advertiser_email']) : '';
        $ad_form['advertiser_company'] = isset($_POST['advertiser_company']) ? sanitize_text_field($_POST['advertiser_company']) : '';
        $ad_form['ad_budget'] = isset($_POST['ad_budget']) ? sanitize_text_field($_POST['ad_budget']) : '';
        $ad_form['ad_message'] = isset($_POST['ad_message']) ? sanitize_textarea_field($_POST['ad_message']) : '';

        if (empty($ad_form['advertiser_name'])) $ad_errors[] = __('Name is required.', 'technama');
        if (empty($ad_form['advertiser_email']) || !is_email($ad_form['advertiser_email'])) $ad_errors[] = __('A valid email is required.', 'technama');
        if (empty($ad_form['advertiser_company'])) $ad_errors[] = __('Company name is required.', 'technama');
        if (empty($ad_form['ad_message'])) $ad_errors[] = __('Please tell us about your advertising goals.', 'technama');

        if (empty($ad_errors)) {
            $to = get_option('admin_email');
            $email_subject = sprintf('[%s] Advertising Inquiry from %s', get_bloginfo('name'), $ad_form['advertiser_company']);
            $email_body = sprintf(
                "New advertising inquiry:\n\nName: %s\nEmail: %s\nCompany: %s\nBudget: %s\n\nMessage:\n%s",
                $ad_form['advertiser_name'],
                $ad_form['advertiser_email'],
                $ad_form['advertiser_company'],
                $ad_form['ad_budget'],
                $ad_form['ad_message']
            );
            $headers = array(
                'Content-Type: text/plain; charset=UTF-8',
                sprintf('Reply-To: %s <%s>', $ad_form['advertiser_name'], $ad_form['advertiser_email']),
            );

            $sent = wp_mail($to, $email_subject, $email_body, $headers);
            if ($sent) {
                $ad_success = true;
                $ad_form = array('advertiser_name' => '', 'advertiser_email' => '', 'advertiser_company' => '', 'ad_budget' => '', 'ad_message' => '');
            } else {
                $ad_errors[] = __('Failed to send inquiry. Please email us directly at ads@technama.com', 'technama');
            }
        }
    }
}
?>
<div class="tn-container">
    <div class="tn-page-header tn-page-header-advertise">
        <h1 class="tn-page-title"><?php esc_html_e('Advertise on TechNama', 'technama'); ?></h1>
        <p class="tn-page-subtitle"><?php esc_html_e('Reach Pakistan\'s most engaged tech audience. Over 10,000 monthly readers who are decision-makers, early adopters, and tech enthusiasts.', 'technama'); ?></p>
    </div>

    <section class="tn-ad-stats-bar">
        <div class="tn-ad-stat">
            <span class="tn-ad-stat-number">10K+</span>
            <span class="tn-ad-stat-label"><?php esc_html_e('Monthly Readers', 'technama'); ?></span>
        </div>
        <div class="tn-ad-stat">
            <span class="tn-ad-stat-number">500K+</span>
            <span class="tn-ad-stat-label"><?php esc_html_e('Page Views/Month', 'technama'); ?></span>
        </div>
        <div class="tn-ad-stat">
            <span class="tn-ad-stat-number">25K+</span>
            <span class="tn-ad-stat-label"><?php esc_html_e('Social Followers', 'technama'); ?></span>
        </div>
        <div class="tn-ad-stat">
            <span class="tn-ad-stat-number">60%</span>
            <span class="tn-ad-stat-label"><?php esc_html_e('Ages 25-44', 'technama'); ?></span>
        </div>
    </section>

    <section class="tn-ad-mediakit">
        <div class="tn-section-header">
            <span class="tn-section-label"><?php esc_html_e('Media Kit', 'technama'); ?></span>
            <h2 class="tn-section-title"><?php esc_html_e('Advertising Options & Placements', 'technama'); ?></h2>
            <p class="tn-section-desc"><?php esc_html_e('Choose from a variety of ad formats designed to maximize visibility and engagement.', 'technama'); ?></p>
        </div>

        <div class="tn-ad-placements">
            <div class="tn-ad-placement-card">
                <div class="tn-ad-placement-preview tn-ad-preview-leaderboard">
                    <div class="tn-ad-visual">
                        <span class="tn-ad-size-label">728 x 90</span>
                        <div class="tn-ad-box"></div>
                    </div>
                    <span class="tn-ad-position-tag"><?php esc_html_e('Header Leaderboard', 'technama'); ?></span>
                </div>
                <div class="tn-ad-placement-info">
                    <h3><?php esc_html_e('Header Leaderboard', 'technama'); ?></h3>
                    <p><?php esc_html_e('Premium banner placement visible across all pages, positioned prominently in the header area.', 'technama'); ?></p>
                    <ul class="tn-ad-placement-specs">
                        <li><strong><?php esc_html_e('Size:', 'technama'); ?></strong> 728x90 px</li>
                        <li><strong><?php esc_html_e('Format:', 'technama'); ?></strong> <?php esc_html_e('Image, HTML5', 'technama'); ?></li>
                        <li><strong><?php esc_html_e('Position:', 'technama'); ?></strong> <?php esc_html_e('Every page - header', 'technama'); ?></li>
                    </ul>
                </div>
            </div>

            <div class="tn-ad-placement-card">
                <div class="tn-ad-placement-preview tn-ad-preview-sidebar">
                    <div class="tn-ad-visual">
                        <span class="tn-ad-size-label">300 x 250</span>
                        <div class="tn-ad-box tn-ad-box-square"></div>
                    </div>
                    <span class="tn-ad-position-tag"><?php esc_html_e('Sidebar Rectangle', 'technama'); ?></span>
                </div>
                <div class="tn-ad-placement-info">
                    <h3><?php esc_html_e('Sidebar Rectangle', 'technama'); ?></h3>
                    <p><?php esc_html_e('High-visibility sidebar ad that follows readers through articles and category pages.', 'technama'); ?></p>
                    <ul class="tn-ad-placement-specs">
                        <li><strong><?php esc_html_e('Size:', 'technama'); ?></strong> 300x250 px</li>
                        <li><strong><?php esc_html_e('Format:', 'technama'); ?></strong> <?php esc_html_e('Image, HTML5, Native', 'technama'); ?></li>
                        <li><strong><?php esc_html_e('Position:', 'technama'); ?></strong> <?php esc_html_e('Article & archive pages - sidebar', 'technama'); ?></li>
                    </ul>
                </div>
            </div>

            <div class="tn-ad-placement-card">
                <div class="tn-ad-placement-preview tn-ad-preview-inarticle">
                    <div class="tn-ad-visual">
                        <span class="tn-ad-size-label">300 x 600</span>
                        <div class="tn-ad-box tn-ad-box-half-page"></div>
                    </div>
                    <span class="tn-ad-position-tag"><?php esc_html_e('In-Article Half Page', 'technama'); ?></span>
                </div>
                <div class="tn-ad-placement-info">
                    <h3><?php esc_html_e('In-Article Half Page', 'technama'); ?></h3>
                    <p><?php esc_html_e('Immersive ad format placed between article content for maximum reader engagement.', 'technama'); ?></p>
                    <ul class="tn-ad-placement-specs">
                        <li><strong><?php esc_html_e('Size:', 'technama'); ?></strong> 300x600 px</li>
                        <li><strong><?php esc_html_e('Format:', 'technama'); ?></strong> <?php esc_html_e('Image, HTML5', 'technama'); ?></li>
                        <li><strong><?php esc_html_e('Position:', 'technama'); ?></strong> <?php esc_html_e('Mid-article - desktop sidebar', 'technama'); ?></li>
                    </ul>
                </div>
            </div>

            <div class="tn-ad-placement-card">
                <div class="tn-ad-placement-preview tn-ad-preview-native">
                    <div class="tn-ad-visual">
                        <span class="tn-ad-size-label"><?php esc_html_e('Native', 'technama'); ?></span>
                        <div class="tn-ad-box tn-ad-box-native"></div>
                    </div>
                    <span class="tn-ad-position-tag"><?php esc_html_e('Sponsored Content', 'technama'); ?></span>
                </div>
                <div class="tn-ad-placement-info">
                    <h3><?php esc_html_e('Sponsored Content', 'technama'); ?></h3>
                    <p><?php esc_html_e('Native advertising format that blends seamlessly with editorial content. Includes article writing service.', 'technama'); ?></p>
                    <ul class="tn-ad-placement-specs">
                        <li><strong><?php esc_html_e('Format:', 'technama'); ?></strong> <?php esc_html_e('Branded article, review, or feature', 'technama'); ?></li>
                        <li><strong><?php esc_html_e('Includes:', 'technama'); ?></strong> <?php esc_html_e('Writing, images, social promotion', 'technama'); ?></li>
                        <li><strong><?php esc_html_e('Position:', 'technama'); ?></strong> <?php esc_html_e('Homepage & category feeds', 'technama'); ?></li>
                    </ul>
                </div>
            </div>

            <div class="tn-ad-placement-card">
                <div class="tn-ad-placement-preview tn-ad-preview-video">
                    <div class="tn-ad-visual">
                        <span class="tn-ad-size-label"><?php esc_html_e('Video', 'technama'); ?></span>
                        <div class="tn-ad-box tn-ad-box-video"></div>
                    </div>
                    <span class="tn-ad-position-tag"><?php esc_html_e('Video Pre-Roll', 'technama'); ?></span>
                </div>
                <div class="tn-ad-placement-info">
                    <h3><?php esc_html_e('Video Pre-Roll', 'technama'); ?></h3>
                    <p><?php esc_html_e('Advertise before TechNama video reviews and live show replays on YouTube and our website.', 'technama'); ?></p>
                    <ul class="tn-ad-placement-specs">
                        <li><strong><?php esc_html_e('Duration:', 'technama'); ?></strong> <?php esc_html_e('15-30 seconds', 'technama'); ?></li>
                        <li><strong><?php esc_html_e('Format:', 'technama'); ?></strong> <?php esc_html_e('MP4, WebM', 'technama'); ?></li>
                        <li><strong><?php esc_html_e('Placement:', 'technama'); ?></strong> <?php esc_html_e('YouTube & embedded players', 'technama'); ?></li>
                    </ul>
                </div>
            </div>

            <div class="tn-ad-placement-card">
                <div class="tn-ad-placement-preview tn-ad-preview-newsletter">
                    <div class="tn-ad-visual">
                        <span class="tn-ad-size-label"><?php esc_html_e('Newsletter', 'technama'); ?></span>
                        <div class="tn-ad-box tn-ad-box-newsletter"></div>
                    </div>
                    <span class="tn-ad-position-tag"><?php esc_html_e('Newsletter Sponsorship', 'technama'); ?></span>
                </div>
                <div class="tn-ad-placement-info">
                    <h3><?php esc_html_e('Newsletter Sponsorship', 'technama'); ?></h3>
                    <p><?php esc_html_e('Sponsor our weekly tech newsletter sent directly to engaged subscribers in Pakistan.', 'technama'); ?></p>
                    <ul class="tn-ad-placement-specs">
                        <li><strong><?php esc_html_e('Format:', 'technama'); ?></strong> <?php esc_html_e('Banner or text ad', 'technama'); ?></li>
                        <li><strong><?php esc_html_e('Frequency:', 'technama'); ?></strong> <?php esc_html_e('Weekly send', 'technama'); ?></li>
                        <li><strong><?php esc_html_e('Includes:', 'technama'); ?></strong> <?php esc_html_e('Logo, CTA link, social mention', 'technama'); ?></li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <section class="tn-ad-pricing">
        <div class="tn-section-header">
            <span class="tn-section-label"><?php esc_html_e('Pricing Plans', 'technama'); ?></span>
            <h2 class="tn-section-title"><?php esc_html_e('Choose the Right Plan for Your Brand', 'technama'); ?></h2>
            <p class="tn-section-desc"><?php esc_html_e('Flexible pricing to suit businesses of all sizes. All plans include performance reports.', 'technama'); ?></p>
        </div>

        <div class="tn-pricing-grid">
            <div class="tn-pricing-card">
                <div class="tn-pricing-header">
                    <h3 class="tn-pricing-name"><?php esc_html_e('Basic', 'technama'); ?></h3>
                    <p class="tn-pricing-tagline"><?php esc_html_e('Perfect for startups & small businesses', 'technama'); ?></p>
                </div>
                <div class="tn-pricing-price">
                    <span class="tn-price-currency">PKR</span>
                    <span class="tn-price-amount">25,000</span>
                    <span class="tn-price-period"><?php esc_html_e('/ month', 'technama'); ?></span>
                </div>
                <ul class="tn-pricing-features">
                    <li class="tn-pricing-feature"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="var(--color-success)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> <?php esc_html_e('Sidebar Banner (300x250)', 'technama'); ?></li>
                    <li class="tn-pricing-feature"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="var(--color-success)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> <?php esc_html_e('1 Blog Post / Month', 'technama'); ?></li>
                    <li class="tn-pricing-feature"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="var(--color-success)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> <?php esc_html_e('Social Media Mention', 'technama'); ?></li>
                    <li class="tn-pricing-feature"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="var(--color-success)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> <?php esc_html_e('Monthly Performance Report', 'technama'); ?></li>
                    <li class="tn-pricing-feature tn-pricing-feature-disabled"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="var(--color-gray-400)"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg> <?php esc_html_e('Header Leaderboard', 'technama'); ?></li>
                    <li class="tn-pricing-feature tn-pricing-feature-disabled"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="var(--color-gray-400)"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg> <?php esc_html_e('Newsletter Sponsorship', 'technama'); ?></li>
                </ul>
                <div class="tn-pricing-action"><a href="#tn-ad-contact-form" class="tn-btn tn-btn-outline tn-btn-block"><?php esc_html_e('Get Started', 'technama'); ?></a></div>
            </div>

            <div class="tn-pricing-card tn-pricing-featured">
                <div class="tn-pricing-badge"><?php esc_html_e('Most Popular', 'technama'); ?></div>
                <div class="tn-pricing-header">
                    <h3 class="tn-pricing-name"><?php esc_html_e('Professional', 'technama'); ?></h3>
                    <p class="tn-pricing-tagline"><?php esc_html_e('Best for growing brands & agencies', 'technama'); ?></p>
                </div>
                <div class="tn-pricing-price">
                    <span class="tn-price-currency">PKR</span>
                    <span class="tn-price-amount">60,000</span>
                    <span class="tn-price-period"><?php esc_html_e('/ month', 'technama'); ?></span>
                </div>
                <ul class="tn-pricing-features">
                    <li class="tn-pricing-feature"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="var(--color-success)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> <?php esc_html_e('Sidebar Banner (300x250)', 'technama'); ?></li>
                    <li class="tn-pricing-feature"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="var(--color-success)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> <?php esc_html_e('Header Leaderboard (728x90)', 'technama'); ?></li>
                    <li class="tn-pricing-feature"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="var(--color-success)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> <?php esc_html_e('3 Sponsored Articles / Month', 'technama'); ?></li>
                    <li class="tn-pricing-feature"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="var(--color-success)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> <?php esc_html_e('Newsletter Banner Placement', 'technama'); ?></li>
                    <li class="tn-pricing-feature"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="var(--color-success)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> <?php esc_html_e('Social Media Campaign (3 posts)', 'technama'); ?></li>
                    <li class="tn-pricing-feature"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="var(--color-success)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> <?php esc_html_e('Weekly Performance Reports', 'technama'); ?></li>
                </ul>
                <div class="tn-pricing-action"><a href="#tn-ad-contact-form" class="tn-btn tn-btn-primary tn-btn-block"><?php esc_html_e('Get Started', 'technama'); ?></a></div>
            </div>

            <div class="tn-pricing-card">
                <div class="tn-pricing-header">
                    <h3 class="tn-pricing-name"><?php esc_html_e('Enterprise', 'technama'); ?></h3>
                    <p class="tn-pricing-tagline"><?php esc_html_e('Full-scale campaigns for major brands', 'technama'); ?></p>
                </div>
                <div class="tn-pricing-price">
                    <span class="tn-price-currency">PKR</span>
                    <span class="tn-price-amount">150,000</span>
                    <span class="tn-price-period"><?php esc_html_e('/ month', 'technama'); ?></span>
                </div>
                <ul class="tn-pricing-features">
                    <li class="tn-pricing-feature"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="var(--color-success)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> <?php esc_html_e('All Banner Placements (Full Page)', 'technama'); ?></li>
                    <li class="tn-pricing-feature"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="var(--color-success)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> <?php esc_html_e('Unlimited Sponsored Content', 'technama'); ?></li>
                    <li class="tn-pricing-feature"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="var(--color-success)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> <?php esc_html_e('Dedicated Video Review', 'technama'); ?></li>
                    <li class="tn-pricing-feature"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="var(--color-success)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> <?php esc_html_e('Live Show Sponsorship', 'technama'); ?></li>
                    <li class="tn-pricing-feature"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="var(--color-success)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> <?php esc_html_e('Newsletter Sponsorship (Weekly)', 'technama'); ?></li>
                    <li class="tn-pricing-feature"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="var(--color-success)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> <?php esc_html_e('Social Media Campaign (10 posts)', 'technama'); ?></li>
                    <li class="tn-pricing-feature"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="var(--color-success)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> <?php esc_html_e('Dedicated Account Manager', 'technama'); ?></li>
                    <li class="tn-pricing-feature"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="var(--color-success)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> <?php esc_html_e('Real-Time Analytics Dashboard', 'technama'); ?></li>
                </ul>
                <div class="tn-pricing-action"><a href="#tn-ad-contact-form" class="tn-btn tn-btn-outline tn-btn-block"><?php esc_html_e('Contact Sales', 'technama'); ?></a></div>
            </div>
        </div>
    </section>

    <section class="tn-ad-testimonials">
        <div class="tn-section-header">
            <span class="tn-section-label"><?php esc_html_e('Trusted By', 'technama'); ?></span>
            <h2 class="tn-section-title"><?php esc_html_e('What Our Advertisers Say', 'technama'); ?></h2>
        </div>
        <div class="tn-testimonials-grid">
            <div class="tn-testimonial-card">
                <blockquote class="tn-testimonial-quote"><?php esc_html_e('Advertising on TechNama gave our startup the visibility we needed. The audience is highly targeted and engaged.', 'technama'); ?></blockquote>
                <div class="tn-testimonial-author">
                    <strong><?php esc_html_e('Product Lead', 'technama'); ?></strong>
                    <span><?php esc_html_e('Pakistani Fintech Startup', 'technama'); ?></span>
                </div>
            </div>
            <div class="tn-testimonial-card">
                <blockquote class="tn-testimonial-quote"><?php esc_html_e('The sponsored content performed exceptionally well. We saw a 3x increase in sign-ups from the TechNama referral.', 'technama'); ?></blockquote>
                <div class="tn-testimonial-author">
                    <strong><?php esc_html_e('Marketing Director', 'technama'); ?></strong>
                    <span><?php esc_html_e('E-Commerce Platform', 'technama'); ?></span>
                </div>
            </div>
            <div class="tn-testimonial-card">
                <blockquote class="tn-testimonial-quote"><?php esc_html_e('TechNama is the go-to platform for reaching Pakistan\'s tech-savvy demographic. Great ROI on our campaigns.', 'technama'); ?></blockquote>
                <div class="tn-testimonial-author">
                    <strong><?php esc_html_e('Brand Manager', 'technama'); ?></strong>
                    <span><?php esc_html_e('Telecom Company', 'technama'); ?></span>
                </div>
            </div>
        </div>
    </section>

    <section class="tn-ad-contact" id="tn-ad-contact-form">
        <div class="tn-section-header">
            <span class="tn-section-label"><?php esc_html_e('Get In Touch', 'technama'); ?></span>
            <h2 class="tn-section-title"><?php esc_html_e('Start Your Campaign', 'technama'); ?></h2>
            <p class="tn-section-desc"><?php esc_html_e('Fill out the form below and our advertising team will get back to you within 24 hours.', 'technama'); ?></p>
        </div>

        <div class="tn-ad-form-wrapper">
            <?php if ($ad_success) : ?>
                <div class="tn-alert tn-alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                    <div>
                        <h3><?php esc_html_e('Inquiry Sent Successfully!', 'technama'); ?></h3>
                        <p><?php esc_html_e('Thank you for your interest. Our team will contact you within 24 hours to discuss your campaign.', 'technama'); ?></p>
                    </div>
                </div>
            <?php endif; ?>

            <?php if (!empty($ad_errors)) : ?>
                <div class="tn-alert tn-alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>
                    <div>
                        <h3><?php esc_html_e('Please fix the following errors:', 'technama'); ?></h3>
                        <ul>
                            <?php foreach ($ad_errors as $error) : ?>
                                <li><?php echo esc_html($error); ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                </div>
            <?php endif; ?>

            <form method="post" class="tn-ad-form" novalidate>
                <?php wp_nonce_field('tn_advertise_submit', 'tn_advertise_nonce'); ?>

                <div class="tn-form-row tn-form-row-2col">
                    <div class="tn-form-group">
                        <label for="advertiser_name"><?php esc_html_e('Your Name', 'technama'); ?> <span class="required">*</span></label>
                        <input type="text" id="advertiser_name" name="advertiser_name" class="tn-form-control" value="<?php echo esc_attr($ad_form['advertiser_name']); ?>" required>
                    </div>
                    <div class="tn-form-group">
                        <label for="advertiser_email"><?php esc_html_e('Email Address', 'technama'); ?> <span class="required">*</span></label>
                        <input type="email" id="advertiser_email" name="advertiser_email" class="tn-form-control" value="<?php echo esc_attr($ad_form['advertiser_email']); ?>" required>
                    </div>
                </div>

                <div class="tn-form-row tn-form-row-2col">
                    <div class="tn-form-group">
                        <label for="advertiser_company"><?php esc_html_e('Company / Brand', 'technama'); ?> <span class="required">*</span></label>
                        <input type="text" id="advertiser_company" name="advertiser_company" class="tn-form-control" value="<?php echo esc_attr($ad_form['advertiser_company']); ?>" required>
                    </div>
                    <div class="tn-form-group">
                        <label for="ad_budget"><?php esc_html_e('Estimated Monthly Budget', 'technama'); ?></label>
                        <select id="ad_budget" name="ad_budget" class="tn-form-control">
                            <option value=""><?php esc_html_e('Select budget range', 'technama'); ?></option>
                            <option value="under-25k" <?php selected($ad_form['ad_budget'], 'under-25k'); ?>><?php esc_html_e('Under PKR 25,000', 'technama'); ?></option>
                            <option value="25k-60k" <?php selected($ad_form['ad_budget'], '25k-60k'); ?>><?php esc_html_e('PKR 25,000 - 60,000', 'technama'); ?></option>
                            <option value="60k-150k" <?php selected($ad_form['ad_budget'], '60k-150k'); ?>><?php esc_html_e('PKR 60,000 - 150,000', 'technama'); ?></option>
                            <option value="150k-plus" <?php selected($ad_form['ad_budget'], '150k-plus'); ?>><?php esc_html_e('PKR 150,000+', 'technama'); ?></option>
                        </select>
                    </div>
                </div>

                <div class="tn-form-group">
                    <label for="ad_message"><?php esc_html_e('Tell Us About Your Campaign', 'technama'); ?> <span class="required">*</span></label>
                    <textarea id="ad_message" name="ad_message" class="tn-form-control tn-form-textarea" rows="6" required placeholder="<?php esc_attr_e('Describe your advertising goals, target audience, preferred ad format, and any specific requirements...', 'technama'); ?>"><?php echo esc_textarea($ad_form['ad_message']); ?></textarea>
                </div>

                <div class="tn-form-actions">
                    <button type="submit" class="tn-btn tn-btn-primary tn-btn-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                        <?php esc_html_e('Send Advertising Inquiry', 'technama'); ?>
                    </button>
                </div>
            </form>
        </div>
    </section>
</div>
<?php get_footer(); ?>
