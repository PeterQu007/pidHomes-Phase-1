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
    //echo 'property-archive';
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
<script>
  var ajax_session = new Object();
</script>
<section class="rh_section rh_section--flex rh_wrap--padding rh_wrap--topPadding">
  <div class="rh_page rh_page__listing_page rh_page__main" style="width: 70%">
    
    <?php 
      $X = set_debug(__FILE__);
      //Get query var in order to filter the neighborhoods
      //entrance variable value for archive module
      //if it is null, means show all categories/taxonomies
      //if it is not null, means show specific categories/taxonomy
      $qvar = trim(get_query_var('property-neighborhood')); //query var is passed from url rewriting 
      // print_X($X, __LINE__, '$qvar::', $qvar, get_the_ID(), get_the_title()); //d//
      $page_nbh = get_query_var('page1',1);
      $page_school = get_query_var('page2', 1);
      $post_type_qvar = get_query_var('post_type');
      // print_X($X, __LINE__, 'page::', $pid_page, 'qvar::', $qvar, 'post type qvar::', $post_type_qvar);
      ?>
      <div >
      <!--
      // TODO: AJAX FILTER 
      <form action="<?php echo site_url() ?>/wp-admin/admin-ajax.php" method="POST" id="filter">
        <?php
          // if( $terms = get_terms( array(
          //     'taxonomy' => 'property-neighborhood', // to make it simple I use default categories
          //     'parent' => 0,
          //     'orderby' => 'name'
          //   ) ) ) : 
          //   // if categories exist, display the dropdown
          //   echo '<select name="categoryfilter"><option value="">Select Neighborhood...</option>';
          //   foreach ( $terms as $term ) :
          //     echo '<option value="' . $term->term_id . '">' . $term->name . '</option>'; // ID of the category as an option value
          //   endforeach;
          //   echo '</select>';
          // endif; 
        ?>
        <button>Apply filter</button>
        <input type="hidden" name="action" value="myfilter">
      </form>
        -->
        <div id = "demographic" class = "wrapper" uid="<?php echo $GEO_UID; ?>">
          <?php

          if($qvar == ''){
            // print_X($X, __LINE__, 'All Vancouver Markets Data');
            echo do_shortcode("[wpdatatable id=10]"); //population
            echo do_shortcode("[wpdatatable id=9]"); //education 
            echo do_shortcode("[wpdatatable id=18]"); //immigration
          }else{
            // print_X($X, __LINE__, 'Single City Markets Data');
            //get the guid for demographics
            $mysqli = new mysqli("localhost", "root", "root", "local");
            $strSql = "SELECT GEO_UID, c.City_Code, c.City_Full_Name FROM pid_census_subdivision_bc
                      INNER JOIN pid_cities c ON c.City_Code = pid_census_subdivision_bc.City_Code 
                      WHERE GEO_Name_nom = '" . $qvar . "'" 
                       ;
            // print_X($X, __LINE__, $strSql);
            $mysqli->real_query($strSql);
            $res = $mysqli->use_result();
            // print_X($X, __LINE__, $res);
            while ($row = $res->fetch_assoc()){
              // print_X($X, __LINE__, $row);
              $GEO_UID = $row['GEO_UID'];
              $City_Code = $row['City_Code'];
              $City_Full_Name = $row['City_Full_Name'];
            };
            ?>
            <h2 class="h2_title"> <?php echo $City_Full_Name ?> </h2>
            <?php
            echo do_shortcode("[wpdatatable id=6 var1='" . $City_Code . "']"); //population
            echo do_shortcode("[wpdatatable id=7 var1='" . $City_Code . "']"); //education & income
            echo do_shortcode("[wpdatatable id=17 var1='" . $City_Code . "']"); //immigration & minority
          }
        ?>
        </div>
      </div>
      <?php
      get_template_part('template-parts/content', 'x-postx');
      if($qvar == ''){
        echo do_shortcode("[wpdatatable id=11]"); // house inventory
      }else{
        echo do_shortcode("[wpdatatable id=8 var1='" . $City_Code . "']"); // house inventory
      }
      get_template_part('template-parts/content', 'market-stats');
      if($qvar == ''){
        echo do_shortcode("[wpdatatable id=16]"); // housing
      }else{
      }
      if($qvar != ''){
        set_query_var('post_type', 'school');
        get_template_part('template-parts/content', 'x-postx');
      }

    ?>
    
  </div>

  <div class="rh_page rh_page_sidebar" style="width: 30%">
    <?php get_sidebar( 'default' ); ?> 
  </div>

</section>

<!-- LOAD LOADMORE.JS -->
<script src="<?php echo get_stylesheet_directory_uri()?>/js/loadmore.js"></script>

<?php

get_footer();
