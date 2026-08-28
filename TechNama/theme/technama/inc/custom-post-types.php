<?php
/**
 * TechNama Custom Post Types
 */

if (!defined('ABSPATH')) exit;

/**
 * Register Custom Post Types
 */
function technama_register_post_types() {
    // Video Reviews CPT
    register_post_type('video_review', array(
        'labels' => array(
            'name'               => __('Video Reviews', 'technama'),
            'singular_name'      => __('Video Review', 'technama'),
            'add_new_item'       => __('Add New Video Review', 'technama'),
            'edit_item'          => __('Edit Video Review', 'technama'),
            'all_items'          => __('All Video Reviews', 'technama'),
            'view_item'          => __('View Video Review', 'technama'),
            'search_items'       => __('Search Video Reviews', 'technama'),
            'not_found'          => __('No video reviews found.', 'technama'),
            'menu_name'          => __('Video Reviews', 'technama'),
        ),
        'public'             => true,
        'has_archive'        => true,
        'rewrite'            => array('slug' => 'video-reviews'),
        'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'comments', 'custom-fields'),
        'menu_icon'          => 'dashicons-video-alt3',
        'show_in_rest'       => true,
        'capability_type'    => 'post',
        'map_meta_cap'       => true,
    ));

    // Deals CPT
    register_post_type('deals', array(
        'labels' => array(
            'name'               => __('Deals', 'technama'),
            'singular_name'      => __('Deal', 'technama'),
            'add_new_item'       => __('Add New Deal', 'technama'),
            'edit_item'          => __('Edit Deal', 'technama'),
            'all_items'          => __('All Deals', 'technama'),
            'view_item'          => __('View Deal', 'technama'),
            'search_items'       => __('Search Deals', 'technama'),
            'not_found'          => __('No deals found.', 'technama'),
            'menu_name'          => __('Deals', 'technama'),
        ),
        'public'             => true,
        'has_archive'        => true,
        'rewrite'            => array('slug' => 'deals'),
        'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'menu_icon'          => 'dashicons-tag',
        'show_in_rest'       => true,
    ));

    // Press Release CPT
    register_post_type('press_release', array(
        'labels' => array(
            'name'               => __('Press Releases', 'technama'),
            'singular_name'      => __('Press Release', 'technama'),
            'add_new_item'       => __('Add New Press Release', 'technama'),
            'edit_item'          => __('Edit Press Release', 'technama'),
            'all_items'          => __('All Press Releases', 'technama'),
            'view_item'          => __('View Press Release', 'technama'),
            'search_items'       => __('Search Press Releases', 'technama'),
            'not_found'          => __('No press releases found.', 'technama'),
            'menu_name'          => __('Press Releases', 'technama'),
        ),
        'public'             => false,
        'show_ui'            => true,
        'has_archive'        => false,
        'rewrite'            => array('slug' => 'press-release'),
        'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
        'menu_icon'          => 'dashicons-megaphone',
        'show_in_rest'       => true,
        'capability_type'    => 'post',
        'map_meta_cap'       => true,
    ));

    // Reviews CPT
    register_post_type('reviews', array(
        'labels' => array(
            'name'               => __('Reviews', 'technama'),
            'singular_name'      => __('Review', 'technama'),
            'add_new_item'       => __('Add New Review', 'technama'),
            'edit_item'          => __('Edit Review', 'technama'),
            'all_items'          => __('All Reviews', 'technama'),
            'view_item'          => __('View Review', 'technama'),
            'search_items'       => __('Search Reviews', 'technama'),
            'not_found'          => __('No reviews found.', 'technama'),
            'menu_name'          => __('Reviews', 'technama'),
        ),
        'public'             => true,
        'has_archive'        => true,
        'rewrite'            => array('slug' => 'reviews'),
        'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'comments', 'custom-fields'),
        'menu_icon'          => 'dashicons-star-half',
        'show_in_rest'       => true,
    ));
}
add_action('init', 'technama_register_post_types');

/**
 * Register Custom Taxonomies
 */
