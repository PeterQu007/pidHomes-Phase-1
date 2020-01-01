import $ from "jquery";

class pidDemographics {
  constructor() {
    this.demographicsDiv = $("#demographic");
    //this.getDemographics();
    //this.getResults();
    //this.getHttpRequest();
    // this.getData();
  }

  events() {}

  getData() {
    $.ajax({
      // crossOrigin: true,
      // url:
      //   "https://www12.statcan.gc.ca/rest/census-recensement/CR2016Geo.json?lang=E&geos=CSD&cpt=59",
      // https://www12.statcan.gc.ca/rest/census-recensement/CPR2016.json?lang=E&dguid=2016A00055915004&topic=5&notes=0&stat=0
      url:
        "https://pidrealty.local/wp-content/themes/realhomes-child/db/proxy.php",
      method: "GET",
      // content: {},
      data: {
        lang: "E",
        dguid: "2016A00055915004",
        topic: 3,
        notes: 0,
        stat: 0
      },
      success: function(data) {
        console.log(data);
      }
    });
  }

  getHttpRequest() {
    function createCORSRequest(method, url) {
      var xhr = new XMLHttpRequest();
      if ("withCredentials" in xhr) {
        // XHR has 'withCredentials' property only if it supports CORS
        xhr.open(method, url, true);
      } else if (typeof XDomainRequest != "undefined") {
        // if IE use XDR
        xhr = new XDomainRequest();
        xhr.open(method, url);
      } else {
        xhr = null;
      }
      return xhr;
    }

    var request = createCORSRequest(
      "get",
      "https://www12.statcan.gc.ca/rest/census-recensement/CPR2016.json?lang=E&dguid=2016A00055915004&topic=5&notes=0&stat=0"
    );
    if (request) {
      // Define a callback function
      request.onload = function() {};
      // Send request
      request.send();
    }
  }

  getResults() {
    $.getJSON(
      "https://www12.statcan.gc.ca/rest/census-recensement/CPR2016.json?lang=E&dguid=2016A00055915004&topic=5&notes=0&stat=0",

      xRes => {
        console.log(xRes);
      }
    );
  }

  getDemographics() {
    var data = JSON.stringify({
      lang: "E",
      dguid: "2016A00055915004",
      topic: 5,
      notes: 0,
      stat: 0
    });
    $.ajax({
      type: "GET",
      // crossDomain: true,
      url: "https://www12.statcan.gc.ca/rest/census-recensement/CPR2016.json",
      // xhrFields: {
      //   withCredentials: true
      // },
      data: {
        lang: "E",
        dguid: "2016A00055915004",
        topic: 5,
        notes: 0,
        stat: 0
      },
      dataType: "JSON",
      headers: {
        accept: "application/json"
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "GET"
      },
      success: function(res) {
        console.log(res);
      }
    });
  }
}

export default pidDemographics;
