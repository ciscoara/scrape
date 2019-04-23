var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var SavedArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    commentTitle: {
        type: String
    },
    comment: {
        type: String
    },
    commentDate: {
        type: Date,
        default: Date.now
    }
})

var SavedArticle = mongoose.model("SavedArticle", SavedArticleSchema);

module.exports = SavedArticle;