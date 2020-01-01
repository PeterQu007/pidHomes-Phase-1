function initControlSelect(n, t) {
  var i = !0;
  t && typeof t.selectDefaultValue != "undefined" && (i = t.selectDefaultValue);
  n.each(function() {
    var n = $(this),
      r = !1,
      t;
    n.find(".selectarea").length == 0
      ? n.prepend(
          ' <div class="selectarea"  tabindex="-1">   <div class="arrow" style="">    <b style=""></b>   </div> <div class="text" style=""><span class="singleSelectSpan"  ></span>  </div>     </div>'
        )
      : (r = !0);
    t = n
      .find(".active")
      .first()
      .attr("data-option-value");
    !t &&
      i &&
      ((t = n
        .find(".option")
        .first()
        .attr("data-option-value")),
      n
        .find(".option")
        .first()
        .addClass("active"));
    n.find("span").text(n.find("[data-option-value='" + t + "']").text());
    r ||
      (n.find(".selectarea").click(function() {
        var n = $(this)
          .parent()
          .find(".dropdown");
        n.toggleClass("active");
        n.hasClass("active")
          ? (n.show(),
            n.focus(),
            n.find(".active").length > 0 &&
              n.scrollTop(n.scrollTop() + n.find(".active").position().top))
          : n.hide();
      }),
      n.find(".dropdown").hide(),
      n.find(".dropdown").blur(function(n) {
        $(this)
          .parent()
          .find(".singleSelectSpan")
          .is(":focus") ||
          $(this)
            .parent()
            .find(".selectarea")
            .is(":focus") ||
          $(this)
            .parent()
            .find(".arrow")
            .is(":focus") ||
          (n.relatedTarget != null &&
            $(this)
              .parent()
              .find(".selectarea")[0] === n.relatedTarget &&
            $(n.relatedTarget).hasClass("selectarea")) ||
          ($(this).removeClass("active"),
          $(this)
            .parent()
            .find(".selected")
            .removeClass("selected"),
          $(this).hide());
      }),
      n.find(".dropdown").keyup(function(n) {
        keyUpCheck(n, $(this));
        return;
      }));
    n.find(".option").click(function() {
      activateElement(
        $(this)
          .parentsUntil(".control-select")
          .parent(),
        this
      );
      return;
    });
  });
}
function ControlSelectChangeValue(n, t) {
  var i = $("#" + n);
  i.find(".active").removeClass("active");
  i.find("span").text(i.find("[data-option-value='" + t + "']").text());
  i.find("[data-option-value='" + t + "']").addClass("active");
}
function activateElement(n, t) {
  $(n)
    .find("span")
    .text($(t).text());
  $(t)
    .siblings()
    .removeClass("active");
  $(n).removeClass("selected");
  $(t).addClass("active");
  $(n)
    .find(".selectarea")
    .removeClass("active");
  $(n)
    .find(".dropdown")
    .removeClass("active");
  $(n)
    .find(".dropdown")
    .hide();
  $(n)
    .find("span")
    .trigger("change");
}
function selectElement(n) {
  $(n)
    .siblings()
    .removeClass("selected");
  $(n).addClass("selected");
  var t = $(n)
    .parent()
    .parent();
  t.scrollTop(t.scrollTop() + $(n).position().top);
}
function keyUpCheck(n, t) {
  var i = t.find(".selected").index(),
    f = t.find(".option").length,
    r = String.fromCharCode(
      96 <= n.keyCode && n.keyCode <= 105 ? n.keyCode - 48 : n.keyCode
    ).toLowerCase(),
    u = !1;
  if (n.keyCode == 13 && t.find(".selected").length > 0) {
    activateElement(t.parent(), t.find(".selected"));
    return;
  }
  ($(t.find(".option").splice(i + 1, f)).each(function(n, t) {
    if (
      $(t)
        .text()
        .toLowerCase()
        .indexOf(r) === 0
    )
      return selectElement($(t)), (u = !0), !1;
  }),
  u) ||
    $(t.find(".option").splice(0, i)).each(function(n, t) {
      if (
        $(t)
          .text()
          .toLowerCase()
          .indexOf(r) === 0
      )
        return selectElement($(t)), !1;
    });
}
function selectValue(n, t) {
  var i = $(n).find("[data-option-value='" + t + "']");
  activateElement(n, i);
}
function selectFirstValue(n) {
  var t = $(n).find("li.option:first");
  activateElement(n, t);
}
function selectGetActiveValue(n) {
  return $(n)
    .find("ul .active")
    .attr("data-option-value");
}
function executeFunctionByName(n, t) {
  for (
    var u = [].slice.call(arguments).splice(2),
      i = n.split("."),
      f = i.pop(),
      r = 0;
    r < i.length;
    r++
  )
    t = t[i[r]];
  return t[f].apply(this, u);
}
function parseDotNetJsonDate(n) {
  return n == null
    ? null
    : new Date(parseInt(n.replace("/Date(", "").replace(")/", ""), 10));
}
function DateFromStringUtil(n) {
  return n == null
    ? null
    : new Date(
        parseInt(n.substring(0, 4)),
        parseInt(n.substring(5, 7)) - 1,
        parseInt(n.substring(8, 10))
      );
}
function closeSocialShareControl() {
  $.magnificPopup.close();
}
function closeSocialShareControlWithReload() {
  $.magnificPopup.close();
  location.reload(!0);
}
function facebookOpenGraphCheck(n, t) {
  var i = parseInt($(".sharethis").attr("data-mlsNumber")),
    r;
  i > 0
    ? (Centris.Property.TrackingService.trackProprietePartage(i, "Facebook"),
      (r = { url: t, mlsNumber: i }),
      Centris.fn.wsSend(
        "/property/PropertyWebService.asmx/CheckOpenGraphUpdatedTime",
        $.stringify(r)
      ),
      Centris.OpenNewWindow("/mvc/home/RedirectWithDelay?redirecturl=" + t))
    : Centris.OpenNewWindow(n);
}
function initSocialShare() {
  function r(n) {
    if (
      ($("#SendFormData")
        .show()
        .parent()
        .find("img")
        .remove(),
      $("#g-recaptcha-response").val(""),
      $("#CaptchaMissingMessage").hide(),
      $("#CaptchaErrorDiv").hide(),
      n.d.Message === "missingCapcha")
    ) {
      $("#CaptchaMissingMessage").show();
      $("#sendEmailForm").valid();
      return;
    }
    if (n.d.Message === "failCapcha") {
      $("#CaptchaErrorDiv").show();
      $("#CaptchaErrorLabel").show();
      return;
    }
    n.d.Succeeded && closeSocialShareControl();
    Centris.Dialog.alert(n.d.Result);
  }
  var i, n, t, u;
  $("#sendEmail .checkboxStyle").on("click", function() {
    $(this).toggleClass("active");
  });
  typeof getNbColumns == "function" && getNbColumns() <= 2
    ? $("a.courriel").magnificPopup({
        items: { src: "#sendEmail", type: "inline", alignTop: !0 }
      })
    : $("a.courriel").magnificPopup({
        items: { src: "#sendEmail", type: "inline" }
      });
  $("a.courriel").on("click", function() {
    $("#CaptchaErrorDiv").hide();
    $("#CaptchaMissingMessage").hide();
    Centris.fn.wsSend(
      "/misc/MailWebService.asmx/ReadContextvalue",
      null,
      function(n) {
        var i = n.d.Result.Item1,
          t = new Centris.HtmlFieldSaver();
        t.setValueToHtmlNode($("#Recipient"), i.To);
        t.setValueToHtmlNode($("#InputLastName"), i.FromName);
        t.setValueToHtmlNode($("#InputEmail"), i.FromEmail);
        t.setValueToHtmlNode($("#InputCommentaire"), i.Comments);
        t.setValueToHtmlNode($("#chk-sendCopy"), i.SendCopy.toString());
        t.setValueToHtmlNode($("#chk-saveInfo"), n.d.Result.Item2.toString());
      }
    );
  });
  typeof Centris.Resources.UserMessage != "undefined" &&
    $.validator.addMethod(
      "multiemail",
      function(n, t) {
        var i, r;
        if (this.optional(t)) return !0;
        i = n.split(new RegExp("\\s*;\\s*", "gi"));
        valid = !0;
        for (r in i)
          (n = i[r]),
            (valid = valid && jQuery.validator.methods.email.call(this, n, t));
        return valid;
      },
      Centris.Resources.UserMessage.mailFormatError
    );
  i = new Centris.HtmlCookieSaver(new Centris.HtmlFieldSaver());
  $("#noMLS").val($("#ListingId").text());
  n = {
    HtmlFieldSaver: new Centris.HtmlFieldSaver(),
    jqSendButton: $("#SendFormData"),
    jqForm: $("#sendEmailForm"),
    callbackAfterSend: r,
    additionalData: {
      sitepagecaller: $(".share").attr("data-sitepagecaller"),
      nobroker: $(".share").attr("data-nobroker"),
      noblog: $(".share").attr("data-noblog"),
      articletitle: $(".share").attr("data-articletitle"),
      articledesc: $(".share").attr("data-articledesc"),
      geographyurl: $(".share").attr("data-geographyurl"),
      geography: $(".share").attr("data-geography")
    }
  };
  sendEmailButton = new Centris.Button.SendEmailButton(n);
  t = [
    { type: "facebook" },
    { type: "linkedin" },
    { type: "pinterest" },
    { type: "twitter" },
    { type: sendEmailButton.Type, customAction: sendEmailButton.action },
    { type: "print" }
  ];
  u = new Centris.SocialShareControl(t);
}
function onClickSocialShare(n, t) {
  var r = n.charAt(0).toUpperCase() + n.slice(1),
    i = parseInt($(".sharethis").attr("data-mlsNumber"));
  i > 0 && Centris.Property.TrackingService.trackProprietePartage(i, r);
  t && Centris.OpenNewWindow(t);
}
function getNbColumns() {
  var n = 5;
  return (
    Modernizr.mq("only screen and (max-width: 574px) and (min-width: 320px)")
      ? (n = 1)
      : Modernizr.mq(
          "only screen and (max-width: 767px) and (min-width: 575px)"
        )
      ? (n = 2)
      : Modernizr.mq(
          "only screen and (max-width: 1023px) and (min-width: 768px)"
        )
      ? (n = 3)
      : Modernizr.mq(
          "only screen and (max-width: 1284px) and (min-width: 1024px)"
        ) && (n = 4),
    n
  );
}
function ajustBlogVisibility(n) {
  $("[id^=divBlogArticle]").show();
  switch (n) {
    case 1:
      $("#divBlogArticle2").hide();
    case 2:
      $("#divBlogArticle3").hide();
    case 3:
      $("#divBlogArticle4").hide();
    case 4:
      $("#divBlogArticle5").hide();
  }
}
function initBlog() {
  var n = getNbColumns();
  ajustBlogVisibility(n);
  $(window).on("resize", function() {
    n = getNbColumns();
    ajustBlogVisibility(n);
  });
}
function Calculator(n) {
  function f() {
    var i = { calcSetting: t() },
      n,
      r;
    ($("#Versement2Error").hide(),
    $("#taux2Error").hide(),
    $("#amort2Error").hide(),
    (n = !1),
    $("#Versement2").val() == "" && ($("#Versement2Error").show(), (n = !0)),
    $("#taux2").val() == "" && ($("#taux2Error").show(), (n = !0)),
    $("#amort2").val() == "" && ($("#amort2Error").show(), (n = !0)),
    n) ||
      ((r = $("#Calcul_emprunt").children()),
      $("#Calcul_emprunt")
        .text(
          Centris.Localization.formatNumber(
            i.calcSetting.CalculEmpruntVersement
          )
        )
        .append(r),
      Centris.fn.wsSend(
        "/property/CalculatorWebService.asmx/CalculEmprunt",
        $.stringify(i),
        s
      ));
  }
  function e() {
    var n = { calcSetting: t() },
      i,
      u,
      r;
    if (window.ConsumerSite.tenantId === "qc") {
      if (
        ($("#cityMessageError").hide(),
        $("#CalculPrixError").hide(),
        $("#evalMunicipaleError").hide(),
        (i = !1),
        n.calcSetting.TaxeCityId === "" &&
          ($("#cityMessageError").show(), (i = !0)),
        $("#propriete").val() == "" &&
          $("#evalMunicipale").val() == "" &&
          ($("#CalculPrixError").show(),
          $("#evalMunicipaleError").show(),
          (i = !0)),
        i)
      )
        return;
    } else if (
      ((i = !1),
      $("#propriete").val() == "" && ($("#CalculPrixError").show(), (i = !0)),
      i)
    )
      return;
    u = $("#Calcul_emprunt").children();
    $("#Calcul_emprunt")
      .text(
        Centris.Localization.formatNumber(n.calcSetting.CalculEmpruntVersement)
      )
      .append(u);
    window.ConsumerSite.tenantId === "qc"
      ? ((r = {
          calcConfigId: n.calcSetting.TaxeCalcConfigId,
          input: {
            priceOfProperty: n.calcSetting.TaxeProprieteVersement,
            municipalAssessmentTotal: n.calcSetting.TaxeEvalMunicipaleTotale
          }
        }),
        Centris.fn.wsSend(
          "/mvc/calculator/CalcTransfersImmovableDutiesForQc",
          $.stringify(r),
          h
        ))
      : ((r = {
          calcConfigId: n.calcSetting.TaxeCalcConfigId,
          input: { priceOfProperty: n.calcSetting.TaxeProprieteVersement }
        }),
        Centris.fn.wsSend(
          "/mvc/calculator/CalcTransfersImmovableDutiesForBc",
          $.stringify(r),
          c
        ));
  }
  function o() {
    var i = { calcSetting: t() },
      n,
      u;
    ($("#Calcul_prixError").hide(),
    $("#Calcul_miseDeFondError").hide(),
    $("#Calcul_tauxError").hide(),
    $("#Calcul_amortError").hide(),
    (n = !1),
    $("#Calcul_prix").val() == "" && ($("#Calcul_prixError").show(), (n = !0)),
    $("#Calcul_miseDeFond").val() == "" &&
      ($("#Calcul_miseDeFondError").show(), (n = !0)),
    $("#Calcul_taux").val() == "" && ($("#Calcul_tauxError").show(), (n = !0)),
    $("#Calcul_amort").val() == "" &&
      ($("#Calcul_amortError").show(), (n = !0)),
    n) ||
      ((u = $("#Calcul_emprunt").children()),
      $("#Calcul_emprunt")
        .text(
          Centris.Localization.formatNumber(
            i.calcSetting.CalculEmpruntVersement
          )
        )
        .append(u),
      Centris.fn.wsSend(
        "/property/CalculatorWebService.asmx/CalculMntVersement",
        $.stringify(i),
        l
      ),
      $("#divMonthlyArrayMortgage").is(":visible") && r());
  }
  function t() {
    var n = Centris.Parse.cleanNumber($("#Calcul_miseDeFond").val()),
      t = Centris.Parse.cleanNumber($("#Calcul_prix").val()) - n;
    return {
      CalculMiseDeFondVersement: n,
      CalculEmpruntVersement: t,
      CalculAmortVersement: Centris.Parse.cleanNumber($("#Calcul_amort").val()),
      CalculTauxVersement: Centris.Parse.cleanNumber($("#Calcul_taux").val()),
      CalculFreqVersement: $("#SingleSelectCalcul_freq .active").attr(
        "data-option-value"
      ),
      TaxeProprieteVersement: Centris.Parse.cleanNumber($("#propriete").val()),
      TaxeEvalMunicipaleTotale: Centris.Parse.cleanNumber(
        $("#evalMunicipale").val()
      ),
      TaxeCityId: $("#cityId").val() || "",
      TaxeCalcConfigId: $("#calcConfigId").val() || "",
      EmpruntAmort: Centris.Parse.cleanNumber($("#amort2").val()),
      EmpruntTaux: Centris.Parse.cleanNumber($("#taux2").val()),
      EmpruntCalculFreq: $("#SingleSelectCalcul_freq2 .active").attr(
        "data-option-value"
      ),
      EmpruntVersement: Centris.Parse.cleanNumber($("#Versement2").val())
    };
  }
  function s(n) {
    var t = n.d.Result,
      i = $("#emprunt2").children();
    !isNaN(t) && t > 0
      ? ((t = t.toFixed(2)),
        $("#emprunt2")
          .text(Centris.Localization.formatNumber(t))
          .append(i))
      : !isNaN(t) && t <= 0
      ? $("#emprunt2")
          .text("0")
          .append(i)
      : $("#emprunt2")
          .text("")
          .append(i);
  }
  function h(n) {
    var t = n.reduce(function(n, t) {
        return n + t;
      }, 0),
      i = $("#taxe").children();
    !isNaN(t) && t > 0
      ? ((t = (Math.ceil(t * 100) / 100).toFixed(2)),
        $("#taxe")
          .text(Centris.Localization.formatNumber(t))
          .append(i))
      : !isNaN(t) && t <= 0
      ? $("#taxe")
          .text("0")
          .append(i)
      : $("#taxe")
          .text("")
          .append(i);
  }
  function c(n) {
    var t = n,
      i,
      r;
    i = $("#onePercentTax").children();
    !isNaN(t[0]) && t[0] > 0
      ? ((t[0] = t[0].toFixed(2)),
        $("#onePercentTax")
          .text(Centris.Localization.formatNumber(t[0]))
          .append(i))
      : !isNaN(t[0]) && t[0] <= 0
      ? $("#onePercentTax")
          .text("0")
          .append(i)
      : $("#onePercentTax")
          .text("")
          .append(i);
    i = $("#twoPercentTax").children();
    !isNaN(t[1]) && t[1] > 0
      ? ((t[1] = t[1].toFixed(2)),
        $("#twoPercentTax")
          .text(Centris.Localization.formatNumber(t[1]))
          .append(i))
      : !isNaN(t[1]) && t[1] <= 0
      ? $("#twoPercentTax")
          .text("0")
          .append(i)
      : $("#twoPercentTax")
          .text("")
          .append(i);
    i = $("#threePercentTax").children();
    !isNaN(t[2]) && t[2] > 0
      ? ((t[2] = t[2].toFixed(2)),
        $("#threePercentTax")
          .text(Centris.Localization.formatNumber(t[2]))
          .append(i))
      : !isNaN(t[2]) && t[2] <= 0
      ? $("#threePercentTax")
          .text("0")
          .append(i)
      : $("#threePercentTax")
          .text("")
          .append(i);
    i = $("#totalTax").children();
    r = t.reduce(function(n, t) {
      return parseFloat(n) + parseFloat(t);
    }, 0);
    !isNaN(r) && r > 0
      ? ((r = r.toFixed(2)),
        $("#totalTax")
          .text(Centris.Localization.formatNumber(r))
          .append(i))
      : !isNaN(r) && r <= 0
      ? $("#totalTax")
          .text("0")
          .append(i)
      : $("#totalTax")
          .text("")
          .append(i);
  }
  function l(n) {
    var t = n.d.Result,
      i = $("#Calcul_Versement").children();
    !isNaN(t) && t > 0
      ? ((t = t.toFixed(2)),
        $("#Calcul_Versement")
          .text(Centris.Localization.formatNumber(t))
          .append(i))
      : !isNaN(t) && t <= 0
      ? $("#Calcul_Versement")
          .text("0")
          .append(i)
      : $("#Calcul_Versement")
          .text("")
          .append(i);
  }
  function a(n) {
    var t = n,
      i = "#divMonthlyArrayMortgage";
    if (t && t.length > 0) {
      var u =
          "<tr> <th id='mois' class='first-child'>" +
          Centris.Resources.UserMessage.Month +
          "</th> <th id='interet'>" +
          Centris.Resources.UserMessage.Interest +
          "</th> <th id='capital'>" +
          Centris.Resources.UserMessage.Capital +
          "</th><th id='solde'>" +
          Centris.Resources.UserMessage.ResidualBalance +
          "</th> </tr>",
        f = $("#templateMonthlyMortgage"),
        r = u;
      $.each(t, function(n, t) {
        var i = f.clone();
        $(i)
          .find("#mois")
          .html(t.mois);
        $(i)
          .find("#interet")
          .html(t.interet);
        $(i)
          .find("#capital")
          .html(t.capital);
        $(i)
          .find("#solde")
          .html(t.solde);
        r += i.html();
      });
      $(i).empty();
      $(i).html(r);
      $("#divMonthlyArrayMortgage").show();
      $("#tableMonthlyMortgage").show();
    } else
      $("#divMonthlyArrayMortgage").hide(), $("#tableMonthlyMortgage").hide();
  }
  function r() {
    var n = t(),
      i = {
        taux: n.CalculTauxVersement,
        freq: n.CalculFreqVersement,
        amort: n.CalculAmortVersement,
        emprunt: n.CalculEmpruntVersement
      };
    Centris.fn.wsSendWithRetry(
      "/property/CalculatorWebService.asmx/GetMortgageRepaymentsArray",
      $.stringify(i),
      function(n) {
        a(n.d.Result);
      }
    );
  }
  function u() {
    function t() {
      h();
      var n =
          parseInt(Centris.Parse.cleanNumber($("#Calcul_prix").val())) -
          parseInt(Centris.Parse.cleanNumber($("#Calcul_miseDeFond").val())),
        t = $("#Calcul_emprunt").children();
      n > 0
        ? $("#Calcul_emprunt")
            .text(Centris.Localization.formatNumber(n))
            .append(t)
        : $("#Calcul_emprunt")
            .empty()
            .append(t);
    }
    function h() {
      var n = $("#Calcul_Versement").children();
      $("#Calcul_Versement")
        .empty()
        .append(n);
    }
    function i() {
      n = $("#onePercentTax").children();
      $("#onePercentTax")
        .empty()
        .append(n);
      n = $("#twoPercentTax").children();
      $("#twoPercentTax")
        .empty()
        .append(n);
      n = $("#threePercentTax").children();
      $("#threePercentTax")
        .empty()
        .append(n);
      n = $("#totalTax").children();
      $("#totalTax")
        .empty()
        .append(n);
    }
    var n, u, s;
    $("#Calcul_btVersement").unbind("click");
    $("#Calcul_btVersement").on("click", function() {
      if ($("#divMonthlyArrayMortgage").is(":visible")) {
        $("#divMonthlyArrayMortgageHeader").fadeOut();
        $("#divMonthlyArrayMortgage").fadeOut();
        return;
      }
      var n = parseFloat(
        Centris.Parse.cleanNumber($("#Calcul_Versement").text())
      );
      n > 0 && r();
    });
    n = $("#Calcul_Versement").children();
    $("#Calcul_Versement")
      .empty()
      .append(n);
    $("#CalculMntVersement [data-type]").on("change", function() {
      t();
    });
    t();
    $("#Calcul_btTotalVersement").click(function() {
      o();
    });
    u = $("#taxe").children();
    $("#taxe")
      .empty()
      .append(u);
    i();
    $("#CalculTaxe [data-type]").on("change", function() {
      var n = $("#taxe").children();
      $("#taxe")
        .empty()
        .append(n);
      i();
    });
    s = $("#emprunt2").children();
    $("#emprunt2")
      .empty()
      .append(s);
    $("#CalculEmprunt [data-type]").on("change", function() {
      var n = $("#emprunt2").children();
      $("#emprunt2")
        .empty()
        .append(n);
    });
    $("#Calcul_btTotalMutation").click(function() {
      e();
    });
    $("#Calcul_btTotalEmprunt").click(function() {
      f();
    });
    $("#divMonthlyArrayMortgageHeader").css("display", "none");
    $("#divMonthlyArrayMortgage").css("display", "none");
    $("#propriete").on("input", function() {
      $("#CalculPrixError").hide();
      $("#evalMunicipaleError").hide();
    });
    $("#evalMunicipale").on("input", function() {
      $("#CalculPrixError").hide();
      $("#evalMunicipaleError").hide();
    });
    $("#Calcul_prix").on("input", function() {
      $("#Calcul_prixError").hide();
    });
    $("#Calcul_miseDeFond").on("input", function() {
      $("#Calcul_miseDeFondError").hide();
    });
    $("#Calcul_taux").on("input", function() {
      $("#Calcul_tauxError").hide();
    });
    $("#Calcul_amort").on("input", function() {
      $("#Calcul_amortError").hide();
    });
    $("#search").on("input", function() {
      $("#cityMessageError").hide();
    });
    $("#Versement2").on("input", function() {
      $("#Versement2Error").hide();
    });
    $("#taux2").on("input", function() {
      $("#taux2Error").hide();
    });
    $("#amort2").on("input", function() {
      $("#amort2Error").hide();
    });
    initAutoCompleteControl();
  }
  var i = this;
  i.SetPrice = function(n) {
    n = Centris.Parse.cleanNumber(n);
    n = Centris.Localization.formatNumber(n);
    $("#Calcul_prix").val(n);
    $("#propriete").val(n);
  };
  n && $("#divCalculator").hide();
  i.bindEvents = function() {
    var n;
    n = $("[data-type]");
    $.each(n, function(n, t) {
      var r = $(t),
        u = r.data("type"),
        i = r.prop("id");
      i === "Calcul_taux" &&
        $("#" + i).keyup(function() {
          var n = $(this).val();
          (n < 0 || n > 30) && $(this).val("30");
        });
      u == "float"
        ? ($("#" + i).keypress(function(n) {
            return Centris.Parse.isNumberKeyPress(n, !0);
          }),
          $("#" + i).blur(function() {
            if ($(this).val()) {
              var n = Centris.Parse.cleanNumber($(this).val());
              $(this).val(parseFloat(n));
            }
          }))
        : u == "integer" &&
          ($("#" + i).keypress(function(n) {
            return Centris.Parse.isNumberKeyPress(n);
          }),
          $("#" + i).blur(function() {
            var n, t;
            $(this).val() &&
              ((n = Centris.Parse.cleanNumber($(this).val())),
              (n = parseInt(n)),
              (t = Centris.Localization.formatNumber(n)),
              $(this).val(t));
          }));
      $("#" + i).focus(function() {
        $(this).val() &&
          ($(this).val(Centris.Parse.cleanNumber($(this).val())),
          $(this).attr("selected", "selected"));
      });
    });
  };
  this.InitCalculator = function() {
    u();
    this.bindEvents();
  };
  u();
}
function InitializeCalculator(n) {
  var t = new Calculator(n);
  return (
    Centris.Localization.setCurrentLanguage(window.Centris.Master.Languages),
    t.bindEvents(),
    t
  );
}
function initAutoCompleteControl() {
  function n() {
    child = $("#onePercentTax").children();
    $("#onePercentTax")
      .text("")
      .append(child);
    child = $("#twoPercentTax").children();
    $("#twoPercentTax")
      .text("")
      .append(child);
    child = $("#threePercentTax").children();
    $("#threePercentTax")
      .text("")
      .append(child);
    child = $("#totalTax").children();
    $("#totalTax")
      .text("")
      .append(child);
  }
  $(".typeaheadCalculator")
    .typeahead(
      {
        minLength: 2,
        highlight: !0,
        hint: !1,
        classNames: { input: "typeahead" }
      },
      {
        name: "dataset",
        async: !0,
        limit: 200,
        display: "cityName",
        source: function(n, t, i) {
          var r = { filter: n };
          return Centris.fn.wsSend(
            "/mvc/calculator/GetCitiesForQc",
            JSON.stringify(r),
            function(n) {
              var t = [];
              $.each(n, function(n, i) {
                t.push({
                  cityId: i.Id,
                  cityName: i.Name,
                  calcConfigId: i.CalcConfigId
                });
              });
              i(t);
            }
          );
        },
        templates: {
          empty:
            "<div><strong>" +
            Centris.Resources.UserMessage.NoResultAutoComplete +
            "</strong></div>"
        }
      }
    )
    .on("typeahead:selected", function(t, i) {
      t.preventDefault();
      var r = $("#taxe").children();
      $("#taxe")
        .text("")
        .append(r);
      n();
      $("#cityName").val(i.cityName);
      $("#cityId").val(i.cityId);
      $("#calcConfigId").val(i.calcConfigId);
      $(".typeaheadCalculator").typeahead("close");
      $(".typeaheadCalculator").typeahead("val", i.cityName);
      $("#cityMessageError").hide();
    })
    .on("keypress", function(n) {
      n.which == 13 &&
        (n.preventDefault(),
        $(".tt-suggestion:first-child").trigger("click"),
        $("#cityMessageError").hide());
    })
    .on("blur", function(n) {
      var t = $(".tt-suggestion")
        .first()
        .children().length;
      t === 1 &&
        (n.preventDefault(),
        $(".tt-suggestion:first-child")
          .first()
          .trigger("click"),
        $("#cityMessageError").hide());
    })
    .on("keyup", function() {
      if ($(".typeaheadCalculator").typeahead("val") === "") {
        $("#cityName").val("");
        $("#cityId").val("");
        $("#calcConfigId").val("default");
        $("#cityMessageError").hide();
        var t = $("#taxe").children();
        $("#taxe")
          .text("")
          .append(t);
        n();
      }
    });
}
function DrawKendoChart(n, t) {
  for (var o, u, s, h, e = [], r = 0; r < t.Slices.length; ++r)
    e.push({ source: t.Slices[r][0], percentage: t.Slices[r][1] });
  var i = 225,
    f = 60,
    c = getNbColumns();
  switch (c) {
    case 1:
      i = 150;
      f = 40;
      break;
    case 2:
      i = 175;
      f = 20;
      break;
    default:
      i = 225;
  }
  $("#" + n + "Chart").empty();
  $("#" + n + "Chart").kendoChart({
    legend: { visible: !1 },
    title: { visible: !1 },
    chartArea: { height: i, width: i, margin: {} },
    plotArea: { margin: { top: 0 } },
    dataSource: { data: e },
    seriesDefaults: { type: t.Average == null ? "pie" : "donut", holeSize: f },
    series: [
      {
        type: t.Average == null ? "pie" : "donut",
        field: "percentage",
        categoryField: "source",
        padding: 0
      }
    ],
    seriesColors: seriesColorsCode,
    tooltip: { visible: !1 }
  });
  o =
    "<li><span class='colorSlice' style='background-color: COLOR_CODE;'></span><span class='label'>LABEL</span><span class='value'>VALUE%</span></li>";
  u = " <div class='socioDemoLabel'><ul>";
  $.each(t.Slices, function(n, t) {
    var i = o;
    i = i.replace("COLOR_CODE", seriesColorsCode[n]);
    i = i.replace("LABEL", t[0]);
    i = i.replace("VALUE", t[1]);
    u += i;
  });
  u += "</ul></div>";
  $("#" + n)
    .find(".socioDemoLabel")
    .remove();
  $("#" + n).append(u);
  t.Average != null &&
    ((s = "<div class='averageText'><p>" + t.Average + "</p></div>"),
    $("#" + n)
      .find(".averageText")
      .remove(),
    $("#" + n + "Chart").prepend(s));
  h = "<div class='titleChart'>" + t.Title + "</div>";
  $("#" + n)
    .find(".titleChart")
    .remove();
  $("#" + n).prepend(h);
}
function updateCharts(n) {
  n != null &&
    (DrawKendoChart("divGroupeAge", n[0]),
    DrawKendoChart("divRevenus", n[1]),
    DrawKendoChart("divMenagesPrives", n[2]),
    DrawKendoChart("divTypeFamille", n[3]),
    DrawKendoChart("divModeOccupation", n[4]),
    DrawKendoChart("divConstruction", n[5]),
    DrawKendoChart("divTypeLogement", n[6]),
    DrawKendoChart("divScolarite", n[7]),
    DrawKendoChart("divImmigration", n[8]),
    DrawKendoChart("divLangue", n[9]));
}
function DrawCharts(n, t) {
  function r(n) {
    var t = n.d.Result;
    if (((currentChartResult = t), n.d.Succeeded)) {
      updateCharts(t);
      $(window).on("resize", function() {
        updateCharts(currentChartResult);
      });
    } else $("#message").html(n.d.Message);
  }
  typeof t == "undefined" && (t = null);
  var i = { regionId: t, munId: n },
    arguments = $.stringify(i);
  Centris.fn.wsSendWithRetry(
    "/mvc/more/GetDonneesSocioDemographic",
    arguments,
    r
  );
}
var Centris, observers, localLogicService, seriesColorsCode, currentChartResult;
(function(n, t, i) {
  String.prototype.endsWith = function(n) {
    return this.indexOf(n, this.length - n.length) !== -1;
  };
  location.host.toLowerCase().endsWith("centris.ca") &&
    (t.domain = "centris.ca");
  String.prototype.htmlEncode = function() {
    return i("<div/>")
      .text(this.toString())
      .html();
  };
  String.prototype.htmlDecode = function() {
    return i("<div/>")
      .html(this.toString())
      .text();
  };
  String.prototype.contains = function(n) {
    return this.indexOf(n) !== -1;
  };
  Date.prototype.addHours = function(n) {
    return this.setHours(this.getHours() + n), this;
  };
  Date.prototype.addSeconds = function(n) {
    return this.setSeconds(this.getSeconds() + n), this;
  };
})(window, document, $);
try {
  typeof sessionStorage == "undefined" &&
    (function(n) {
      function o() {
        function p() {
          l.cookie = [
            "sessionStorage=" + n.encodeURIComponent((s = e.key(128)))
          ].join(";");
          u = e.encode(s, u);
          t = new t(i, "name", i.name);
        }
        var w = i.name,
          l = i.document,
          v = /\bsessionStorage\b=([^;]+)(;|$)/,
          f = v.exec(l.cookie),
          o;
        if (f) {
          s = n.decodeURIComponent(f[1]);
          u = e.encode(s, u);
          t = new t(i, "name");
          for (var h = t.key(), o = 0, a = h.length, y = {}; o < a; ++o)
            (f = h[o]).indexOf(u) === 0 &&
              (r.push(f), (y[f] = t.get(f)), t.del(f));
          if (
            ((t = new t.constructor(i, "name", i.name)),
            0 < (this.length = r.length))
          ) {
            for (o = 0, a = r.length, c = t.c, f = []; o < a; ++o)
              f[o] = c.concat(
                t._c,
                t.escape((h = r[o])),
                c,
                c,
                (h = t.escape(y[h])).length,
                c,
                h
              );
            i.name += f.join("");
          }
        } else p(), v.exec(l.cookie) || (r = null);
      }
      var i = n,
        e,
        t;
      try {
        while (i !== i.top) i = i.top;
      } catch (l) {}
      e = (function(n, t) {
        return {
          decode: function(n, t) {
            return this.encode(n, t);
          },
          encode: function(t, i) {
            for (
              var s = t.length,
                c = i.length,
                h = [],
                u = [],
                r = 0,
                f = 0,
                o = 0,
                l = 0,
                e;
              r < 256;
              ++r
            )
              u[r] = r;
            for (r = 0; r < 256; ++r)
              (f = (f + (e = u[r]) + t.charCodeAt(r % s)) % 256),
                (u[r] = u[f]),
                (u[f] = e);
            for (f = 0; o < c; ++o)
              (r = o % 256),
                (f = (f + (e = u[r])) % 256),
                (s = u[r] = u[f]),
                (u[f] = e),
                (h[l++] = n(i.charCodeAt(o) ^ u[(s + e) % 256]));
            return h.join("");
          },
          key: function(i) {
            for (var r = 0, u = []; r < i; ++r)
              u[r] = n(1 + ((t() * 255) << 0));
            return u.join("");
          }
        };
      })(n.String.fromCharCode, n.Math.random);
      t = (function(n) {
        function t(n, t, i) {
          this._i = (this._data = i || "").length;
          (this._key = t)
            ? (this._storage = n)
            : ((this._storage = { _key: n || "" }), (this._key = "_key"));
        }
        function i(n, t) {
          var i = this.c;
          return i.concat(
            this._c,
            this.escape(n),
            i,
            i,
            (t = this.escape(t)).length,
            i,
            t
          );
        }
        return (
          (t.prototype.c = String.fromCharCode(1)),
          (t.prototype._c = "."),
          (t.prototype.clear = function() {
            this._storage[this._key] = this._data;
          }),
          (t.prototype.del = function(n) {
            var t = this.get(n);
            t !== null &&
              (this._storage[this._key] = this._storage[this._key].replace(
                i.call(this, n, t),
                ""
              ));
          }),
          (t.prototype.escape = n.escape),
          (t.prototype.get = function(n) {
            var i = this._storage[this._key],
              r = this.c,
              t = i.indexOf(
                (n = r.concat(this._c, this.escape(n), r, r)),
                this._i
              ),
              u = null;
            return (
              -1 < t &&
                ((t = i.indexOf(r, t + n.length - 1) + 1),
                (u = i.substring(t, (t = i.indexOf(r, t)))),
                (u = this.unescape(i.substr(++t, u)))),
              u
            );
          }),
          (t.prototype.key = function() {
            for (
              var t = this._storage[this._key],
                r = this.c,
                f = r + this._c,
                n = this._i,
                u = [],
                i = 0,
                e = 0;
              -1 < (n = t.indexOf(f, n));

            )
              (u[e++] = this.unescape(
                t.substring((n += 2), (i = t.indexOf(r, n)))
              )),
                (n = t.indexOf(r, i) + 2),
                (i = t.indexOf(r, n)),
                (n = 1 + i + 1 * t.substring(n, i));
            return u;
          }),
          (t.prototype.set = function(n, t) {
            this.del(n);
            this._storage[this._key] += i.call(this, n, t);
          }),
          (t.prototype.unescape = n.unescape),
          t
        );
      })(n);
      Object.prototype.toString.call(n.opera) === "[object Opera]" &&
        ((history.navigationMode = "compatible"),
        (t.prototype.escape = n.encodeURIComponent),
        (t.prototype.unescape = n.decodeURIComponent));
      o.prototype = {
        length: 0,
        key: function(n) {
          if (typeof n != "number" || n < 0 || r.length <= n)
            throw "Invalid argument";
          return r[n];
        },
        getItem: function(n) {
          if (((n = u + n), h.call(f, n))) return f[n];
          var i = t.get(n);
          return i !== null && (i = f[n] = e.decode(s, i)), i;
        },
        setItem: function(n, i) {
          this.removeItem(n);
          n = u + n;
          t.set(n, e.encode(s, (f[n] = "" + i)));
          this.length = r.push(n);
        },
        removeItem: function(n) {
          var i = t.get((n = u + n));
          i !== null && (delete f[n], t.del(n), (this.length = r.remove(n)));
        },
        clear: function() {
          t.clear();
          f = {};
          r.length = 0;
        }
      };
      var u = i.document.domain,
        r = [],
        f = {},
        h = f.hasOwnProperty,
        s;
      r.remove = function(n) {
        var t = this.indexOf(n);
        return -1 < t && this.splice(t, 1), this.length;
      };
      r.indexOf ||
        (r.indexOf = function(n) {
          for (var t = 0, i = this.length; t < i; ++t)
            if (this[t] === n) return t;
          return -1;
        });
      i.sessionStorage &&
        ((o = function() {}), (o.prototype = i.sessionStorage));
      o = new o();
      r !== null && (n.sessionStorage = o);
    })(window);
} catch (er) {}
(function(n) {
  n(document).ajaxError(function(n, t) {
    Centris.ErrorManager.onAjaxError(t);
  });
  n.extend({
    stringify: function(n) {
      var i = typeof n,
        r,
        t,
        f,
        u;
      if ("object" != i || null === n)
        return "string" == i && (n = '"' + n + '"'), String(n);
      f = [];
      u = n && n.constructor == Array;
      for (r in n)
        (t = n[r]),
          (i = typeof t),
          n.hasOwnProperty(r) &&
            ("string" == i
              ? (t = '"' + t + '"')
              : "object" == i && null !== t && (t = jQuery.stringify(t)),
            f.push((u ? "" : '"' + r + '":') + String(t)));
      return (u ? "[" : "{") + String(f) + (u ? "]" : "}");
    }
  });
})(jQuery);
Centris = {
  Format: {
    toPhoneFormat: function(n) {
      return (
        n.length <= 10
          ? (n = n.replace(/\D/g, "").replace(/^(\d{3})(\d{3})/, "$1-$2-"))
          : n.length >= 12 &&
            n.length <= 16 &&
            (n = n
              .replace(/\D/g, " ")
              .replace(/^(\d{3})( )(\d{3})/, "$1-$3-")
              .replace(/- /, "-")
              .replace(/( )(\d{1,3}$)/, " x $2")),
        n
      );
    }
  },
  Dialog: {
    alert: function(n, t, i) {
      try {
        if ($(".modal").length) {
          $(".modal").on("hidden.bs.modal", function() {
            i && i();
            t && t.focus();
          });
          $(".modal-body").html(n);
          $(".modal").modal("show");
        } else {
          var r = {};
          r[Centris.Resources.UserMessage.Close] = function() {
            $(this).dialog("close");
            $(this)
              .dialog("destroy")
              .remove();
            i && i();
            t && t.focus();
          };
          $("<div id='dialog-alert'/>")
            .html(n)
            .dialog({
              autoOpen: !1,
              buttons: r,
              height: 144,
              width: 305,
              modal: !0,
              title: Centris.Resources.UserMessage.AlertTitle,
              draggable: !1,
              position: "center",
              resizable: !1
            });
          $(".ui-dialog").css({
            "z-index": 3e6,
            "margin-top": screen.height / 2 - 72
          });
          $("#dialog-alert").dialog("open");
        }
      } catch (u) {
        alert(n);
      }
    },
    confirm: function(n, t, i, r, u, f) {
      try {
        var e = {};
        e[Centris.Resources.UserMessage[i]] = function() {
          $(this).dialog("close");
          $(this)
            .dialog("destroy")
            .remove();
          u && u();
        };
        e[Centris.Resources.UserMessage[r]] = function() {
          $(this).dialog("close");
          $(this)
            .dialog("destroy")
            .remove();
          f && f();
        };
        $("<div id='dialog-confirm'/>")
          .html(Centris.Resources.UserMessage[t])
          .dialog({
            autoOpen: !1,
            buttons: e,
            height: 144,
            width: 305,
            modal: !0,
            title: Centris.Resources.UserMessage[n],
            draggable: !1,
            resizable: !1
          });
        $("#dialog-confirm").dialog("open");
      } catch (o) {
        alert(value);
      }
    }
  },
  ErrorManager: {
    errorSessionTimeout: "SESSION_TIMEOUT",
    onAjaxError: function(n) {
      n && n.status === 555 && this.onSessionTimeout();
    },
    onSessionTimeout: function() {
      function i() {
        window.location = window.location.pathname;
      }
      var n = Centris.Resources.UserMessage.SessionExpiredTitle,
        t = Centris.Resources.UserMessage.SessionExpiredMsg;
      if (Centris.Browser.getCookieSupport() === null) {
        window.location = "/errors/nocookie.aspx";
        return;
      }
      if ($.ui.button) {
        $("#property-result").unblock();
        $("#resultContainer").unblock();
        Centris.Dialog.alert(
          Centris.Resources.UserMessage.SessionExpiredMsg,
          null,
          i
        );
        return;
      }
      $("<div>" + t + "</div>").dialog({
        modal: !0,
        title: n,
        close: function() {
          window.location.reload(!0);
        },
        buttons: {
          Ok: function() {
            $(this).dialog("close");
          }
        }
      });
    }
  },
  Parse: {
    isNumber: function(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    isNumberKeyPress: function(n, t) {
      n = n ? n : window.event;
      var i = n.which ? n.which : n.keyCode;
      if (i) {
        if (t && i === 46) return !0;
        if (i > 31 && (i < 48 || i > 57)) return !1;
      } else return !1;
      return !0;
    },
    cleanNumber: function(n) {
      return n
        ? n.toString
          ? ((n = n.toString()),
            window.Centris.Master.Languages === "en" &&
              (n = n.replace(/,/g, "")),
            (n = n.replace("$", "")),
            (n = n.replace(/\s/g, "")),
            window.Centris.Parse.isNumber(n) || (n = "0"),
            n)
          : "0"
        : 0;
    }
  }
};
Centris.Broker = {};
Centris.Services = {};
Centris.Property = {};
Centris.Widgets = {};
Centris.fn = {};
Centris.Resources = {};
Centris.Pages = {};
Centris.Localization = new (function() {
  this.Languages = { English: "en", French: "fr" };
  var n = this.Languages.French;
  this.setCurrentLanguage = function(t) {
    if (t === this.Languages.English) {
      n = this.Languages.English;
      return;
    }
    if (t === this.Languages.French) {
      n = this.Languages.French;
      return;
    }
    throw new Error("Invalid language");
  };
  this.isEnglish = function() {
    return n === this.Languages.English;
  };
  this.formatPriceNumber = function(n) {
    var t = this.formatNumber(n);
    return this.isEnglish() ? "$" + t : t + " $";
  };
  this.formatNumber = function(n) {
    for (var u, i, r = [], t = 0; t < n.toString().length / 3; ++t)
      r[t] = n
        .toString()
        .substring(
          n.toString().length - (t + 1) * 3,
          n.toString().length - (t + 1) * 3 + 3
        );
    for (u = r[0], i = 1; i < n.toString().length / 3; ++i)
      u = r[i] + (this.isEnglish() && r[i] !== "-" ? "," : " ") + u;
    return u.replace(",.", ".").replace(" .", ".");
  };
})();
Centris.fn.wsSend = function(n, t, i, r) {
  $.ajax({
    type: "POST",
    dataType: "json",
    url: n,
    data: t,
    contentType: "application/json; charset=utf-8",
    success: i,
    error: r
  });
};
Centris.fn.wsSendWithRetry = function(n, t, i, r) {
  function u(n, t) {
    $.ajax({
      type: "POST",
      dataType: "json",
      url: n,
      data: t,
      contentType: "application/json; charset=utf-8",
      success: i,
      error: function() {
        r ? r() : (window.location = window.location.pathname);
      }
    });
  }
  $.ajax({
    type: "POST",
    dataType: "json",
    url: n,
    data: t,
    contentType: "application/json; charset=utf-8",
    success: i,
    error: function() {
      u(n, t);
    }
  });
};
(Centris.Debuger = function() {
  function t() {
    var i = new Date(),
      n = i.getMinutes(),
      t = i.getSeconds();
    return (
      n < 10 && (n = "0" + n),
      t < 10 && (t = "0" + t),
      "[" + i.getHours() + ":" + n + ":" + t + "] "
    );
  }
  var n = null,
    i = this;
  this.write = function(i) {
    n !== null && window.DEBUG === !0 && n.append("<div>" + t() + i + "</div>");
  };
  this.error = function(i) {
    n !== null &&
      window.DEBUG === !0 &&
      n.append("<div style='color:red;'>" + t() + i + "</div>");
  };
  this.clear = function() {
    var n = $("#centris-debuger-window div");
    n.length !== 0 && n.empty();
  };
  this.show = function() {
    ((n = $("#centris-debuger-window")), n.length > 0) ||
      ((n = $(
        "<div id='centris-debuger-window' class='ui-widget-content'><h4 class='ui-widget-header' onclick='(new Centris.Debuger).clear();'>Centris Debuger</h4></div>"
      )),
      n.css("position", "absolute"),
      n.css("left", "0px"),
      n.css("top", "0px"),
      n.css("width", "375px"),
      n.css("border", "1px solid black"),
      n.css("font-size", "10px"),
      n.resizable ? n.resizable() : n.css("background-color", "white"),
      n.draggable && n.draggable(),
      $(document.body).append(n));
  };
  window.DEBUG === !0 &&
    (this.show(),
    (window.onerror = function(n, t, r) {
      return i.error("url:" + t + "<br />line:" + r + "[" + n + "]"), !0;
    }));
}),
  (function(n, t, i) {
    function f(n) {
      return "[object Date]" == u.call(n);
    }
    function e(n) {
      return "[object RegExp]" == u.call(n);
    }
    var u, r;
    (i || (i = n.Centris = {}), i.Cookie) ||
      ((u = Object.prototype.toString),
      (r = {
        get: function(n) {
          return r.has(n) ? r.list()[n] : null;
        },
        has: function(n) {
          return new RegExp("(?:;\\s*|^)" + encodeURIComponent(n) + "=").test(
            t.cookie
          );
        },
        list: function(n) {
          for (
            var u = t.cookie.split(";"), i, f = {}, r = 0, o = u.length;
            r < o;
            ++r
          )
            (i = u[r].split("=")),
              (i[0] = i[0].replace(/^\s+|\s+$/, "")),
              (!e(n) || n.test(i[0])) &&
                (f[decodeURIComponent(i[0])] = decodeURIComponent(i[1]));
          return f;
        },
        remove: function(n, t) {
          var i = {};
          for (var u in t || {}) i[u] = t[u];
          return (i.expires = new Date(0)), (i.maxAge = -1), r.set(n, null, i);
        },
        set: function(n, i, r) {
          var u, e, s, o;
          return (
            (r = r || {}),
            (u = [encodeURIComponent(n) + "=" + encodeURIComponent(i)]),
            r.path && u.push("path=" + r.path),
            r.domain && u.push("domain=" + r.domain),
            (e =
              "maxAge" in r
                ? r.maxAge
                : "max_age" in r
                ? r.max_age
                : r["max-age"]),
            "undefined" == typeof e ||
              "null" == typeof e ||
              isNaN((s = parseFloat(e))) ||
              u.push("max-age=" + s),
            (o = f(r.expires) ? r.expires.toUTCString() : r.expires),
            o && u.push("expires=" + o),
            r.secure && u.push("secure"),
            (u = u.join(";")),
            (t.cookie = u),
            u
          );
        },
        test: function() {
          var n = "70ab3d396b85e670f25b93be05e027e4eb655b71",
            t = "Élodie Jaubert",
            i;
          return r.remove(n), r.set(n, t), (i = t == r.get(n)), r.remove(n), i;
        }
      }),
      (i.Cookie = r));
  })(window, document, window.Centris),
  (function(n, t, i) {
    (i || (i = n.Centris = {}), i.Browser) ||
      (i.Browser = new (function() {
        this.isDocumentMode = function(n, i) {
          return typeof t.documentMode == "undefined"
            ? !1
            : t.documentMode == n
            ? !0
            : i === !0 &&
              (t.documentMode == 7 ||
                t.documentMode == 8 ||
                t.documentMode == 9 ||
                t.documentMode == 10);
        };
        this.isTouch = function() {
          return "ontouchstart" in t;
        };
        this.isIpad = function() {
          return navigator.userAgent.match(/iPad/i);
        };
        this.isIphone = function() {
          return navigator.userAgent.match(/iPhone/i);
        };
        this.isIpod = function() {
          return navigator.userAgent.match(/iPod/i);
        };
        this.isAndroidPhone = function() {
          return (
            navigator.userAgent.match(/Android/i) &&
            navigator.userAgent.match(/Mobile/i)
          );
        };
        this.isAndroidTablet = function() {
          return (
            navigator.userAgent.match(/Android/i) &&
            !navigator.userAgent.match(/Mobile/i)
          );
        };
        this.getCookieSupport = function() {
          var i = !0,
            n;
          do
            if (
              ((n = "gCStest=" + Math.floor(Math.random() * 1e8)),
              (t.cookie = i ? n + ";expires=Tue, 01-Jan-2030 00:00:00 GMT" : n),
              t.cookie.indexOf(n) !== -1)
            )
              return (
                (t.cookie = n + ";expires=Sat, 01-Jan-2000 00:00:00 GMT"), i
              );
          while (!(i = !i));
          return null;
        };
        this.normalizeDocument = function() {
          this.isTouch() && $(t.body).removeClass("no-touch");
        };
        this.getUrlParameter = function(n) {
          n = n.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
          var i = new RegExp("[\\?&]" + n + "=([^&#]*)"),
            t = i.exec(location.search);
          return t === null ? "" : decodeURIComponent(t[1].replace(/\+/g, " "));
        };
        var n = function() {
          $.ajaxSetup({ headers: { "cache-control": "no-cache" } });
        };
        n();
      })());
  })(window, document, window.Centris),
  (function() {
    var n = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
      ""
    );
    Math.uuid = function(t, i) {
      var u = [],
        r,
        f;
      if (((i = i || n.length), t))
        for (r = 0; r < t; r++) u[r] = n[0 | (Math.random() * i)];
      else
        for (
          u[8] = u[13] = u[18] = u[23] = "-", u[14] = "4", r = 0;
          r < 36;
          r++
        )
          u[r] ||
            ((f = 0 | (Math.random() * 16)),
            (u[r] = n[r == 19 ? (f & 3) | 8 : f]));
      return u.join("");
    };
    Math.uuidFast = function() {
      for (var r = new Array(36), i = 0, u, t = 0; t < 36; t++)
        t == 8 || t == 13 || t == 18 || t == 23
          ? (r[t] = "-")
          : t == 14
          ? (r[t] = "4")
          : (i <= 2 && (i = (33554432 + Math.random() * 16777216) | 0),
            (u = i & 15),
            (i = i >> 4),
            (r[t] = n[t == 19 ? (u & 3) | 8 : u]));
      return r.join("");
    };
    Math.uuidCompact = function() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
        n
      ) {
        var t = (Math.random() * 16) | 0,
          i = n == "x" ? t : (t & 3) | 8;
        return i.toString(16);
      });
    };
  })(),
  (function(n, t, i, r) {
    (i || (i = n.Centris = {}), i.Url) ||
      (i.Url = new (function() {
        this.getHash = function(t, i) {
          return t == r && n.location.hash.length > 0
            ? n.location.hash.substring(1)
            : t == r && n.location.hash.length == 0
            ? i
            : n.location.hash.length == 0
            ? i || ""
            : this.getVariable(
                decodeURIComponent(n.location.hash.substring(1)),
                t,
                i
              );
        };
        this.getQueryString = function(t, i) {
          return n.location.search.length == 0
            ? i != r
              ? i
              : ""
            : this.getVariable(n.location.search.substring(1), t, i);
        };
        this.goToUrlWithNewParam = function(i, r) {
          var u, f, e, o;
          for (
            i = escape(i),
              r = escape(r),
              u = t.location.search.substr(1).split("&"),
              u.length === 1 && u[0] === "" && (u = []),
              f = u.length;
            f--;

          )
            if (
              ((e = u[f].split("=")), e[0].toLowerCase() == i.toLowerCase())
            ) {
              e[1] = r;
              u[f] = e.join("=");
              break;
            }
          f < 0 && (u[u.length] = [i, r].join("="));
          o = t.location.href.split("?")[0] + "?" + u.join("&");
          n.location.replace(o);
        };
        this.getQueryStringVars = function(n) {
          var t, i, u;
          if (n == r || n.length == 0) return "";
          t = n.split("&");
          i = [];
          for (v in t) (u = t[v].split("=")), (i[u[0]] = u[1]);
          return i;
        };
        this.getVariable = function(n, t, i) {
          var f, u, e;
          if (n == r || n.length == 0) return i || "";
          for (f = n.split("&"), u = 0; u < f.length; u++)
            if (((e = f[u].split("=")), e[0].toLowerCase() === t.toLowerCase()))
              return unescape(e[1]);
          return i != r ? i : "";
        };
        this.getBaseUrl = function() {
          var n = location.port != "" ? ":" + location.port : "";
          return (
            location.protocol + "//" + location.hostname + n + location.pathname
          );
        };
        this.go = function(t, i) {
          i === !0 ? location.replace(t) : (n.location = t);
        };
        this.getEncodedHashParam = function(n, t) {
          return encodeURIComponent(n + "=" + t);
        };
        this.openWindowWithReferer = function(t) {
          if (!t) return !1;
          var i = t.getAttribute("target");
          return (
            i && i.indexOf("_blank") == 0 && (i = "_blank" + Math.uuid(8)),
            t.setAttribute("target", i),
            n.open("about:blank", i).focus(),
            !0
          );
        };
      })());
  })(window, document, window.Centris);
