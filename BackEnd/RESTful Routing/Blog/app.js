var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");


//Set Views and Public folder
app.set("view engine", "ejs");
app.use(express.static("public"));

//MONGO SET UP
mongoose.connect("mongodb://localhost/restful_blog_app");
var blogSchema = new mongoose.Schema({
	title: String,
	image: {type: String, default: "http://girlgotfaith.com/wp-content/uploads/2015/10/wp-cloudy-simple.png"},
	body: String,
	created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
// 	title: "This is a Tester",
// 	body: "THIS IS THE TESTING BODY"
// });

//Set up body-parser
app.use(bodyParser.urlencoded({extended: true}));

//Set up Method-Override
app.use(methodOverride("_method"));

//Set up express-sanitizer -->Must go after body parser.
app.use(expressSanitizer());

//==========================================================================//

//RESTFUL ROUTES

//HOME PAGE
app.get("/",(req,res)=>{
	res.redirect("/blogs")
});

//INDEX ROUTE
app.get("/blogs",(req, res)=>{
	Blog.find({}, (err, blogs)=>{
		return err ? console.log(err) :res.render("index", {blogs: blogs});
	});
});

//NEW ROUTE
app.get("/blogs/new", (req, res)=>{
	res.render("new");
});

//CREAT ROUTE
app.post("/blogs", (req,res)=>{
	//Make sure default image is used if none inputed
	if(req.body.blog.image === ''){
		req.body.blog.image = blogSchema.image;
	}
	//Sanitize body
	req.body.blog.body = req.sanitize(req.body.blog.body);
	//create blog
	Blog.create(req.body.blog ,(err, newBlog)=>{
		return err ? console.err(err) : res.redirect('/blogs');
	});
	//then, redirect to the index
});

//SHOW ROUTE
app.get("/blogs/:id", (req, res)=>{
	Blog.findById(req.params.id, (err, blog)=>{
		return err ? res.redirect("/blogs") : res.render("show", {blog: blog});
	});
	
});

//EDIT ROUTE
app.get("/blogs/:id/edit", (req,res)=>{
	Blog.findById(req.params.id, (err, blog)=>{
		return err ? res.redirect("/blogs") : res.render("edit", {blog: blog});
	});
});

//UPDATE ROUTE
app.put("/blogs/:id", (req, res)=>{
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, blog)=>{
		return err ? res.redirect("/blogs") : res.redirect("/blogs/" + req.params.id);
	});
});

//DESTROY ROUTE
app.delete("/blogs/:id", (req, res)=>{
	Blog.findByIdAndRemove(req.params.id, (err, blog)=>{
		return err ? res.redirect("/blogs") : res.redirect("/blogs/");
	});
});



app.listen(3000 || process.env.PORT, process.env.IP, ()=>{
	console.log("BLOG SERVER IS A GOOOOO");
});























