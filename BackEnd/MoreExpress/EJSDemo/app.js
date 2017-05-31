var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res)=>{
	res.render("home");
});

app.get("/dog/:breed", (req, res)=>{
	let myBreed = req.params.breed;
	res.render("dog", {breed: myBreed});
});

app.get("/posts", (req, res)=>{
	var posts = [
		{title: "Post 1", author: "Susy"},
		{title: "Post 2", author: "Brit"},
		{title: "Post 3", author: "Lauren"},
	];

	res.render("posts", {posts: posts});
});

app.listen(process.env.PORT || 3000, process.env.IP, ()=>{
	console.log("Server is Listening");
})