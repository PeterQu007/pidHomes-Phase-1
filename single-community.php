<?php
/**
 * Single Community Post Page
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
    get_template_part('assets/modern/partials/banner/community');
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
    $communityID = get_query_var('communityID');
    // echo 'get_the_ID()' . get_the_ID(); //d//
    // echo 'communityID: ' . $communityID; //d//
    // require get_stylesheet_directory() . '/inc/generate-neighborhood-metabox.php';
      get_template_part('template-parts/content', 'single-community');
      get_template_part('template-parts/content', 'market-stats');
      // run school contents
      set_query_var('post_type', 'school');
      get_template_part('template-parts/content', 'x-postx');

      echo do_shortcode("[wpdatatable id=1 var2='Surrey' ]");
      get_template_part('template-parts/content-active-listings');
    ?>

  </div>

  <div class="rh_page rh_page_sidebar" style="width: 30%">
    <?php get_sidebar('default');?>
  </div>
</section>

<?php

get_footer();
