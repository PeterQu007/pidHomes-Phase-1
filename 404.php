<?php
/**
 * 404 Template
 *
 * @since 1.0.0
 * @package RH
 */
$X = set_debug(__FILE__);
$qvar = trim(get_query_var('property-neighborhood')); //query var is passed from url rewriting 
// print_X($X, __LINE__, '$qvar::', $qvar, get_the_ID(), get_the_title()); //d//
$pid_page = get_query_var('page');
$post_type_qvar = get_query_var('post_type');
print_X($X, __LINE__, 'page::', $pid_page, 'qvar::', $qvar, 'post type qvar::', $post_type_qvar);

//get_template_part( 'assets/' . INSPIRY_DESIGN_VARIATION . '/partials/404' );
