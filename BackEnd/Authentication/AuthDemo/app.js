var express   = require("express"),
	app       = express(),
    mongoose  = require("mongoose"),
    passport  = require("passport"),
    bodyParser= require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User     = require("./models/user");

app.set('view engine', 'pug');

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
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.get("/", (req, res)=>{
	res.render("home");
})

app.get("/secret", (req, res)=>{
	res.render("secret");
});


app.listen(3000 || process.env.PORT, process.env.IP, ()=>{
	console.log("Server Connected");
});
