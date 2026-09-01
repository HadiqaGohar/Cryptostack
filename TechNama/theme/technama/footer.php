<?php
/**
 * TechNama Footer Template
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>
</main>

<footer class="tn-footer" role="contentinfo">
    <div class="tn-footer-top">
        <div class="tn-container">
            <div class="tn-footer-grid">
                <!-- Column 1: About -->
                <div class="tn-footer-col">
                    <div class="tn-footer-logo">
                        <a href="<?php echo esc_url(home_url('/')); ?>" aria-label="<?php echo esc_attr( get_bloginfo('name') ); ?>">
                            <?php if (has_custom_logo()) : ?>
                                <?php the_custom_logo(); ?>
                            <?php else : ?>
                                <img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/logo.svg' ); ?>" alt="<?php echo esc_attr( get_bloginfo('name') ); ?>" class="tn-footer-logo-img">
                            <?php endif; ?>
                        </a>
                    </div>
                    <p class="tn-footer-desc"><?php esc_html_e("Pakistan's leading technology news portal covering IT news, startups, cybersecurity, AI & cloud computing.", 'technama'); ?></p>
                    <div class="tn-footer-social">
                        <?php
$social_twitter = get_theme_mod('technama_social_twitter', '');
$social_facebook = get_theme_mod('technama_social_facebook', '');
$social_instagram = get_theme_mod('technama_social_instagram', '');
$social_youtube = get_theme_mod('technama_social_youtube', '');
?>
<?php if ($social_twitter) : ?><a href="<?php echo esc_url($social_twitter); ?>" class="tn-social-twitter" target="_blank" rel="noopener noreferrer">𝕏</a><?php endif; ?>
<?php if ($social_facebook) : ?><a href="<?php echo esc_url($social_facebook); ?>" class="tn-social-facebook" target="_blank" rel="noopener noreferrer">f</a><?php endif; ?>
<?php if ($social_instagram) : ?><a href="<?php echo esc_url($social_instagram); ?>" class="tn-social-instagram" target="_blank" rel="noopener noreferrer">📷</a><?php endif; ?>
<?php if ($social_youtube) : ?><a href="<?php echo esc_url($social_youtube); ?>" class="tn-social-youtube" target="_blank" rel="noopener noreferrer">▶</a><?php endif; ?>
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
                    <form class="tn-newsletter-form" id="tn-newsletter-form" data-ajax="tn_subscribe">
                        <input type="email" name="email" placeholder="<?php esc_attr_e('Your email address', 'technama'); ?>" required />
                        <button type="submit" class="tn-btn tn-btn-primary"><?php esc_html_e('Subscribe', 'technama'); ?></button>
                        <div class="tn-newsletter-message" style="display:none;"></div>
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

<script>
document.getElementById('tn-back-to-top')?.addEventListener('click', function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
});
document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('tn-back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', function() {
        btn.classList.toggle('visible', window.scrollY > 400);
    });
});
</script>


<?php get_template_part("template-parts/cookie-consent"); ?>
<?php wp_footer(); ?>
</body>
</html>
