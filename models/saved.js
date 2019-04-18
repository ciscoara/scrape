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
    noteTitle: {
        type: String
    },
    note: {
        type: String
    },
    noteDate: {
        type: Date,
        default: Date.now
    }
})

var SavedArticle = mongoose.model("SavedArticle", SavedArticleSchema);

module.exports = SavedArticle;