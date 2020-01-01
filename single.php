<?php
/*
$terms = get_terms(array(
    'taxonomy' => 'property-city',
    'hide_empty' => false,
));

foreach ($terms as $term) {
    echo $term->name;
}*/
?>

<?php $wcatTerms = get_terms(array(
    'taxonomy'=> 'property-city',
    'hide_empty' => false, 
    'parent' => false
  ));
 
  foreach($wcatTerms as $terms){
    echo $terms->name;
  }

foreach ($wcatTerms as $wcatTerm){
?>
<ul>
   <li>
      <a href="<?php echo get_term_link( $wcatTerm->slug, $wcatTerm->taxonomy ); ?>"><?php echo $wcatTerm->name; ?></a>
      <ul class="megaSubCat">
         <?php
          $wsubargs = array(
              'hierarchical' => 1,
              'show_option_none' => '',
              'hide_empty' => 0,
              'parent' => $wcatTerm->term_id,
              'taxonomy' => 'property-city',
          );
          $wsubcats = get_categories($wsubargs);
          foreach ($wsubcats as $wsc){
          ?>
                  <li><a href="<?php echo get_term_link($wsc->slug, $wsc->taxonomy); ?>"><?php echo $wsc->name; ?></a></li>
                  <?php
          };
          ?>
      </ul>
  </li>
</ul>
<?php
};
?>

<?php
/**
 * Single Blog Page
 *
 * @package realhomes
 */

get_template_part('assets/' . INSPIRY_DESIGN_VARIATION . '/partials/blog/single');


