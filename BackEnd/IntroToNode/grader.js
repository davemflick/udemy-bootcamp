var scores = [90, 98, 89, 100, 100, 86, 94];

function avg(arr){
	return Math.round(arr.reduce((a,b)=>a+=b,0)/arr.length);
}

console.log(avg(scores));