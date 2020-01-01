//53. Open and Close Search Overlay
import $ from "jquery";

class Search {
  //Class Section 1: init
  constructor() {
    this.addSearchHTML();
    this.resultsDiv = $(".search-overlay__results");
    this.openButton = $(".js-search-trigger");
    this.closeButton = $(".search-overlay__close");
    this.searchOverlay = $(".search-overlay");
    this.searchField = $(".search-term");
    this.events();
    this.isOverlayOpen = false;
    this.isSpinnerVisible = false;
    this.previousValue = "_";
    this.typingTimer;
  }

  //2. events
  events() {
    this.openButton.on("click", this.openOverlay.bind(this));
    this.closeButton.on("click", this.closeOverlay.bind(this));
    $(document).on("keydown", this.keyPressDispatcher.bind(this));
    this.searchField.on("keyup", this.typingLogic.bind(this));
  }

  //3. methods
  //55. Managing Time in Javascript | 55.. Add Key Press Timer
  typingLogic() {
    if (this.searchField.val().trim() != this.previousValue.trim()) {
      clearTimeout(this.typingTimer);

      if (this.searchField.val()) {
        if (!this.isSpinnerVisible) {
          this.resultsDiv.html('<div class="spinner-loader"></div>');
          this.isSpinnerVisible = true;
        }
        this.typingTimer = setTimeout(this.getResults.bind(this), 750);
      } else {
        this.resultsDiv.html("");
        this.isSpinnerVisible = false;
      }

      this.previousValue = this.searchField.val();
    }
  }

  getResults() {
    //68. 3 Column Layout for Search Overlay
    $.getJSON(
      //universityDate is returned by PHP module functions.php
      universityData.root_url +
        "/wp-json/pidrealty/v1/search?xSearch=" +
        this.searchField.val(),

      xPosts => {
        //console.log(results);
        this.resultsDiv.html(`
            <div class="row">
                <div class="one-third">
                    <h2 class="search-overlay__section-title">General Information</h2>
                    ${
                      xPosts.generalInfo.length > 0
                        ? '<ul class="link-list min-list">'
                        : "<p>No Search Results</p>"
                    }
                    ${xPosts.generalInfo
                      .map(
                        xPost =>
                          `<li><a href="${xPost.url}">${xPost.title}</a> ${
                            xPost.postType == "post"
                              ? "by " + xPost.authorName
                              : ""
                          } </li>`
                      )
                      .join("")}
                      ${xPosts.generalInfo.length > 0 ? "</ul>" : ""}
                </div>
                <div class="one-third">
                    <h2 class="search-overlay__section-title">Programs</h2>
                    ${
                      xPosts.programs.length > 0
                        ? '<ul class="link-list min-list">'
                        : "<p>No Search Results</p>"
                    }
                    ${xPosts.programs
                      .map(
                        xPost =>
                          `<li><a href="${xPost.url}">${xPost.title}</a>  </li>`
                      )
                      .join("")}
                    ${xPosts.programs.length > 0 ? "</ul>" : ""}

                    ${
                      /* 69. Custom Layout & JSON based on Post Type */ console.log()
                    }
                    <h2 class="search-overlay__section-title">Professors</h2>
                    ${
                      xPosts.professors.length > 0
                        ? '<ul class="link-list min-list">'
                        : "<p>No Search Results</p>"
                    }
                    ${xPosts.professors
                      .map(
                        xPost => `
                            <li class="professor-card__list-item">
                            <a class="professor-card" href="${xPost.url}">
                                <img class="professor-card__image" src="${xPost.thumbnailURL}">
                                <span class="professor-card__name">${xPost.title}</span>
                            </a>
                            </li>
                        `
                      )
                      .join("")}
                    ${xPosts.professors.length > 0 ? "</ul>" : ""}

                </div>
                <div class="one-third">
                    <h2 class="search-overlay__section-title">Communities</h2>
                    ${
                      xPosts.communities.length > 0
                        ? '<ul class="link-list min-list">'
                        : "<p>No Search Results</p>"
                    }
                    ${xPosts.communities
                      .map(
                        xPost =>
                          `<li><a href="${xPost.url}">${xPost.title}</a>  </li>`
                      )
                      .join("")}
                    ${xPosts.communities.length > 0 ? "</ul>" : ""}
                    
                    <h2 class="search-overlay__section-title">Events</h2>
                    ${
                      xPosts.events.length > 0 ? "" : "<p>No Search Results</p>"
                    }
                    ${xPosts.events
                      .map(
                        xPost => `
                        <div class="event-summary">
                        <a class="event-summary__date t-center" href="${xPost.url}">
                            <span class="event-summary__month">${xPost.month}</span>
                            <span class="event-summary__day">${xPost.day}</span>  
                        </a>
                        <div class="event-summary__content">
                            <h5 class="event-summary__title headline headline--tiny"><a href="${xPost.url}">${xPost.title}</a></h5>
                            <p>${xPost.description}<a href="${xPost.url}" class="nu gray">Learn more</a></p>
                        </div>
                        </div> `
                      )
                      .join("")}
                    ${xPosts.events.length > 0 ? "" : ""}
                </div>
            </div>
        `);
        this.isSpinnerVisible = false;
      }
    );
  }

