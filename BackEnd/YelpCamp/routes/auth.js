var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//================
//AUTH ROUTES
//================
//show register form
router.get("/register", function(req, res){
	res.render("register");
});
//handle sign-up logic
router.post("/register", function(req, res){
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

// show login form
router.get("/login", (req, res)=>{
	res.render("login");
});
//handle login logic (uses middleware, ending callback not neccessary to fill out)
router.post("/login", 
	passport.authenticate("local", {successRedirect: "/campgrounds", failureRedirect:"/login"}),
	(req,res)=>{});

//logout route
router.get("/logout", (req, res)=>{
	req.logout();
	res.redirect("/campgrounds");
});


module.exports = router;