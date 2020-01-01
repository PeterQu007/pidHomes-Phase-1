    <?php

      $X = set_debug(__FILE__);
      //vars are from set_query_var() in the upper level module
      if(!$metabox){
        $metabox = nbh_2Level_metabox_by_Slug($term->slug); //d//
      }
      // print_X($X, __LINE__, 'Community slug:', $term->slug , $metabox); //d//
    ?>
    <!-- 
      SET UP Sub Area title meta box 
      Swtich between All Communities and City Catogary names
      All Communities Meta Box
      City Catogory Meta Box
    -->
    <div class="metabox metabox--with-home-link" style="font-size: 20px; text-align: left; display: block">
      <div style="font-size: 16px; text-align: left; display: block">
        <!-- First MetaBox Could invisible if in All Communities Mode-->
        <?php if($qvar){ ?>
          <a class="metabox__blog-home-link" href="<?php echo  get_post_type_archive_link($metabox_tax); ?>">
            <i class="<?php 
            switch($metabox_tax){
              case 'school':
                echo "fas fa-school";
                break;
              case 'community':
                echo "fas fa-map-marked";
                break;
              case 'market':
                echo 'fas fa-chart-area';
                break;
            }
            
            ?>" aria-hidden="true"></i> 
            All
          </a>  
        <?php } ?>

        <!-- Secondary Meta Box: show city name -->
        
        <a class="metabox__blog-home-link" href="<?php 
          echo get_post_type_archive_link($metabox_tax) . $metabox[0]['Term_Slug']; ?>"> 
          <i class="fas fa-city" aria-hidden="true"></i>
          <?php echo $metabox[0]['Term_Name']; ?>
        </a>

        <?php
          for($i=1; $i < count($metabox); $i++){ 
            if($metabox[$i]['show_metabox']){
              $active = $metabox[$i]['Term_Slug'] == $term->slug;
            ?>
              <a class="<?php echo $active ? 'metabox__blog-home-link-active' : 'metabox__blog-home-link'; ?>" href="<?php 
                echo get_post_type_archive_link($metabox_tax) . $metabox[$i]['Term_Slug']; ?>"> 
                <i class="fas fa-building" aria-hidden="true"></i>
                <?php echo $metabox[$i]['Term_Name']; ?>
              </a>
          <?php }}
        ?>

      </div>
    </div>
