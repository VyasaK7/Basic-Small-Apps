const express = require("express");
const app = express();
app.use(express.static("public"));

const ejs = require("ejs");
app.set("view engine", "ejs");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/wikiDB");

const wikiSchema = {
    title : String,
    content : String
}

const Article = mongoose.model( "Article", wikiSchema);

//Requests Targetting All Articles

app.route("/articles")
.get(function(req,res){
    Article.find({}).then(function(existingArticles){
        res.send(existingArticles);
    }).catch(function(err){
        res.send(err);
    })
})
.post(function(req,res){
    const newArticle = new Article({
        title : req.body.title,
        content : req.body.content
    });

    newArticle.save().then(function(){
        res.send("Successfully saved the article!");
    }).catch(function(err){
        res.send(err);
    })
})
.delete(function(req,res){
    Article.deleteMany({}).then(function(){
        res.send("Successfully Deleted All Articles!")
    }).catch(function(err){
        res.send(err);
    })
});

//Requests Targetting A Specific Articles

app.route("/articles/:articleName")
.get(function(req,res){
    Article.findOne({title: req.params.articleName}).then(function(foundArticle){
        if(foundArticle){
            res.send(foundArticle);
        }
        else{
            res.send("No article matching the given title was found");
        }
    })
})
.put(function(req,res){
    Article.updateOne({title:req.params.articleName},
        {title:req.body.title,content:req.body.content}).then(function(){
            res.send("Successfully Updated Article")
        }).catch(function(err){
            res.send(err)
        })
})
.patch(function(req,res){
    Article.updateOne({title:req.params.articleName},
        {$set : req.body}).then(function(){
            res.send("Successfully Updated Article if it existed")
        }).catch(function(err){
            res.send(err)
        })
})
.delete(function(req,res){
    Article.deleteOne({title:req.params.articleName}).then(function(){
        res.send("Successfully Deleted the record if it exists")
    }).catch(function(err){
        res.send(err)
    })
});

app.listen(3000,function(){
    console.log("Server Started on Port 3000");
})