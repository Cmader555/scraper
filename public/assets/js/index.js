

//scrape button, get scrape and display results

$("#scraper").on("click", function (event) {

  event.preventDefault();
  $(".toRemove").remove()

  $.ajax({
    type: "GET",
    url: "/scrape"

  }).then(function (response) {
    //console.log(response)
    // console.log(response[1].title)
    // console.log(response[1].href)
    //console.log(response[1]._id)

    for (let i = 0; i < 10; i++) {


      let display = `
            <div class="row toRemove">
             <div class="col s12" align="center">
              <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                    <a href="${response[i].href}" target="blank">
                    <span class="card-title">${response[i].title}</span>
                    </a>
                    <img src="${response[i].imgurl}" alt="sports" height="50" width="50">
                        <div class="right-align">
                            <button class="btn waves-effect amber lighten-1" type="submit" name="action" id="favoriteSubmit" vale="${response[i]._id}"><i class="far fa-star"></i></button>
                        <div>
                  </div>
                </div
              </div>
            </div
          `;

      $("#displayArticles").prepend(display);
    }


  })
})

$("#reset").on("click", function (event) {

  event.preventDefault();
  $(".toRemove").remove()

})


$(document).on('click', "#favoriteSubmit", function (event) {

  

  $.ajax({
    type: "PUT",
    url: "/scrape"

  }).then(function (response) {



  });

})