typeof Centris == "undefined" && (Centris = {});
typeof Centris.Button == "undefined" && (Centris.Button = {});
typeof Centris.Console == "undefined" && (Centris.Console = {});
Centris.Console.Log = function(n) {
  typeof console != "undefined" && console.log(n);
};
Centris.Button.SendEmailButton = function(n) {
  var i = this,
    u = n.HtmlFieldSaver,
    r = n.jqForm,
    f = n.jqSendButton,
    e = n.callbackAfterSend,
    t = n.additionalData,
    o = function() {
      f.on("click", function() {
        if (r.valid()) {
          var n = u.captureDataAsObject(r),
            i = $.stringify($.extend({}, n, t))
              .replace(/'/g, "\\'")
              .replace(/"/g, '\\"');
          $("#SendFormData")
            .hide()
            .after(
              '<img src="' +
                window.ConsumerSite.tenantImagesUrl +
                'master/loader.gif" />'
            );
          Centris.fn.wsSend(
            "/misc/MailWebService.asmx/SendEmail",
            "{'param':'" + i + "'}",
            e
          );
        }
      });
    },
    s = function(n, i, r, u) {
      t.sitepagecaller = n;
      t.articletitle = i;
      t.geography = r;
      t.geographyurl = u;
    };
  i.Type = "sendEmailbutton";
  i.action = o;
  i.setGeographyInformation = s;
};
Centris.OpenNewWindow = function(n) {
  var t = "Centris" + new Date().getTime();
  window.open(
    n,
    t,
    "location=1,status=1,scrollbars=1,resizable=1,width=1000, height=800"
  );
};
Centris.SocialShareControl = function(n) {
  var t = this;
  $.each($("[data-socialname]"), function(n, t) {
    $(t).hide();
  });
  t.Initialize = function() {
    $.each(n, function(n, t) {
      var r = t.type,
        i = $("[data-socialname=" + r + "]");
      i.length > 0 &&
        ($(i[0]).show(),
        typeof t.customAction != "undefined" && t.customAction());
    });
  };
  t.Initialize();
};
Centris.ActionHandler = function() {
  function n(n) {
    $(n).fadeToggle(null, null, function() {});
  }
  var t = function() {
    var t = $("[data-callback], [data-target]");
    $.each(t, function() {
      var t = $(this),
        i = t.data("callback"),
        r,
        u,
        e,
        f;
      if (typeof i != "undefined")
        (r = t.data("param")),
          r !== "undefined"
            ? executeFunctionByName(i, window, r)
            : i(i, window);
      else if (((u = t.data("target")), u !== null)) {
        f = t.data("effect");
        e =
          f.toLowerCase() === "fadein"
            ? function(t) {
                var i = "#" + t.data.target;
                n(i);
              }
            : f.toLowerCase() === "slidedown"
            ? function(n) {
                var t = "#" + n.data.target;
                $(t).slideToggle();
              }
            : function(n) {
                var t = "#" + n.data.target;
                $(t).toggle();
              };
        t.on("click", { target: u }, e);
      }
    });
  };
  this.ToggleAndPutTop = function(t) {
    n(t);
  };
  t();
};
Centris.HtmlCookieSaver = function(n, t) {
  var i = this,
    r = t;
  typeof r == "undefined" && (r = { detectionTimeoutInHours: 2 });
  i.ReadInfoFromCookie = function(t) {
    var i = Centris.Cookie.get(t),
      r;
    i != null &&
      ((r = i.split(",")),
      $.each(r, function(t, i) {
        var r = i.split("|"),
          u;
        r.length == 2 && ((u = $("#" + r[0])), n.setValueToHtmlNode(u, r[1]));
      }));
  };
  i.SaveInfoFromCookie = function(t, i) {
    var u = n.captureDataAsArray(t),
      f = new Date().addHours(r.detectionTimeoutInHours),
      e = { expires: f, path: "/" };
    Centris.Cookie.set(i, u, e);
  };
  i.DeleteInfoInCookie = function(n) {
    Centris.Cookie.remove(n, { path: "/" });
  };
};
Centris.HtmlFieldSaver = function() {
  var n = this;
  n.captureDataAsArray = function(t) {
    var r = t,
      u = r.find("input, [for]"),
      i = [];
    return (
      $.each(u, function(t, r) {
        var f = $(r),
          u,
          e;
        f.prop("type") !== "submit" &&
          ((u = n.getValueFromHtmlNode(f)),
          u !== null && u !== "" && ((e = f.prop("id") + "|" + u), i.push(e)));
      }),
      i
    );
  };
  n.captureDataAsObject = function(t) {
    var r = t,
      u = r.find("input, textarea"),
      i = {};
    return (
      $.each(u, function(t, r) {
        var u = $(r),
          f,
          e;
        u.prop("type") !== "submit" &&
          u.prop("id") !== "__VIEWSTATE" &&
          u.prop("id") !== "__VIEWSTATEGENERATOR" &&
          ((f = n.getValueFromHtmlNode(u)),
          f !== null && f !== "" && ((e = u.prop("id")), (i[e] = f)));
      }),
      i
    );
  };
  n.setValueToHtmlNode = function(n, t) {
    n.prop("type") === "checkbox" &&
      (t === "true" ? n.prop("checked", !0) : n.prop("checked", !1));
    n.prop("for") !== "undefined" && n.hasClass("checkboxStyle")
      ? t === "true"
        ? n.addClass("active")
        : n.removeClass("active")
      : n.val(t);
  };
  n.getValueFromHtmlNode = function(n) {
    var t = null;
    return (
      n &&
        (n.prop("tagName") === "SELECT",
        (t =
          n.prop("tagName") === "SPAN"
            ? n.text()
            : n.prop("for") !== "undefined" && n.hasClass("checkboxStyle")
            ? n.hasClass("active")
            : n.prop("type") === "checkbox"
            ? n.prop("checked")
            : n.prop("value"))),
      t
    );
  };
};
Centris.Paginator = function(n) {
  var t = this,
    i,
    h,
    r,
    o,
    a = {},
    f = $.noop,
    c = { onClick: "" },
    v;
  $.extend(c, n);
  t.Initialize = function(n, t, u, e, s) {
    i = t;
    h = n;
    r = u * i;
    o = r + i - 1;
    f = e;
    a = s;
    l();
    v(f);
  };
  v = function(n) {
    var o = n.find(".goFirst"),
      i,
      r,
      f;
    o.unbind("click");
    o.on("click", function() {
      var n = u();
      n > 0 && ((t.currentElements = this), t.GoToPage(1));
    });
    i = n.find(".previous");
    i.unbind("click");
    i.on("click", function() {
      var n = u();
      n > 0 && ((t.currentElements = this), t.GoToPage(n - 1));
    });
    r = n.find(".next");
    r.unbind("click");
    r.on("click", function() {
      var n = u(),
        i = e();
      n != i && i > 0 && ((t.currentElements = this), t.GoToPage(n + 1));
    });
    f = n.find(".goLast");
    f.unbind("click");
    f.on("click", function() {
      var i = u(),
        n = e();
      i != n && n > 0 && ((t.currentElements = this), t.GoToPage(n));
    });
    $(document).unbind("keyup");
    $(document).keyup(function(i) {
      var r = u(),
        f = e(),
        o = n.is(":visible"),
        s = !$(":focus").is("input"),
        h = $(":focus").closest("#sendEmail").length === 0,
        c = $("html").hasClass("photoViewerEnabled");
      s &&
        o &&
        h &&
        !c &&
        (i.keyCode == 39 && r !== f && t.GoToPage(r + 1),
        i.keyCode == 37 && r !== 1 && t.GoToPage(r - 1));
    });
  };
  t.SetPaginationBasedOnPosition = function(n) {
    r = n;
    o = r + i - 1;
    l();
  };
  t.GoToPage = function(n) {
    var u = e();
    if (n >= 1 && n <= u) {
      if (typeof c.onClick == "function") c.onClick(t.currentElements);
      r = i * (n - 1);
      o = r + i - 1;
      y(r, o);
      l();
    }
  };
  this.getCurrentPage = function() {
    return u();
  };
  var u = function() {
      var n = r / i;
      return Math.floor(n) + 1;
    },
    e = function() {
      var n = h / i,
        t = h % i;
      return t > 0 ? Math.floor(n) + 1 : Math.floor(n);
    },
    y = function(n, t) {
      var i = n,
        r = t,
        f = u();
      a(i, r, f);
    },
    s = function(n, t) {
      t ? n.addClass("inactive") : n.removeClass("inactive");
    },
    l = function() {
      var t = u(),
        n = e(),
        i = n == 0 ? "0" : Centris.Localization.formatNumber(t);
      $(f)
        .find(".pager-current")
        .text(i + " / " + Centris.Localization.formatNumber(n));
      s($(f).find(".goFirst"), t <= 1);
      s($(f).find(".previous"), t <= 1);
      s($(f).find(".next"), t == n || n <= 0);
      s($(f).find(".goLast"), t == n || n <= 0);
    };
};
observers = {};
Centris.Observer = function(n) {
  var t,
    i = n && observers[n];
  return (
    i ||
      ((t = $.Callbacks()),
      (i = { publish: t.fire, subscribe: t.add, unsubscribe: t.remove }),
      n && (observers[n] = i)),
    i
  );
};
(Centris.SendEventToGoogleTagManager = function(n) {
  if (typeof dataLayer != "undefined") {
    var t = $("#isCrawler").val() === "true";
    dataLayer.push({ event: n + "-with-crawler" });
    t || dataLayer.push({ event: n });
  }
}),
  (function(n, t, i, r, u) {
    function e() {
      if (n.CENTRIS_NO_CONTEXT === !0) {
        i.ContextManager.isClose = !0;
        return;
      }
      n.onpageshow = function(n) {
        n.persisted && (i.ContextManager.close(), location.reload(!0));
      };
      n.onunload = function() {
        i.ContextManager.close();
      };
      n.onbeforeunload = function() {
        i.ContextManager.close();
      };
      i.ContextManager.init();
    }
    if (
      ((i.ContextManager = new (function() {
        function o() {
          return !!(n.history && history.replaceState);
        }
        try {
          this.ss = sessionStorage;
        } catch (s) {
          n.CENTRIS_NO_CONTEXT !== !0 && (n.location = "/mvc/error/nocookie");
        }
        var f = "ssUserContext",
          t = "uc",
          e = "/mvc/error/error500";
        this.isClose = !1;
        this.getUcInSessionStorage = function() {
          var t, i;
          try {
            if (((t = this.ss.getItem(f)), t))
              return ((i = r.parseJSON(t)), parseInt(i.uc) != parseInt(n.name))
                ? null
                : i;
          } catch (u) {
            n.CENTRIS_NO_CONTEXT !== !0 && (n.location = "/mvc/error/nocookie");
          }
          return null;
        };
        this.setUcInSessionStorage = function(t) {
          n.name = t.uc;
          this.ucKeyInfo = t;
          try {
            this.ss.setItem(f, r.stringify(t));
          } catch (i) {}
        };
        this.init = function() {
          var n = this.getUcInSessionStorage(),
            r;
          n != null && n.isLock && this.unlockUc(n);
          r = parseInt(i.Url.getQueryString(t, 0)) || 0;
          this.lockUc(r);
        };
        this.getXhrData = function(n) {
          var f = i.Url.getQueryString(t, 0),
            e =
              i.ContextManager.ucKeyInfo != u
                ? i.ContextManager.ucKeyInfo.unlockKey
                : "",
            r = { uc: f, uck: e };
          if (n != u) for (p in n) r[p] = n[p];
          return r;
        };
        this.navigate = function(n, t) {
          i.ContextManager.close();
          i.Url.go(i.ContextManager.getUrl(n), t);
        };
        this.pushAdressState = function(t, i, r) {
          o() && n.history.pushState(t, i, r);
        };
        this.setAdressState = function(t, i, r) {
          o() ? history.replaceState(t, i, r) : n.location.href(r);
        };
        this.getUrl = function(n) {
          var u = parseInt(i.Url.getQueryString(t, 0)),
            r;
          return u === 0
            ? n
            : ((r = "uc=" + u),
              n.indexOf("uc=") > 0
                ? n
                : n.indexOf("?") > 0
                ? n + "&" + r
                : n + "?" + r);
        };
        this.normalizeUrl = function(n) {
          r(n).each(function() {
            r(this).attr("href") == u ||
              r(this)
                .attr("href")
                .indexOf("javascript") >= 0 ||
              (r(this).attr("target") != u && r(this).attr("target") != "") ||
              r(this).attr(
                "href",
                i.ContextManager.getUrl(r(this).attr("href"))
              );
          });
          r(n).click(function() {
            return r(this).attr("target") != u && r(this).attr("target") != ""
              ? !0
              : i.ContextManager.close();
          });
        };
        this.normalizeUrlWithKey = function(n) {
          var t = r(n).attr("href");
          typeof t != u && r(n).attr("href", this.normalizeUrlBase(t));
        };
        this.normalizeUrlBase = function(n) {
          if (n) {
            var i = this.getXhrData(),
              r = t + "=" + i.uc + "&uck=" + i.uck;
            return n.indexOf("?") > 0 ? n + "&" + r : n + "?" + r;
          }
        };
        this.close = function() {
          return i.ContextManager.isClose === !0
            ? !0
            : (this.unlockUc(this.ucKeyInfo),
              (i.ContextManager.isClose = !0),
              !0);
        };
        this.closeWithCB = function(n) {
          return i.ContextManager.isClose === !0
            ? !0
            : (this.unlockUc(this.ucKeyInfo, n),
              (i.ContextManager.isClose = !0),
              !0);
        };
        this.lockUc = function(n) {
          var t = this;
          r.ajax({
            type: "POST",
            async: !1,
            url: "/Master/UserContextService.asmx/Lock",
            data: "{'uc':'" + n + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(i) {
              var r = { uc: n, unlockKey: i.d, isLock: !0 };
              t.setUcInSessionStorage(r);
            },
            error: function() {}
          });
        };
        this.unlockUc = function(n, t) {
          n = n || this.ucKeyInfo;
          var i = this;
          n &&
            r.ajax({
              type: "POST",
              async: !1,
              url: "/Master/UserContextService.asmx/UnLock",
              data: "{'uc':'" + n.uc + "', 'uck':'" + n.unlockKey + "'}",
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function() {
                n && ((n.isLock = !1), i.setUcInSessionStorage(n));
                t && t();
              },
              error: function() {}
            });
        };
        this.synchronize = function() {
          var u = "00000000-0000-0000-0000-000000000000",
            f = this.getUcInSessionStorage() || { uc: "-1", unlockKey: u },
            o = parseInt(Centris.Url.getQueryString(t, 0)) || 0,
            s = this;
          r.ajax({
            type: "POST",
            url: "/Master/UserContextService.asmx/Synchronize",
            data:
              "{'urlUc':'" +
              o +
              "','windowUc':'" +
              f.uc +
              "', 'windowUck':'" +
              f.unlockKey +
              "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(r) {
              if (r.d.Succeeded) {
                var f = { uc: r.d.Result, unlockKey: u, isLock: !1 };
                s.setUcInSessionStorage(f);
                i.Url.goToUrlWithNewParam(t, r.d.Result);
              } else n.location = e;
            },
            error: function() {
              n.location = e;
            }
          });
        };
        this.validateAndClose = function() {
          return n.Page_ClientValidate() ? i.ContextManager.close() : !1;
        };
      })()),
      r(t).ready(function() {}),
      parent == self)
    )
      e();
    else {
      var f = !1;
      try {
        f = parent.Centris != null;
      } catch (o) {}
      f
        ? ((i.ContextManager.isClose = !0),
          parent.Centris.ContextManager.ucKeyInfo &&
            (i.ContextManager.ucKeyInfo =
              parent.Centris.ContextManager.ucKeyInfo))
        : e();
    }
    r.ajaxSetup({
      beforeSend: function(n) {
        n.setRequestHeader("X-CENTRIS-UC", i.Url.getQueryString("uc", 0));
        i.ContextManager.ucKeyInfo &&
          n.setRequestHeader(
            "X-CENTRIS-UCK",
            i.ContextManager.ucKeyInfo.unlockKey
          );
      }
    });
  })(window, document, Centris, jQuery),
  (function(n, t, i, r) {
    (r || (r = t.Centris = {}), r.Gallery) ||
      (r.Gallery = function() {
        function w(n, t, i, r) {
          o.find(".description").html(
            "<strong>" + t + "/" + n + "</strong> " + i + (r ? " - " + r : "")
          );
        }
        function ht() {
          t.history.pushState(null, null, t.location.href);
        }
        function ct() {
          n(t).on("popstate.gallery", function() {
            f.close();
          });
        }
        function lt(n) {
          for (var i, t = n.nextIndex; t < n.nextIndex + d; t++)
            (i = u.data[t]),
              i &&
                !i.loaded &&
                (s
                  .children()
                  .eq(t)
                  .find("img")
                  .attr("src", i.UrlThumb),
                (i.loaded = !0));
        }
        function a() {
          r.parent().addClass("forceShowArrows");
          t.setTimeout(function() {
            r.parent().removeClass("forceShowArrows");
          }, 5e3);
        }
        function at(n, t, i) {
          var f = n.width(),
            e = n.height(),
            u = bt(t, i, f, e),
            r;
          if (it && u.width === t && u.height === i && c.length > 0)
            return c[c.length - 1];
          for (r = 0; r < c.length; r++)
            if (u.width <= c[r].Width && u.height <= c[r].Height) return c[r];
          return null;
        }
        function vt() {
          n(i).on("keyup.gallery", function(n) {
            n.keyCode === 39
              ? (f.next(), a())
              : n.keyCode === 37
              ? (f.prev(), a())
              : (n.keyCode === 38 || n.keyCode === 40) && n.preventDefault();
          });
        }
        function yt() {
          r.hammer()
            .on(
              "drag pinch doubletap pinchin pinchout swipeup swipedown",
              function(n) {
                return (
                  n && n.gesture && n.gesture.preventDefault(),
                  n.stopPropagation(),
                  n.preventDefault(),
                  !1
                );
              }
            )
            .on("swipeleft swiperight", function(n) {
              n && n.gesture && n.gesture.preventDefault();
              n.stopPropagation();
              t.setTimeout(function() {
                r.parent().removeClass("forceShowArrows");
                n.type === "swipeleft" ? f.next() : f.prev();
              }, 1);
            });
        }
        function ft(n) {
          var t;
          return !n || !n.UrlThumb
            ? ""
            : ((t = at(tt, n.MaxWidth, n.MaxHeight)), !t)
            ? ""
            : t.Domain + "/media.ashx?id=" + n.Id + t.QueryParams;
        }
        function g(n, t) {
          if (r.attr("src") === n) {
            y.hide();
            r.show()
              .fadeTo(0, 1)
              .attr("src", n);
            v.show();
            return;
          }
          r.fadeTo(0, 0).attr("src", n).loaded = !1;
          t != null
            ? r.attr("alt", t.Desc + ", " + i.title)
            : r.attr("alt", i.title);
        }
        function et() {
          var n =
            navigator.userAgent.indexOf("Mozilla/5.0") > -1 &&
            navigator.userAgent.indexOf("Android ") > -1 &&
            navigator.userAgent.indexOf("AppleWebKit") > -1 &&
            !(navigator.userAgent.indexOf("Chrome") > -1);
          n && location.reload();
          b();
          u.autoFitResolution && g(ft(p));
        }
        function b() {
          u.autoFit !== !1 &&
            (tt.height(t.innerHeight - n(".footer").outerHeight()), pt(), wt());
        }
        function pt() {
          var i = (t.innerHeight - r.height() - n(".footer").outerHeight()) / 2;
          r.loaded &&
            (r.css({ marginTop: i > 0 ? i : 0 }),
            k.css({ marginTop: i > 0 ? i : 0 }),
            v.css({ marginBottom: i > 0 ? i : 0 }));
        }
        function wt() {
          var i = n(".footer"),
            u;
          i.css("display") !== "none" &&
            ((u =
              t.innerHeight -
              (r.height() + parseInt(r.css("marginTop"))) -
              i.outerHeight()),
            t.matchMedia &&
            t.matchMedia("(max-width: 1023px)").matches &&
            u >= 0
              ? i.css("bottom", u)
              : i.css("bottom", 5));
        }
        function bt(n, t, i, r) {
          if (n <= i && t <= r) return { width: n, height: t };
          var f = i / r,
            u = n / t;
          return u <= f
            ? { width: Math.round(u * r), height: r }
            : { width: i, height: Math.round(i / u) };
        }
        function ot(n) {
          t.setTimeout(function() {
            y.show();
            v.hide();
            p = n;
            g(ft(p), n);
            w(u.data.length, u.data.indexOf(n) + 1, n.Desc, n.DescSupp);
          }, 1);
        }
        function nt(n) {
          return dt(e, n)
            ? !1
            : (e && e.removeClass("selected"),
              (e = n),
              e.addClass("selected"),
              ot(u.data[e.index()]),
              u.data.length <= d && h.find(".nav").hide(),
              !1);
        }
        function kt(t, r) {
          var u = n("<li><img src='' /></li>");
          return (
            u.find("span").text(t.Desc),
            u
              .find("img")
              .attr(
                "src",
                r === !0 ? t.UrlThumb : "/master/images/spinner.svg"
              ),
            u.find("img").attr("title", t.Desc),
            u.find("img").attr("alt", t.Desc + ", " + i.title),
            u.find("img").attr("data-longdesc", t.DescSupp),
            u
          );
        }
        function dt(n, t) {
          return !n && !t ? !0 : !n && t ? !1 : n && !t ? !1 : n[0] === t[0];
        }
        var f = this,
          u = { data: [], autoFit: !0, autoFitResolution: !0 },
          o = n("#gallery"),
          tt = n(".image-wrapper", o),
          r = n("#fullImg"),
          y = o.find(".spinner"),
          gt = o.find(".image"),
          k = o.find(".close"),
          v = o.find(".logo"),
          st = n(t),
          p = null,
          c,
          it,
          rt,
          d = 6,
          ut = !o.parent().hasClass("photoViewerOnPage"),
          l = 0,
          h = o.find(".carousel-wrapper"),
          s,
          e;
        return (
          (f.init = function(tt, rt, ft, ht) {
            var pt, ct, at, wt;
            if (
              ((u.data = tt),
              (c = rt),
              (it = ft),
              (r = o.find("#fullImg")),
              (s = o.find(".carousel ul")),
              (r.loaded = !1),
              r.load(function() {
                r.loaded = !0;
                r.show();
                r.fadeTo(0, 1);
                setTimeout(function() {
                  b();
                  y.hide();
                  v.show();
                }, 10);
              }),
              (pt = setInterval(function() {
                b();
                r.width() === r.parent().width() && clearInterval(pt);
              }, 400)),
              u.data.length > 0)
            )
              for (g(null, u.data[0]), ct = 0; ct < u.data.length; ct++)
                (at = u.data[ct]),
                  (at.loaded = ct < d),
                  (wt = kt(at, at.loaded)),
                  s.append(wt);
            parseInt(ht) &&
              (l = ht <= u.data.length ? ht - 1 : u.data.length - 1);
            e = n(s.children()[l]);
            h.elastislide({
              imageW: 100,
              minItems: 6,
              onClick: nt,
              onBeforeSlide: lt
            });
            h.elastislide("setCurrent", l);
            ot(u.data[l]);
            h.find(".nav span").text("");
            e && e.addClass("selected");
            u.data.length === 1 && r.parent().addClass("hideArrows");
            a();
            p = u.data.length > 0 ? u.data[l] : null;
            w(u.data.length, 1, u.data[l].Desc, u.data[l].DescSupp);
            st.resize(et);
            tt.length > 1 &&
              (vt(),
              yt(),
              o.find(".wrap").click(function(t) {
                var o = t.offsetX,
                  i = t.pageY,
                  r = n(t.currentTarget),
                  s = r.children("img"),
                  u = r.outerHeight(),
                  h = s.outerHeight(),
                  e = (u - h) / 2;
                i > e &&
                  i < u - e &&
                  (o > 50 ? (f.next(), a()) : (f.prev(), a()));
                a();
              }));
            r.on("mousemove", function(t) {
              t.offsetX > 50
                ? n(this)
                    .parent()
                    .addClass("activateNextArrow")
                    .removeClass("activatePrevArrow")
                : n(this)
                    .parent()
                    .addClass("activatePrevArrow")
                    .removeClass("activateNextArrow");
            });
            k.on("click.gallery", function(n) {
              n.stopPropagation();
              ut && t.history.length == 1
                ? (t.open("", "_parent", ""), t.close())
                : t.history.back();
            });
            i.body.focus();
            b();
          }),
          (f.show = function() {
            rt = n(t).scrollTop();
            n(".photoViewer").addClass("show");
            et();
            n("html").addClass("photoViewerEnabled");
            ut || (ct(), ht());
          }),
          (f.resetGallery = function() {
            r.parent()
              .removeClass("hideArrows forceShowArrows")
              .empty()
              .append(
                '<img id="fullImg" src="" /><div class="close icon-close"></div><div class="logo"></div>'
              )
              .find("#fullImg")
              .hide();
            y.show();
            v.hide();
            o.off()
              .find(".wrap")
              .off();
            u.data = [];
            h.find(".nav").remove();
            h.off().elastislide("destroy");
            s.remove();
            h.find(".carousel").append("<ul></ul>");
            n(i).off(".gallery");
            n(t).off(".gallery");
            k.off(".gallery");
          }),
          (f.close = function() {
            o.parent().hasClass("photoViewerOnPage")
              ? n(".photoViewer").removeClass("show")
              : t.history.back();
            n("html").removeClass("photoViewerEnabled");
            n(t).scrollTop(rt);
            f.resetGallery();
          }),
          (f.next = function() {
            if (e) {
              var n = e.is(":last-child") ? s.children().first() : e.next("li"),
                t = s.children().index(n) + 1;
              w(
                s.children().length,
                t,
                n.find("img").attr("title"),
                n.find("img").attr("data-longdesc")
              );
              h.elastislide("setCurrent", n.index());
              nt(n);
            }
          }),
          (f.prev = function() {
            if (e) {
              var n = e.is(":first-child") ? s.children().last() : e.prev("li"),
                t = s.children().index(n) + 1;
              w(
                s.children().length,
                t,
                n.find("img").attr("title"),
                n.find("img").attr("data-longdesc")
              );
              h.elastislide("setCurrent", n.index());
              nt(n);
            }
          }),
          f
        );
      });
  })(jQuery, window, document, window.Centris),
  (function(n, t, i) {
    n.Centris.Master = function() {
      function r(n) {
        var r = Math.floor(Math.random() * 5) + 1,
          t =
            "//" + u.host + "/master/images/bgheader_residential_" + r + ".jpg",
          f = "url(" + t + ")";
        n ||
          ((t =
            "//" + u.host + "/master/images/bgheader_commercial_" + r + ".jpg"),
          (f = "url(" + t + ")"));
        i(".header-picture").css("background-image", f);
        is_residentiel = !n;
      }
      function f() {
        function e() {
          var t, r, n;
          s.removeClass("active");
          i(this)
            .children(".main-item")
            .addClass("active");
          n = i(this).children(".submenu");
          r = n.parent();
          f.removeClass("active");
          n.addClass("active");
          t = n.clone();
          n.remove();
          t.appendTo(r);
          f.not(".active")
            .stop()
            .slideUp("fast");
          t.stop()
            .css("height", "auto")
            .slideDown("slow");
        }
        function o() {
          i(".submenu.active")
            .stop()
            .slideUp();
          s.removeClass("active");
          f.removeClass("active");
        }
        var s, f, l, a, h, c;
        i("a[href^='/'][target!='_blank']").click(function() {
          Centris.ContextManager.close();
          i(this).attr(
            "href",
            Centris.ContextManager.getUrl(i(this).attr("href"))
          );
        });
        var v = n.location.toString(),
          y = v.split("#"),
          u = y[1];
        u &&
          (u == "confirmation"
            ? (confirmation(),
              i("html, body").animate(
                { scrolltop: i("#booking .container").offset().top },
                1200
              ))
            : u.lastIndexOf("buttonview", 0) !== 0 &&
              ((u = "#" + u),
              i("html, body").animate({ scrolltop: i(u).offset().top }, 1200)));
        i("a.noFollow").on("click", function(n) {
          n.preventDefault ? n.preventDefault() : (n.returnValue = !1);
        });
        i('a[rel="external"]').attr("target", "_blank");
        i("#header .previous-site a.close").on("click", function(n) {
          n.preventDefault ? n.preventDefault() : (n.returnValue = !1);
          i("#header .previous-site").fadeToggle("slow");
        });
        i("#sendEmail > .close").on("click", function(n) {
          n.preventDefault ? n.preventDefault() : (n.returnValue = !1);
          i("#sendEmail").fadeOut();
        });
        i(".anchor").on("click", function() {
          var n = i(this).attr("href");
          return (
            i("html, body").animate(
              { scrollTop: i(n).offset().top - 70 },
              1200
            ),
            !1
          );
        });
        i(".top-nav .menuToggle").on("click", function(n) {
          i("body").toggleClass("menu-on");
          n.stopImmediatePropagation();
        });
        i("#body * ").on("click", function(n) {
          n.target === n.currentTarget &&
            (i(n.currentTarget).is(".mobile-menu-container .main-item") ||
              i(n.currentTarget).is(".mobile-menu-container .user") ||
              i(n.currentTarget).is(".mobile-menu-container .m-favorites") ||
              i("body").removeClass("menu-on"));
        });
        s = i(".main-item");
        f = i(".submenu");
        l = !!("ontouchstart" in n) || n.navigator.msMaxTouchPoints > 0;
        l || i(".submenu a").addClass("enableHover");
        matchMedia("(max-width: 1023px)").matches
          ? (i(".main-menu > li").click(e, o),
            i("li.parentSubmenu").click(e, o),
            i(".main-menu .property-search-icon img").attr(
              "src",
              "/Master/images/btn_search_white.png"
            ))
          : (i(".main-menu > li").hoverIntent(e, o),
            i("li.parentSubmenu").hoverIntent(e, o));
        i(".submenu")
          .parent("li")
          .each(function() {
            i(this).on("click", function(n) {
              n.stopPropagation();
              var t = i(this).find(".submenu");
              i(".submenu")
                .stop()
                .slideUp()
                .parent()
                .removeClass("active");
              t.is(":hidden") &&
                t
                  .slideToggle()
                  .parent()
                  .addClass("active");
            });
          });
        i(n).resize(function() {
          matchMedia("(min-width: 1024px)").matches &&
            (i(".property-search-icon").removeAttr("style"),
            i(".menu-container").removeAttr("style"));
          showSearchSection();
        });
        i("#residentiel").on("click", function() {
          r(!0);
        });
        i("#commercial").on("click", function() {
          r(!1);
        });
        showSearchSection = function() {
          if (i(n).width() > 768) {
            var t = i(".container-fieldset:hidden");
            t.toggle(function() {
              i(".btn-toggle", this).toggleClass("btn-hide");
            });
            t.removeAttr("style");
          }
        };
        equalheight = function(n) {
          var u = 0,
            f = 0,
            r = [],
            t;
          i(n).each(function() {
            if (
              ((t = i(this)),
              i(t).height("auto"),
              (topPostion = t.position().top),
              f != topPostion)
            ) {
              for (currentDiv = 0; currentDiv < r.length; currentDiv++)
                r[currentDiv].height(u);
              r.length = 0;
              f = topPostion;
              u = t.height();
              r.push(t);
            } else r.push(t), (u = u < t.height() ? t.height() : u);
            for (currentDiv = 0; currentDiv < r.length; currentDiv++)
              r[currentDiv].height(u);
          });
        };
        i(n).load(function() {
          equalheight(".thumbnailItem");
        });
        i(n).resize(function() {
          equalheight(".thumbnailItem");
        });
        i(".focus")
          .on("focus", function() {
            i(this)
              .siblings("label")
              .hide();
          })
          .on("blur", function() {
            i(this).val() == "" &&
              i(this)
                .siblings("label")
                .show();
          })
          .each(function() {
            i(this).val() != "" &&
              i(this)
                .siblings("label")
                .hide();
          });
        i(".focus")
          .prev("label")
          .on("click", function() {
            i(this)
              .siblings(".focus")
              .trigger("focus");
          });
        i('input[checked="checked"]').each(function() {
          i(this)
            .next("label")
            .addClass("active");
        });
        i('input[type="radio"] ~ label').on("click", function() {
          i(this)
            .siblings("label")
            .removeClass("active");
          i(this).addClass("active");
        });
        i(n).scroll(function() {
          posScroll = i(t).scrollTop();
          posScroll >= 2900
            ? i("#back-top").fadeIn()
            : i("#back-top").fadeOut();
        });
        i("#viewRegions").click(function() {
          i("#collapseRegions").slideToggle();
        });
        i(n).load(function() {
          if (!i("html").is(".lt-ie8")) {
            var n = i(".mosaic").masonry({
              itemSelector: ".row",
              columnWidth: 250,
              isAnimated: !0,
              layoutPriorities: { shelfOrder: 8e5 }
            });
            n.on("layoutComplete", function() {
              n.masonry("reloadItems");
            });
          }
        });
        a = i("article");
        i(".tab li a").on("click", function(n) {
          n.preventDefault ? n.preventDefault() : (n.returnValue = !1);
          var t = i(this).attr("href");
          a.hide();
          i("article" + t).fadeIn(500);
          i(".tab li a").removeClass("current");
          i(this).addClass("current");
        });
        h = i("#main-col").height();
        c = i("#col").height();
        h >= c ? i("#col").height(h) : i("#main-col").height(c);
      }
      this.host = null;
      var u = this;
      this.ChangeBackground = function(n) {
        r(n);
      };
      f();
      this.UpdateFavCount = function(t) {
        var r =
          Centris.Browser.getUrlParameter("debugAnonymousFavorite") == "true" &&
          !!n.location.host.match("tst");
        (n.loggedIn || (!n.loggedIn && (r || t))) &&
          i('[class*="favorites"] .labelCount').text("(" + t + ")");
      };
    };
  })(window, document, $, window.Centris);
$(document).ready(function() {
  initSocialShare();
});
(Centris.Property.PropertyService = new (function() {
  function u(n) {
    var t = n.getBoundingClientRect();
    t.bottom > window.innerHeight &&
      n.scrollIntoView({ behavior: "smooth", block: "end" });
    t.top < 0 && n.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function f(n) {
    var u = [],
      e;
    for (i in n) {
      var t = n[i],
        r = [],
        f = { ShapeType: t.type, Points: r };
      u.push(f);
      t.type == "rectangle"
        ? (r.push({
            Lat: t.bounds.getSouthWest().lat(),
            Lng: t.bounds.getSouthWest().lng()
          }),
          r.push({
            Lat: t.bounds.getNorthEast().lat(),
            Lng: t.bounds.getNorthEast().lng()
          }))
        : t.type == "circle"
        ? ((f.Radius = t.radius),
          r.push({ Lat: t.center.lat(), Lng: t.center.lng() }))
        : t.type == "polygon" &&
          ((e = t.getPath()),
          e.forEach(function(n) {
            r.push({ Lat: n.lat(), Lng: n.lng() });
          }));
    }
    return u;
  }
  var t = window.debug || new Centris.Debuger(),
    n = Centris.fn,
    r = {};
  this.reset = function() {
    r = {};
  };
  this.saveMapState = function(i, r, u, f) {
    var e =
      "{'mapState':{'ZoomLevel':'" +
      i +
      "','Center':{'Lat':'" +
      r +
      "','Lng':'" +
      u +
      "'}}}";
    n.wsSend(
      "/Property/PropertyWebService.asmx/SaveMapState",
      e,
      function(n) {
        t.write(
          "PropertyService.SaveMapState<br /> Succeeded:[" + n.d.Succeeded + "]"
        );
        f(n.d.Succeeded);
      },
      function() {
        t.error("PropertyService.SaveMapState [error]");
      }
    );
  };
  this.updateDisplayOutsideGeographyProperties = function(t, i) {
    var r = "{'display':'" + t + "'}";
    n.wsSend(
      "/Property/PropertyWebService.asmx/UpdateDisplayOutsideGeographyProperties",
      r,
      function(n) {
        i(n.d.Result);
      },
      function() {}
    );
  };
  this.startGeographyShapesEdition = function(t) {
    n.wsSend(
      "/Property/PropertyWebService.asmx/StartGeographyShapesEdition",
      "{}",
      function(n) {
        t(n.d.Result);
      },
      function() {}
    );
  };
  this.endGeographyShapesEdition = function(i, r) {
    n.wsSend(
      "/Property/PropertyWebService.asmx/EndGeographyShapesEdition",
      "{}",
      function(u) {
        i(u.d.Result, r);
        n.wsSend(
          "/Property/PropertyWebService.asmx/IsSearchSavable",
          null,
          function(n) {
            t.write(
              "PropertyService.IsSearchSavable<br /> Succeeded:[" +
                n.d.Succeeded +
                "]"
            );
            n.d.Result
              ? ($("#save-search").removeClass("disabled"),
                $("#currentSavedSearchName")[0].innerText.substring(0, 1) !=
                  "*" &&
                  ($("#currentSavedSearchName")[0].innerText =
                    "*" + $("#currentSavedSearchName")[0].innerText))
              : ($("#save-search").addClass("disabled"),
                $("#currentSavedSearchName")[0].innerText.substring(0, 1) ==
                  "*" &&
                  ($("#currentSavedSearchName")[0].innerText = $(
                    "#currentSavedSearchName"
                  )[0].innerText.substring(1)));
          },
          function() {
            t.error("PropertyService.IsSearchSavable [error]");
          }
        );
      },
      function() {}
    );
  };
  this.cancelGeographyShapesEdition = function(t) {
    n.wsSend(
      "/Property/PropertyWebService.asmx/CancelGeographyShapesEdition",
      "{}",
      function(n) {
        t(n.d.Result);
      },
      function() {}
    );
  };
  this.updateOverlayShapes = function(t, i) {
    var r = $.stringify({ shapeViews: f(t) });
    n.wsSend("/Property/PropertyWebService.asmx/UpdateGeographyShapes", r, i);
  };
  this.getSearchCriteriaInfos = function(t, i) {
    n.wsSend(
      "/Property/PropertyWebService.asmx/GetSearchCriteriaInfos",
      "{}",
      function(n) {
        t(n.d.Result, i);
      },
      function() {}
    );
  };
  this.getInscriptionMode = function(n) {
    Centris.fn.wsSend(
      "/Property/PropertyWebService.asmx/GetInscriptionMode",
      null,
      function(t) {
        n(t.d.Result);
      }
    );
  };
  this.tryToggleFavorite = function(n, t, i, r) {
    $(".redirectTooltip")
      .parent()
      .empty();
    var f = $("#isAnonymous").val(),
      e =
        Centris.Browser.getUrlParameter("debugAnonymousFavorite") &&
        !!window.location.host.match("tst");
    if (i) {
      if (window.loggedIn || f == "False" || e)
        return Centris.Property.PropertyService.toggleFavorite(n, t, r);
      n.append($("#redirectTooltip").html())
        .find(".icon-close")
        .on("click", function(n) {
          n.stopPropagation();
          $(".icon-fav").empty();
        });
      u($(".redirectTooltip")[0]);
    } else return Centris.Property.PropertyService.toggleFavorite(n, t, r);
  };
  this.toggleFavorite = function(n, t, i) {
    $(n).addClass("hoverClick");
    $(n).hover(null, function() {
      $(n).removeClass("hoverClick");
    });
    var r = n.hasClass("actif");
    return (
      r
        ? this.removePropertyFromFavorites(t, function(t) {
            if (!t.Succeeded) {
              n.removeClass("actif");
              Centris.Dialog.alert(t.Result);
              return;
            }
            var r = t.Result;
            n.removeClass("actif");
            n.attr("title", n.attr("title-off"));
            typeof ps != "undefined" && ps.UpdateFavCount(r.FavoriteCount);
            r.FavoriteCount == 0 &&
              ($(".favorites").removeClass("active"),
              $(".labelCount").addClass("hidden"),
              $(".m-fav-link").addClass("link-disabled"));
            pMap && (pMap.closeInfoWindow(), pMap.redraw());
            Centris.Property.PropertyService.getInscriptionMode(function(n) {
              n == "Favorites" && i && i();
            });
          })
        : ($(n).addClass("hoverClick"),
          this.addPropertyToFavorites(t, function(t) {
            if (t.Succeeded)
              n.addClass("actif"),
                n.attr("title", n.attr("title-on")),
                $(".favorites").addClass("active"),
                $(".labelCount").removeClass("hidden"),
                $(".m-fav-link").removeClass("link-disabled"),
                typeof ps != "undefined" &&
                  ps.UpdateFavCount(t.Result.FavoriteCount);
            else {
              n.removeClass("actif");
              Centris.Dialog.alert(t.Result);
              return;
            }
          })),
      !1
    );
  };
  this.addPropertyToFavorites = function(n, t) {
    Centris.fn.wsSend(
      "/Property/PropertyWebService.asmx/AddPropertyToFavorites",
      "{'mlsNumber':'" + n + "'}",
      function(n) {
        t(n.d);
      },
      function() {}
    );
  };
  this.removePropertyFromFavorites = function(n, t) {
    Centris.fn.wsSend(
      "/Property/PropertyWebService.asmx/RemovePropertyFromFavorites",
      "{'mlsNumber':'" + n + "'}",
      function(n) {
        t(n.d);
      },
      function() {}
    );
  };
})()),
  (function(n, t, i) {
    i.Property.TrackingService = new (function() {
      var n = Centris.fn;
      this.trackProprietePartage = function(t, i) {
        var r = $.stringify({ mlsNumber: t, type: i });
        n.wsSend("/Property/TrackingService.asmx/TrackProprietePartage", r);
      };
      this.trackProprieteAffichage = function(t, i) {
        var r = $.stringify({ mlsNumber: t, type: i });
        n.wsSend("/Property/TrackingService.asmx/TrackProprieteAffichage", r);
      };
    })();
  })(window, document, Centris),
  (function(n, t, i) {
    i.Pages.Property = function(n) {
      var i = null;
      n &&
        ((this.itemsCount = n.itemsCount || 0),
        (this.pageIndex = n.pageIndex || 0),
        (this.pageSize = n.pageSize || 1),
        (this.currentTab = n.currentTab || ""),
        (this.currentView = n.currentView || ""),
        (this.currentSort = n.currentSort || ""),
        (this.displayNoResultMsg = n.displayNoResultMsg));
      this.setMap = function(n) {
        i = n;
      };
      this.getMap = function() {
        return i;
      };
      this.updatePropertyCount = function(n) {
        t("#resultCount")[0].innerHTML = n;
      };
      this.onAfterUpdateUI = function() {
        typeof options != "undefined" &&
          options.afterUpdateUI === "function" &&
          options.afterUpdateUI();
      };
      this.callToggleFavorite = function(n, i) {
        return typeof result != "undefined"
          ? Centris.Property.PropertyService.toggleFavorite(
              t(n),
              i,
              result.getInscriptions
            )
          : Centris.Property.PropertyService.toggleFavorite(t(n), i);
      };
    };
  })(window, $, window.Centris),
  (function(n, t) {
    function i() {
      var u = n(".results-nb").outerWidth(!0),
        i = n("#save-search").outerWidth(!0),
        r = n("#modify-criterias").outerWidth(!0),
        t = n("#local-search").outerWidth(!0),
        f = n("#upperFilterContainer").width(),
        e = r + i,
        o = t > 0 ? r + i + t : r + i + u,
        s = r + i + t + u;
      u > 0 &&
        i > 0 &&
        r > 0 &&
        (f > e
          ? (n("#modify-criterias").css("border-right-width", "1px"),
            f > o
              ? (n("#modify-criterias").css("margin-bottom", ""),
                n("#save-search").css("margin-bottom", ""),
                n("#save-search").css("border-right-width", "1px"),
                t > 0 && f > s
                  ? n("#local-search").css("border-right-width", "1px")
                  : n("#local-search").css("border-right-width", "0"))
              : (n("#modify-criterias").css("margin-bottom", "0"),
                n("#save-search").css("border-right-width", "0"),
                t > 0 &&
                  (n("#save-search").css("margin-bottom", "0"),
                  n("#local-search").css("border-right-width", "0"))))
          : (n("#modify-criterias").css("margin-bottom", "0"),
            n("#modify-criterias").css("border-right-width", "0"),
            n("#save-search").css("border-right-width", "0"),
            t > 0 &&
              (n("#save-search").css("margin-bottom", "0"),
              n("#local-search").css("border-right-width", "0"))));
    }
    t.Centris.PropertySearchForm = function(i) {
      function k() {
        p();
        f = !1;
      }
      function d() {
        var t = { queryView: s() };
        console.log("onValueChanged | queryView sent");
        console.log(t);
        Centris.fn.wsSend(
          "/mvc/property/UpdateSearchPanel",
          n.stringify(t),
          function(t) {
            t.d ? ft(t.d.Result) : n("#property-search-form").unblock();
          }
        );
      }
      function r() {
        f ||
          (n("#property-search-form").block({
            message:
              '<img src="' +
              t.ConsumerSite.tenantImagesUrl +
              'master/loader.gif" alt="Searching..." />',
            centerY: 0,
            centerX: 0,
            css: {
              position: "absolute",
              top: "50%",
              left: "50%",
              backgroundColor: "rgba(0, 0, 0, 0)",
              border: "0",
              color: "#fff"
            }
          }),
          d());
      }
      function a() {
        console.log("bindEvents starting...");
        n(".link-more-below").click(function() {
          n("#container-advanced-criterias").toggle();
          c = n("#container-advanced-criterias").is(":visible");
          n(this).toggleClass("up");
        });
        n("#cancelSearchButton").click(function() {
          location.href.toLowerCase().indexOf("opensearchpanel=true") != -1
            ? (t.location = location.href.replace(/&OpenSearchPanel=true/i, ""))
            : location.reload();
          t.scrollTo(0, 0);
        });
        initControlSelect(n(".control-select"));
        n("[data-type='Dropdown']")
          .change(function() {
            u == n(this).attr("id") && (u = null);
            r();
          })
          .on("mousedown", function() {
            u = n(this).attr("id");
          })
          .focus(function() {
            n(".selectarea", this).click();
          });
        n("div[data-type='ToggleButtons'] button").click(function() {
          n(this).hasClass("active") ||
            (n(this)
              .siblings()
              .removeClass("active"),
            n(this).addClass("active"),
            r());
        });
        n("div[data-type='RadioButtons'] button").click(function() {
          n(this).toggleClass("active");
          n(this)
            .siblings()
            .removeClass("active");
          r();
        });
        n("div[data-type='Checkboxes'] button").click(function() {
          n(this).toggleClass("active");
          r();
        });
        n("#search-block input")
          .on("mousedown", function() {
            u = n(this).attr("id");
            n("label[for=" + n(this).attr("id") + "]").hide();
          })
          .focus(function() {
            n("label[for=" + n(this).attr("id") + "]").hide();
          })
          .blur(function() {
            u == n(this).attr("id") && (u = null);
            n(this).val()
              ? n("label[for=" + n(this).attr("id") + "]").hide()
              : n("label[for=" + n(this).attr("id") + "]").show();
          });
        e.length > 0 &&
          e.forEach(function(t) {
            n("#" + t).show();
            n("#" + t)
              .parent("fieldset")
              .find(".btn-toggle")
              .toggleClass("btn-hide");
          });
        n(".btn-toggle").on("click", function() {
          var t = n(this)
              .parent("legend")
              .parent("fieldset")
              .find(".container-fieldset"),
            i = t.attr("id"),
            r = e.indexOf(i),
            u;
          r > -1 ? e.splice(r, 1) : e.push(i);
          u = n(this);
          t.toggle(function() {
            u.toggleClass("btn-hide");
          });
        });
        n("div[data-type='Range']").each(function() {
          var t = n(this).attr("id"),
            i = "#" + t + "-min",
            f = "#" + t + "-max";
          n(i)
            .keypress(function(n) {
              return Centris.Parse.isNumberKeyPress(n);
            })
            .blur(function() {
              w(n(i), n(f), o.messageInvalidRange, this) && r();
            });
          n(f)
            .keypress(function(n) {
              return Centris.Parse.isNumberKeyPress(n);
            })
            .blur(function() {
              w(n(i), n(f), o.messageInvalidRange, this) && r();
            });
          n("#" + t + "-unit")
            .change(function() {
              u == t + "-unit" && (u = null);
              r();
            })
            .on("mousedown", function() {
              u = t + "-unit";
            })
            .focus(function() {
              n(".selectarea", this).click();
            });
        });
        n("div[data-type='Date']").each(function() {
          var t = "#" + n(this).attr("id") + "-dateFilterPicker";
          n("i", this).click(function() {
            n(t)
              .datepicker()
              .datepicker("show");
          });
          n(t).datepicker({
            dateFormat: "yy/mm/dd",
            maxDate: 0,
            onClose: function() {
              r();
              n("label[for=" + n(this).attr("id") + "]").hide();
            }
          });
        });
        n("div[data-type='AutocompleteDropdowns']").each(function() {
          var t = n(this).attr("id");
          n("i", this).click(function() {
            n("#" + t + "-autocomplete").focus();
          });
          n("#" + t + "-filters li a").click(function() {
            n(this)
              .parent()
              .hide();
            r();
          });
          n("#" + t + "-autocomplete")
            .focus(function() {
              n(this).autocomplete("search", n(this).val());
            })
            .autocomplete({
              minLength: 0,
              source: function(i, r) {
                if (i.term.length >= 0) {
                  var u = { text: i.term, fieldId: t, fieldValues: nt(t) };
                  Centris.fn.wsSend(
                    "/property/PropertyWebService.asmx/GetAutoCompleteData",
                    n.stringify(u),
                    function(t) {
                      var i = [];
                      n.each(t.d.Result, function(n, t) {
                        i.push({
                          label: t.Label,
                          value: t.Value,
                          match: t.Matches,
                          type: t.Type,
                          Id: t.TypeId
                        });
                      });
                      r(i);
                    }
                  );
                }
              },
              select: function(i, u) {
                return (
                  (this.value = ""),
                  n(this).blur(),
                  n(
                    "#" +
                      t +
                      "-filters ul li[data-field-id='" +
                      t +
                      "'][data-field-value-id='" +
                      u.item.Id +
                      "']"
                  ).show(),
                  r(),
                  !1
                );
              }
            })
            .data("ui-autocomplete")._renderItem = function(t, i) {
            var f = "",
              e = 0,
              r,
              u = 0,
              o,
              s;
            for (
              i.match.sort(function(n, t) {
                return n.Index < t.Index ? -1 : 1;
              }),
                o = 0;
              o < i.match.length;
              o++
            )
              (s = i.match[o]),
                (r = s.Index),
                (u = r + s.Len),
                r > e && (f += i.label.substr(e, r - e)),
                (f +=
                  "<span style='font-weight:bold;color:Blue;'>" +
                  i.label.substr(r, s.Len) +
                  "</span>"),
                (e = u);
            return (
              u < i.label.length &&
                (f += i.label.substr(u, i.label.length - u)),
              n("<li>")
                .data("item.autocomplete", i)
                .append("<a>" + f + "</a>")
                .appendTo(t)
            );
          };
        });
        n("div[data-type='Slider']").each(function() {
          var i = n(this).attr("id"),
            u = g(i),
            t = [];
          n("#" + i + "-slider-values price.active").each(function() {
            t.push(u.indexOf(n(this).data("field-value-id")));
          });
          t.length < 2 && (t = [0, u.length - 1]);
          n("#" + i + "-slider").slider({
            range: !0,
            min: 0,
            max: u.length - 1,
            values: [t[0], t[1]],
            create: function() {
              v(i, t[0], t[1], u);
            },
            slide: function(n, t) {
              v(i, t.values[0], t.values[1], u);
            },
            stop: function() {
              r();
            }
          });
        });
        n("#search").length &&
          (n("#search")
            .autocomplete({
              autoFocus: !0,
              minLength: 0,
              delay: 800,
              source: function(i, r) {
                if (i.term.length >= 3) {
                  var u = {
                    text: i.term,
                    language: t.Centris.Master.Languages
                  };
                  Centris.fn.wsSend(
                    "/Property/PropertyWebService.asmx/GetSearchAutoCompleteData",
                    n.stringify(u),
                    function(t) {
                      var i = [];
                      n.each(t.d.Result, function(n, t) {
                        i.push({
                          label: t.Label,
                          value: t.Value,
                          match: t.Matches,
                          type: t.Type,
                          Id: t.TypeId
                        });
                      });
                      r(i);
                    }
                  );
                } else
                  n(".ui-autocomplete").hide(), n("noresult-message").hide();
              },
              open: function() {
                n(".ui-menu").scrollTop(0);
              },
              close: function() {
                n(":focus").attr("id") != n(this).attr("id") &&
                  (n(this)
                    .autocomplete()
                    .val(""),
                  n("label[for=" + n(this).attr("id") + "]").show());
              },
              select: function(n, t) {
                return t.item.type == null
                  ? !1
                  : (it(t.item, !0), (this.value = ""), !1);
              }
            })
            .data("ui-autocomplete")._renderItem = function(t, i) {
            var f = "",
              e = 0,
              r,
              u = 0,
              o,
              s;
            for (
              i.match.sort(function(n, t) {
                return n.Index < t.Index ? -1 : 1;
              }),
                o = 0;
              o < i.match.length;
              o++
            )
              (s = i.match[o]),
                (r = s.Index),
                (u = r + s.Len),
                r > e && (f += i.label.substr(e, r - e)),
                (f +=
                  "<span style='font-weight:bold;color:Blue;'>" +
                  i.label.substr(r, s.Len) +
                  "</span>"),
                (e = u);
            return (
              u < i.label.length &&
                (f += i.label.substr(u, i.label.length - u)),
              n("<li>")
                .data("item.autocomplete", i)
                .append("<a>" + f + "</a>")
                .appendTo(t)
            );
          });
        n("#freeform-filters li a").click(function() {
          n(this)
            .parent()
            .remove();
          r();
        });
        n(".btn-search").click(function(n) {
          console.log("Search Clicked!");
          n.preventDefault ? n.preventDefault() : (n.returnValue = !1);
          Centris.ContextManager.close();
          h(!0);
        });
        n("#firstRowFilter").on("click", "li a", ot);
        n("#querySearchSaveButton").click(function() {
          et(this);
        });
        console.log("bindEvents finished.");
      }
      function g(t) {
        var i = [];
        return (
          n("#" + t + "-slider-values price").each(function() {
            i.push(n(this).data("field-value-id"));
          }),
          i
        );
      }
      function nt(t) {
        var i = [];
        return (
          n("#" + t + "-filters li").each(function() {
            i.push({
              Id: n(this).data("field-value-id"),
              Value: n(this).text()
            });
          }),
          i
        );
      }
      function v(t, i, r, u) {
        n("price.active").removeClass("active");
        n(
          "price[data-field-id='" + t + "'][data-field-value-id='" + u[i] + "']"
        ).addClass("active");
        n(
          "price[data-field-id='" + t + "'][data-field-value-id='" + u[r] + "']"
        ).addClass("active");
        n("#" + t + "-slider-min").html(
          n(
            "price[data-field-id='" +
              t +
              "'][data-field-value-id='" +
              u[i] +
              "']"
          ).text()
        );
        n("#" + t + "-slider-max").html(
          n(
            "price[data-field-id='" +
              t +
              "'][data-field-value-id='" +
              u[r] +
              "']"
          ).text()
        );
        n("#" + t + "-slider").slider("values", 0, i);
        n("#" + t + "-slider").slider("values", 1, r);
        tt(t, i, r);
      }
      function tt(t, i, r) {
        var e, u, o, f, s, c, h;
        i == r
          ? n("#" + t + "-slider .ui-slider-handle")
              .first()
              .hasClass("ui-state-active")
            ? (n("#" + t + "-slider-min").hide(),
              n("#" + t + "-slider-max").show())
            : (n("#" + t + "-slider-min").show(),
              n("#" + t + "-slider-max").hide())
          : (n("#" + t + "-slider-min").show(),
            n("#" + t + "-slider-max").show());
        e =
          n("#" + t + "-slider").offset().left +
          n("#" + t + "-slider").width() -
          n("#" + t + "-slider-max").width();
        u =
          n("#" + t + "-slider .ui-slider-handle")
            .last()
            .offset().left + 10;
        u = u > e ? e : u;
        o = n("#" + t + "-slider").offset().left;
        f =
          n("#" + t + "-slider .ui-slider-handle")
            .first()
            .offset().left -
          n("#" + t + "-slider-min").width() +
          10;
        f = f < o ? o : f;
        s = u - n("#" + t + "-slider-min").width();
        c = f > s && f != o;
        f = c ? s : f;
        h = f + n("#" + t + "-slider-min").width();
        u = u < h && u != e ? h : u;
        n("#" + t + "-slider-min").offset({
          top: n("#" + t + "-slider-min").offset().top,
          left: f
        });
        n("#" + t + "-slider-max").offset({
          top: n("#" + t + "-slider-max").offset().top,
          left: u
        });
      }
      function it(t, i) {
        var u = t.type,
          f,
          e;
        u != null &&
          (u == "Listing" && rt(),
          (f = t.Id),
          (e = t.value),
          n("#freeform-filters li[data-matchtype='4']").remove(),
          n("#firstRowFilter li[data-searchfilterid='chkMap_Drawing']").attr(
            "data-active",
            "false"
          ),
          y(e, u, f),
          i && (u == "Listing" ? h() : r()));
      }
      function rt() {
        f = !0;
        n("#freeform-filters li").remove();
        n("#item-property .btn-form-choice").removeClass("active");
        r();
        f = !1;
      }
      function y(t, i, u) {
        ut(n("#freeform-filters li"), t) ||
          (n("#freeform-filters ul").append(
            "<li data-matchtype='" +
              i +
              "' data-matchid='" +
              u +
              "'><a>" +
              t +
              "</a></li>"
          ),
          n("#freeform-filters li a").unbind("click"),
          n("#freeform-filters li a").click(function() {
            n(this)
              .parent()
              .remove();
            r();
          }));
      }
      function ut(t, i) {
        var r = !1;
        return (
          n.each(t, function() {
            var t = n(this).text();
            t === i && (r = !0);
          }),
          r
        );
      }
      function p() {
        l && n("#search-block").show();
        c
          ? (b &&
              (n(".link-more-below").toggleClass("up"),
              n("#btn-advanced-criterias").show()),
            n("#search-form-bottom-actions .btn-cancel").show())
          : (n("#container-advanced-criterias").hide(),
            n("#btn-advanced-criterias").show());
        a();
      }
      function ft(t) {
        console.log("updateSearchFormVisibilities started...");
        f = !0;
        var i = n("#property-search-form");
        i.html(t.SearchForm);
        p();
        i.unblock();
        u && (n("#" + u).focus(), (u = null));
        f = !1;
        console.log("updateSearchFormVisibilities finished.");
      }
      function et() {
        var t = n("#querySearchSaveName").val(),
          i;
        typeof t == "undefined" && (t = null);
        i = { queryView: s(), name: t };
        t != null &&
          Centris.fn.wsSend(
            "/property/PropertyWebService.asmx/SaveQueryStringForUnitTesting",
            n.stringify(i),
            function() {
              alert("Sauvegarde réussi");
            }
          );
      }
      function h(t) {
        function i() {
          var t = { queryView: s(), isHomePage: IsHomePage() };
          Centris.fn.wsSend(
            "/mvc/property/UpdateQuery",
            n.stringify(t),
            function(n) {
              var t = n.d.Result;
              n.d.Succeeded && Centris.ContextManager.navigate(t, !1);
            }
          );
        }
        if (
          (Centris.propertySearchForm &&
            (Centris.propertySearchForm.SearchClickOnGoing = !0),
          t)
        ) {
          var r = n("#property-count").attr("data-propertycount");
          if (r == 0) {
            Centris.Dialog.alert(o.messageNoResults);
            return;
          }
        }
        i();
      }
      function ot() {
        f = !0;
        var t = n(this)
            .parent()
            .attr("data-searchfilterid"),
          r = n(this)
            .parent()
            .attr("data-searchfiltervalue"),
          i = n(this)
            .parent()
            .attr("data-type"),
          u = n(this)
            .parent()
            .attr("data-resetvalue");
        t == "chkMap_Drawing"
          ? (Centris.Property.PropertyService.updateOverlayShapes([], function(
              n
            ) {
              var t = n.d.Result;
              Centris.ContextManager.navigate(t, !1);
            }),
            (f = !1))
          : n.ajax({
              url: "/mvc/property/PropertySearchForm",
              success: function(e) {
                n("#property-search-form").html(e);
                a();
                i === "Checkboxes" || i === "Dropdown" || i === "RadioButtons"
                  ? n(
                      "[data-field-id='" +
                        t +
                        "'][data-field-value-id='" +
                        r +
                        "']"
                    ).toggleClass("active")
                  : i === "AutocompleteDropdowns"
                  ? n(
                      "#" +
                        t +
                        "-filters li[data-field-id='" +
                        t +
                        "'][data-field-value-id='" +
                        r +
                        "'] a"
                    ).click()
                  : i === "Range"
                  ? n("#" + t + "-" + r).val("")
                  : i === "Date"
                  ? n("#" + t + "-dateFilterPicker")
                      .datepicker()
                      .val("")
                  : i === "Slider"
                  ? (n(
                      "[data-field-id='" +
                        t +
                        "'][data-field-value-id='" +
                        r +
                        "']"
                    ).toggleClass("active"),
                    n(
                      "[data-field-id='" +
                        t +
                        "'][data-field-value-id='" +
                        u +
                        "']"
                    ).toggleClass("active"))
                  : i === "Undefined" &&
                    n(
                      "#freeform-filters li[data-matchtype='" +
                        t +
                        "'][data-matchid='" +
                        r +
                        "'] a"
                    ).click();
                h();
                f = !1;
              },
              cache: !1
            });
      }
      function w(n, t, i, r) {
        return st(n.val(), t.val(), i, r);
      }
      function st(n, t, i, r) {
        return parseInt(n) > parseInt(t)
          ? (Centris.Dialog.alert(i, r), !1)
          : !0;
      }
      function ht(t) {
        n("#freeform-filters li").remove();
        t
          ? (n("#firstRowFilter li[data-type='Undefined']").remove(),
            n(
              "#firstRowFilter li[data-searchfilterid='freeFormText']"
            ).remove(),
            y(o.textGeographyShapes, 4, ""),
            n(
              "#firstRowFilter li[data-searchfilterid='chkMap_Drawing']"
            ).show(),
            n("#firstRowFilter li[data-searchfilterid='chkMap_Drawing']").attr(
              "data-active",
              "true"
            ),
            n(
              "#firstRowFilter li[data-searchfilterid='courtier-code']"
            ).remove())
          : (n(
              "#firstRowFilter li[data-searchfilterid='chkMap_Drawing']"
            ).hide(),
            n("#firstRowFilter li[data-searchfilterid='chkMap_Drawing']").attr(
              "data-active",
              "false"
            ));
      }
      function s() {
        var t = {};
        return (
          (t.Filters = []),
          (t.FieldsValues = []),
          n("#freeform-filters li").each(function() {
            var u = n(this).find("a"),
              i,
              r;
            u != null &&
              ((i = n(this).attr("data-matchtype")),
              (r = n(this).attr("data-matchid")),
              i == "4"
                ? (t.UseGeographyShapes = !0)
                : (t.Filters.push({ MatchType: i, Text: u.text(), Id: r }),
                  i != "Listing" &&
                    t.FieldsValues.push({ fieldId: i, value: r })));
          }),
          n("[data-type='Checkboxes'] button.active").each(function() {
            var i = n(this).data("field-id"),
              r = n(this).data("field-value-id");
            t.FieldsValues.push({ fieldId: i, value: r });
          }),
          n("[data-type='RadioButtons'] button.active").each(function() {
            var i = n(this).data("field-id"),
              r = n(this).data("field-value-id");
            t.FieldsValues.push({ fieldId: i, value: r });
          }),
          n("[data-type='Dropdown'] li.option.active").each(function() {
            var r = n(this).data("field-id"),
              i = n(this).data("field-value-id");
            i && i != "" && t.FieldsValues.push({ fieldId: r, value: i });
          }),
          n("[data-type='ToggleButtons'] button.active").each(function() {
            var i = n(this).data("field-id"),
              r = n(this).data("field-value-id");
            t.FieldsValues.push({ fieldId: i, value: r });
          }),
          n("[data-type='Range']").each(function() {
            var i = n(this).attr("id"),
              r = n("#" + i + "-min", this).val(),
              u = n("#" + i + "-max", this).val(),
              f;
            (r || u) &&
              (r || (r = "0"),
              u || (u = "999999999999"),
              t.FieldsValues.push({ fieldId: i, value: r }),
              t.FieldsValues.push({ fieldId: i, value: u }));
            f = !1;
            n("#" + i + "-unit li.option.active", this).each(function() {
              f = !0;
              var r = n(this).data("field-value-id");
              t.FieldsValues.push({ fieldId: i, value: r });
            });
            f ||
              n("#" + i + "-unit li.option", this)
                .first()
                .each(function() {
                  f = !0;
                  var r = n(this).data("field-value-id");
                  t.FieldsValues.push({ fieldId: i, value: r });
                });
          }),
          n("[data-type='Date']").each(function() {
            var i = n(this).attr("id"),
              r = n("#" + i + "-dateFilterPicker")
                .datepicker()
                .val();
            r && t.FieldsValues.push({ fieldId: i, value: r });
          }),
          n("[data-type='AutocompleteDropdowns']").each(function() {
            var i = n(this).attr("id");
            n("#" + i + "-filters li", this).each(function() {
              if (n(this).css("display") != "none") {
                var r = n(this).data("field-value-id");
                t.FieldsValues.push({ fieldId: i, value: r });
              }
            });
          }),
          n("[data-type='Slider'] price.active").each(function() {
            var i = n(this).data("field-id"),
              r = n(this).data("field-value-id");
            t.FieldsValues.push({ fieldId: i, value: r });
          }),
          t
        );
      }
      var o = i,
        f = !0,
        u = null,
        c = i.showAdvancedCriterias,
        b = i.showAdvancedCriteriaLabel,
        l = i.showSearchBlock,
        e = [];
      this.UpdateVisibility = function() {
        r();
      };
      this.setUseGeography = function(n) {
        ht(n);
      };
      this.getInscriptionQuery = function() {
        return s();
      };
      this.showSearchBlock = function() {
        l = !0;
      };
      k();
    };
    t.Centris.PropertySaveSearchForm = function() {
      function o() {
        u.hide();
        e.hide();
        f.hide();
      }
      function c() {
        var i = n.grep(r.children(), function(i) {
          return n(i).text() === t.val();
        });
        return i.length > 0;
      }
      function l() {
        var n = JSON.stringify({ name: t.val() });
        h.show();
        Centris.fn.wsSend("/Mvc/Account/SaveSearch/", n, p, w);
      }
      function p(i) {
        if ((h.hide(), u.hide(), f.hide(), e.hide(), i.IsError))
          i.Message != null && i.Message != ""
            ? Centris.Dialog.alert(i.Message)
            : e.show();
        else {
          f.show();
          c() || r.append("<li>" + t.val() + "</li>");
          n("#save-search").addClass("disabled");
          y.text(t.val() + " - ");
          n(r.children("li")).removeClass("selected");
          var o = n(r.children("li:contains('" + t.val() + "')")).index();
          n(r.children("li")[o]).addClass("selected");
          n(".saveSearchList").scrollTop(n(".saveSearchList").height());
        }
      }
      function w(n) {
        console.log("Error: ", n);
      }
      var i = n("#saveSearchPopup"),
        r = i.find(".saveSearchList"),
        t = i.find("#saveSearchName"),
        u = i.find(".saveErrorMessage"),
        f = i.find(".saveSuccessMessage"),
        s = i.find(".close"),
        a = i.find(".cancelSearchButton"),
        v = i.find(".saveSearchButton"),
        y = n("#currentSavedSearchName"),
        h = n(".spinner"),
        e = n(".requiredMessage");
      r.on("click", "li", function(i) {
        var u = n(i.currentTarget);
        r.children("li").each(function(t, i) {
          var r = n(i);
          r.is(u) ? r.addClass("selected") : r.removeClass("selected");
        });
        t.val(u.text());
      });
      t.on("change keydown", function(n) {
        o();
        (n.key === '"' || n.key === "'" || n.key === "\\") &&
          n.preventDefault();
      });
      a.click(function() {
        s.trigger("click");
      });
      s.click(function() {
        var n = r.find(".currentSearch");
        t.val(n.length > 0 ? n.text() : "");
        o();
        n.length > 0 && n.trigger("click");
      });
      v.click(function() {
        var n = t.val() === r.find(".currentSearch").text();
        o();
        c() && !n
          ? u
              .show()
              .find(".searchName")
              .text(t.val())
          : l();
      });
      i.find("#saveYes").click(function() {
        l();
      });
      i.find("#saveNo").click(function() {
        u.hide();
        t.val("");
      });
    };
    n(t).on("load", i);
    n(t).on("resize", i);
  })(jQuery, window, document);
Centris.Property.PropertyMapService = function() {
  function r(n) {
    for (var f, r = [], u = 0, i; (i = n[u]); u++)
      (f = new t.LatLngBounds(
        new t.LatLng(i.SouthWest.Lat, i.SouthWest.Lng),
        new t.LatLng(i.NorthEast.Lat, i.NorthEast.Lng)
      )),
        r.push(f);
    return r;
  }
  function u(n, i, r) {
    function o(n) {
      var o = n.Key.X + "-" + n.Key.Y,
        u = null,
        e;
      r == "PAN" && (u = i.getExisting(o));
      u || (u = i.get());
      e = new t.LatLng(n.Position.Lat, n.Position.Lng);
      e.equals(u.getPosition()) || u.setPosition(e);
      u.resetColor(n.HasStrictQueryMatch ? "Blue" : "Gray");
      u.openInfoWindowOnCreation = n.ContainsSubject;
      u.openInfoWindowPageIndex = n.SubjectIndex;
      u.setDigitTitle(n.PointsCount);
      u.setKey(o);
      u.NoMls = n.NoMls;
      i.index(u);
      f.push(u);
    }
    for (var e, f = [], u = 0; u < n.length; u++) (e = n[u]), o(e);
    return f;
  }
  var t = window.google.maps,
    i = window.debug || new Centris.Debuger(),
    n = Centris.fn;
  this.getMarkerInfo = function(t, i, r, u, f, e) {
    var s = f.getSouthWest(),
      h = f.getNorthEast(),
      o = {
        pageIndex: u,
        zoomLevel: r,
        latitude: t,
        longitude: i,
        mapBounds: {
          NorthEast: { Lat: h.lat(), Lng: h.lng() },
          SouthWest: { Lat: s.lat(), Lng: s.lng() }
        }
      };
    o = $.stringify(o);
    n.wsSend(
      "/Mvc/Property/GetMarkerInfo",
      o,
      function(n) {
        e(n.d.Result);
      },
      function() {}
    );
  };
  this.getInitialConfiguration = function(t) {
    n.wsSend(
      "/Property/Map/PropertyMapService.asmx/GetInitialConfiguration",
      "{}",
      function(n) {
        t(n.d.Result);
      },
      function() {}
    );
  };
  this.getTiles = function(t, i, u, f) {
    var e =
      "{'zoomLevel':'" +
      u +
      "','mapBounds':{'NorthEast':{'Lat':'" +
      i.lat() +
      "','Lng':'" +
      i.lng() +
      "'}, 'SouthWest':{'Lat':'" +
      t.lat() +
      "','Lng':'" +
      t.lng() +
      "'}}}";
    n.wsSend(
      "/Property/Map/PropertyMapService.asmx/GetTiles",
      e,
      function(n) {
        f(r(n.d.Result));
      },
      function() {}
    );
  };
  this.getGeographyShapes = function(t) {
    n.wsSend(
      "/Property/Map/PropertyMapService.asmx/GetGeographyShapes",
      "{}",
      function(n) {
        t(n.d.Result);
      },
      function() {}
    );
  };
  this.getMarkers = function(t, r, f, e, o, s, h) {
    var c =
      "{'zoomLevel':'" +
      f +
      "','mapBounds':{'NorthEast':{'Lat':'" +
      r.lat() +
      "','Lng':'" +
      r.lng() +
      "'}, 'SouthWest':{'Lat':'" +
      t.lat() +
      "','Lng':'" +
      t.lng() +
      "'}}}";
    n.wsSend(
      "/Property/Map/PropertyMapService.asmx/GetMarkers",
      c,
      function(n) {
        function r() {
          pMap.ClearShapes();
        }
        if (h && h()) {
          i.write("PropertyMapService.getMarkers Canceled");
          return;
        }
        o != "PAN" && e.releaseAll();
        i.write(
          "PropertyMapService.getMarkers [" + n.d.Result.Markers.length + "]"
        );
        var t = u(n.d.Result.Markers, e, o);
        s(t);
        n.d.Result.ContainMatch ||
          Centris.Dialog.alert(Centris.Resources.UserMessage.NoResult, null, r);
      },
      function() {
        i.error("PropertyMapService.getMarkers [error]");
      }
    );
  };
};
jQuery(document).ready(function(n) {
  n("#slideshow").length > 0 &&
    n("#slideshow-container").cycle({
      fx: "fade",
      speed: "slow",
      timeout: 0,
      sync: !0,
      pager: "#slide-nav",
      next: "#slideshow-nav .next",
      prev: "#slideshow-nav .previous",
      after: function(t, i, r) {
        var u = r.currSlide + 1;
        n(this)
          .find(".bg-slide")
          .css(
            "background-image",
            "url('/home/images/slideshow/slide-" + u + ".jpg')"
          );
      }
    });
});
$(document).ready(function() {
  var n, t;
  $("#divCalc input").click(function() {
    $(this).select();
  });
  initAutoCompleteControl();
  n = $("#cityId").val();
  n &&
    ((t = $("#cityName").val()), $(".typeaheadCalculator").typeahead("val", t));
}),
  (function(n, t, i) {
    i.Property.WalkScoreService = new (function() {
      var n = Centris.fn;
      this.getWalkScore = function(t, i) {
        var r = {},
          u;
        r.Latitude = parseFloat(t.replace(",", "."));
        r.Longitude = parseFloat(i.replace(",", "."));
        u = { inscriptionGeography: r };
        n.wsSend(
          "/Property/PropertyWebService.asmx/GetWalkScore",
          $.stringify(u),
          function(n) {
            if (n.d.Succeeded) {
              var t = n.d.Result;
              $("#walkScoreValue").html(t);
              $("#walkScoreTitle").css("background-position", "");
            }
          }
        );
      };
    })();
  })(window, document, Centris);
(localLogicService = (function(n, t, i) {
  function r() {
    t.addEventListener("locallogic-widget-loaded", function() {
      n(".ll-content:parent").hide();
      n(".ll-content:parent").length === 1 &&
        (n("#localLogicDiv").show(),
        Centris.SendEventToGoogleTagManager("locallogic-data-present"));
    });
  }
  function u() {
    n(".header-localisation").hide();
    t.addEventListener("locallogic-widget-loaded", function() {
      n(".ll-content:parent").hide();
      n(".ll-content:parent").length === 1 &&
        (n("#tabLocation").show(),
        n("#localLogicDiv").show(),
        n(".ll-content:parent").show(),
        Centris.SendEventToGoogleTagManager(
          "community-locallogic-data-present"
        ));
    });
  }
  function f() {
    var t = n("#isLocalLogicComponentEnabled").val() === "true";
    if (t)
      try {
        e();
      } catch (i) {}
  }
  function e() {
    var n = i.createElement("script");
    n.setAttribute("src", t.LocalLogicUrl + "&callback=renderLocallogic");
    n.setAttribute("type", "text/javascript");
    n.setAttribute("async", "async");
    n.setAttribute("defer", "defer");
    i.getElementsByTagName("head")[0].appendChild(n);
  }
  return { Init: r, InitFromCommunity: u, ProcessLocalLogic: f };
})(jQuery, window, document)),
  (function(n, t, i) {
    t.Centris.Result = function(r) {
      function v() {
        n(".centrisSocioDemobutton").on("click", function() {
          var t = n(this).data("index");
          h(n("#municipalityId").text(), t);
          n(this)
            .siblings(".centrisSocioDemobutton")
            .removeClass("active");
          n(this).addClass("active");
        });
        n(".stat").hide();
        n(".centrisSocioDemobutton").removeClass("active");
        n("#btnGroupeAge").addClass("active");
        n("#divGroupeAge").show();
      }
      function o() {
        t.ConsumerSite.communityStatisticEnabled &&
          ((u = null),
          v(),
          n("#municipalityId").length !== 0 &&
            h(n("#municipalityId").text(), 0),
          n(".demography").addClass("active"),
          n(".demography").show(),
          n("#divStatistique").show());
      }
      function s(t) {
        var r, i, f;
        for (
          n(".titleChart").text(t.Title), r = [], i = 0;
          i < t.Slices.length;
          ++i
        )
          r.push({ source: t.Slices[i][0], percentage: t.Slices[i][1] });
        n("#divChart").empty();
        n("#divChart").kendoChart({
          legend: { visible: !1 },
          title: { visible: !1 },
          plotArea: { margin: { top: 0 } },
          chartArea: { height: 225, width: 225, background: "" },
          dataSource: { data: r },
          seriesDefaults: {
            type: t.Average == null ? "pie" : "donut",
            holeSize: 60
          },
          series: [
            {
              type: t.Average == null ? "pie" : "donut",
              field: "percentage",
              categoryField: "source",
              padding: 0
            }
          ],
          seriesColors: [
            "#70d2ed",
            "#e95f55",
            "#fdbf14",
            "#42c694",
            "#b894c4",
            "#5da3df",
            "#dd4477",
            "#66aa00",
            "#b82e2e",
            "#316395",
            "#994499",
            "#22aa99"
          ],
          tooltip: { visible: !1 }
        });
        var e =
            "<li><div style=' background-color: COLOR_CODE;'></div><span class='label'>LABEL</span><span class='value'>VALUE%</span></li>",
          u = "<ul>",
          o = [
            "#70d2ed",
            "#e95f55",
            "#fdbf14",
            "#42c694",
            "#b894c4",
            "#5da3df",
            "#dd4477",
            "#66aa00",
            "#b82e2e",
            "#316395",
            "#994499",
            "#22aa99"
          ];
        n.each(t.Slices, function(n, t) {
          var i = e;
          i = i.replace("COLOR_CODE", o[n]);
          i = i.replace("LABEL", t[0]);
          i = i.replace("VALUE", t[1]);
          u += i + "<br/>";
        });
        u += "</ul>";
        n(".socioDemoLabel").empty();
        n(".socioDemoLabel").append(u);
        t.Average != null &&
          ((f = "<div class='averageText'><p>" + t.Average + "</p></div>"),
          n("#divChart")
            .find(".averageText")
            .remove(),
          n("#divChart").prepend(f));
      }
      function y() {
        t.location = "/mvc/error/error500";
      }
      function h(t, i) {
        function e(t) {
          u = t.Result;
          t.Succeeded ? s(u[r]) : n("#message").html(t.Message);
        }
        var f = { regionId: "", munId: t },
          arguments = n.stringify(f),
          r = i;
        u != null && typeof u[r] != "undefined"
          ? s(u[r])
          : Centris.fn.wsSendWithRetry(
              "/mvc/more/GetDonneesSocioDemographic",
              arguments,
              e,
              y
            );
      }
      function c(u) {
        var h, s, c, v, y, d, p, b, k;
        t.PageMode === "Summary" &&
          Centris.SendEventToGoogleTagManager("viewsummary-enter");
        t.PageMode != "Map" &&
          n("#search-block").is(":visible") &&
          (n("#search-block").hide(),
          n("html, body").animate({ scrollTop: 0 }, 0, null, function() {
            location.reload();
          }));
        t.PageMode != "Map" &&
          (n("#divMainResult").empty(),
          n("#divMainResult").append(u.d.Result.html));
        t.PageMode == "Summary" &&
          ((i.title = u.d.Result.title),
          initSocialShare(),
          initCalculatricePagination(),
          e.InitCalculator(),
          localLogicService.ProcessLocalLogic(),
          (h = n(".templateSummaryItem .region-content .grid_2").height()),
          n(".templateSummaryItem .content-views").css("min-height", h),
          n("#wrapper-statistics").hide(),
          o(),
          (s = n("#SummaryUrl").text()),
          (c = n("#AlternateLanguageSummaryUrl").text()),
          n(".lang").attr("href", c),
          (v = {
            lat: n("#PropertyLat").text(),
            lng: n("#PropertyLng").text()
          }),
          a(v),
          typeof f != "undefined" &&
            ((y = f.getCurrentPage()),
            Centris.ContextManager.setAdressState(
              { url: s, page: y, goBack: !1 },
              "title",
              s
            ),
            (d = t.location.href)),
          n(".aOpenLeadGrabber").magnificPopup({
            type: "iframe",
            fixedContentPos: "auto",
            fixedBgPos: !0,
            callbacks: {
              open: function() {
                n("body").css("overflow", "hidden");
              },
              close: function() {
                n("body").css("overflow", "auto");
              }
            }
          }));
        p = n("#numberOfResults").text();
        t.InscriptionMode == "Favorites" &&
          typeof f != "undefined" &&
          parseInt(p) != u.d.Result.count &&
          (n("#numberOfResults").text(u.d.Result.count),
          n("#resultCount").text(u.d.Result.count),
          n("#numberOfResultToBeDisplayed").text(u.d.Result.inscNumberPerPage),
          n("#currentPage").text(1),
          l(),
          u.d.Result.count == 0
            ? (n("#noFavoriteMsg").removeClass("hidden"),
              n("#noFavoriteMsg")
                .parent()
                .parent()
                .addClass("site-padding"),
              n("#noFavoriteMsg")
                .closest(".wrapper-results")
                .removeClass("exception"))
            : n("#noFavoriteMsg").addClass("hidden"),
          n("#resultCount").text() == 1
            ? n("#resutCount-text").text(
                Centris.Resources.UserMessage.FavoriSingulier
              )
            : t.centrisLanguage == "fr" && n("#resultCount").text() == 0
            ? n("#resutCount-text").text(
                Centris.Resources.UserMessage.FavoriSingulier
              )
            : n("#resutCount-text").text(
                Centris.Resources.UserMessage.FavoriPluriel
              ));
        w(t.PageMode);
        b = n("#cityId").val();
        b &&
          ((k = n("#cityName").val()),
          n(".typeaheadCalculator").typeahead("val", k));
        n("#property-result").unblock();
        n("#resultContainer").unblock();
        r && r.reloadLocations();
      }
      function l() {
        var i;
        if (
          ((f = new Centris.Paginator({
            onClick: function(t) {
              n("#search-block").is(":visible") ||
                n(t)
                  .closest(".pagerDiv")
                  .attr("id") != "divPagerBottom" ||
                n("html, body").animate({ scrollTop: 0 }, 500);
              typeof closeSocialShareControl == "function" &&
                closeSocialShareControl();
            }
          })),
          (i = function(t) {
            var i = { startPosition: t };
            Centris.fn.wsSend(
              "/Mvc/Property/GetInscriptions",
              n.stringify(i),
              c
            );
          }),
          t.location
            .toString()
            .toLowerCase()
            .indexOf("view=map") == -1)
        ) {
          var u = n("#currentPage").text(),
            r = n("#numberOfResultToBeDisplayed").text(),
            e = n("#numberOfResults").text();
          parseInt(r) > 0
            ? (n(".pagerDiv").show(),
              f.Initialize(e, parseInt(r), parseInt(u) - 1, n(".pager"), i))
            : (n(".pagerDiv").hide(), n("#modify-criterias").show());
        }
      }
      function p(t, i) {
        i == google.maps.StreetViewStatus.OK
          ? n("[data-id=GoogleStreetViewUrl]").show()
          : (n("[data-id=GoogleStreetViewUrl]").show(),
            n("[data-id=GoogleStreetViewUrl]").addClass("disable"),
            n("[data-id=GoogleStreetViewUrl] a").removeAttr("onclick"),
            n("[data-id=GoogleStreetViewUrl] a").addClass("noPointer"));
      }
      function a(n) {
        var t = new google.maps.StreetViewService(),
          n = new google.maps.LatLng(n.lat, n.lng);
        t.getPanoramaByLocation(n, 50, p);
      }
      function w(t) {
        t !== "Summary" &&
          n("#ButtonViewSummary").attr(
            "href",
            n(".a-more-detail")
              .first()
              .attr("href")
          );
      }
      var e,
        u = null,
        f;
      this.Initialize = function() {
        l();
        t.PageMode === "Summary" &&
          (Centris.SendEventToGoogleTagManager("viewsummary-enter"),
          o(),
          localLogicService.Init(),
          localLogicService.ProcessLocalLogic(),
          typeof InitializeCalculator != "undefined" &&
            (e = InitializeCalculator(!0)));
      };
      this.getInscriptions = function() {
        n("#property-result").block({
          message:
            '<img src="' +
            t.ConsumerSite.tenantImagesUrl +
            'master/loader.gif" alt="Searching..." />',
          centerY: 0,
          centerX: 0,
          css: {
            position: "absolute",
            top: "50%",
            left: "50%",
            backgroundColor: "rgba(0, 0, 0, 0)",
            border: "0",
            color: "#fff"
          }
        });
        n("#resultContainer").block({
          message:
            '<img src="' +
            t.ConsumerSite.tenantImagesUrl +
            'master/loader.gif" alt="Searching..." />',
          centerY: 0,
          centerX: 0,
          css: {
            position: "absolute",
            top: "50%",
            left: "50%",
            backgroundColor: "rgba(0, 0, 0, 0)",
            border: "0",
            color: "#fff"
          }
        });
        Centris.fn.wsSend(
          "/mvc/property/GetInscriptions",
          n.stringify({ startPosition: 0 }),
          c
        );
      };
      f = new Centris.Paginator({
        onClick: function() {
          n("html, body").animate({ scrollTop: 0 }, 0);
        }
      });
      this.CheckStreetViewAvailability = function(n) {
        a(n);
      };
    };
  })(jQuery, window, document),
  (function(n, t, i) {
    function r() {
      var r = n("[data-id=Lat]")
          .text()
          .replace(",", "."),
        u = n("[data-id=Lng]")
          .text()
          .replace(",", "."),
        t = new google.maps.LatLng(parseFloat(r), parseFloat(u)),
        f = { zoom: 15, center: t },
        e = new google.maps.Map(i.getElementById("map-canvas"), f),
        o = new google.maps.Marker({ position: t, map: e });
    }
    function u() {
      var t = n("[data-id=Lat]")
          .text()
          .replace(",", "."),
        r = n("[data-id=Lng]")
          .text()
          .replace(",", "."),
        u = new google.maps.LatLng(parseFloat(t), parseFloat(r)),
        f = { position: u, pov: { heading: 165, pitch: 0 }, zoom: 1 },
        e = new google.maps.StreetViewPanorama(
          i.getElementById("streetview-canvas"),
          f
        );
      e.setVisible(!0);
    }
    function f(n, r, u, f, e) {
      function s(n) {
        n.PhotoList && n.PhotoList.length > 0
          ? (n.Track &&
              Centris.Property.TrackingService.trackProprieteAffichage(
                n.CentrisNo,
                "PhotoViewer"
              ),
            (t.galleryObj = new Centris.Gallery()),
            t.galleryObj.init(
              n.PhotoList,
              n.Resolutions,
              n.UseIntegralForIdenticalDimension,
              e
            ),
            t.galleryObj.show())
          : o();
      }
      function h(n) {
        o();
        console.log(n);
      }
      function o() {
        var n = i.location.search.indexOf("?") !== -1 ? "&" : "?";
        i.location.replace(i.location + n + "err=1");
      }
      r &&
        (Centris.fn.wsSend(
          "/Mvc/Property/PhotoViewerDataListing",
          JSON.stringify({
            lang: n,
            centrisNo: r,
            track: u,
            allInscription: f
          }),
          s,
          h
        ),
        Centris.SendEventToGoogleTagManager("photoviewer-enter"));
    }
    jQuery(i).ready(function(n) {
      var f, e, i, o, s;
      n("#region-map-view")
        .closest("section")
        .addClass("property-result-map");
      n("#overview-maptools > .close-overview").on("click", function(t) {
        t.preventDefault ? t.preventDefault() : (t.returnValue = !1);
        n("#overview-maptools").fadeOut();
        n.ajax({
          type: "POST",
          async: !1,
          url: "/Master/UserContextService.asmx/UpdateInstruction",
          data: "{'value':true}",
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function() {},
          error: function() {}
        });
      });
      f = n(".thumbnailItem .shell");
      n(".hors-zone").is(":visible") && n(f).css("height", "456px");
      n("#wrapper-statistics").hide();
      n(".tabs li a").on("click", function() {
        n(this).addClass("current");
      });
      n(".aOpenLeadGrabber").magnificPopup({
        type: "iframe",
        fixedContentPos: "auto",
        fixedBgPos: !0,
        callbacks: {
          open: function() {
            n("body").css("overflow", "hidden");
          },
          close: function() {
            n("body").css("overflow", "auto");
          }
        }
      });
      n("#property-result #divMainResult .row:nth-child(5n + 0)").addClass(
        "odd"
      );
      n("#property-result #divMainResult .row:nth-child(4n + 0)").addClass(
        "even"
      );
      n(".thumbnailItem")
        .parent("#divMainResult")
        .addClass("thumbnail-content")
        .parent(".region")
        .addClass("width-fixed")
        .parent(".site-padding")
        .removeClass("site-padding");
      n(".templateSummaryItem")
        .parents(".wrapper-results")
        .addClass("exception");
      e = n("article");
      i = googleStreetViewLoaded = !1;
      n(".menu-article li a").on("click", function(t) {
        t.preventDefault ? t.preventDefault() : (t.returnValue = !1);
        n("html, body").animate({ scrollTop: 0 }, 0);
        var f = n(this).attr("href");
        e.hide();
        n("article" + f).fadeIn(250, function() {
          f != "#onmap" || i
            ? f != "#streetview" ||
              googleStreetViewLoaded ||
              (u(), (googleStreetViewLoaded = !1))
            : (r(), (i = !0));
        });
        n(".menu-article li a").removeClass("current");
        n(this).addClass("current");
      });
      n(".centrisSocioDemobutton").on("click", function(t) {
        t.preventDefault ? t.preventDefault() : (t.returnValue = !1);
        n(".centrisSocioDemobutton").removeClass("active");
        n(this).addClass("active");
      });
      n("a.gallery").on("click", function() {
        Centris.ViewPort.autoFit("#view-gallery", {
          maxHeight: 945,
          beforeAutoFitCallBack: function(t) {
            t.marginTop =
              n("#view-gallery").offset().top -
              n("#nav-results").offset().top +
              20;
            n("#view-gallery").css("padding-bottom", 0);
          }
        });
      });
      o = !!("ontouchstart" in t) || t.navigator.msMaxTouchPoints > 0;
      o || n(".icon-fav").addClass("enableHover");
      s = n(".templateSummaryItem .region-content .grid_2").height();
      n(".templateSummaryItem .content-views").css("min-height", s);
    });
    n(i).click(function(t) {
      !n(t.target).is(".social-links") &&
        n("#collapseExample").length &&
        n(".collapse").collapse("hide");
    });
    t.initPhotoGallery = f;
  })(jQuery, window, document, Centris);
(localLogicService = (function(n, t, i) {
  function r() {
    t.addEventListener("locallogic-widget-loaded", function() {
      n(".ll-content:parent").hide();
      n(".ll-content:parent").length === 1 &&
        (n("#localLogicDiv").show(),
        Centris.SendEventToGoogleTagManager("locallogic-data-present"));
    });
  }
  function u() {
    n(".header-localisation").hide();
    t.addEventListener("locallogic-widget-loaded", function() {
      n(".ll-content:parent").hide();
      n(".ll-content:parent").length === 1 &&
        (n("#tabLocation").show(),
        n("#localLogicDiv").show(),
        n(".ll-content:parent").show(),
        Centris.SendEventToGoogleTagManager(
          "community-locallogic-data-present"
        ));
    });
  }
  function f() {
    var t = n("#isLocalLogicComponentEnabled").val() === "true";
    if (t)
      try {
        e();
      } catch (i) {}
  }
  function e() {
    var n = i.createElement("script");
    n.setAttribute("src", t.LocalLogicUrl + "&callback=renderLocallogic");
    n.setAttribute("type", "text/javascript");
    n.setAttribute("async", "async");
    n.setAttribute("defer", "defer");
    i.getElementsByTagName("head")[0].appendChild(n);
  }
  return { Init: r, InitFromCommunity: u, ProcessLocalLogic: f };
})(jQuery, window, document)),
  (function(n, t, i, r, u) {
    (r || (r = t.Centris = {}), r.ViewPort) ||
      (r.ViewPort = new (function() {
        function i(t, i) {
          var r = n(t),
            f,
            u;
          r &&
            r.length != 0 &&
            (typeof i.beforeAutoFitCallBack == "function" &&
              i.beforeAutoFitCallBack(i),
            (u = Centris.ViewPort.getCurrentViewPort(i)),
            (f =
              i.maxHeight && u.Height > i.maxHeight ? i.maxHeight : u.Height),
            n(r).height(f),
            typeof i.afterAutoFitCallBack == "function" &&
              i.afterAutoFitCallBack());
        }
        this.getCurrentViewPort = function(n) {
          return this.getViewPort(n.marginTop, 0, 0, 0);
        };
        this.getViewPort = function(i, r, u, f) {
          var o = n(t).width() - r - f,
            s = n(t).height() - i - u,
            e = {};
          return (e.Width = o), (e.Height = s), e;
        };
        this.autoFit = function(r, f) {
          var e = n.extend(
            {
              maxHeight: u,
              marginTop: 60,
              beforeAutoFitCallBack: u,
              afterAutoFitCallBack: u
            },
            f
          );
          i(r, e);
          n(t).resize(function() {
            i(r, e);
          });
        };
      })());
  })(jQuery, window, document, window.Centris);
jQuery(document).ready(function(n) {
  n(".tabs li a").on("click", function() {
    n(".tabs li a").removeClass("current");
    n(this).addClass("current");
  });
  n(".aOpenLeadGrabber").magnificPopup({
    type: "iframe",
    fixedContentPos: "auto",
    fixedBgPos: !0,
    callbacks: {
      open: function() {
        n("body").css("overflow", "hidden");
      },
      close: function() {
        n("body").css("overflow", "auto");
      }
    }
  });
  n(".thumbnailItem:nth-child(4n + 0)").addClass("even last");
}),
  (function(n, t, i, r) {
    t.Centris.BrokerResult = function() {
      function e(n) {
        var f = n.d.Result.Html,
          u;
        n.d.Result.Title != r &&
          n.d.Result.Title !== "" &&
          (i.title = n.d.Result.Title);
        u = t.PageMode;
        o(u, f);
      }
      function o(i, r) {
        var e, u;
        n("#divMainResult").empty();
        n("#divMainResult").html(r);
        i == "Summary" &&
          (initSocialShare(),
          (e = n("#AlternativeLanguageSummaryUrl").text()),
          n(".lang").attr("href", e),
          (u = n("#SummaryUrl").text()),
          Centris.ContextManager.setAdressState({ url: u }, "title", u),
          n("#propResultRedirect").click(function() {
            searchCourtier("");
          }),
          n("a[data-summaryurl='SummaryUrl']").each(function() {
            n(this).attr("data-href", n(this).attr("href"));
            n(this).removeAttr("href");
          }),
          n("a[data-summaryurl='SummaryUrl']").click(function() {
            br.FindYourPropertyHref = n(this).attr("data-href");
            searchCourtier(n(this).attr("data-mlsnumber"));
          }),
          n(".aOpenLeadGrabber").magnificPopup({
            type: "iframe",
            fixedContentPos: "auto",
            fixedBgPos: !0,
            callbacks: {
              open: function() {
                n("body").css("overflow", "hidden");
              },
              close: function() {
                n("body").css("overflow", "auto");
              }
            }
          }),
          n(".wrapper-properties .thumbnail").prop("onclick", null),
          n(".wrapper-properties .thumbnail").click(function() {
            n(this)
              .parent()
              .find(".a-more-detail")
              .click();
          }));
        f(t.PageMode);
      }
      function f(t) {
        t !== "Summary" &&
          (n(".a-more-detail")
            .first()
            .attr("href") == "&pback=true"
            ? n("#ButtonViewSummary").attr(
                "href",
                "courtiers-immobiliers?view=Summary"
              )
            : n("#ButtonViewSummary").attr(
                "href",
                n(".a-more-detail")
                  .first()
                  .attr("href")
              ));
      }
      var u = {};
      this.FindYourPropertyHref = "";
      this.bindPager = function() {
        var r, i, o;
        u = new Centris.Paginator({
          onClick: function(t) {
            n(t)
              .closest(".pagerDiv")
              .attr("id") == "divPagerBottom" &&
              n("html, body").animate({ scrollTop: 0 }, 500);
          }
        });
        r = n("#numberOfResultToBeDisplayed").text();
        i = n("#currentPage").text();
        i === "" && (i = 1);
        o = n("#numberOfResult").text();
        t.location
          .toString()
          .toLowerCase()
          .indexOf("view=map") == -1 &&
          u.Initialize(o, parseInt(r), parseInt(i) - 1, n(".pager"), function(
            n
          ) {
            var t = "{'startPosition':" + n + "}";
            Centris.fn.wsSend("/Mvc/Broker/GetBrokers", t, e);
          });
        f(t.PageMode);
      };
    };
  })(jQuery, window, document),
  (function(n, t) {
    t.Centris.BrokerSearchPreview = function(t, i, r, u, f, e) {
      var s = Centris.fn,
        h = e,
        o;
      f != null && f.hide();
      o = function(t, r) {
        var u = "{'text': " + n.stringify(i.val()) + "}";
        s.wsSend(h, u, function(t) {
          var i = [];
          n.each(t.d.Result, function(n, t) {
            i.push({
              label: t.Label,
              value: t.Value,
              match: t.Matches,
              type: t.Type,
              typeId: t.TypeId
            });
          });
          r(i);
        });
      };
      n.extend(n.ui.autocomplete.prototype, {
        _renderItem: function(t, i) {
          var f = "",
            e = 0,
            r,
            u = 0,
            h = "",
            o,
            s;
          if (i.type == 15) h = "ui-state-disabled";
          else
            for (o = 0; o < i.match.length; o++)
              (s = i.match[o]),
                (r = s.Index),
                (u = r + s.Len),
                r > e && (f += i.label.substr(e, r - e)),
                (f +=
                  "<span style='font-weight:bold;color:Blue;'>" +
                  i.label.substr(r, s.Len) +
                  "</span>"),
                (e = u);
          return (
            u < i.label.length && (f += i.label.substr(u, i.label.length - u)),
            n("<li  class='" + h + "'></li>")
              .data("item.autocomplete", i)
              .append("<a>" + f + "</a>")
              .appendTo(t)
          );
        }
      });
      t == 0 &&
        i.focus(function() {
          n(this).autocomplete("search", "");
        });
      i.autocomplete({
        minLength: t,
        appendTo: "#brokerSearchForm",
        source: function(n, t) {
          o(n.term, function(n) {
            t(n);
          });
        },
        search: function() {
          f != null && f.hide();
        },
        open: function() {
          n("#txt-language")
            .next("i")
            .css("z-index", 5);
        },
        close: function() {
          n(this)
            .autocomplete()
            .val("");
          n(":focus").attr("id") != n(this).attr("id") &&
            n("label[for=" + n(this).attr("id") + "]").show();
          n("#txt-language")
            .next("i")
            .css("z-index", -1);
        },
        select: function(i, f) {
          return (r != null && r(f, f.item.type, f.item.typeId),
          t == 0 && n(this).trigger("blur"),
          u)
            ? ((this.value = ""), !1)
            : !0;
        },
        response: function(n, t) {
          t.content.length === 0 && f != null && f.show();
        }
      });
    };
    t.Centris.BrokersSearchForm = function(i) {
      function s(n, t, i) {
        var u = n.item.label;
        r("ulFilterBroker", u, t, i);
      }
      function h(n, t, i) {
        var u = n.item.label;
        r("ulFilterBrokerLanguage", u, t, i);
      }
      function c(n, t, i) {
        var u = n.item.label;
        r("ulFilterTerritories", u, t, i);
      }
      function l(n, t, i) {
        var u = n.item.label;
        r("ulFilterAgency", u, t, i);
      }
      function r(t, i, r, f) {
        if (r) {
          var e = n("#" + t + " li [data-type='" + r + "']");
          e.length > 0 && e.parent().remove();
        }
        n("#" + t).append(
          '<li><a title="Click to remove" data-type="' +
            r +
            '" data-typeid="' +
            f +
            '"><span class="tab">' +
            i +
            "</span></a></li>"
        );
        u();
        n("#" + t + " li [data-type='" + r + "']").click(function() {
          n(this)
            .closest("li")
            .remove();
          u();
        });
      }
      function f() {
        var t = {},
          i,
          r;
        return (
          n("#ulFilterBroker li").length > 0
            ? n("#ulFilterBroker li a")
                .attr("data-typeid")
                .split(";").length > 1
              ? ((t.CourtierCode = 0),
                (t.NomCourtier = n("#ulFilterBroker li a").text()))
              : ((t.CourtierCode = parseInt(
                  n("#ulFilterBroker li a").attr("data-typeid")
                )),
                isNaN(t.CourtierCode)
                  ? ((t.NomCourtier = n("#ulFilterBroker li a").attr(
                      "data-typeid"
                    )),
                    (t.CourtierCode = 0))
                  : (t.NomCourtier = n("#ulFilterBroker li a").text()))
            : ((t.CourtierCode = 0), (t.NomCourtier = "")),
          n("#ulFilterAgency li").length > 0
            ? ((i = n("#ulFilterAgency li a").attr("data-typeid")),
              i.split(";").length > 1
                ? (t.NomAgence = i.split(";")[1].trim())
                : ((t.CodeAgence = i),
                  (t.NomAgence = n("#ulFilterAgency li a").text())))
            : ((t.CodeAgence = ""), (t.NomAgence = "")),
          n("#ulFilterTerritories li").length > 0
            ? ((r = n("#ulFilterTerritories li a").attr("data-typeid")),
              (t.Territoire =
                r.split(";").length > 1
                  ? r.split(";")[1].trim()
                  : n("#ulFilterTerritories li a").text()))
            : (t.Territoire = ""),
          (t.CodeLangue =
            n("#ulFilterBrokerLanguage li").length > 0
              ? n("#ulFilterBrokerLanguage li a").attr("data-typeid")
              : ""),
          t
        );
      }
      function e() {
        var i = f(),
          r = { query: i },
          u = n.stringify(r);
        Centris.fn.wsSend(
          "/broker/BrokerWebService.asmx/UpdateQuery",
          u,
          function(n) {
            n.d.Succeeded &&
              (Centris.ContextManager.close(),
              (t.location = Centris.ContextManager.getUrl(
                n.d.Result + "?pback=true"
              )));
          }
        );
      }
      function u() {
        var t = f(),
          i = { query: t },
          r = n.stringify(i);
        Centris.fn.wsSend(
          "/broker/BrokerWebService.asmx/GetBrokerCountFromQuery",
          r,
          function(t) {
            if (t.d.Succeeded) {
              var i = n("#brokerCountLabel").attr("data-format");
              t.d.Result > 1
                ? n("#brokerCountLabel").text(i.replace(/\_s_/g, "s"))
                : n("#brokerCountLabel").text(i.replace(/\_s_/g, " "));
              n("#brokerCount").text(
                Centris.Localization.formatNumber(t.d.Result)
              );
            }
          }
        );
      }
      function o(t) {
        var i = n("#brokerSearchForm .filters-list li").find(
          "[data-type='" + t + "']"
        );
        i.length > 0 && i.parent().remove();
      }
      function a() {
        var t = n("#brokerQuerySearchSaveName").val(),
          i,
          r;
        typeof t == "undefined" && (t = null);
        i = { query: f(), name: t };
        r = n.stringify(i);
        t != null &&
          Centris.fn.wsSend(
            "/Broker/BrokerWebService.asmx/SaveBrokerQueryForUnitTesting",
            r,
            function() {
              alert("Sauvegarde réussi");
            }
          );
      }
      var v = new Centris.BrokerSearchPreview(
          3,
          i.controlForName,
          s,
          !0,
          null,
          "/Broker/BrokerWebService.asmx/GetAutoCompleteDataForBrokerName"
        ),
        y = new Centris.BrokerSearchPreview(
          3,
          i.controlForTerritory,
          c,
          !0,
          null,
          "/Broker/BrokerWebService.asmx/GetAutoCompleteDataForBrokerTerritory"
        ),
        p = new Centris.BrokerSearchPreview(
          3,
          i.controlForAgency,
          l,
          !0,
          null,
          "/Broker/BrokerWebService.asmx/GetAutoCompleteDataForBrokerAgency"
        ),
        w = new Centris.BrokerSearchPreview(
          0,
          i.controlForLanguage,
          h,
          !0,
          null,
          "/Broker/BrokerWebService.asmx/GetAutoCompleteDataForBrokerLanguages"
        );
      n("#searchBrokerButton").click(function() {
        if (
          parseInt(
            n("#brokerCount")
              .text()
              .replace(/\s+/g, "")
          ) == 0
        ) {
          Centris.Dialog.alert(i.messageNoResults);
          return;
        }
        e();
      });
      n("#clearSearchBrokerButton").click(function() {
        n("#ulFilterBroker").empty();
        n("#ulFilterBrokerLanguage").empty();
        n("#ulFilterAgency").empty();
        n("#ulFilterTerritories").empty();
        u();
      });
      n("#brokerSearchForm .filters-list a").click(function() {
        o(n(this).attr("data-type"));
        n(this).remove();
        u();
      });
      n("#cancelSearchBrokerButton").click(function() {
        n("#brokerSearchForm").hide();
        n(".title-results").show();
      });
      n("#firstRowFilter a").click(function() {
        o(parseInt(n(this).attr("data-type")));
        n(this).remove();
        e();
      });
      n("#queryBrokerSearchSaveButton").click(function() {
        a(this);
      });
    };
  })(jQuery, window, document);
seriesColorsCode = [
  "#70d2ed",
  "#e95f55",
  "#fdbf14",
  "#42c694",
  "#b894c4",
  "#5da3df",
  "#dd4477",
  "#66aa00",
  "#b82e2e",
  "#316395",
  "#994499",
  "#22aa99"
];
currentChartResult = null;
