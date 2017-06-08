var express   = require("express"),
	app       = express(),
    mongoose  = require("mongoose"),
    passport  = require("passport"),
    bodyParser= require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User     = require("./models/user");

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/auth_demo_app");


//Just requiring 'express-session' inside here instead of making it a variable.
//Needs three arguments.. 'secret' can be anything at all.
app.use(require("express-session")({
	secret: "Dog days are forever",
	resave: false,
	saveUninitialized: false
}));

//SET UP FOR USING PASSPORT
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==============================
// ROUTES
//===============================

app.get("/", (req, res)=>{
	res.render("home");
})

//Add middleware to check if logged in, if not, send to login (uses isLoggedIn function at bottom of page)
app.get("/secret", isLoggedIn, (req, res)=>{
	res.render("secret");
});

//AUTH ROUTES
//show sign up form
app.get("/register", (req, res)=>{
	res.render("register");
});

app.post("/register", (req, res)=>{
	User.register(new User({username: req.body.username}), req.body.password, (err, user)=>{
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, ()=>{
			res.redirect("/secret");
		});
	});
});

//Login routes
//render login form
app.get("/login", (req,res)=>{
	res.render("login");
});
//post login
//middleware -> code that runs before final callback (i.e. passport.authenticate());
app.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}), (req,res)=>{});

//Logout

app.get("/logout", (req, res)=>{
	req.logout();
	res.render("logout");
});

//Check if person is logged in
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}




app.listen(3000 || process.env.PORT, process.env.IP, ()=>{
	console.log("Server Connected");
});










