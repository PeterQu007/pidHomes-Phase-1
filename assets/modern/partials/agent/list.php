<?php
/**
 * Agents List
 *
 * @since      3.0.0
 * @package    realhomes
 * @subpackage modern
 */

// Page Head.
$header_variation = get_option( 'inspiry_agents_header_variation' );

?>

<section class="rh_section rh_section--flex rh_wrap--padding rh_wrap--topPadding">

	<div class="rh_page rh_page__agents rh_page__main">


		<?php if ( empty( $header_variation ) || ( 'none' === $header_variation ) ) : ?>
			<div class="rh_page__head rh_page--agents_listing">

				<h2 class="rh_page__title">
					<?php
					// Page Title.
					$page_title = get_post_meta( get_the_ID(), 'REAL_HOMES_banner_title', true );
					if ( empty( $page_title ) ) {
						$page_title = get_the_title( get_the_ID() );
					}
					echo inspiry_get_exploded_heading( $page_title );
					?>
				</h2>
				<!-- /.rh_page__title -->

			</div>
			<!-- /.rh_page__head -->
		<?php
        endif;

		$get_content_position = get_post_meta( get_the_ID(), 'REAL_HOMES_content_area_above_footer',true );

		if(  $get_content_position !== '1'){

			if ( have_posts() ) {
				while ( have_posts() ) {
					the_post();
					?>
                    <div class="rh_content <?php if(get_the_content()){ echo esc_attr('rh_page__content');} ?>">
						<?php the_content(); ?>
                    </div>
                    <!-- /.rh_content -->
					<?php

				}
			}
		}

		?>

		<div class="rh_page__listing">
			<?php
			$number_of_posts = intval( get_option( 'theme_number_posts_agent' ) );
			if ( ! $number_of_posts ) {
				$number_of_posts = 3;
			}
			global $paged;

			$agents_query = array(
				'post_type'      => 'agent',
				'posts_per_page' => 2 , //$number_of_posts, Only show first two agents
				'paged'          => false //$paged,
			);

			$agent_listing_query = new WP_Query( $agents_query );

			if ( $agent_listing_query->have_posts() ) :
				while ( $agent_listing_query->have_posts() ) :
					$agent_listing_query->the_post();
					get_template_part( '/assets/modern/partials/agent/card' );
				endwhile;
			else :
				?>
				<div class="rh_alert-wrapper">
					<h4 class="no-results"><?php esc_html_e( 'No Results Found!', 'framework' ); ?></h4>
				</div>
				<?php
			endif;
			?>
		</div>
		<!-- /.rh_page__listing -->

		<!-- <?php inspiry_theme_pagination( $agent_listing_query->max_num_pages ); ?> -->

	</div>
	<!-- /.rh_page rh_page__main -->

	<div class="rh_page rh_page__sidebar">
		<?php get_sidebar( 'property-listing' ); ?>
	</div>
	<!-- /.rh_page rh_page__sidebar -->

</section>

<?php
if ('1' === $get_content_position ) {

	if ( have_posts() ) {
		while ( have_posts() ) {
			the_post();
			?>
            <div class="rh_content <?php if ( get_the_content() ) {echo esc_attr( 'rh_page__content' );} ?>">
				<?php the_content(); ?>
            </div>
            <!-- /.rh_content -->
			<?php

		}
	}
}
?>
<!-- /.rh_section rh_wrap rh_wrap--padding -->
