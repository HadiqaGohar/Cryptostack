<?php
/**
 * Template Name: About Us
 */
get_header();
?>
<div class="tn-container">
    <div class="tn-page-header tn-page-header-about">
        <h1 class="tn-page-title"><?php esc_html_e('About TechNama', 'technama'); ?></h1>
        <p class="tn-page-subtitle"><?php esc_html_e('Pakistan\'s leading technology news, reviews, and startup insights platform', 'technama'); ?></p>
    </div>

    <section class="tn-about-mission">
        <div class="tn-mission-grid">
            <div class="tn-mission-content">
                <span class="tn-section-label"><?php esc_html_e('Our Mission', 'technama'); ?></span>
                <h2 class="tn-section-title"><?php esc_html_e('Empowering Pakistan\'s Tech Ecosystem Through Knowledge', 'technama'); ?></h2>
                <p><?php esc_html_e('TechNama was founded with a singular vision: to create a comprehensive, trusted, and accessible technology platform for Pakistan. We believe that informed communities build stronger ecosystems, and our mission is to bridge the information gap between global technology trends and the Pakistani tech landscape.', 'technama'); ?></p>
                <p><?php esc_html_e('From in-depth product reviews and exclusive startup features to live shows with industry leaders and curated tech deals, TechNama is your one-stop destination for everything technology in Pakistan.', 'technama'); ?></p>
                <div class="tn-mission-stats">
                    <div class="tn-stat">
                        <span class="tn-stat-number">500+</span>
                        <span class="tn-stat-label"><?php esc_html_e('Articles Published', 'technama'); ?></span>
                    </div>
                    <div class="tn-stat">
                        <span class="tn-stat-number">100+</span>
                        <span class="tn-stat-label"><?php esc_html_e('Startups Featured', 'technama'); ?></span>
                    </div>
                    <div class="tn-stat">
                        <span class="tn-stat-number">50+</span>
                        <span class="tn-stat-label"><?php esc_html_e('Live Shows Aired', 'technama'); ?></span>
                    </div>
                    <div class="tn-stat">
                        <span class="tn-stat-number">10K+</span>
                        <span class="tn-stat-label"><?php esc_html_e('Monthly Readers', 'technama'); ?></span>
                    </div>
                </div>
            </div>
            <div class="tn-mission-visual">
                <div class="tn-mission-image-placeholder">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="120" height="120" fill="none" stroke="var(--color-secondary)" stroke-width="0.8"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
            </div>
        </div>
    </section>

    <section class="tn-about-values">
        <span class="tn-section-label"><?php esc_html_e('Our Values', 'technama'); ?></span>
        <h2 class="tn-section-title"><?php esc_html_e('What Drives Us', 'technama'); ?></h2>
        <div class="tn-values-grid">
            <div class="tn-value-card">
                <div class="tn-value-number">01</div>
                <h3><?php esc_html_e('Accuracy & Integrity', 'technama'); ?></h3>
                <p><?php esc_html_e('We are committed to delivering accurate, unbiased, and thoroughly researched content. Every review, article, and news piece goes through rigorous fact-checking.', 'technama'); ?></p>
            </div>
            <div class="tn-value-card">
                <div class="tn-value-number">02</div>
                <h3><?php esc_html_e('Community First', 'technama'); ?></h3>
                <p><?php esc_html_e('Our readers, viewers, and community members are at the heart of everything we do. We create content that serves their needs and interests.', 'technama'); ?></p>
            </div>
            <div class="tn-value-card">
                <div class="tn-value-number">03</div>
                <h3><?php esc_html_e('Innovation', 'technama'); ?></h3>
                <p><?php esc_html_e('We embrace new formats, technologies, and approaches to deliver content in the most engaging and accessible way possible.', 'technama'); ?></p>
            </div>
            <div class="tn-value-card">
                <div class="tn-value-number">04</div>
                <h3><?php esc_html_e('Transparency', 'technama'); ?></h3>
                <p><?php esc_html_e('We maintain full transparency in our editorial process, sponsorship disclosures, and business relationships.', 'technama'); ?></p>
            </div>
        </div>
    </section>

    <section class="tn-about-team">
        <span class="tn-section-label"><?php esc_html_e('Our Team', 'technama'); ?></span>
        <h2 class="tn-section-title"><?php esc_html_e('Meet the People Behind TechNama', 'technama'); ?></h2>
        <div class="tn-team-grid">
            <?php
            $team_members = array(
                array(
                    'name'        => 'Founder & CEO',
                    'role'        => __('Editor-in-Chief', 'technama'),
                    'description' => __('Leading TechNama\'s editorial vision and strategy. Passionate about Pakistan\'s tech growth story.', 'technama'),
                    'social_twitter' => '#',
                    'social_linkedin' => '#',
                ),
                array(
                    'name'        => 'Head of Content',
                    'role'        => __('Content Director', 'technama'),
                    'description' => __('Overseeing all content operations including articles, reviews, and video production.', 'technama'),
                    'social_twitter' => '#',
                    'social_linkedin' => '#',
                ),
                array(
                    'name'        => 'Lead Reviewer',
                    'role'        => __('Senior Tech Analyst', 'technama'),
                    'description' => __('Bringing hands-on, honest tech reviews covering smartphones, laptops, gadgets, and software.', 'technama'),
                    'social_twitter' => '#',
                    'social_linkedin' => '#',
                ),
                array(
                    'name'        => 'Startup Editor',
                    'role'        => __('Startup Ecosystem Lead', 'technama'),
                    'description' => __('Covering Pakistan\'s startup ecosystem, tracking funding rounds, and profiling founders.', 'technama'),
                    'social_twitter' => '#',
                    'social_linkedin' => '#',
                ),
            );

            foreach ($team_members as $member) :
            ?>
            <div class="tn-team-card">
                <div class="tn-team-avatar">
                    <div class="tn-team-avatar-placeholder">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    </div>
                </div>
                <h3 class="tn-team-name"><?php echo esc_html($member['name']); ?></h3>
                <span class="tn-team-role"><?php echo esc_html($member['role']); ?></span>
                <p class="tn-team-desc"><?php echo esc_html($member['description']); ?></p>
                <div class="tn-team-social">
                    <a href="<?php echo esc_url($member['social_twitter']); ?>" target="_blank" rel="noopener" aria-label="Twitter">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
                    </a>
                    <a href="<?php echo esc_url($member['social_linkedin']); ?>" target="_blank" rel="noopener" aria-label="LinkedIn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </section>

    <section class="tn-about-contact">
        <div class="tn-about-contact-grid">
            <div class="tn-about-contact-info">
                <span class="tn-section-label"><?php esc_html_e('Get In Touch', 'technama'); ?></span>
                <h2 class="tn-section-title"><?php esc_html_e('Contact Us', 'technama'); ?></h2>
                <div class="tn-contact-details">
                    <div class="tn-contact-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                        <div>
                            <strong><?php esc_html_e('Email', 'technama'); ?></strong>
                            <a href="mailto:info@technama.com">info@technama.com</a>
                        </div>
                    </div>
                    <div class="tn-contact-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                        <div>
                            <strong><?php esc_html_e('Phone', 'technama'); ?></strong>
                            <a href="tel:+92XXXXXXXXXX">+92-XXX-XXXXXXX</a>
                        </div>
                    </div>
                    <div class="tn-contact-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                        <div>
                            <strong><?php esc_html_e('Office', 'technama'); ?></strong>
                            <p><?php esc_html_e('Karachi, Sindh, Pakistan', 'technama'); ?></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tn-about-social">
                <span class="tn-section-label"><?php esc_html_e('Follow Us', 'technama'); ?></span>
                <div class="tn-social-links">
                    <a href="#" class="tn-social-link tn-social-facebook" target="_blank" rel="noopener" aria-label="Facebook">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href="#" class="tn-social-link tn-social-twitter" target="_blank" rel="noopener" aria-label="Twitter">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                    <a href="#" class="tn-social-link tn-social-linkedin" target="_blank" rel="noopener" aria-label="LinkedIn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                    <a href="#" class="tn-social-link tn-social-youtube" target="_blank" rel="noopener" aria-label="YouTube">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                </div>
            </div>
        </div>
    </section>
</div>
<?php get_footer(); ?>
