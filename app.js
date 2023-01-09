require('dotenv').config();
const express = require("express");
const app = express();
const https = require("node:https");

app.use(express.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    // console.log(req.body.cityName);
    let cityName = req.body.cityName;
    let appid = process.env.weatherAPI;
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName +"&appid=" + appid + "&units=imperial";
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(d){
            //hexadecimal
            // console.log(d);
            const weatherData = JSON.parse(d);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.send(
                `<h3>Here's the current weather in ${weatherData.name}: </h3>
                <h4>Temperature:</h4> ${temp}
                <h4>Weather:</h4> ${weatherDesc}<br>
                <img src="${imageURL}" >`
            );
            
        })
    });
});


// the / means homepage
// app.get("/", function(req, res){

//     let cityName = "london";
//     let appid = "3a864656e6bb04738d522aa0bac6698d"
//     let url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName +"&appid=" + appid + "&unit=metric";

//     //log to console if url request actually worked using callback function
//     https.get(url, function(response){
//         console.log(response.statusCode);

//         response.on("data", function(d){
//             //hexadecimal
//             // console.log(d);
//             const weatherData = JSON.parse(d);
//             console.log(weatherData);
//             const temp = weatherData.main.temp;
//             const weatherDesc = weatherData.weather[0].description;
//             const icon = weatherData.weather[0].icon;
//             const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

//             // res.type("html");
//             // res.write("<h1> Weather in london is " + temp + "</h1>");
//             // res.write("<p> Weather in london description is " + weatherDesc + "</p>");
//             // res.write("img src=" + imageURL + ">");
//             // res.send();

//             res.send(
//                 `<h3>Here's the current weather in ${weatherData.name}: </h3>
//                 <h4>Temperature:</h4> ${temp}
//                 <h4>Weather:</h4> ${weatherDesc}<br>
//                 <img src="${imageURL}" >`
//             );
            
//         })
//     });
    
// });


// app.listen(process.env.PORT, function(){
//     console.log("Server is running");
// });


app.listen(3000, function(){
    console.log("Server is running");
});