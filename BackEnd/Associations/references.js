var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

var Post = require("./modals/post");
var User = require("./modals/user");

// User.create({
// 	email: "bob@gmail.com",
// 	name: "Bob Belcher"
// })

// Post.create({
// 	title: "How to cook the best burger",
// 	content: "You grill it"
// }, (err, post)=> err ? '' : console.log(post));

// Post.create({
// 	title: "How to cook the best burger, part 2",
// 	content: "You grill it with charcoal"
// }, (err, post)=> {
// 	User.findOne({email: "bob@gmail.com"}, (err, foundUser)=>{
// 		if(err){
// 			console.log(err);
// 		} else {
// 			foundUser.posts.push(post);
// 			foundUser.save((err, data)=>{
// 				err ? console.log(err) : console.log(data);
// 			});
// 		}
// 	})
// });

// Post.create({
// 	title: "How to cook the best burger, part 4",
// 	content: "SHUT YOUR FACE"
// }, (err, post)=> {
// 	User.findOne({name: "Bob Belcher"}, (err, foundUser)=>{
// 		if(err){
// 			console.log(err);
// 		} else {
// 			foundUser.posts.push(post);
// 			foundUser.save((err, data)=>{
// 				err ? console.log(err) : console.log(data);
// 			});
// 		}
// 	})
// });

User.findOne({email: "bob@gmail.com"}).populate("posts").exec((err, user)=>{
	if(err){
		console.log(err);
	} else {
		console.log(user);
	}
});



