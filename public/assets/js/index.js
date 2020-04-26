$(document).ready(() => {
  $(document).foundation();
  $("#next-page").on("click", () => {
    location.href = "/pokemon";
    return false;
  });
});
