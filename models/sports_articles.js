const mongoose = require("mongoose");

let Schema = mongoose.Schema;


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
    imgurl: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
      }, 
    note: [
        {
            type: Schema.Types.ObjectId,
            ref: "Note"
        }
    ]
});

let sportsArticle = mongoose.model("sportsArticle", sportsSchema);

module.exports = sportsArticle;