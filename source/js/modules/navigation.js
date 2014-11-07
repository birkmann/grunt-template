$(document).ready(function(){

	$(".menu-toggle").click(function(){
		$(".nav-main > ul").slideToggle();
	});

	$(".nav-main li:has(ul)").addClass("menu-with-sub");
	$('.menu-with-sub').prepend("<div class=\"sub-toggle\">+</div>");

	$(".sub-toggle").click(function(){
		$(this).parent().find("ul").slideToggle();;
		$(this).parent().toggleClass("open");
	});

});

$(window).on("resize", function () {
	if ($(window).width() > 799) {
		$('.nav-main *').css('display','');
	}
}).resize();