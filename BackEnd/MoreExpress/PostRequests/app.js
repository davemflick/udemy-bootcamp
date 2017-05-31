var express = require("express");
var app = express();
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

var friends=["David", "Me", "Myself", "Look In Mirror"];

app.get("/",(req,res)=>{
	res.render("Home");
});

app.get("/friends", (req,res)=>{
	res.render("friends", {friends: friends});
});

app.post("/addfriend", (req,res)=>{
	var newFriend = req.body.newfriend;
	friends.push(newFriend);
	res.redirect("/friends");
});

app.listen(process.env.Port || 3000, process.env.IP, ()=>{
	console.log("You are Connected to the server");
});