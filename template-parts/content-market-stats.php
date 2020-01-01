<!--
  Single Market Template File
  Dec 15 2019
-->

<?php

  $X = set_debug(__FILE__);
  //get the neighborhood_code
  //All markets | City code | district code | Neighborhood Code
  $qvar = get_query_var('qvar'); //get property-neighborhood slug
  // print_X($X, __LINE__, 'get_the_ID::', get_the_ID(), get_the_title(), 'is_single::', is_single(get_the_ID()), '$qvar::', $qvar); //d//

  if(is_single(get_the_ID())){
    $the_neighborhood = trim(get_the_ID());
    $metabox = nbh_3level_metabox($the_neighborhood);
  }else{
    $the_neighborhood = trim($qvar);
    // $metabox = nbh_2level_metabox_by_slug($the_neighborhood);
    $metabox = nbh_Direct_2level_metabox_by_slug($the_neighborhood);
  }
  // print_X($X, __LINE__, $metabox); //d//

  $neighborhood_code_string = '';
  $neighborhood_codes = [];
  $neighborhood_names = [];
  foreach($metabox as $meta){
    if($meta['get_chartdata']){
      $neighborhood_code_string .= $meta['3'] . ",";
      $neighborhood_names[$meta['3']] = $meta['1'] ;
    }
  }
  $neighborhood_code_string = rtrim($neighborhood_code_string, ',');
  $neighborhood_codes = explode(',', $neighborhood_code_string);
  //create neighborhood codes as mysql query IN operator's requirement:
  foreach($neighborhood_codes as $code){
    $neighborhood_code_query_string .= "'" . $code . "'" . ",";
  }
  $neighborhood_code_query_string =rtrim($neighborhood_code_query_string, ',');

  // print_X($X, __LINE__, $neighborhood_codes, $neighborhood_names);
  // print_X($X, __LINE__, $neighborhood_code_string, json_encode($neighborhood_names));

  global $wpdb;
  // $results = $wpdb->get_results("SELECT Neighborhood_Code, nbh.RE_Area_Code, nbh.City_Code, city.City_Name, area.RE_Area_Name 
  //                                 FROM pid_neighborhoods nbh
  //                                 RIGHT JOIN pid_cities city ON city.City_ID = nbh.City_ID
  //                                 RIGHT JOIN pid_re_areas area ON area.RE_Area_Code = nbh.RE_Area_Code
  //                                 WHERE neighborhood_name='" . $the_neighborhood . "'");

  $results = $wpdb->get_results("SELECT Neighborhood_Code, Neighborhood_Name
                                  FROM pid_neighborhoods
                                  WHERE Neighborhood_Code IN (" . $neighborhood_code_query_string . ");
                                ");
  // print_X($X, __LINE__, "SELECT Neighborhood_Code, Neighborhood_Name
  //                                 FROM pid_neighborhoods
  //                                 WHERE Neighborhood_Code IN (" . $neighborhood_code_query_string . ");
  //                               ");
  foreach($results as $nbh){
    $nbh_code = trim($nbh->Neighborhood_Code);
    // print_X($X, __LINE__, $nbh_code);
    $nbh_names[@$nbh_code] = trim($nbh->Neighborhood_Name);
  }
  // print_X($X, __LINE__, $nbh_names);
  // print_X($X, __LINE__, json_encode($nbh_names));

?>

<div class="metabox metabox--with-home-link" style="font-size: 20px; text-align: left; display: block">
  <div style="font-size: 16px; text-align: left; display: block" 
        id="marketSection" nbhCodes="<?php echo $neighborhood_code_string; ?>" nbhNames='<?php echo json_encode($nbh_names); ?>'>
   
    <?php if($qvar){ ?> 
      <a class="metabox__blog-home-link" href="<?php echo get_post_type_archive_link('market'); ?>">
        <i class="fas fa-reply-all" aria-hidden="true"></i>
        All
      </a>
    <?php } ?>
    <!-- Top Level City -->
    <?php if($metabox[0]['Term_ID']){
      ?>
      <a class="metabox__blog-home-link" href="<?php 
        echo get_site_url() . '/markets/' . $metabox[0][2]; ?>">
        <i class="fas fa-chart-area" aria-hidden="true"></i>
        <?php echo $metabox[0][1]; ?> </a>
    <?php } ?>
    <!-- Level 2 City District -->
    <?php for($i=1; $i < count($metabox); $i++){ 
      if($metabox[$i]['show_metabox']){
        $active = $metabox[$i]['get_chartdata'];
        ?>
        <a class="<?php echo $active ? 'metabox__blog-home-link-active' : 'metabox__blog-home-link'; ?>" href="<?php 
          echo get_site_url() . '/markets/' . $metabox[$i][2]; ?>">
          <i class="fas fa-chart-line" aria-hidden="true"></i>
          <?php echo $metabox[$i][1]; ?> </a>
    <?php }}; ?>


  </div>
</div>

<div style="text-align: left">
  <form style="display:block">
    <span style="display:inline-block!important;">Select Property Type: &nbsp&nbsp&nbsp&nbsp </span>
    <select id="Property_Type" name="Property_Type" style="width: 150px!important; border: 1px">
      <option value="All">All Property</option>
      <option value="Detached">Detached Property</option>
      <option value="Townhouse">Townhouse</option>
      <option value="Apartment">Apartment</option>
    </select> 
  </form>
  <div style="clear:both"></div>
</div>
<div style="text-align: left">
  <canvas id="lineChart" height="400px !important", width="400"></canvas>
</div>

<?php
if(have_posts()){
    while (have_posts()) {
      the_post();?>
        <div style="text-align: left">
          <h2><?php //the_title();?></h2>
          <?php //get_field('banner_image')?>
          <div><?php //the_content();?> </div> 
          
          <?php 
          global $wpdb;
          //$school = $wpdb->get_var("SELECT COUNT(*) FROM pid_schools WHERE school_name='Fraser Heights'");
          //echo "<p>User Count is {$user_count}</p>";
          $results = $wpdb->get_results("SELECT school_year, school_type, `rank`, rank5, rating FROM pid_schools WHERE school_name='" . get_field('school_name') . "'");
          // foreach($results as $school){
          //    echo "<p>{$school->rank}</p>";
          // }
          ?>
          <!--
            toDo: Format School Rank & Rating Style
          -->
        </div>
    <?php /*while[]*/}
} /*if */ ?>

