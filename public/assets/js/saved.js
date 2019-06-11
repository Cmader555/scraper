



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