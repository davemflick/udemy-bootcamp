var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

//POST - title, content
var postSchema = new mongoose.Schema({
	title: String,
	content: String
})

var Post = mongoose.model("Post", postSchema);

//USER - email, name
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

// var newUser = new User({
// 	email: "hermione@hogwarts.edu",
// 	name: "Hermione Granger"
// })

// newUser.posts.push({
// 	title: "How to bre polyjuice potion",
// 	content: "Just kidding. Go to potions class"
// })


User.findOne({name: "Hermione Granger"}, (err, user)=>{
	if(err){
		console.log(err);
	} else {
		user.posts.push({
			title: "3 Things I really Hate",
			content: "Voldemort. Farts. Children"
		})
		user.save((err, user)=>{
			err ? console.log(err) : console.log(user);
		});
	}
});



// var newUser = new User({
// 	email: "charlie@brown.edu",
// 	name: "Charlie Brown"
// });

// newUser.save((err, user)=>{
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });

// var newPost = new Post({
// 	title: "Reflections on apples",
// 	content: "They are delicious"
// });

// newPost.save((err, post)=>{
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(post);
// 	}
// });