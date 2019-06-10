// Dependencies
const express = require("express");
//const mongojs = require("mongojs");
const axios = require("axios");
const cheerio = require("cheerio");
const exphbs = require("express-handlebars");
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8080;

const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


require("./routes/api_routes")(app);
require("./routes/html_routes")(app);


mongoose.connect("mongodb://localhost/sportsScraper", { useNewUrlParser: true });

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });