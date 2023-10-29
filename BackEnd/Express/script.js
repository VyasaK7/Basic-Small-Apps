const express = require("express");
const app = express();

app.get("/",function(req,res) {
    res.send("<h1>hkhk<h1>");
});

app.get("/contact",function(req,res){
    res.send("You can Contact me at : vyasak253@gmail.com");
});

app.get("/about",function(req,res){
    res.send("I am Vyasa Krishna.");
});

app.get("/hobbies",function(req,res){
    res.send("<ul><li>Coding</li><li>Football</li><li>Bangalore</li></ul>");
});

app.listen(3000, function(){
    console.log("Server Started Port on 3000");
});