


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

  // let button = `<button type="submit" class="btn btn-success submit" id="addNote" value="${$(this).}">Add Note!</button>`; 

  // $(".addButton").append(button)
  $(".modal").modal();

})



$(".article-button").on("click", function (e) {
  //let currentId = $(this).data("value");
  $("#addNote").val($(this).data("value"))
  let _id = $(this).data("value")

  console.log("_id IS ", _id)
  function displayNotes(_id) {

    $.ajax({

      type: "GET",
      url: "/view-notes/" + _id


    }).then(function (response) {
      console.log("respnose is!", response)
      for (let i = 0; i < response.note.length; i++) {

        let display = `
        <div class="container">
        <p>${response.note[i].body}</p>
        <button type="submit" class="btn btn-success submit deleteNote" value="${response.note[i]._id}">Delete Note!</button>
        </div>
        `
        $(".noteViewAdd").append(display);

      }
    })
  }
  displayNotes(_id)
})



$(document).on("click", "#addNote", function (event) {

  let note = $("#noteNote").val().trim()
  let _id = this.value;
  //console.log(_id);
  function addNote(_id) {

    $.ajax({

      type: 'POST',
      url: "/create-notes/" + _id,
      data: { body: note, sportsArticle: _id }


    }).then(function (response) {

      console.log("You clicked make a Note!")
      //console.log("////////", response)
      $("#noteNote").val("");

    });
  }

  addNote(_id)

});

$(document).on("click", ".deleteNote", function (event) {

  let _id = this.value

  function deleteNotes(_id){

    $.ajax({
      type: "DELETE",
      url: "/delete-notes/" + _id
    }).then(function (response) {
  
    });


  }

  deleteNotes(_id)



}); 