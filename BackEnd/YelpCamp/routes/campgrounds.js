var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comments");

//Campgrounds route
//RESTFULL-ROUTE -->INDEX
router.get("/", (req,res)=>{

	//Get all campground from db, then render file
	Campground.find({}, (err, campgrounds)=>{
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: campgrounds});
		}
	});
});

//Post new campground
//RESTFULL-ROUTE -->CREATE
router.post("/", isLoggedIn, (req,res)=>{
	let name = req.body.campName;
	let image = req.body.imageLink;
	if(image === ""){
		image = "https://d2ujflorbtfzji.cloudfront.net/key-image/0d323c24-1ae0-403b-8387-491b4fd03b00.png"
	}
	let description = req.body.campDescription;
	let author = {
		id: req.user._id,
		username: req.user.username
	};
	let newCampground = {name: name, image: image, description: description, author: author};
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
router.get("/new", isLoggedIn, (req, res)=>{
	res.render("campgrounds/new");
});

//RESTFULL-ROUTE -->SHOW
router.get("/:id", (req, res)=>{
	//find campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			//render show template with that campground
			console.log("found campground");
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

//RESTFUL-ROUTE --> EDIT

router.get("/:id/edit", (req, res)=>{
	//is user logged in? if not, redirect. If so, do they own campground? if so let them edit
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, (err,foundCampground)=>{
			if(err){
				console.log(err);
				res.redirect("/campgrounds");
			} else {
				if(foundCampground.author.id.equals(req.user._id)){
					res.render("campgrounds/edit", {campground: foundCampground});
				} else {
					res.send("You do not have permission to do that")
				}
			}
		});
	}else {
		res.redirect('/campgrounds')
	}

});

//RESTFUL-ROUTE ==> UPDATE

router.put("/:id", (req,res)=>{
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCamp)=>{
		if(err){
			res.redirect("/campgrounds");
			console.log(err);
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
	//redirect somewhere
});


//RESTFUL-ROUTE ==> DELETE

router.delete("/:id", (req, res)=>{
	Campground.findByIdAndRemove(req.params.id, (err)=>{
		err ? res.redirect("/campgrounds") : res.redirect("/campgrounds")
	});
});


//check if person is logged in (middleware function)
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


module.exports = router;