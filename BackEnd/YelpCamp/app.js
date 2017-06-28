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
var methodOverride = require("method-override");
var flash = require("connect-flash");

//LOAD IN ROUTE FILES
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var authRoutes = require("./routes/auth");


//Remove all existing campgrounds then add New Campgrounds.
//seedDB();

//Create mongodb://localhost/yelp_camp into an environment variable called DATABASEURLLOCAL
//By typing into the command line 'export DATABASEURLLOCAL=mongodb://localhost/yelp_camp'
//Now process.env.DATABASEURLLOCAL is mongodb://localhost/yelp_camp
//INSIDE HEROKU SETTINGS --> GO TO CONFIGURE VARIABLES TO ADD mongodb://<username>:<password>@ds049935.mlab.com:49935/yelpcampflick to same variable name
var url = process.env.DATABASEURLLOCAL || 'mongodb://localhost/yelp_camp';
mongoose.connect(url);


//connect flash
app.use(flash());

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

//Connect to Method-Override
app.use(methodOverride("_method"));

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


//middleware to determine if user is logged in or not, pass to every template
app.use((req,res,next)=>{
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

//Landing(home) page
app.get("/", (req, res)=>{
	res.render("landing");
});


app.use(authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);



//REMOVE /favicon.ico 404 NOT FOUND error
app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

app.listen(process.env.PORT || 3000, process.env.IP, ()=>{
	console.log("YelpCamp Server is Running");
});












