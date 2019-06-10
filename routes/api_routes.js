// Dependencies
const express = require("express");
const mongojs = require("mongojs");
const axios = require("axios");
const cheerio = require("cheerio");
const exphbs = require("express-handlebars");



module.exports = function (app) {

    const databaseUrl = "sportsScraper";
    const collections = ["sportsData"];

    const db = mongojs(databaseUrl, collections);
    db.on("error", function (error) {
        console.log("Database Error:", error);
    });


    app.get("/scrape", function (req, res) {

        axios.get("https://bleacherreport.com/").then(function (response) {

            let $ = cheerio.load(response.data);
            let results = [];

            $("li.articleSummary").each(function (i, element) {
                const imgurl = $(element)
                    .children(".articleMedia")
                    .children()
                    .children(".lazyImage")
                    .attr("src");

                const title = $(element)
                    .children(".articleContent")
                    .children(".articleTitle")
                    .text();
                const href = $(element)
                    .children(".articleContent")
                    .children(".articleTitle")
                    .attr("href");

                results.push({
                    title,
                    href,
                    imgurl
                });

            });
            //console.log(results);

            res.send(results);
        });
    })

};

