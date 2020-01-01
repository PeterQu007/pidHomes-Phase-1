<?php
/**
 * All Markets Page
 *
 * @package realhomes-child
 * @subpackage modern
 */

get_header();

// Page Head.
$header_variation = get_option('inspiry_listing_header_variation');
//echo $header_variation;

if (empty($header_variation) || ('none' === $header_variation)) {
    echo 'header';
    get_template_part('assets/modern/partials/banner/header');
} elseif (!empty($header_variation) && ('banner' === $header_variation)) {
    //echo 'property-archive';
    get_template_part('assets/modern/partials/banner/market');
}

if (inspiry_show_header_search_form()) {
    get_template_part('assets/modern/partials/properties/search/advance');
}

if (isset($_GET['view'])) {
    $view_type = $_GET['view'];
} else {
    /* Theme Options Listing Layout */
    $view_type = get_option('theme_listing_layout');
}

?>

<section class="rh_section rh_section--flex rh_wrap--padding rh_wrap--topPadding">
<div class="rh_page rh_page__listing_page rh_page__main" style="width: 70%">

<?php
//Get query var from URL in order to filter the neighborhoods
//entrance variable value for archive module
//if it is null, means show all categories/taxonomies
//if it is not null, means show specific categories/taxonomy
$X = set_debug(__FILE__); //set file name and color

$qvar = get_query_var('property-neighborhood'); //query var is passed from url rewriting

print_X($X, __LINE__, $qvar, 'Entry Post ID::', get_the_ID()); //d//
?>

<?php
if ($qvar /* query var */) {
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
print_X($X, __LINE__, $terms); //d//

/************************
    SECTION::Market Posts
************************/
set_query_var('qvar', $qvar);
set_query_var('term', $terms[0]);
set_query_var('metabox_tax', 'market');
get_template_part('/template-parts/content', '2Level-metabox');

foreach ($terms as $term) {
    $termID = $term->term_id;
    $neighborhood_code = get_term_meta($term->term_id, 'neighborhood_code', true);
    print_X($X, __LINE__, $neighborhood_code);

    //Define the query to get market posts
    $Markets = new WP_Query(array(
        'post_type' => 'market',
        'tax_query' => array(
            array(
                'taxonomy' => 'property-neighborhood',
                'field' => 'slug',
                'terms' => $term->slug, //'fraser-heights' //d//
            ),
        ),
        'posts_per_page' => -1,
    ));
    // print_X($X, __LINE__, 'Archive-market Found posts: ', $Markets->found_posts); //d//

    if ($Markets->have_posts()) {
        // print_X($X, __LINE__, 'Archive-market found posts: ', $Markets->found_posts); //d//
        // print_X($X, __LINE__, get_term_meta($term->term_id, null, false));

        $i = 0; //d//
        while ($Markets->have_posts()) {
            // print_X($X, __LINE__, 'Archive-market inside the LOOP: ', $i++); //d//
          $Markets->the_post();?>
          <div style="text-align: left">
            <h2><a href="<?php echo str_replace("/markets/", "/market/", get_the_permalink()); ?>">
              <?php the_title();?></a>
            </h2>
            <div><?php the_excerpt();?> </div>
          </div>
    <?php }

    } else {
        //No POSTS
        echo "<p> NO MARKETS ADDED, COMING SOON... </p>";
    }

    wp_reset_postdata();

}
;

/******************************
 * SECTION 2::Market Statistics
 */
    set_query_var('qvar', $qvar /* this is the query var from url*/);
    get_template_part('template-parts/content', 'market-stats');

?>

  </div>

  <div class="rh_page rh_page_sidebar" style="width: 30%">

  <?php

// if ('grid' === $view_type) {
//     get_template_part('assets/modern/partials/taxonomy/grid-layout');
// } else {
//     get_template_part('assets/modern/partials/taxonomy/list-layout');
// }
get_sidebar('default');

?>

</div>
</section>

<?php

get_footer();
