<?php
/**
 * Sidebar template for Technama theme.
 */
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>
<?php if (!is_page_template('page-templates/template-homepage.php') && is_active_sidebar('sidebar-main')) : ?>
<div class="tn-sidebar">
    <?php dynamic_sidebar('sidebar-main'); ?>
    
    <!-- Sidebar Ad -->
    <div class="tn-ad-slot tn-ad-sidebar">
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>
</div>
<?php endif; ?>