function technama_register_taxonomies() {
    // Tech Topics Taxonomy
    register_taxonomy('tech_topic', array('post', 'video_review', 'reviews'), array(
        'labels' => array(
            'name'              => __('Tech Topics', 'technama'),
            'singular_name'     => __('Tech Topic', 'technama'),
            'search_items'      => __('Search Tech Topics', 'technama'),
            'all_items'         => __('All Tech Topics', 'technama'),
            'parent_item'       => __('Parent Tech Topic', 'technama'),
            'parent_item_colon' => __('Parent Tech Topic:', 'technama'),
            'edit_item'         => __('Edit Tech Topic', 'technama'),
            'update_item'       => __('Update Tech Topic', 'technama'),
            'add_new_item'      => __('Add New Tech Topic', 'technama'),
            'new_item_name'     => __('New Tech Topic Name', 'technama'),
            'menu_name'         => __('Tech Topics', 'technama'),
        ),
        'hierarchical'      => true,
        'public'            => true,
        'show_ui'           => true,
        'show_admin_column' => true,
        'show_in_rest'      => true,
        'rewrite'           => array('slug' => 'tech-topic'),
    ));

    // Video Category Taxonomy
    register_taxonomy('video_category', array('video_review'), array(
        'labels' => array(
            'name'              => __('Video Categories', 'technama'),
            'singular_name'     => __('Video Category', 'technama'),
            'search_items'      => __('Search Video Categories', 'technama'),
            'all_items'         => __('All Video Categories', 'technama'),
            'parent_item'       => __('Parent Video Category', 'technama'),
            'parent_item_colon' => __('Parent Video Category:', 'technama'),
            'edit_item'         => __('Edit Video Category', 'technama'),
            'update_item'       => __('Update Video Category', 'technama'),
            'add_new_item'      => __('Add New Video Category', 'technama'),
            'new_item_name'     => __('New Video Category Name', 'technama'),
            'menu_name'         => __('Video Categories', 'technama'),
        ),
        'hierarchical'      => true,
        'public'            => true,
        'show_ui'           => true,
        'show_admin_column' => true,
        'show_in_rest'      => true,
        'rewrite'           => array('slug' => 'video-category'),
    ));

    // Brand Taxonomy for deals and reviews
    register_taxonomy('brand', array('deals', 'reviews'), array(
        'labels' => array(
            'name'              => __('Brands', 'technama'),
            'singular_name'     => __('Brand', 'technama'),
            'search_items'      => __('Search Brands', 'technama'),
            'all_items'         => __('All Brands', 'technama'),
            'edit_item'         => __('Edit Brand', 'technama'),
            'update_item'       => __('Update Brand', 'technama'),
            'add_new_item'      => __('Add New Brand', 'technama'),
            'new_item_name'     => __('New Brand Name', 'technama'),
            'menu_name'         => __('Brands', 'technama'),
        ),
        'hierarchical'      => true,
        'public'            => true,
        'show_ui'           => true,
        'show_admin_column' => true,
        'show_in_rest'      => true,
        'rewrite'           => array('slug' => 'brand'),
    ));
}
add_action('init', 'technama_register_taxonomies');

/**
 * Flush rewrite rules on theme activation
 */
function technama_rewrite_flush() {
    technama_register_post_types();
    technama_register_taxonomies();
    flush_rewrite_rules();
}
add_action('after_switch_theme', 'technama_rewrite_flush');

/**
 * REST API permission callback - restrict PII exposure
 * Only logged-in users can access press_release via REST API
 */
function technama_restrict_rest_api($response, $handler, $request) {
    $route = $request->get_route();
    
    // Restrict press_release REST API access to editors+
    if (strpos($route, '/press_release') !== false || strpos($route, '/press-release') !== false) {
        if (!current_user_can('edit_others_posts')) {
            return new WP_Error(
                'rest_forbidden',
                __('You do not have permission to access this resource.', 'technama'),
                array('status' => 403)
            );
        }
    }
    
    return $response;
}
add_filter('rest_request_before_callbacks', 'technama_restrict_rest_api', 10, 3);

/**
 * Remove PII from REST API responses for press_release
 */
function technama_remove_pii_from_rest($response, $post, $request) {
    if ($post->post_type === 'press_release' && isset($response->data['meta'])) {
        unset($response->data['meta']['pr_contact_email']);
        unset($response->data['meta']['pr_contact_phone']);
    }
    return $response;
}
add_filter('rest_prepare_press_release', 'technama_remove_pii_from_rest', 10, 3);
