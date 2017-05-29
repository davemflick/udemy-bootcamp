
$('body').css('backgroundColor', '#ddd');
$('body').css('textAlign', 'center');

$('.lis').css("color", "green");
var divStyle = {
	border: '3px solid #34da2f',
	color: '#ae4d51',
	backgroundColor:' #a451cd',
	padding: '10px'
};

let v =$('input')

v.change(function(){console.log(v.val())});



$('div').css(divStyle);
$('div:last-of-type').css('color', '#e213dc');