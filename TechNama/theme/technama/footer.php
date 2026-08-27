<?php
/**
 * TechNama Footer Template
 */
?>
</main>

<footer class="tn-footer" role="contentinfo">
    <div class="tn-footer-top">
        <div class="tn-container">
            <div class="tn-footer-grid">
                <!-- Column 1: About -->
                <div class="tn-footer-col">
                    <div class="tn-footer-logo">
                        <span class="tn-logo-name">Tech<span class="tn-logo-accent">Nama</span></span>
                    </div>
                    <p class="tn-footer-desc"><?php esc_html_e("Pakistan's leading technology news portal covering IT news, startups, cybersecurity, AI & cloud computing.", 'technama'); ?></p>
                    <div class="tn-footer-social">
                        <a href="#" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
                        <a href="#" aria-label="Twitter"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                        <a href="#" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
                        <a href="#" aria-label="YouTube"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
                    </div>
                </div>

                <!-- Column 2: Quick Links -->
                <div class="tn-footer-col">
                    <h4 class="tn-footer-title"><?php esc_html_e('Quick Links', 'technama'); ?></h4>
                    <ul class="tn-footer-links">
                        <li><a href="<?php echo esc_url(home_url('/about/')); ?>"><?php esc_html_e('About Us', 'technama'); ?></a></li>
                        <li><a href="<?php echo esc_url(home_url('/contact/')); ?>"><?php esc_html_e('Contact Us', 'technama'); ?></a></li>
                        <li><a href="<?php echo esc_url(home_url('/advertise/')); ?>"><?php esc_html_e('Advertise', 'technama'); ?></a></li>
                        <li><a href="<?php echo esc_url(home_url('/membership/')); ?>"><?php esc_html_e('Membership', 'technama'); ?></a></li>
                        <li><a href="<?php echo esc_url(home_url('/privacy-policy/')); ?>"><?php esc_html_e('Privacy Policy', 'technama'); ?></a></li>
                        <li><a href="<?php echo esc_url(home_url('/terms-of-service/')); ?>"><?php esc_html_e('Terms of Service', 'technama'); ?></a></li>
                    </ul>
                </div>

                <!-- Column 3: Categories -->
                <div class="tn-footer-col">
                    <h4 class="tn-footer-title"><?php esc_html_e('Categories', 'technama'); ?></h4>
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'footer',
                        'container'      => false,
                        'menu_class'     => 'tn-footer-links',
                        'fallback_cb'    => 'technama_footer_fallback_menu',
                        'depth'          => 1,
                    ));
                    ?>
                </div>

                <!-- Column 4: Newsletter -->
                <div class="tn-footer-col">
                    <h4 class="tn-footer-title"><?php esc_html_e('Newsletter', 'technama'); ?></h4>
                    <p class="tn-footer-newsletter-text"><?php esc_html_e('Get the latest tech news delivered to your inbox.', 'technama'); ?></p>
                    <form class="tn-newsletter-form" id="tn-newsletter-form">
                        <input type="email" name="email" placeholder="<?php esc_attr_e('Your email address', 'technama'); ?>" required />
                        <button type="submit" class="tn-btn tn-btn-primary"><?php esc_html_e('Subscribe', 'technama'); ?></button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Copyright Bar -->
    <div class="tn-footer-bottom">
        <div class="tn-container">
            <div class="tn-footer-bottom-inner">
                <p class="tn-copyright">
                    &copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. <?php esc_html_e('All rights reserved.', 'technama'); ?>
                </p>
                <nav class="tn-footer-bottom-nav">
                    <a href="<?php echo esc_url(home_url('/privacy-policy/')); ?>"><?php esc_html_e('Privacy', 'technama'); ?></a>
                    <a href="<?php echo esc_url(home_url('/terms-of-service/')); ?>"><?php esc_html_e('Terms', 'technama'); ?></a>
                    <a href="<?php echo esc_url(home_url('/cookie-policy/')); ?>"><?php esc_html_e('Cookies', 'technama'); ?></a>
                </nav>
            </div>
        </div>
    </div>
</footer>

<!-- Back to Top -->
<button class="tn-back-to-top" id="tn-back-to-top" aria-label="<?php esc_attr_e('Back to top', 'technama'); ?>">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>
</button>

<!-- TechNama AdSense Auto-Ads -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"></script>

<?php wp_footer(); ?>
</body>
</html>
