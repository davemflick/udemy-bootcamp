function echo(a,b){
	let count = 0;
	while(count < b){
		console.log(a);
		count++;
	}
}

let a = process.argv[2];
let b = Number(process.argv[3]);

if(typeof a === 'string' && typeof b ==='number'){
	echo(a,b);
} else {
	console.error("wrong arguments");
}