<?php

/*
  MODULE OF FUNCTION.PHP
  ======================
  @neighborhoodID
  return metabox for section banner menu
*/
function nbh_3level_metabox($neighborhoodID){

  // print_X('red', __FILE__, 'neighborhoodID', $neighborhoodID);

	$metabox = [];

	$terms = get_the_terms($neighborhoodID, 'property-neighborhood');
    // print_X('', __LINE__, __FILE__, __FUNCTION__ , $terms); //d//

    foreach ($terms as $term) {
      //Get Top Level Term
      if (!$term->parent) {
          $topTermID = $term->term_id;
          $topTermName = $term->name;
          $topTermSlug = $term->slug;
      }

      //Get Level 3 Term
      if(!get_term_children($term->term_id, 'property-neighborhood')){
        $level3TermID = $term->term_id;
        $level3TermName = $term->name;
        $level3TermSlug = $term->slug;
      }
    }
    foreach($terms as $term){
      //Get Level 2 Term
      if($topTermID & $term->parent == $topTermID){
          $level2TermID = $term->term_id;
          $level2TermName = $term->name;
          $level2TermSlug = $term->slug;
      }
    }

    array_push($metabox, array(
              '0'=> $topTermID,
              '1'=> $topTermName,
              '2' => $topTermSlug,
              '3' => get_term_meta($topTermID, 'neighborhood_code', true),
              'Term_ID' => $topTermID,
              'Term_Name' => $topTermName,
              'Term_Slug' => $topTermSlug,
              'Term_Code' => get_term_meta($topTermID, 'neighborhood_code', true),
              'show_metabox' => true,
              'get_chartdata' => true
            ));

    array_push($metabox, array(
              '0' => $level2TermID,
              '1' => $level2TermName,
              '2' => $level2TermSlug,
              '3' => get_term_meta($level2TermID, 'neighborhood_code', true),
              'Term_ID' => $level2TermID,
              'Term_Name' => $level2TermName,
              'Term_Slug' => $level2TermSlug,
              'Term_Code' => get_term_meta($level2TermID, 'neighborhood_code', true),
              'show_metabox' => true,
              'get_chartdata' => true
          ));
     array_push($metabox, array(
              '0' => $level3TermID,
              '1' => $level3TermName,
              '2' => $level3TermSlug,
              '3' => get_term_meta($level3TermID, 'neighborhood_code', true),
              'Term_ID' => $level3TermID,
              'Term_Name' => $level3TermName,
              'Term_Slug' => $level3TermSlug,
              'Term_Code' => get_term_meta($level3TermID, 'neighborhood_code', true),
              'show_metabox' => true,
              'get_chartdata' => true
             ));   
    
    // print_X('red', __FILE__, $metabox);

    return $metabox;
}

