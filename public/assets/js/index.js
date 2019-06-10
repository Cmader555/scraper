

//scrape button, get scrape and display results

$("#scraper").on("click", function(event){

    event.preventDefault(); 

    $.ajax({
        type: "GET", 
        url: "/scrape"

    }).then( function (response){
        //console.log(response)
        //console.log(response[1].title)

        for (let i = 0; i < response.length; i++){

            
            let display = `
            <div class="row">
             <div class="col s12" align="center">
              <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                    <span class="card-title">${response[i].title}</span>
                    <img src="${response[i].imageurl}" alt="Drink" height="150" width="150">
                    <p>${response[i].href}</p>
                  </div>
                </div
              </div>
            </div
          `; 

          $("#displayArticles").prepend(display);
        }


    })
})