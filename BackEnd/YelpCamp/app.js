var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require("./models/campground");
var Comment = require("./models/comments");
var seedDB = require("./seeds");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");

//Remove all existing campgrounds then add New Campgrounds.
seedDB();

mongoose.connect("mongodb://localhost/yelp_camp");


app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "This is the secret thingy",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
			res.render("campgrounds/index", {campgrounds: campgrounds});
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
	res.render("campgrounds/new");
});

//RESTFULL-ROUTE -->SHOW
app.get("/campgrounds/:id", (req, res)=>{
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

// ====================
//COMMENTS ROUTES
//=====================

app.get("/campgrounds/:id/comments/new", (req, res)=>{
	Campground.findById(req.params.id, (err, campground)=>{
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

app.post("/campgrounds/:id/comments", (req,res)=>{
	//lookup campground using ID
	Campground.findById(req.params.id, (err, campground)=>{
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			//create new comment
			Comment.create(req.body.comment, (err, comment)=>{
				if(err){
					console.log(err);
				} else {
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
	
	//connect new comment to campground
	//redirect campgorund show page
});

//================
//AUTH ROUTES
//================
//show register form
app.get("/register", function(req, res){
	res.render("register");
});
//handle sign-up logic
app.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	});
})




//REMOVE /favicon.ico 404 NOT FOUND error
app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

app.listen(3000 || process.env.PORT, process.env.IP, ()=>{
	console.log("YelpCamp Server is Running");
});





















