console.log('connected');

let div = document.querySelector('#play');

div.style.width = '100px';
div.style.height = '100px';
div.style.border = '1px solid black';

let colors = ['blue', 'red', 'orange', 'white', 'black', 'green', 'yellow', 'purple', 'lightblue'];
let prevColor = 0;
function changeBackground(){
	let random = 0;
	while (random === prevColor){
		random =  Math.floor(Math.random() * 9);
	}
	prevColor =  random;
	div.style.transition = "all 0.8s";
	div.style.backgroundColor = colors[random];
}

// setInterval(function(){
// 	changeBackground();
// }, 2000);


let one = document.querySelector(".special");

//one.addEventListener('click',()=>{one.classList.toggle('one'); one.textContent = 'Farts'});

document.querySelectorAll('.special')[1].innerHTML = 'Hello there <strong>fart</strong> man';

let btn = document.getElementById('btn');
let body = document.body;

btn.addEventListener('click',(e)=>{
	body.classList.toggle('purple');
})


var lis = document.querySelectorAll("li");

for (var i = 0; i < lis.length; i++) {
	lis[i].addEventListener('mouseover', function(){this.style.color = "green";});
	lis[i].addEventListener('mouseout', function(){this.style.color = "black";});
}