<?php
/**
 * The sidebar template
 */

if (!defined('ABSPATH')) exit;
?>

<?php if (!is_page_template('page-templates/template-homepage.php') && is_active_sidebar('sidebar-main')) : ?>
<aside class="tn-sidebar" role="complementary">
    <?php dynamic_sidebar('sidebar-main'); ?>
</aside>
<?php endif; ?>
