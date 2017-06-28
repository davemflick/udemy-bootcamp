var Campground = require("../models/campground");
var Comment = require("../models/comments");
var flash = require("connect-flash");

//All middlware goes here

var middlewareObj = {}


//check if person is logged in (middleware function)
middlewareObj.isLoggedIn = function (req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that!");
	res.redirect("/login");
}

//middleware to check if user has permision to edit/update/delete
middlewareObj.checkCampgroundOwnership = function (req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, (err,foundCampground)=>{
			if(err){
				req.flash("error", "Campground not found");
				res.redirect("back");
			} else {
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	} else {
		res.flash("error", "You do not have permission to edit or delete this");
		res.redirect('back');
	}
}

//middleware to check if user has permision to edit/update/delete
middlewareObj.checkCommentOwnership = function (req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, (err,foundComment)=>{
			if(err){
				req.flash("error", "Comment not found");
				res.redirect("back");
			} else {
				if(foundComment.author.id.equals(req.user._id)){
					next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	} else {
		res.flash("error", "You do not have permission to edit or delete this");
		res.redirect('back')
	}
}



module.exports = middlewareObj