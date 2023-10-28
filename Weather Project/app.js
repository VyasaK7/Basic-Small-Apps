const express = require("express");
const app = express();

const https = require("https");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"\\index.html");
});

app.post("/",function(req,res){
    const unit = "metric";
    const query = req.body.cityName;
    const appKey = "512e72caebbe2edbe1cd99fc1c71b638";
    const url = "https://api.openweathermap.org/data/2.5/weather?units="+unit+"&q="+query+"&appid="+appKey;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The temprature in " + req.body.cityName + " is : " + temp + " degrees Celsius.</h1>");
            res.write("<h2>The Description is : "+description+"</h2>")
            res.write("<img src="+iconUrl+">");
            res.send();
        })
    })
})


app.listen(3000,function(){
    console.log("Starting port on 3000");
});