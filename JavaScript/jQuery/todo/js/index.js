

var lis = $("li");
var span = $("span");

$("ul").on("click", "li", function(){
	$(this).toggleClass("completed");
	
});


$("input[type='text']").on("keypress", function(e){
	let inputText = $("input").val();
	if(e.which === 13 && inputText.length > 0){
		$("ul").append("<li><span class='delete'><i class='fa fa-trash' aria-hidden='true'></span> " + inputText + "</li>");
		$(this).val("");
	}
})

$("ul").on("click", "span", function(e){
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	})
	e.stopPropagation();
})

$(".fa-plus").click(function(){
	$("input[type='text']").fadeToggle();
})



//}); //END DOCUMENT READY FUNCTION