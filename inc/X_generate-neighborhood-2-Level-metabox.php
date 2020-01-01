<!--
  Generate Neighborhood 2 Level Metabox Data
  @params: post ID
-->

<?php
    $terms = get_the_terms(get_the_ID(), 'property-neighborhood');
    // print_r($terms); //d//
    foreach ($terms as $term) {
      //Get Top Level Term
      if (!$term->parent) {
          $topTermID = $term->term_id;
          $topTermName = $term->name;
          echo '<p> 2 level metabox: ' . $topTermID . '</p>'; //d//
          echo $topTermName; //d//
      }
    }
    $level2Terms = get_terms(array(
      'taxonomy' => 'property-neighborhood',
      'parent' => $topTermID,
      'orderby' => 'slug',
      'order' => 'ASC', //'DESC',
      //'child_of' => $topTermID,
      'hide_empty' => true,
    ));
    echo "<p> level2Terms: </p>"; //d//
    print_r($level2Terms); //d//

    foreach($level2Terms as $term){
      //Get Level 2 Term
      echo '<p>' . $term->name . '</p>' ; //d//
      
    }
    $level2Term1 = $level2Terms[0];
    $level2Term2 = $level2Terms[1];
    $level2Term3 = $level2Terms[2];
  ?>