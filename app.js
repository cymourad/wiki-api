const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true
});

const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Article = mongoose.model("Article", articleSchema);

///////////////////////////// Requests targeting all articles //////////////////


app.route("/articles")
  .get(function(req, res) {
    Article.find({}, function(err, foundArticles) {
      if (err) {
        res.send(err);
      } else {
        res.send(foundArticles);
      }
    });
  })
  .post(function(req, res) {

    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });

    newArticle.save(function(err) {
      if (err) {
        res.send(err);
      } else {
        res.send("New article was successfully saved to the database.");
      }
    });

  })
  .delete(function(req, res) {

    Article.deleteMany({}, function(err) {
      if (err) {
        res.send(err);
      } else {
        res.send("Successfully deleted all the articles.");
      }
    });

  });

///////////////////////////// Requests targeting a single article ////////////////

app.route("/articles/:articleName")
  .get(function(req, res) {
    Article.findOne({
      title: req.params.articleName
    }, function(err, foundArticle) {
      if (err) {
        res.send(err);
      } else {
        res.send(foundArticle);
      }
    })
  })
  .put(function(req, res) {
    Article.update({
      title: req.params.articleName
    }, {
      title: req.body.title,
      content: req.body.content
    }, {
      overwrite: true
    }, function(err) {
      if (err) {
        res.send(err);
      } else {
        res.send("Article was updated successfully.")
      }
    });
  })
  .patch(function(req, res) {
    Article.update({
      title: req.params.articleName
    }, {
      $set: req.body
    }, function(err) {
      if (err) {
        res.send(err);
      } else {
        res.send("Article was updated successfully.")
      }
    });
  })
  .delete(function(req, res) {
    Article.deleteOne({
      title: req.params.articleName
    }, function(err) {
      if (err) {
        res.send(err);
      } else {
        res.send("Article was deleted successfuly");
      }
    });
  });


app.listen(3000, function() {
  console.log("Server started listening to port 3000 ...");
});