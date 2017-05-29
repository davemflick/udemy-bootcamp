let squares = document.querySelectorAll(".square");
let squaresAll = document.querySelectorAll(".square");
let sqsEasy = document.querySelectorAll(".easySq");
let sqsHard = document.querySelectorAll(".hardSq");
const CUR_COLOR = document.querySelector(".currentColor");
const TRY_AGAIN = document.querySelector(".tryAgain");
const NEW_COLORS = document.querySelector(".newColors");
const HEAD= document.querySelector(".headCont");
const EASY = document.querySelector(".easy");
const HARD = document.querySelector(".hard");

let hardMode = true;


if(!hardMode){
	squares = sqsEasy;
	EASY.classList.add('mode');
	HARD.classList.remove('mode');
} else {
	squares = squares;
	EASY.classList.remove('mode');
	HARD.classList.add('mode');
}
//Convert Node List of squares to array
const SQUARES_ARRAY = [];
for(let i=0; i<squares.length; i++){
	SQUARES_ARRAY.push(squares[i]);
}

//Make random number for rgb
function randomNum(){
	return Math.floor(Math.random() * 256)
}

//Create RGB Color string
let currentColors = [];
function createRGB(){
	let rgb = "RGB(";
	rgb += randomNum().toString() + ", "
	rgb += randomNum().toString() + ", "
	rgb += randomNum().toString() + ")";
	currentColors.push(rgb);
	return rgb;
}
//Change style of each square
function  onColorChange(sq){
	sq.style.backgroundColor = createRGB();
}
SQUARES_ARRAY.forEach(sq=> onColorChange(sq));


//Select color to find out of array of random
function secretColorPicker(){
	if(hardMode){
		return Math.floor(Math.random() * 6)
	} else {
		return Math.floor(Math.random() * 3)
	}
	
}
let secretColor = currentColors[secretColorPicker()]
//Put secret color into H1 
CUR_COLOR.textContent = secretColor;

//Fill tryAgain slot

squares.forEach(sq=>{
	sq.addEventListener("click", function(){
		color = this.style.backgroundColor;
		if(color !== secretColor.toLowerCase()){
			TRY_AGAIN.textContent = "Try Again"
			this.style.backgroundColor = '#232323';
		} else {
			TRY_AGAIN.textContent = "Correct!";
			squares.forEach(sq=> sq.style.backgroundColor = secretColor);
			HEAD.style.backgroundColor = secretColor;
		}
	});
})

function resetSettings(){
	currentColors = [];
	HEAD.style.backgroundColor = '#4278AB';
	SQUARES_ARRAY.forEach(sq=> onColorChange(sq));
	secretColor = currentColors[secretColorPicker()]
//Put secret color into H1 
	CUR_COLOR.textContent = secretColor;
	TRY_AGAIN.textContent = "";
}

NEW_COLORS.addEventListener("click",function(){
	resetSettings();
})

EASY.addEventListener("click", function(){
	hardMode = false;
	squares = sqsEasy;
	resetSettings();
	EASY.classList.add('mode');
	HARD.classList.remove('mode');
	sqsHard.forEach(sq=> sq.style.display = "none");
})
HARD.addEventListener("click", function(){
	hardMode = true;
	squares = squaresAll;
	resetSettings();
	EASY.classList.remove('mode');
	HARD.classList.add('mode');
	sqsHard.forEach(sq=> sq.style.display = "inline-block");
})














