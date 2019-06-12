// Dependencies
const express = require("express");
const mongojs = require("mongojs");
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");



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
            db.sportsArticle.create(results)
                .then(function (article) {

                    db.sportsArticle.find({})

                }).then(function (article) {
                    res.send(article)

                }).catch(function (err) {
                    return res.json(err);
                });

        });
    })


    app.put("/saved/:_id", function (req, res) {

        db.sportsArticle.findOneAndUpdate({ _id: req.params._id }, {
            $set: { saved: true }
        }).then(function (data) {
            res.json(data);
            // console.log(data)
            // console.log(req.params._id)
        });


    });

    app.get("/saved-favorites/", function (req, res) {

        db.sportsArticle.find({ saved: true }).then(function (savedArticles) {
            res.json(savedArticles)

        }).catch(function (err) {
            return res.json(err);
        });


    });

    app.put("/remove-saved/:_id", function (req, res) {

        db.sportsArticle.findOneAndUpdate({ _id: req.params._id }, {
            $set: { saved: false }
        }).then(function (data) {
            res.json(data);
            // console.log(data)
            // console.log(req.params._id)
        });


    });

    app.post("/create-notes/:id", function (req, res) {

        db.Note.create(req.body)
            .then(function (dbNote) {

                return db.sportsArticle.findOneAndUpdate({ _id: req.params.id }, { $push: { note: dbNote._id } }, { new: true });

            }).then(function (dbArticle) {
                // If we were able to successfully update an Article, send it back to the client
                res.json(dbArticle);
            }).catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });



    })

    app.get("/view-notes/:id", function (req, res) {

        db.sportsArticle.findById(req.params.id)
            .populate("note")
            .then(function (dbNotes) {

                console.log("//from view-notes//////", dbNotes)
                res.json(dbNotes);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });

    })

    app.delete("/delete-notes/:id", function (req, res) {

        db.Note.findByIdAndRemove(req.params.id, (err, note) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send();
        })


    })
};

