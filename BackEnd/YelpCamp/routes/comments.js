var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comments");

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
					console.log(err);
				} else {
					//add username and id to comments then save
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					//put comments into campground
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
			res.redirect("back");
			console.log("comment deleted")
		}
	})
});

//check if person is logged in (middleware function)
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

//middleware to check if user has permision to edit/update/delete

function checkCommentOwnership(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, (err,foundComment)=>{
			if(err){
				res.redirect("back");
			} else {
				if(foundComment.author.id.equals(req.user._id)){
					next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {
		res.redirect('back')
	}
}

module.exports = router;