/*
  @community post ID: $nbhID
  return: first two level terms of community taxonomy tree
*/
function nbh_2Level_metabox_by_ID($nbhID){

  $X = set_debug(__FILE__);

  $metabox = [];

  $terms = get_the_terms($nbhID, 'property-neighborhood');

  // print_x('blue', 'nbh_2Level_metabox_by_ID ' . $nbhID, $terms); //d//

  foreach ($terms as $term) {
    //Get Top Level Term
    if (!$term->parent) {
        $topLevelTerm = $term;
        $topTermID = $term->term_id;
        $topTermName = $term->name;
        $topTermCode = get_term_meta($term->term_id, 'neighborhood_code', true);
        // print_X( $X, __LINE__, __FUNCTION__ , $topTermID, $topLevelTerm); //d//
    }
  }

  $level2Terms = get_terms(array(
    'taxonomy' => 'property-neighborhood',
    'parent' => $topTermID, //get direct children
    'orderby' => 'slug',
    'order' => 'ASC', //'DESC',
    //'child_of' => $topTermID, //get all children
    'hide_empty' => false,
  ));
  // print_X('green', $level2Terms); //d//

  // $level2Term1 = $level2Terms[0];
  // $level2Term2 = $level2Terms[1];
  // $level2Term3 = $level2Terms[2];

  // Output the results with Normalized Var names
  array_push($metabox, array(
      '0' => $topLevelTerm->term_id,
      '1' => $topLevelTerm->name,
      '2' => $topLevelTerm->slug,
      '3' => $topTermCode,
      'Term_ID' => $topLevelTerm->term_id,
      'Term_Name' => $topLevelTerm->name,
      'Term_Slug' => $topLevelTerm->slug,
      'Term_Code' => $topTermCode,
      'show_metabox' => true
    ));

    for($i=0; $i < count($level2Terms); $i++){
      array_push($metabox, array(
          '0' => $level2Terms[$i]->term_id,
          '1' => $level2Terms[$i]->name,
          '2' => $level2Terms[$i]->slug,
          '3' => get_term_meta($level2Terms[$i]->term_id, 'neighborhood_code', true),
          'Term_ID' => $level2Terms[$i]->term_id,
          'Term_Name' => $level2Terms[$i]->name,
          'Term_Slug' => $level2Terms[$i]->slug,
          'Term_Code' => get_term_meta($level2Terms[$i]->term_id, 'neighborhood_code', true),
          'show_metabox' => true
        ));
    }

  // array_push($metabox, array(
  //     '0' => $level2Term1->term_id,
  //     '1' => $level2Term1->name,
  //     '2' => $level2Term1->slug,
  //     '3' => get_term_meta($level2Term1->term_id, 'neighborhood_code', true),
  //     'Term_ID' => $level2Term1->term_id,
  //     'Term_Name' => $level2Term1->name,
  //     'Term_Slug' => $level2Term1->slug,
  //     'Term_Code' => get_term_meta($level2Term1->term_id, 'neighborhood_code', true)
  //   ));
  // array_push($metabox, array(
  //     '0' => $level2Term2->term_id,
  //     '1' => $level2Term2->name,
  //     '2' => $level2Term2->slug,
  //     '3' => get_term_meta($level2Term2->term_id, 'neighborhood_code', true),
  //     'Term_ID' => $level2Term2->term_id,
  //     'Term_Name' => $level2Term2->name,
  //     'Term_Slug' => $level2Term2->slug,
  //     'Term_Code' => get_term_meta($level2Term2->term_id, 'neighborhood_code', true)
  //   ));
  // array_push($metabox, array(
  //     '0' => $level2Term3->term_id,
  //     '1' => $level2Term3->name,
  //     '2' => $level2Term3->slug,
  //     '3' => get_term_meta($level2Term3->term_id, 'neighborhood_code', true),
  //     'Term_ID' => $level2Term3->term_id,
  //     'Term_Name' => $level2Term3->name,
  //     'Term_Slug' => $level2Term3->slug,
  //     'Term_Code' => get_term_meta($level2Term3->term_id, 'neighborhood_code', true)
  //   ));
  return $metabox;
}

/* @communityTermSlug
   return city & city district terms (first 2 level terms in the community taxonomy tree)
*/
function nbh_2Level_metabox_by_Slug($communityTermSlug){

  $X = set_debug(__FILE__);

  $metabox = [];

  $term = get_term_by('slug', $communityTermSlug, 'property-neighborhood');
  // print_x($X, __LINE__, __FUNCTION__, $term); //d//

  // Loop for top community term
  if($term->parent){
    $term = get_term_by('id', $term->parent, 'property-neighborhood');
  }
  $topLevelTerm = $term;
  // print_x($X, __LINE__, __FUNCTION__, $term); //d//

  // Fetch second level (City District) terms
  $level2Terms = get_terms(array(
      'taxonomy' => 'property-neighborhood',
      'parent' => $term->term_id, //get direct children
      'orderby' => 'slug', //district slug is named by [city]-#
      'order' => 'ASC', //'DESC',
      //'child_of' => $topTermID, //get all children
      'hide_empty' => false,
  ));

  // print_x('', 'level2Terms', $level2Terms); //d//

  // Output the results with Normalized Var names
  array_push($metabox, array(
      '0' => $topLevelTerm->term_id,
      '1' => $topLevelTerm->name,
      '2' => $topLevelTerm->slug,
      '3' => get_term_meta($topLevelTerm->term_id, 'neighborhood_code', true),
      'Term_ID' => $topLevelTerm->term_id,
      'Term_Name' => $topLevelTerm->name,
      'Term_Slug' => $topLevelTerm->slug,
      'Term_Code' => get_term_meta($topLevelTerm->term_id, 'neighborhood_code', true),
      'show_metabox' => true
  ));

  for($i=0; $i < count($level2Terms); $i++){
    array_push($metabox, array(
        '0' => $level2Terms[$i]->term_id,
        '1' => $level2Terms[$i]->name,
        '2' => $level2Terms[$i]->slug,
        '3' => get_term_meta($level2Terms[$i]->term_id, 'neighborhood_code', true),
        'Term_ID' => $level2Terms[$i]->term_id,
        'Term_Name' => $level2Terms[$i]->name,
        'Term_Slug' => $level2Terms[$i]->slug,
        'Term_Code' => get_term_meta($level2Terms[$i]->term_id, 'neighborhood_code', true),
        'show_metabox' => true
    ));
  }

  // print_X($X, __LINE__, __FUNCTION__, $metabox);
  return $metabox;
}

