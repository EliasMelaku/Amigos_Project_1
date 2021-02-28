var elementSelected = null;
var typeSelected = false;

$(document).on("click", ".list-image > img", function () {
  $(".list-image > img").each(function () {
    $(this).removeClass("active");
  });
  $(this).addClass("active");
  elementSelected = $(this);
  typeSelected = false;
});

$(document).on("input", "#text-src", function () {
  $(".list-image > img").each(function () {
    $(this).removeClass("active");
  });
  elementSelected = $(this);
  typeSelected = true;
});

$(document).on("click", "#button-confirm", function () {
  $(".select-image").hide();
  if (typeSelected == true) {
    $(".view-image > img").attr("src", elementSelected.val());
  } else {
    $(".view-image > img").attr("src", elementSelected.attr("src"));
  }
  $(".view-image").fadeIn("high");
});

$(document).on("click", "#button-other", function () {
  $(".view-image").hide();
  $(".select-image").fadeIn("high");
});
