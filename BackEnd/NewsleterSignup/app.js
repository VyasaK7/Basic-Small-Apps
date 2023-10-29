const express = require("express");
const app = express();

const request = require("request");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname + "\\signup.html");
});

app.post("/",function(req,res){
    const fName = req.body.fName;
    const lName = req.body.lName
    const email = req.body.email;
    console.log(fName, lName ,email);
});

app.listen(3000,function(){
    console.log("Starting up server at port 3000");
});

//API KEY
//791cf66e26ee0bba7ac19f52166e2601-us21

