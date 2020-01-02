  <?php get_header(); 

  // Page Head.
$header_variation = get_option('inspiry_listing_header_variation');
//echo $header_variation;

if (empty($header_variation) || ('none' === $header_variation)) {
    echo 'header';
    get_template_part('assets/modern/partials/banner/header');
} elseif (!empty($header_variation) && ('banner' === $header_variation)) {
    //echo 'property-archive';
    get_template_part('assets/modern/partials/banner/about');
}

if (inspiry_show_header_search_form()) {
    // get_template_part('assets/modern/partials/properties/search/advance'); //d//
}

if (isset($_GET['view'])) {
    $view_type = $_GET['view'];
} else {
    /* Theme Options Listing Layout */
    $view_type = get_option('theme_listing_layout');
}
  ?>

  <div id="BuyAndSell" class="rh_section__properties" style="padding-top: 30px" >
    <div class="wrapper">
      <div id="BuyerAndSeller" class="row row__gutters">

        <div class="row__medium-4 row__medium-4--larger row__b-margin-until-medium">
          <picture>
            <source sizes="404px" srcset="<?php echo get_theme_file_uri("assets/images/Folder-Cover.jpg") ?> 404w, 
                                          <?php echo get_theme_file_uri("assets/images/Folder-Cover.jpg") ?> 808w" 
                                          media="(min-width:1020px)">
            <source sizes="320px" srcset="<?php echo get_theme_file_uri("assets/images/Folder-Cover.jpg") ?> 382w, 
                                          <?php echo get_theme_file_uri("assets/images/Folder-Cover.jpg") ?> 764w" 
                                          media="(min-width:800px)">
            <img sizes="800px" srcset="<?php echo get_theme_file_uri("assets/images/Folder-Cover.jpg") ?> 800w, 
                                          <?php echo get_theme_file_uri("assets/images/Folder-Cover.jpg") ?> 1600w" 
                                          alt="Surrey REALTOR, Peter Qu">
          </picture>
        </div>


      <div id="ForProfessionism" class="row__medium-8 row__medium-8--smaller ">
        <div>
          <div class="hero-slider">
            <div class="hero-slider__slide" style="background-image: url(<?php echo get_theme_file_uri('assets/images/professionalism.jpg') ?>);">
              <div class="hero-slider__interior container">
                <div class="hero-slider__overlay">
                  <h2 class="headline headline--medium t-center" style="font-size: 5rem; color: white"><strong>P</strong>rofessionalism</h2>
                  <p class="t-center" style="color:white; padding:0px">Academic Basis | Private Practice | Code of Conduct</p>
                  <p class="t-center no-margin"><a href="#" class="btn btn--blue">Learn more</a></p>
                </div>
              </div>
            </div>
            <div class="hero-slider__slide" style="background-image: url(<?php echo get_theme_file_uri('assets/images/integrity.jpg') ?>);">
              <div class="hero-slider__interior container">
                <div class="hero-slider__overlay">
                  <h2 class="headline headline--medium t-center" style="font-size: 5rem; color: white"><strong>I</strong>ntegrity</h2>
                  <p class="t-center" style="color:white;">Advise Fully Honestly | Fiduciary Duty | Follow Instructions</p>
                  <p class="t-center no-margin"><a href="#" class="btn btn--blue">Learn more</a></p>
                </div>
              </div>
            </div>
            <div class="hero-slider__slide" style="background-image: url(<?php echo get_theme_file_uri('assets/images/diligence.jpg') ?>);">
              <div class="hero-slider__interior container">
                <div class="hero-slider__overlay">
                  <h2 class="headline headline--medium t-center" style="font-size: 5rem; color: white"><strong>D</strong>iligence</h2>
                  <p class="t-center" style="color: white">Ascertain All | Detail Orientation | Research All Options</p>
                  <p class="t-center no-margin"><a href="#" class="btn btn--blue">Learn more</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>

   
  <div id="features" class="generic-content-container page-section page-section__blue">
  	<div class="wrapper">
  		
      <h2 class="section-title"><span class="icon icon--star section-title__icon" >
      </span ><span style="font-size: 6rem !important; color: white !important">Our <strong>Features</strong></span></h2>
  	  <div class="row row__gutters-large generic-content-container">
         <div class="row__medium-6">
            <div class="feature-item">
              <span class="icon icon--HomeEvalue feature-item__icon"></span>
              <h3 class="feature-item__title" style="font-size: 3.5rem; color: white">Free Home Evaluation</h3>
              <p style="font-size: 1.8rem !important; color: white !important">Are you curious about what your home is worth in today&rsquo;s market? Maybe you are thinking about moving or selling and would like a precise evaluation to help with your decision? Perhaps you are ready to meet a Realtor&reg; and start the process? No matter where you are on the home selling journey, I have a free and no-obligation home evaluation to suit your needs. Home values are on the rise again! The correct pricing of your property is the very first key step to your final success.</p>
            </div>
            
            <div class="feature-item">
              
              <span class="icon icon--sold feature-item__icon"></span>
              <h3 class="feature-item__title" style="font-size: 3.5rem; color: white">Competitive Marketing Plan</h3>
              <p style="font-size: 1.8rem !important; color: white !important">With our established competitive marketing plan, we have helped our clients to sell their homes fast and with top dollars. We work hard for our clients and we use our professional knowledge to help our clients for the best results.</p>
            </div>
            

         </div>

         <div class="row__medium-6">
            <div class="feature-item">
              <span class="icon icon--HomeSearch feature-item__icon"></span>
              <h3 class="feature-item__title" style="font-size: 3.5rem; color: white">Powerful Home Search</h3>
              <p style="font-size: 1.8rem !important; color: white !important">Search Surrey listings using our quick, easy to use listing search engine. Search active listings, register for listing access before public has access. Or Register for access to all the
                      features this site offers. Save your favorite Searches for auto email updates!</p>
            </div>
            
            <div class="feature-item">
              
              <span class="icon icon--Prize feature-item__icon"></span>
              <h3 class="feature-item__title" style="font-size: 3.5rem; color: white">Strategic Offer Negotiation</h3>
              <p style="font-size: 1.8rem !important; color: white !important">With rare exception, negotiating the transaction is the most complex part of selling a home. At the same time, it&rsquo;s the one that can involve the most creativity. That&rsquo;s why it&rsquo;s important to have an experienced and savvy REALTOR&reg; who has successfully worked through many different transaction scenarios.</p>

            </div>
            
         </div>

      </div>
   	</div>
  </div>

  <div id="testimonials" class="page-section page-section__no-b-padding-until-large page-section__testimonials lazyload">
    <div class="wrapper wrapper__no-padding-until-large">
      <h2 class="section-title section-title__blue"><span class="icon icon--comment section-title__icon"></span>
      <span style="font-size: 5rem !important; color: white"> Real<strong>Testimonials</strong></span></h2>

      <div class="row row__gutters row__equal-height-at-large row__gutters-small row__t-padding generic-content-container">
        <div class="row__large-4">
          <div class="testimonial">
            <div class="testimonial__photo">
              <img class="lazyload" data-src="<?php echo get_theme_file_uri("assets/images/testimonial-lisa.jpg") ?>">
            </div>
            <h3 class="testimonial__title" style="font-size: 2rem !important;">Lisa Yin</h3>
            <h4 class="testimonial__subtitle" style="font-size: 1.5rem !important; padding-bottom: 10px !important">City Hall Official</h4>
            <p style="font-size: 1.8rem !important; color: #2f5572 !important; padding-bottom: 10px !important">&ldquo;Peter listened closely to my needs, developed a plan specific to my home, and then implemented the plan.  It required that we invest in certain improvements and that we follow the recommendations but it was all worth it. After seven days on the market Peter presented three offers at and above the asking price. &rdquo;</p>
          </div>
        </div>
        <div class="row__large-4">
          <div class="testimonial">
            <div class="testimonial__photo">
              <img class="lazyload" data-src="<?php echo get_theme_file_uri("assets/images/testimonial-cooper.jpg") ?>">
            </div>
            <h3 class="testimonial__title" style="font-size: 2rem !important;">Cooper Williams</h3>
            <h4 class="testimonial__subtitle" style="font-size: 1.5rem !important; padding-bottom: 10px !important">Engineer</h4>
            <p style="font-size: 1.8rem !important; color: #2f5572 !important; padding-bottom: 10px !important">&ldquo;If you are looking for a real estate agent Peter Qu is the man for you. He sold my house in four days getting more than we asked. He is extremely professional, personable, and detailed oriented. He staged my home to sell using a dynamic team consisting of not just him but a professional stager and photographer as well. His sales results speak for himself. You won't be disappointed.&rdquo;</p>
          </div>
        </div>
        <div class="row__large-4">
          <div class="testimonial testimonial__last">
            <div class="testimonial__photo">
              <img class="lazyload" data-src="<?php echo get_theme_file_uri("assets/images/testimonial-brandon.jpg") ?>">
            </div>
            <h3 class="testimonial__title" style="font-size: 2rem !important;">Brandon Chen</h3>
            <h4 class="testimonial__subtitle" style="font-size: 1.5rem !important; padding-bottom: 10px !important">Lawyer</h4>
            <p style="font-size: 1.8rem !important; color: #2f5572 !important; padding-bottom: 10px !important">&ldquo;I had a wonderful experience purchasing my new home in Fleetwood. Peter was so attentive to my needs, very patient and always available when I had a question.  I would definitely recommend Peter to anyone in the future, looking to buy a home.&rdquo;</p>
          </div>
        </div>
        
      </div>
   
    </div>
  </div>

  <!-- <footer class="site-footer">
    <div class="wrapper">
       <p>
         <a href="#" class="btn btn--orange open-modal">Get in Touch</a>
         <a href="#" class="btn btn--image"><img src="<?php echo get_theme_file_uri("assets/images/magsen-logo-130X45.jpg") ?>" 
                            alt="Magsen Realty"></a>
         <a href="#" class="btn btn--image"><img src="<?php echo get_theme_file_uri("assets/images/ghmba.jpg") ?>" 
                            alt="Guanghua School of Management"></a>
         
       </p>
    </div>
   
  </footer> -->

  <!-- <div class="modal">
      <div class="modal__inner">
          <h2 class="section-title section-title__blue section-title--less-margin"><span class="icon icon--mail section-title__icon"></span>Get in <strong>Touch</strong></h2>
          <div class="wrapper wrapper--narrow">
            <p class="modal__description">We will have an online order system in place soon ndndn fndnd fndndn fndndn. </p>
            <div class="social-icons">
              <a href="#" class="social-icons__icon"><span class="icon--facebook icon"></span></a>
              <a href="#" class="social-icons__icon"><span class="icon--twitter icon"></span></a>
              <a href="#" class="social-icons__icon"><span class="icon--instagram icon"></span></a>
              <a href="#" class="social-icons__icon"><span class="icon--youtube icon"></span></a>
            </div>
          </div>
      <div class="modal__close">X</div>
    </div>
  </div> -->

 
  
  <?php get_footer(); ?>
</body>
</html>