



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
  let _id = this.value;
  console.log(_id);
  function addNote(_id) {

    $.ajax({

      type: 'POST',
      url: "/create-notes/" + _id,
      data: note


    }).then(function (response) {

      console.log("You clicked make a Note!")
      //console.log("////////", response)
      $("#noteNote").val("");

    });
  }

  addNote(_id)

}); 