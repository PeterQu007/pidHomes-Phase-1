<?php
/***********************
 * All Markets: Show by City Taxonomy
 * Single Market: Show Sub area of the City
 */
$X = set_debug(__FILE__);
$qvar = get_query_var('property-neighborhood');
// print_X($X, __LINE__, 'query var::', $qvar);

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

foreach($terms as $term){

    $termID = $term->term_id;

    $market_Posts = new WP_Query(array(
        'post_type' => 'market',
        'tax_query' => array(
            array(
                'taxonomy' => 'property-neighborhood',
                'field' => 'slug',
                'terms' => $term->slug
            )
        ),
        'posts_per_page' => -1
    ));

    set_query_var('qvar', $qvar);
    set_query_var('term', $term);
    set_query_var('metabox_tax', 'market');
    get_template_part('/template-parts/content', '2Level-metabox');

    if ($market_Posts->have_posts()) {
        // print_X($X, __LINE__, 'Archive-market found posts: ', $Markets->found_posts); //d//
        // print_X($X, __LINE__, get_term_meta($term->term_id, null, false));
        $i = 0; //d//
        while ($market_Posts->have_posts()) {
            // print_X($X, __LINE__, 'Archive-market inside the LOOP: ', $i++); //d//
            $market_Posts->the_post();?>
            <div style="text-align: left">
                <h3><a href="<?php echo str_replace("/markets/", "/market/", get_the_permalink()); ?>">
                    <?php the_title();?></a>
                </h3>
                <div><?php the_excerpt();?> </div>
            </div>
        <?php }

    } else {
        //No POSTS
        echo "<p> NO MARKETS ADDED, COMING SOON... </p>";
    }

    wp_reset_postdata();

}


