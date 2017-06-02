var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp");

//Schema Set-up;
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


// Campground.create({
// 	name: "Campground 1",
// 	image: "http://2.bp.blogspot.com/_OkIy_bZqAGI/TI8pXXqfj9I/AAAAAAAAAAM/1o-6AbD4QS4/s1600/tent.gif",
// 	description: "This is the first campsite, it's not real and doesn't exist. Your mom smells of elderberries."
// },(err,cg)=>{ return err ? console.log(err): console.log(cg);});

//Landing(home) page
app.get("/", (req, res)=>{
	res.render("landing");
});


//Campgrounds route
//RESTFULL-ROUTE -->INDEX
app.get("/campgrounds", (req,res)=>{
	//Get all campground from db, then render file
	Campground.find({}, (err, campgrounds)=>{
		if(err){
			console.log(err);
		} else {
			res.render("index", {campgrounds: campgrounds});
		}
	});
});


//Post new campground
//RESTFULL-ROUTE -->CREATE
app.post("/campgrounds", (req,res)=>{
	let name = req.body.campName;
	let image = req.body.imageLink;
	let description = req.body.campDescription;
	let newCampground = {name: name, image: image, description: description};
	//Create new campground, save to db, reroute to /campgrounds
	Campground.create(newCampground, (err, campground)=>{
		if(err){
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
});

//form to make new campground -->restful convention to use /new
//This needs to be before SHOW ROUTE otherwise /new wouldn't work.
//RESTFULL-ROUTE -->NEW  (Show form to create new object);
app.get("/campgrounds/new", (req, res)=>{
	res.render("newCG");
});

//RESTFULL-ROUTE -->SHOW
app.get("/campgrounds/:id", (req, res)=>{
	//find campground with provided ID
	Campground.findById(req.params.id, function(err, foundCampground){
		return err ? console.log(err) : res.render("show", {campground: foundCampground});
	});
	//render show template with that campground
	
});



//REMOVE /favicon.ico 404 NOT FOUND error
app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

app.listen(3000 || process.env.PORT, process.env.IP, ()=>{
	console.log("YelpCamp Server is Running");
});





















