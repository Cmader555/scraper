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

}; 