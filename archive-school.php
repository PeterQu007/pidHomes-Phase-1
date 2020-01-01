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
    get_template_part('assets/modern/partials/banner/school');
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
        include_once(get_stylesheet_directory() . '/db/pdoConn.php');
        //Get query var in order to filter the neighborhoods
        //entrance variable value for archive module
        //if it is null, means show all categories/taxonomies
        //if it is not null, means show specific categories/taxonomy
        $qvar = get_query_var('property-neighborhood'); //query var is passed from url rewriting
        $term = get_term_by('slug', $qvar, 'property-neighborhood');
        $page_school = get_query_var('page2', 1);
        // print_X1($X, __LINE__, $qvar, $page_school, ' term_id::', $term->term_id);
        if($qvar){
            $stmt_check_term_level = $pdo->prepare("CALL procedure_term_single_path_by_term_id(?)");
            $stmt_check_term_level->bindParam(1, $term->term_id , PDO::PARAM_INT);
            $stmt_check_term_level->execute();
            $term_single_path = [];
            while($level = $stmt_check_term_level->fetch()){
                $term_single_path[] = $level;
            };
            // print_X($X, __LINE__, $term_single_path);
            $stmt_check_term_level = null;
            $pdo = null;
            // exit;
            $Neighborhood_Name = $term_single_path[count($term_single_path)-1]['neighborhood_name'];
        }else{
            $Neighborhood_Name = "Greater Vancouver";
        }
        ?>
        <h2 class="h2_title"> <?php echo ucfirst($Neighborhood_Name) . " Schools" ?> </h2>
        <?php
        get_template_part('template-parts/content', 'x-postx');
        // print_X($X, __LINE__, $qvar); //d//

        if($qvar){
            foreach($term_single_path as $nbh){
                // print_X($X, __LINE__, $nbh);
                // print_X($X, __LINE__, $nbh['name']);
                switch($nbh['level']){
                case 0: //city level
                    $City_name = $nbh['name'];
                    $wpdt_id_high_school =21;
                    $wpdt_id_elementary_school=24;
                break;
                case 1: //district level
                    $District_name = $nbh['name'];
                    $wpdt_id_high_school =20;
                    $wpdt_id_elementary_school=23;
                break;
                case 2: //neighborhood level
                    $Neighborhood_name = $nbh['name'];
                    $wpdt_id_high_school =1;
                    $wpdt_id_elementary_school=19;
                break;
                }
            }
            // print_X($X, __LINE__, $City_name, $District_name, $Neighborhood_name);
            // print_X($X, __LINE__, 'high school table id::', $wpdt_id_high_school, 'elementary school table id::',  $wpdt_id_elementary_school);
            $school_paras = "var1='". $City_name ."' var2='" . $District_name . "' var3='". $Neighborhood_name. "'";
            // print_X($X, __LINE__, $school_paras);
            echo '<h3 style="text-align: left"> High Schools </h3>';
            echo do_shortcode("[wpdatatable id=" .$wpdt_id_high_school. " " . $school_paras." ]"); //high schools
            echo '<h3 style="text-align: left"> Elementary Schools </h3>';
            echo do_shortcode("[wpdatatable id=" .$wpdt_id_elementary_school. " " .$school_paras."]"); //[wpdatatable id=19] elementary schools
        }else{
            echo '<h3 style="text-align: left"> High Schools </h3>';
            echo do_shortcode("[wpdatatable id=22]"); //high schools
            echo '<h3 style="text-align: left"> Elementary Schools </h3>';
            echo do_shortcode("[wpdatatable id=25]"); //[wpdatatable id=19] elementary schools
        }
        ?>

    </div>

    <div class="rh_page rh_page_sidebar" style="width: 30%">
        <?php get_sidebar('default'); ?>
    </div>
</section>
<!-- LOAD LOADMORE.JS -->
<script src="<?php echo get_stylesheet_directory_uri()?>/js/loadmore.js"></script>


<?php

get_footer();
