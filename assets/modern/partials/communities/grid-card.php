<?php
/**
 * Grid Property Card
 *
 * Property grid card to be displayed on grid listing page.
 *
 * @since    3.0.0
 * @package RH/modern
 */

$property_size = get_post_meta(get_the_ID(), 'REAL_HOMES_property_size', true);
$size_postfix = get_post_meta(get_the_ID(), 'REAL_HOMES_property_size_postfix', true);
$property_bedrooms = get_post_meta(get_the_ID(), 'REAL_HOMES_property_bedrooms', true);
$property_bathrooms = get_post_meta(get_the_ID(), 'REAL_HOMES_property_bathrooms', true);
$property_address = get_post_meta(get_the_ID(), 'REAL_HOMES_property_address', true);
$is_featured = get_post_meta(get_the_ID(), 'REAL_HOMES_featured', true);

?>

<article <?php post_class('rh_prop_card rh_prop_card--listing');?>>

	<div class="rh_prop_card__wrap">

		<?php if ($is_featured): ?>
			<div class="rh_label rh_label__property_grid">
				<div class="rh_label__wrap">
					<?php esc_html_e('Featured', 'framework');?>
					<span></span>
				</div>
			</div>			<!-- /.rh_label -->
		<?php endif;?>

		<figure class="rh_prop_card__thumbnail">
			<a href="<?php the_permalink();?>">
				<?php
        if (has_post_thumbnail(get_the_ID())) {
            the_post_thumbnail('modern-property-child-slider');
        } else {
            inspiry_image_placeholder('modern-property-child-slider');
        }
        ?>
			</a>

			<div class="rh_overlay"></div>
			<div class="rh_overlay__contents rh_overlay__fadeIn-bottom">
				<a href="<?php the_permalink();?>"><?php inspiry_property_detail_page_link_text();?></a>
			</div>
			<!-- /.rh_overlay__contents -->

			<?php inspiry_display_property_label(get_the_ID());?>

			<div class="rh_prop_card__btns">
				<?php
// Display add to favorite button
inspiry_favorite_button();

$compare_properties_module = get_option('theme_compare_properties_module');
$inspiry_compare_page = get_option('inspiry_compare_page');
if (('enable' === $compare_properties_module) && ($inspiry_compare_page)) {
    get_template_part('assets/modern/partials/properties/compare/button');
}
?>
			</div>
			<!-- /.rh_prop_card__btns -->
		</figure>
		<!-- /.rh_prop_card__thumbnail -->

		<div class="rh_prop_card__details">

			<h3>
				<a href="<?php the_permalink();?>"><?php the_title();?></a>
			</h3>
			<p class="rh_prop_card__excerpt"><?php framework_excerpt(10);?></p>
      <div><span>Community Area: &nbsp<?php echo get_field('community_area'); ?></span></div>
      <div><span>Private Dwellings: &nbsp<?php echo get_field('occupied_private_dwellings'); ?></span></div>
      <div><span>Population: &nbsp<?php echo get_field('population'); ?> </span></div>
      <div><span>Average Household Income: &nbsp<?php echo get_field('average_household_income'); ?></span></div>
			<!-- /.rh_prop_card__excerpt -->



		</div>
		<!-- /.rh_prop_card__details -->

	</div>
	<!-- /.rh_prop_card__wrap -->

</article><!-- /.rh_prop_card -->
