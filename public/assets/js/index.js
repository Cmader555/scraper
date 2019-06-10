

//scrape button, get scrape and display results

$("#scraper").on("click", function(event){

    event.preventDefault(); 

    $.ajax({
        type: "GET", 
        url: "/scrape"

    }).then( function (response){
        console.log(response)


    })
})