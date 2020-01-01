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
//   print_X($X, __LINE__, $qvar, 'Entry Post ID::', get_the_ID()); //d//

  /**********************
   * SECTION 1::Market Posts
   */
  get_template_part('/template-parts/content', 'x-postx');

  /******************************
   * SECTION 2::Market Statistics
   */
  set_query_var('qvar', $qvar/* this is the query var from url*/);
  get_template_part('template-parts/content', 'market-stats');

  ?>

  </div>
  
  <div class="rh_page rh_page_sidebar" style="width: 30%">
    <?php get_sidebar('default'); ?>
  </div>

</section>

<?php

get_footer();
