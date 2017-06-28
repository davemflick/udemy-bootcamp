var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comments");
var middleware = require("../middleware/index")

var isLoggedIn = middleware.isLoggedIn;
var checkCommentOwnership = middleware.checkCommentOwnership;
// ====================
//COMMENTS ROUTES
//=====================
//Comments new
router.get("/new", isLoggedIn, (req, res)=>{
	Campground.findById(req.params.id, (err, campground)=>{
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

//Comments create
router.post("/", isLoggedIn, (req,res)=>{
	//lookup campground using ID
	Campground.findById(req.params.id, (err, campground)=>{
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			//create new comment
			Comment.create(req.body.comment, (err, comment)=>{
				if(err){
					req.flash("error", "Something went wrong");
					console.log(err);
				} else {
					//add username and id to comments then save
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					//put comments into campground
					campground.comments.push(comment);
					campground.save();
					req.flash("success", "Successfully created comment");
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
	
	//connect new comment to campground
	//redirect campgorund show page
});

//EDIT ROUTE
router.get("/:comment_id/edit", checkCommentOwnership, (req,res)=>{
	Comment.findById(req.params.comment_id, (err, foundComment)=>{
		res.render("comments/editCom", {campground_id: req.params.id, comment: foundComment})
	});
	
});

//UPDATE ROUTE
router.put("/:comment_id", checkCommentOwnership, (req,res)=>{
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comment)=>{
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/"+ req.params.id);
		}
	});
});

//Delete Route
router.delete("/:comment_id", checkCommentOwnership, (req, res)=>{
	Comment.findByIdAndRemove(req.params.comment_id, (err)=>{
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Comment deleted");
			res.redirect("back");
		}
	})
});


module.exports = router;



