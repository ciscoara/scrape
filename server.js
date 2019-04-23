
var express = require("express");
var logger = require("morgan");
var hbs = require("express-handlebars");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");
var PORT = process.env.PORT || 3001;
// Initialize Express
var app = express();
// Configure middleware
// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));
//incorporate handlebars.
app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/scrape", function(req, res) {
  axios.get("https://old.reddit.com/r/worldnews/").then(function(response) {
    var $ = cheerio.load(response.data);
    $("p.title").each(function(i, element) {
      var result = {};
      result.title = $(element)
        .children("a")
        .text();
      result.link = $(element)
        .children("a")
        .attr("href");
      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
    });
  })
});

app.get("/articles", function (req, res) {
  db.Article.find({}).sort({dateScraped: -1}).limit(5).then(function (dbArticle) {
    var hbsobj = {
      article: dbArticle
    }
    res.render("articles", hbsobj);
  })
})
// Start the server
app.listen(PORT, function() {
  console.log("App running at http://localhost:" + PORT);
});

app.get("/comment", function (req, res) {
  console.log("comment page")
})