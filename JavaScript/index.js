let p1 = document.getElementById('p1');
let p2 = document.getElementById('p2');
let p3 = document.getElementById('p3');
let p4 = document.getElementById('p4');

let movie = function(title, rating, seen){
	this.title = title;
	this.rating = rating;
	this.hasWatched = seen;
}

let movies = [];

movies.push(new movie('The Patriot', 5, true));
movies.push(new movie('Shrek', 4, true));
movies.push(new movie('Fart Land 4', 1, false));
movies.push(new movie('Bond', 5, true));
movies.push(new movie('Mission Impossible: No fart left unsmelt', 2, false));

movies.forEach(movie=>{
	let seen = 'You have watched ';
	let notSeen = 'You have not watched ';
	let title = '"' +  movie.title + '" ';
	let rating = "- " + movie.rating + " stars";
	
	movie.hasWatched ? console.log(seen + title + rating) : console.log(notSeen + title + rating);
})










// var ask = prompt("What would you like to do?");
// var list = [];


// while(!/quit/gi.test(ask)){
// 	console.log(ask);
// 	if(/new/gi.test(ask)){
// 		list.push(prompt('New Item'));
// 	} else if(/list/gi.test(ask)){
// 		console.log(list);
// 	} else {
// 		alert('Invalid Command');
// 	}
// 	var ask = prompt("What would you like to do?");
// }
