<?php
/*-----------------------------------------------------------------------------------*/
/*	Enqueue Styles in Child Theme
/*-----------------------------------------------------------------------------------*/
if ( ! function_exists( 'inspiry_enqueue_child_styles' ) ) {
	function inspiry_enqueue_child_styles() {
		if ( ! is_admin() ) {
			// dequeue and deregister parent default css
			wp_dequeue_style( 'parent-default' );
			wp_deregister_style( 'parent-default' );

			// dequeue parent custom css
			wp_dequeue_style( 'parent-custom' );

			// parent default css
			wp_enqueue_style( 'parent-default', get_template_directory_uri() . '/style.css' );

			// parent custom css
			wp_enqueue_style( 'parent-custom' );

			// child default css
			wp_enqueue_style( 'child-default', get_stylesheet_uri(), array( 'parent-default' ), '1.0', 'all' );

			// child custom css
			wp_enqueue_style( 'child-custom', get_stylesheet_directory_uri() . '/css/child-custom.css', array( 'child-default' ), '1.4', 'all' );

			// child custom js
			wp_enqueue_script( 'child-custom', get_stylesheet_directory_uri() . '/js/child-custom.js', array( 'jquery' ), '1.4', true );
		}
	}
}
add_action( 'wp_enqueue_scripts', 'inspiry_enqueue_child_styles', PHP_INT_MAX );


if ( ! function_exists( 'inspiry_load_translation_from_child' ) ) {
	/**
	 * Load translation files from child theme
	 */
	function inspiry_load_translation_from_child() {
		load_child_theme_textdomain( 'framework', get_stylesheet_directory() . '/languages' );
	}

	add_action( 'after_setup_theme', 'inspiry_load_translation_from_child' );
}

/*Add Child Functions
*/
// echo get_stylesheet_directory_uri().'/inc/debug.php';
// include_once(get_stylesheet_directory_uri().'/inc/debug.php');
require_once("googleMapKey.php");

include_once get_stylesheet_directory() . '/inc/debug.php';

$X = set_debug(__FILE__);

