<?php
/**
 * All Communities Page
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
    echo 'property-archive';
    get_template_part('assets/modern/partials/banner/community');
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

$terms = get_terms(array(
    'taxonomy' => 'property-city',
    'parent' => 0,
));

foreach($terms as $term){
  //echo $term->term_id;
  //echo $term->name;
  
  //Define the query to get community posts
  $Communities = new WP_Query(array(
      'post_type' => 'community',
      'tax_query' => array(
          array(
              'taxonomy' => 'property-city',
              'field' => 'slug',
              'terms' => $term->name,
          ),
      ),
      'post_per_page' => -1,
  ));
  if($Communities->have_posts()){
    ?>
  <div class="metabox metabox--with-home-link" style="font-size: 20px; text-align: left; display: block">
  <div style="font-size: 20px; text-align: left; display: block">
    <a class="metabox__blog-home-link" href="<?php echo get_page_link(get_page_by_title('communities')->ID); ?>">
    <i class="fa fa-home" aria-hidden="true">
    </i> All Communities
    </a>
    <a class="metabox__blog-home-link" href="<?php echo get_term_link($term->term_id); ?>"> <?php echo $term->name; ?> </a>

  </div>
  </div>

  <?php
  }

  while ($Communities->have_posts()) {
      $Communities->the_post();?>
        <div style="text-align: left">
        <h2><a href="<?php the_permalink();?>"><?php the_title();?></a></h2>
        <div><?php the_content();?> </div>
        </div>

    <?php }
    wp_reset_query();
};?>

  </div>

  <div class="rh_page rh_page_sidebar" style="width: 30%">

  <?php

// if ('grid' === $view_type) {
//     get_template_part('assets/modern/partials/taxonomy/grid-layout');
// } else {
//     get_template_part('assets/modern/partials/taxonomy/list-layout');
// }
get_sidebar( 'default' );

?> 

</div>
</section>

<?php

get_footer();