function nbh_Direct_2Level_metabox_by_Slug($communityTermSlug)
{

    $X = set_debug(__FILE__);

    $metabox = [];

    // if($communityTermSlug){
      $level1Term = get_term_by('slug', $communityTermSlug, 'property-neighborhood');
      $level1Terms =[];
      // print_x($X, __LINE__, __FUNCTION__, '$communityTermSlug::', $communityTermSlug, '$level1Term::', $level1Term);

      // Loop for top community term
      if ($level1Term->parent) {
          $topLevelTerm = get_term_by('id', $level1Term->parent, 'property-neighborhood');
          $level1Terms = get_terms(array(
            'taxonomy' => 'property-neighborhood',
            'parent' => $topLevelTerm->term_id, //get direct children
            'orderby' => 'slug', //district slug is named by [city]-#
            'order' => 'ASC', //'DESC',
            //'child_of' => $topTermID, //get all children
            'hide_empty' => false,
          ));
      }else{
        $level1Terms[] = $level1Term;
      }
      // print_X($X, __LINE__, "TopLevelTerms::", $topLevelTerms);
    // }else{
    //   $level1Term = null;
    //   $level1Terms = [];
    // }

    // Fetch second level (City District) terms
    $level2Terms = get_terms(array(
        'taxonomy' => 'property-neighborhood',
        'parent' => isset($level1Term) ? $level1Term->term_id : null, //get direct children
        'orderby' => 'slug', //district slug is named by [city]-#
        'order' => 'ASC', //'DESC',
        //'child_of' => $topTermID, //get all children
        'hide_empty' => false,
    ));

    // Output the results with Normalized Var names
    if(isset($topLevelTerm)){
      array_push($metabox, array(
          '0' => $topLevelTerm->term_id,
          '1' => $topLevelTerm->name,
          '2' => $topLevelTerm->slug,
          '3' => get_term_meta($topLevelTerm->term_id, 'neighborhood_code', true),
          'Term_ID' => $topLevelTerm->term_id,
          'Term_Name' => $topLevelTerm->name,
          'Term_Slug' => $topLevelTerm->slug,
          'Term_Code' => get_term_meta($topLevelTerm->term_id, 'neighborhood_code', true),
          'show_metabox' => true,
          'get_chartdata' => true
      ));
    }

    for($i = 0; $i < count($level1Terms); $i++){
      array_push($metabox, array(
          '0' => $level1Terms[$i]->term_id,
          '1' => $level1Terms[$i]->name,
          '2' => $level1Terms[$i]->slug,
          '3' => get_term_meta($level1Terms[$i]->term_id, 'neighborhood_code', true),
          'Term_ID' => $level1Terms[$i]->term_id,
          'Term_Name' => $level1Terms[$i]->name,
          'Term_Slug' => $level1Terms[$i]->slug,
          'Term_Code' => get_term_meta($level1Terms[$i]->term_id, 'neighborhood_code', true),
          'show_metabox' => true,
          'get_chartdata' => $level1Terms[$i]->term_id == $level1Term->term_id ? true : false
      ));
    }

    for($i = 0; $i<count($level2Terms); $i++){
      array_push($metabox, array(
          '0' => $level2Terms[$i]->term_id,
          '1' => $level2Terms[$i]->name,
          '2' => $level2Terms[$i]->slug,
          '3' => get_term_meta($level2Terms[$i]->term_id, 'neighborhood_code', true),
          'Term_ID' => $level2Terms[$i]->term_id,
          'Term_Name' => $level2Terms[$i]->name,
          'Term_Slug' => $level2Terms[$i]->slug,
          'Term_Code' => get_term_meta($level2Terms[$i]->term_id, 'neighborhood_code', true),
          'show_metabox' => isset($topLevelTerm) ? false : true,
          'get_chartdata' => true
      ));
    }


    // print_X($X, __LINE__, __FUNCTION__, $metabox);
    return $metabox;
}

    
?>

