var express = require("express");
var app = express();
var bodyParser = require('body-parser');


let campgrounds = [
	{name: "Salmon Creek", image:"http://www.lake-grapevine.com/wp-content/uploads/2010/10/Meadowmere-Park-Camping-small.jpg"},
	{name: "Granite Hill", image:"http://www.gscnc.org/content/dam/girlscouts-gscnc/images/Camps/summersamp/platform%20tent-01.png/_jcr_content/renditions/original.png"},
	{name: "Lost Man's Cavern", image:"http://haulihuvila.com/wp-content/uploads/2012/09/hauli-huvila-campgrounds-lg.jpg"},
];


app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


//Landing(home) page
app.get("/", (req, res)=>{
	res.render("landing");
});

//Campgrounds route
app.get("/campgrounds", (req,res)=>{

	res.render("campgrounds", {campgrounds: campgrounds});
});

//Post new campground
app.post("/campgrounds", (req,res)=>{
	let newCampground = {name: req.body.campName, image: req.body.imageLink};
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
});

//form to make new campground -->restful convention to use /new
app.get("/campgrounds/new", (req, res)=>{
	res.render("newCG");
});

//REMOVE /favicon.ico 404 NOT FOUND error
app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

app.listen(3000 || process.env.PORT, process.env.IP, ()=>{
	console.log("YelpCamp Server is Running");
});