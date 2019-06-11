// Dependencies
const express = require("express");
const mongojs = require("mongojs");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models/sports_articles");



module.exports = function (app) {

    // const databaseUrl = "sportsScraper";
    // const collections = ["sportsArticle"];

    // const db = mongojs(databaseUrl, collections);
    // db.on("error", function (error) {
    //     console.log("Database Error:", error);
    // });


    app.get("/articles", function (req, res) {

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

                const saved = false;

                results.push({
                    title,
                    href,
                    imgurl,
                    saved
                });

            });
            //console.log(results);
            db.create(results).then(function (article) {
                //console.log(article)
                //res.send(article);
            }).catch(function (err) {
                return res.json(err);
            });

            db.find({}).then(function (article) {
                res.send(article)

            }).catch(function (err) {
                return res.json(err);
            });


        });
    })


    app.put("/saved/:_id", function (req, res) {

        db.findOneAndUpdate({ _id: req.params._id }, {$set: {saved: true}
        }).then(function(data) {
            res.json(data);
            console.log(data)
            console.log(req.params._id)
        });


    }); 

    app.get("/saved-favorites/", function (req, res) {

        db.find({saved: true}).then(function (savedArticles) {
            res.json(savedArticles)

        }).catch(function (err) {
            return res.json(err);
        });


    }); 

};

