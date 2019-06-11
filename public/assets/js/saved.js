



$(document).on('click', "#favoriteFalse", function (event) {

  _id = this.value

  function removeFavorite(_id) {

    $.ajax({
      type: "PUT",
      url: "/remove-saved/" + _id

    }).then(function (response) {

      console.log("You clicked the remove Favorite Button!")
      location.reload();


    });


  }
  removeFavorite(_id);

})

$(document).ready(function () {

  $(".modal").modal();

})


$("#addNote").on("click", function (event) {

  let note = $("#noteNote").val().trim()


  $.post("/saved-notes/", note).then(
    function () {
      console.log("created new drink");
      // Reload the page to get the updated list
      //location.reload();
    }
  )

}); 