function pidRealty_Files()
{
    //load js scripts
    // wp_enqueue_script('main-pidrealty-js', get_stylesheet_directory_uri().('/js/scripts-bundled.js'), null, microtime(), true);
    wp_enqueue_script('pidHomes-js', get_stylesheet_directory_uri() . ('/js/appjs-bundled.js'), null, microtime(), true);
    //vendor.js file includes all the code from our external libraries
    //vendor.js is used for testimonies /features lazy loading in about page
    wp_enqueue_script('vendor-js', get_stylesheet_directory_uri().("/js/Vendor.js"));
    // wp_enqueue_script('ajax-cors', get_stylesheet_directory_uri(). ("/js/modules/jquery.ajax-cross-origin.min.js"));
    wp_enqueue_script('chartjs-crosshair', "//cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js");

    // wp_enqueue_script('CentrisMainFramework', get_theme_file_uri('/js/centris.js'), null, '1.0', true);
    wp_enqueue_script('font-awesome', '//kit.fontawesome.com/957bcd8e88.js', null, '5.11', true);
    //load css files
    wp_enqueue_style('custom-google-fonts', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
    // wp_enqueue_style('pidRealty_secondary_style', get_stylesheet_directory_uri().("/temp/styles.css"));
    //load php data for js
    if(!is_home()){
      wp_localize_script('pidHomes-js', 'pid_Data', array( 
        'siteurl' => get_site_url(),
        'nonce' => wp_create_nonce('wp_rest'),
        'first_page' => get_pagenum_link(1)
      ));
    }
}
add_action('wp_enqueue_scripts', 'pidRealty_Files');

function pidHomes_child_features()
{
    add_theme_support('title-tag');
    //41. Featured Image Post
    add_theme_support('post-thumbnails');
    //41.. Add image size
    //42.. Crop image precisely, use parameter array('left', 'top') to replace true
    //42.. example: add_image_size('professorLandscape', 400, 260, array('left','top'));
    //42.. use 'manual image crop' plugin to do the precisely cropping;
    add_image_size('professorLandscape', 400, 260, true);
    add_image_size('professorPortrait', 480, 650, true);
    //43.. Add page banner pic size
    add_image_size('pageBanner', 1900, 300, true);
    add_image_size('pageBanner-about', 1900, 800, true);

}

add_action('after_setup_theme', 'pidHomes_child_features');

// function pidHomesMapKey($api)
// {
//     $api['key'] = '';
//     return $api;
// }
// add_filter('acf/fields/google_map/api', 'pidHomesMapKey');


// function pidhomes_child_files()
// {
//     //49. Map on Front-End | 49.. Add google map js and key
//     wp_enqueue_script('googleMap', '//maps.googleapis.com/maps/api/js?key=', null, '1.0', true);
//     wp_enqueue_script('main-university-js', get_theme_file_uri('/js/scripts-bundled.js'), null, '1.0', true);
//     wp_enqueue_script('CentrisMainFramework', get_theme_file_uri('/js/centris.js'), null, '1.0', true);
//     wp_enqueue_style('custom-google-fonts', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
//     wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
//     wp_enqueue_style('university_main_styles', get_stylesheet_uri());
//     //59.
//     wp_localize_script('main-university-js', 'universityData', array(
//         'root_url' => get_site_url(),
//         'nonce' => wp_create_nonce('wp_rest'), //80. | Prepare to authorize to delete a note post
//     ));
// }

// add_action('wp_enqueue_scripts', 'pidhomes_child_files');

function pageBanner($args = null)
{
    // 44.. add arguments
    if (!$args['title']) {
        $args['title'] = get_the_title();
    }
    if (!$args['subtitle']) {
        $args['subtitle'] = get_field('page_banner_subtitle');
    }
    if (!$args['photo']) {
        if (get_field('page_banner_background_image')) {
            //echo print_r(get_field('page_banner_background_image'));
            $args['photo'] = get_field('page_banner_background_image')['sizes']['pageBanner'];
        } else {
            $args['photo'] = get_theme_file_uri('/images/field.jpg');
        }
    }
    ?>
   <div class="page-banner">
      <?php //43. Change the banner background image to dynamic image
    //43.. Select specific size image ?>
      <div class="page-banner__bg-image" style="background-image: url(<?php
				echo $args['photo'];
    ?>);">
      </div>
      <div class="page-banner__content container container--narrow">
        <h1 class="page-banner__title"><?php echo $args['title']; ?></h1>
        <div class="page-banner__intro">
          <?php //43. Change the sub title to dynamic text?>
          <p><?php echo $args['subtitle'] ?></p>
        </div>
      </div>
    </div>

  <?php
}

//Add public Query Variable
add_filter('query_vars', 'custom_query_vars_filter', 0, 1);

function custom_query_vars_filter($vars){
  $vars[] = 'property-neighborhood'; //, 'property-city', 'school');
  $vars[] = 'property-city'; //
  $vars[] = 'page1';
  $vars[] = 'page2';
  return $vars;
}

// function custom_query_vars_filter($vars) {
//   $vars[] .= 'page1';
//   $vars[] .= 'page2';
//   return $vars;
// }
// add_filter( 'query_vars', 'custom_query_vars_filter' );


/**
 * Add term meta to results of get_terms
 * See /genesis/lib/functions/options.php for more info
 *
 *
 * Genesis is forced to create its own term-meta data structure in
 * the options table. Therefore, the following function merges that
 * data into the term data structure, via a filter.
 *
 * @param array $terms
 * @param string $taxonomy Taxonomy name that $terms are part of.
 * @param array $args
 * @return array $terms
 */
// function be_get_terms_filter($terms, $taxonomy, $args)
// {
//     foreach ($terms as $term) {
//         $term = genesis_get_term_filter($term, $taxonomy);
//     }

//     return $terms;
// }
// add_filter('get_terms', 'be_get_terms_filter', 10, 3);


/************
 * NOTICE
 * AFTER CHANGE THE REWRITE RULE, WORDPRESS NEEDS RESET PERMALINK ON ADMIN PANEL
 */
