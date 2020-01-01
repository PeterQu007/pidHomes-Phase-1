<?php
/**
 * Single School Post Page
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
    get_template_part('assets/modern/partials/banner/school');
}

if (inspiry_show_header_search_form()) {
    get_template_part('assets/modern/partials/properties/search/advance'); //d//
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
    $X = set_debug(__FILE__);
    $metabox = nbh_3level_metabox(get_the_ID());
    // print_x('green',$metabox); //d//
    $communityID = $metabox[2]['Term_ID'];
    // print_X($X, get_theme_file_uri('/db/data.php'));

    //School Section
    get_template_part('template-parts/content', 'single-school');
    //Market Stats Section
    get_template_part('template-parts/content', 'market-stats');
    //Community Section
    set_query_var('communityID', $communityID);
    get_template_part('template-parts/content', 'single-community'); 
    //Active Listing Section
    get_template_part('template-parts/content', 'active-listings');
    ?>

  </div>

  <div class="rh_page rh_page_sidebar" style="width: 30%">
    <?php get_sidebar('default'); ?>
  </div>

</section>

<?php

get_footer();
