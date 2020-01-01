<!--

  Generate Neighborhood 2 Level Metabox Data
  content-3level-metabox
-->

<?php

    $terms = get_the_terms(get_the_ID(), 'property-neighborhood');
    print_r($terms); //d//

    foreach ($terms as $term) {
      //Get Top Level Term
      if (!$term->parent) {
          $topTermID = $term->term_id;
          $topTermName = $term->name;
          echo $topTermID; //d//
          echo $topTermName; //d//
      };

      //Get Level 3 Term
      if(!get_term_children($term->term_id, 'property-neighborhood')){

        $level3TermID = $term->term_id;
        $level3TermName = $term->name;
        $level3TermSlug = $term->slug;
        echo $Level3TermID; //d//
        echo $Level3TermName; //d//
      };
    };

    foreach($terms as $term){
      //Get Level 2 Term
      if($topTermID & $term->parent == $topTermID){
          $level2TermID = $term->term_id;
          $level2TermName = $term->name;
          $level2TermSlug = $term->slug;
          echo $Level2TermID; //d//
          echo $Level2TermName; //d//
      };
    }
  ?>