$(document).ready(() => {
  $(".delete-banksia").on("click", e => {
    $target = $(e.target);
    const id = $target.attr("data-id");
    $.ajax({
      type: "DELETE",
      url: "/admin/banksia/" + id,
      success: response => {
        window.location.href = "/admin/banksia";
      },
      error: err => {
        console.log(err);
      }
    });
  });

  $(".delete-signage").on("click", e => {
    $target = $(e.target);
    const id = $target.attr("data-id");
    $.ajax({
      type: "DELETE",
      url: "/admin/signage/" + id,
      success: response => {
        window.location.href = "/admin/signage";
      },
      error: err => {
        console.log(err);
      }
    });
  });
});
