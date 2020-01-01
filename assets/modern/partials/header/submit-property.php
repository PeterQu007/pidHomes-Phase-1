<?php
$submit_url = inspiry_get_submit_property_url();

if (!empty($submit_url)) {

    $inspiry_show_submit_on_login = get_option('inspiry_show_submit_on_login', 'false');
    $theme_submit_button_text = get_option('theme_submit_button_text');
    if (empty($theme_submit_button_text)) {
        $theme_submit_button_text = esc_html__('Submit', 'framework');
    }

    if ('true' == $inspiry_show_submit_on_login) {
        if (is_user_logged_in()) {
            ?>
            <div class="rh_menu__user_submit">
                <a href="<?php echo esc_url($submit_url); ?>"><?php echo esc_html($theme_submit_button_text); ?></a>
                <a href="<?php echo esc_url(site_url('search')); ?>" class="js-search-trigger"><i class="fa fa-search" aria-hidden="true"></i></a>
            </div>
			<?php
      }
    } else {
        ?>
        <div class="rh_menu__user_submit">
            <a href="<?php echo esc_url($submit_url); ?>"><?php echo esc_html($theme_submit_button_text); ?></a>
            <a href="<?php echo esc_url(site_url('search')); ?>" class="js-search-trigger"><i class="fa fa-search" aria-hidden="true"></i></a>
        </div>
		<?php
    }
}
?>