const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.get("/bmiCalculator",function(req,res){
    res.sendFile(__dirname+"/bmiCalculator.html");
});

app.post("/",function(req,res){
    var num1 = Number(req.body.Number1);
    var num2 = Number(req.body.Number2);
    res.send("Result of addition is : " + (num1+num2));
});

app.post("/bmiCalculator",function(req,res){
    var height = parseFloat(req.body.height);
    var weight = parseFloat(req.body.weight);
    result = weight/Math.pow(height,2);
    res.send("Your BMI is : " + result);
});

app.listen(3000,function(){
    console.log("Server started port at 3000");
});