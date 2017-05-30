var express = require('express');
var app = express();


app.get("/", (req,res)=>{
	res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", (req,res)=>{
	let animal = req.params.animal.toLowerCase();
	let sounds = {
		pig: "Oink",
		cow: "Moo",
		dog: "Woof Woof!",
		cat: "Meow",
		horse: "Nah mother fucker"
	};
	res.send("The " + animal + " says " + sounds[animal]);
});

app.get("/repeat/:word/:num", (req,res)=>{
	let word = req.params.word;
	let num = Number(req.params.num);
	let output = "";
	for(var i=0; i<num; i++){
		i !== num-1 ?
		output += word + " " :
		output += word;
	}
	res.send(output);
});

app.get("*", (req, res)=>{
	res.send("Unknown Route, please try again.")
});

app.listen(process.env.PORT || 3000, process.env.IP, ()=>{
	console.log("App is Listening");
})