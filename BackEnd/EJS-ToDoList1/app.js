const express = require("express");
const app = express();

app.set('view engine', 'ejs');

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

const date = require(__dirname + "/date.js");

app.use(express.static("public"));

var item = ["Item1","Item2","Item3"];

let workItems = [];

app.get("/",function(req,res){
    let todaysDate = date.getDay();
    res.render("listOfDays",{listTitle : todaysDate, listItems:item});
});

app.post("/",function(req,res){
    if(req.body.list === "Work"){
        workItems.push(req.body.newItem);
        res.redirect("/Work");
    }
    else{
        item.push(req.body.newItem);
        res.redirect("/");
    }
    
});

app.get("/work",function(req,res){
    let workTitle = "Work List";
    res.render("listOfDays",{listTitle:workTitle,listItems:workItems});
});

app.post("/work",function(req,res){
    workItems.push(req.body.newItem);
    res.redirect("/work");
})

app.get("/about",function(req,res){
    res.render("about");
})

app.listen(3000,function(){
    console.log("Started Server on Port 3000");
});