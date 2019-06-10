

module.exports = function (app) {

    app.get("/", function (req, res) {
        res.render("index")
    });

    app.get("/favorites", function(req, res){

        res.render("saved")

    }); 

}
