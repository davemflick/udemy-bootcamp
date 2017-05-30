var express = require('express');
var app = express();

app.get('/', (req,res)=>{
	res.send('<ul><li>dog</li><li>cat</li><li>mouse</li></ul>');
});

app.get('/dog', (req,res)=>{
	res.send('<h1>Yo what up </h1>');
});


//Parameters and patterns.. to match pattern use /: then pattern
app.get("/r/:subreddit", (req, res)=>{
	let sub = req.params.subreddit;
	res.send("Welcome to the " + sub + " subreddit!" );
});

//Order of routes matter.. First match will be displayed
//* will match anything, so best to have this as very last route as a catch for unknown routes.
app.get("*", (req, res)=>{
	res.send("Unknown Route")
});


app.listen(process.env.PORT || 3000, ()=>{
	console.log("Serving on process.env.port or 3000");
});