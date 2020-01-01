<section class="blog-home">
		<article>
			<?php
 
			  $paged = ( get_query_var('page') ) ? get_query_var('page') : 1;
			  $query_args = array(
			    'post_type' => 'post',
			    'paged' => $paged
			  );
 
			  $the_query = new WP_Query( $query_args );
			?>
 
			<?php if ( $the_query->have_posts() ) : while ( $the_query->have_posts() ) : $the_query->the_post(); // run the loop ?>
			  <section id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
 
				<div class="section-bg">
			    		<?php if ( '' !== get_the_post_thumbnail() && ! is_single() ) : ?>
					<div class="post-thumbnail">
						<a href="<?php the_permalink(); ?>">
							<?php the_post_thumbnail( 'twentyseventeen-featured-image' ); ?>
						</a>
					</div><!-- .post-thumbnail -->
				<?php endif; ?>
 
					<a href="<?php the_permalink(); ?>"><h3><?php the_title(); ?></h3></a>
					<div class="author">By <?php the_author(); ?> </div>
			    </div>
			  </section>
			<?php endwhile; ?>
 
			<?php if ($the_query->max_num_pages > 1) { // check if the max number of pages is greater than 1  ?>
			<button class="loadmore2">Load More</button>
			<?php } ?>
 
			<?php else: ?>
			  <article>
			    <h1>Sorry...</h1>
			    <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
			  </article>
			<?php endif; ?>
		</article>	
</section>
 
<script>
	var posts_myajax = '<?php echo serialize( $the_query->query_vars ) ?>',
    current_page_myajax = 1,
    max_page_myajax = <?php echo $the_query->max_num_pages ?>
</script>
<script src="<?php bloginfo('template_url')?>/loadmore.js"></script>