  getResults_old() {
    //61-62. Synchronous vs Asynchronous
    $.when(
      //arg: call1(), call2(), ...
      $.getJSON(
        universityData.root_url +
          "/wp-json/wp/v2/posts?search=" +
          this.searchField.val()
      ),
      $.getJSON(
        universityData.root_url +
          "/wp-json/wp/v2/pages?search=" +
          this.searchField.val()
      )
    ).then(
      //response(fromCall1, fromCall2, ...), callback()
      (posts, pages) => {
        var combineResults = posts[0].concat(pages[0]);
        this.resultsDiv.html(`
        <h2 class="search-overlay__section-title">General Information for Search New Version</h2>
        ${
          combineResults.length > 0
            ? '<ul class="link-list min-list">'
            : "<p>No Search Results</p>"
        }
            ${combineResults
              .map(
                post =>
                  `<li><a href="${post.link}">${post.title.rendered}</a> ${
                    post.type == "post" ? "by " + post.authorName : ""
                  } </li>`
              )
              .join("")}
        ${combineResults.length > 0 ? "</ul>" : ""}
        `);
        this.isSpinnerVisible = false;
      },
      () => {
        this.resultsDiv.html("<p>unexpected Error, please try again later</p>");
      }
    );
  }

  openOverlay() {
    this.searchOverlay.addClass("search-overlay--active");
    $("body").addClass("body-no-scroll");
    this.searchField.val("");
    setTimeout(() => this.searchField.focus(), 300);
    this.isOverlayOpen = true;
    return false;
  }

  closeOverlay() {
    this.searchOverlay.removeClass("search-overlay--active");
    $("body").removeClass("body-no-scroll");
    this.isOverlayOpen = false;
  }

  //54. Keyboard Events in Javascript
  keyPressDispatcher(e) {
    if (
      e.altKey &&
      e.keyCode == 83 &&
      !this.isOverlayOpen &&
      !$("input, textarea").is(".focus")
    ) {
      this.openOverlay();
    }

    if (e.keyCode == 27 && this.isOverlayOpen) {
      this.closeOverlay();
    }
  }

  //60. Add Search HTML
  addSearchHTML() {
    $("body").append(`
        <div class="search-overlay">
            <div class="search-overlay__top">
            <div class="container">
                <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
                <input type="text" class="search-term" placeholder="What are you looking for?">
                <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
            </div>
            </div>
            <div class="container">
            <div class="search-overlay__results">
                Search Results:
            </div>
            </div>
        </div>
      `);
  }
}

export default Search;
