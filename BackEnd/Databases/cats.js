var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

//Define struture of cat
var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

//Create Cat object to use as model that contains cat methods
//Give first argument, the singular version, mongoose will add 's' to put into collections
//It will give methods like .create .save .find 
var Cat = mongoose.model("Cat", catSchema);


//adding a new cat to the DB
// var johnCat = new Cat({
// 	name: "Jack",
// 	age: 2,
// 	temperament: "silly"
// });

// johnCat.save(function(err, cat){
// 	if(err){
// 		console.log("Something went wrongs");
// 	} else {
// 		console.log("we saved the cat " + cat + " to the database");
// 	}
// });

//Another way of adding a cat
// Cat.create({
// 	name: 'Dave',
// 	age: 8,
// 	temperament: "Calm"
// }, function(err,cat){
// 	if(err){console.log("Error on Cat.create().. Error = " + err)}
// 		else {
// 			console.log("Cat  was added..cat: " + cat);
// 		}
// });


//Find cats and list in console. Returns array of all cat objects
Cat.find({}, (err, cats)=>{
	if(err){
		console.log("Error on Cat.find(); error  " + err);
	} else {
		console.log("All the cats");
		console.log(cats);
	}
});

Cat.remove({name: "Dave"}, (err, cat)=>{
	if(err){
		console.log("Error on Cat.remove(); error  " + err);
	} else {
		console.log("Removed the following cat");
	}
});



