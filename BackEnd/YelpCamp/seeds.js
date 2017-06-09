var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comments");

var data = [
	{name: "Camp ONE",
	image: "https://www.unitedbg.org/wp-content/uploads/2016/07/Summer-Camp-Graphic.gif",
	description: "Fun Place to be."},
	{name: "Camp TWO",
	image: "http://mobiletentedcamps.co.za/wp-content/uploads/2015/11/Mobile-Tented-Camps-Tent-10-300x200.jpg",
	description: "Not a fun Place to be."},
	{name: "Camp THREE",
	image: "http://www.sadulskyscamps.com/images/CampsNew.jpg",
	description: "An okay Place to be."},
]

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
         //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}


module.exports = seedDB;