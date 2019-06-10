const mongoose = require("mongoose");

const Schema = mongoose.Schema;


let sportsSchema = new Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },
    href: {
        type: String,
        required: true
    },
    imgURL: {
        type: String,
        required: true
    }, 
    saved: {
        type: Boolean, 
        default: false
    }
}); 

let sportsArticle = mongoose.model("sportsArticle", sportsSchema);

module.exports = sportsArticle;