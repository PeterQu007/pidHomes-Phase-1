jQuery(function($) {
  //blog posts static page
  console.log("loadmore.js loaded");

  function pagination(nav_id, button_id, button_text, current_page, last_page) {
    console.log("pagination");
    let nav = $("#" + nav_id);
    let nav_current_anchor = nav.find("a[page_id='" + current_page + "']");
    let nav_anchors = nav.find("a");
    let nav_first = nav.find("[page_id='first']");
    let nav_previous = nav.find("[page_id='previous']");
    let nav_next = nav.find("[page_id='next']");
    let nav_last = nav.find("[page_id='last']");
    let button = document.getElementById(button_id);

    console.log(nav_current_anchor);
    nav_anchors.removeClass("current");
    nav_anchors.removeClass("disabled");
    nav_current_anchor.addClass("current");
    current_page = Number(current_page);
    last_page = Number(last_page);
    switch (current_page) {
      case last_page:
        nav_last.addClass("disabled");
        nav_next.addClass("disabled");
        button.innerHTML = "";
        button.style.pointerEvents = "none";
        break;
      case 1:
        nav_first.addClass("disabled");
        nav_previous.addClass("disabled");
      default:
        button.innerHTML = button_text;
        button.style.pointerEvents = "auto";
    }
  }

  $(".loadmore").click(function() {
    var button = $(this),
      data = {
        action: "loadmore",
        query: loadmore_params.posts, // that's how we get params from wp_localize_script() function
        page: loadmore_params.current_page
      };

    $.ajax({
      url: loadmore_params.ajaxurl, // AJAX handler
      data: data,
      type: "POST",
      beforeSend: function(xhr) {
        button.text("Loading..."); // change the button text, you can also add a preloader image
      },
      success: function(data) {
        if (data) {
          button
            .text("More " + ajax_session[query_id][0].post_type)
            .prev()
            .after(data); // insert new posts
          loadmore_params.current_page++;

          if (loadmore_params.current_page == loadmore_params.max_page)
            button.remove(); // if last page, remove the button
        } else {
          //button.remove(); // if no data, remove the button as well
        }
      }
    });
  });

  $(".loadmore2").click(function() {
    //custom query on front-page.php
    let query_id = $(this)
      .closest("session")
      .attr("id");
    console.log(query_id);
    let last_page = ajax_session[query_id][1];
    // try to load next page...
    ajax_session[query_id][2]++;
    let new_current_page = ajax_session[query_id][2];
    var button = $(this),
      data = {
        action: "loadmore",
        query: ajax_session[query_id][0],
        page: new_current_page,
        session_id: query_id
      };
    var nav = $(this)
      .closest("session")
      .find("nav");
    // console.log(pid_Data.siteurl + "/wp-admin/admin-ajax.php");
    console.log(data);
    $.ajax({
      url: pid_Data.siteurl + "/wp-admin/admin-ajax.php", // AJAX handler
      data: data,
      type: "POST",
      beforeSend: function(xhr) {
        button.text("Loading..."); // change the button text, you can also add a preloader image
      },
      success: function(data) {
        if (data) {
          nav.prev().before(data);
          // button.text("More " + ajax_session[query_id][3]);
          // .prev()
          // .after(data); // insert new posts

          // ajax_session[query_id][2]++; //for next page
          // if (ajax_session[query_id][2] == ajax_session[query_id][1]) {
          //   button.text("");
          //   button.off("click");
          // } else {
          //   button.text("More " + ajax_session[query_id][3]);
          // }
          // re do pagination
          let nav_id = "pid_pagination_" + query_id;
          let button_id = "load_more_" + query_id;
          let button_text = "More " + ajax_session[query_id][3];
          pagination(
            nav_id,
            button_id,
            button_text,
            new_current_page,
            last_page
          );
        } else {
          button.text(""); // if no data, remove the button as well
        }
      }
    });
  });

  $(".pid-page-numbers").click(function() {
    let query_id = $(this)
      .closest("session")
      .attr("id");
    // console.log(query_id);
    let page_anchor = $(this);
    let page_anchors = $(this)
      .closest("session")
      .find("nav a");
    console.log(page_anchors);
    let button = $(this)
      .closest("session")
      .find(".loadmore2");
    // console.log(button);
    let post_div = $(this)
      .closest("session")
      .find("." + query_id);
    // console.log(post_div);
    let nav = $(this).closest("nav");
    let page_number = page_anchor.attr("page_id");
    let last_page = ajax_session[query_id][1];
    let current_page = ajax_session[query_id][2];
    switch (page_number) {
      case "first":
        ajax_session[query_id][2] = 1;
        break;
      case "last":
        ajax_session[query_id][2] = last_page;
        break;
      case "previous":
        ajax_session[query_id][2]--;
        break;
      case "next":
        ajax_session[query_id][2]++;
        break;
      default:
        ajax_session[query_id][2] = page_number;
    }
    let new_current_page = ajax_session[query_id][2];
    console.log(new_current_page);
    var data = {
      action: "loadmore",
      query: ajax_session[query_id][0],
      page: new_current_page,
      session_id: query_id
    };

    // console.log(page_anchor.attr("page_id"));
    // console.log(ajax_session);
    // console.log(data);
    $.ajax({
      url: pid_Data.siteurl + "/wp-admin/admin-ajax.php", // AJAX handler
      data: data,
      type: "POST",
      beforeSend: function(xhr) {
        button.text("Loading..."); // change the button text, you can also add a preloader image
      },
      success: function(data) {
        if (data) {
          post_div.remove();
          nav.prev().before(data);

          // button.text("More " + ajax_session[query_id][3]);

          // console.log(ajax_session[query_id][2]); //current page
          // console.log(ajax_session[query_id][1]); //max page
          // if (ajax_session[query_id][2] == ajax_session[query_id][1]) {
          //   button.text("");
          //   button.off("click");
          // } else {
          //   button.text("More " + ajax_session[query_id][3]);
          //   button.on("click");
          // }
          //re-pagination by javascript
          let nav_id = "pid_pagination_" + query_id;
          let button_id = "load_more_" + query_id;
          let button_text = "More " + ajax_session[query_id][3];
          pagination(
            nav_id,
            button_id,
            button_text,
            new_current_page,
            last_page
          );
        } else {
          button.text("");
        }
      }
    });
  });
});
