let buttons = document.querySelectorAll('button');
let p1Btn = buttons[0];
let p2Btn = buttons[1];
let reset = buttons[2];
let p1Score = document.getElementById('p1');
let p2Score = document.getElementById('p2');
let playTo = document.getElementById('playTo');
let inputNum = document.getElementById('inputNum');
let gameEnd = false;

//Set initial scores to 0 and remove 'win' class;
function setScores(){
	p1Score.innerHTML = 0;
	p1Score.classList.remove('win');
	p2Score.innerHTML = 0;
	p2Score.classList.remove('win');
	gameEnd = false;
}
//call function initially when page loads
setScores();
//Change Score depending on targeted player.
function changeScore(target){
	let limit = playTo.innerHTML;
	let cur = target.innerHTML;
	 if(cur == limit -1  && !gameEnd){
	 	gameEnd = true;
	 	target.classList.add('win');
		target.innerHTML++;
	} else if(cur < limit && !gameEnd){
		target.innerHTML++;
	}
}
//Call change score on player 1
p1Btn.addEventListener('click', ()=>{
	changeScore(p1Score);
});
//Call change score on player 2
p2Btn.addEventListener('click', ()=>{
	changeScore(p2Score);
});
//Reset intial game state, except inputNumber if changed, for reset button.
reset.addEventListener('click',()=>{
	setScores();
});
//Listen to anychange to input number, if changes, adjust playing to parameter and content. 
inputNum.addEventListener('change', ()=>{
	let newNum = inputNum.value;
	setScores();
	playTo.innerHTML = newNum;
});


