<?php
/***********************
 * All Markets: Show by City Taxonomy
 * Single Market: Show Sub area of the City
 */
$X = set_debug(__FILE__);
$qvar = get_query_var('property-neighborhood');
$post_type = get_post_type();
$post_type_labels = get_post_type_labels(get_post_type_object($post_type));
print_X($X, __LINE__, 'query var::', $qvar, 'post type::', $post_type, 'post type obj::', $post_type_labels);

if ($qvar/* query var */) {
    // Sub Markets
    $terms = get_terms(array(
        'taxonomy' => 'property-neighborhood',
        'fields' => 'all', //'names',
        'hide_empty' => false,
        'slug' => $qvar,
    ));
} else {
    // All market
    $terms = get_terms(array(
        'taxonomy' => 'property-neighborhood',
        'parent' => 0,
        'hide_empty' => false,
    ));
}
// print_X($X, __LINE__, $terms); //d//

foreach ($terms as $term) {

    $termID = $term->term_id;

    $x_Posts = new WP_Query(array(
        'post_type' => $post_type,
        'tax_query' => array(
            array(
                'taxonomy' => 'property-neighborhood',
                'field' => 'slug',
                'terms' => $term->slug,
            ),
        ),
        'posts_per_page' => -1,
    ));

    set_query_var('qvar', $qvar);
    set_query_var('term', $term);
    set_query_var('metabox_tax', 'community');
    get_template_part('/template-parts/content', '2Level-metabox');

    if ($x_Posts->have_posts()) {
        // print_X($X, __LINE__, 'Archive-market found posts: ', $Markets->found_posts); //d//
        // print_X($X, __LINE__, get_term_meta($term->term_id, null, false));
        $i = 0; //d//
        while ($x_Posts->have_posts()) {
            print_X($X, __LINE__, 'Archive-market inside the LOOP::', $i++); //d//
            $x_Posts->the_post();
            print_X($X, __LINE__, 'post type name::', $post_type_labels->name, 'post type singular name::', $post_type_labels->singular_name);?>
            <div style="text-align: left">
                <h3><a href="<?php echo str_replace("/" . strtolower($post_type_labels->name) . "/", 
                                                    "/" . strtolower($post_type_labels->singular_name) . "/", 
                                                    strtolower(get_the_permalink())); ?>">
                    <?php the_title();?></a>
                </h3>
                <div><?php the_excerpt();?> </div>
            </div>
        <?php }

    } else {
        //No POSTS
        echo "<p> NO ". strtoupper($post_type_labels->singular_name) ." ADDED, COMING SOON... </p>";
    }

    wp_reset_postdata();

}