//Add Rewrite Rules
add_rewrite_rule('^schools/([^/]*)/page/([^/]*)/?','index.php?post_type=school&property-neighborhood=$matches[1]&page2=$matches[2]','top');
add_rewrite_rule('^schools/([^/]*)/?','index.php?post_type=school&property-neighborhood=$matches[1]','top');
add_rewrite_rule('^school/([^/]*)/?','index.php?post_type=school&name=$matches[1]','top');
//Community
add_rewrite_rule('^communities/([^/]*)/page/([^/]*)/?','index.php?post_type=community&property-neighborhood=$matches[1]&page1=$matches[2]','top');
add_rewrite_rule('^communities/([^/]*)/?','index.php?&post_type=community&property-neighborhood=$matches[1]','top');
add_rewrite_rule('^community/([^/]*)/?','index.php?post_type=community&name=$matches[1]','top');
//Market
add_rewrite_rule('^markets/([^/]*)/?', 'index.php?post_type=market&property-neighborhood=$matches[1]', 'top');
add_rewrite_rule('^market/([^/]*)/?', 'index.php?post_type=market&name=$matches[1]', 'top');
//Database
add_rewrite_rule('^db/([^/]*)/?', get_theme_file_uri('/db/data.php'), 'top');


// function pid_load_more_scripts() {
//  	if ( is_home() ) {
// 		global $wp_query; 
 
// 		// In most cases it is already included on the page and this line can be removed
// 		//wp_enqueue_script('jquery');
 
// 		// register our main script but do not enqueue it yet
// 		wp_register_script( 'my_loadmore', get_stylesheet_directory_uri() . '/js/loadmore.js', array('jquery') );
 
// 		// now the most interesting part
// 		// we have to pass parameters to myloadmore.js script but we can get the parameters values only in PHP
// 		// you can define variables directly in your HTML but I decided that the most proper way is wp_localize_script()
// 		wp_localize_script( 'my_loadmore', 'loadmore_params', array(
// 			'ajaxurl' => site_url() . '/wp-admin/admin-ajax.php', // WordPress AJAX
// 			'posts' => serialize( $wp_query->query_vars ), // everything about your loop is here
// 			'current_page' => get_query_var( 'paged' ) ? get_query_var('paged') : 1,
// 			'max_page' => $wp_query->max_num_pages
// 		) );
 
// 	 	wp_enqueue_script( 'my_loadmore' );
//  	}
// }
// add_action( 'wp_enqueue_scripts', 'pid_load_more_scripts' );

//ajax handler
function pid_loadmore_ajax_handler(){
  $X = set_debug(__FILE__);
	// prepare our arguments for the query
	$args = json_decode( stripslashes( $_POST['query'] ), true );
	$args['paged'] = $_POST['page']; // we need next page to be loaded
  $args['post_status'] = 'publish';
  $session_id = $_POST['session_id'];
 
	// it is always better to use WP_Query but not here
	query_posts( $args );
  // print_X($X, __LINE__, $args['paged']);
  $post_type = $args['post_type'];
  $post_type_labels = get_post_type_labels(get_post_type_object($post_type));

	if( have_posts() ) :
    $iLoop =1;
		// run the loop
		while( have_posts() ): the_post();
      // print_X($X, __LINE__, '$iLoop::', $iLoop++);
			// look into your theme code how the posts are inserted, but you can use your own HTML of course
			// do you remember? - my example is adapted for Twenty Seventeen theme
      // get_template_part( 'template-parts/content', get_post_format() );
      //get_template_part('template-parts/content', 'x-postx');
      ?>
        <div style="text-align: left" class="<?php echo $session_id ?>">
            <h3><a href="<?php echo str_replace("/" . strtolower($post_type_labels->name) . "/",
            "/" . strtolower($post_type_labels->singular_name) . "/",
                  strtolower(get_the_permalink())); ?>">
                <?php the_title();?></a>
            </h3>
            <div><?php the_excerpt();?> </div>
        </div>
      <?php
      // for the test purposes comment the line above and uncomment the below one
        // the_title();

        // echo '</br>';
        // the_excerpt();
        // echo '</br>';

		endwhile;
 
  endif;
	die; // here we exit the script and even no wp_reset_query() required!
}
add_action('wp_ajax_loadmore', 'pid_loadmore_ajax_handler'); // wp_ajax_{action}
add_action('wp_ajax_nopriv_loadmore', 'pid_loadmore_ajax_handler'); // wp_ajax_nopriv_{action}

