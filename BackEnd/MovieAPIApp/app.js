var express = require("express");
var app = express();
var request = require("request");


app.set("view engine", "ejs");

//API DOESN"T WORK>> BUT SAME CONCEPT>> WOULD WORK IF LEGIT API
const URL = "http://www.omdbapi.com/?apikey=thewdb&?s="

app.get("/", (req, res)=>{
	res.render("Home");
});

app.get("/results", (req, res)=>{
	let query = req.query.search
	let searchURL = URL + query;
	console.log(searchURL);
	request(searchURL, (error, response, body)=>{
		if(error){
			console.err(error);
		} else {
			if(response.statusCode == 200){
				let data = JSON.parse(body);
				res.render("Results", {data: data})
				console.log(data);
			}
		}
	});

});

app.listen(process.env.PORT || 3000, process.env.IP, ()=>{
	console.log("Movie App Server Good To Gooooo");
});