const db = require("../models/sports_articles");

module.exports = function (app) {

    app.get("/", function (req, res) {
        res.render("index")
    });

    app.get("/favorites", function(req, res){

        db.find({saved: true})
        .then(function (savedArticles) {
            
            res.render("saved", savedArticles)

        }).catch(function (err) {
            return res.json(err);
        });


    }); 

}