/****************
 * CUSTOMIZE THE PAGINATOR
 */
function pid_paginator($query, $session_id){

  $X = set_debug(__FILE__);
 
	// the function works only with $wp_query that's why we must use query_posts() instead of WP_Query()
	// global $wp_query;
 
	// remove the trailing slash if necessary
	// $first_page_url = untrailingslashit( $first_page_url );
  // print_X($X, __LINE__, $first_page_url);
 
	// it is time to separate our URL from search query
	// $first_page_url_exploded = array(); // set it to empty array
  // $first_page_url_exploded = explode("/?", $first_page_url);
  // print_X($X, __LINE__, $first_page_url_exploded);
	// by default a search query is empty
	// $search_query = '';
	// if the second array element exists
	// if( isset( $first_page_url_exploded[1] ) ) {
	// 	$search_query = "/?" . $first_page_url_exploded[1];
	// 	$first_page_url = $first_page_url_exploded[0];
	// }
 
	// get parameters from $wp_query object
	// how much posts to display per page (DO NOT SET CUSTOM VALUE HERE!!!)
	$posts_per_page = (int) $query->query_vars['posts_per_page'];
	// current page
	$current_page = (int) $query->query_vars['paged'];
	// the overall amount of pages
	$max_page = $query->max_num_pages;
 
	// we don't have to display pagination or load more button in this case
	if( $max_page <= 1 ) return;
 
	// set the current page to 1 if not exists
	if( empty( $current_page ) || $current_page == 0) $current_page = 1;
 
	// you can play with this parameter - how much links to display in pagination
	$links_in_the_middle = 10;
	$links_in_the_middle_minus_1 = $links_in_the_middle-1;
 
	// the code below is required to display the pagination properly for large amount of pages
	// I mean 1 ... 10, 12, 13 .. 100
	// $first_link_in_the_middle is 10
	// $last_link_in_the_middle is 13
	$first_link_in_the_middle = $current_page - floor( $links_in_the_middle_minus_1/2 );
	$last_link_in_the_middle = $current_page + ceil( $links_in_the_middle_minus_1/2 );
 
	// some calculations with $first_link_in_the_middle and $last_link_in_the_middle
	if( $first_link_in_the_middle <= 0 ) $first_link_in_the_middle = 1;
	if( ( $last_link_in_the_middle - $first_link_in_the_middle ) != $links_in_the_middle_minus_1 ) { $last_link_in_the_middle = $first_link_in_the_middle + $links_in_the_middle_minus_1; }
	if( $last_link_in_the_middle > $max_page ) { $first_link_in_the_middle = $max_page - $links_in_the_middle_minus_1; $last_link_in_the_middle = (int) $max_page; }
	if( $first_link_in_the_middle <= 0 ) $first_link_in_the_middle = 1;
 
	// begin to generate HTML of the pagination
  $pagination = '<nav id="pid_pagination_' . $session_id . '" class="wpDataTables wpDataTablesWrapper no-footer" role="navigation">
                <div class="dataTables_paginate paging_full_numbers">';
 
  // arrow first page
  if($current_page == 1){
    $pagination.= '<a class="paginate_button first disabled pid-page-numbers" page_id="first"></a>';
  }else{
    $pagination.= '<a class="paginate_button first pid-page-numbers" page_id="first"></a>';
  }
                
	// when to display "..." and the first page before it
	// if ($first_link_in_the_middle >= 3 && $links_in_the_middle < $max_page) {
	// 	$pagination.= '<a class="paginate_button pid-page-numbers" page_id="1">1</a>'; //'. $first_page_url . $search_query . '
 
	// 	if( $first_link_in_the_middle != 2 )
	// 		$pagination .= '<span class="paginate_button pid-page-numbers extend">...</span>';
	// }

	// arrow left (previous page)
	if ($current_page == 1){
    $pagination.= '<a class="paginate_button previous disabled pid-page-numbers" page_id="previous"></a>'; //'. $first_page_url . '/page/' . ($current_page-1) . $search_query . '
  }else{
    $pagination.= '<a class="paginate_button previous pid-page-numbers" page_id="previous"></a>'; //'. $first_page_url . '/page/' . ($current_page-1) . $search_query . '
  }

  $pagination.='<span>';
	// loop page links in the middle between "..." and "..."
	// for($i = $first_link_in_the_middle; $i <= $last_link_in_the_middle; $i++) {
	// 	if($i == $current_page) {
	// 		$pagination.= '<a class="paginate_button current pid-page-numbers">'.$i.'</a>';
	// 	} else {
	// 		$pagination .= '<a class="paginate_button pid-page-numbers" page_id="' . $i . '" >' .$i. '</a>'; //'. $first_page_url . '/page/' . $i . $search_query .'
	// 	}
  // }
  
  for($i = 1; $i <= $max_page; $i++) {
    if($i == $current_page) {
      $pagination.= '<a class="paginate_button current pid-page-numbers" page_id="' . $i . '">'.$i.'</a>';
    } else {
      $pagination .= '<a class="paginate_button pid-page-numbers" page_id="' . $i . '" >' .$i. '</a>'; //'. $first_page_url . '/page/' . $i . $search_query .'
    }
  }

 
	// when to display "..." and the last page after it
	// if ( $last_link_in_the_middle < $max_page ) {
 
	// 	if( $last_link_in_the_middle != ($max_page-1) )
	// 		$pagination .= '<span class="pid-page-numbers extend">...</span>';
 
	// 	$pagination .= '<a class="pid-page-numbers" page_id="' . $max_page . '">'. $max_page .'</a>'; //'. $first_page_url . '/page/' . $max_page . $search_query .'
  // }
  $pagination.='</span>';

	// arrow right (next page)
	// if ($current_page != $last_link_in_the_middle )
  //   $pagination.= '<a class="paginate_button next pid-page-numbers"></a>'; //'. $first_page_url . '/page/' . ($current_page+1) . $search_query .'
 
  if($current_page == $max_page){
    $pagination.= '<a class="paginate_button next disabled pid-page-numbers" page_id="next"></a>'; //'. $first_page_url . '/page/' . ($current_page+1) . $search_query .'
  }else{
    $pagination.= '<a class="paginate_button next pid-page-numbers" page_id="next"></a>'; //'. $first_page_url . '/page/' . ($current_page+1) . $search_query .'
  }
  // arrow last page
  if($current_page == $max_page){
    $pagination.= '<a class="paginate_button last disabled pid-page-numbers" page_id="last"></a>';
  }else{
    $pagination.= '<a class="paginate_button last pid-page-numbers" page_id="last"></a>';
  }
  
  // end HTML
	$pagination.= "</div></nav>\n";
 
	// haha, this is our load more posts link
	// if( $current_page < $max_page )
	// 	$pagination.= '<div id="misha_loadmore">More posts</div>';
 
	// replace first page before printing it
  // echo str_replace(array("/page/1?", "/page/1\""), array("?", "\""), $pagination);
  echo $pagination;
}


//Add include modules
require_once (get_stylesheet_directory() . '/inc/neighborhood-metabox.php');

// function add_cors_http_header()
// {
//     header("Access-Control-Allow-Origin: *");
// }
// add_action('init', 'add_cors_http_header');


//End of PHP

/*
  GENERAL FUNCTION LIBRARY
*/



// function print_var_name($var){
//   foreach ($GLOBALS as $var_name => $value) {
//       if ($value === $var) {
//           return $var_name;
//       }
//   }
//   return false;
// }

// function get_func_argNames($funcName)
// {
//     $f = new ReflectionFunction($funcName);
//     $result = array();
//     foreach ($f->getParameters() as $param) {
//         $result[] = $param->name;
//     }
//     return $result;
// }

?>